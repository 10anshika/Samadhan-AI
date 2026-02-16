import React, { useState, useRef } from 'react';
import { ExtractedData, FieldGuidance, ValidationData } from '../types';
import { JsonViewer } from './JsonViewer';
import { 
    FileCheck, Activity, LayoutGrid, Code, CheckCircle2, AlertTriangle, 
    HelpCircle, PenTool, XCircle, AlertCircle, ScanEye, Languages, Scale, ChevronDown, ChevronUp
} from 'lucide-react';

interface AnalysisResultProps {
  data: ExtractedData;
  imageUrl?: string | null;
}

export const AnalysisResult: React.FC<AnalysisResultProps> = ({ data, imageUrl }) => {
  const [viewMode, setViewMode] = useState<'human' | 'json'>('human');
  const [language, setLanguage] = useState<'English' | 'Hindi' | 'Marathi'>('English');
  const [hoveredFieldIdx, setHoveredFieldIdx] = useState<number | null>(null);
  
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const scrollToCard = (index: number) => {
    const card = cardRefs.current[index];
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setHoveredFieldIdx(index);
      setTimeout(() => setHoveredFieldIdx(null), 2000);
    }
  };

  const totalFields = data.fields?.length || 0;
  const mandatoryFields = data.fields?.filter(f => f.Mandatory === 'Yes').length || 0;
  const optionalFields = totalFields - mandatoryFields;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out">
      {data.mode === 'guidance' && (
        <div className="bg-white/70 backdrop-blur-md rounded-2xl border border-indigo-100 p-4 shadow-sm flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
                <div className="bg-indigo-100 p-2 rounded-lg text-indigo-700">
                    <FileCheck className="w-5 h-5" />
                </div>
                <div>
                    <h2 className="text-sm font-bold text-gray-900">{data.formType}</h2>
                    <div className="flex items-center space-x-3 text-xs text-gray-500 font-medium mt-0.5">
                        <span className="flex items-center"><span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-1.5"></span>{totalFields} Fields Total</span>
                        <span className="flex items-center text-red-600"><span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-1.5"></span>{mandatoryFields} Mandatory</span>
                        <span className="flex items-center text-yellow-600"><span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-1.5"></span>{optionalFields} Optional</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center space-x-3">
                 <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Languages className="h-4 w-4 text-gray-400 group-hover:text-indigo-500 transition-colors" />
                    </div>
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value as any)}
                        className="pl-9 pr-8 py-2 bg-white border border-gray-200 text-gray-700 text-sm rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm appearance-none hover:border-indigo-300 transition-colors cursor-pointer font-medium"
                    >
                        <option value="English">English</option>
                        <option value="Hindi">Hindi (हिंदी)</option>
                        <option value="Marathi">Marathi (मराठी)</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                         <ChevronDown className="h-4 w-4 text-gray-400" />
                    </div>
                 </div>
            </div>
        </div>
      )}

      {data.mode === 'guidance' && imageUrl && viewMode === 'human' && (
        <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-gray-200 overflow-hidden shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="p-4 border-b border-gray-100 flex items-center space-x-2 bg-indigo-50/50">
             <ScanEye className="w-5 h-5 text-indigo-600" />
             <span className="text-sm font-bold text-gray-700 uppercase tracking-wide">Interactive Form Map</span>
             <span className="text-xs text-indigo-500 ml-auto font-medium hidden sm:inline-block">Click highlighted fields to jump to guidance</span>
          </div>
          <div className="relative w-full bg-gray-900/5 p-4 md:p-8 flex justify-center">
             <div className="relative inline-block max-w-full shadow-2xl shadow-gray-900/20 rounded-lg overflow-hidden">
                <img 
                  src={imageUrl} 
                  alt="Form Analysis" 
                  className="max-h-[60vh] w-auto object-contain block"
                />
                {data.fields?.map((field, idx) => {
                  if (!field.Position) return null;
                  const isHovered = hoveredFieldIdx === idx;
                  const isMandatory = field.Mandatory === "Yes";
                  
                  const borderColor = isMandatory 
                    ? (isHovered ? 'border-red-500 bg-red-500/30' : 'border-red-500/60 bg-red-500/10') 
                    : (isHovered ? 'border-yellow-500 bg-yellow-500/30' : 'border-yellow-500/60 bg-yellow-500/10');

                  return (
                    <div
                      key={idx}
                      className={`absolute border-2 transition-all duration-200 cursor-pointer z-10 ${borderColor} ${isHovered ? 'scale-[1.02] shadow-[0_0_15px_rgba(0,0,0,0.2)]' : ''}`}
                      style={{
                        left: `${field.Position.x}%`,
                        top: `${field.Position.y}%`,
                        width: `${field.Position.width}%`,
                        height: `${field.Position.height}%`,
                      }}
                      onMouseEnter={() => setHoveredFieldIdx(idx)}
                      onMouseLeave={() => setHoveredFieldIdx(null)}
                      onClick={(e) => {
                          e.stopPropagation();
                          scrollToCard(idx);
                      }}
                    >
                       {isHovered && (
                         <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900/90 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap shadow-xl pointer-events-none z-20 font-medium">
                            {field["Field Name"]}
                            {isMandatory && <span className="ml-2 text-red-300 text-[10px] uppercase font-bold">• Mandatory</span>}
                         </div>
                       )}
                    </div>
                  );
                })}
             </div>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
        <div className="inline-flex bg-gray-100/80 p-1.5 rounded-xl border border-gray-200 shadow-inner">
            <button
                onClick={() => setViewMode('human')}
                className={`flex items-center space-x-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    viewMode === 'human' 
                    ? 'bg-white text-indigo-600 shadow-[0_2px_8px_rgba(0,0,0,0.05)] ring-1 ring-gray-200' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
                }`}
            >
                <LayoutGrid className="w-4 h-4" />
                <span>{data.mode === 'validation' ? 'Validation Report' : 'Guidance View'}</span>
            </button>
            <button
                onClick={() => setViewMode('json')}
                className={`flex items-center space-x-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    viewMode === 'json' 
                    ? 'bg-white text-indigo-600 shadow-[0_2px_8px_rgba(0,0,0,0.05)] ring-1 ring-gray-200' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
                }`}
            >
                <Code className="w-4 h-4" />
                <span>JSON View</span>
            </button>
        </div>
      </div>

      <div className="min-h-[300px] transition-all duration-500">
          {viewMode === 'human' ? (
                data.mode === 'guidance' && data.fields ? (
                  <GuidanceView 
                    fields={data.fields} 
                    hoveredIdx={hoveredFieldIdx} 
                    setHoveredIdx={setHoveredFieldIdx}
                    language={language}
                    cardRefs={cardRefs}
                  />
                ) : data.mode === 'validation' && data.validation ? (
                  <ValidationView data={data.validation} />
                ) : null
          ) : (
              <JsonViewer 
                  data={data.mode === 'guidance' ? data.fields : data.validation} 
                  title={data.mode === 'guidance' ? "Structured Field Guidance" : "Validation Report"} 
              />
          )}
      </div>
    </div>
  );
};

const GuidanceView = ({ 
  fields, 
  hoveredIdx, 
  setHoveredIdx, 
  language,
  cardRefs
}: { 
  fields: FieldGuidance[], 
  hoveredIdx: number | null, 
  setHoveredIdx: (i: number | null) => void,
  language: 'English' | 'Hindi' | 'Marathi',
  cardRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
}) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
        {fields.map((field, idx) => (
            <div 
              key={idx} 
              ref={el => { if (cardRefs.current) cardRefs.current[idx] = el; }}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
               <GuidanceCard field={field} isHovered={hoveredIdx === idx} language={language} />
            </div>
        ))}
    </div>
);

const GuidanceCard = ({ 
  field, 
  isHovered, 
  language 
}: { 
  field: FieldGuidance, 
  isHovered?: boolean,
  language: 'English' | 'Hindi' | 'Marathi'
}) => {
    const isMandatory = field["Mandatory"] === "Yes";
    const simpleMeaning = field["Simple Meaning"]?.[language] || field["Simple Meaning"]?.["English"] || "N/A";
    const whatToWrite = field["What To Write"]?.[language] || field["What To Write"]?.["English"] || "N/A";
    const commonMistake = field["Common Mistake"]?.[language] || field["Common Mistake"]?.["English"] || "N/A";
    const legalExplanation = field["Legal Term Explanation"] ? (field["Legal Term Explanation"][language] || field["Legal Term Explanation"]["English"]) : null;

    const [isLegalOpen, setIsLegalOpen] = useState(false);

    const labels = {
        English: { meaning: 'Meaning', example: 'Example', mistake: 'Avoid this mistake', legal: 'Legal Term' },
        Hindi: { meaning: 'अर्थ', example: 'उदाहरण', mistake: 'यह गलती न करें', legal: 'कानूनी शब्द' },
        Marathi: { meaning: 'अर्थ', example: 'उदाहरण', mistake: 'ही चूक टाळा', legal: 'कायदेशीर शब्द' }
    };

    const currentLabels = labels[language] || labels.English;

    return (
        <div className={`bg-white/70 backdrop-blur-md border rounded-2xl p-6 shadow-sm transition-all duration-300 group flex flex-col h-full relative overflow-hidden ${isHovered ? 'ring-2 ring-indigo-500 border-indigo-500 shadow-xl shadow-indigo-500/10 scale-[1.02]' : 'border-gray-200 hover:shadow-xl hover:shadow-indigo-500/10 hover:border-indigo-200'}`}>
            <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${isMandatory ? 'bg-red-500' : 'bg-yellow-400'}`}></div>
            
            <div className="pl-3 flex flex-col h-full">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                    <h4 className="text-lg font-bold text-gray-900 tracking-tight leading-snug">
                        {field["Field Name"]}
                    </h4>
                    <div className="flex space-x-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-gray-100 text-gray-600 border border-gray-200">
                            {field["Field Type"]}
                        </span>
                        {isMandatory ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-red-100 text-red-600 border border-red-200">
                                Mandatory
                            </span>
                        ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-yellow-100 text-yellow-700 border border-yellow-200">
                                Optional
                            </span>
                        )}
                    </div>
                </div>

                <div className="flex items-start space-x-3 mb-4">
                    <HelpCircle className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-0.5">
                          {currentLabels.meaning}
                        </p>
                        <p className="text-sm text-gray-700 font-medium leading-relaxed">{simpleMeaning}</p>
                    </div>
                </div>

                {legalExplanation && (
                    <div className="mb-4">
                        <button 
                            onClick={() => setIsLegalOpen(!isLegalOpen)}
                            className="w-full flex items-center justify-between p-2.5 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-100 transition-colors group/legal"
                        >
                            <div className="flex items-center space-x-2">
                                <Scale className="w-4 h-4 text-gray-500 group-hover/legal:text-indigo-500" />
                                <span className="text-xs font-bold uppercase tracking-wider text-gray-500 group-hover/legal:text-gray-700">{currentLabels.legal}</span>
                            </div>
                            {isLegalOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                        </button>
                        {isLegalOpen && (
                            <div className="mt-2 p-3 bg-gray-50 rounded-lg text-sm text-gray-600 border border-gray-100 animate-in fade-in slide-in-from-top-1">
                                {legalExplanation}
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-start space-x-3 mb-4 bg-emerald-50/50 p-3 rounded-xl border border-emerald-100/50">
                    <PenTool className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-xs text-emerald-600 font-bold uppercase tracking-wider mb-0.5">
                           {currentLabels.example}
                        </p>
                        <p className="text-sm text-gray-800 font-semibold leading-relaxed">{whatToWrite}</p>
                    </div>
                </div>

                <div className="mt-auto flex items-start space-x-3 bg-red-50/50 p-3 rounded-xl border border-red-100/50">
                    <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-xs text-red-600 font-bold uppercase tracking-wider mb-0.5">
                          {currentLabels.mistake}
                        </p>
                        <p className="text-sm text-gray-800 leading-relaxed italic">"{commonMistake}"</p>
                    </div>
                </div>
            </div>
        </div>
    )
};

const ValidationView = ({ data }: { data: ValidationData }) => {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
            {data["Missing Mandatory Fields"].length > 0 && (
                <div className="bg-red-50/80 border border-red-200 rounded-3xl p-6 shadow-sm">
                    <div className="flex items-center space-x-3 mb-4">
                         <div className="p-2 bg-red-100 rounded-full text-red-600">
                            <AlertCircle className="w-6 h-6" />
                         </div>
                         <h3 className="text-lg font-bold text-gray-900">Missing Mandatory Fields</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {data["Missing Mandatory Fields"].map((field, i) => (
                            <div key={i} className="flex items-center space-x-2 bg-white p-3 rounded-xl border border-red-100 text-red-700 font-medium shadow-sm">
                                <XCircle className="w-5 h-5 flex-shrink-0" />
                                <span>{field}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {data["Incorrect Fields"].length > 0 && (
                <div className="bg-orange-50/80 border border-orange-200 rounded-3xl p-6 shadow-sm">
                    <div className="flex items-center space-x-3 mb-4">
                         <div className="p-2 bg-orange-100 rounded-full text-orange-600">
                            <AlertTriangle className="w-6 h-6" />
                         </div>
                         <h3 className="text-lg font-bold text-gray-900">Attention Required</h3>
                    </div>
                    <div className="space-y-3">
                        {data["Incorrect Fields"].map((item, i) => (
                            <div key={i} className="bg-white p-4 rounded-xl border border-orange-100 shadow-sm flex flex-col sm:flex-row sm:items-start gap-4">
                                <div className="flex-1">
                                    <h5 className="font-bold text-gray-900 text-base mb-1">{item["Field Name"]}</h5>
                                    <p className="text-red-500 text-sm font-medium mb-1">{item["Issue"]}</p>
                                </div>
                                <div className="bg-orange-50 px-4 py-2 rounded-lg sm:max-w-xs w-full">
                                    <p className="text-xs text-orange-700 font-bold uppercase tracking-wider mb-1">Fix</p>
                                    <p className="text-sm text-gray-700">{item["Correction Guidance"]}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

             {data["Valid Fields"].length > 0 && (
                <div className="bg-emerald-50/80 border border-emerald-200 rounded-3xl p-6 shadow-sm opacity-90 hover:opacity-100 transition-opacity">
                    <div className="flex items-center space-x-3 mb-4">
                         <div className="p-2 bg-emerald-100 rounded-full text-emerald-600">
                            <CheckCircle2 className="w-6 h-6" />
                         </div>
                         <h3 className="text-lg font-bold text-gray-900">Successfully Filled</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {data["Valid Fields"].map((field, i) => (
                            <span key={i} className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-white text-emerald-700 border border-emerald-100 shadow-sm">
                                <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
                                {field}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
