import React, { useState } from 'react';
import { X, Heart, MessageCircle, MapPin, Briefcase, Sparkles, CheckCircle2, Star, Flame, Shield, Share2 } from 'lucide-react';
import { Member } from '../types';

interface ProfileModalProps {
  member: Member;
  isLiked: boolean;
  onToggleLike: () => void;
  onStartChat: () => void;
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  member,
  isLiked,
  onToggleLike,
  onStartChat,
  onClose
}) => {
  const [roseSent, setRoseSent] = useState(false);

  const handleSendRose = () => {
    setRoseSent(true);
    setTimeout(() => setRoseSent(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#14082b] border border-pink-500/40 rounded-3xl overflow-hidden shadow-2xl shadow-pink-900/60 max-h-[90vh] flex flex-col text-white">
        
        {/* Close & Share buttons */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          <button
            onClick={() => {
              if (navigator.clipboard) {
                navigator.clipboard.writeText(window.location.href);
                alert(`Profile link copied! Share with friends.`);
              }
            }}
            className="p-2 rounded-full bg-black/50 hover:bg-black/75 text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer"
            title="Share Profile"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-black/50 hover:bg-black/75 text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 pb-4">
          
          {/* Hero Image */}
          <div className="relative w-full h-80 sm:h-96 bg-gray-900">
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover object-top"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#14082b] via-[#14082b]/30 to-transparent pointer-events-none" />

            {/* Online and Match Tag */}
            <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/90 text-white text-xs font-bold flex items-center gap-1.5 shadow">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    Online Now
                  </span>
                  {member.isVerified && (
                    <span className="px-2.5 py-0.5 rounded-full bg-sky-500/80 text-white text-xs font-bold flex items-center gap-1 shadow">
                      <Shield className="w-3 h-3 fill-white" />
                      100% Verified
                    </span>
                  )}
                </div>
                <h2 className="text-3xl font-extrabold text-white flex items-center gap-2">
                  {member.name}, {member.age}
                </h2>
                <p className="text-sm text-pink-200/90 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-pink-400" />
                  {member.city}, {member.country}
                </p>
              </div>

              {/* Match Score Orb */}
              <div className="flex flex-col items-center bg-gradient-to-tr from-pink-600 to-purple-600 rounded-2xl p-2.5 shadow-lg border border-pink-400/30">
                <span className="text-xl font-black text-white">{member.matchScore}%</span>
                <span className="text-[10px] text-pink-200 uppercase tracking-wider font-bold">Neural Match</span>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="px-5 sm:px-6 pt-3 space-y-6">
            
            {/* Bio */}
            <div>
              <h3 className="text-xs font-bold text-pink-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                About Me
              </h3>
              <p className="text-base text-gray-200 leading-relaxed font-normal bg-white/5 p-4 rounded-2xl border border-white/10">
                "{member.bio}"
              </p>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <div className="text-[11px] text-pink-300 font-semibold">Profession</div>
                <div className="text-sm font-bold text-white truncate">{member.profession}</div>
              </div>
              {member.zodiac && (
                <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                  <div className="text-[11px] text-pink-300 font-semibold">Zodiac</div>
                  <div className="text-sm font-bold text-white">{member.zodiac}</div>
                </div>
              )}
              {member.height && (
                <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                  <div className="text-[11px] text-pink-300 font-semibold">Height</div>
                  <div className="text-sm font-bold text-white">{member.height}</div>
                </div>
              )}
            </div>

            {/* Interests Chips */}
            <div>
              <h3 className="text-xs font-bold text-pink-400 uppercase tracking-wider mb-2.5">
                Passions & Aesthetics
              </h3>
              <div className="flex flex-wrap gap-2">
                {member.interests.map((interest, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-full text-xs font-bold bg-pink-500/15 border border-pink-500/30 text-pink-200 hover:bg-pink-500/30 transition-colors"
                  >
                    #{interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Compatibility Breakdown Bars */}
            <div className="bg-gradient-to-r from-pink-950/40 to-purple-950/40 p-4 rounded-2xl border border-pink-500/30 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-pink-200">Values & Life Goals</span>
                <span className="text-emerald-400">98% Affinity</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="w-[98%] h-full bg-gradient-to-r from-pink-500 to-emerald-400 rounded-full" />
              </div>

              <div className="flex items-center justify-between text-xs font-bold pt-1">
                <span className="text-pink-200">Humor & Communication</span>
                <span className="text-pink-400">95% Affinity</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="w-[95%] h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
              </div>
            </div>

            {/* Cyber Rose Alert */}
            {roseSent && (
              <div className="p-3 bg-pink-500/20 border border-pink-400 rounded-2xl text-center text-pink-200 font-bold text-sm animate-bounce">
                🌹 Holographic Cyber Rose delivered to {member.name}! She was notified.
              </div>
            )}

          </div>

        </div>

        {/* Footer Action Bar */}
        <div className="p-4 bg-[#1b0a36] border-t border-pink-500/30 flex items-center gap-3">
          <button
            onClick={onToggleLike}
            className={`flex-1 py-3 px-4 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
              isLiked
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/40'
                : 'bg-white/10 hover:bg-white/15 text-pink-200 border border-pink-400/30'
            }`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-white' : 'fill-pink-400 text-pink-400'}`} />
            <span>{isLiked ? 'Liked ❤️' : 'Send Like'}</span>
          </button>

          <button
            onClick={handleSendRose}
            className="py-3 px-4 rounded-2xl font-bold text-sm bg-gradient-to-r from-rose-500/20 to-pink-500/20 hover:bg-pink-500/30 text-rose-300 border border-rose-500/40 flex items-center gap-1.5 transition-all cursor-pointer"
            title="Send a cyber rose"
          >
            <span>🌹</span>
            <span className="hidden sm:inline">Send Rose</span>
          </button>

          <button
            onClick={onStartChat}
            className="flex-1 py-3 px-4 rounded-2xl font-extrabold text-sm bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 hover:from-pink-600 hover:to-amber-600 text-white shadow-lg shadow-pink-500/40 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Chat Now</span>
          </button>
        </div>

      </div>
    </div>
  );
};
