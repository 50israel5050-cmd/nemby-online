import React from 'react';
import { Play, Heart, Search, Menu, ArrowRight } from 'lucide-react';
import { CINEMA_RED } from '../../data/cinemaSeedData';

interface CinemaTopBarProps {
  onHomeClick: () => void;
  onBackClick: () => void;
  showBackButton?: boolean;
  onFavoritesClick: () => void;
  onSearchClick: () => void;
  onMenuClick: () => void;
  favoritesCount?: number;
}

export const CinemaTopBar: React.FC<CinemaTopBarProps> = ({
  onHomeClick,
  onBackClick,
  showBackButton = false,
  onFavoritesClick,
  onSearchClick,
  onMenuClick,
  favoritesCount = 0
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#0F0F0F]/90 backdrop-blur-md border-b border-white/5 shadow-lg select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Right side (RTL start): App Logo & Back Button */}
        <div className="flex items-center gap-2">
          {/* Logo */}
          <div
            onClick={onHomeClick}
            className="flex items-center gap-2.5 cursor-pointer group"
            title="מעבר לדף הבית"
          >
            <div 
              className="w-9 h-9 rounded-xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-105 active:scale-95"
              style={{
                background: 'linear-gradient(135deg, #E50914 0%, #990000 100%)',
                boxShadow: '0 4px 14px rgba(229, 9, 20, 0.4)'
              }}
            >
              <Play className="w-5 h-5 text-white fill-white translate-x-0.5" />
            </div>
            <span className="text-lg font-black tracking-tight text-white hidden sm:inline">
              Cinema<span className="text-[#E50914]">Stream</span>
            </span>
          </div>

          {/* Back button if in secondary screen */}
          {showBackButton && (
            <button
              onClick={onBackClick}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer mr-1"
              title="חזור שלב אחד אחורה"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Left side (RTL end): 3 Circular Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Favorites Button */}
          <button
            onClick={onFavoritesClick}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all relative cursor-pointer active:scale-95"
            title="המועדפים שלי"
          >
            <Heart className="w-4 h-4 text-white fill-transparent hover:fill-rose-500 hover:text-rose-500 transition-colors" />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full bg-[#E50914] text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Search Button */}
          <button
            onClick={onSearchClick}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer active:scale-95"
            title="חיפוש סרטים וסדרות"
          >
            <Search className="w-4 h-4 text-white" />
          </button>

          {/* Hamburger Menu Button */}
          <button
            onClick={onMenuClick}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer active:scale-95"
            title="תפריט ראשי"
          >
            <Menu className="w-4 h-4 text-white" />
          </button>
        </div>

      </div>
    </header>
  );
};
