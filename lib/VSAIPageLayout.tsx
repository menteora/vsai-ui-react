
import React from 'react';
import { Theme, ComponentDocs } from './types';

export interface VSAIPageLayoutProps {
  /** Il contenuto principale della pagina. */
  children?: React.ReactNode;
  /** Un componente Toolbar opzionale da posizionare in alto. */
  header?: React.ReactNode;
  /** Un componente footer opzionale da posizionare in basso. */
  footer?: React.ReactNode;
  /** Se true, l'header rimane fisso in alto durante lo scroll. */
  stickyHeader?: boolean;
  /** Tema visuale (light o dark). */
  theme?: Theme;
}

export const VSAIPageLayoutDocs: ComponentDocs = {
  name: "VSAIPageLayout",
  description: "Il componente contenitore principale. Organizza Header, Main Content e Footer in una struttura coerente e responsiva. Ideale per dashboard e applicazioni web moderne dove la navigazione è gestita dalla Toolbar.",
  props: [
    { name: 'header', type: 'ReactNode', defaultValue: '-', description: 'Il componente Toolbar da posizionare in alto.' },
    { name: 'children', type: 'ReactNode', defaultValue: '-', description: 'Il contenuto principale della pagina.' },
    { name: 'footer', type: 'ReactNode', defaultValue: '-', description: 'Contenuto per il piè di pagina.' },
    { name: 'stickyHeader', type: 'boolean', defaultValue: 'true', description: 'Mantiene l\'header fisso durante lo scroll.' },
    { name: 'theme', type: '"light" | "dark"', defaultValue: '"light"', description: 'Tema visuale.' }
  ],
  prelude: `const navItems = [
  { id: 'dash', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
  { id: 'users', label: 'Utenti', icon: <Users size={18} /> },
  { id: 'settings', label: 'Impostazioni', icon: <Settings size={18} /> }
];

const tableCols = [
  { key: 'name', label: 'Progetto' },
  { key: 'status', label: 'Stato' },
  { key: 'progress', label: 'Progresso' }
];

const tableData = [
  { name: 'VSAI UI Kit', status: 'In Corso', progress: '75%' },
  { name: 'App Mobile', status: 'Completato', progress: '100%' },
  { name: 'Sito Web', status: 'Pianificato', progress: '0%' }
];`,
  exampleProps: {
    header: `{
      <VSAIToolbar 
        theme={theme} 
        title="VSAI Admin" 
        items={navItems}
        user={{ name: 'Admin User', role: 'Superuser', avatarUrl: 'https://picsum.photos/id/64/100/100' }}
        onThemeToggle={toggleGlobalTheme}
      />
    }`,
    children: `{
      <div className="p-8 space-y-10">
        <section className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/20">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-black tracking-tight">Panoramica Progetti</h2>
              <p className="text-slate-500 text-sm mt-1">Gestisci e monitora l'avanzamento dei tuoi task attivi.</p>
            </div>
            <VSAIButton label="Nuovo Progetto" variant="primary" size="md" theme={theme} />
          </div>
          <VSAITable 
            theme={theme}
            columns={tableCols} 
            data={tableData} 
          />
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] p-10 text-white relative overflow-hidden group shadow-2xl shadow-blue-500/30">
            <div className="relative z-10">
              <h4 className="text-2xl font-bold mb-4">Analisi Predittiva</h4>
              <p className="text-blue-100 text-base leading-relaxed mb-8 opacity-90">
                Sfrutta i nostri modelli AI per prevedere i colli di bottiglia prima che accadano. 
                Ottimizza il workflow del tuo team oggi stesso.
              </p>
              <div className="flex gap-4">
                 <VSAIButton label="Attiva Ora" variant="glass" theme={theme} />
                 <VSAIButton label="Documentazione" variant="ghost" theme={theme} />
              </div>
            </div>
            <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-white/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700"></div>
          </div>
          
          <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white flex flex-col justify-center border border-slate-800 shadow-2xl">
            <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
               <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
               Sistemi Operativi
            </h4>
            <div className="space-y-4">
               {[1, 2, 3].map(i => (
                 <div key={i} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50">
                    <span className="text-sm font-medium text-slate-300">Modulo Core #{i}</span>
                    <VSAIBadge label="Online" variant="success" theme="dark" />
                 </div>
               ))}
            </div>
          </div>
        </section>
      </div>
    }`,
    footer: `"© 2025 Menteora UI Labs. Tutti i diritti riservati."`,
    theme: "light",
    stickyHeader: true
  }
};

export const VSAIPageLayout: React.FC<VSAIPageLayoutProps> = ({
  children,
  header,
  footer,
  stickyHeader = true,
  theme = 'light'
}) => {
  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${isDark ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
      {/* Header Area */}
      {header && (
        <div className={`${stickyHeader ? 'sticky top-0 z-50' : ''}`}>
          {header}
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 overflow-x-hidden">
        <div className="mx-auto max-w-[1440px] h-full">
          {children}
        </div>
      </main>

      {/* Footer Area */}
      {footer && (
        <footer className={`border-t p-10 transition-colors duration-300 ${
          isDark ? 'border-slate-800 bg-slate-900/50' : 'border-slate-200 bg-white'
        }`}>
          <div className="mx-auto max-w-[1440px] text-center text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">
            {footer}
          </div>
        </footer>
      )}
    </div>
  );
};
