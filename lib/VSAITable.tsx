
import React from 'react';
import { Theme, TableColumn, TableAction, TablePagination, ComponentDocs } from './types';
import { VSAIButton } from './VSAIButton';
import { MoreHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';

export interface VSAITableProps {
  /** Definizione delle colonne. */
  columns?: TableColumn[];
  /** Array di oggetti dati. */
  data?: Record<string, any>[];
  /** Configurazione della paginazione (opzionale). */
  pagination?: TablePagination;
  /** Azioni disponibili per ogni riga. */
  actions?: TableAction[];
  /** Tema visuale. */
  theme?: Theme;
  /** Callback invocata quando un'azione viene cliccata. */
  onAction?: (actionId: string, row: any) => void;
}

export const VSAITableDocs: ComponentDocs = {
  name: "VSAITable",
  description: "Una tabella dati professionale con azioni basate su icone Lucide e paginazione controllata esternamente.",
  props: [
    { name: 'columns', type: 'TableColumn[]', defaultValue: '[]', description: 'Definizione degli header.' },
    { name: 'data', type: 'any[]', defaultValue: '[]', description: 'Record da visualizzare.' },
    { name: 'pagination', type: 'TablePagination', defaultValue: 'undefined', description: 'Configurazione paginazione (current, onPageChange, [totalPages]).' },
    { name: 'actions', type: 'TableAction[]', defaultValue: '[]', description: 'Azioni con icone.' },
    { name: 'theme', type: '"light" | "dark"', defaultValue: '"light"', description: 'Tema visuale.' }
  ],
  prelude: `const [page, setPage] = useState(1);
const handleAction = (id, row) => {
  alert(\`Azione "\${id}" su: \${row.name}\`);
};`,
  exampleProps: {
    columns: [
      { key: 'name', label: 'Nome Cliente', sortable: true },
      { key: 'email', label: 'Email' },
      { key: 'status', label: 'Stato' }
    ],
    data: [
      { name: 'John Doe', email: 'john@example.com', status: 'Attivo' },
      { name: 'Sarah Connor', email: 'sarah@resistance.io', status: 'Inattivo' },
      { name: 'Arthur Morgan', email: 'arthur@outlaws.com', status: 'Attivo' }
    ],
    pagination: {
      currentPage: "{page}",
      totalPages: 10,
      onPageChange: "setPage"
    },
    actions: [
      { id: 'view', label: 'Vedi', variant: 'ghost', icon: '{<Eye size={16} />}' },
      { id: 'edit', label: 'Modifica', variant: 'primary', icon: '{<Pencil size={14} />}' },
      { id: 'delete', label: 'Elimina', variant: 'danger', icon: '{<Trash2 size={14} />}' }
    ],
    onAction: "handleAction"
  }
};

export const VSAITable: React.FC<VSAITableProps> = ({
  columns = [],
  data = [],
  actions = [],
  pagination,
  theme = 'light',
  onAction
}) => {
  const isDark = theme === 'dark';

  const safeCallAction = (id: string, row: any) => {
    if (typeof onAction === 'function') {
      onAction(id, row);
    }
  };

  const PaginationControls = () => {
    if (!pagination) return null;

    const { currentPage, totalPages, onPageChange } = pagination;
    
    // Logic: 
    // - Prev: Show if currentPage > 1
    // - Next: Show if totalPages is defined and current < total, or if totalPages is unknown (assume next exists)
    const hasPrev = currentPage > 1;
    const hasNext = totalPages ? currentPage < totalPages : true;

    return (
      <div className={`flex items-center justify-between px-6 py-4 border-t transition-colors ${
        isDark ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-500'
      }`}>
        <span className="text-xs font-bold uppercase tracking-wider opacity-70">
           Pagina {currentPage} {totalPages ? `di ${totalPages}` : ''}
        </span>
        <div className="flex items-center gap-2 min-h-[36px]">
          <button
            onClick={() => hasPrev && onPageChange(currentPage - 1)}
            disabled={!hasPrev}
            className={`p-2 rounded-lg transition-all ${
              !hasPrev 
                ? 'opacity-30 cursor-not-allowed' 
                : isDark ? 'hover:bg-slate-800 text-white' : 'hover:bg-slate-100 text-slate-900'
            }`}
          >
            <ChevronLeft size={18} />
          </button>
          
          <button
            onClick={() => hasNext && onPageChange(currentPage + 1)}
            disabled={!hasNext}
            className={`p-2 rounded-lg transition-all ${
              !hasNext 
                ? 'opacity-30 cursor-not-allowed' 
                : isDark ? 'hover:bg-slate-800 text-white' : 'hover:bg-slate-100 text-slate-900'
            }`}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      {/* Desktop View */}
      <div className={`hidden md:block overflow-hidden rounded-2xl border transition-all duration-300 ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className={isDark ? 'bg-slate-800/50' : 'bg-slate-50'}>
              <tr>
                {columns.map((col) => (
                  <th key={col.key} className={`px-6 py-4 text-[10px] font-bold uppercase tracking-widest ${
                    isDark ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    {col.label}
                  </th>
                ))}
                {actions.length > 0 && (
                  <th className={`px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-right ${
                    isDark ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    Azioni
                  </th>
                )}
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-slate-800' : 'divide-slate-100'}`}>
              {data.map((row, idx) => (
                <tr key={idx} className={`transition-colors group ${isDark ? 'hover:bg-slate-800/30' : 'hover:bg-slate-50'}`}>
                  {columns.map((col) => (
                    <td key={col.key} className={`px-6 py-4 text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      {row[col.key]}
                    </td>
                  ))}
                  {actions.length > 0 && (
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                        {actions.map((act) => (
                          <VSAIButton
                            key={act.id}
                            label={act.label}
                            variant={act.variant as any}
                            size="sm"
                            theme={theme}
                            icon={act.icon}
                            onClick={() => safeCallAction(act.id, row)}
                          />
                        ))}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Footer (Desktop) */}
        <PaginationControls />
      </div>

      {/* Mobile View */}
      <div className="md:hidden space-y-4">
        {data.map((row, idx) => (
          <div 
            key={idx} 
            className={`rounded-2xl border p-5 space-y-5 transition-all duration-300 ${
              isDark ? 'bg-slate-900 border-slate-800 shadow-xl shadow-black/20' : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
               <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">{(pagination ? (pagination.currentPage - 1) * 10 : 0) + idx + 1}</span>
               <div className="p-1 bg-slate-100 dark:bg-slate-800 rounded-md"><MoreHorizontal size={14} className="text-slate-400" /></div>
            </div>
            <div className="space-y-4">
              {columns.map((col) => (
                <div key={col.key} className="flex justify-between items-start gap-4 border-b border-slate-100 dark:border-slate-800 pb-2">
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                    {col.label}
                  </span>
                  <span className={`text-sm font-semibold text-right ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                    {row[col.key]}
                  </span>
                </div>
              ))}
            </div>
            
            {actions.length > 0 && (
              <div className="flex flex-wrap gap-2 justify-end pt-2">
                {actions.map((act) => (
                  <VSAIButton
                    key={act.id}
                    label={act.label}
                    variant={act.variant as any}
                    size="sm"
                    theme={theme}
                    icon={act.icon}
                    onClick={() => safeCallAction(act.id, row)}
                  />
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Pagination Footer (Mobile - Standalone Card) */}
        {pagination && (
          <div className={`rounded-2xl border transition-all duration-300 ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <PaginationControls />
          </div>
        )}
      </div>
    </div>
  );
};
