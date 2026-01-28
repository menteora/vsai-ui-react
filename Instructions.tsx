import React, { useState } from 'react';
import { CodeBlock } from './components/CodeBlock';
import { VSAI_VERSION } from './lib/constants';

const BuildTerminal: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [isBuilding, setIsBuilding] = useState(false);

  const startBuild = () => {
    setIsBuilding(true);
    setLogs([]);
    const buildSteps = [
      "Starting build process...",
      "Reading configuration from tsup.config.ts",
      "Checking TypeScript definitions...",
      "Bundling lib/VSAILogin.tsx...",
      "Bundling lib/VSAIToolbar.tsx...",
      "Bundling lib/VSAITable.tsx...",
      "Minifying assets...",
      "Generating dist/index.d.ts...",
      `Build success! v${VSAI_VERSION} [1.2s]`,
      "-------------------------",
      "Output: ./dist",
      "  index.mjs   (14.2 kB)",
      "  index.js    (15.8 kB)",
      "  index.d.ts  (2.4 kB)"
    ];

    buildSteps.forEach((step, i) => {
      setTimeout(() => {
        setLogs(prev => [...prev, `> ${step}`]);
        if (i === buildSteps.length - 1) setIsBuilding(false);
      }, i * 150);
    });
  };

  return (
    <div className="bg-slate-900 rounded-xl overflow-hidden shadow-2xl border border-slate-800">
      <div className="px-4 py-2 bg-slate-800 border-b border-slate-700 flex justify-between items-center">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
        </div>
        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Build Terminal</span>
      </div>
      <div className="p-6 h-64 overflow-y-auto font-mono text-xs text-blue-400 space-y-1">
        {logs.length === 0 && <span className="text-slate-500 italic">Clicca "Simula Build" per vedere il processo...</span>}
        {logs.map((log, i) => (
          <div key={i} className={log.includes('success') ? 'text-green-400' : ''}>{log}</div>
        ))}
      </div>
      <div className="p-4 bg-slate-800/50 border-t border-slate-700">
        <button 
          onClick={startBuild}
          disabled={isBuilding}
          className={`w-full py-2 rounded-lg font-bold transition-all ${isBuilding ? 'bg-slate-700 text-slate-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-500'}`}
        >
          {isBuilding ? 'Building...' : 'Simula Build (npm run build)'}
        </button>
      </div>
    </div>
  );
};

export const Instructions: React.FC = () => {
  return (
    <div className="space-y-12 pb-20">
      <header>
        <div className="flex items-center gap-3 mb-2">
          <span className="px-2 py-0.5 bg-slate-200 text-slate-700 text-[10px] font-bold uppercase rounded-md tracking-wider">Reference Guide</span>
          <span className="text-slate-400 text-sm">v{VSAI_VERSION}</span>
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">Guida all'Integrazione</h2>
        <p className="text-slate-600 text-lg">
          La libreria <strong>@menteora/vsai-ui-react</strong> è strutturata per essere modulare e facile da integrare in qualsiasi workflow.
        </p>
      </header>

      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">1</div>
          <h3 className="text-xl font-bold text-slate-800">Installazione</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <CodeBlock code={`npm install @menteora/vsai-ui-react`} />
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">2</div>
          <h3 className="text-xl font-bold text-slate-800">Utilizzo nel Progetto</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <p className="text-slate-600 text-sm">
            Tutti i componenti sono esportati singolarmente per minimizzare il bundle size tramite tree-shaking.
          </p>
          <CodeBlock code={`import { VSAILogin, VSAIToolbar } from '@menteora/vsai-ui-react';

export default function App() {
  return (
    <>
      <VSAIToolbar title="My App" />
      <VSAILogin onLogin={(e, p) => console.log(e)} />
    </>
  );
}`} />
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">3</div>
          <h3 className="text-xl font-bold text-slate-800">Testing Sandbox</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-slate-600 text-sm mb-4">
            Usa il <strong>Test Lab</strong> integrato in questa dashboard per validare le prop e il comportamento dei componenti prima dell'implementazione.
          </p>
          <BuildTerminal />
        </div>
      </section>
    </div>
  );
};