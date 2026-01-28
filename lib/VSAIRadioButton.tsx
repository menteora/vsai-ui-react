
import React from 'react';
import { Theme, ComponentDocs } from './types';

export interface VSAIRadioOption {
  id: string;
  label: string;
}

export interface VSAIRadioButtonProps {
  label?: string;
  options: VSAIRadioOption[];
  selectedValue?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  theme?: Theme;
  onChange: (id: string) => void;
}

export const VSAIRadioButtonDocs: ComponentDocs = {
  name: "VSAIRadioButton",
  description: "A group of mutually exclusive selection buttons.",
  props: [
    { name: 'label', type: 'string', defaultValue: '""', description: 'Group label.' },
    { name: 'options', type: 'VSAIRadioOption[]', defaultValue: '[]', description: 'Available choices.' },
    { name: 'selectedValue', type: 'string', defaultValue: '""', description: 'Currently active choice ID.' },
    { name: 'error', type: 'string', defaultValue: '""', description: 'Validation message.' },
    { name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Prevents user interaction.' },
    { name: 'theme', type: '"light" | "dark"', defaultValue: '"light"', description: 'Visual theme.' }
  ],
  prelude: `const [plan, setPlan] = useState("free");`,
  exampleProps: {
    label: "Scegli il tuo piano",
    options: [
      { id: "free", label: "Piano Gratuito" },
      { id: "pro", label: "Piano Professionale" }
    ],
    selectedValue: "{plan}",
    onChange: "setPlan"
  }
};

export const VSAIRadioButton: React.FC<VSAIRadioButtonProps> = ({
  label, options, selectedValue, error, required, disabled, theme = 'light', onChange
}) => {
  const isDark = theme === 'dark';
  return (
    <div className="space-y-3">
      {label && (
        <p className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'} ${disabled ? 'opacity-50' : ''}`}>
          {label} {required && <span className="text-red-500">*</span>}
        </p>
      )}
      <div className="space-y-2">
        {options.map((opt) => (
          <label key={opt.id} className={`flex items-center gap-3 group ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}>
            <div className="relative">
              <input
                type="radio"
                name={label}
                className="sr-only"
                disabled={disabled}
                checked={selectedValue === opt.id}
                onChange={() => onChange(opt.id)}
              />
              <div className={`w-6 h-6 rounded-full border-2 transition-all flex items-center justify-center ${
                selectedValue === opt.id 
                  ? 'border-blue-600' 
                  : error ? 'border-red-500 bg-red-500/5' : isDark ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-white'
              } ${disabled ? 'grayscale' : 'group-hover:scale-110'}`}>
                {selectedValue === opt.id && (
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-in zoom-in-50 duration-200"></div>
                )}
              </div>
            </div>
            <span className={`text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{opt.label}</span>
          </label>
        ))}
      </div>
      {error && <p className="text-[11px] font-bold text-red-500 uppercase tracking-tight">{error}</p>}
    </div>
  );
};
