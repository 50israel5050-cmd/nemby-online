import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Volume2, 
  VolumeX, 
  Repeat, 
  Shuffle, 
  FolderOpen, 
  Music, 
  FileAudio, 
  Sliders, 
  Maximize2, 
  Minimize2, 
  Sparkles, 
  Keyboard, 
  ListMusic, 
  Check, 
  HardDrive
} from 'lucide-react';

interface Track {
  id: string;
  title: string;
  artist: string;
  src: string;
  duration: number; // in seconds
  isCustom?: boolean;
}

const DEFAULT_TRACKS: Track[] = [
  {
    id: '1',
    title: 'Electronic Synth Beats',
    artist: 'Desktop Audio Engine',
    // royalty-free short synth loop
    src: 'https://cdn.freesound.org/previews/250/250552_4588590-lq.mp3',
    duration: 16
  },
  {
    id: '2',
    title: 'Acoustic Melody & Guitar',
    artist: 'Acoustic Studio Lab',
    src: 'https://cdn.freesound.org/previews/320/320655_5260872-lq.mp3',
    duration: 20
  },
  {
    id: '3',
    title: 'Ambient Chill Meditation',
    artist: 'Peaceful Soundscapes',
    src: 'https://cdn.freesound.org/previews/243/243700_4284968-lq.mp3',
    duration: 32
  }
];

export const DesktopMediaPlayer: React.FC = () => {
  const [tracks, setTracks] = useState<Track[]>(DEFAULT_TRACKS);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameId = useRef<number | null>(null);

  const currentTrack = tracks[currentTrackIndex] || tracks[0];

  // Set up MediaSession API for desktop keyboard media keys (Play/Pause, Prev, Next)
  useEffect(() => {
    if ('mediaSession' in navigator && currentTrack) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentTrack.title,
        artist: currentTrack.artist,
        album: 'Desktop Player Pro'
      });

      navigator.mediaSession.setActionHandler('play', () => handlePlay());
      navigator.mediaSession.setActionHandler('pause', () => handlePause());
      navigator.mediaSession.setActionHandler('previoustrack', () => handlePrev());
      navigator.mediaSession.setActionHandler('nexttrack', () => handleNext());
    }
  }, [currentTrackIndex, tracks]);

  // Keyboard shortcut listener for PC desktop experience
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input/textarea
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.code === 'Space') {
        e.preventDefault();
        togglePlayPause();
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        seekRelative(5);
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        seekRelative(-5);
      } else if (e.code === 'ArrowUp') {
        e.preventDefault();
        setVolume(prev => Math.min(1, prev + 0.05));
      } else if (e.code === 'ArrowDown') {
        e.preventDefault();
        setVolume(prev => Math.max(0, prev - 0.05));
      } else if (e.code === 'KeyM') {
        setIsMuted(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, volume]);

  // Audio element event bindings
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = isMuted ? 0 : volume;
    audio.playbackRate = playbackRate;
    audio.loop = isLooping;
  }, [volume, isMuted, playbackRate, isLooping]);

  // Canvas visualizer simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let phase = 0;
    const barCount = 32;

    const renderBars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;
      const barWidth = width / barCount - 2;

      for (let i = 0; i < barCount; i++) {
        let barHeight = 6;
        if (isPlaying) {
          // Dynamic wave based on sine and random fluctuations
          const freq = Math.sin(phase + i * 0.3) * 0.5 + 0.5;
          const energy = Math.cos(phase * 1.5 + i * 0.2) * 0.3 + 0.7;
          barHeight = Math.max(4, freq * energy * (height - 10) * volume);
        }

        const gradient = ctx.createLinearGradient(0, height, 0, 0);
        gradient.addColorStop(0, '#6366f1');
        gradient.addColorStop(0.7, '#818cf8');
        gradient.addColorStop(1, '#a855f7');

        ctx.fillStyle = gradient;
        ctx.fillRect(i * (barWidth + 2), height - barHeight, barWidth, barHeight);
      }

      if (isPlaying) {
        phase += 0.12;
      }
      animationFrameId.current = requestAnimationFrame(renderBars);
    };

    renderBars();

    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [isPlaying, volume]);

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  };

  const handlePlay = () => {
    if (!audioRef.current) return;
    audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
  };

  const handlePause = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const handleNext = () => {
    if (isShuffle) {
      const randomIndex = Math.floor(Math.random() * tracks.length);
      setCurrentTrackIndex(randomIndex);
    } else {
      setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
    }
    setCurrentTime(0);
    setTimeout(() => handlePlay(), 100);
  };

  const handlePrev = () => {
    if (currentTime > 3) {
      if (audioRef.current) audioRef.current.currentTime = 0;
      setCurrentTime(0);
    } else {
      setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
      setCurrentTime(0);
      setTimeout(() => handlePlay(), 100);
    }
  };

  const seekRelative = (seconds: number) => {
    if (!audioRef.current) return;
    const newTime = Math.max(0, Math.min(duration, audioRef.current.currentTime + seconds));
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setCurrentTime(val);
    if (audioRef.current) {
      audioRef.current.currentTime = val;
    }
  };

  // Local File Loading (Playing files directly from the PC disk)
  const handleLocalFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newTracks: Track[] = Array.from(files).map((file, idx) => ({
      id: `local-${Date.now()}-${idx}`,
      title: file.name.replace(/\.[^/.]+$/, ""),
      artist: 'קובץ מקומי מהמחשב',
      src: URL.createObjectURL(file),
      duration: 0,
      isCustom: true
    }));

    setTracks(prev => [...newTracks, ...prev]);
    setCurrentTrackIndex(0);
    setTimeout(() => handlePlay(), 200);
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '00:00';
    const mins = Math.floor(secs / 60);
    const remainingSecs = Math.floor(secs % 60);
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
      
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={currentTrack?.src}
        onTimeUpdate={() => {
          if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
          }
        }}
        onLoadedMetadata={() => {
          if (audioRef.current) {
            setDuration(audioRef.current.duration);
          }
        }}
        onEnded={handleNext}
      />

      {/* Desktop Window Title Bar */}
      <div className="bg-slate-950/80 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between select-none">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-rose-500/80"></span>
          <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
          <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
          <span className="text-xs text-slate-400 font-mono mr-2 pr-2 border-r border-slate-800 flex items-center gap-1.5">
            <Music className="w-3.5 h-3.5 text-indigo-400" />
            <span>Desktop Player Pro v2.4 (תחליף ExoPlayer/MediaPlayer מלא למחשב)</span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowShortcuts(!showShortcuts)}
            className="text-[11px] text-slate-400 hover:text-indigo-300 flex items-center gap-1 transition-colors"
            title="קיצורי מקלדת שולחניים"
          >
            <Keyboard className="w-3.5 h-3.5" />
            <span>קיצורי מקלדת במחשב</span>
          </button>
        </div>
      </div>

      {/* Keyboard Shortcuts Hint Bar (Toggled) */}
      {showShortcuts && (
        <div className="bg-indigo-950/40 border-b border-indigo-900/60 p-3 text-xs text-indigo-200 flex flex-wrap items-center justify-around gap-2 animate-in fade-in">
          <span><kbd className="bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700 text-white font-mono text-[10px]">רווח</kbd> הפעל / השהה</span>
          <span><kbd className="bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700 text-white font-mono text-[10px]">חצים ימינה/שמאלה</kbd> קפיצה ±5 שניות</span>
          <span><kbd className="bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700 text-white font-mono text-[10px]">חצים מעלה/מטה</kbd> שינוי עוצמת שמע</span>
          <span><kbd className="bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700 text-white font-mono text-[10px]">M</kbd> השתקה</span>
        </div>
      )}

      {/* Main Player Body */}
      <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Album Art & Visualizer */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-5 rounded-2xl bg-gradient-to-b from-slate-800/60 to-slate-950 border border-slate-800 relative overflow-hidden group">
          
          <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 shadow-2xl flex items-center justify-center relative mb-4 ring-4 ring-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
            <Music className="w-16 h-16 text-white/90 animate-pulse" />
            {isPlaying && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-emerald-400 ring-4 ring-slate-900 animate-ping"></span>
            )}
          </div>

          <h3 className="text-base sm:text-lg font-bold text-white text-center truncate max-w-full">
            {currentTrack.title}
          </h3>
          <p className="text-xs text-indigo-300 font-medium text-center mt-1">
            {currentTrack.artist}
          </p>

          {/* Real-time Simulated Audio Waveform Visualizer */}
          <div className="w-full mt-4 h-14 bg-slate-950/80 rounded-xl p-2 border border-slate-800 flex items-center justify-center">
            <canvas ref={canvasRef} width={280} height={40} className="w-full h-full" />
          </div>

          {/* Local Disk Import Button */}
          <label className="mt-4 w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all">
            <FolderOpen className="w-4 h-4 text-amber-400" />
            <span>טען קבצי שמע מהמחשב שלך (MP3/WAV)</span>
            <input
              type="file"
              accept="audio/*"
              multiple
              onChange={handleLocalFileSelect}
              className="hidden"
            />
          </label>
        </div>

        {/* Right Side: Controls & Playlist */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          
          {/* Progress / Timeline Bar */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            <input
              type="range"
              min={0}
              max={duration || 100}
              step={0.1}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
          </div>

          {/* Main Playback Buttons */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setIsShuffle(!isShuffle)}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${isShuffle ? 'text-indigo-400 bg-indigo-500/10' : 'text-slate-400 hover:text-slate-200'}`}
              title="ערבב רצועות"
            >
              <Shuffle className="w-4 h-4" />
            </button>

            <button
              onClick={handlePrev}
              className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 text-white transition-all active:scale-95 cursor-pointer shadow-md"
              title="רצועה קודמת / 5 שניות אחורה"
            >
              <SkipBack className="w-5 h-5" />
            </button>

            <button
              onClick={togglePlayPause}
              className="p-4 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 translate-x-0.5" />}
            </button>

            <button
              onClick={handleNext}
              className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 text-white transition-all active:scale-95 cursor-pointer shadow-md"
              title="רצועה הבאה"
            >
              <SkipForward className="w-5 h-5" />
            </button>

            <button
              onClick={() => setIsLooping(!isLooping)}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${isLooping ? 'text-indigo-400 bg-indigo-500/10' : 'text-slate-400 hover:text-slate-200'}`}
              title="חזרה בלולאה"
            >
              <Repeat className="w-4 h-4" />
            </button>
          </div>

          {/* Volume and Playback Speed Controls */}
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
            
            {/* Volume */}
            <div className="flex items-center gap-2 flex-1 min-w-[150px]">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                {isMuted || volume === 0 ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  setVolume(parseFloat(e.target.value));
                  setIsMuted(false);
                }}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
              <span className="text-[11px] font-mono text-slate-400 w-8">
                {isMuted ? '0%' : `${Math.round(volume * 100)}%`}
              </span>
            </div>

            {/* Speed Selector */}
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <span className="text-[11px]">מהירות:</span>
              {[0.75, 1, 1.25, 1.5, 2].map(speed => (
                <button
                  key={speed}
                  onClick={() => setPlaybackRate(speed)}
                  className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors cursor-pointer ${
                    playbackRate === speed
                      ? 'bg-indigo-600 text-white font-bold'
                      : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {speed}x
                </button>
              ))}
            </div>

          </div>

          {/* Playlist Queue */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
              <span className="flex items-center gap-1.5">
                <ListMusic className="w-4 h-4 text-indigo-400" />
                רשימת רצועות בנגן ({tracks.length})
              </span>
              <span className="text-[11px] text-slate-500 font-normal">לחץ לבחירת שיר</span>
            </div>

            <div className="max-h-36 overflow-y-auto space-y-1.5 pr-1">
              {tracks.map((track, idx) => (
                <div
                  key={track.id}
                  onClick={() => {
                    setCurrentTrackIndex(idx);
                    setCurrentTime(0);
                    setTimeout(() => handlePlay(), 100);
                  }}
                  className={`p-2.5 rounded-xl border flex items-center justify-between gap-3 text-xs cursor-pointer transition-all ${
                    currentTrackIndex === idx
                      ? 'bg-indigo-600/20 border-indigo-500 text-white font-semibold'
                      : 'bg-slate-800/40 border-slate-700/50 text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="font-mono text-[11px] text-slate-500 w-4">
                      {idx + 1}
                    </span>
                    <span className="truncate">{track.title}</span>
                    {track.isCustom && (
                      <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1.5 py-0.2 rounded shrink-0">
                        קובץ מקומי
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {currentTrackIndex === idx && isPlaying && (
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    )}
                    <span className="text-[11px] text-slate-400 font-mono">
                      {track.duration ? formatTime(track.duration) : '--:--'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Comparison with Android ExoPlayer */}
      <div className="p-4 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span><b>הסבה מלאה מ-ExoPlayer / MediaPlayer של אנדרואיד:</b> מקבל פקודות MediaSession, שליטה בקיצורי מקלדת, ניגון קבצים מקומיים ורשת.</span>
        </div>
      </div>

    </div>
  );
};
