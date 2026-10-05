import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  RotateCw, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize, 
  Settings, 
  Subtitles, 
  ArrowRight, 
  PictureInPicture, 
  Check, 
  Sparkles, 
  Wifi, 
  HardDrive 
} from 'lucide-react';
import { StremioStreamSource, SubtitleCue } from '../../types/cinema';
import { CINEMA_RED } from '../../data/cinemaSeedData';

interface CinemaVideoPlayerProps {
  videoUrl: string;
  title: string;
  quality: string;
  initialPositionMs?: number;
  availableStreams?: StremioStreamSource[];
  onClose: () => void;
  onMinimize?: (currentPosMs: number) => void;
  onProgressUpdate?: (posMs: number, durMs: number) => void;
}

export const CinemaVideoPlayer: React.FC<CinemaVideoPlayerProps> = ({
  videoUrl,
  title,
  quality,
  initialPositionMs = 0,
  availableStreams = [],
  onClose,
  onMinimize,
  onProgressUpdate
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(initialPositionMs / 1000);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isBuffering, setIsBuffering] = useState(false);

  // Settings dropdowns
  const [showSettings, setShowSettings] = useState(false);
  const [showSubtitlesMenu, setShowSubtitlesMenu] = useState(false);
  const [activeSubtitle, setActiveSubtitle] = useState<'off' | 'hebrew' | 'english'>('hebrew');
  const [subtitleOffsetSec, setSubtitleOffsetSec] = useState(0);
  const [currentQuality, setCurrentQuality] = useState(quality || '1080p FHD');

  // Sample simulated subtitles
  const sampleHebrewCues = [
    { start: 1, end: 5, text: 'שלום וברוכים הבאים ל-CinemaStream בגרסת המחשב!' },
    { start: 6, end: 11, text: 'הווידאו מתנגן באיכות הגבוהה ביותר עם סאונד נקי.' },
    { start: 12, end: 18, text: 'ניתן לשלוט בכל הפעולות באמצעות מקלדת המחשב: מקש רווח, חצים ו-F.' },
    { start: 19, end: 26, text: 'סנכרון הכתוביות והמקורות פועלים בזמן אמת בדיוק כמו בגרסת האנדרואיד.' }
  ];

  // Auto-hide controls timer
  useEffect(() => {
    let timeout: any;
    if (showControls && isPlaying) {
      timeout = setTimeout(() => setShowControls(false), 3500);
    }
    return () => clearTimeout(timeout);
  }, [showControls, isPlaying]);

  // Keyboard Shortcuts for Desktop PC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.code === 'Space') {
        e.preventDefault();
        togglePlayPause();
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        seekRelative(10);
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        seekRelative(-10);
      } else if (e.code === 'ArrowUp') {
        e.preventDefault();
        setVolume((v) => Math.min(1, v + 0.05));
      } else if (e.code === 'ArrowDown') {
        e.preventDefault();
        setVolume((v) => Math.max(0, v - 0.05));
      } else if (e.code === 'KeyM') {
        setIsMuted((m) => !m);
      } else if (e.code === 'KeyF') {
        toggleFullscreen();
      } else if (e.code === 'Escape') {
        if (isFullscreen) {
          document.exitFullscreen().catch(() => {});
        } else {
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, volume, isFullscreen]);

  // Video properties sync
  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.volume = isMuted ? 0 : volume;
    videoRef.current.playbackRate = playbackSpeed;
  }, [volume, isMuted, playbackSpeed]);

  const togglePlayPause = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const seekRelative = (sec: number) => {
    if (!videoRef.current) return;
    const target = Math.max(0, Math.min(duration, videoRef.current.currentTime + sec));
    videoRef.current.currentTime = target;
    setCurrentTime(target);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '00:00';
    const hrs = Math.floor(secs / 3600);
    const mins = Math.floor((secs % 3600) / 60);
    const remainingSecs = Math.floor(secs % 60);
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  // Find active subtitle
  const effectiveSubTime = currentTime + subtitleOffsetSec;
  const activeCue = activeSubtitle === 'hebrew' 
    ? sampleHebrewCues.find(c => effectiveSubTime >= c.start && effectiveSubTime <= c.end)
    : null;

  return (
    <div
      ref={containerRef}
      onMouseMove={() => setShowControls(true)}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center select-none overflow-hidden"
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={videoUrl}
        autoPlay
        playsInline
        onWaiting={() => setIsBuffering(true)}
        onPlaying={() => setIsBuffering(false)}
        onTimeUpdate={() => {
          if (videoRef.current) {
            const cur = videoRef.current.currentTime;
            setCurrentTime(cur);
            if (onProgressUpdate) onProgressUpdate(cur * 1000, duration * 1000);
          }
        }}
        onLoadedMetadata={() => {
          if (videoRef.current) {
            setDuration(videoRef.current.duration);
            if (initialPositionMs > 0) {
              videoRef.current.currentTime = initialPositionMs / 1000;
            }
          }
        }}
        onClick={togglePlayPause}
        className="w-full h-full object-contain cursor-pointer"
      />

      {/* Real-time Subtitle Display */}
      {activeCue && (
        <div className="absolute bottom-20 inset-x-4 flex justify-center pointer-events-none z-30">
          <div className="bg-black/80 text-yellow-300 text-sm sm:text-base md:text-lg font-bold px-4 py-2 rounded-xl text-center shadow-2xl backdrop-blur-sm max-w-2xl leading-relaxed border border-black/40">
            {activeCue.text}
          </div>
        </div>
      )}

      {/* Buffering Spinner */}
      {isBuffering && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-20 pointer-events-none">
          <div className="w-12 h-12 rounded-full border-4 border-[#E50914] border-t-transparent animate-spin"></div>
        </div>
      )}

      {/* Torrent Streaming HUD Status Banner */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
        <div className="bg-[#141414]/90 backdrop-blur-md border border-white/10 px-3.5 py-1.5 rounded-full flex items-center gap-2.5 text-xs shadow-xl">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-bold text-white font-mono">{currentQuality}</span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-300 font-mono">1.8 MB/s</span>
          <span className="text-slate-500">•</span>
          <span className="text-emerald-400 font-mono">👤 1,420 סידרים</span>
        </div>
      </div>

      {/* Custom Player Controls Overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/70 flex flex-col justify-between p-4 sm:p-6 transition-opacity duration-300 ${
          showControls ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Top Controls Bar: Back & Title & Minimize */}
        <div className="flex items-center justify-between z-40">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer"
              title="סגור נגן"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
            <h2 className="text-sm sm:text-base md:text-lg font-bold text-white drop-shadow truncate max-w-md">
              {title}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {onMinimize && (
              <button
                onClick={() => onMinimize(currentTime * 1000)}
                className="w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer"
                title="מזער נגן לתוך האפליקציה"
              >
                <PictureInPicture className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Center Controls: Seek 10s back, Play/Pause, Seek 10s forward */}
        <div className="flex items-center justify-center gap-6 sm:gap-10 z-40">
          <button
            onClick={() => seekRelative(-10)}
            className="w-12 h-12 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-transform hover:scale-110 active:scale-95 cursor-pointer"
            title="10 שניות אחורה (חץ שמאלה)"
          >
            <RotateCcw className="w-6 h-6" />
          </button>

          <button
            onClick={togglePlayPause}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#E50914] hover:bg-[#b81d24] text-white flex items-center justify-center shadow-2xl shadow-[#E50914]/50 transition-transform hover:scale-110 active:scale-95 cursor-pointer"
            title="הפעל / השהה (מקש רווח)"
          >
            {isPlaying ? (
              <Pause className="w-8 h-8 sm:w-10 sm:h-10 fill-white" />
            ) : (
              <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-white translate-x-1" />
            )}
          </button>

          <button
            onClick={() => seekRelative(10)}
            className="w-12 h-12 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-transform hover:scale-110 active:scale-95 cursor-pointer"
            title="10 שניות קדימה (חץ ימינה)"
          >
            <RotateCw className="w-6 h-6" />
          </button>
        </div>

        {/* Bottom Controls Bar: Timeline, Time, Settings & Fullscreen */}
        <div className="space-y-2 z-40">
          
          {/* Progress Slider */}
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={0}
              max={duration || 100}
              step={0.5}
              value={currentTime}
              onChange={(e) => {
                const target = parseFloat(e.target.value);
                setCurrentTime(target);
                if (videoRef.current) videoRef.current.currentTime = target;
              }}
              className="w-full h-1.5 hover:h-2.5 bg-white/30 rounded-lg appearance-none cursor-pointer accent-[#E50914] transition-all"
            />
          </div>

          {/* Bottom actions row */}
          <div className="flex items-center justify-between text-xs text-white">
            
            {/* Time Indicator & Volume */}
            <div className="flex items-center gap-4">
              <span className="font-mono text-slate-300">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>

              {/* Volume Slider */}
              <div className="hidden sm:flex items-center gap-2">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-4 h-4 text-rose-400" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={isMuted ? 0 : volume}
                  onChange={(e) => {
                    setVolume(parseFloat(e.target.value));
                    setIsMuted(false);
                  }}
                  className="w-16 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer accent-[#E50914]"
                />
              </div>
            </div>

            {/* Right Controls: Subtitles, Settings, Fullscreen */}
            <div className="flex items-center gap-3 relative">
              
              {/* Subtitles Button & Popover */}
              <div className="relative">
                <button
                  onClick={() => setShowSubtitlesMenu(!showSubtitlesMenu)}
                  className={`p-2 rounded-lg transition-colors cursor-pointer ${
                    activeSubtitle !== 'off' ? 'bg-[#E50914] text-white' : 'bg-black/50 text-slate-300 hover:text-white'
                  }`}
                  title="כתוביות וסנכרון"
                >
                  <Subtitles className="w-4 h-4" />
                </button>

                {showSubtitlesMenu && (
                  <div className="absolute bottom-12 left-0 w-56 bg-[#141414] border border-white/10 rounded-xl p-3 shadow-2xl text-right space-y-2.5 z-50">
                    <div className="text-xs font-bold text-white pb-1 border-b border-white/10">כתוביות</div>
                    
                    <button
                      onClick={() => {
                        setActiveSubtitle('hebrew');
                        setShowSubtitlesMenu(false);
                      }}
                      className={`w-full py-1 px-2 rounded text-xs flex items-center justify-between cursor-pointer ${
                        activeSubtitle === 'hebrew' ? 'bg-[#E50914]/20 text-[#E50914] font-bold' : 'text-slate-300 hover:bg-white/5'
                      }`}
                    >
                      <span>עברית (OpenSubtitles)</span>
                      {activeSubtitle === 'hebrew' && <Check className="w-3.5 h-3.5" />}
                    </button>

                    <button
                      onClick={() => {
                        setActiveSubtitle('off');
                        setShowSubtitlesMenu(false);
                      }}
                      className={`w-full py-1 px-2 rounded text-xs flex items-center justify-between cursor-pointer ${
                        activeSubtitle === 'off' ? 'bg-[#E50914]/20 text-[#E50914] font-bold' : 'text-slate-300 hover:bg-white/5'
                      }`}
                    >
                      <span>כבוי</span>
                      {activeSubtitle === 'off' && <Check className="w-3.5 h-3.5" />}
                    </button>

                    {/* Subtitle Sync offset */}
                    <div className="pt-2 border-t border-white/10">
                      <div className="text-[11px] text-slate-400 mb-1">סנכרון זמנים ({subtitleOffsetSec.toFixed(1)}s)</div>
                      <div className="grid grid-cols-3 gap-1">
                        <button
                          onClick={() => setSubtitleOffsetSec((s) => s - 0.5)}
                          className="py-1 bg-white/10 hover:bg-white/20 rounded text-[10px] text-white"
                        >
                          -0.5s
                        </button>
                        <button
                          onClick={() => setSubtitleOffsetSec(0)}
                          className="py-1 bg-white/10 hover:bg-white/20 rounded text-[10px] text-white"
                        >
                          איפוס
                        </button>
                        <button
                          onClick={() => setSubtitleOffsetSec((s) => s + 0.5)}
                          className="py-1 bg-white/10 hover:bg-white/20 rounded text-[10px] text-white"
                        >
                          +0.5s
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Settings / Speed Button & Popover */}
              <div className="relative">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="p-2 rounded-lg bg-black/50 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  title="הגדרות נגן ומהירות"
                >
                  <Settings className="w-4 h-4" />
                </button>

                {showSettings && (
                  <div className="absolute bottom-12 left-0 w-48 bg-[#141414] border border-white/10 rounded-xl p-3 shadow-2xl text-right space-y-2 z-50">
                    <div className="text-xs font-bold text-white pb-1 border-b border-white/10">מהירות שידור</div>
                    <div className="grid grid-cols-4 gap-1">
                      {[0.75, 1, 1.25, 1.5].map((spd) => (
                        <button
                          key={spd}
                          onClick={() => {
                            setPlaybackSpeed(spd);
                            setShowSettings(false);
                          }}
                          className={`py-1 rounded text-xs font-mono cursor-pointer ${
                            playbackSpeed === spd ? 'bg-[#E50914] text-white font-bold' : 'bg-white/5 text-slate-300'
                          }`}
                        >
                          {spd}x
                        </button>
                      ))}
                    </div>

                    <div className="text-xs font-bold text-white pt-2 border-t border-white/10">איכות זרם</div>
                    <div className="text-[11px] text-emerald-400 font-mono font-semibold">
                      {currentQuality} (אוטומטי 1080p)
                    </div>
                  </div>
                )}
              </div>

              {/* Fullscreen Toggle */}
              <button
                onClick={toggleFullscreen}
                className="p-2 rounded-lg bg-black/50 text-slate-300 hover:text-white transition-colors cursor-pointer"
                title="מסך מלא (מקש F)"
              >
                {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
              </button>

            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
