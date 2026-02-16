import React from 'react';
import { Copy, Check, Terminal, Download } from 'lucide-react';

interface JsonViewerProps {
  data: any; // Accepted Record<string, any> or any[]
  title?: string;
}

export const JsonViewer: React.FC<JsonViewerProps> = ({ data, title = "Extracted Data" }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'samadhan-extraction.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full bg-[#0d1117] border border-gray-800 rounded-2xl overflow-hidden shadow-2xl shadow-black/20 ring-1 ring-white/5 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between px-5 py-3 border-b border-gray-800 bg-[#161b22] gap-3">
        <div className="flex items-center space-x-3">
          <div className="flex space-x-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors"></div>
          </div>
          <div className="w-px h-4 bg-gray-700 mx-2 hidden sm:block"></div>
          <Terminal className="w-4 h-4 text-indigo-400" />
          <h3 className="font-mono text-gray-400 text-xs font-semibold tracking-wider uppercase">
            {title}
          </h3>
        </div>
        
        <div className="flex items-center space-x-2 self-end sm:self-auto">
           <button
            onClick={handleDownload}
            className="flex items-center space-x-2 text-xs font-medium text-gray-400 hover:text-white transition-all bg-gray-800/50 hover:bg-gray-700 px-3 py-1.5 rounded-lg border border-transparent hover:border-gray-600"
            title="Download JSON"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Download</span>
          </button>
          
          <button
            onClick={handleCopy}
            className="flex items-center space-x-2 text-xs font-medium text-gray-400 hover:text-white transition-all bg-gray-800/50 hover:bg-gray-700 px-3 py-1.5 rounded-lg border border-transparent hover:border-gray-600"
            title="Copy to Clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Copy</span>
              </>
            )}
          </button>
        </div>
      </div>
      <div className="p-6 overflow-x-auto custom-scrollbar max-h-[500px]">
        <pre className="text-sm font-mono leading-relaxed tracking-wide">
          <code className="language-json">
            {JSON.stringify(data, null, 2).split('\n').map((line, i) => (
              <div key={i} className="table-row hover:bg-white/5 transition-colors duration-150 group">
                <span className="table-cell select-none text-gray-700 group-hover:text-gray-600 text-right pr-6 w-10 text-xs py-0.5 transition-colors">{i + 1}</span>
                <span 
                  className="table-cell py-0.5" 
                  dangerouslySetInnerHTML={{ 
                    __html: line
                      .replace(/"([^"]+)":/g, '<span class="text-sky-300 font-semibold">"$1"</span>:')
                      .replace(/: "([^"]+)"/g, ': <span class="text-emerald-300">"$1"</span>')
                      .replace(/: ([0-9]+)/g, ': <span class="text-orange-300">$1</span>')
                      .replace(/: (true|false|null)/g, ': <span class="text-pink-400">$1</span>')
                      .replace(/([{}\[\],])/g, '<span class="text-gray-500">$1</span>')
                  }} 
                />
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
};