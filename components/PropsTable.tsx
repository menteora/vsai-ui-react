
import React from 'react';
import { PropDefinition } from '../lib/types';

interface PropsTableProps {
  props: PropDefinition[];
}

export const PropsTable: React.FC<PropsTableProps> = ({ props }) => {
  return (
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
  );
};
