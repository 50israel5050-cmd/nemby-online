import React from 'react';
import { Play, Trash2, X } from 'lucide-react';
import { ContinueWatchingItem } from '../../types/cinema';
import { CINEMA_RED } from '../../data/cinemaSeedData';

interface CinemaContinueWatchingProps {
  items: ContinueWatchingItem[];
  onItemClick: (item: ContinueWatchingItem) => void;
  onRemoveItem: (item: ContinueWatchingItem) => void;
  onClearAll: () => void;
}

export const CinemaContinueWatching: React.FC<CinemaContinueWatchingProps> = ({
  items,
  onItemClick,
  onRemoveItem,
  onClearAll
}) => {
  if (items.length === 0) return null;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 select-none">
      
      {/* Header Row */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
          <span>המשך צפייה</span>
          <span className="text-xs text-slate-500 font-normal">({items.length})</span>
        </h3>

        <button
          onClick={onClearAll}
          className="text-xs font-semibold text-[#E50914] hover:text-[#ff3b47] transition-colors cursor-pointer"
        >
          נקה הכל
        </button>
      </div>

      {/* Horizontal Cards Scroll */}
      <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/20">
        {items.map((item) => (
          <div
            key={item.id}
            className="group relative w-56 sm:w-64 rounded-xl overflow-hidden bg-[#141414] border border-white/10 shrink-0 shadow-lg transition-transform hover:-translate-y-1 cursor-pointer"
            onClick={() => onItemClick(item)}
          >
            {/* Thumbnail */}
            <div className="relative w-full h-32 bg-slate-900">
              <img
                src={item.mediaItem.backdropUrl || item.mediaItem.posterUrl}
                alt={item.mediaItem.title}
                className="w-full h-full object-cover"
              />

              {/* Play Overlay */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                <div className="w-10 h-10 rounded-full bg-black/70 group-hover:bg-[#E50914] text-white flex items-center justify-center transition-colors shadow">
                  <Play className="w-5 h-5 fill-white translate-x-0.5" />
                </div>
              </div>

              {/* Remove button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveItem(item);
                }}
                className="absolute top-2 left-2 w-6 h-6 rounded-full bg-black/60 hover:bg-[#E50914] text-white/80 hover:text-white flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100"
                title="הסר מהמשך צפייה"
              >
                <X className="w-3.5 h-3.5" />
              </button>

              {/* Progress bar at bottom of thumbnail */}
              <div className="absolute bottom-0 inset-x-0 h-1 bg-white/20">
                <div
                  className="h-full bg-[#E50914]"
                  style={{ width: `${Math.round(item.progressFraction * 100)}%` }}
                />
              </div>
            </div>

            {/* Info details */}
            <div className="p-3 text-right">
              <div className="text-xs font-bold text-white truncate">
                {item.mediaItem.title}
              </div>
              <div className="text-[11px] text-slate-400 truncate mt-0.5">
                {item.episodeTitle || `${Math.round(item.progressFraction * 100)}% נצפו`}
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
