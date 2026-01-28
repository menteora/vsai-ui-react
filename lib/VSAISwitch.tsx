import React from 'react';
import { Theme, ComponentDocs } from './types';

export interface VSAISwitchProps {
  label?: string;
  checked: boolean;
  disabled?: boolean;
  theme?: Theme;
  onChange: (checked: boolean) => void;
}

export const VSAISwitchDocs: ComponentDocs = {
  name: "VSAISwitch",
  description: "Un interruttore fluido per abilitare o disabilitare opzioni singole.",
  props: [
    { name: 'label', type: 'string', defaultValue: '""', description: 'Testo descrittivo.' },
    { name: 'checked', type: 'boolean', defaultValue: 'false', description: 'Stato attivo.' }
  ],
  prelude: `const [enabled, setEnabled] = useState(true);`,
  exampleProps: {
    label: "Notifiche Desktop",
    checked: "{enabled}",
    onChange: "setEnabled"
  }
};

export const VSAISwitch: React.FC<VSAISwitchProps> = ({
  label, checked, disabled, theme = 'light', onChange
}) => {
  const isDark = theme === 'dark';
  return (
    <label className={`flex items-center gap-3 cursor-pointer select-none ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
      <div className="relative">
        <input 
          type="checkbox" 
          className="sr-only" 
          checked={checked} 
          disabled={disabled}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div className={`w-11 h-6 rounded-full transition-colors duration-300 ${
          checked ? 'bg-blue-600' : isDark ? 'bg-slate-700' : 'bg-slate-200'
        }`}></div>
        <div className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 shadow-sm ${
          checked ? 'translate-x-5' : 'translate-x-0'
        }`}></div>
      </div>
      {label && <span className={`text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{label}</span>}
    </label>
  );
};