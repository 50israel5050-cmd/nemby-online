import React from 'react';
import { 
  X, 
  Play, 
  Layers, 
  Download, 
  Heart, 
  Star, 
  User, 
  Clock, 
  Calendar, 
  Check 
} from 'lucide-react';
import { MediaItem } from '../../types/cinema';
import { CINEMA_RED } from '../../data/cinemaSeedData';

interface CinemaMediaDetailModalProps {
  media: MediaItem | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (media: MediaItem) => void;
  onPlayClick: (media: MediaItem) => void;
  onShowStreamsClick: (media: MediaItem) => void;
  onDownloadClick: (media: MediaItem) => void;
  onActorClick: (actorName: String) => void;
}

export const CinemaMediaDetailModal: React.FC<CinemaMediaDetailModalProps> = ({
  media,
  isOpen,
  onClose,
  isFavorite,
  onToggleFavorite,
  onPlayClick,
  onShowStreamsClick,
  onDownloadClick,
  onActorClick
}) => {
  if (!isOpen || !media) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md select-none animate-in fade-in duration-200">
      
      {/* Modal Box */}
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-[#141414] border border-white/10 rounded-2xl overflow-y-auto shadow-2xl flex flex-col text-right scrollbar-thin scrollbar-thumb-white/20">
        
        {/* Backdrop Header with Close Button */}
        <div className="relative w-full h-56 sm:h-72 bg-slate-900 shrink-0">
          <img
            src={media.backdropUrl || media.posterUrl}
            alt={media.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-black/30 to-transparent"></div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 left-4 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-colors cursor-pointer z-10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content details */}
        <div className="p-5 sm:p-7 space-y-5 -mt-6 relative z-10">
          
          {/* Header titles & rating */}
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white">
              {media.title}
            </h2>
            {media.originalTitle && media.originalTitle !== media.title && (
              <div className="text-xs sm:text-sm text-slate-400 font-medium mt-0.5">
                {media.originalTitle}
              </div>
            )}

            {/* Badges row */}
            <div className="flex flex-wrap items-center gap-2.5 mt-3 text-xs">
              {/* Rating */}
              <div className="bg-white/10 text-amber-400 font-bold px-2 py-0.5 rounded flex items-center gap-1 border border-white/5">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{media.rating}</span>
              </div>

              {/* Year */}
              <span className="bg-white/10 text-slate-200 px-2 py-0.5 rounded border border-white/5">
                {media.year}
              </span>

              {/* Quality */}
              <span className="bg-[#E50914] text-white font-bold px-2 py-0.5 rounded">
                {media.quality}
              </span>

              {/* Age */}
              <span className="bg-white/10 text-slate-300 px-2 py-0.5 rounded border border-white/5">
                {media.ageRating}
              </span>

              {/* Duration or Seasons count */}
              {media.type === 'SERIES' && media.seasonsCount ? (
                <span className="bg-white/10 text-slate-300 px-2 py-0.5 rounded border border-white/5">
                  {media.seasonsCount === 1 ? 'עונה 1' : `${media.seasonsCount} עונות`}
                </span>
              ) : media.durationMinutes > 0 ? (
                <span className="bg-white/10 text-slate-300 px-2 py-0.5 rounded border border-white/5">
                  {media.durationMinutes} דק׳
                </span>
              ) : null}
            </div>
          </div>

          {/* Action buttons row: נגן, מקורות, הורדה, מועדפים */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 pt-2">
            
            {/* Play Button */}
            <button
              onClick={() => onPlayClick(media)}
              className="sm:col-span-2 py-2.5 px-4 rounded-xl bg-[#E50914] hover:bg-[#b81d24] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#E50914]/30 transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>נגן עכשיו</span>
            </button>

            {/* Sources / Addons Button */}
            <button
              onClick={() => onShowStreamsClick(media)}
              className="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-white/10"
              title="צפה בכל המקורות והתוספים (Torrentio, TPB+)"
            >
              <Layers className="w-4 h-4" />
              <span>מקורות</span>
            </button>

            {/* Download and Favorite buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => onDownloadClick(media)}
                className="flex-1 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs flex items-center justify-center transition-colors cursor-pointer border border-white/10"
                title="הורדה לצפייה אופליין"
              >
                <Download className="w-4 h-4" />
              </button>

              <button
                onClick={() => onToggleFavorite(media)}
                className={`flex-1 py-2.5 rounded-xl border flex items-center justify-center transition-colors cursor-pointer ${
                  isFavorite
                    ? 'bg-[#E50914]/20 border-[#E50914] text-[#E50914]'
                    : 'bg-white/10 border-white/10 text-white hover:bg-white/20'
                }`}
                title={isFavorite ? 'הסר ממועדפים' : 'הוסף למועדפים'}
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-[#E50914]' : ''}`} />
              </button>
            </div>

          </div>

          {/* Synopsis */}
          <div className="space-y-1.5">
            <h3 className="text-sm font-bold text-white">תקציר</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {media.overview}
            </p>
          </div>

          {/* Genres */}
          <div className="space-y-1.5">
            <h3 className="text-xs font-bold text-slate-400">ז׳אנרים</h3>
            <div className="flex flex-wrap gap-1.5">
              {media.genres.map((genre) => (
                <span
                  key={genre}
                  className="bg-white/5 border border-white/10 text-slate-300 text-xs px-2.5 py-1 rounded-lg"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>

          {/* Cast */}
          {media.actors.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-white/10">
              <h3 className="text-xs font-bold text-slate-400">שחקנים מובילים</h3>
              <div className="flex flex-wrap gap-2">
                {media.actors.map((actor) => (
                  <button
                    key={actor}
                    onClick={() => {
                      onClose();
                      onActorClick(actor);
                    }}
                    className="flex items-center gap-1.5 bg-white/5 hover:bg-white/15 px-3 py-1.5 rounded-xl text-xs text-white border border-white/5 transition-colors cursor-pointer"
                  >
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>{actor}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
