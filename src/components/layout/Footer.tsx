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
    <footer className="w-full bg-[#0a0418] border-t border-pink-500/20 text-gray-400 text-xs pt-8 pb-24 md:py-10 px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20 2xl:px-24">
      <div className="w-full flex flex-col md:flex-row items-center md:items-center justify-start gap-5 lg:gap-10">
        <div className="flex items-center gap-2 text-white font-extrabold text-base shrink-0">
          <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
          <span>LoveConnect © 2026</span>
          <span className="text-xs font-medium text-gray-400 hidden sm:inline">• The Futuristic Dating Network</span>
        </div>

        <div className="flex flex-wrap items-center justify-center md:justify-start gap-5 sm:gap-7 text-gray-300">
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
      </div>
    </footer>
  );
};
