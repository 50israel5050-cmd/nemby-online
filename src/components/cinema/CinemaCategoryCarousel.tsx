import React from 'react';
import { Star, ChevronLeft, Film, Tv } from 'lucide-react';
import { MediaCategory, MediaItem } from '../../types/cinema';
import { CINEMA_RED } from '../../data/cinemaSeedData';

interface CinemaCategoryCarouselProps {
  category: MediaCategory;
  onMediaClick: (item: MediaItem) => void;
  onShowAll: (category: MediaCategory) => void;
}

export const CinemaCategoryCarousel: React.FC<CinemaCategoryCarouselProps> = ({
  category,
  onMediaClick,
  onShowAll
}) => {
  if (category.items.length === 0) return null;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 select-none">
      
      {/* Category Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
          <span>{category.title}</span>
          <span className="text-xs text-slate-500 font-normal">({category.items.length})</span>
        </h3>

        <button
          onClick={() => onShowAll(category)}
          className="text-xs font-semibold text-[#E50914] hover:text-[#ff3b47] flex items-center gap-1 transition-colors cursor-pointer"
        >
          <span>הצג הכל</span>
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Horizontal Carousel */}
      <div className="flex items-center gap-3.5 sm:gap-4 overflow-x-auto pb-3 pt-1 scrollbar-thin scrollbar-thumb-white/20">
        {category.items.map((item) => (
          <div
            key={item.id}
            onClick={() => onMediaClick(item)}
            className="group w-28 sm:w-36 md:w-40 shrink-0 cursor-pointer transition-all duration-200 hover:-translate-y-1.5"
          >
            {/* Poster Card */}
            <div className="relative w-full aspect-[2/3] rounded-xl overflow-hidden bg-[#1F1F1F] border border-white/10 shadow-lg group-hover:shadow-2xl group-hover:border-[#E50914]/50 transition-all">
              
              <img
                src={item.posterUrl}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />

              {/* Top Quality Badge */}
              <div className="absolute top-2 right-2 bg-black/75 backdrop-blur-sm text-[9px] sm:text-[10px] font-bold text-white px-1.5 py-0.5 rounded shadow">
                {item.quality}
              </div>

              {/* Rating Star Badge */}
              {item.rating && item.rating !== '0' && (
                <div className="absolute top-2 left-2 bg-black/75 backdrop-blur-sm text-[9px] sm:text-[10px] font-bold text-white px-1.5 py-0.5 rounded flex items-center gap-1 shadow">
                  <Star className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
                  <span>{item.rating}</span>
                </div>
              )}

              {/* Series or Movie duration overlay badge */}
              <div className="absolute bottom-1.5 inset-x-1.5 flex items-center justify-between text-[10px] text-white/90 drop-shadow">
                {item.type === 'SERIES' && item.seasonsCount ? (
                  <span className="bg-black/60 px-1.5 py-0.5 rounded backdrop-blur-sm text-[10px] font-medium">
                    {item.seasonsCount === 1 ? 'עונה 1' : `${item.seasonsCount} עונות`}
                  </span>
                ) : item.durationMinutes > 0 ? (
                  <span className="bg-black/60 px-1.5 py-0.5 rounded backdrop-blur-sm text-[10px] font-medium">
                    {item.durationMinutes} דק׳
                  </span>
                ) : null}
              </div>

            </div>

            {/* Title & Year */}
            <div className="mt-2 text-right">
              <h4 className="text-xs sm:text-sm font-semibold text-white truncate group-hover:text-[#E50914] transition-colors">
                {item.title}
              </h4>
              <div className="text-[11px] text-slate-400 flex items-center justify-between mt-0.5">
                <span>{item.year}</span>
                <span className="text-[10px] text-slate-500">
                  {item.type === 'SERIES' ? 'סדרה' : 'סרט'}
                </span>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
