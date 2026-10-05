export type MediaType = 'MOVIE' | 'SERIES' | 'EPISODE';

export interface CastMember {
  id: string;
  name: string;
  originalName?: string;
  role: string;
  profileUrl: string;
  isDirector: boolean;
}

export interface Episode {
  id: string;
  seasonNumber: number;
  episodeNumber: number;
  title: string;
  overview: string;
  thumbnailUrl: string;
  durationMinutes: number;
  streamUrl: string;
}

export interface Season {
  seasonNumber: number;
  title: string;
  episodes: Episode[];
}

export interface ContinueWatchingItem {
  id: string;
  mediaItem: MediaItem;
  episodeTitle?: string;
  progressFraction: number; // 0.0 - 1.0
  positionMs: number;
  durationMs: number;
  streamUrl: string;
  quality: string;
  magnetUrl?: string;
  infoHash?: string;
  lastWatchedTimestamp: number;
}

export interface MediaItem {
  id: string;
  title: string;
  originalTitle: string;
  overview: string;
  posterUrl: string;
  backdropUrl: string;
  year: number;
  releaseDateOrder?: number;
  quality: string;
  rating: string;
  ageRating: string;
  genres: string[];
  type: MediaType;
  streamUrl: string;
  trailerUrl?: string;
  actors: string[];
  durationMinutes: number;
  seasonsCount?: number;
  episodesCount?: number;
  seasons?: Season[];
}

export interface MediaCategory {
  id: string;
  title: string;
  items: MediaItem[];
}

export interface StremioStreamSource {
  id: string;
  name: string;
  title: string;
  url?: string;
  infoHash?: string;
  fileIdx?: number;
  magnetUrl?: string;
  quality: string;
  sizeFormatted: string;
  seeders: number;
  addonName: string;
  provider: string;
  releaseTitle: string;
  isDebrid: boolean;
}

export interface StremioAddon {
  id: string;
  name: string;
  version: string;
  description: string;
  manifestUrl: string;
  types: string[];
  resources: string[];
  isEnabled: boolean;
  isLocked: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  initial: string;
  colorHex: string;
  isKids: boolean;
}

export interface DownloadItem {
  id: string;
  mediaId: string;
  title: string;
  fileName: string;
  fileSizeBytes: number;
  downloadDateFormatted: string;
  localFilePath: string;
  posterUrl: string;
  quality: string;
}

export interface SubtitleCue {
  id: number;
  startMs: number;
  endMs: number;
  text: string;
}

export interface ActorSearchResult {
  id: string;
  name: string;
  profileUrl: string;
  knownForDepartment: string;
  knownForMedia: MediaItem[];
}

export interface AppSettings {
  playerType: 'INTERNAL' | 'EXTERNAL';
  maxQuality: '4K UHD' | '1080p FHD' | '720p HD';
  autoPlayNextEpisode: boolean;
  torrentServerUrl: string;
  realDebridApiKey: string;
  allDebridApiKey: string;
  subtitleTextColor: string;
  subtitleFontSize: number;
}
