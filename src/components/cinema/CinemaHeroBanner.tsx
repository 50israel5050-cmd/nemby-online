import React, { useState, useEffect } from 'react';
import { Play, Info, Star } from 'lucide-react';
import { MediaItem } from '../../types/cinema';
import { CINEMA_RED } from '../../data/cinemaSeedData';

interface CinemaHeroBannerProps {
  items: MediaItem[];
  onPlayClick: (item: MediaItem) => void;
  onDetailClick: (item: MediaItem) => void;
}

export const CinemaHeroBanner: React.FC<CinemaHeroBannerProps> = ({
  items,
  onPlayClick,
  onDetailClick
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [items.length]);

  if (items.length === 0) return null;
  const currentItem = items[currentIndex] || items[0];

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 select-none">
      <div className="relative w-full h-[280px] sm:h-[340px] md:h-[400px] rounded-2xl overflow-hidden shadow-2xl bg-black border border-white/10 group">
        
        {/* Backdrop Image */}
        <img
          src={currentItem.backdropUrl || currentItem.posterUrl}
          alt={currentItem.title}
          className="w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-105"
        />

        {/* Cinematic Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-black/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent"></div>

        {/* Content Box */}
        <div className="absolute bottom-0 right-0 p-5 sm:p-8 max-w-xl text-right z-10 space-y-3">
          
          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight drop-shadow-md">
            {currentItem.title}
          </h1>

          {/* Metadata badges row */}
          <div className="flex items-center gap-2.5 text-xs text-slate-300">
            <span className="font-semibold text-slate-200">{currentItem.year}</span>
            <span>•</span>
            <div className="flex items-center gap-1 text-amber-400 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{currentItem.rating}</span>
            </div>
            <span>•</span>
            <span className="bg-[#E50914] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
              {currentItem.quality}
            </span>
            {currentItem.genres.length > 0 && (
              <>
                <span>•</span>
                <span className="text-slate-400 hidden sm:inline">
                  {currentItem.genres.slice(0, 2).join(', ')}
                </span>
              </>
            )}
          </div>

          {/* Description synopsis snippet */}
          <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed drop-shadow">
            {currentItem.overview}
          </p>

          {/* Actions: Play and Details */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => onPlayClick(currentItem)}
              className="px-6 py-2.5 rounded-xl bg-[#E50914] hover:bg-[#b81d24] text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-[#E50914]/40 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>נגן עכשיו</span>
            </button>

            <button
              onClick={() => onDetailClick(currentItem)}
              className="px-5 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-semibold text-sm flex items-center gap-2 transition-all cursor-pointer"
            >
              <Info className="w-4 h-4" />
              <span>מידע נוסף</span>
            </button>
          </div>

        </div>

        {/* Carousel Indicators */}
        {items.length > 1 && (
          <div className="absolute bottom-4 left-6 flex items-center gap-2 z-20">
            {items.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  currentIndex === idx ? 'w-6 bg-[#E50914]' : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
                title={`כותר ${idx + 1}`}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
