import React, { useState } from 'react';
import { 
  Cpu, 
  Sparkles, 
  Check, 
  Copy, 
  Send, 
  Laptop, 
  Database, 
  WifiOff, 
  FileSpreadsheet, 
  Printer, 
  BellRing, 
  ShieldAlert, 
  Sliders, 
  Code, 
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SoftwareTemplate } from '../types';

interface SoftwareWizardProps {
  initialTemplate?: SoftwareTemplate | null;
  onSendPromptToAssistant: (prompt: string) => void;
}

export const SoftwareWizard: React.FC<SoftwareWizardProps> = ({ initialTemplate, onSendPromptToAssistant }) => {
  const [appName, setAppName] = useState(initialTemplate ? initialTemplate.title : 'תוכנת ניהול אישית');
  const [appDescription, setAppDescription] = useState(initialTemplate ? initialTemplate.description : 'תוכנה מקומית למחשב שתעזור בניהול משימות ונתונים');
  const [targetOS, setTargetOS] = useState<string[]>(['windows', 'pwa']);
  const [dataStorage, setDataStorage] = useState<'local' | 'cloud' | 'hybrid'>('local');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    'שמירת נתונים מקומית ללא צורך באינטרנט (Offline)',
    'ייצוא דוחות וטבלאות ל-Excel ו-CSV',
    'חיפוש מהיר וסינון מתקדם'
  ]);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const availableFeatures = [
    { id: 'offline', label: 'שמירת נתונים מקומית ללא צורך באינטרנט (Offline)', icon: WifiOff },
    { id: 'excel', label: 'ייצוא דוחות וטבלאות ל-Excel ו-CSV', icon: FileSpreadsheet },
    { id: 'search', label: 'חיפוש מהיר וסינון מתקדם', icon: Sliders },
    { id: 'print', label: 'הדפסת מסמכים וקבלות ישירות למדפסת', icon: Printer },
    { id: 'notifications', label: 'התראות שולחן עבודה (Desktop Notifications)', icon: BellRing },
    { id: 'database', label: 'מסד נתונים פנימי מהיר (SQLite / IndexedDB)', icon: Database }
  ];

  const toggleOS = (os: string) => {
    if (targetOS.includes(os)) {
      if (targetOS.length > 1) {
        setTargetOS(targetOS.filter(o => o !== os));
      }
    } else {
      setTargetOS([...targetOS, os]);
    }
  };

  const toggleFeature = (label: string) => {
    if (selectedFeatures.includes(label)) {
      setSelectedFeatures(selectedFeatures.filter(f => f !== label));
    } else {
      setSelectedFeatures([...selectedFeatures, label]);
    }
  };

  const generatedPrompt = `אנא בנה עבורי תוכנת מחשב מלאה:
- שם התוכנה: ${appName}
- תיאור ומטרה: ${appDescription}
- מערכות הפעלה מבוקשות: ${targetOS.join(', ')}
- סוג אחסון: ${dataStorage === 'local' ? 'מקומי מלא (SQLite/IndexedDB עובד ללא אינטרנט)' : dataStorage === 'cloud' ? 'ענן (Cloud Database)' : 'היברידי (סנכרון מקומי וענן)'}
- תכונות חובה בתוכנה:
${selectedFeatures.map(f => `  • ${f}`).join('\n')}

אנא בנה ממשק שולחני מלא, מעוצב, בעברית, עם אפשרות שמירה, ייצוא והדפסה.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
    try {
      confetti({ particleCount: 40, spread: 50, origin: { y: 0.7 } });
    } catch {}
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      {/* Configuration Column */}
      <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-indigo-400" />
            אשף אפיון תוכנת מחשב
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            הגדר כאן את מאפייני התוכנה שאתה מעוניין בה. המערכת תבנה עבורך ארכיטקטורה מדויקת ופרומפט לפיתוח מיידי.
          </p>
        </div>

        {/* Software Name & Description */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              שם התוכנה או הפרויקט:
            </label>
            <input
              type="text"
              value={appName}
              onChange={(e) => setAppName(e.target.value)}
              className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
              placeholder="למשל: תוכנת ניהול לקוחות ומחסן"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              תיאור מה התוכנה אמורה לעשות:
            </label>
            <textarea
              rows={3}
              value={appDescription}
              onChange={(e) => setAppDescription(e.target.value)}
              className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 resize-none leading-relaxed"
              placeholder="תאר את הפונקציות העיקריות שחשובות לך..."
            />
          </div>
        </div>

        {/* Operating Systems */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-2">
            מערכת הפעלה מיועדת:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'windows', label: 'Windows (.exe)' },
              { id: 'mac', label: 'macOS (.dmg)' },
              { id: 'pwa', label: 'התקנה מהירה (PWA)' },
              { id: 'linux', label: 'Linux (.deb)' }
            ].map(os => {
              const active = targetOS.includes(os.id);
              return (
                <button
                  key={os.id}
                  type="button"
                  onClick={() => toggleOS(os.id)}
                  className={`p-2.5 rounded-xl border text-xs font-medium transition-all flex items-center justify-between cursor-pointer ${
                    active 
                      ? 'bg-indigo-600/20 border-indigo-500 text-white' 
                      : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span>{os.label}</span>
                  {active && <Check className="w-3.5 h-3.5 text-indigo-400" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Storage Option */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-2">
            סוג מסד הנתונים:
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'local', title: 'מקומי 100%', desc: 'ללא רשת, פרטיות מלאה' },
              { id: 'cloud', title: 'ענן (Cloud)', desc: 'סנכרון בין מחשבים' },
              { id: 'hybrid', title: 'היברידי', desc: 'שמירה מקומית + גיבוי' }
            ].map(item => (
              <button
                key={item.id}
                type="button"
                onClick={() => setDataStorage(item.id as any)}
                className={`p-2.5 rounded-xl border text-right transition-all cursor-pointer ${
                  dataStorage === item.id
                    ? 'bg-indigo-600/20 border-indigo-500 text-white'
                    : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="text-xs font-bold text-slate-200">{item.title}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">{item.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Feature Checkboxes */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-2">
            תכונות מבוקשות בתוכנה:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {availableFeatures.map(feat => {
              const checked = selectedFeatures.includes(feat.label);
              const IconComp = feat.icon;
              return (
                <div
                  key={feat.id}
                  onClick={() => toggleFeature(feat.label)}
                  className={`p-2.5 rounded-xl border flex items-center gap-2.5 cursor-pointer transition-colors ${
                    checked 
                      ? 'bg-slate-800 border-indigo-500/80 text-white' 
                      : 'bg-slate-800/40 border-slate-700/60 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <IconComp className={`w-4 h-4 shrink-0 ${checked ? 'text-indigo-400' : 'text-slate-500'}`} />
                  <span className="text-xs select-none">{feat.label}</span>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Generated Blueprint & Action Column */}
      <div className="lg:col-span-5 flex flex-col justify-between bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Code className="w-4 h-4 text-emerald-400" />
              מפרט התוכנה המוכן לבנייה
            </h4>
            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-mono">
              Ready to Build
            </span>
          </div>

          <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed max-h-[360px] overflow-y-auto">
            {generatedPrompt}
          </div>
        </div>

        <div className="space-y-3 pt-3 border-t border-slate-800">
          <button
            onClick={handleCopy}
            className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 transition-all cursor-pointer"
          >
            {copiedPrompt ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>הועתק ללוח בהצלחה!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>העתק מפרט כדי לשלוח לי בצ׳אט</span>
              </>
            )}
          </button>

          <p className="text-[11px] text-slate-400 text-center leading-normal">
            💡 טיפ: פשוט העתק את המפרט הזה או כתוב לי: "בנה לי את התוכנה הזו", ואני אתחיל לפתח אותה כאן מיד!
          </p>
        </div>

      </div>

    </div>
  );
};
