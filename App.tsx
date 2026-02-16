import React, { useState, useEffect } from 'react';
import { ImageUploader } from './components/ImageUploader';
import { Button } from './components/Button';
import { AnalysisResult } from './components/AnalysisResult';
import { AnalysisState } from './types';
import { analyzeImage } from './services/geminiService';
import { AlertCircle, Terminal, Sparkles, BrainCircuit, CheckCircle2, CircleDashed, Clock } from 'lucide-react';

const App: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisState>({
    status: 'idle',
    data: null,
    error: null,
  });

  // Create Object URL for selected image
  useEffect(() => {
    if (selectedImage) {
      const url = URL.createObjectURL(selectedImage);
      setImageUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setImageUrl(null);
    }
  }, [selectedImage]);

  const handleImageSelect = (file: File | null) => {
    setSelectedImage(file);
    if (analysis.status !== 'idle') {
      setAnalysis({ status: 'idle', data: null, error: null });
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) {
      setAnalysis(prev => ({ ...prev, error: "Please upload an image first." }));
      return;
    }

    setAnalysis({ status: 'analyzing', data: null, error: null });

    try {
      const result = await analyzeImage(selectedImage);
      setAnalysis({
        status: 'success',
        data: result,
        error: null
      });
    } catch (err) {
      console.error("Analysis Error:", err);
      setAnalysis({
        status: 'error',
        data: null,
        error: "Failed to analyze the document. Please ensure you have a valid API key and try again."
      });
    }
  };

  // Dynamic Status Badge
  const StatusIndicator = () => {
     let icon = <CircleDashed className="w-4 h-4" />;
     let text = "Ready";
     let color = "bg-gray-100 text-gray-600 border-gray-200";

     if (analysis.status === 'analyzing') {
        icon = <Clock className="w-4 h-4 animate-spin-slow" />;
        text = "Processing";
        color = "bg-indigo-50 text-indigo-600 border-indigo-100";
     } else if (analysis.status === 'success') {
        icon = <CheckCircle2 className="w-4 h-4" />;
        text = "Completed";
        color = "bg-emerald-50 text-emerald-600 border-emerald-100";
     } else if (analysis.status === 'error') {
        icon = <AlertCircle className="w-4 h-4" />;
        text = "Error";
        color = "bg-red-50 text-red-600 border-red-100";
     }

     return (
        <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full border text-xs font-semibold uppercase tracking-wider ${color} transition-all duration-300`}>
           {icon}
           <span>{text}</span>
        </div>
     );
  };

  return (
    <>
    <style dangerouslySetInnerHTML={{__html: `
      @keyframes gradient-xy {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      .animate-gradient-xy {
        background-size: 200% 200%;
        animation: gradient-xy 15s ease infinite;
      }
      .pattern-grid {
        background-image: linear-gradient(currentColor 1px, transparent 1px), linear-gradient(to right, currentColor 1px, transparent 1px);
        background-size: 20px 20px;
      }
    `}} />
    <div className="min-h-screen w-full bg-gradient-to-br from-[#F4F7FF] via-[#EEF2FF] to-[#F5F3FF] animate-gradient-xy text-gray-900 font-sans selection:bg-indigo-500 selection:text-white pb-20 overflow-x-hidden">
      
      {/* Decorative Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-purple-200/30 blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-indigo-200/30 blur-[100px] animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col items-center justify-center text-center space-y-6 mb-16 animate-in fade-in slide-in-from-top-4 duration-1000">
           <div className="inline-flex items-center justify-center p-4 bg-white/70 backdrop-blur-xl rounded-3xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-2 group cursor-default transition-transform hover:scale-105 duration-500">
             <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-purple-500 blur-md opacity-40 animate-pulse rounded-full"></div>
                <BrainCircuit className="relative w-8 h-8 text-indigo-600" />
             </div>
             <span className="ml-3 font-bold text-gray-900 tracking-tight">Samadhan AI</span>
          </div>
          
          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-gray-900 drop-shadow-sm max-w-4xl mx-auto leading-tight">
            Intelligent <br className="sm:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 animate-gradient-x">
               Bureaucracy Navigator
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed font-medium">
            Upload any government or bank form and get <span className="text-gray-900 font-semibold border-b-2 border-indigo-200">structured guidance instantly</span>.
          </p>
        </div>

        {/* Main Glass Card Container */}
        <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[2.5rem] blur opacity-10 group-hover:opacity-20 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-white/60 backdrop-blur-2xl border border-white/80 rounded-[2rem] shadow-[0_20px_50px_rgba(8,_112,_184,_0.07)] overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-1000">
            
            {/* Status Bar */}
            <div className="border-b border-gray-200/50 bg-white/40 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                        <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
                    </div>
                </div>
                <StatusIndicator />
            </div>

            <div className="p-6 sm:p-12 space-y-12">
                
                {/* Upload Section */}
                <div className="grid grid-cols-1 gap-12 max-w-4xl mx-auto">
                    <div className="space-y-8">
                        <ImageUploader 
                            onImageSelect={handleImageSelect} 
                            selectedImage={selectedImage} 
                        />
                        
                        {analysis.error && (
                            <div className="flex items-center gap-3 text-red-700 bg-red-50/90 border border-red-100 p-4 rounded-2xl text-sm font-medium animate-in fade-in slide-in-from-top-2 shadow-sm">
                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                            {analysis.error}
                            </div>
                        )}

                        <div className="flex justify-center pt-4">
                            <Button 
                                onClick={handleAnalyze} 
                                isLoading={analysis.status === 'analyzing'}
                                className="w-full sm:w-auto min-w-[280px] text-lg shadow-indigo-500/20"
                                disabled={!selectedImage || analysis.status === 'analyzing'}
                            >
                                <Sparkles className={`w-5 h-5 mr-2 ${analysis.status === 'analyzing' ? 'hidden' : 'block'}`} />
                                {analysis.status === 'analyzing' ? 'Processing Document...' : 'Analyze Form'}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                {(analysis.status !== 'idle' || analysis.data) && (
                    <div className="relative py-4 animate-in fade-in duration-700">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                        <div className="w-full border-t border-gray-200/60"></div>
                        </div>
                        <div className="relative flex justify-center">
                        <span className="bg-white/80 px-6 text-xs text-gray-400 font-bold tracking-widest backdrop-blur-md rounded-full border border-gray-100 uppercase">
                            Analysis Results
                        </span>
                        </div>
                    </div>
                )}

                {/* Output Section */}
                <div className="min-h-[100px] transition-all duration-500">
                    {/* Loading State */}
                    {analysis.status === 'analyzing' && (
                        <div className="flex flex-col items-center justify-center py-16 space-y-8 animate-in fade-in duration-500">
                            <div className="relative">
                                <div className="w-24 h-24 border-[3px] border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
                                         <BrainCircuit className="w-8 h-8 text-indigo-600 animate-pulse" />
                                    </div>
                                </div>
                            </div>
                            <div className="text-center space-y-2">
                                <p className="text-gray-900 font-bold text-xl tracking-tight">Analyzing Structure</p>
                                <p className="text-gray-500 text-sm font-medium">Extracting fields and validating data points...</p>
                            </div>
                        </div>
                    )}

                    {/* Success State */}
                    {analysis.status === 'success' && analysis.data && (
                        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                           <AnalysisResult data={analysis.data} imageUrl={imageUrl} />
                        </div>
                    )}

                    {/* Idle State - Hidden to keep clean unless empty */}
                    {analysis.status === 'idle' && (
                         <div className="hidden sm:flex flex-col items-center justify-center py-8 text-center opacity-40">
                             <Terminal className="w-6 h-6 text-gray-400 mb-2" />
                             <p className="text-xs text-gray-400 uppercase tracking-widest">Waiting for input</p>
                         </div>
                    )}
                </div>

            </div>
            </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center space-y-4">
           <p className="text-sm text-gray-400 font-medium tracking-wide">
             Built using <span className="text-indigo-500 font-semibold">Gemini 3 Pro</span> – Integrated Gen AI
           </p>
        </div>

      </div>
    </div>
    </>
  );
};

export default App;