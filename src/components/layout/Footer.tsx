import React from 'react';
import { Heart } from 'lucide-react';

interface FooterProps {
  onOpenJoin: () => void;
  onOpenVideo: () => void;
  onOpenSuccessStories: () => void;
  onOpenLogin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenJoin,
  onOpenVideo,
  onOpenSuccessStories,
  onOpenLogin,
}) => {
  return (
    <footer className="w-full bg-[#0a0418] border-t border-pink-500/20 text-gray-400 text-xs py-10 px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20 2xl:px-24">
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2 text-white font-extrabold text-base">
          <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
          <span>LoveConnect © 2026</span>
          <span className="text-xs font-medium text-gray-400">• The Futuristic Dating Network</span>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-gray-300">
          <button
            onClick={onOpenJoin}
            className="hover:text-pink-400 transition-colors cursor-pointer"
          >
            Join Free
          </button>
          <button
            onClick={onOpenVideo}
            className="hover:text-pink-400 transition-colors cursor-pointer"
          >
            How It Works
          </button>
          <button
            onClick={onOpenSuccessStories}
            className="hover:text-pink-400 transition-colors cursor-pointer"
          >
            Success Stories
          </button>
          <button
            onClick={onOpenLogin}
            className="hover:text-pink-400 transition-colors cursor-pointer"
          >
            Member Portal
          </button>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-pink-300/80">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Neural Matching Online (2.4M Active)</span>
        </div>
      </div>
    </footer>
  );
};
