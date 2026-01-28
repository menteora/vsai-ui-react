
import React from 'react';
import { Theme, ComponentDocs } from './types';
import { Check } from 'lucide-react';

export interface VSAICheckboxProps {
  label: string;
  checked: boolean;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  theme?: Theme;
  onChange: (checked: boolean) => void;
}

export const VSAICheckboxDocs: ComponentDocs = {
  name: "VSAICheckbox",
  description: "Input di selezione binaria con feedback visivo tramite icone Lucide.",
  props: [
    { name: 'label', type: 'string', defaultValue: '""', description: 'Testo etichetta.' },
    { name: 'checked', type: 'boolean', defaultValue: 'false', description: 'Stato attivo.' }
  ],
  prelude: `const [accepted, setAccepted] = useState(false);`,
  exampleProps: {
    label: "Accetto i termini e le condizioni",
    checked: "{accepted}",
    onChange: "setAccepted",
    required: true
  }
};

export const VSAICheckbox: React.FC<VSAICheckboxProps> = ({
  label, checked, error, required, disabled, theme = 'light', onChange
}) => {
  const isDark = theme === 'dark';
  return (
    <div className="space-y-1.5">
      <label className={`flex items-center gap-3 group select-none ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}>
        <div className="relative">
          <input
            type="checkbox"
            className="sr-only"
            checked={checked}
            disabled={disabled}
            onChange={(e) => onChange(e.target.checked)}
          />
          <div className={`w-6 h-6 rounded-lg border-2 transition-all flex items-center justify-center ${
            checked 
              ? 'bg-blue-600 border-blue-600 shadow-md shadow-blue-500/20' 
              : error 
                ? 'border-red-500 bg-red-500/5' 
                : isDark ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-white shadow-sm'
          } ${disabled ? 'grayscale' : 'group-hover:scale-105 active:scale-95'}`}>
            {checked && (
              <Check className="text-white" size={16} strokeWidth={3} />
            )}
          </div>
        </div>
        <span className={`text-sm font-semibold transition-colors ${isDark ? 'text-slate-300' : 'text-slate-700'} ${error ? 'text-red-500' : ''}`}>
          {label} {required && <span className="text-red-500">*</span>}
        </span>
      </label>
      {error && <p className="ml-9 text-[10px] font-bold text-red-500 uppercase tracking-tight animate-in slide-in-from-top-1">{error}</p>}
    </div>
  );
};
