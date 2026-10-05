import React from 'react';
import { 
  X, 
  Home, 
  Film, 
  Tv, 
  LayoutGrid, 
  Download, 
  Settings, 
  Play, 
  UserCheck, 
  ChevronLeft 
} from 'lucide-react';
import { UserProfile } from '../../types/cinema';
import { CINEMA_RED } from '../../data/cinemaSeedData';

interface CinemaNavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeProfile: UserProfile;
  currentRoute: string;
  onNavigateHome: () => void;
  onNavigateMovies: () => void;
  onNavigateSeries: () => void;
  onNavigateCatalogs: () => void;
  onNavigateDownloads: () => void;
  onNavigateSettings: () => void;
  onProfileClick: () => void;
}

export const CinemaNavigationDrawer: React.FC<CinemaNavigationDrawerProps> = ({
  isOpen,
  onClose,
  activeProfile,
  currentRoute,
  onNavigateHome,
  onNavigateMovies,
  onNavigateSeries,
  onNavigateCatalogs,
  onNavigateDownloads,
  onNavigateSettings,
  onProfileClick
}) => {
  if (!isOpen) return null;

  const navItems = [
    { id: 'home', label: 'דף הבית', icon: Home, onClick: onNavigateHome },
    { id: 'movies', label: 'סרטים', icon: Film, onClick: onNavigateMovies },
    { id: 'series', label: 'סדרות', icon: Tv, onClick: onNavigateSeries },
    { id: 'catalogs', label: 'קטלוגים', icon: LayoutGrid, onClick: onNavigateCatalogs },
    { id: 'downloads', label: 'הורדות', icon: Download, onClick: onNavigateDownloads, highlight: true }
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-start select-none">
      {/* Backdrop */}
      <div 
        onClick={onClose} 
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer Container */}
      <div className="relative w-72 sm:w-80 bg-[#141414] border-l border-white/10 h-full p-5 flex flex-col justify-between shadow-2xl z-10 animate-in slide-in-from-right duration-200">
        
        {/* Top Header */}
        <div>
          <div className="flex items-center justify-between pb-5 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #E50914 0%, #990000 100%)' }}
              >
                <Play className="w-4 h-4 text-white fill-white translate-x-0.5" />
              </div>
              <span className="text-base font-black text-white">CinemaStream</span>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="mt-5 space-y-1.5">
            {navItems.map((item) => {
              const IconComp = item.icon;
              const isSelected = currentRoute === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    item.onClick();
                    onClose();
                  }}
                  className={`w-full py-3 px-4 rounded-xl flex items-center gap-3.5 text-sm font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#E50914]/15 text-[#E50914] border border-[#E50914]/30'
                      : item.highlight
                      ? 'bg-white/5 text-white hover:bg-white/10'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <IconComp className={`w-5 h-5 ${isSelected ? 'text-[#E50914]' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section: Profile & Settings & Version */}
        <div className="pt-4 border-t border-white/10 space-y-4">
          
          {/* Profile & Settings row */}
          <div className="flex items-center justify-between gap-3">
            {/* Profile Avatar button */}
            <button
              onClick={() => {
                onProfileClick();
                onClose();
              }}
              className="flex items-center gap-3 p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors flex-1 cursor-pointer"
              title="החלפת פרופיל"
            >
              <div 
                className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md"
                style={{ backgroundColor: activeProfile.colorHex }}
              >
                {activeProfile.initial}
              </div>
              <div className="text-right">
                <div className="text-xs font-bold text-white leading-none">{activeProfile.name}</div>
                <div className="text-[10px] text-slate-400 mt-1">החלף פרופיל</div>
              </div>
            </button>

            {/* Settings button */}
            <button
              onClick={() => {
                onNavigateSettings();
                onClose();
              }}
              className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
              title="הגדרות"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>

          {/* App Version Label */}
          <div className="text-[11px] text-slate-500 text-center flex items-center justify-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>גרסה 1.0.0 (Desktop Edition)</span>
          </div>

        </div>

      </div>
    </div>
  );
};
