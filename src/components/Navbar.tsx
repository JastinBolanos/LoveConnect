import React, { useState } from 'react';
import { Heart, Search, Globe, ChevronDown, Bell, Sparkles, MessageCircle } from 'lucide-react';

interface NavbarProps {
  onOpenJoin: () => void;
  onOpenLogin: () => void;
  onOpenChat: () => void;
  unreadCount: number;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onSearchClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenJoin,
  onOpenLogin,
  onOpenChat,
  unreadCount,
  activeTab,
  setActiveTab,
  onSearchClick
}) => {
  const [lang, setLang] = useState('English');
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const languages = ['English', 'Español', 'Français', 'Deutsch', 'Português'];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#120826]/95 backdrop-blur-lg border-b border-pink-500/20 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 py-4 sm:py-5 lg:py-6 transition-all duration-300 shadow-lg shadow-black/20">
      <div className="w-full flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <button 
          id="nav-logo-btn"
          onClick={() => setActiveTab('Home')}
          className="flex items-center gap-3.5 sm:gap-4 group text-left cursor-pointer focus:outline-none shrink-0"
        >
          <div className="relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-[#ec4899] to-[#be185d] p-0.5 shadow-xl shadow-pink-500/40 group-hover:scale-105 transition-all duration-300">
            <div className="w-full h-full bg-[#1b0a33] rounded-[14px] flex items-center justify-center">
              <Heart className="w-6 h-6 sm:w-7 sm:h-7 text-white fill-[#ec4899]" />
            </div>
          </div>

          <div>
            <span className="text-2xl sm:text-3xl font-black tracking-tight text-white block leading-tight">
              LoveConnect
            </span>
            <p className="text-xs sm:text-sm text-pink-200/80 font-medium tracking-wide">
              Find your perfect match
            </p>
          </div>
        </button>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-3 xl:space-x-5">
          {['Home', 'Browse', 'Matches', 'Messages', 'Success Stories', 'Blog'].map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                id={`nav-link-${tab.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => {
                  if (tab === 'Messages') {
                    onOpenChat();
                  } else {
                    setActiveTab(tab);
                  }
                }}
                className={`relative px-3.5 py-2 lg:px-4 lg:py-2.5 text-base md:text-lg lg:text-xl font-bold sm:font-extrabold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'text-white'
                    : 'text-gray-300 hover:text-white hover:bg-white/5 rounded-xl'
                }`}
              >
                <span>{tab}</span>
                {tab === 'Messages' && (
                  <span className="ml-2 inline-flex items-center justify-center w-6 h-6 text-xs sm:text-sm font-black text-white bg-[#ec4899] rounded-full shadow-md shadow-pink-500/40">
                    3
                  </span>
                )}
                {isActive && (
                  <span className="absolute -bottom-1 sm:-bottom-2 left-2 right-2 h-1 bg-[#ec4899] rounded-full shadow-[0_0_12px_#ec4899]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Utility Buttons */}
        <div className="flex items-center gap-2 sm:gap-3.5 lg:gap-4 shrink-0">
          {/* Search Trigger */}
          <button
            id="nav-search-btn"
            onClick={onSearchClick}
            aria-label="Search singles"
            className="p-2.5 text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Language Selector */}
          <div className="relative hidden sm:block">
            <button
              id="nav-lang-btn"
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-2 px-3 py-2 text-xs sm:text-sm font-semibold text-gray-200 hover:text-white hover:bg-white/10 rounded-xl transition-all cursor-pointer"
            >
              <Globe className="w-4 h-4 text-gray-300" />
              <span>{lang}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${langMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-[#1b0e38] border border-pink-500/30 rounded-2xl shadow-xl shadow-purple-950/60 py-1.5 z-50 overflow-hidden backdrop-blur-xl">
                {languages.map((l) => (
                  <button
                    key={l}
                    onClick={() => {
                      setLang(l);
                      setLangMenuOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs sm:text-sm transition-colors cursor-pointer ${
                      lang === l ? 'bg-pink-600/30 text-pink-300 font-bold' : 'text-gray-200 hover:bg-white/10'
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Login Button */}
          <button
            id="nav-login-btn"
            onClick={onOpenLogin}
            className="px-5 py-2.5 sm:px-6 sm:py-2.5 text-sm sm:text-base font-bold text-white bg-purple-900/30 hover:bg-purple-900/50 border border-purple-500/40 rounded-2xl transition-all cursor-pointer shadow-sm hover:border-pink-500/50"
          >
            Login
          </button>

          {/* Join Now Button */}
          <button
            id="nav-join-btn"
            onClick={onOpenJoin}
            className="relative group overflow-hidden px-5 py-2.5 sm:px-6 sm:py-2.5 text-sm sm:text-base font-black text-white rounded-2xl bg-gradient-to-r from-[#ec4899] via-[#f43f5e] to-[#f97316] shadow-lg shadow-pink-500/40 hover:shadow-pink-500/60 hover:brightness-110 active:scale-[0.98] transition-all duration-300 flex items-center gap-2 cursor-pointer"
          >
            <Heart className="w-4 h-4 fill-white" />
            <span>Join Now</span>
          </button>
        </div>
      </div>
    </header>
  );
};
