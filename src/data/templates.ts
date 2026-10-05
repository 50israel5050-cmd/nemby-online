import { SoftwareTemplate } from '../types';

export const SOFTWARE_TEMPLATES: SoftwareTemplate[] = [
  {
    id: 'inventory-crm',
    title: 'מערכת ניהול מלאי, לקוחות וקופה (ERP/CRM)',
    category: 'עסקים וניהול',
    description: 'תוכנה שלמה לניהול חנות, מחסן או משרד: הפקת חשבוניות, מעקב לקוחות, דוחות רווח והפסד ועבודה ללא אינטרנט.',
    icon: 'Store',
    badge: 'הכי מבוקש',
    platforms: ['windows', 'mac', 'pwa'],
    features: ['שמירת נתונים מקומית ובענן', 'הפקת דוחות וייצוא ל-Excel/PDF', 'סורק ברקוד והדפסת קבלות', 'התראות מלאי נמוך'],
    techStack: ['Electron / Tauri', 'React + TypeScript', 'SQLite / IndexedDB'],
    samplePrompt: 'בנה לי תוכנת שולחן עבודה לניהול מלאי ולקוחות עבור חנות אלקטרוניקה, עם הפקת קבלות, סינון מהיר וייצוא לאקסל'
  },
  {
    id: 'document-ocr-ai',
    title: 'כלי עיבוד מסמכים ואוטומציה (Smart Docs)',
    category: 'כלי עזר ומשרד',
    description: 'תוכנה לסריקה, מיון והמרת קבצי PDF/Word, חילוץ טקסטים אוטומטי, סיכום מסמכים וארגון תיקיות במחשב.',
    icon: 'FileText',
    badge: 'אוטומציה',
    platforms: ['windows', 'mac'],
    features: ['קריאת קבצים מקומיים מהדיסק', 'חילוץ טבלאות וטקסטים (OCR)', 'המרת פורמטים בלחיצה', 'תיוג חכם של מסמכים'],
    techStack: ['Python / Node.js', 'Tauri / Electron', 'Tesseract OCR'],
    samplePrompt: 'בנה לי תוכנת מחשב שמסוגלת לקרוא תיקיית מסמכים וחשבוניות ב-PDF, לחלץ את הסכומים והתאריכים ולסדר אותם בגיליון'
  },
  {
    id: 'financial-calculator',
    title: 'מחשבון פיננסי והשקעות מתקדם',
    category: 'פיננסים וחישובים',
    description: 'מערכת לחישוב תשואות, משכנתאות, לוחות סילוקין, גרפים אינטראקטיביים ותחזיות חיסכון לטווח ארוך.',
    icon: 'Calculator',
    badge: 'כלי מקצועי',
    platforms: ['windows', 'mac', 'pwa', 'web'],
    features: ['חישובי ריבית דריבית מורכבים', 'לוח שפיצר וקרן שווה', 'גרפי צמיחה אינטראקטיביים', 'שמירת תרחישים להשוואה'],
    techStack: ['React', 'Chart.js / Recharts', 'PWA / Tauri'],
    samplePrompt: 'בנה לי תוכנת מחשב לתכנון פיננסי אישי, עם השוואת מסלולי משכנתה, גרפים דינמיים וייצוא לוח סילוקין'
  },
  {
    id: 'media-audio-player',
    title: 'נגן מולטימדיה ועורך סאונד מקומי',
    category: 'מדיה וסאונד',
    description: 'נגן מוזיקה שולחני אלגנטי עם תמיכה ברשימות השמעה, אקולייזר, חיתוך אודיו, עריכת תגיות MP3 והקלטת קול.',
    icon: 'Music',
    badge: 'מולטימדיה',
    platforms: ['windows', 'mac'],
    features: ['קריאת קובצי אודיו מהכונן', 'אקולייזר 10 ערוצים ויזואלי', 'חיתוך קטעי שמע ושמירה', 'תמיכה במקשי קיצור במקלדת'],
    techStack: ['Web Audio API', 'Electron', 'Wavesurfer.js'],
    samplePrompt: 'בנה תוכנת נגן אודיו שולחנית יפהפייה עם הדמיית גלי קול (Waveform), רשימות השמעה ושליטה מהירה במקלדת'
  },
  {
    id: 'time-tracker-kanban',
    title: 'ניהול פרויקטים ומעקב זמנים (Desktop Kanban)',
    category: 'פרודוקטיביות',
    description: 'לוח משימות שולחני אישי עם טיימר פומודורו, סטטיסטיקות שעות עבודה, עדיפויות והתראות קופצות למסך.',
    icon: 'Clock',
    badge: 'פרודוקטיביות',
    platforms: ['windows', 'mac', 'pwa'],
    features: ['גרירת משימות בין שלבים (Kanban)', 'שעון עצר מובנה לכל משימה', 'התראות שולחן עבודה (Desktop Notifications)', 'עבודה מלאה ללא רשת'],
    techStack: ['React', 'Local Storage', 'Notification API'],
    samplePrompt: 'בנה לי תוכנה שולחנית לניהול זמנים ומשימות עם טיימר פומודורו, דוחות יומיים והתראות קופצות'
  },
  {
    id: 'offline-code-notes',
    title: 'מחברת מתכנתים ועורך קוד אישי (Markdown & Snippets)',
    category: 'פיתוח ותוכנה',
    description: 'כלי שולחני מהיר לניהול הערות, קטעי קוד (Code Snippets), חיפוש מיידי לפי תגיות, ותצוגה מקדימה עשירה.',
    icon: 'Code2',
    badge: 'למפתחים',
    platforms: ['windows', 'mac', 'linux'],
    features: ['הדגשת תחביר ל-50 שפות', 'ייצוא להעתקה בלחיצה אחת', 'חיפוש Full-Text מהיר כברק', 'אחסון בקבצים מקומיים'],
    techStack: ['Monaco Editor / Prism', 'Tauri / Electron', 'SQLite'],
    samplePrompt: 'בנה לי תוכנת מחשב לארגון קטעי קוד עם תגיות, עורך טקסט עם צביעת תחביר וקיצורי מקלדת'
  }
];
