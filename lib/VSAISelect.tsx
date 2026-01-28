import React from 'react';
import { Theme, ComponentDocs } from './types';
import { ChevronDown } from 'lucide-react';

export interface VSAISelectOption {
  value: string;
  label: string;
}

export interface VSAISelectProps {
  label?: string;
  options: VSAISelectOption[];
  value?: string;
  error?: string;
  placeholder?: string;
  disabled?: boolean;
  theme?: Theme;
  onChange?: (value: string) => void;
}

export const VSAISelectDocs: ComponentDocs = {
  name: "VSAISelect",
  description: "Dropdown personalizzato con supporto per temi e stati di errore, coerente con l'estetica degli altri input.",
  props: [
    { name: 'label', type: 'string', defaultValue: '""', description: 'Etichetta del campo.' },
    { name: 'options', type: 'VSAISelectOption[]', defaultValue: '[]', description: 'Lista di opzioni.' },
    { name: 'theme', type: '"light" | "dark"', defaultValue: '"light"', description: 'Tema visuale.' }
  ],
  prelude: `const [choice, setChoice] = useState("");`,
  exampleProps: {
    label: "Ruolo Utente",
    placeholder: "Seleziona un ruolo...",
    options: [
      { value: 'admin', label: 'Amministratore' },
      { value: 'editor', label: 'Editor' },
      { value: 'viewer', label: 'Visualizzatore' }
    ],
    value: "{choice}",
    onChange: "setChoice"
  }
};

export const VSAISelect: React.FC<VSAISelectProps> = ({
  label, options, value, error, placeholder = "Seleziona...", disabled, theme = 'light', onChange
}) => {
  const isDark = theme === 'dark';
  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label className={`block text-[11px] font-bold uppercase tracking-wider px-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          {label}
        </label>
      )}
      <div className="relative group">
        <select
          disabled={disabled}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className={`w-full appearance-none px-4 py-3 rounded-xl border transition-all outline-none text-sm font-medium pr-10 ${
            error 
              ? 'border-red-500 ring-4 ring-red-500/10' 
              : isDark 
                ? 'bg-slate-800 border-slate-700 text-white focus:border-blue-500' 
                : 'bg-white border-slate-200 text-slate-900 focus:border-blue-600'
          } ${disabled ? 'opacity-50 cursor-not-allowed grayscale' : ''}`}
        >
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
          <ChevronDown size={18} />
        </div>
      </div>
      {error && <p className="text-[10px] font-bold text-red-500 uppercase tracking-tight px-1">{error}</p>}
    </div>
  );
};