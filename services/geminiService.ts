import { GoogleGenAI } from "@google/genai";
import { ExtractedData, FieldGuidance, ValidationData } from "../types";

/**
 * Converts a File object to a GoogleGenAI Part object with base64 data.
 */
const fileToPart = (file: File): Promise<{ inlineData: { data: string; mimeType: string } }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      const base64Data = base64String.split(',')[1];
      resolve({
        inlineData: {
          data: base64Data,
          mimeType: file.type,
        },
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

/**
 * Analyzes the uploaded form image using Gemini 3 Pro.
 */
export const analyzeImage = async (file: File): Promise<ExtractedData> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const imagePart = await fileToPart(file);

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: {
        parts: [
          imagePart,
          { text: "Analyze this form. If it's blank, provide trilingual guidance (English, Hindi, Marathi) with bounding boxes. If it's filled, validate the entries." }
        ]
      },
      config: {
        responseMimeType: 'application/json',
        temperature: 0,
        systemInstruction: `You are Samadhan AI, a domain-specific intelligent assistant for Indian Bank Account Opening Application Forms.

This system ONLY analyzes Bank Account Opening Forms.
If the document is NOT a Bank Account Opening Form, return JSON: { "error": "This does not appear to be a valid Bank Account Opening Form. Please upload a bank form." }

Step 1: Analyze the image to see if the form contains handwritten or typed user entries (filled) or if it is empty (blank).

Step 2: Generate the appropriate JSON response based on the state.

========================
CASE 1: FORM IS BLANK (Guidance Mode)
========================
OBJECTIVE: Visually identify all applicant-fillable fields and provide structured, citizen-friendly guidance in THREE languages (English, Hindi, and Marathi).
Ignore sections meant for staff: "For Office Use Only", "Official Use", "Bank Use Only", "Audit", "Approval", "To be filled by staff".

For each field, provide approximate bounding box coordinates in percentages (0-100) relative to the image size.

Output JSON Format (Guidance):
{
  "mode": "guidance",
  "Form Type": "Specific Bank Account Form Name",
  "Fields": [
    {
      "Field Name": "Label in English",
      "Field Type": "Text / Checkbox / Date / Signature / Photo / Other",
      "Mandatory": "Yes / No",
      "What To Write": {
        "English": "Clear realistic example (e.g., 'Rahul Kumar')",
        "Hindi": "Clear realistic example in Hindi script or Hinglish",
        "Marathi": "Clear realistic example in Marathi script"
      },
      "Simple Meaning": {
        "English": "Plain English explanation",
        "Hindi": "Simple Hindi explanation",
        "Marathi": "Simple Marathi explanation"
      },
      "Common Mistake": {
        "English": "Practical warning in English",
        "Hindi": "Practical warning in Hindi",
        "Marathi": "Practical warning in Marathi"
      },
      "Legal Term Explanation": {
         "English": "Brief explanation of any legal term in the field (optional)",
         "Hindi": "Translation in Hindi",
         "Marathi": "Translation in Marathi"
      },
      "Position": {
        "x": number,
        "y": number,
        "width": number,
        "height": number
      }
    }
  ]
}

========================
CASE 2: FORM IS FILLED (Validation Mode)
========================
OBJECTIVE: Review user entries. Check for missing mandatory fields, incorrect formats, or invalid inputs.

Output JSON Format (Validation):
{
  "mode": "validation",
  "Form Type": "Specific Bank Account Form Name",
  "Completion Score": "Percentage (e.g., '85%')",
  "Missing Mandatory Fields": ["Field Name 1", "Field Name 2"],
  "Incorrect Fields": [
    {
      "Field Name": "Name of field with error",
      "Issue": "Description of error",
      "Correction Guidance": "How to fix it"
    }
  ],
  "Valid Fields": ["Field Name 1", "Field Name 2"]
}

========================
GENERAL RULES
========================
- Position values must be percentages between 0-100.
- Keep Hindi and Marathi translations natural and easy to understand (not overly formal).
- Output ONLY valid JSON.`
      }
    });

    let responseText = response.text;
    if (!responseText) {
      throw new Error("No response received from Gemini.");
    }

    // Phase 6: Safety - Strip Markdown
    responseText = responseText.replace(/```json\n?|\n?```/g, "").trim();

    let jsonResponse;
    try {
      jsonResponse = JSON.parse(responseText);
    } catch (e) {
      console.error("JSON Parse Error:", e);
      throw new Error("Failed to parse Gemini response.");
    }

    // Handle non-bank forms (Phase 2)
    if (jsonResponse.error) {
        throw new Error(jsonResponse.error);
    }

    // Determine mode
    const mode = jsonResponse.mode || (jsonResponse.Fields ? 'guidance' : 'validation');
    const formType = jsonResponse["Form Type"] || "Unknown Document";

    if (mode === 'guidance') {
        const rawFields = jsonResponse["Fields"];
        const fields: FieldGuidance[] = Array.isArray(rawFields) ? rawFields : [];
        
        return {
            mode: 'guidance',
            formType,
            confidenceScore: 0.98,
            fields,
            summary: `Identified blank ${formType}. Generated guidance for ${fields.length} applicant fields.`
        };
    } else {
        const validationData: ValidationData = {
            "Completion Score": jsonResponse["Completion Score"] || "0%",
            "Missing Mandatory Fields": jsonResponse["Missing Mandatory Fields"] || [],
            "Incorrect Fields": jsonResponse["Incorrect Fields"] || [],
            "Valid Fields": jsonResponse["Valid Fields"] || []
        };

        const issueCount = validationData["Missing Mandatory Fields"].length + validationData["Incorrect Fields"].length;

        return {
            mode: 'validation',
            formType,
            confidenceScore: 0.98,
            validation: validationData,
            summary: `Analyzed filled ${formType}. Found ${issueCount} issues to address.`
        };
    }

  } catch (error) {
    console.error("Gemini Analysis Failed:", error);
    throw error;
  }
};