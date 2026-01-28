import React from 'react';
import { Theme, ComponentDocs } from './types';

export interface VSAIBadgeProps {
  label: string;
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'neutral';
  theme?: Theme;
}

export const VSAIBadgeDocs: ComponentDocs = {
  name: "VSAIBadge",
  description: "Piccola etichetta di stato per indicare categorie o condizioni (es. Attivo, Inattivo, New).",
  props: [
    { name: 'label', type: 'string', defaultValue: '"Badge"', description: 'Testo dell\'etichetta.' },
    { name: 'variant', type: 'string', defaultValue: '"neutral"', description: 'Colore: primary, success, warning, error, neutral.' }
  ],
  exampleProps: {
    label: "Completato",
    variant: "success"
  }
};

export const VSAIBadge: React.FC<VSAIBadgeProps> = ({ label, variant = 'neutral', theme = 'light' }) => {
  const isDark = theme === 'dark';
  const variants = {
    primary: "bg-blue-100 text-blue-700 border-blue-200",
    success: "bg-emerald-100 text-emerald-700 border-emerald-200",
    warning: "bg-amber-100 text-amber-700 border-amber-200",
    error: "bg-rose-100 text-rose-700 border-rose-200",
    neutral: isDark ? "bg-slate-800 text-slate-300 border-slate-700" : "bg-slate-100 text-slate-600 border-slate-200"
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${variants[variant]}`}>
      {label}
    </span>
  );
};