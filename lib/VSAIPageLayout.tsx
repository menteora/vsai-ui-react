
import React from 'react';
import { Theme, ComponentDocs } from './types';

export interface VSAIPageLayoutProps {
  /** The main content of the page. */
  children?: React.ReactNode;
  /** An optional toolbar component to be placed at the top. */
  header?: React.ReactNode;
  /** An optional sidebar component to be placed on the left. */
  sidebar?: React.ReactNode;
  /** An optional footer component to be placed at the bottom. */
  footer?: React.ReactNode;
  /** If true, the header stays fixed at the top. */
  stickyHeader?: boolean;
  /** If true, the sidebar stays fixed while scrolling. */
  stickySidebar?: boolean;
  /** Width of the sidebar (default: 'w-64'). */
  sidebarWidth?: string;
  /** Visual theme. */
  theme?: Theme;
}

export const VSAIPageLayoutDocs: ComponentDocs = {
  name: "VSAIPageLayout",
  description: "Il componente contenitore principale. Organizza Header, Sidebar e Main Content in una struttura coerente e responsiva. In questo esempio vediamo una Dashboard completa che integra Toolbar, Table e Form.",
  props: [
    { name: 'header', type: 'ReactNode', defaultValue: '-', description: 'Il componente Toolbar da posizionare in alto.' },
    { name: 'sidebar', type: 'ReactNode', defaultValue: '-', description: 'Contenuto per la barra laterale sinistra.' },
    { name: 'footer', type: 'ReactNode', defaultValue: '-', description: 'Contenuto per il piè di pagina.' },
    { name: 'stickyHeader', type: 'boolean', defaultValue: 'true', description: 'Mantiene l\'header fisso durante lo scroll.' },
    { name: 'theme', type: '"light" | "dark"', defaultValue: '"light"', description: 'Tema visuale.' },
    { name: 'sidebarWidth', type: 'string', defaultValue: '"w-64"', description: 'Classe Tailwind per la larghezza della sidebar.' }
  ],
  prelude: `// Configurazione per una Dashboard realistica
const navItems = [
  { id: 'dash', label: 'Dashboard' },
  { id: 'users', label: 'Utenti' },
  { id: 'settings', label: 'Impostazioni' }
];

const tableCols = [
  { key: 'name', label: 'Progetto' },
  { key: 'status', label: 'Stato' },
  { key: 'date', label: 'Scadenza' }
];

const tableData = [
  { name: 'VSAI UI Kit', status: 'In Corso', date: '2024-05-20' },
  { name: 'App Mobile', status: 'Completato', date: '2024-04-12' },
  { name: 'Sito Web', status: 'Pianificato', date: '2024-06-01' }
];

const formFields = [
  { id: 'task', label: 'Nuovo Task', type: 'text', placeholder: 'Cosa devi fare?', required: true },
  { id: 'desc', label: 'Dettagli', type: 'textarea', placeholder: 'Aggiungi note...' }
];

const MySidebar = () => (
  <div className="p-6 space-y-6">
    <div className="space-y-4">
      <div className="text-[10px] font-bold uppercase tracking-widest opacity-50">Menu Principale</div>
      <div className="space-y-1">
        {navItems.map(i => (
          <div key={i.id} className="px-3 py-2 rounded-lg hover:bg-blue-500/10 cursor-pointer text-sm font-medium transition-colors">
            {i.label}
          </div>
        ))}
      </div>
    </div>
    <div className="pt-6 border-t border-slate-500/10">
      <div className="h-24 bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-xl p-4 flex flex-col justify-end">
        <div className="text-[10px] font-bold opacity-50">Storage</div>
        <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full mt-2 overflow-hidden">
          <div className="h-full bg-blue-500 w-3/4"></div>
        </div>
      </div>
    </div>
  </div>
);`,
  exampleProps: {
    header: `{
      <VSAIToolbar 
        theme={theme} 
        title="VSAI Admin" 
        items={navItems}
        user={{ name: 'Admin User', role: 'Superuser', avatarUrl: 'https://picsum.photos/id/64/100/100' }}
      />
    }`,
    sidebar: `{<MySidebar />}`,
    children: `{
      <div className="p-8 space-y-10">
        <section>
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Benvenuto, Admin</h2>
              <p className="text-slate-500 text-sm">Ecco lo stato attuale dei tuoi progetti.</p>
            </div>
            <VSAIButton label="Esporta Report" variant="secondary" size="sm" theme={theme} />
          </div>
          <VSAITable 
            theme={theme}
            columns={tableCols} 
            data={tableData} 
          />
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <VSAIForm 
            theme={theme}
            title="Aggiungi Task" 
            description="Assegna un nuovo compito al tuo team."
            fields={formFields}
            submitLabel="Crea Task"
            onSubmit={(v) => alert('Task Creato: ' + v.task)}
          />
          <div className="bg-blue-600 rounded-3xl p-8 text-white flex flex-col justify-center relative overflow-hidden group shadow-2xl shadow-blue-500/20">
            <div className="relative z-10">
              <h4 className="text-xl font-bold mb-2">Power User Tip</h4>
              <p className="text-blue-100 text-sm leading-relaxed mb-6">
                Sapevi che puoi cambiare il tema dell'intera applicazione in un click? 
                Prova ad usare lo switch in alto per vedere l'effetto Dark Mode.
              </p>
              <VSAIButton label="Scopri di più" variant="glass" theme={theme} />
            </div>
            <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700"></div>
          </div>
        </section>
      </div>
    }`,
    footer: `{<p>© 2024 VSAI UI Kit. Built for high-performance AI Agents.</p>}`,
    theme: "light",
    stickyHeader: true
  }
};

export const VSAIPageLayout: React.FC<VSAIPageLayoutProps> = ({
  children,
  header,
  sidebar,
  footer,
  stickyHeader = true,
  stickySidebar = true,
  sidebarWidth = "w-72",
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

      <div className="flex flex-1">
        {/* Sidebar Area */}
        {sidebar && (
          <aside className={`hidden lg:block border-r shrink-0 transition-colors duration-300 ${sidebarWidth} ${
            isDark ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-white'
          } ${stickySidebar ? 'sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto' : ''}`}>
            {sidebar}
          </aside>
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-x-hidden">
          <div className="mx-auto max-w-[1400px] h-full">
            {children}
          </div>
        </main>
      </div>

      {/* Footer Area */}
      {footer && (
        <footer className={`border-t p-8 transition-colors duration-300 ${
          isDark ? 'border-slate-800 bg-slate-900/50' : 'border-slate-100 bg-white'
        }`}>
          <div className="mx-auto max-w-[1400px] text-center text-xs font-medium text-slate-400 uppercase tracking-widest">
            {footer}
          </div>
        </footer>
      )}
    </div>
  );
};
