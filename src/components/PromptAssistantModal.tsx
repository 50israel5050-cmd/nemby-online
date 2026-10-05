import React, { useState } from 'react';
import { X, Sparkles, Copy, Check, Send, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PromptAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPrompt: (promptText: string) => void;
}

export const PromptAssistantModal: React.FC<PromptAssistantModalProps> = ({ isOpen, onClose, onSelectPrompt }) => {
  const [customInput, setCustomInput] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const quickIdeas = [
    'בנה לי תוכנת ניהול עסק ומלאי עם סורק ברקוד והדפסת קבלות',
    'בנה לי תוכנה שולחנית לניהול לקוחות (CRM) עם מעקב שיחות ותזכורות',
    'בנה לי תוכנת אקסל וחישוב שכר/משכורות מקומית למחשב',
    'בנה לי נגן מוזיקה ועורך קבצי MP3 שולחני עם אפקטים ואקולייזר',
    'בנה לי מחשבון משכנתאות והשקעות עם לוח סילוקין והשוואת מסלולים',
    'בנה לי לוח משימות Kanban שולחני עם טיימר פומודורו והתראות'
  ];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    try {
      confetti({ particleCount: 30, spread: 50 });
    } catch {}
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-xl p-6 shadow-2xl relative">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Sparkles className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-base font-bold text-white">ספר לי איזה תוכנה לבנות לך עכשיו</h3>
              <p className="text-xs text-slate-400">בחר רעיון מוכן או העתק ושלח לי בצ׳אט</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Ideas Grid */}
        <div className="py-4 space-y-2.5">
          <div className="text-xs font-semibold text-slate-300">רעיונות מהירים לבחירה:</div>
          <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
            {quickIdeas.map((idea, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setCustomInput(idea);
                  handleCopy(idea);
                }}
                className="p-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-indigo-500/60 text-xs text-slate-200 flex items-center justify-between gap-3 cursor-pointer transition-all group"
              >
                <span>{idea}</span>
                <span className="text-[10px] text-indigo-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                  העתק ושמור
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Text Area */}
        <div className="pt-2">
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">או כתוב במילים שלך:</label>
          <textarea
            rows={3}
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder="למשל: אני צריך תוכנה שתנהל יומן פגישות למספרה עם שליחת SMS..."
            className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 resize-none leading-relaxed"
          />
        </div>

        {/* Bottom Actions */}
        <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between gap-3">
          <button
            onClick={() => handleCopy(customInput || quickIdeas[0])}
            disabled={!customInput && !quickIdeas[0]}
            className="py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-2 cursor-pointer shadow-lg shadow-indigo-600/20"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>הועתק! הדבק עכשיו בצ׳אט</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>העתק בקשה להדבקה בצ׳אט</span>
              </>
            )}
          </button>

          <button
            onClick={onClose}
            className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium cursor-pointer"
          >
            סגור
          </button>
        </div>

      </div>
    </div>
  );
};
