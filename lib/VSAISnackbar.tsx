
import React, { useEffect } from 'react';
import { Theme, ComponentDocs } from './types';
import { CheckCircle2, AlertCircle, Info as InfoIcon, X, AlertTriangle } from 'lucide-react';

export interface VSAISnackbarProps {
  /** Il messaggio testuale da visualizzare. */
  message: string;
  /** Tipo di feedback: determina il colore e l'icona preimpostata. */
  type?: 'success' | 'error' | 'warning' | 'info';
  /** Controlla la visibilità della snackbar. */
  visible: boolean;
  /** Durata in millisecondi prima della chiusura automatica. Impostare 0 per disabilitare. */
  duration?: number;
  /** Callback invocata quando la snackbar viene chiusa (manualmente o via timer). */
  onClose: () => void;
  /** Tema visuale della snackbar. */
  theme?: Theme;
}

export const VSAISnackbarDocs: ComponentDocs = {
  name: "VSAISnackbar",
  description: "Sistema di notifiche toast con 4 stati preimpostati (Success, Error, Warning, Info). Utilizza icone Lucide e animazioni fluide per un feedback non invasivo.",
  props: [
    { name: 'message', type: 'string', defaultValue: '""', description: 'Testo da visualizzare.' },
    { name: 'type', type: '"success" | "error" | "warning" | "info"', defaultValue: '"info"', description: 'Stato del feedback.' },
    { name: 'visible', type: 'boolean', defaultValue: 'false', description: 'Stato visibilità.' },
    { name: 'duration', type: 'number', defaultValue: '3000', description: 'Timeout in ms.' },
    { name: 'onClose', type: '() => void', defaultValue: '-', description: 'Callback di chiusura.' }
  ],
  prelude: `const [visible, setVisible] = React.useState(true);`,
  exampleProps: {
    visible: "{visible}",
    message: "Attenzione: sessione in scadenza tra 5 minuti.",
    type: "warning",
    onClose: "() => setVisible(false)"
  }
};

export const VSAISnackbar: React.FC<VSAISnackbarProps> = ({
  message, type = 'info', visible, duration = 3000, onClose, theme = 'light'
}) => {
  useEffect(() => {
    if (visible && duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [visible, duration, onClose]);

  const typeConfig = {
    success: { 
      styles: "bg-emerald-600 text-white border-emerald-500 shadow-emerald-500/20", 
      icon: <CheckCircle2 size={18} /> 
    },
    error: { 
      styles: "bg-rose-600 text-white border-rose-500 shadow-rose-500/20", 
      icon: <AlertCircle size={18} /> 
    },
    warning: { 
      styles: "bg-amber-500 text-slate-900 border-amber-400 shadow-amber-500/20", 
      icon: <AlertTriangle size={18} /> 
    },
    info: { 
      styles: "bg-blue-600 text-white border-blue-500 shadow-blue-500/20", 
      icon: <InfoIcon size={18} /> 
    }
  };

  const { styles, icon } = typeConfig[type];

  return (
    <div 
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] px-5 py-3.5 rounded-2xl shadow-2xl border backdrop-blur-lg flex items-center gap-3 transition-all duration-500 ease-out min-w-[340px] max-w-[90vw] ${styles} ${
        visible 
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-0 translate-y-12 scale-95 pointer-events-none'
      }`}
    >
      <span className="flex-shrink-0 flex items-center justify-center bg-white/10 p-1.5 rounded-lg">
        {icon}
      </span>
      <span className="text-sm font-bold tracking-tight flex-grow leading-tight">
        {message}
      </span>
      <button 
        onClick={onClose} 
        className="p-1.5 hover:bg-black/10 rounded-xl transition-colors ml-2 cursor-pointer flex items-center justify-center"
        aria-label="Chiudi"
      >
        <X size={16} strokeWidth={3} />
      </button>
    </div>
  );
};
