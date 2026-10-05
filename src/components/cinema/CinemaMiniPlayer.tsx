import React from 'react';
import { Play, Pause, Maximize2, X } from 'lucide-react';
import { MediaItem } from '../../types/cinema';
import { CINEMA_RED } from '../../data/cinemaSeedData';

interface CinemaMiniPlayerProps {
  title: string;
  mediaItem: MediaItem | null;
  isPlaying: boolean;
  currentPositionMs: number;
  durationMs: number;
  onPlayPauseToggle: () => void;
  onExpand: () => void;
  onClose: () => void;
}

export const CinemaMiniPlayer: React.FC<CinemaMiniPlayerProps> = ({
  title,
  mediaItem,
  isPlaying,
  currentPositionMs,
  durationMs,
  onPlayPauseToggle,
  onExpand,
  onClose
}) => {
  const progress = durationMs > 0 ? Math.min(100, Math.max(0, (currentPositionMs / durationMs) * 100)) : 35;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:w-96 z-50 select-none animate-in slide-in-from-bottom duration-300">
      <div 
        onClick={onExpand}
        className="relative bg-[#141414]/95 backdrop-blur-md border border-white/15 rounded-2xl p-2.5 shadow-2xl overflow-hidden flex items-center justify-between gap-3 cursor-pointer group"
      >
        {/* Thumbnail */}
        {mediaItem && (
          <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-900 shrink-0">
            <img
              src={mediaItem.posterUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Title details */}
        <div className="flex-1 min-w-0 text-right">
          <div className="text-xs font-bold text-white truncate">{title || 'מנגן כעת'}</div>
          <div className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>נגינה פעילה ברקע</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
          {/* Play/Pause */}
          <button
            onClick={onPlayPauseToggle}
            className="w-8 h-8 rounded-full bg-[#E50914] text-white flex items-center justify-center transition-transform hover:scale-105 active:scale-95 cursor-pointer shadow"
            title={isPlaying ? 'השהה' : 'נגן'}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 fill-white" />
            ) : (
              <Play className="w-4 h-4 fill-white translate-x-0.5" />
            )}
          </button>

          {/* Expand */}
          <button
            onClick={onExpand}
            className="p-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="פתח נגן מלא"
          >
            <Maximize2 className="w-4 h-4" />
          </button>

          {/* Close */}
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
            title="סגור נגן"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Progress bar line at bottom */}
        <div className="absolute bottom-0 inset-x-0 h-1 bg-white/10">
          <div
            className="h-full bg-[#E50914] transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

      </div>
    </div>
  );
};
