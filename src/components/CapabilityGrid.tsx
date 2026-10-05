import React, { useState } from 'react';
import { 
  Store, 
  FileText, 
  Calculator, 
  Music, 
  Clock, 
  Code2, 
  Check, 
  Copy, 
  ArrowLeft, 
  Layers, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { SOFTWARE_TEMPLATES } from '../data/templates';
import { SoftwareTemplate } from '../types';

interface CapabilityGridProps {
  onSelectTemplate: (template: SoftwareTemplate) => void;
}

export const CapabilityGrid: React.FC<CapabilityGridProps> = ({ onSelectTemplate }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Store': return <Store className="w-5 h-5 text-indigo-400" />;
      case 'FileText': return <FileText className="w-5 h-5 text-emerald-400" />;
      case 'Calculator': return <Calculator className="w-5 h-5 text-amber-400" />;
      case 'Music': return <Music className="w-5 h-5 text-rose-400" />;
      case 'Clock': return <Clock className="w-5 h-5 text-cyan-400" />;
      case 'Code2': return <Code2 className="w-5 h-5 text-violet-400" />;
      default: return <Layers className="w-5 h-5 text-indigo-400" />;
    }
  };

  const handleCopyPrompt = (template: SoftwareTemplate) => {
    navigator.clipboard.writeText(template.samplePrompt);
    setCopiedId(template.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Intro info box */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            מגוון תוכנות שתוכל לבקש ממני לבנות כרגע:
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            לחץ על כל אחת מהתבניות כדי לטעון אותה לבונה התוכנה, או העתק את הבקשה וכתוב לי בצ׳אט בדיוק מה להוסיף.
          </p>
        </div>
      </div>

      {/* Grid of templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {SOFTWARE_TEMPLATES.map(template => (
          <div
            key={template.id}
            className="group relative bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 hover:shadow-xl hover:shadow-indigo-500/10"
          >
            <div>
              {/* Card Header */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 shrink-0">
                  {getIcon(template.icon)}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    {template.badge}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {template.category}
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <h4 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors mb-2">
                {template.title}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                {template.description}
              </p>

              {/* Features List */}
              <div className="space-y-1.5 mb-4">
                <div className="text-[11px] font-semibold text-slate-300">תכונות מרכזיות:</div>
                {template.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Tech Stack tags */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {template.techStack.map((tech, i) => (
                  <span key={i} className="text-[10px] font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700/50">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
              <button
                onClick={() => onSelectTemplate(template)}
                className="flex-1 py-2 px-3 rounded-lg bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/30 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <span>התאם תוכנה זו</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => handleCopyPrompt(template)}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 border border-slate-700 transition-colors cursor-pointer"
                title="העתק פקודת בנייה"
              >
                {copiedId === template.id ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
