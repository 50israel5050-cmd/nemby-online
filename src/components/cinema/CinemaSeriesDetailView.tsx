import React, { useState } from 'react';
import { 
  ArrowRight, 
  Play, 
  Heart, 
  Star, 
  Layers, 
  Download, 
  User, 
  Calendar 
} from 'lucide-react';
import { MediaItem, Season, Episode } from '../../types/cinema';
import { CINEMA_RED } from '../../data/cinemaSeedData';

interface CinemaSeriesDetailViewProps {
  series: MediaItem;
  onBack: () => void;
  isFavorite: boolean;
  onToggleFavorite: (series: MediaItem) => void;
  onPlayEpisode: (episode: Episode) => void;
  onEpisodeClick: (episode: Episode) => void;
  onActorClick: (actorName: string) => void;
}

export const CinemaSeriesDetailView: React.FC<CinemaSeriesDetailViewProps> = ({
  series,
  onBack,
  isFavorite,
  onToggleFavorite,
  onPlayEpisode,
  onEpisodeClick,
  onActorClick
}) => {
  const seasons = series.seasons || [
    {
      seasonNumber: 1,
      title: 'עונה 1',
      episodes: [
        {
          id: `${series.id}_s1e1`,
          seasonNumber: 1,
          episodeNumber: 1,
          title: 'פרק הבכורה',
          overview: series.overview,
          thumbnailUrl: series.backdropUrl || series.posterUrl,
          durationMinutes: 48,
          streamUrl: series.streamUrl
        },
        {
          id: `${series.id}_s1e2`,
          seasonNumber: 1,
          episodeNumber: 2,
          title: 'הפרק השני',
          overview: 'העלילה מתפתחת וסודות חדשים נחשפים.',
          thumbnailUrl: series.backdropUrl || series.posterUrl,
          durationMinutes: 52,
          streamUrl: series.streamUrl
        },
        {
          id: `${series.id}_s1e3`,
          seasonNumber: 1,
          episodeNumber: 3,
          title: 'המהלך המכריע',
          overview: 'עימות מרתק שמשנה את פני הדברים.',
          thumbnailUrl: series.backdropUrl || series.posterUrl,
          durationMinutes: 49,
          streamUrl: series.streamUrl
        }
      ]
    }
  ];

  const [selectedSeasonNumber, setSelectedSeasonNumber] = useState(seasons[0]?.seasonNumber || 1);
  const currentSeason = seasons.find(s => s.seasonNumber === selectedSeasonNumber) || seasons[0];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-6 select-none">
      
      {/* Hero Backdrop with Back & Actions */}
      <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden shadow-2xl bg-black border border-white/10">
        <img
          src={series.backdropUrl || series.posterUrl}
          alt={series.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-black/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent"></div>

        {/* Back and Favorite Buttons Top Bar */}
        <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer"
            title="חזור"
          >
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => onToggleFavorite(series)}
            className={`w-9 h-9 rounded-full border flex items-center justify-center transition-colors cursor-pointer ${
              isFavorite
                ? 'bg-[#E50914]/30 border-[#E50914] text-[#E50914]'
                : 'bg-black/60 border-white/20 text-white hover:bg-black/80'
            }`}
            title={isFavorite ? 'הסר ממועדפים' : 'הוסף למועדפים'}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-[#E50914]' : ''}`} />
          </button>
        </div>

        {/* Series Info Bottom Header */}
        <div className="absolute bottom-6 right-6 left-6 text-right space-y-2 z-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white">
            {series.title}
          </h1>

          <div className="flex items-center gap-3 text-xs text-slate-300">
            <span>{series.year}</span>
            <span>•</span>
            <div className="flex items-center gap-1 text-amber-400 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{series.rating}</span>
            </div>
            <span>•</span>
            <span className="bg-[#E50914] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
              {series.quality}
            </span>
            <span>•</span>
            <span className="text-slate-400">
              {seasons.length === 1 ? 'עונה 1' : `${seasons.length} עונות`}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 max-w-2xl">
            {series.overview}
          </p>
        </div>
      </div>

      {/* Seasons Tab Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-white/10">
        {seasons.map((season) => {
          const isSelected = season.seasonNumber === selectedSeasonNumber;
          return (
            <button
              key={season.seasonNumber}
              onClick={() => setSelectedSeasonNumber(season.seasonNumber)}
              className={`py-2 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#E50914] text-white shadow-lg shadow-[#E50914]/30'
                  : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {season.title} ({season.episodes.length})
            </button>
          );
        })}
      </div>

      {/* Episodes Grid (2 columns on mobile/tablet, 3 on desktop - NO SYNOPSIS on cards!) */}
      <div className="space-y-3">
        <h3 className="text-base font-bold text-white flex items-center justify-between">
          <span>פרקים - {currentSeason.title}</span>
          <span className="text-xs text-slate-400 font-normal">{currentSeason.episodes.length} פרקים זמינים</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentSeason.episodes.map((ep) => (
            <div
              key={ep.id}
              onClick={() => onEpisodeClick(ep)}
              className="group bg-[#141414] hover:bg-[#1c1c1c] border border-white/10 hover:border-[#E50914]/50 rounded-xl overflow-hidden shadow-lg transition-all cursor-pointer"
            >
              {/* 16:9 Thumbnail */}
              <div className="relative w-full aspect-video bg-slate-900">
                <img
                  src={ep.thumbnailUrl || series.backdropUrl || series.posterUrl}
                  alt={ep.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                />

                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors"></div>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                  <div className="w-10 h-10 rounded-full bg-black/60 group-hover:bg-[#E50914] text-white flex items-center justify-center transition-colors shadow">
                    <Play className="w-5 h-5 fill-white translate-x-0.5" />
                  </div>
                </div>

                {/* Episode Number badge */}
                <div className="absolute top-2 right-2 bg-black/75 backdrop-blur-sm text-[10px] font-bold text-white px-2 py-0.5 rounded shadow">
                  פרק {ep.episodeNumber}
                </div>

                {/* Duration badge */}
                <div className="absolute bottom-2 right-2 bg-black/75 backdrop-blur-sm text-[10px] font-medium text-slate-200 px-2 py-0.5 rounded">
                  {ep.durationMinutes} דק׳
                </div>
              </div>

              {/* Title only - NO SYNOPSIS per app rules! */}
              <div className="p-3 text-right">
                <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-[#E50914] transition-colors truncate">
                  {ep.episodeNumber}. {ep.title}
                </h4>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Cast & Director */}
      {series.actors.length > 0 && (
        <div className="pt-4 border-t border-white/10 space-y-3">
          <h3 className="text-sm font-bold text-white">שחקנים ובמאים</h3>
          <div className="flex flex-wrap gap-2">
            {series.actors.map((actor) => (
              <button
                key={actor}
                onClick={() => onActorClick(actor)}
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
  );
};
