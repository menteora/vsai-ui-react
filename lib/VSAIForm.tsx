
import React, { useState, useEffect } from 'react';
import { Theme, ComponentDocs } from './types';
import { VSAITextInput } from './VSAITextInput';
import { VSAITextarea } from './VSAITextarea';
import { VSAIDateInput } from './VSAIDateInput';
import { VSAIButton } from './VSAIButton';
import { Loader2 } from 'lucide-react';

export interface VSAIFormField {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'date' | 'checkbox' | 'radio';
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  /** Larghezza del campo nel form: 'full' occupa l'intera riga, 'half' la metà. */
  width?: 'full' | 'half';
  /** Messaggio d'errore personalizzato se il campo è vuoto. */
  errorMessage?: string;
}

export interface VSAIFormProps {
  title?: string;
  description?: string;
  fields?: VSAIFormField[];
  submitLabel?: string;
  theme?: Theme;
  /** Valori iniziali per pre-popolare il form (utile per edit o view mode). */
  defaultValues?: Record<string, any>;
  /** Se true, il form diventa di sola lettura: i campi sono disabilitati e il bottone è nascosto. */
  readOnly?: boolean;
  /** Se true, mostra uno stato di caricamento al posto dei campi (utile per il fetching iniziale). */
  isLoading?: boolean;
  onSubmit?: (values: Record<string, any>) => void;
  /** Contenuto personalizzato (React Node) da renderizzare tra i campi generati e il footer. */
  children?: React.ReactNode;
}

export const VSAIFormDocs: ComponentDocs = {
  name: "VSAIForm",
  description: "Un contenitore di alto livello che renderizza automaticamente un gruppo di input. Supporta modalità 'readOnly', caricamento dati e iniezione di componenti custom.",
  props: [
    { name: 'title', type: 'string', defaultValue: '""', description: 'Titolo del form.' },
    { name: 'fields', type: 'VSAIFormField[]', defaultValue: '[]', description: 'Configurazione dei campi.' },
    { name: 'children', type: 'ReactNode', defaultValue: '-', description: 'Elementi custom.' },
    { name: 'defaultValues', type: 'object', defaultValue: '{}', description: 'Dati pre-caricati.' },
    { name: 'readOnly', type: 'boolean', defaultValue: 'false', description: 'Disabilita edit e nasconde submit.' },
    { name: 'isLoading', type: 'boolean', defaultValue: 'false', description: 'Mostra loader al posto dei campi.' },
    { name: 'submitLabel', type: 'string', defaultValue: '"Submit"', description: 'Testo del pulsante di invio.' },
    { name: 'theme', type: '"light" | "dark"', defaultValue: '"light"', description: 'Tema grafico.' },
    { name: 'onSubmit', type: '(values) => void', defaultValue: '-', description: 'Callback di invio.' }
  ],
  exampleProps: {
    title: "Profilo Utente",
    description: "Modifica i tuoi dati personali.",
    fields: [
      { id: 'name', label: 'Nome Completo', type: 'text', width: 'half' },
      { id: 'role', label: 'Ruolo', type: 'text', width: 'half' }
    ],
    defaultValues: { name: 'Mario Rossi', role: 'Developer' },
    isLoading: false,
    submitLabel: "Salva",
    onSubmit: "(values) => alert(JSON.stringify(values))"
  }
};

export const VSAIForm: React.FC<VSAIFormProps> = ({
  title, description, fields = [], submitLabel = "Submit", theme = 'light', defaultValues = {}, readOnly = false, onSubmit, children, isLoading = false
}) => {
  const [values, setValues] = useState<Record<string, any>>(defaultValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const isDark = theme === 'dark';

  // Sincronizza lo stato locale quando defaultValues cambia (es. dopo il caricamento dati)
  useEffect(() => {
    setValues(defaultValues);
  }, [defaultValues]);

  const validateField = (id: string, value: any) => {
    const field = fields.find(f => f.id === id);
    if (field?.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
      return field.errorMessage || `${field.label} è richiesto.`;
    }
    return '';
  };

  const handleChange = (id: string, value: any) => {
    setValues(prev => ({ ...prev, [id]: value }));
    const error = validateField(id, value);
    setErrors(prev => ({ ...prev, [id]: error }));
  };

  const handleSubmit = () => {
    const newErrors: Record<string, string> = {};
    let hasErrors = false;

    fields.forEach(f => {
      const error = validateField(f.id, values[f.id]);
      if (error) {
        newErrors[f.id] = error;
        hasErrors = true;
      }
    });

    setErrors(newErrors);

    if (!hasErrors) {
      onSubmit?.(values);
    }
  };

  return (
    <div className={`w-full max-w-2xl mx-auto p-8 rounded-3xl border transition-all duration-300 ${
      isDark 
        ? 'bg-slate-900 border-slate-800 shadow-2xl shadow-black/50' 
        : 'bg-white border-slate-100 shadow-xl shadow-slate-200/50'
    }`}>
      {/* Header sempre visibile per mantenere contesto */}
      {title && <h3 className={`text-2xl font-bold mb-1 tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>{title}</h3>}
      {description && <p className={`text-sm mb-8 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{description}</p>}
      
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-12 gap-3 animate-in fade-in duration-300">
          <Loader2 size={32} className={`animate-spin ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
          <span className={`text-[10px] font-bold uppercase tracking-widest ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
            Caricamento modulo...
          </span>
        </div>
      ) : (
        <div className="flex flex-wrap gap-y-6 gap-x-[24px]">
          {fields.map((f) => {
            const commonProps = {
              label: f.label,
              placeholder: f.placeholder,
              required: !readOnly && f.required,
              disabled: readOnly || f.disabled,
              width: f.width || 'full',
              theme: theme,
              value: values[f.id] || '',
              error: errors[f.id],
              onChange: (val: any) => handleChange(f.id, val)
            };

            if (f.type === 'textarea') {
              return <VSAITextarea key={f.id} {...commonProps} />;
            }

            if (f.type === 'date') {
              return <VSAIDateInput key={f.id} {...commonProps} />;
            }
            
            return <VSAITextInput key={f.id} {...commonProps} />;
          })}
          
          {children && (
            <div className="w-full">
              {children}
            </div>
          )}
          
          {!readOnly && (
            <div className="pt-4 w-full">
              <VSAIButton 
                label={submitLabel} 
                theme={theme} 
                fullWidth 
                onClick={handleSubmit}
                variant="primary"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
