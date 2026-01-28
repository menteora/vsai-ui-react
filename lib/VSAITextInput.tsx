
import React from 'react';
import { Theme, ComponentDocs } from './types';
import { AlertCircle } from 'lucide-react';

export interface VSAITextInputProps {
  label?: string;
  value?: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  /** Larghezza dell'input: 'full' occupa tutto lo spazio, 'half' occupa il 50% su desktop. */
  width?: 'full' | 'half';
  theme?: Theme;
  onChange?: (value: string) => void;
  onBlur?: () => void;
}

export const VSAITextInputDocs: ComponentDocs = {
  name: "VSAITextInput",
  description: "Input testuale con segnalazione errori basata su icone Lucide e supporto per larghezza variabile.",
  props: [
    { name: 'label', type: 'string', defaultValue: '""', description: 'Etichetta descrittiva.' },
    { name: 'width', type: '"full" | "half"', defaultValue: '"full"', description: 'Gestisce la larghezza del componente.' },
    { name: 'error', type: 'string', defaultValue: '""', description: 'Messaggio errore.' }
  ],
  prelude: `const [val, setVal] = useState("");`,
  exampleProps: {
    label: "Username",
    value: "{val}",
    width: "half",
    placeholder: "Inserisci username...",
    onChange: "setVal",
    required: true
  }
};

export const VSAITextInput: React.FC<VSAITextInputProps> = ({
  label, value, placeholder, error, required, disabled, width = 'full', theme = 'light', onChange, onBlur
}) => {
  const isDark = theme === 'dark';
  const hasError = !!error;
  const widthClass = width === 'half' ? 'w-full md:w-[calc(50%-12px)]' : 'w-full';

  return (
    <div className={`${widthClass} space-y-1.5 inline-block vertical-top`}>
      {label && (
        <label className={`block text-[11px] font-bold uppercase tracking-wider transition-colors px-1 ${
          hasError ? 'text-red-500' : isDark ? 'text-slate-400' : 'text-slate-500'
        } ${disabled ? 'opacity-50' : ''}`}>
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative group">
        <input
          type="text"
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          onBlur={onBlur}
          onChange={(e) => onChange?.(e.target.value)}
          className={`w-full px-4 py-3 rounded-xl border transition-all outline-none text-sm font-medium ${
            hasError 
              ? 'border-red-500 ring-4 ring-red-500/10 bg-red-50/10' 
              : isDark 
                ? 'bg-slate-800/50 border-slate-700 text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10' 
                : 'bg-white border-slate-200 text-slate-900 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5'
          } ${disabled ? 'opacity-50 cursor-not-allowed bg-slate-100 dark:bg-slate-900/50' : ''}`}
        />
        {hasError && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 animate-in fade-in zoom-in duration-300">
            <AlertCircle size={18} />
          </div>
        )}
      </div>
      {hasError && (
        <p className="text-[10px] font-bold text-red-500 px-1 mt-1 uppercase tracking-tight flex items-center gap-1 animate-in slide-in-from-top-1">
          <span>{error}</span>
        </p>
      )}
    </div>
  );
};
