import React from 'react';
import { BrainCircuit } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <BrainCircuit className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">Samadhan AI</h1>
            <p className="text-xs text-gray-500 font-medium">Bureaucracy Navigator</p>
          </div>
        </div>
        <div className="hidden sm:block">
            <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
                Beta v1.0
            </span>
        </div>
      </div>
    </header>
  );
};