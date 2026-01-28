
import React, { useState } from 'react';
import { CodeBlock } from './CodeBlock';

interface InstructionsProps {
  version?: string;
}

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
      "Build success! [1.2s]",
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

export const Instructions: React.FC<InstructionsProps> = ({ version }) => {
  return (
    <div className="space-y-12 pb-20">
      <header>
        <div className="flex items-center gap-3 mb-2">
          <span className="px-2 py-0.5 bg-slate-200 text-slate-700 text-[10px] font-bold uppercase rounded-md tracking-wider">Reference Guide</span>
          <span className="text-slate-400 text-sm">v{version || '...'}</span>
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">Guida all'Integrazione</h2>
        <p className="text-slate-600 text-lg">
          La libreria è strutturata per essere modulare e facile da integrare sia in ambienti umani che in flussi di lavoro guidati dall'AI.
        </p>
      </header>

      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">1</div>
          <h3 className="text-xl font-bold text-slate-800">Come compilare la libreria</h3>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <p className="text-slate-600">
              Il comando <code>npm run build</code> utilizza <strong>tsup</strong> per generare pacchetti ottimizzati. 
              Viene prodotta una cartella <code>/dist</code> che contiene tutto il necessario per la pubblicazione.
            </p>
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <h4 className="text-sm font-bold text-slate-700 mb-2">Comandi principali:</h4>
              <ul className="text-sm text-slate-600 space-y-2">
                <li><code>• npm install</code> - Installa le dipendenze</li>
                <li><code>• npm run build</code> - Compila per la produzione</li>
                <li><code>• npm run dev</code> - Modalità sviluppo (watch)</li>
              </ul>
            </div>
          </div>
          <BuildTerminal />
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">2</div>
          <h3 className="text-xl font-bold text-slate-800">Integrazione in un progetto esterno</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <p className="text-slate-600 text-sm">
            Dopo la compilazione, puoi importare la libreria direttamente da file o via NPM.
          </p>
          <CodeBlock code={`// Importazione standard
import { VSAILogin, VSAIToolbar, VSAITable } from 'vsai-ui-kit';

// Esempio di utilizzo dinamico per sistemi AI
import { VSAILoginDocs } from 'vsai-ui-kit/docs';

console.log('Available props for Login:', VSAILoginDocs.props.map(p => p.name));`} />
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">3</div>
          <h3 className="text-xl font-bold text-slate-800">Integrazione con l'AI (Agent-Ready)</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <p className="text-slate-600 text-sm">
            Per permettere all'AI di interagire con la libreria, ogni componente esporta un oggetto <code>*Docs</code> (es. <code>VSAITableDocs</code>). 
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
              <h4 className="font-bold text-blue-900 mb-2">Dichiarazioni Ambientali</h4>
              <p className="text-xs text-blue-700 leading-relaxed">
                I file <code>.d.ts</code> contengono commenti TSDoc leggibili dai modelli linguistici.
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-xl border border-purple-100">
              <h4 className="font-bold text-purple-900 mb-2">Schema Runtime</h4>
              <p className="text-xs text-purple-700 leading-relaxed">
                Usa <code>VSAITableDocs.props</code> per informare dinamicamente l'AI sulle capacità del componente.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
