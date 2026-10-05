import React, { useState } from 'react';
import { 
  Terminal, 
  Copy, 
  Check, 
  Layers, 
  Package, 
  Zap, 
  Sparkles, 
  FileCode, 
  FolderDown, 
  ShieldCheck, 
  CheckCircle2, 
  Laptop
} from 'lucide-react';

export const PackagingGuide: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (code: string, key: string) => {
    navigator.clipboard.writeText(code);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const methods = [
    {
      id: 'pwa',
      badge: 'הכי קל ומומלץ (אפס הגדרות)',
      title: 'התקנה ישירה לשולחן העבודה (Desktop PWA)',
      desc: 'מתקין את התוכנה ישירות בשולחן העבודה של Windows או Mac. התוכנה נפתחת בחלון עצמאי משלה, מופיעה בתפריט התחל/שורת המשימות ועובדת גם ללא אינטרנט.',
      pros: ['התקנה בלחיצה אחת', 'עובדת אופליין מלא', 'עדכונים אוטומטיים שקטים'],
      steps: [
        'פתח את האפליקציה בדפדפן (Chrome או Edge)',
        'לחץ על אייקון ההתקנה בשורת הכתובת (או "שמור ושתף > התקן תוכנה")',
        'התוכנה מותקנת ונוצר לה קיצור דרך בשולחן העבודה של המחשב'
      ]
    },
    {
      id: 'electron',
      badge: 'התקן מסורתי (קובץ EXE / DMG)',
      title: 'אריזה באמצעות Electron (כמו VS Code, Discord, Slack)',
      desc: 'לוקח את כל קוד ה-React והממשק ואורז אותו לחבילת התקנה רגילה של Windows (.exe) או macOS (.dmg) עם גישה מלאה למערכת הקבצים, קיצורי מקלדת ומגש המערכת (Tray).',
      pros: ['יוצר קובץ התקנה Setup.exe רגיל', 'גישה מלאה לחומרה ומדפסות מקומיות', 'פועל בכל מחשב'],
      command: `npm install --save-dev electron electron-builder\nnpx electron-builder build --win --mac`,
      steps: [
        'מתקינים את ספריית Electron בפרויקט',
        'מוסיפים קובץ main.js קצר שמפעיל את החלון השולחני',
        'מריצים פקודת בנייה שמייצרת קובץ Setup.exe'
      ]
    },
    {
      id: 'tauri',
      badge: 'הדור החדש והמהיר ביותר',
      title: 'אריזה סופר-קלה עם Tauri (בסיס Rust)',
      desc: 'פתרון הדור הבא לתוכנות מחשב: קובץ ההתקנה שוקל רק 3-5MB (לעומת 80MB באלקטרון), עם ביצועים מהירים במיוחד וצריכת זיכרון RAM מזערית.',
      pros: ['גודל קובץ התקנה זעיר (פחות מ-5MB)', 'בטיחות מקסימלית', 'צריכת זיכרון אפסית'],
      command: `npm install -D @tauri-apps/cli\nnpx tauri build`,
      steps: [
        'הפעלת תבנית Tauri מעל קוד ה-Frontend',
        'קימפול קובץ ההתקנה באמצעות Rust',
        'קבלת קובץ התקנה קל משקל ומהיר'
      ]
    },
    {
      id: 'python',
      badge: 'לכלי מערכת ואוטומציה מקומית',
      title: 'תוכנות שולחניות מבוססות Python (PyInstaller)',
      desc: 'אם אתה זקוק לסקריפטים מקומיים, מניפולציה של קבצי אקסל בדיסק או אוטומציה של פעולות במחשב, ניתן לקמפל סקריפט פייתון לקובץ הרצה יחיד (.exe) שרץ בלי שיהיה מותקן פייתון על המחשב.',
      pros: ['רץ על כל מחשב ללא התקנת Python מראש', 'מצוין לסקריפטים ועיבוד אקסלים', 'קובץ אחד עצמאי'],
      command: `pip install pyinstaller\npyinstaller --onefile --windowed app.py`,
      steps: [
        'כתיבת קוד התוכנה ב-Python (עם ממשק Tkinter או PyQt)',
        'הרצת PyInstaller עם פרמטר onefile',
        'קבלת קובץ app.exe מוכן להרצה במחשב'
      ]
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Overview Banner */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
        <h3 className="text-base font-bold text-white flex items-center gap-2 mb-2">
          <Terminal className="w-5 h-5 text-indigo-400" />
          איך קוד שאנחנו כותבים הופך לתוכנת מחשב אמיתית?
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          כשאנחנו מפתחים כאן תוכנה, יש 4 דרכים מרכזיות להריץ אותה ישירות על המחשב שלך: החל מהתקנה בלחיצה אחת בלי שום כאב ראש (PWA), ועד יצירת קובץ התקנה <code className="bg-slate-800 text-indigo-300 px-1.5 py-0.5 rounded font-mono">.exe</code> או <code className="bg-slate-800 text-indigo-300 px-1.5 py-0.5 rounded font-mono">.dmg</code>.
        </p>
      </div>

      {/* Methods Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {methods.map(method => (
          <div
            key={method.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between"
          >
            <div>
              {/* Badge & Title */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  {method.badge}
                </span>
                <Laptop className="w-4 h-4 text-slate-400" />
              </div>

              <h4 className="text-sm font-bold text-white mb-2">
                {method.title}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                {method.desc}
              </p>

              {/* Pros */}
              <div className="space-y-1 mb-4">
                {method.pros.map((pro, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{pro}</span>
                  </div>
                ))}
              </div>

              {/* Steps */}
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 mb-4">
                <div className="text-[11px] font-semibold text-slate-400 mb-2">איך זה עובד:</div>
                <ol className="list-decimal list-inside text-[11px] text-slate-300 space-y-1">
                  {method.steps.map((step, idx) => (
                    <li key={idx} className="leading-relaxed">{step}</li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Optional command snippet */}
            {method.command && (
              <div className="relative mt-2">
                <div className="bg-slate-950 rounded-xl p-3 border border-slate-800 font-mono text-[11px] text-cyan-300 overflow-x-auto whitespace-pre">
                  {method.command}
                </div>
                <button
                  onClick={() => handleCopy(method.command!, method.id)}
                  className="absolute top-2 left-2 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 cursor-pointer"
                  title="העתק פקודה"
                >
                  {copiedKey === method.id ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
};
