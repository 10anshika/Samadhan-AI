import React, { useState, useRef, useCallback } from 'react';
import { Upload, X, FileText, Image as ImageIcon, CheckCircle2 } from 'lucide-react';

interface ImageUploaderProps {
  onImageSelect: (file: File | null) => void;
  selectedImage: File | null;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect, selectedImage }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file.');
      return;
    }
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    onImageSelect(file);
  };

  const clearImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    onImageSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInput}
        className="hidden"
        accept="image/*"
      />

      {!selectedImage ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`
            relative cursor-pointer
            border-2 border-dashed rounded-3xl p-10 sm:p-14
            flex flex-col items-center justify-center
            transition-all duration-300 ease-out
            group
            ${isDragging 
              ? 'border-indigo-500 bg-indigo-50/50 scale-[1.01] shadow-xl shadow-indigo-100' 
              : 'border-gray-200 bg-white/50 backdrop-blur-sm hover:border-indigo-400 hover:bg-white/80 hover:shadow-lg hover:shadow-indigo-50'
            }
          `}
        >
          <div className={`
            w-20 h-20 rounded-2xl flex items-center justify-center mb-6 
            transition-transform duration-500 shadow-sm border border-white/60
            ${isDragging ? 'bg-indigo-100 scale-110 rotate-3' : 'bg-white shadow-indigo-100 group-hover:scale-110 group-hover:-rotate-2'}
          `}>
            <Upload className={`w-10 h-10 transition-colors duration-300 ${isDragging ? 'text-indigo-700' : 'text-indigo-600'}`} />
          </div>
          
          <h3 className="text-lg font-bold text-gray-900 mb-2 tracking-tight group-hover:text-indigo-700 transition-colors">
            Click or drag file to upload
          </h3>
          <p className="text-gray-500 text-sm text-center max-w-xs leading-relaxed font-medium">
            Support for single page documents (JPG, PNG)
          </p>
        </div>
      ) : (
        <div className="relative rounded-3xl overflow-hidden border border-white/60 bg-white/40 backdrop-blur-md shadow-xl shadow-indigo-100/40 ring-1 ring-white/50 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-200/40">
           {/* Header with File Info */}
          <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100/50 bg-white/60">
            <div className="flex items-center space-x-4">
              <div className="relative">
                 <div className="p-2.5 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-500/30">
                    <FileText className="w-5 h-5 text-white" />
                 </div>
                 <div className="absolute -bottom-1 -right-1 bg-green-500 border-2 border-white rounded-full p-0.5">
                    <CheckCircle2 className="w-2.5 h-2.5 text-white" />
                 </div>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-gray-900 text-sm truncate max-w-[150px] sm:max-w-[240px]">
                  {selectedImage.name}
                </span>
                <span className="text-xs text-gray-500 font-medium">
                  {(selectedImage.size / 1024).toFixed(1)} KB • Ready for analysis
                </span>
              </div>
            </div>
            <button
              onClick={clearImage}
              className="group/btn p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200"
              title="Remove file"
            >
              <X className="w-5 h-5 group-hover/btn:rotate-90 transition-transform" />
            </button>
          </div>
          
          {/* Image Preview Area */}
          <div className="relative h-64 sm:h-80 bg-gray-50/30 flex items-center justify-center p-8">
             <div className="absolute inset-0 pattern-grid opacity-10"></div>
             {preview ? (
                <img 
                  src={preview} 
                  alt="Preview" 
                  className="h-full w-auto object-contain rounded-lg shadow-lg shadow-black/5 ring-1 ring-black/5 transform transition-transform duration-500 hover:scale-[1.02]"
                />
             ) : (
                <ImageIcon className="w-16 h-16 text-gray-300" />
             )}
          </div>
        </div>
      )}
    </div>
  );
};