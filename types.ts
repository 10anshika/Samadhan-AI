export interface FieldPosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface MultilingualText {
  English: string;
  Hindi: string;
  Marathi: string;
}

export interface FieldGuidance {
  "Field Name": string;
  "Field Type": string;
  "Mandatory": string;
  "What To Write": MultilingualText;
  "Simple Meaning": MultilingualText;
  "Common Mistake": MultilingualText;
  "Legal Term Explanation"?: MultilingualText;
  "Position"?: FieldPosition;
}

export interface IncorrectField {
  "Field Name": string;
  "Issue": string;
  "Correction Guidance": string;
}

export interface ValidationData {
  "Completion Score": string;
  "Missing Mandatory Fields": string[];
  "Incorrect Fields": IncorrectField[];
  "Valid Fields": string[];
}

export interface ExtractedData {
  mode: 'guidance' | 'validation';
  formType: string;
  confidenceScore: number;
  summary: string;
  fields?: FieldGuidance[];
  validation?: ValidationData;
}

export interface AnalysisState {
  status: 'idle' | 'analyzing' | 'success' | 'error';
  data: ExtractedData | null;
  error: string | null;
}