import React from 'react';
import { 
  Monitor, 
  Cpu, 
  Sparkles, 
  Terminal, 
  CheckCircle2, 
  Zap, 
  Music, 
  Smartphone, 
  ArrowLeftRight 
} from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenQuickPrompt: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onOpenQuickPrompt }) => {
  return (
    <header className="relative border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-xl">
      {/* Decorative top glow */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Top Badges & System Status */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2 text-xs flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              ממיר קוד אנדרואיד לקוד מחשב (PC) מוכן לפעולה
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 font-medium">
              <Music className="w-3.5 h-3.5 text-indigo-400" />
              כולל נגן מולטימדיה שולחני ייעודי
            </span>
          </div>

          <button
            onClick={onOpenQuickPrompt}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-semibold shadow-lg shadow-indigo-500/25 transition-all hover:scale-[1.02] active:scale-98 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>שלח קוד אנדרואיד להמרה</span>
          </button>
        </div>

        {/* Big Hero Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white flex items-center gap-3">
              <span className="p-2.5 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 shadow-inner">
                <ArrowLeftRight className="w-7 h-7 sm:w-8 sm:h-8" />
              </span>
              <span>הסבת אפליקציות אנדרואיד לתוכנות מחשב (PC)</span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              העבר את קבצי ה-Kotlin / Java / XML של אפליקציית האנדרואיד שלך, ואבנה עבורך העתק מדויק ומותאם למחשב עם קוד מודרני, נגן מולטימדיה שולחני, קיצורי מקלדת ותמיכה במסכים רחבים.
            </p>
          </div>

          {/* Quick Stats Box */}
          <div className="grid grid-cols-3 gap-3 bg-slate-800/60 p-3.5 rounded-xl border border-slate-700/60 shrink-0 text-center">
            <div className="px-2">
              <div className="text-sm sm:text-base font-bold text-emerald-400 font-mono">ExoPlayer ➔ PC</div>
              <div className="text-[11px] text-slate-400">נגן שולחני מלא</div>
            </div>
            <div className="px-2 border-r border-slate-700">
              <div className="text-sm sm:text-base font-bold text-indigo-400 font-mono">Kotlin ➔ TS</div>
              <div className="text-[11px] text-slate-400">המרת טיפוסים</div>
            </div>
            <div className="px-2 border-r border-slate-700">
              <div className="text-sm sm:text-base font-bold text-cyan-400 font-mono">EXE / PWA</div>
              <div className="text-[11px] text-slate-400">הפעלה במחשב</div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-800/80 overflow-x-auto">
          <button
            onClick={() => setActiveTab('converter')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'converter'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Smartphone className="w-4 h-4 text-emerald-400" />
            המרת קוד אנדרואיד למחשב
          </button>

          <button
            onClick={() => setActiveTab('player')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'player'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Music className="w-4 h-4 text-indigo-400" />
            נגן שולחני פעיל (ExoPlayer התחליפי)
          </button>

          <button
            onClick={() => setActiveTab('demo')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'demo'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Monitor className="w-4 h-4" />
            הדגמת תוכנת שולחן עבודה נוספת
          </button>

          <button
            onClick={() => setActiveTab('packaging')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'packaging'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Terminal className="w-4 h-4" />
            איך מריצים ב-Windows (.exe / .dmg)
          </button>
        </nav>

      </div>
    </header>
  );
};
