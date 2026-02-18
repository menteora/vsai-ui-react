
import React, { useState } from 'react';
import { Theme, ComponentDocs } from './types';
import { VSAITextInput } from './VSAITextInput';
import { VSAITextarea } from './VSAITextarea';
import { VSAIDateInput } from './VSAIDateInput';
import { VSAIButton } from './VSAIButton';

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
  onSubmit?: (values: Record<string, any>) => void;
}

export const VSAIFormDocs: ComponentDocs = {
  name: "VSAIForm",
  description: "Un contenitore di alto livello che renderizza automaticamente un gruppo di input. Supporta modalità 'readOnly' per la visualizzazione di dettagli.",
  props: [
    { name: 'title', type: 'string', defaultValue: '""', description: 'Titolo del form.' },
    { name: 'fields', type: 'VSAIFormField[]', defaultValue: '[]', description: 'Configurazione dei campi.' },
    { name: 'defaultValues', type: 'object', defaultValue: '{}', description: 'Dati pre-caricati.' },
    { name: 'readOnly', type: 'boolean', defaultValue: 'false', description: 'Disabilita edit e nasconde submit.' },
    { name: 'submitLabel', type: 'string', defaultValue: '"Submit"', description: 'Testo del pulsante di invio.' },
    { name: 'theme', type: '"light" | "dark"', defaultValue: '"light"', description: 'Tema grafico.' },
    { name: 'onSubmit', type: '(values) => void', defaultValue: '-', description: 'Callback di invio.' }
  ],
  exampleProps: {
    title: "Dettaglio Profilo",
    description: "Visualizzazione dati in modalità sola lettura.",
    fields: [
      { id: 'firstName', label: 'Nome', type: 'text', width: 'half' },
      { id: 'lastName', label: 'Cognome', type: 'text', width: 'half' },
      { id: 'role', label: 'Ruolo', type: 'text', width: 'full' },
      { id: 'notes', label: 'Note', type: 'textarea' }
    ],
    defaultValues: {
      firstName: "Giulia",
      lastName: "Bianchi",
      role: "Senior Developer",
      notes: "Dipendente dell'anno 2024."
    },
    readOnly: true,
    submitLabel: "Salva",
    onSubmit: "(values) => alert(JSON.stringify(values))"
  }
};

export const VSAIForm: React.FC<VSAIFormProps> = ({
  title, description, fields = [], submitLabel = "Submit", theme = 'light', defaultValues = {}, readOnly = false, onSubmit
}) => {
  const [values, setValues] = useState<Record<string, any>>(defaultValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const isDark = theme === 'dark';

  const validateField = (id: string, value: any) => {
    const field = fields.find(f => f.id === id);
    if (field?.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
      return field.errorMessage || `${field.label} è richiesto.`;
    }
    return '';
  };

  const handleChange = (id: string, value: any) => {
    setValues(prev => ({ ...prev, [id]: value }));
    
    // Validazione in tempo reale
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
      {title && <h3 className={`text-2xl font-bold mb-1 tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>{title}</h3>}
      {description && <p className={`text-sm mb-8 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{description}</p>}
      
      <div className="flex flex-wrap gap-y-6 gap-x-[24px]">
        {fields.map((f) => {
          const commonProps = {
            key: f.id,
            label: f.label,
            placeholder: f.placeholder,
            required: !readOnly && f.required, // Nasconde asterisco se readonly
            disabled: readOnly || f.disabled, // Forza disabled se readonly
            width: f.width || 'full',
            theme: theme,
            value: values[f.id] || '',
            error: errors[f.id],
            onChange: (val: any) => handleChange(f.id, val)
          };

          if (f.type === 'textarea') {
            return <VSAITextarea {...commonProps} />;
          }

          if (f.type === 'date') {
            return <VSAIDateInput {...commonProps} />;
          }
          
          return <VSAITextInput {...commonProps} />;
        })}
        
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
    </div>
  );
};
