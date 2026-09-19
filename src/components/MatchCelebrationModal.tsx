import React from 'react';
import { X, Heart, Sparkles, Send, Flame } from 'lucide-react';
import { Member } from '../types';
import { USER_AVATAR } from '../data/membersData';

interface MatchCelebrationModalProps {
  member: Member;
  onClose: () => void;
  onSendMessage: () => void;
}

export const MatchCelebrationModal: React.FC<MatchCelebrationModalProps> = ({
  member,
  onClose,
  onSendMessage
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in zoom-in-95 duration-200">
      <div className="relative w-full max-w-md bg-gradient-to-b from-[#210c43] to-[#120726] border-2 border-pink-500/60 rounded-3xl overflow-hidden shadow-2xl shadow-pink-500/50 p-6 text-center text-white">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Ambient floating glows */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-48 bg-pink-500/30 rounded-full blur-3xl pointer-events-none" />

        {/* Header Title */}
        <div className="space-y-1 mb-6 relative z-10">
          <div className="inline-flex p-2 rounded-full bg-pink-500/20 text-pink-400 mb-1 animate-bounce">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-300 to-amber-300">
            It's a Match! 🎉
          </h2>
          <p className="text-xs sm:text-sm text-pink-200">
            You and <span className="font-bold text-white">{member.name}</span> liked each other!
          </p>
        </div>

        {/* Colliding Glowing Avatars */}
        <div className="relative flex items-center justify-center py-4 mb-4">
          <div className="relative z-10 -mr-4 animate-float">
            <img
              src={USER_AVATAR}
              alt="You"
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-2xl"
              referrerPolicy="no-referrer"
            />
            <span className="absolute bottom-0 left-2 bg-purple-600 text-[10px] font-bold px-2 py-0.5 rounded-full text-white">
              You
            </span>
          </div>

          <div className="z-20 w-12 h-12 rounded-full bg-gradient-to-tr from-pink-500 to-rose-600 flex items-center justify-center text-white shadow-xl shadow-pink-500/60 border-2 border-white scale-110 animate-pulse">
            <Heart className="w-6 h-6 fill-white" />
          </div>

          <div className="relative z-10 -ml-4 animate-float-delayed">
            <img
              src={member.image}
              alt={member.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-pink-500 shadow-2xl"
              referrerPolicy="no-referrer"
            />
            <span className="absolute bottom-0 right-2 bg-pink-600 text-[10px] font-bold px-2 py-0.5 rounded-full text-white">
              {member.matchScore}%
            </span>
          </div>
        </div>

        {/* Bio Affinity Tag */}
        <div className="mb-6 px-4 py-2 rounded-2xl bg-white/5 border border-pink-500/30 text-xs text-pink-200">
          ✨ Strong resonance detected on: {member.interests.slice(0, 3).join(', ')}
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5">
          <button
            id="match-send-message-btn"
            onClick={onSendMessage}
            className="w-full py-3.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 hover:from-pink-600 hover:to-amber-600 font-extrabold text-sm text-white shadow-xl shadow-pink-500/50 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Send Message to {member.name}</span>
          </button>

          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-300 hover:text-white transition-colors cursor-pointer"
          >
            Keep Exploring
          </button>
        </div>

      </div>
    </div>
  );
};
