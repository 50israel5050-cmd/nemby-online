import { MediaItem, StremioAddon, UserProfile, StremioStreamSource } from '../types/cinema';

export const CINEMA_RED = '#E50914';
export const BACKGROUND_DARK = '#0F0F0F';
export const SURFACE_DARK = '#141414';
export const SURFACE_VARIANT_DARK = '#1F1F1F';

// Fallback high-quality test streams for playback
export const SAMPLE_STREAM_HLS = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';
export const SAMPLE_STREAM_TEARS = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4';
export const SAMPLE_STREAM_SINTEL = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4';
export const SAMPLE_STREAM_BIG_BUCK = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

export const SEED_MEDIA_ITEMS: MediaItem[] = [
  {
    id: 'dune3',
    title: 'חולית: חלק שלישי',
    originalTitle: 'Dune: Part Three',
    overview: 'פול אטריידיס מתמודד עם ההשלכות הקוסמיות של עלייתו לשלטון כקיסר על פני כוכב אראקיס ומסע הג׳יהאד הבין-כוכבי.',
    posterUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1600&q=80',
    year: 2026,
    quality: '4K UHD',
    rating: '9.2',
    ageRating: '16+',
    genres: ['אקשן', 'דרמה', 'מדע בדיוני'],
    type: 'MOVIE',
    streamUrl: SAMPLE_STREAM_HLS,
    trailerUrl: SAMPLE_STREAM_TEARS,
    actors: ['טימותי שאלאמה', 'זנדאיה', 'פלורנס פיו', 'חאווייר ברדם'],
    durationMinutes: 168
  },
  {
    id: 'avatar3',
    title: 'אווטאר: אש ואפר',
    originalTitle: 'Avatar: Fire and Ash',
    overview: 'ג\'ייק סאלי ונייטירי נתקלים בשבט עוין של נאווי המכונה \'אנשי האפר\' בפנדורה ומאבק חדש מתלקח.',
    posterUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&q=80',
    year: 2026,
    quality: '4K UHD',
    rating: '8.9',
    ageRating: '13+',
    genres: ['אקשן', 'הרפתקאות', 'מדע בדיוני'],
    type: 'MOVIE',
    streamUrl: SAMPLE_STREAM_TEARS,
    trailerUrl: SAMPLE_STREAM_SINTEL,
    actors: ['סאם וורת\'ינגטון', 'זואי סלדנה', 'סיגורני ויבר'],
    durationMinutes: 192
  },
  {
    id: 'stranger_things_5',
    title: 'דברים מוזרים',
    originalTitle: 'Stranger Things',
    overview: 'הקרב האחרון והמכריע על הוקינס והעולם ההפוך. אילבן והחברים מתאחדים לסיום האפוס המרתק.',
    posterUrl: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=800&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=1600&q=80',
    year: 2026,
    quality: '4K UHD',
    rating: '9.1',
    ageRating: '16+',
    genres: ['דרמה', 'אימה', 'מדע בדיוני'],
    type: 'SERIES',
    streamUrl: SAMPLE_STREAM_HLS,
    trailerUrl: SAMPLE_STREAM_BIG_BUCK,
    actors: ['מילי בובי בראון', 'פין וולפהארד', 'וינונה ריידר', 'דייוויד הארבור'],
    durationMinutes: 0,
    seasonsCount: 5,
    episodesCount: 8,
    seasons: [
      {
        seasonNumber: 5,
        title: 'עונה 5',
        episodes: [
          {
            id: 'st5_e1',
            seasonNumber: 5,
            episodeNumber: 1,
            title: 'הזחילה (The Crawl)',
            overview: 'רמזים מסתוריים נחשפים בהוקינס הנטושה והסכנה שבה להתעורר.',
            thumbnailUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&q=80',
            durationMinutes: 55,
            streamUrl: SAMPLE_STREAM_HLS
          },
          {
            id: 'st5_e2',
            seasonNumber: 5,
            episodeNumber: 2,
            title: 'ההיעלמות',
            overview: 'החברים מתכננים מבצע חילוץ נועז בעומק העולם ההפוך.',
            thumbnailUrl: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=800&q=80',
            durationMinutes: 62,
            streamUrl: SAMPLE_STREAM_TEARS
          }
        ]
      }
    ]
  },
  {
    id: 'last_of_us_2',
    title: 'האחרונים מבינינו',
    originalTitle: 'The Last of Us',
    overview: 'חמש שנים לאחר מסעם המסוכן בארה"ב המגפתית, ג\'ואל ואלי מוצאים שלווה זמנית אך אירוע טראגי שולח אותה למסע נקמה ללא פשרות.',
    posterUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1600&q=80',
    year: 2026,
    quality: '4K UHD',
    rating: '8.9',
    ageRating: '18+',
    genres: ['אקשן', 'דרמה', 'אימה'],
    type: 'SERIES',
    streamUrl: SAMPLE_STREAM_HLS,
    trailerUrl: SAMPLE_STREAM_TEARS,
    actors: ['פדרו פסקל', 'בלה רמזי', 'קייטלין דיוור'],
    durationMinutes: 0,
    seasonsCount: 2,
    episodesCount: 7,
    seasons: [
      {
        seasonNumber: 2,
        title: 'עונה 2',
        episodes: [
          {
            id: 'tlou_s2e1',
            seasonNumber: 2,
            episodeNumber: 1,
            title: 'ג\'קסון (Jackson)',
            overview: 'ג\'קסון, ויומינג - עולם חדש ומאתגר מעבר לחומות.',
            thumbnailUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&q=80',
            durationMinutes: 60,
            streamUrl: SAMPLE_STREAM_HLS
          }
        ]
      }
    ]
  },
  {
    id: 'ted_lasso',
    title: 'טד לאסו',
    originalTitle: 'Ted Lasso',
    overview: 'מאמן פוטבול אמריקאי עובר לבריטניה לאמן קבוצת כדורגל כושלת בפרמייר ליג ומביא עמו אופטימיות בלתי נדלית.',
    posterUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1600&q=80',
    year: 2025,
    quality: '4K UHD',
    rating: '8.8',
    ageRating: '16+',
    genres: ['קומדיה', 'סיטקום', 'דרמה'],
    type: 'SERIES',
    streamUrl: SAMPLE_STREAM_TEARS,
    trailerUrl: SAMPLE_STREAM_BIG_BUCK,
    actors: ['ג\'ייסון סודייקיס', 'האנה וודינגהאם', 'ברט גולדשטיין'],
    durationMinutes: 0,
    seasonsCount: 3,
    episodesCount: 12,
    seasons: [
      {
        seasonNumber: 3,
        title: 'עונה 3',
        episodes: [
          {
            id: 'tl_s3e1',
            seasonNumber: 3,
            episodeNumber: 1,
            title: '4-4-2 (פתיחת עונה)',
            overview: 'ריצ\'מונד חוזרת לליגה הבכירה עם שאיפות חדשות.',
            thumbnailUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&q=80',
            durationMinutes: 45,
            streamUrl: SAMPLE_STREAM_TEARS
          }
        ]
      }
    ]
  },
  {
    id: 'tt0108778',
    title: 'חברים',
    originalTitle: 'Friends',
    overview: 'עוקב אחר חייהם, אהבותיהם וההרפתקאות המצחיקות של שישה חברים טובים המתגוררים במנהטן.',
    posterUrl: 'https://images.metahub.space/poster/medium/tt0108778/img',
    backdropUrl: 'https://images.metahub.space/background/medium/tt0108778/img',
    year: 1994,
    quality: '1080p',
    rating: '8.9',
    ageRating: '13+',
    genres: ['קומדיה', 'סיטקום', 'רומנטיקה'],
    type: 'SERIES',
    streamUrl: SAMPLE_STREAM_HLS,
    trailerUrl: SAMPLE_STREAM_SINTEL,
    actors: ['ג\'ניפר אניסטון', 'קורטני קוקס', 'מתיו פרי', 'ליסה קודרו', 'מאט לה-בלאנק', 'דייוויד שווימר'],
    durationMinutes: 22,
    seasonsCount: 10,
    episodesCount: 236
  },
  {
    id: 'tt0386676',
    title: 'המשרד',
    originalTitle: 'The Office',
    overview: 'מוקומנטרי קומי המתעד את חיי היום-יום המשעשעים וההזויים של עובדי חברת הנייר \'דאנדר מיפלין\' בסקרנטון תחת ניהולו של מייקל סקוט.',
    posterUrl: 'https://images.metahub.space/poster/medium/tt0386676/img',
    backdropUrl: 'https://images.metahub.space/background/medium/tt0386676/img',
    year: 2005,
    quality: '1080p',
    rating: '9.0',
    ageRating: '16+',
    genres: ['קומדיה', 'סיטקום'],
    type: 'SERIES',
    streamUrl: SAMPLE_STREAM_TEARS,
    trailerUrl: SAMPLE_STREAM_BIG_BUCK,
    actors: ['סטיב קארל', 'ג\'ון קרסינסקי', 'ריין וילסון', 'ג\'נה פישר'],
    durationMinutes: 22,
    seasonsCount: 9,
    episodesCount: 201
  },
  {
    id: 'tt2467372',
    title: 'ברוקלין תשע-תשע',
    originalTitle: 'Brooklyn Nine-Nine',
    overview: 'הבלש המוכשר והילדותי ג\'ייק פרלטה וחבריו לתחנת המשטרה 99 בברוקלין מתמודדים עם פשעים ועם מפקד חדש וקשוח.',
    posterUrl: 'https://images.metahub.space/poster/medium/tt2467372/img',
    backdropUrl: 'https://images.metahub.space/background/medium/tt2467372/img',
    year: 2013,
    quality: '1080p',
    rating: '8.4',
    ageRating: '16+',
    genres: ['קומדיה', 'סיטקום', 'פשע'],
    type: 'SERIES',
    streamUrl: SAMPLE_STREAM_HLS,
    trailerUrl: SAMPLE_STREAM_SINTEL,
    actors: ['אנדי סמברג', 'סטפני ביאטריס', 'טרי קרוז', 'אנדרה בראואר'],
    durationMinutes: 22,
    seasonsCount: 8,
    episodesCount: 153
  },
  {
    id: 'tt1442437',
    title: 'משפחה מודרנית',
    originalTitle: 'Modern Family',
    overview: 'שלושה ענפים של אותה משפחה מגוונת בקליפורניה מתמודדים עם אתגרי ההורות, הנישואין וחיי המשפחה בהומור שנון.',
    posterUrl: 'https://images.metahub.space/poster/medium/tt1442437/img',
    backdropUrl: 'https://images.metahub.space/background/medium/tt1442437/img',
    year: 2009,
    quality: '1080p',
    rating: '8.5',
    ageRating: '13+',
    genres: ['קומדיה', 'סיטקום'],
    type: 'SERIES',
    streamUrl: SAMPLE_STREAM_TEARS,
    trailerUrl: SAMPLE_STREAM_BIG_BUCK,
    actors: ['אד אוניל', 'סופיה ורגרה', 'ג\'ולי בואן', 'טיי בורל'],
    durationMinutes: 22,
    seasonsCount: 11,
    episodesCount: 250
  },
  {
    id: 'tt0098904',
    title: 'סיינפלד',
    originalTitle: 'Seinfeld',
    overview: 'עלילותיו של הסטנדאפיסט הניו-יורקי ג\'רי סיינפלד וחבריו האקסצנטריים ג\'ורג\', איליין וקריימר, בסדרה האגדית על כלום.',
    posterUrl: 'https://images.metahub.space/poster/medium/tt0098904/img',
    backdropUrl: 'https://images.metahub.space/background/medium/tt0098904/img',
    year: 1989,
    quality: '1080p',
    rating: '8.9',
    ageRating: '13+',
    genres: ['קומדיה', 'סיטקום'],
    type: 'SERIES',
    streamUrl: SAMPLE_STREAM_HLS,
    trailerUrl: SAMPLE_STREAM_SINTEL,
    actors: ['ג\'רי סיינפלד', 'ג\'ייסון אלכסנדר', 'ג\'וליה לואי-דרייפוס', 'מייקל ריצ\'רדס'],
    durationMinutes: 22,
    seasonsCount: 9,
    episodesCount: 180
  },
  {
    id: 'tt1130884',
    title: 'שאטר איילנד',
    originalTitle: 'Shutter Island',
    overview: 'ב-1954, מרשל אמריקאי חוקר את היעלמותה המסתורית של רוצחת שנמלטה מבית חולים פסיכיאטרי לעבריינים על אי מבודד, ומגלה סודות מטלטלים.',
    posterUrl: 'https://images.metahub.space/poster/medium/tt1130884/img',
    backdropUrl: 'https://images.metahub.space/background/medium/tt1130884/img',
    year: 2010,
    quality: '4K UHD',
    rating: '8.2',
    ageRating: '16+',
    genres: ['מתח', 'מסתורין', 'דרמה'],
    type: 'MOVIE',
    streamUrl: SAMPLE_STREAM_HLS,
    trailerUrl: SAMPLE_STREAM_TEARS,
    actors: ['לאונרדו דיקפריו', 'מארק רופאלו', 'בן קינגסלי'],
    durationMinutes: 138
  },
  {
    id: 'tt0816692',
    title: 'בין כוכבים',
    originalTitle: 'Interstellar',
    overview: 'צוות חוקרים יוצא למסע דרך חור תולעת בחלל בניסיון למצוא כוכב לכת חדש שיבטיח את הישרדותה של האנושות.',
    posterUrl: 'https://images.metahub.space/poster/medium/tt0816692/img',
    backdropUrl: 'https://images.metahub.space/background/medium/tt0816692/img',
    year: 2014,
    quality: '4K UHD',
    rating: '8.7',
    ageRating: '13+',
    genres: ['מדע בדיוני', 'הרפתקאות', 'דרמה'],
    type: 'MOVIE',
    streamUrl: SAMPLE_STREAM_HLS,
    trailerUrl: SAMPLE_STREAM_TEARS,
    actors: ['מתיו מקונוהיי', 'אן האת\'וויי', 'ג\'סיקה צ\'סטיין'],
    durationMinutes: 169
  }
];

export const DEFAULT_PROFILES: UserProfile[] = [
  { id: 'israel', name: 'ישראל', initial: 'י', colorHex: '#E50914', isKids: false },
  { id: 'kids', name: 'ילדים', initial: 'י', colorHex: '#2196F3', isKids: true },
  { id: 'guest', name: 'אורח', initial: 'א', colorHex: '#9E9E9E', isKids: false }
];

export const DEFAULT_ADDONS: StremioAddon[] = [
  {
    id: 'community.torrentio',
    name: 'Torrentio',
    version: '1.0.13',
    description: 'מקור טורנטים ו-Debrid עם קישורים ישירים',
    manifestUrl: 'https://torrentio.strem.fun/manifest.json',
    types: ['movie', 'series'],
    resources: ['stream'],
    isEnabled: true,
    isLocked: true
  },
  {
    id: 'community.tpbplus',
    name: 'The Pirate Bay+ (TPB+)',
    version: '1.4.0',
    description: 'מקור טורנטים רשמי של The Pirate Bay',
    manifestUrl: 'https://thepiratebay-plus.strem.fun/manifest.json',
    types: ['movie', 'series'],
    resources: ['stream'],
    isEnabled: true,
    isLocked: true
  },
  {
    id: 'org.stremio.opensubtitles-v3',
    name: 'OpenSubtitles v3',
    version: '1.0.0',
    description: 'מאגר כתוביות רשמי בעברית ובכל השפות',
    manifestUrl: 'https://opensubtitles-v3.strem.io/manifest.json',
    types: ['movie', 'series'],
    resources: ['subtitles'],
    isEnabled: true,
    isLocked: true
  },
  {
    id: 'com.linvo.cinemeta',
    name: 'Cinemeta (IMDb)',
    version: '3.0.14',
    description: 'קטלוג סרטים וסדרות רשמי של IMDb',
    manifestUrl: 'https://v3-cinemeta.strem.io/manifest.json',
    types: ['movie', 'series'],
    resources: ['catalog'],
    isEnabled: true,
    isLocked: true
  }
];

export const SAMPLE_STREMIO_SOURCES: StremioStreamSource[] = [
  {
    id: 'stream_1080p_1',
    name: 'Torrentio [1080p]',
    title: 'Dune.Part.Two.2024.1080p.WEB-DL.DDP5.1.Atmos.H.264\n👤 3420 💾 4.8 GB ⚙️ TorrentGalaxy',
    quality: '1080p FHD',
    sizeFormatted: '4.8 GB',
    seeders: 3420,
    addonName: 'Torrentio',
    provider: 'TorrentGalaxy',
    releaseTitle: 'Dune.Part.Two.2024.1080p.WEB-DL.DDP5.1.Atmos.H.264',
    isDebrid: true,
    url: SAMPLE_STREAM_HLS
  },
  {
    id: 'stream_4k_1',
    name: 'Torrentio [4K]',
    title: 'Dune.Part.Two.2024.2160p.UHD.HDR.DoVi.TrueHD.7.1\n👤 1850 💾 18.2 GB ⚙️ TGx',
    quality: '4K UHD',
    sizeFormatted: '18.2 GB',
    seeders: 1850,
    addonName: 'Torrentio',
    provider: 'TGx',
    releaseTitle: 'Dune.Part.Two.2024.2160p.UHD.HDR.DoVi.TrueHD.7.1',
    isDebrid: true,
    url: SAMPLE_STREAM_HLS
  },
  {
    id: 'stream_tpb_1',
    name: 'The Pirate Bay+ [1080p]',
    title: 'Dune.Part.Two.2024.1080p.WEBRip.x264.AAC5.1-[YTS.MX]\n👤 920 💾 2.6 GB ⚙️ YTS',
    quality: '1080p FHD',
    sizeFormatted: '2.6 GB',
    seeders: 920,
    addonName: 'TPB+',
    provider: 'YTS',
    releaseTitle: 'Dune.Part.Two.2024.1080p.WEBRip.x264.AAC5.1-[YTS.MX]',
    isDebrid: false,
    url: SAMPLE_STREAM_TEARS
  },
  {
    id: 'stream_720p_1',
    name: 'Torrentio [720p]',
    title: 'Dune.Part.Two.2024.720p.WEB-DL.H264\n👤 450 💾 1.4 GB ⚙️ EZTV',
    quality: '720p HD',
    sizeFormatted: '1.4 GB',
    seeders: 450,
    addonName: 'Torrentio',
    provider: 'EZTV',
    releaseTitle: 'Dune.Part.Two.2024.720p.WEB-DL.H264',
    isDebrid: false,
    url: SAMPLE_STREAM_BIG_BUCK
  }
];
