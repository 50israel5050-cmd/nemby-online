import React from 'react';
import { Download, ArrowRight, Play, Trash2, CheckCircle2 } from 'lucide-react';
import { DownloadItem } from '../../types/cinema';
import { CINEMA_RED } from '../../data/cinemaSeedData';

interface CinemaDownloadsScreenProps {
  downloads: DownloadItem[];
  onPlayOffline: (item: DownloadItem) => void;
  onDeleteDownload: (item: DownloadItem) => void;
  onBack: () => void;
}

export const CinemaDownloadsScreen: React.FC<CinemaDownloadsScreenProps> = ({
  downloads,
  onPlayOffline,
  onDeleteDownload,
  onBack
}) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 select-none animate-in fade-in">
      
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-white/10">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <Download className="w-6 h-6 text-[#E50914]" />
            <span>הורדות לצפייה ללא אינטרנט</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            {downloads.length} קבצי וידאו שמורים מקומית במחשב שלך
          </p>
        </div>
      </div>

      {/* Downloads List */}
      {downloads.length === 0 ? (
        <div className="py-24 text-center text-slate-500 space-y-3">
          <Download className="w-16 h-16 mx-auto opacity-30 text-[#E50914]" />
          <p className="text-base font-bold text-white">אין הורדות עדיין</p>
          <p className="text-xs text-slate-400">
            סרטים ופרקים שתוריד יופיעו כאן ויהיו זמינים לצפייה גם ללא חיבור לאינטרנט
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {downloads.map((item) => (
            <div
              key={item.id}
              className="p-3.5 rounded-xl bg-[#141414] border border-white/10 hover:border-white/20 transition-all flex items-center justify-between gap-4"
            >
              {/* Thumbnail & Title */}
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-14 h-20 rounded-lg overflow-hidden bg-slate-900 shrink-0 relative">
                  <img
                    src={item.posterUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-1 right-1 bg-black/80 rounded px-1 text-[8px] font-bold text-white">
                    {item.quality}
                  </div>
                </div>

                <div className="text-right truncate">
                  <h4 className="text-sm font-bold text-white truncate">{item.title}</h4>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                    <span className="text-emerald-400 font-semibold font-mono">
                      {(item.fileSizeBytes / (1024 * 1024)).toFixed(1)} MB
                    </span>
                    <span>•</span>
                    <span>{item.downloadDateFormatted}</span>
                  </div>
                  <div className="text-[10px] text-slate-500 truncate mt-0.5 font-mono">
                    {item.localFilePath}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => onPlayOffline(item)}
                  className="py-2 px-4 rounded-xl bg-[#E50914] hover:bg-[#b81d24] text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-[#E50914]/30 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>נגן</span>
                </button>

                <button
                  onClick={() => onDeleteDownload(item)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-white/10 transition-colors cursor-pointer"
                  title="מחק קובץ ופנה מקום"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};
