import React from 'react';
import { ArrowRight, LayoutGrid, Check, Sparkles } from 'lucide-react';
import { StremioAddon } from '../../types/cinema';
import { DEFAULT_ADDONS, CINEMA_RED } from '../../data/cinemaSeedData';

interface CinemaCatalogsScreenProps {
  onBack: () => void;
  onOpenSettings: () => void;
}

export const CinemaCatalogsScreen: React.FC<CinemaCatalogsScreenProps> = ({
  onBack,
  onOpenSettings
}) => {
  const catalogs = [
    {
      id: 'cinemeta-movies',
      name: 'IMDb Cinemeta - סרטים מובילים',
      type: 'סרטים',
      badge: 'רשמי',
      backdrop: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&q=80',
      description: 'הסרטים המדורגים ביותר בעולם מתוך מסד הנתונים של IMDb'
    },
    {
      id: 'cinemeta-series',
      name: 'IMDb Cinemeta - סדרות טלוויזיה',
      type: 'סדרות',
      badge: 'רשמי',
      backdrop: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&q=80',
      description: 'כל עונות ופרקי הסדרות המובילות בסטרימינג'
    },
    {
      id: 'torrentio-catalog',
      name: 'Torrentio Streams & Torrents',
      type: 'סרטים וסדרות',
      badge: 'P2P / Debrid',
      backdrop: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80',
      description: 'הזרמה ישירה באיכות 4K/1080p עם חיבור ל-RealDebrid ורשתות טורנטים'
    },
    {
      id: 'tpb-catalog',
      name: 'The Pirate Bay+ Catalog',
      type: 'אינדקס חופשי',
      badge: 'שחרורים',
      backdrop: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&q=80',
      description: 'מקור לשחרורי איכות, סרטים קלאסיים וקומדיות'
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 select-none animate-in fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <LayoutGrid className="w-6 h-6 text-[#E50914]" />
              <span>קטלוגים מתוספי Stremio</span>
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              קטלוגים רחבים ומקורות חיצוניים שמחוברים לאפליקציה
            </p>
          </div>
        </div>

        <button
          onClick={onOpenSettings}
          className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/10 cursor-pointer self-start sm:self-auto"
        >
          ניהול תוספים והרחבות
        </button>
      </div>

      {/* Grid of Wide Catalogs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {catalogs.map((cat) => (
          <div
            key={cat.id}
            className="group relative rounded-2xl overflow-hidden aspect-[16/9] bg-[#141414] border border-white/10 hover:border-[#E50914]/60 shadow-xl transition-all cursor-pointer"
          >
            <img
              src={cat.backdrop}
              alt={cat.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

            <div className="absolute top-4 left-4 bg-[#E50914] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow">
              {cat.badge}
            </div>

            <div className="absolute bottom-5 right-5 left-5 text-right space-y-1.5 z-10">
              <span className="text-[11px] font-semibold text-slate-300 bg-white/10 px-2 py-0.5 rounded backdrop-blur-sm">
                {cat.type}
              </span>
              <h3 className="text-lg sm:text-xl font-black text-white group-hover:text-[#E50914] transition-colors">
                {cat.name}
              </h3>
              <p className="text-xs text-slate-300 line-clamp-1">
                {cat.description}
              </p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
