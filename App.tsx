
import React, { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import * as VSAI from './lib';
import { ShowcaseLayout } from './components/ShowcaseLayout';
import { PropsTable } from './components/PropsTable';
import { Instructions } from './Instructions';
import * as LucideIcons from 'lucide-react';
import { Zap, Monitor, Smartphone, Sun, Moon, Code2, Layers, BookOpen } from 'lucide-react';

// Scope for react-live editor
const liveScope = { 
  React, 
  useState, 
  useEffect, 
  useMemo,
  ...VSAI,
  ...LucideIcons
};

/**
 * Generates a JSX string for the live preview.
 */
const generateLiveJSX = (componentName: string, props: Record<string, any>, prelude?: string) => {
  const propsStrings: string[] = [];
  const currentTheme = props.theme || 'light';
  
  const knownHandlers = ['handleValidation', 'handleLogin', 'handleNavigation', 'handleAction', 'onClose', 'onSubmit', 'onThemeToggle', 'toggleGlobalTheme'];

  Object.entries(props).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    
    if (typeof value === 'string') {
      const trimmed = value.trim();
      if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
        // It's a JSX block or JS expression
        propsStrings.push(`${key}=${trimmed}`);
      } else if (
        trimmed.includes('=>') || 
        knownHandlers.includes(trimmed) || 
        trimmed.startsWith('set') || 
        key.startsWith('on')
      ) {
        propsStrings.push(`${key}={${trimmed}}`);
      } else {
        // Safe string injection using JSON.stringify to handle quotes and newlines
        propsStrings.push(`${key}={${JSON.stringify(value)}}`);
      }
    } else if (typeof value === 'boolean') {
      if (value) propsStrings.push(`${key}`);
      else propsStrings.push(`${key}={false}`);
    } else if (typeof value === 'object') {
      const stringified = JSON.stringify(value);
      // Clean up common string-wrapped expressions if they exist in objects
      const processed = stringified.replace(/"\{(.+?)\}"/g, (match, p1) => {
        return p1.replace(/\\"/g, '"');
      });
      propsStrings.push(`${key}={${processed}}`);
    } else if (typeof value === 'number') {
      propsStrings.push(`${key}={${value}}`);
    }
  });

  return `
const Demo = () => {
  const theme = "${currentTheme}";
  
  ${prelude || ''}
  
  return (
    <${componentName} 
      ${propsStrings.join('\n      ')}
    />
  );
};

render(<Demo />);
`.trim();
};

const ResponsivePreview: React.FC<{ 
  children: React.ReactNode; 
  theme: VSAI.Theme;
  isFullPage?: boolean;
}> = ({ children, theme, isFullPage }) => {
  const [contentRef, setContentRef] = useState<HTMLIFrameElement | null>(null);
  const [isReady, setIsReady] = useState(false);
  const mountNode = contentRef?.contentWindow?.document?.body;

  useEffect(() => {
    if (!contentRef || !contentRef.contentDocument) return;
    const doc = contentRef.contentDocument;
    const head = doc.head;
    
    head.innerHTML = '';
    
    const tailwindScript = document.createElement('script');
    tailwindScript.src = "https://cdn.tailwindcss.com";
    tailwindScript.onload = () => {
      const checkTailwind = () => {
        if ((contentRef.contentWindow as any).tailwind) {
          setIsReady(true);
        } else {
          setTimeout(checkTailwind, 50);
        }
      };
      checkTailwind();
    };
    head.appendChild(tailwindScript);

    const fontMain = document.createElement('link');
    fontMain.rel = 'stylesheet';
    fontMain.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
    head.appendChild(fontMain);

    const style = document.createElement('style');
    style.textContent = `
      body { 
        font-family: 'Inter', sans-serif; 
        margin: 0; 
        padding: 0; 
        background-color: ${theme === 'dark' ? '#020617' : '#ffffff'}; 
        transition: background-color 0.3s ease; 
        overflow-x: hidden;
      }
      * { box-sizing: border-box; }
      html, body { min-height: 100%; height: 100%; }
      body { display: flex; align-items: stretch; justify-content: stretch; }
      #preview-root { width: 100%; display: flex; flex-direction: column; }
    `;
    head.appendChild(style);
  }, [contentRef, theme]);

  return (
    <iframe 
      title="Preview" 
      className="border-0 w-full h-full block" 
      ref={setContentRef}
      style={{ pointerEvents: 'auto' }}
    >
      {isReady && mountNode && createPortal(
        <div id="preview-root" className={`${theme === 'dark' ? 'dark text-white' : 'text-slate-900'} ${isFullPage ? '' : 'p-8'}`}>
          {children}
        </div>, 
        mountNode
      )}
    </iframe>
  );
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<any>('login');
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [globalTheme, setGlobalTheme] = useState<VSAI.Theme>('light');

  const activeDocs = useMemo(() => {
    const docsMap: Record<string, VSAI.ComponentDocs> = {
      login: VSAI.VSAILoginDocs, 
      toolbar: VSAI.VSAIToolbarDocs, 
      table: VSAI.VSAITableDocs, 
      form: VSAI.VSAIFormDocs,
      pagelayout: VSAI.VSAIPageLayoutDocs,
      textinput: VSAI.VSAITextInputDocs, 
      textarea: VSAI.VSAITextareaDocs, 
      button: VSAI.VSAIButtonDocs,
      snackbar: VSAI.VSAISnackbarDocs, 
      dateinput: VSAI.VSAIDateInputDocs, 
      checkbox: VSAI.VSAICheckboxDocs,
      radiobutton: VSAI.VSAIRadioButtonDocs,
      select: VSAI.VSAISelectDocs,
      switch: VSAI.VSAISwitchDocs,
      badge: VSAI.VSAIBadgeDocs
    };
    return docsMap[activeTab] || VSAI.VSAILoginDocs;
  }, [activeTab]);

  const toggleGlobalTheme = () => setGlobalTheme(prev => prev === 'light' ? 'dark' : 'light');

  const initialCode = useMemo(() => {
    const props: Record<string, any> = { 
      ...(activeDocs.exampleProps || {}), 
      theme: globalTheme
    };
    
    if ('onThemeToggle' in (activeDocs.exampleProps || {}) || activeTab === 'login' || activeTab === 'toolbar') {
      props.onThemeToggle = 'toggleGlobalTheme';
    }

    return generateLiveJSX(activeDocs.name, props, activeDocs.prelude);
  }, [activeDocs, globalTheme, activeTab]);

  const isFullPageComponent = activeTab === 'login' || activeTab === 'pagelayout';

  if (activeTab === 'instructions') {
    return (
      <ShowcaseLayout activeTab={activeTab} onTabChange={setActiveTab} version={VSAI.VSAI_VERSION}>
        <Instructions />
      </ShowcaseLayout>
    );
  }

  return (
    <ShowcaseLayout activeTab={activeTab} onTabChange={setActiveTab} version={VSAI.VSAI_VERSION}>
      <header className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-100 rounded-xl text-blue-600"><Zap size={20} fill="currentColor" /></div>
          <span className="px-3 py-1 bg-slate-200 text-slate-700 text-[10px] font-extrabold uppercase rounded-full tracking-widest">Live Playground</span>
        </div>
        <h1 className="text-5xl font-black text-slate-900 mb-3 tracking-tight">{activeDocs.name}</h1>
        <h2 className="text-slate-500 text-xl max-w-3xl font-medium leading-relaxed">{activeDocs.description}</h2>
      </header>

      <div className="flex flex-col gap-12">
        <LiveProvider code={initialCode} scope={{ ...liveScope, toggleGlobalTheme }} noInline={true}>
          <section className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-xl shadow-slate-200/40 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
               <div className="mt-1 p-2 bg-slate-900 text-white rounded-lg"><Code2 size={18} /></div>
               <div>
                  <h3 className="text-lg font-bold text-slate-900 leading-tight">Interattività Real-time</h3>
                  <p className="text-sm text-slate-500 mt-1">Sperimenta con le prop e visualizza i cambiamenti istantaneamente.</p>
               </div>
            </div>
            <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-2xl border border-slate-100">
               <button 
                onClick={() => setGlobalTheme('light')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${globalTheme === 'light' ? 'bg-white shadow-md text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
               >
                 <Sun size={14} /> Light
               </button>
               <button 
                onClick={() => setGlobalTheme('dark')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${globalTheme === 'dark' ? 'bg-slate-900 shadow-lg text-white' : 'text-slate-400 hover:text-slate-600'}`}
               >
                 <Moon size={14} /> Dark
               </button>
            </div>
          </section>

          <section className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200/60 w-full group">
            <div className="px-8 py-5 border-b border-slate-100 bg-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                 <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Interactive Preview</span>
              </div>
              <div className="flex bg-slate-100 p-1.5 rounded-xl border border-slate-200/50">
                <button 
                  onClick={() => setViewMode('desktop')} 
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${viewMode === 'desktop' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  <Monitor size={14} /> Desktop
                </button>
                <button 
                  onClick={() => setViewMode('mobile')} 
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${viewMode === 'mobile' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  <Smartphone size={14} /> Mobile
                </button>
              </div>
            </div>
            <div className="bg-slate-50/50 flex justify-center p-4 md:p-12 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-40"></div>
              <div className={`relative bg-white shadow-2xl border border-slate-200 rounded-3xl overflow-hidden transition-all duration-700 ${viewMode === 'mobile' ? 'w-[375px] h-[667px]' : 'w-full min-h-[600px]'}`}>
                <p className="hidden">Responsive Preview Container</p>
                <ResponsivePreview theme={globalTheme} isFullPage={isFullPageComponent}>
                  <LivePreview />
                </ResponsivePreview>
              </div>
            </div>
          </section>

          <div className="space-y-16 pb-24">
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                  <div className="p-2 bg-blue-600 text-white rounded-xl"><Code2 size={20} /></div>
                  Live Code Editor
                </h3>
              </div>
              <div className="relative">
                <div className="rounded-[2.5rem] overflow-hidden border border-slate-800 shadow-2xl ring-4 ring-slate-100">
                  <LiveEditor className="font-mono text-sm min-h-[300px]" style={{ padding: '3rem' }} />
                </div>
                <LiveError className="mt-6 p-6 bg-red-50 border-l-4 border-red-500 text-red-600 rounded-2xl text-xs font-mono whitespace-pre-wrap shadow-lg" />
              </div>
            </section>

            <section className="space-y-8">
              <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                <div className="p-2 bg-slate-900 text-white rounded-xl"><Layers size={20} /></div>
                API Reference
              </h3>
              <PropsTable props={activeDocs.props} componentName={activeDocs.name} />
            </section>
          </div>
        </LiveProvider>
      </div>
    </ShowcaseLayout>
  );
};

export default App;
