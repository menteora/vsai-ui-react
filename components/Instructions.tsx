
import React from 'react';
import { CodeBlock } from './CodeBlock';
import { VSAI_VERSION } from '../lib/constants';

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
          La libreria <strong>@menteora/vsai-ui-react</strong> può essere integrata facilmente in qualsiasi progetto React 19+.
        </p>
      </header>

      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">1</div>
          <h3 className="text-xl font-bold text-slate-800">Installazione da Repository</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <p className="text-slate-600 text-sm">
            Esegui il comando di installazione puntando direttamente al repository GitHub. Grazie allo script <code>prepare</code>, la libreria verrà compilata automaticamente durante il download:
          </p>
          <CodeBlock code={`npm install github:menteora/vsai-ui-react lucide-react`} />
          <p className="text-slate-600 text-sm">
            Oppure aggiungila manualmente al tuo <code>package.json</code>:
          </p>
          <CodeBlock code={`"@menteora/vsai-ui-react": "github:menteora/vsai-ui-react",
"lucide-react": "^0.475.0"`} />
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">2</div>
          <h3 className="text-xl font-bold text-slate-800">Configurazione CSS (Tailwind)</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <p className="text-slate-600 text-sm">
            Importa Tailwind e istruisci il compilatore a scansionare i file della libreria per generare le classi CSS necessarie:
          </p>
          <CodeBlock code={`/* globals.css */
@import "tailwindcss";
@source "../node_modules/@menteora/vsai-ui-react/dist";`} />
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">3</div>
          <h3 className="text-xl font-bold text-slate-800">Utilizzo nel Progetto</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <p className="text-slate-600 text-sm">
            Importa i componenti singolarmente. Il supporto al tree-shaking garantisce un bundle size ottimale.
          </p>
          <CodeBlock code={`import { VSAILogin, VSAIToolbar } from '@menteora/vsai-ui-react';

export default function MyPage() {
  return (
    <>
      <VSAIToolbar title="VSAI Console" />
      <VSAILogin onLogin={(e, p) => console.log(e)} />
    </>
  );
}`} />
        </div>
      </section>
    </div>
  );
};
