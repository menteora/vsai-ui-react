
import React from 'react';
import { Theme, ComponentDocs } from './types';
import { Loader2 } from 'lucide-react';

export interface VSAIButtonProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  /** If true, the button takes up the full width of its container. */
  fullWidth?: boolean;
  icon?: React.ReactNode;
  theme?: Theme;
  onClick?: () => void;
}

export const VSAIButtonDocs: ComponentDocs = {
  name: "VSAIButton",
  description: "Un pulsante versatile con supporto per diversi stili visivi, icone e indicatori di caricamento animati tramite Lucide.",
  props: [
    { name: 'label', type: 'string', defaultValue: '"Click Me"', description: 'Testo del pulsante.' },
    { name: 'variant', type: 'string', defaultValue: '"primary"', description: 'Stile: primary, secondary, danger, ghost, glass.' },
    { name: 'loading', type: 'boolean', defaultValue: 'false', description: 'Mostra uno spinner Lucide e disabilita interazioni.' },
    { name: 'icon', type: 'ReactNode', defaultValue: '-', description: 'Icona opzionale da visualizzare a sinistra.' },
    { name: 'fullWidth', type: 'boolean', defaultValue: 'false', description: 'Occupa tutta la larghezza.' },
    { name: 'theme', type: '"light" | "dark"', defaultValue: '"light"', description: 'Tema visuale.' }
  ],
  prelude: `// Gli hook e le icone sono già disponibili nello scope`,
  exampleProps: {
    label: "Salva Modifiche",
    variant: "primary",
    icon: "{<Save size={16} />}",
    onClick: "() => alert('Azione eseguita!')"
  }
};

export const VSAIButton: React.FC<VSAIButtonProps> = ({
  label, variant = 'primary', size = 'md', loading, disabled, fullWidth, icon, theme = 'light', onClick
}) => {
  const isDark = theme === 'dark';
  
  const baseStyles = "relative inline-flex items-center justify-center gap-2 font-bold transition-all rounded-xl focus:outline-none overflow-hidden group select-none cursor-pointer";
  
  const sizeStyles = {
    sm: "px-4 py-1.5 text-xs min-h-[32px]",
    md: "px-6 py-2.5 text-sm min-h-[42px]",
    lg: "px-8 py-3.5 text-base min-h-[52px]"
  };

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-500 active:scale-95 shadow-md shadow-blue-500/20",
    secondary: isDark ? "bg-slate-800 text-white hover:bg-slate-700 active:scale-95 border border-slate-700" : "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 active:scale-95",
    danger: "bg-red-500 text-white hover:bg-red-400 active:scale-95 shadow-md shadow-red-500/20",
    ghost: isDark ? "text-slate-400 hover:bg-slate-800" : "text-slate-500 hover:bg-slate-50",
    glass: isDark ? "bg-white/10 text-white backdrop-blur-md border border-white/20 hover:bg-white/20" : "bg-blue-50/50 text-blue-700 backdrop-blur-md border border-blue-200 hover:bg-blue-100/50"
  };

  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <button
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size]} ${variants[variant]} ${widthStyle} ${(disabled || loading) ? 'opacity-50 cursor-not-allowed grayscale' : ''}`}
    >
      {loading ? (
        <Loader2 className="animate-spin" size={18} />
      ) : (
        <>
          {icon && <span className="flex-shrink-0 flex items-center justify-center">{icon}</span>}
          <span>{label}</span>
        </>
      )}
    </button>
  );
};
