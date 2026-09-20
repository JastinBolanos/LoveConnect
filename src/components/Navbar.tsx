import React from 'react';
import { Heart, Search, MessageCircle } from 'lucide-react';
import { SparkJoinButton } from './SparkJoinButton';
import { TabType } from '../types';

interface NavbarProps {
  onOpenJoin: () => void;
  onOpenLogin: () => void;
  onOpenChat: () => void;
  unreadCount: number;
  activeTab: string;
  setActiveTab: (tab: TabType) => void;
  onSearchClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenJoin,
  onOpenLogin,
  onOpenChat,
  unreadCount,
  activeTab,
  setActiveTab,
  onSearchClick,
}) => {
  const tabs: TabType[] = ['Home', 'Browse', 'Matches', 'Messages', 'Success Stories', 'Blog'];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#120826]/95 backdrop-blur-lg border-b border-pink-500/20 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 py-4 sm:py-5 lg:py-6 transition-all duration-300 shadow-lg shadow-black/20">
      <div className="w-full flex items-center justify-between gap-4">
        <button
          id="nav-logo-btn"
          onClick={() => setActiveTab('Home')}
          className="flex items-center gap-3.5 sm:gap-4 group text-left cursor-pointer focus:outline-none shrink-0 animate-logo-dance"
        >
          <div className="relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-[#ec4899] via-[#f43f5e] to-[#fb7185] p-0.5 shadow-xl animate-logo-icon-radiance group-hover:scale-110 transition-transform duration-300">
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 text-amber-300 pointer-events-none animate-sparkle-glow">
              ✦
            </span>
            <div className="w-full h-full bg-[#1b0a33] rounded-[14px] flex items-center justify-center overflow-hidden relative">
              <Heart className="w-6 h-6 sm:w-7 sm:h-7 text-white fill-[#ec4899] animate-heartbeat drop-shadow-[0_0_10px_#ec4899]" />
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
            </div>
          </div>

          <div>
            <span className="text-2xl sm:text-3xl font-black tracking-tight text-white block leading-tight animate-logo-text-shimmer">
              LoveConnect
            </span>
            <p className="text-xs sm:text-sm text-pink-200/90 font-medium tracking-wide flex items-center gap-1">
              <span>Find your perfect match</span>
              <span className="inline-block text-pink-400 animate-pulse text-[10px]">✨</span>
            </p>
          </div>
        </button>

        <nav className="hidden md:flex items-center space-x-1 lg:space-x-3 xl:space-x-5">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                id={`nav-link-${tab.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setActiveTab(tab)}
                className={`relative px-3.5 py-2 lg:px-4 lg:py-2.5 text-base md:text-lg lg:text-xl font-bold sm:font-extrabold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'text-white'
                    : 'text-gray-300 hover:text-white hover:bg-white/5 rounded-xl'
                }`}
              >
                <span>{tab}</span>
                {tab === 'Messages' && unreadCount > 0 && (
                  <span className="ml-2 inline-flex items-center justify-center w-6 h-6 text-xs sm:text-sm font-black text-white bg-[#ec4899] rounded-full shadow-md shadow-pink-500/40">
                    {unreadCount}
                  </span>
                )}
                {isActive && (
                  <span className="absolute -bottom-1 sm:-bottom-2 left-2 right-2 h-1 bg-[#ec4899] rounded-full shadow-[0_0_12px_#ec4899]" />
                )}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3.5 lg:gap-4 shrink-0">
          <button
            id="nav-search-btn"
            onClick={onSearchClick}
            aria-label="Search singles"
            className="p-2.5 text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
          >
            <Search className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <button
            id="nav-quick-chat-btn"
            onClick={onOpenChat}
            aria-label="Quick Chat"
            className="relative p-2.5 text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
          >
            <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-pink-500 rounded-full ring-2 ring-[#120826] animate-ping" />
            )}
          </button>

          <button
            id="nav-login-btn"
            onClick={onOpenLogin}
            className="text-xs sm:text-sm lg:text-base font-bold text-white hover:text-pink-300 px-3 py-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer whitespace-nowrap"
          >
            Log in
          </button>

          <SparkJoinButton
            id="nav-join-free-btn"
            onClick={onOpenJoin}
            size="sm"
            text="Join Free"
          />
        </div>
      </div>
    </header>
  );
};
