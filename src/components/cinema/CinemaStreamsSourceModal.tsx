import React, { useState } from 'react';
import { 
  X, 
  Play, 
  Download, 
  Layers, 
  Star, 
  Zap, 
  Filter, 
  ArrowUpDown, 
  Check 
} from 'lucide-react';
import { StremioStreamSource, MediaItem, Episode } from '../../types/cinema';
import { SAMPLE_STREMIO_SOURCES, CINEMA_RED } from '../../data/cinemaSeedData';

interface CinemaStreamsSourceModalProps {
  media: MediaItem | null;
  episode?: Episode | null;
  isOpen: boolean;
  onClose: () => void;
  onPlayStream: (stream: StremioStreamSource) => void;
  onDownloadStream: (stream: StremioStreamSource) => void;
}

export const CinemaStreamsSourceModal: React.FC<CinemaStreamsSourceModalProps> = ({
  media,
  episode,
  isOpen,
  onClose,
  onPlayStream,
  onDownloadStream
}) => {
  if (!isOpen || !media) return null;

  const [selectedQuality, setSelectedQuality] = useState('all');
  const [selectedSort, setSelectedSort] = useState<'seeders' | 'size'>('seeders');

  const titleText = episode 
    ? `${media.title} • עונה ${episode.seasonNumber} פרק ${episode.episodeNumber}`
    : media.title;

  const sources = SAMPLE_STREMIO_SOURCES;

  const filteredSources = sources.filter((s) => {
    if (selectedQuality === 'all') return true;
    return s.quality.toLowerCase().includes(selectedQuality.toLowerCase());
  }).sort((a, b) => {
    if (selectedSort === 'seeders') {
      return b.seeders - a.seeders;
    }
    return parseFloat(b.sizeFormatted) - parseFloat(a.sizeFormatted);
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md select-none animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-[#141414] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col text-right">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#E50914]/20 text-[#E50914] border border-[#E50914]/30">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">מקורות ותוספי Stremio</h3>
              <p className="text-xs text-slate-400 truncate max-w-xs sm:max-w-md">{titleText}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Filter and Sort Toolbar */}
        <div className="p-3 bg-black/40 border-b border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs">
          
          {/* Quality Chips */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 text-[11px] ml-1">איכות:</span>
            {['all', '4K', '1080p', '720p'].map((q) => (
              <button
                key={q}
                onClick={() => setSelectedQuality(q)}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                  selectedQuality === q
                    ? 'bg-[#E50914] text-white'
                    : 'bg-white/5 text-slate-400 hover:text-white'
                }`}
              >
                {q === 'all' ? 'הכל' : q}
              </button>
            ))}
          </div>

          {/* Sort Switcher */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 text-[11px] ml-1">מיון:</span>
            <button
              onClick={() => setSelectedSort('seeders')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                selectedSort === 'seeders'
                  ? 'bg-white/20 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              לפי סידרים 👤
            </button>
            <button
              onClick={() => setSelectedSort('size')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                selectedSort === 'size'
                  ? 'bg-white/20 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              לפי גודל 💾
            </button>
          </div>

        </div>

        {/* Streams List */}
        <div className="p-4 overflow-y-auto space-y-3 max-h-[60vh] scrollbar-thin scrollbar-thumb-white/20">
          {filteredSources.map((stream) => (
            <div
              key={stream.id}
              onClick={() => {
                onPlayStream(stream);
                onClose();
              }}
              className="group p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-[#E50914]/40 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-1.5 flex-1 min-w-0">
                {/* Badges row */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded shadow ${
                    stream.quality.includes('4K') ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-[#E50914] text-white'
                  }`}>
                    {stream.quality}
                  </span>

                  <span className="bg-sky-500/20 text-sky-300 text-[10px] font-bold px-2 py-0.5 rounded border border-sky-500/30">
                    {stream.provider}
                  </span>

                  {stream.isDebrid && (
                    <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-500/30 flex items-center gap-0.5">
                      <Zap className="w-2.5 h-2.5 fill-emerald-300" />
                      <span>Debrid Fast</span>
                    </span>
                  )}

                  <span className="text-[10px] text-slate-400">
                    {stream.addonName}
                  </span>
                </div>

                {/* Release title */}
                <div className="text-xs sm:text-sm font-bold text-white truncate font-mono text-left" dir="ltr">
                  {stream.releaseTitle}
                </div>

                {/* Meta details */}
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span className="text-emerald-400 font-medium">👤 {stream.seeders} סידרים</span>
                  <span>•</span>
                  <span>💾 {stream.sizeFormatted}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDownloadStream(stream);
                    onClose();
                  }}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  title="הורד זרם זה"
                >
                  <Download className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    onPlayStream(stream);
                    onClose();
                  }}
                  className="py-2 px-4 rounded-xl bg-[#E50914] hover:bg-[#b81d24] text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-[#E50914]/30 transition-transform active:scale-95 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>נגן</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
