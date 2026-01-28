
import React from 'react';
import { Theme, ComponentDocs } from './types';

export interface VSAITextareaProps {
  label?: string;
  value?: string;
  placeholder?: string;
  rows?: number;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  /** Larghezza dell'input: 'full' occupa tutto lo spazio, 'half' occupa il 50% su desktop. */
  width?: 'full' | 'half';
  theme?: Theme;
  onChange?: (value: string) => void;
}

export const VSAITextareaDocs: ComponentDocs = {
  name: "VSAITextarea",
  description: "A large text input area for multi-line content with flexible layout.",
  props: [
    { name: 'label', type: 'string', defaultValue: '""', description: 'Label text.' },
    { name: 'width', type: '"full" | "half"', defaultValue: '"full"', description: 'Sets the component width.' },
    { name: 'value', type: 'string', defaultValue: '""', description: 'Current value.' },
    { name: 'rows', type: 'number', defaultValue: '4', description: 'Number of visible text lines.' },
    { name: 'error', type: 'string', defaultValue: '""', description: 'Error message.' },
    { name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Prevents user interaction.' },
    { name: 'theme', type: '"light" | "dark"', defaultValue: '"light"', description: 'Visual theme.' }
  ],
  prelude: `const [bio, setBio] = useState("");`,
  exampleProps: {
    label: "Biography",
    value: "{bio}",
    width: "full",
    placeholder: "Tell us about yourself...",
    rows: 5,
    onChange: "setBio"
  }
};

export const VSAITextarea: React.FC<VSAITextareaProps> = ({
  label, value, placeholder, rows = 4, error, required, disabled, width = 'full', theme = 'light', onChange
}) => {
  const isDark = theme === 'dark';
  const widthClass = width === 'half' ? 'w-full md:w-[calc(50%-12px)]' : 'w-full';

  return (
    <div className={`${widthClass} space-y-1.5 inline-block vertical-top`}>
      {label && (
        <label className={`block text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'} ${disabled ? 'opacity-50' : ''}`}>
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <textarea
        rows={rows}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(e) => onChange?.(e.target.value)}
        className={`w-full px-4 py-2.5 rounded-xl border transition-all outline-none text-sm font-medium resize-none ${
          error 
            ? 'border-red-500 ring-4 ring-red-500/10' 
            : isDark 
              ? 'bg-slate-800 border-slate-700 text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10' 
              : 'bg-white border-slate-200 text-slate-900 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5'
        } ${disabled ? 'opacity-50 cursor-not-allowed grayscale bg-slate-100 dark:bg-slate-900/50' : ''}`}
      />
      {error && <p className="text-[11px] font-bold text-red-500 mt-1 uppercase tracking-tight">{error}</p>}
    </div>
  );
};
