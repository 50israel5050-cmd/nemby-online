import React, { useState } from 'react';
import { Search, X, Star, Film, Tv, User, ArrowRight } from 'lucide-react';
import { MediaItem } from '../../types/cinema';
import { CINEMA_RED } from '../../data/cinemaSeedData';

interface CinemaSearchScreenProps {
  items: MediaItem[];
  onMediaClick: (item: MediaItem) => void;
  onBack: () => void;
}

export const CinemaSearchScreen: React.FC<CinemaSearchScreenProps> = ({
  items,
  onMediaClick,
  onBack
}) => {
  const [query, setQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState<'all' | 'movies' | 'series' | 'actors'>('all');

  const filteredItems = items.filter((item) => {
    const q = query.trim().toLowerCase();
    if (!q) return false;
    const matchesTitle = item.title.toLowerCase().includes(q) || item.originalTitle.toLowerCase().includes(q);
    const matchesActor = item.actors.some(a => a.toLowerCase().includes(q));
    const matchesGenre = item.genres.some(g => g.toLowerCase().includes(q));
    return matchesTitle || matchesActor || matchesGenre;
  });

  const movies = filteredItems.filter(i => i.type === 'MOVIE');
  const series = filteredItems.filter(i => i.type === 'SERIES');
  
  // Extract unique actors matching query
  const matchingActors = Array.from(new Set(items.flatMap(i => i.actors))).filter(a => {
    return query && a.toLowerCase().includes(query.trim().toLowerCase());
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 select-none animate-in fade-in">
      
      {/* Top Search Input Row */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
        >
          <ArrowRight className="w-5 h-5" />
        </button>

        <div className="relative flex-1">
          <Search className="w-5 h-5 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="חיפוש סרטים, סדרות, שחקנים, ז׳אנרים (עברית ואנגלית)..."
            className="w-full bg-[#141414] border border-white/15 focus:border-[#E50914] rounded-2xl pr-12 pl-10 py-3.5 text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none transition-colors"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      {query && (
        <div className="flex items-center gap-2 border-b border-white/10 pb-3 overflow-x-auto text-xs sm:text-sm font-semibold">
          {[
            { id: 'all', label: 'הכל', count: filteredItems.length + matchingActors.length },
            { id: 'movies', label: 'סרטים', count: movies.length },
            { id: 'series', label: 'סדרות', count: series.length },
            { id: 'actors', label: 'שחקנים', count: matchingActors.length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id as any)}
              className={`py-1.5 px-3.5 rounded-xl transition-colors cursor-pointer ${
                selectedTab === tab.id
                  ? 'bg-[#E50914] text-white shadow-md'
                  : 'bg-white/5 text-slate-400 hover:text-white'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
      )}

      {/* Results or Empty State */}
      {!query ? (
        <div className="py-20 text-center text-slate-500 space-y-3">
          <Search className="w-16 h-16 mx-auto opacity-30" />
          <p className="text-sm">מצא כותרים, שחקנים, ז׳אנרים ושנות יציאה</p>
        </div>
      ) : filteredItems.length === 0 && matchingActors.length === 0 ? (
        <div className="py-20 text-center text-slate-400 space-y-2">
          <p className="text-base font-bold text-white">לא נמצאו תוצאות עבור "{query}"</p>
          <p className="text-xs text-slate-500">נסה לחפש במילים אחרות או באנגלית</p>
        </div>
      ) : (
        <div className="space-y-6">
          
          {/* Actors Row */}
          {(selectedTab === 'all' || selectedTab === 'actors') && matchingActors.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-white">שחקנים שנמצאו</h3>
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {matchingActors.map((actor) => (
                  <div
                    key={actor}
                    onClick={() => setQuery(actor)}
                    className="flex items-center gap-2 p-2 px-3.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 cursor-pointer text-xs text-white shrink-0"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#E50914]/30 flex items-center justify-center text-[#E50914]">
                      <User className="w-3.5 h-3.5" />
                    </div>
                    <span>{actor}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Media Items Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {(selectedTab === 'movies' ? movies : selectedTab === 'series' ? series : filteredItems).map((item) => (
              <div
                key={item.id}
                onClick={() => onMediaClick(item)}
                className="group bg-[#141414] hover:bg-[#1a1a1a] rounded-xl overflow-hidden border border-white/10 hover:border-[#E50914]/50 shadow-lg cursor-pointer transition-all duration-200 hover:-translate-y-1"
              >
                <div className="relative aspect-[2/3] bg-slate-900">
                  <img
                    src={item.posterUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 bg-black/70 text-[9px] font-bold text-white px-1.5 py-0.5 rounded">
                    {item.quality}
                  </div>
                  {item.rating && (
                    <div className="absolute top-2 left-2 bg-black/70 text-amber-400 text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                      <Star className="w-2.5 h-2.5 fill-amber-400" />
                      <span>{item.rating}</span>
                    </div>
                  )}
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

        </div>
      )}

    </div>
  );
};
