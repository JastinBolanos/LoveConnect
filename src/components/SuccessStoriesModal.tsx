import React from 'react';
import { X, Star, Heart } from 'lucide-react';
import { SUCCESS_STORIES } from '../data/membersData';

interface SuccessStoriesModalProps {
  onClose: () => void;
  onJoinNow: () => void;
}

export const SuccessStoriesModal: React.FC<SuccessStoriesModalProps> = ({ onClose, onJoinNow }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#14082c] border border-pink-500/40 rounded-3xl overflow-hidden shadow-2xl shadow-pink-900/60 flex flex-col max-h-[85vh] text-white">
        <div className="flex items-center justify-between px-6 py-4 bg-[#1f0d3e] border-b border-pink-500/20">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-pink-400 fill-pink-500" />
            <h3 className="text-lg font-black text-white">LoveConnect Real Success Stories</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white rounded-full hover:bg-white/10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6">
          {SUCCESS_STORIES.map((story) => (
            <div
              key={story.id}
              className="bg-white/5 border border-pink-500/20 rounded-2xl p-5 hover:border-pink-500/40 transition-colors flex flex-col sm:flex-row items-center sm:items-start gap-4"
            >
              <img
                src={story.image}
                alt={story.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-pink-500 flex-shrink-0 shadow-lg"
                referrerPolicy="no-referrer"
              />

              <div className="space-y-2 text-center sm:text-left flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <h4 className="text-base font-extrabold text-white">{story.name}</h4>
                    <span className="text-xs text-pink-300">{story.location} • {story.yearsTogether}</span>
                  </div>
                  <div className="flex justify-center text-amber-400">
                    {[...Array(story.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                </div>

                <p className="text-sm font-semibold text-pink-100 italic">
                  "{story.quote}"
                </p>

                <p className="text-xs text-gray-300 leading-relaxed">
                  {story.story}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-[#1a0a36] border-t border-pink-500/20 flex items-center justify-between">
          <span className="text-xs text-pink-200">Start your own love story today</span>
          <button
            onClick={() => {
              onClose();
              onJoinNow();
            }}
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 font-extrabold text-xs text-white shadow-lg shadow-pink-500/40 hover:scale-105 transition-all cursor-pointer"
          >
            Create Your Profile 💖
          </button>
        </div>
      </div>
    </div>
  );
};
