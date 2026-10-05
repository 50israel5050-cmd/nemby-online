import React, { useState } from 'react';
import { Heart, ArrowRight, Download, Share2, Star, Trash2 } from 'lucide-react';
import { MediaItem } from '../../types/cinema';
import { CINEMA_RED } from '../../data/cinemaSeedData';

interface CinemaFavoritesScreenProps {
  favoriteItems: MediaItem[];
  favoriteActors: string[];
  onMediaClick: (item: MediaItem) => void;
  onRemoveFavorite: (item: MediaItem) => void;
  onBack: () => void;
}

export const CinemaFavoritesScreen: React.FC<CinemaFavoritesScreenProps> = ({
  favoriteItems,
  favoriteActors,
  onMediaClick,
  onRemoveFavorite,
  onBack
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'movies' | 'series'>('all');

  const filtered = favoriteItems.filter((i) => {
    if (selectedFilter === 'movies') return i.type === 'MOVIE';
    if (selectedFilter === 'series') return i.type === 'SERIES';
    return true;
  });

  const handleExportBackup = () => {
    const jsonStr = JSON.stringify(favoriteItems, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cinemastream_favorites_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

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
              <Heart className="w-6 h-6 fill-[#E50914] text-[#E50914]" />
              <span>המועדפים שלי</span>
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              {favoriteItems.length} כותרים שמורים לצפייה מהירה
            </p>
          </div>
        </div>

        {/* Export Backup Button */}
        {favoriteItems.length > 0 && (
          <button
            onClick={handleExportBackup}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer self-start sm:self-auto border border-white/10"
            title="הורדת קובץ גיבוי של המועדפים לכונן המחשב"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>ייצא גיבוי JSON למחשב</span>
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      {favoriteItems.length > 0 && (
        <div className="flex items-center gap-2 text-xs font-bold">
          {[
            { id: 'all', label: 'הכל', count: favoriteItems.length },
            { id: 'movies', label: 'סרטים', count: favoriteItems.filter(i => i.type === 'MOVIE').length },
            { id: 'series', label: 'סדרות', count: favoriteItems.filter(i => i.type === 'SERIES').length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedFilter(tab.id as any)}
              className={`py-1.5 px-3.5 rounded-xl transition-colors cursor-pointer ${
                selectedFilter === tab.id
                  ? 'bg-[#E50914] text-white shadow-md'
                  : 'bg-white/5 text-slate-400 hover:text-white'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
      )}

      {/* Grid or Empty */}
      {filtered.length === 0 ? (
        <div className="py-24 text-center text-slate-500 space-y-3">
          <Heart className="w-16 h-16 mx-auto opacity-30 text-[#E50914]" />
          <p className="text-base font-bold text-white">רשימת המועדפים שלך ריקה</p>
          <p className="text-xs text-slate-400">לחץ על סמל הלב בכל סרט או סדרה כדי לשמור אותו כאן</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => onMediaClick(item)}
              className="group relative bg-[#141414] hover:bg-[#1a1a1a] rounded-xl overflow-hidden border border-white/10 hover:border-[#E50914]/50 shadow-lg cursor-pointer transition-all duration-200 hover:-translate-y-1"
            >
              <div className="relative aspect-[2/3] bg-slate-900">
                <img
                  src={item.posterUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Remove button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveFavorite(item);
                  }}
                  className="absolute top-2 left-2 w-7 h-7 rounded-full bg-black/70 hover:bg-[#E50914] text-white flex items-center justify-center transition-colors shadow z-10"
                  title="הסר ממועדפים"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>

                <div className="absolute top-2 right-2 bg-black/70 text-[9px] font-bold text-white px-1.5 py-0.5 rounded">
                  {item.quality}
                </div>
              </div>

              <div className="p-2.5 text-right">
                <h4 className="text-xs sm:text-sm font-bold text-white truncate group-hover:text-[#E50914] transition-colors">
                  {item.title}
                </h4>
                <div className="text-[11px] text-slate-400 flex items-center justify-between mt-0.5">
                  <span>{item.year}</span>
                  <span className="text-[10px] text-slate-500">{item.type === 'SERIES' ? 'סדרה' : 'סרט'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
