import React, { useState } from 'react';
import { 
  ArrowRight, 
  Settings, 
  Play, 
  Layers, 
  HardDrive, 
  Info, 
  Trash2, 
  Check, 
  Plus, 
  Zap, 
  ExternalLink 
} from 'lucide-react';
import { AppSettings, StremioAddon } from '../../types/cinema';
import { DEFAULT_ADDONS, CINEMA_RED } from '../../data/cinemaSeedData';

interface CinemaSettingsScreenProps {
  onBack: () => void;
}

export const CinemaSettingsScreen: React.FC<CinemaSettingsScreenProps> = ({ onBack }) => {
  const [activeCategory, setActiveCategory] = useState<'playback' | 'addons' | 'storage' | 'about'>('playback');
  const [addons, setAddons] = useState<StremioAddon[]>(DEFAULT_ADDONS);
  const [manifestInput, setManifestInput] = useState('');
  const [rdApiKey, setRdApiKey] = useState('');
  const [torrentServerUrl, setTorrentServerUrl] = useState('http://127.0.0.1:11470');
  const [maxQuality, setMaxQuality] = useState('4K UHD');
  const [autoPlayNext, setAutoPlayNext] = useState(true);
  const [cacheSizeMb, setCacheSizeMb] = useState(128.4);
  const [cacheCleared, setCacheCleared] = useState(false);

  const toggleAddon = (id: string) => {
    setAddons(addons.map(a => a.id === id ? { ...a, isEnabled: !a.isEnabled } : a));
  };

  const handleAddManifest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manifestInput.trim()) return;
    const newAddon: StremioAddon = {
      id: `custom.${Date.now()}`,
      name: manifestInput.replace(/https?:\/\//, '').split('/')[0] || 'הרחבה מותאמת',
      version: '1.0.0',
      description: 'תוסף Stremio שהותקן בהצלחה',
      manifestUrl: manifestInput,
      types: ['movie', 'series'],
      resources: ['stream'],
      isEnabled: true,
      isLocked: false
    };
    setAddons([...addons, newAddon]);
    setManifestInput('');
  };

  const handleClearCache = () => {
    setCacheSizeMb(0.0);
    setCacheCleared(true);
    setTimeout(() => setCacheCleared(false), 2500);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 select-none animate-in fade-in">
      
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-white/10">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <Settings className="w-6 h-6 text-[#E50914]" />
            <span>מרכז ההגדרות והתוספים</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            התאמת איכות הנגן, תוספי Stremio וחשבונות Debrid
          </p>
        </div>
      </div>

      {/* Main Grid: Left Navigation / Right Content */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Navigation Sidebar */}
        <div className="md:col-span-4 space-y-2">
          {[
            { id: 'playback', label: 'איכות ונגן וידאו', desc: '4K/1080p, ניגון אוטומטי, כתוביות', icon: Play },
            { id: 'addons', label: 'הרחבות ומקורות (Stremio)', desc: 'Torrentio, TPB+, Debrid, שרת מקומי', icon: Layers },
            { id: 'storage', label: 'אחסון ומטמון', desc: 'ניקוי קבצים זמניים ושטח כונן', icon: HardDrive },
            { id: 'about', label: 'אודות ועדכונים', desc: 'גרסת אפליקציה 1.0.0 ורישיונות', icon: Info }
          ].map((cat) => {
            const IconComp = cat.icon;
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`w-full p-3.5 rounded-xl border text-right transition-all flex items-start gap-3 cursor-pointer ${
                  isSelected
                    ? 'bg-[#E50914]/15 border-[#E50914] text-white shadow-lg'
                    : 'bg-[#141414] border-white/5 text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className={`p-2 rounded-lg mt-0.5 shrink-0 ${isSelected ? 'bg-[#E50914] text-white' : 'bg-white/5 text-slate-400'}`}>
                  <IconComp className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs sm:text-sm font-bold text-white">{cat.label}</div>
                  <div className="text-[11px] text-slate-400 truncate mt-0.5">{cat.desc}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Content Pane */}
        <div className="md:col-span-8 bg-[#141414] border border-white/10 rounded-2xl p-5 sm:p-7 space-y-6">
          
          {/* Playback Settings */}
          {activeCategory === 'playback' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-white">איכות סטרימינג מקסימלית</h3>
                <p className="text-xs text-slate-400 mt-1">האיכות המועדפת בעת פתיחת סרטים ופרקים</p>
                <div className="grid grid-cols-3 gap-2.5 mt-3">
                  {['4K UHD', '1080p FHD', '720p HD'].map((q) => (
                    <button
                      key={q}
                      onClick={() => setMaxQuality(q)}
                      className={`p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        maxQuality === q
                          ? 'bg-[#E50914]/20 border-[#E50914] text-white'
                          : 'bg-white/5 border-white/5 text-slate-400 hover:text-white'
                      }`}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>

              {/* Auto play next */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                <div>
                  <div className="text-sm font-bold text-white">ניגון אוטומטי של הפרק הבא</div>
                  <div className="text-xs text-slate-400 mt-0.5">מעבר אוטומטי לפרק הבא בסיום בסדרות</div>
                </div>
                <input
                  type="checkbox"
                  checked={autoPlayNext}
                  onChange={(e) => setAutoPlayNext(e.target.checked)}
                  className="w-5 h-5 accent-[#E50914] cursor-pointer"
                />
              </div>

              {/* Keyboard shortcuts reminder */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
                <div className="text-sm font-bold text-white">קיצורי מקלדת במחשב לנגן הווידאו:</div>
                <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                  <li><kbd className="bg-black/60 px-1.5 py-0.5 rounded text-white font-mono text-[10px]">רווח</kbd> הפעלה / השהיה של הסרט</li>
                  <li><kbd className="bg-black/60 px-1.5 py-0.5 rounded text-white font-mono text-[10px]">חצים ימינה/שמאלה</kbd> קפיצה של 10 שניות קדימה/אחורה</li>
                  <li><kbd className="bg-black/60 px-1.5 py-0.5 rounded text-white font-mono text-[10px]">חצים מעלה/מטה</kbd> שינוי עוצמת שמע</li>
                  <li><kbd className="bg-black/60 px-1.5 py-0.5 rounded text-white font-mono text-[10px]">F</kbd> מעבר למסך מלא (Fullscreen)</li>
                  <li><kbd className="bg-black/60 px-1.5 py-0.5 rounded text-white font-mono text-[10px]">M</kbd> השתקה (Mute)</li>
                </ul>
              </div>
            </div>
          )}

          {/* Addons Settings */}
          {activeCategory === 'addons' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-white">תוספי Stremio מותקנים</h3>
                <p className="text-xs text-slate-400 mt-1">תוספים המספקים מקורות הזרמה, קטלוגים וכתוביות</p>
                
                <div className="space-y-2.5 mt-3">
                  {addons.map((addon) => (
                    <div
                      key={addon.id}
                      className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">{addon.name}</span>
                          <span className="text-[10px] bg-white/10 text-slate-300 px-1.5 py-0.2 rounded font-mono">
                            v{addon.version}
                          </span>
                          {addon.isLocked && (
                            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded">
                              רשמי
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">{addon.description}</div>
                      </div>

                      <input
                        type="checkbox"
                        checked={addon.isEnabled}
                        onChange={() => toggleAddon(addon.id)}
                        className="w-5 h-5 accent-[#E50914] cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Install custom manifest */}
              <form onSubmit={handleAddManifest} className="space-y-2">
                <label className="block text-xs font-bold text-white">התקנת תוסף מותאם אישית (Manifest URL)</label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={manifestInput}
                    onChange={(e) => setManifestInput(e.target.value)}
                    placeholder="https://example.com/manifest.json"
                    className="flex-1 bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#E50914]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#E50914] hover:bg-[#b81d24] text-white rounded-xl text-xs font-bold shrink-0 cursor-pointer"
                  >
                    התקן
                  </button>
                </div>
              </form>

              {/* Debrid API Setup */}
              <div className="pt-3 border-t border-white/10 space-y-3">
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-emerald-400" />
                  <span>חשבונות Debrid מהירים (ללא צורך ב-P2P)</span>
                </h4>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Real-Debrid API Token</label>
                  <input
                    type="password"
                    value={rdApiKey}
                    onChange={(e) => setRdApiKey(e.target.value)}
                    placeholder="הזן מפתח Real-Debrid..."
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-mono placeholder-slate-500 focus:outline-none focus:border-[#E50914]"
                  />
                </div>
              </div>

              {/* Torrent Server Engine URL */}
              <div className="pt-2 border-t border-white/10 space-y-2">
                <label className="block text-xs font-bold text-white">שרת סטרימינג לטורנטים (Stremio Server / 11470)</label>
                <input
                  type="text"
                  value={torrentServerUrl}
                  onChange={(e) => setTorrentServerUrl(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-mono placeholder-slate-500 focus:outline-none focus:border-[#E50914]"
                />
                <p className="text-[10px] text-slate-500">ברירת מחדל: http://127.0.0.1:11470</p>
              </div>
            </div>
          )}

          {/* Storage Settings */}
          {activeCategory === 'storage' && (
            <div className="space-y-6 text-center py-6">
              <div className="w-16 h-16 rounded-full bg-[#E50914]/20 text-[#E50914] flex items-center justify-center mx-auto">
                <HardDrive className="w-8 h-8" />
              </div>
              <div>
                <div className="text-xs text-slate-400">נפח מטמון ונתונים זמניים</div>
                <div className="text-3xl font-black text-white font-mono mt-1">
                  {cacheSizeMb.toFixed(1)} MB
                </div>
              </div>

              <button
                onClick={handleClearCache}
                className="px-6 py-2.5 rounded-xl bg-[#E50914] hover:bg-[#b81d24] text-white text-xs font-bold flex items-center justify-center gap-2 mx-auto cursor-pointer shadow-lg shadow-[#E50914]/30"
              >
                {cacheCleared ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    <span>המטמון נוקה בהצלחה!</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    <span>נקה מטמון עכשיו</span>
                  </>
                )}
              </button>

              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                ניקוי המטמון מוחק תמונות זמניות וקבצי חיפוש ישנים מבלי למחוק את קבצי הווידאו שהורדת או את המועדפים שלך.
              </p>
            </div>
          )}

          {/* About Settings */}
          {activeCategory === 'about' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
                <div className="text-base font-bold text-white">CinemaStream Desktop Edition</div>
                <div className="text-xs text-[#E50914] font-semibold">גרסה 1.0.0 (Release Build)</div>
                <div className="text-xs text-slate-400">
                  אפליקציית סטרימינג וקולנוע מתקדמת בעברית עם נגן מותאם למחשב, תוספי Stremio, ומערכת הורדות פנימית.
                </div>
                <div className="text-[11px] text-slate-500 pt-2 border-t border-white/5 font-mono">
                  חתימת בנייה: SHA256:7B8F9A2C...CINEMASTREAM
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1 text-xs text-slate-300">
                <div className="font-bold text-white">מנועי סטרימינג ונגן:</div>
                <p>• נגן וידאו מבוסס HTML5 Audio/Video + Web Audio API</p>
                <p>• מנוע סנכרון כתוביות SubtitleSyncEngine מדויק למילישניות</p>
                <p>• תמיכה בשרתי Stremio מקומיים וחיבור ל-Debrid</p>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
