
import React, { useState } from 'react';
import { Theme, ComponentDocs } from './types';
import { Sun, Moon } from 'lucide-react';

export interface VSAILoginProps {
  /** Il titolo principale visualizzato in alto nella card di login. */
  title?: string;
  /** Testo secondario che appare sotto il titolo per ulteriore contesto. */
  subtitle?: string;
  /** URL per l'immagine del logo del brand visualizzata sopra il titolo. */
  logoUrl?: string;
  /** Colore d'accento principale utilizzato per il pulsante e gli stati di focus. */
  primaryColor?: string;
  /** Commuta tra modalità visuale chiara e scura. */
  theme?: Theme;
  /** Callback attivata quando l'utente preme il pulsante di login. */
  onLogin?: (email: string, pass: string) => void;
  /** Callback attivata per cambiare tema. */
  onThemeToggle?: () => void;
}

/**
 * Metadata object for automated documentation generation.
 */
export const VSAILoginDocs: ComponentDocs = {
  name: "VSAILogin",
  description: "Un'interfaccia di login minimale a pagina intera focalizzata sulla conversione e sulla semplicità visiva.",
  props: [
    { name: 'title', type: 'string', defaultValue: '"Welcome Back"', description: 'Titolo principale.' },
    { name: 'subtitle', type: 'string', defaultValue: '"Please enter your details..."', description: 'Sottotitolo descrittivo.' },
    { name: 'logoUrl', type: 'string', defaultValue: '"https://picsum..."', description: 'URL del logo aziendale.' },
    { name: 'primaryColor', type: 'string', defaultValue: '"#3b82f6"', description: 'Colore d\'accento.' },
    { name: 'theme', type: '"light" | "dark"', defaultValue: '"light"', description: 'Tema visuale.' },
    { name: 'onThemeToggle', type: '() => void', defaultValue: 'undefined', description: 'Evento scatenato al clic sul pulsante tema.' },
    { name: 'onLogin', type: '(email, pass) => void', defaultValue: 'undefined', description: 'Callback di login.' },
  ],
  prelude: `const handleLogin = (e, p) => alert("Accesso richiesto per: " + e);`,
  exampleProps: {
    title: "VSAI Cloud Access",
    subtitle: "Inserisci la tua email e password per continuare.",
    onLogin: "handleLogin",
    onThemeToggle: "toggleGlobalTheme"
  }
};

export const VSAILogin: React.FC<VSAILoginProps> = ({
  title = "Welcome Back",
  subtitle = "Please enter your details to sign in",
  logoUrl = "https://picsum.photos/id/10/100/100",
  primaryColor = "#3b82f6",
  theme = 'light',
  onLogin,
  onThemeToggle
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isDark = theme === 'dark';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin?.(email, password);
  };

  return (
    <div className={`flex min-h-screen w-full items-center justify-center p-6 transition-colors duration-500 ${isDark ? 'bg-slate-950' : 'bg-slate-50'}`}>
      <div className={`w-full max-w-[440px] relative space-y-8 rounded-[2.5rem] p-10 shadow-2xl border transition-all duration-300 ${
        isDark ? 'bg-slate-900 border-slate-800 shadow-black/40' : 'bg-white border-slate-100 shadow-slate-200'
      }`}>
        {/* Theme Toggle Button */}
        {onThemeToggle && (
          <button 
            type="button"
            onClick={onThemeToggle}
            className={`absolute top-6 right-6 p-2 rounded-xl transition-all ${isDark ? 'text-yellow-400 hover:bg-slate-800' : 'text-slate-400 hover:bg-slate-50'}`}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        )}

        <div className="flex flex-col items-center text-center">
          <div className="mb-6 p-1 bg-gradient-to-tr from-blue-600 to-purple-500 rounded-2xl shadow-lg">
             <img src={logoUrl} alt="Logo" className="h-20 w-20 rounded-[1.25rem] object-cover" />
          </div>
          <h2 className={`text-3xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>{title}</h2>
          <p className={`mt-3 text-sm font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{subtitle}</p>
        </div>

        <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="email" className={`block text-[11px] font-bold uppercase tracking-widest ml-1 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Email Address</label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`block w-full rounded-2xl border px-4 py-3.5 text-sm font-medium transition-all outline-none ${
                  isDark 
                    ? 'bg-slate-800/50 border-slate-700 text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10' 
                    : 'bg-white border-slate-200 text-slate-900 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5'
                }`}
                placeholder="nome@azienda.it"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className={`block text-[11px] font-bold uppercase tracking-widest ml-1 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Password</label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`block w-full rounded-2xl border px-4 py-3.5 text-sm font-medium transition-all outline-none ${
                  isDark 
                    ? 'bg-slate-800/50 border-slate-700 text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10' 
                    : 'bg-white border-slate-200 text-slate-900 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5'
                }`}
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              style={{ backgroundColor: primaryColor }}
              className="group relative flex w-full justify-center rounded-2xl px-4 py-4 text-sm font-bold text-white shadow-xl hover:opacity-90 active:scale-[0.98] transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <span className="relative">Accedi</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
