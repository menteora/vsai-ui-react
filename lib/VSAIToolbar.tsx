
import React, { useState } from 'react';
import { ToolbarItem, UserProfile, Theme, ComponentDocs } from './types';
import { Menu, X, User as UserIcon, LogOut, Settings, LayoutDashboard, BarChart2, Sun, Moon } from 'lucide-react';

export interface VSAIToolbarProps {
  /** Brand name or title displayed on the left side of the toolbar. */
  title?: string;
  /** Array of navigation items displayed in the center. */
  items?: ToolbarItem[];
  /** Object containing user name, role, and avatar URL (optional). */
  user?: UserProfile;
  /** If true, the toolbar sticks to the top of the viewport on scroll. */
  sticky?: boolean;
  /** Switch between light and dark visual modes with frosted glass effect. */
  theme?: Theme;
  /** Callback triggered when a navigation item is clicked. */
  onAction?: (actionId: string) => void;
  /** Callback triggered to toggle application theme. */
  onThemeToggle?: () => void;
  /** URL of the application logo icon displayed next to the title. */
  logoUrl?: string;
}

export const VSAIToolbarDocs: ComponentDocs = {
  name: "VSAIToolbar",
  description: "Header applicativo professionale con icone Lucide integrate per navigazione responsive, supporto toggle tema ed effetti frosted glass.",
  props: [
    { name: 'title', type: 'string', defaultValue: '"VSAI Dashboard"', description: 'Nome del brand.' },
    { name: 'items', type: 'ToolbarItem[]', defaultValue: '[]', description: 'Voci di navigazione con icone.' },
    { name: 'user', type: 'UserProfile', defaultValue: 'undefined', description: 'Profilo utente.' },
    { name: 'theme', type: '"light" | "dark"', defaultValue: '"light"', description: 'Stile visivo.' },
    { name: 'onThemeToggle', type: '() => void', defaultValue: 'undefined', description: 'Evento scatenato al clic sul pulsante tema.' },
    { name: 'logoUrl', type: 'string', defaultValue: '"..."', description: 'Icona del brand.' }
  ],
  prelude: `const handleNavigation = (id) => alert('Navigazione verso: ' + id);`,
  exampleProps: {
    title: "VSAI Platform",
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: '{<LayoutDashboard size={18} />}' },
      { id: 'analytics', label: 'Analytics', icon: '{<BarChart2 size={18} />}' },
      { id: 'settings', label: 'Settings', icon: '{<Settings size={18} />}' }
    ],
    user: {
      name: 'Jane Doe',
      role: 'Administrator',
      avatarUrl: 'https://picsum.photos/id/64/100/100'
    },
    sticky: true,
    onAction: "handleNavigation",
    onThemeToggle: "toggleGlobalTheme"
  }
};

export const VSAIToolbar: React.FC<VSAIToolbarProps> = ({
  title = "VSAI Dashboard",
  items = [],
  user = { name: 'Guest', role: 'User' } as UserProfile,
  sticky = true,
  theme = 'light',
  onAction,
  onThemeToggle,
  logoUrl = "https://picsum.photos/id/20/40/40"
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isDark = theme === 'dark';

  return (
    <>
      <header className={`${sticky ? 'sticky top-0' : ''} z-40 w-full border-b transition-all duration-300 ${
        isDark ? 'border-slate-800 bg-slate-900/80 backdrop-blur-md' : 'border-gray-200 bg-white/80 backdrop-blur-md'
      }`}>
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMenuOpen(true)} 
              className={`md:hidden p-2 rounded-lg transition-colors ${isDark ? 'text-slate-400 hover:bg-slate-800' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              <Menu size={24} />
            </button>
            <div className="flex items-center gap-3">
              <img src={logoUrl} alt="Logo" className="h-8 w-8 rounded-lg object-cover" />
              <span className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>{title}</span>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            {items.map((item) => (
              <button 
                key={item.id} 
                onClick={() => onAction?.(item.id)} 
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${isDark ? 'text-slate-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'}`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {onThemeToggle && (
              <button 
                onClick={onThemeToggle}
                className={`p-2 rounded-xl transition-all ${isDark ? 'text-yellow-400 hover:bg-slate-800' : 'text-slate-500 hover:bg-slate-100'}`}
                aria-label="Toggle Theme"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            )}
            
            <div className="hidden sm:flex flex-col items-end mr-1 ml-2">
              <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{user.name}</span>
              <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">{user.role}</span>
            </div>
            <div className={`h-9 w-9 rounded-full overflow-hidden border-2 transition-colors flex items-center justify-center ${isDark ? 'border-slate-700 bg-slate-800 text-slate-400' : 'border-slate-100 bg-slate-50 text-slate-500'}`}>
              {user.avatarUrl ? (
                <img src={user.avatarUrl} className="h-full w-full object-cover" alt={user.name} />
              ) : (
                <UserIcon size={18} />
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div className={`fixed inset-0 z-50 transition-all duration-500 md:hidden ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div 
          className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity" 
          onClick={() => setIsMenuOpen(false)} 
        />
        <div className={`absolute left-0 top-0 bottom-0 w-80 shadow-2xl transition-transform duration-500 ease-out transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
          <div className="p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-3">
                <img src={logoUrl} alt="Logo" className="h-8 w-8 rounded-lg object-cover" />
                <span className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>{title}</span>
              </div>
              <button 
                onClick={() => setIsMenuOpen(false)} 
                className={`p-2 rounded-lg ${isDark ? 'text-slate-400 hover:bg-slate-800' : 'text-gray-500 hover:bg-gray-100'}`}
              >
                <X size={24} />
              </button>
            </div>
            
            <nav className="space-y-1.5 flex-1">
              {items.map((item) => (
                <button 
                  key={item.id} 
                  onClick={() => { onAction?.(item.id); setIsMenuOpen(false); }} 
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all ${isDark ? 'text-slate-300 hover:bg-slate-800 hover:text-blue-400' : 'text-slate-600 hover:bg-slate-50 hover:text-blue-600'}`}
                >
                  <span className="opacity-70">{item.icon}</span>
                  {item.label}
                </button>
              ))}
              
              {onThemeToggle && (
                <button 
                  onClick={() => { onThemeToggle(); setIsMenuOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all ${isDark ? 'text-yellow-400 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                  {isDark ? <Sun size={18} /> : <Moon size={18} />}
                  Cambia Tema ({isDark ? 'Chiaro' : 'Scuro'})
                </button>
              )}
            </nav>

            <div className={`mt-auto p-4 rounded-2xl border transition-colors ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-100 shadow-sm'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-full overflow-hidden border-2 flex items-center justify-center ${isDark ? 'border-slate-600 bg-slate-700' : 'border-white shadow-sm bg-blue-100'}`}>
                    {user.avatarUrl ? (
                      <img src={user.avatarUrl} className="h-full w-full object-cover" alt={user.name} />
                    ) : (
                      <UserIcon size={20} className="text-blue-600" />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{user.name}</span>
                    <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">{user.role}</span>
                  </div>
                </div>
                <button className={`p-2 rounded-lg transition-colors ${isDark ? 'text-slate-500 hover:text-red-400' : 'text-slate-400 hover:text-red-500'}`}>
                  <LogOut size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
