
import React from 'react';
import { 
  LogIn, 
  SquareMenu, 
  Table, 
  FormInput, 
  Layout, 
  Type, 
  SquareStack, 
  MousePointer2, 
  BellRing, 
  Calendar, 
  CheckSquare, 
  CircleDot, 
  BookOpen,
  Activity,
  List,
  ToggleLeft,
  Tag
} from 'lucide-react';

type TabType = 'pagelogin' | 'toolbar' | 'table' | 'form' | 'pagelayout' | 'textinput' | 'textarea' | 'button' | 'snackbar' | 'dateinput' | 'checkbox' | 'radiobutton' | 'select' | 'switch' | 'badge' | 'instructions';

interface ShowcaseLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: TabType) => void;
  version?: string;
}

export const ShowcaseLayout: React.FC<ShowcaseLayoutProps> = ({ children, activeTab, onTabChange, version }) => {
  const navItems: { label: string; tab: TabType; icon: React.ReactNode }[] = [
    { label: 'VSAI Login', tab: 'pagelogin', icon: <LogIn size={16} /> },
    { label: 'VSAI Toolbar', tab: 'toolbar', icon: <SquareMenu size={16} /> },
    { label: 'VSAI Table', tab: 'table', icon: <Table size={16} /> },
    { label: 'VSAI Form', tab: 'form', icon: <FormInput size={16} /> },
    { label: 'VSAI Page Layout', tab: 'pagelayout', icon: <Layout size={16} /> },
  ];

  const basicItems: { label: string; tab: TabType; icon: React.ReactNode }[] = [
    { label: 'Text Input', tab: 'textinput', icon: <Type size={16} /> },
    { label: 'Textarea', tab: 'textarea', icon: <SquareStack size={16} /> },
    { label: 'Select', tab: 'select', icon: <List size={16} /> },
    { label: 'Button', tab: 'button', icon: <MousePointer2 size={16} /> },
    { label: 'Switch', tab: 'switch', icon: <ToggleLeft size={16} /> },
    { label: 'Badge', tab: 'badge', icon: <Tag size={16} /> },
    { label: 'Snackbar', tab: 'snackbar', icon: <BellRing size={16} /> },
    { label: 'Date Input', tab: 'dateinput', icon: <Calendar size={16} /> },
    { label: 'Checkbox', tab: 'checkbox', icon: <CheckSquare size={16} /> },
    { label: 'Radio Button', tab: 'radiobutton', icon: <CircleDot size={16} /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex overflow-hidden">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-72 bg-white border-r border-slate-200 hidden lg:flex flex-col z-30 shadow-sm">
        <div className="p-8 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-blue-700 to-blue-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20">M</div>
            <div className="flex flex-col">
              <span className="text-lg font-extrabold text-slate-900 tracking-tight leading-none">@menteora</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">VSAI UI React</span>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 space-y-8 overflow-y-auto p-6 custom-scrollbar">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-4 ml-2">Complex Components</p>
            <div className="space-y-1">
              {navItems.map(item => (
                <button
                  key={item.tab}
                  onClick={() => onTabChange(item.tab)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${activeTab === item.tab ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
                >
                  <span className={`${activeTab === item.tab ? 'text-white' : 'text-slate-400'}`}>{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-4 ml-2">Basic Elements</p>
            <div className="grid grid-cols-1 gap-1">
              {basicItems.map(item => (
                <button
                  key={item.tab}
                  onClick={() => onTabChange(item.tab)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${activeTab === item.tab ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
                >
                  <span className={`${activeTab === item.tab ? 'text-white' : 'text-slate-400'}`}>{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={() => onTabChange('instructions')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'instructions' ? 'bg-slate-900 text-white shadow-xl' : 'text-slate-600 hover:bg-slate-100 border border-transparent'}`}
            >
              <BookOpen size={16} />
              Integrazione
            </button>
          </div>
        </nav>

        <div className="p-6 mt-auto">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Library status</span>
              <Activity size={10} className="text-green-500" />
            </div>
            <p className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              v{version || '0.0.4'} Stable
            </p>
          </div>
        </div>
      </aside>

      {/* Mobile Nav Overlay */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-xl shadow-2xl rounded-[2rem] px-8 py-4 border border-slate-200/50 z-[100] flex gap-6 overflow-x-auto max-w-[95vw] custom-scrollbar items-center">
        {navItems.map(i => (
           <button key={i.tab} onClick={() => onTabChange(i.tab)} className={`flex flex-col items-center gap-1 transition-all ${activeTab === i.tab ? 'text-blue-600 scale-110' : 'text-slate-400'}`}>
              {i.icon}
              <span className="text-[9px] font-bold uppercase tracking-tight">{i.label.replace('VSAI ', '')}</span>
           </button>
        ))}
        <div className="w-px h-6 bg-slate-200 mx-1"></div>
        <button onClick={() => onTabChange('instructions')} className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'instructions' ? 'text-slate-900 scale-110' : 'text-slate-400'}`}>
           <BookOpen size={16} />
           <span className="text-[9px] font-bold uppercase tracking-tight">Docs</span>
        </button>
      </div>

      <main className="lg:ml-72 flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-6 md:p-10 min-h-screen pb-32 lg:pb-10">
          {children}
        </div>
      </main>
    </div>
  );
};
