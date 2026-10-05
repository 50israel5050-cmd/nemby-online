import React, { useState, useEffect } from 'react';
import { 
  MediaItem, 
  MediaType, 
  Episode, 
  ContinueWatchingItem, 
  DownloadItem, 
  UserProfile, 
  StremioStreamSource, 
  MediaCategory 
} from './types/cinema';
import { 
  SEED_MEDIA_ITEMS, 
  DEFAULT_PROFILES, 
  SAMPLE_STREAM_HLS, 
  SAMPLE_STREMIO_SOURCES,
  CINEMA_RED 
} from './data/cinemaSeedData';
import { CinemaTopBar } from './components/cinema/CinemaTopBar';
import { CinemaNavigationDrawer } from './components/cinema/CinemaNavigationDrawer';
import { CinemaHeroBanner } from './components/cinema/CinemaHeroBanner';
import { CinemaContinueWatching } from './components/cinema/CinemaContinueWatching';
import { CinemaCategoryCarousel } from './components/cinema/CinemaCategoryCarousel';
import { CinemaMediaDetailModal } from './components/cinema/CinemaMediaDetailModal';
import { CinemaSeriesDetailView } from './components/cinema/CinemaSeriesDetailView';
import { CinemaVideoPlayer } from './components/cinema/CinemaVideoPlayer';
import { CinemaStreamsSourceModal } from './components/cinema/CinemaStreamsSourceModal';
import { CinemaSearchScreen } from './components/cinema/CinemaSearchScreen';
import { CinemaFavoritesScreen } from './components/cinema/CinemaFavoritesScreen';
import { CinemaDownloadsScreen } from './components/cinema/CinemaDownloadsScreen';
import { CinemaCatalogsScreen } from './components/cinema/CinemaCatalogsScreen';
import { CinemaSettingsScreen } from './components/cinema/CinemaSettingsScreen';
import { CinemaMiniPlayer } from './components/cinema/CinemaMiniPlayer';
import confetti from 'canvas-confetti';
import { Check, Download, Info, Play, Sparkles } from 'lucide-react';

export default function App() {
  // Navigation Screens State
  const [currentScreen, setCurrentScreen] = useState<
    'home' | 'search' | 'favorites' | 'downloads' | 'catalogs' | 'settings' | 'series_detail'
  >('home');
  const [screenStack, setScreenStack] = useState<string[]>([]);

  // Selected items & Modals
  const [selectedSeries, setSelectedSeries] = useState<MediaItem | null>(null);
  const [selectedMediaForDetail, setSelectedMediaForDetail] = useState<MediaItem | null>(null);
  const [selectedStreamModalMedia, setSelectedStreamModalMedia] = useState<{
    media: MediaItem;
    episode?: Episode | null;
  } | null>(null);

  // Active Player state
  const [activePlayer, setActivePlayer] = useState<{
    isOpen: boolean;
    streamUrl: string;
    title: string;
    quality: string;
    mediaItem?: MediaItem;
    initialPositionMs?: number;
  }>({
    isOpen: false,
    streamUrl: '',
    title: '',
    quality: '1080p FHD'
  });

  // Mini-Player state
  const [miniPlayer, setMiniPlayer] = useState<{
    isOpen: boolean;
    title: string;
    mediaItem: MediaItem | null;
    currentPositionMs: number;
    durationMs: number;
    isPlaying: boolean;
    streamUrl: string;
    quality: string;
  } | null>(null);

  // Home filter tabs: All, Movies, Series
  const [homeTypeFilter, setHomeTypeFilter] = useState<'ALL' | 'MOVIE' | 'SERIES'>('ALL');

  // Drawer & Profiles
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeProfile, setActiveProfile] = useState<UserProfile>(DEFAULT_PROFILES[0]);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Favorites
  const [favorites, setFavorites] = useState<MediaItem[]>(() => {
    const saved = localStorage.getItem('cinemastream_favorites');
    return saved ? JSON.parse(saved) : [SEED_MEDIA_ITEMS[0], SEED_MEDIA_ITEMS[2], SEED_MEDIA_ITEMS[5]];
  });

  // Continue Watching
  const [continueWatching, setContinueWatching] = useState<ContinueWatchingItem[]>(() => {
    const saved = localStorage.getItem('cinemastream_continue_watching');
    return saved ? JSON.parse(saved) : [
      {
        id: 'cw_dune3',
        mediaItem: SEED_MEDIA_ITEMS[0],
        progressFraction: 0.65,
        positionMs: 6500000,
        durationMs: 10000000,
        streamUrl: SAMPLE_STREAM_HLS,
        quality: '4K UHD',
        lastWatchedTimestamp: Date.now()
      },
      {
        id: 'cw_friends',
        mediaItem: SEED_MEDIA_ITEMS[5],
        episodeTitle: 'עונה 1 • פרק 1',
        progressFraction: 0.4,
        positionMs: 520000,
        durationMs: 1300000,
        streamUrl: SAMPLE_STREAM_HLS,
        quality: '1080p FHD',
        lastWatchedTimestamp: Date.now() - 3600000
      }
    ];
  });

  // Downloads
  const [downloads, setDownloads] = useState<DownloadItem[]>(() => {
    const saved = localStorage.getItem('cinemastream_downloads');
    return saved ? JSON.parse(saved) : [
      {
        id: 'dl_dune3',
        mediaId: 'dune3',
        title: 'חולית: חלק שלישי (4K UHD)',
        fileName: 'dune3_4k_desktop.mp4',
        fileSizeBytes: 2450 * 1024 * 1024,
        downloadDateFormatted: '05/10/2026',
        localFilePath: 'C:\\CinemaStream\\Downloads\\dune3_4k_desktop.mp4',
        posterUrl: SEED_MEDIA_ITEMS[0].posterUrl,
        quality: '4K UHD'
      }
    ];
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('cinemastream_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('cinemastream_continue_watching', JSON.stringify(continueWatching));
  }, [continueWatching]);

  useEffect(() => {
    localStorage.setItem('cinemastream_downloads', JSON.stringify(downloads));
  }, [downloads]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const navigateTo = (screen: typeof currentScreen) => {
    if (screen !== currentScreen) {
      setScreenStack((prev) => [...prev, currentScreen]);
      setCurrentScreen(screen);
    }
  };

  const handleBack = () => {
    if (screenStack.length > 0) {
      const prev = screenStack[screenStack.length - 1];
      setScreenStack(screenStack.slice(0, -1));
      setCurrentScreen(prev as any);
    } else {
      setCurrentScreen('home');
    }
  };

  const handleMediaClick = (media: MediaItem) => {
    if (media.type === 'SERIES') {
      setSelectedSeries(media);
      navigateTo('series_detail');
    } else {
      setSelectedMediaForDetail(media);
    }
  };

  const handleStartPlay = (media: MediaItem, customStreamUrl?: string, customTitle?: string) => {
    setSelectedMediaForDetail(null);
    setMiniPlayer(null); // Close mini player if open
    setActivePlayer({
      isOpen: true,
      streamUrl: customStreamUrl || media.streamUrl || SAMPLE_STREAM_HLS,
      title: customTitle || media.title,
      quality: media.quality || '1080p FHD',
      mediaItem: media,
      initialPositionMs: 0
    });
    showToast(`מנגן כעת: ${customTitle || media.title}`);
  };

  const handleToggleFavorite = (media: MediaItem) => {
    const isFav = favorites.some((f) => f.id === media.id);
    if (isFav) {
      setFavorites(favorites.filter((f) => f.id !== media.id));
      showToast('הוסר מהמועדפים');
    } else {
      setFavorites([media, ...favorites]);
      showToast('נוסף למועדפים!');
      try {
        confetti({ particleCount: 35, spread: 60, origin: { y: 0.8 } });
      } catch {}
    }
  };

  const handleStartDownload = (media: MediaItem, qualityStr: string = '1080p') => {
    const newDownload: DownloadItem = {
      id: `dl_${media.id}_${Date.now()}`,
      mediaId: media.id,
      title: media.title,
      fileName: `${media.id}_${qualityStr}.mp4`,
      fileSizeBytes: Math.floor(1200 + Math.random() * 1800) * 1024 * 1024,
      downloadDateFormatted: new Date().toLocaleDateString('he-IL'),
      localFilePath: `C:\\CinemaStream\\Downloads\\${media.id}_${qualityStr}.mp4`,
      posterUrl: media.posterUrl,
      quality: qualityStr
    };
    setDownloads([newDownload, ...downloads]);
    showToast('ההורדה החלה ונשמרת בדיסק המחשב!');
  };

  // Categories derivation
  const categories: MediaCategory[] = [
    {
      id: 'recommended',
      title: 'מומלצים עבורך',
      items: SEED_MEDIA_ITEMS.filter((i) => homeTypeFilter === 'ALL' || i.type === homeTypeFilter)
    },
    {
      id: 'popular',
      title: 'פופולרי עכשיו',
      items: [...SEED_MEDIA_ITEMS].reverse().filter((i) => homeTypeFilter === 'ALL' || i.type === homeTypeFilter)
    },
    {
      id: 'sitcoms',
      title: 'קומדיות וסיטקומים אהובים',
      items: SEED_MEDIA_ITEMS.filter((i) => i.genres.includes('סיטקום') && (homeTypeFilter === 'ALL' || i.type === homeTypeFilter))
    },
    {
      id: 'scifi',
      title: 'מדע בדיוני ופנטזיה',
      items: SEED_MEDIA_ITEMS.filter((i) => i.genres.includes('מדע בדיוני') && (homeTypeFilter === 'ALL' || i.type === homeTypeFilter))
    },
    {
      id: 'thriller',
      title: 'מתח ומסתורין',
      items: SEED_MEDIA_ITEMS.filter((i) => i.genres.includes('מתח') && (homeTypeFilter === 'ALL' || i.type === homeTypeFilter))
    }
  ].filter(c => c.items.length > 0);

  const heroItems = SEED_MEDIA_ITEMS.slice(0, 4);

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-slate-100 flex flex-col font-['Assistant',sans-serif]">
      
      {/* Top Header Bar */}
      <CinemaTopBar
        onHomeClick={() => {
          setScreenStack([]);
          setCurrentScreen('home');
        }}
        onBackClick={handleBack}
        showBackButton={currentScreen !== 'home'}
        onFavoritesClick={() => navigateTo('favorites')}
        onSearchClick={() => navigateTo('search')}
        onMenuClick={() => setIsDrawerOpen(true)}
        favoritesCount={favorites.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-24">
        
        {/* HOME SCREEN */}
        {currentScreen === 'home' && (
          <div className="space-y-4">
            
            {/* Filter Tabs: הכל, סרטים, סדרות */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 select-none">
              <div className="flex items-center gap-2">
                {[
                  { id: 'ALL', label: 'הכל' },
                  { id: 'MOVIE', label: 'סרטים' },
                  { id: 'SERIES', label: 'סדרות' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setHomeTypeFilter(tab.id as any)}
                    className={`py-1.5 px-4 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      homeTypeFilter === tab.id
                        ? 'bg-[#E50914] text-white shadow-md'
                        : 'bg-white/10 text-slate-300 hover:text-white hover:bg-white/15'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Hero Carousel Banner */}
            <CinemaHeroBanner
              items={heroItems}
              onPlayClick={(item) => handleStartPlay(item)}
              onDetailClick={(item) => handleMediaClick(item)}
            />

            {/* Continue Watching Section */}
            <CinemaContinueWatching
              items={continueWatching}
              onItemClick={(cw) => handleStartPlay(cw.mediaItem, cw.streamUrl, cw.episodeTitle ? `${cw.mediaItem.title}: ${cw.episodeTitle}` : cw.mediaItem.title)}
              onRemoveItem={(item) => setContinueWatching(continueWatching.filter(i => i.id !== item.id))}
              onClearAll={() => setContinueWatching([])}
            />

            {/* Category Carousels */}
            {categories.map((cat) => (
              <CinemaCategoryCarousel
                key={cat.id}
                category={cat}
                onMediaClick={handleMediaClick}
                onShowAll={() => navigateTo('search')}
              />
            ))}

          </div>
        )}

        {/* SEARCH SCREEN */}
        {currentScreen === 'search' && (
          <CinemaSearchScreen
            items={SEED_MEDIA_ITEMS}
            onMediaClick={handleMediaClick}
            onBack={handleBack}
          />
        )}

        {/* FAVORITES SCREEN */}
        {currentScreen === 'favorites' && (
          <CinemaFavoritesScreen
            favoriteItems={favorites}
            favoriteActors={['טימותי שאלאמה', 'לאונרדו דיקפריו', 'זנדאיה', 'סטיב קארל']}
            onMediaClick={handleMediaClick}
            onRemoveFavorite={(item) => setFavorites(favorites.filter(f => f.id !== item.id))}
            onBack={handleBack}
          />
        )}

        {/* DOWNLOADS SCREEN */}
        {currentScreen === 'downloads' && (
          <CinemaDownloadsScreen
            downloads={downloads}
            onPlayOffline={(item) => {
              const matched = SEED_MEDIA_ITEMS.find(i => i.id === item.mediaId);
              handleStartPlay(matched || SEED_MEDIA_ITEMS[0], undefined, item.title);
            }}
            onDeleteDownload={(item) => setDownloads(downloads.filter(d => d.id !== item.id))}
            onBack={handleBack}
          />
        )}

        {/* CATALOGS SCREEN */}
        {currentScreen === 'catalogs' && (
          <CinemaCatalogsScreen
            onBack={handleBack}
            onOpenSettings={() => navigateTo('settings')}
          />
        )}

        {/* SETTINGS SCREEN */}
        {currentScreen === 'settings' && (
          <CinemaSettingsScreen
            onBack={handleBack}
          />
        )}

        {/* SERIES DETAIL VIEW */}
        {currentScreen === 'series_detail' && selectedSeries && (
          <CinemaSeriesDetailView
            series={selectedSeries}
            onBack={handleBack}
            isFavorite={favorites.some(f => f.id === selectedSeries.id)}
            onToggleFavorite={handleToggleFavorite}
            onPlayEpisode={(ep) => handleStartPlay(selectedSeries, ep.streamUrl, `${selectedSeries.title}: ${ep.title}`)}
            onEpisodeClick={(ep) => setSelectedStreamModalMedia({ media: selectedSeries, episode: ep })}
            onActorClick={(actor) => navigateTo('search')}
          />
        )}

      </main>

      {/* Floating In-App MiniPlayer */}
      {miniPlayer?.isOpen && (
        <CinemaMiniPlayer
          title={miniPlayer.title}
          mediaItem={miniPlayer.mediaItem}
          isPlaying={miniPlayer.isPlaying}
          currentPositionMs={miniPlayer.currentPositionMs}
          durationMs={miniPlayer.durationMs}
          onPlayPauseToggle={() => setMiniPlayer({ ...miniPlayer, isPlaying: !miniPlayer.isPlaying })}
          onExpand={() => {
            const mp = miniPlayer;
            setMiniPlayer(null);
            setActivePlayer({
              isOpen: true,
              streamUrl: mp.streamUrl,
              title: mp.title,
              quality: mp.quality,
              mediaItem: mp.mediaItem || undefined,
              initialPositionMs: mp.currentPositionMs
            });
          }}
          onClose={() => setMiniPlayer(null)}
        />
      )}

      {/* Media Detail Modal */}
      <CinemaMediaDetailModal
        media={selectedMediaForDetail}
        isOpen={!!selectedMediaForDetail}
        onClose={() => setSelectedMediaForDetail(null)}
        isFavorite={selectedMediaForDetail ? favorites.some(f => f.id === selectedMediaForDetail.id) : false}
        onToggleFavorite={handleToggleFavorite}
        onPlayClick={(media) => handleStartPlay(media)}
        onShowStreamsClick={(media) => {
          setSelectedStreamModalMedia({ media });
          setSelectedMediaForDetail(null);
        }}
        onDownloadClick={(media) => handleStartDownload(media)}
        onActorClick={(actor) => {
          setSelectedMediaForDetail(null);
          navigateTo('search');
        }}
      />

      {/* Stremio / Torrentio Streams Sources Modal */}
      <CinemaStreamsSourceModal
        media={selectedStreamModalMedia?.media || null}
        episode={selectedStreamModalMedia?.episode}
        isOpen={!!selectedStreamModalMedia}
        onClose={() => setSelectedStreamModalMedia(null)}
        onPlayStream={(stream) => {
          const media = selectedStreamModalMedia?.media;
          if (media) {
            handleStartPlay(media, stream.url, `${media.title} (${stream.provider})`);
          }
        }}
        onDownloadStream={(stream) => {
          const media = selectedStreamModalMedia?.media;
          if (media) {
            handleStartDownload(media, stream.quality);
          }
        }}
      />

      {/* Video Player (Full Screen Overlay) */}
      {activePlayer.isOpen && (
        <CinemaVideoPlayer
          videoUrl={activePlayer.streamUrl}
          title={activePlayer.title}
          quality={activePlayer.quality}
          initialPositionMs={activePlayer.initialPositionMs}
          availableStreams={SAMPLE_STREMIO_SOURCES}
          onClose={() => setActivePlayer({ ...activePlayer, isOpen: false })}
          onMinimize={(curPosMs) => {
            setActivePlayer({ ...activePlayer, isOpen: false });
            setMiniPlayer({
              isOpen: true,
              title: activePlayer.title,
              mediaItem: activePlayer.mediaItem || null,
              currentPositionMs: curPosMs,
              durationMs: 120 * 60 * 1000,
              isPlaying: true,
              streamUrl: activePlayer.streamUrl,
              quality: activePlayer.quality
            });
          }}
          onProgressUpdate={(posMs, durMs) => {
            if (activePlayer.mediaItem && durMs > 0) {
              const fraction = posMs / durMs;
              const uniqueId = `cw_${activePlayer.mediaItem.id}`;
              const updatedItem: ContinueWatchingItem = {
                id: uniqueId,
                mediaItem: activePlayer.mediaItem,
                progressFraction: fraction,
                positionMs: posMs,
                durationMs: durMs,
                streamUrl: activePlayer.streamUrl,
                quality: activePlayer.quality,
                lastWatchedTimestamp: Date.now()
              };
              setContinueWatching((prev) => [updatedItem, ...prev.filter(i => i.id !== uniqueId)]);
            }
          }}
        />
      )}

      {/* Navigation Drawer */}
      <CinemaNavigationDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        activeProfile={activeProfile}
        currentRoute={currentScreen}
        onNavigateHome={() => {
          setScreenStack([]);
          setCurrentScreen('home');
        }}
        onNavigateMovies={() => {
          setHomeTypeFilter('MOVIE');
          setScreenStack([]);
          setCurrentScreen('home');
        }}
        onNavigateSeries={() => {
          setHomeTypeFilter('SERIES');
          setScreenStack([]);
          setCurrentScreen('home');
        }}
        onNavigateCatalogs={() => navigateTo('catalogs')}
        onNavigateDownloads={() => navigateTo('downloads')}
        onNavigateSettings={() => navigateTo('settings')}
        onProfileClick={() => {
          const nextProfile = DEFAULT_PROFILES.find(p => p.id !== activeProfile.id) || DEFAULT_PROFILES[0];
          setActiveProfile(nextProfile);
          showToast(`הפרופיל הוחלף ל-${nextProfile.name}`);
        }}
      />

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom duration-200">
          <div className="bg-[#141414] border border-[#E50914] text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#E50914] animate-pulse"></span>
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

    </div>
  );
}
