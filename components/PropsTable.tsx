
import React, { useState } from 'react';
import { PropDefinition } from '../lib/types';
import { Copy, Check, FileText } from 'lucide-react';

interface PropsTableProps {
  props: PropDefinition[];
  componentName?: string;
}

export const PropsTable: React.FC<PropsTableProps> = ({ props, componentName }) => {
  const [copied, setCopied] = useState(false);

  const generateMarkdown = () => {
    const title = componentName ? `API Reference: <${componentName} />` : 'API Reference';
    const header = `| Property | Type | Default | Description |\n| :--- | :--- | :--- | :--- |`;
    const rows = props.map(p => {
       const cleanType = p.type.replace(/\|/g, '\\|').replace(/\n/g, ' ');
       const cleanDesc = p.description.replace(/\|/g, '\\|').replace(/\n/g, ' ');
       const cleanDefault = (p.defaultValue || '-').replace(/\|/g, '\\|');
       return `| **${p.name}** | \`${cleanType}\` | \`${cleanDefault}\` | ${cleanDesc} |`;
    }).join('\n');
    
    return `### ${title}\n\n${header}\n${rows}`;
  };

  const handleCopy = () => {
    const md = generateMarkdown();
    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-end">
        <button 
           onClick={handleCopy}
           className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all border ${
             copied 
               ? 'bg-emerald-50 text-emerald-600 border-emerald-200' 
               : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:text-slate-800 hover:shadow-sm'
           }`}
         >
           {copied ? <Check size={12} strokeWidth={3} /> : <FileText size={12} />}
           {copied ? 'Copiato!' : 'Copia MD'}
         </button>
      </div>
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 w-1/4">Property</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 w-1/4">Type</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 w-1/4">Default</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 w-1/4">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {props.map((prop) => (
              <tr key={prop.name} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 align-top">
                  <code className="text-sm font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded leading-relaxed">{prop.name}</code>
                </td>
                <td className="px-6 py-4 align-top">
                  <code className="text-[12px] font-mono text-pink-600 bg-pink-50 px-2 py-0.5 rounded whitespace-nowrap">{prop.type}</code>
                </td>
                <td className="px-6 py-4 align-top text-sm font-medium text-slate-500 italic">
                  {prop.defaultValue || '-'}
                </td>
                <td className="px-6 py-4 align-top text-sm text-slate-600 leading-relaxed">
                  {prop.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
