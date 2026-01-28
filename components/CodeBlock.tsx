
import React from 'react';

interface CodeBlockProps {
  code: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code }) => {
  return (
    <div className="relative group">
      <div className="absolute top-4 right-4 text-xs font-mono text-gray-400 uppercase tracking-widest">
        React Code
      </div>
      <pre className="overflow-x-auto rounded-xl bg-gray-900 p-6 text-sm leading-relaxed text-gray-100 shadow-lg border border-gray-800">
        <code>{code}</code>
      </pre>
      <button 
        onClick={() => navigator.clipboard.writeText(code)}
        className="absolute bottom-4 right-4 rounded-md bg-gray-800 px-3 py-1 text-xs text-gray-300 hover:bg-gray-700 transition-colors"
      >
        Copy Code
      </button>
    </div>
  );
};
