import React, { useState } from 'react';
import { X, Heart, MessageCircle, MapPin, Sparkles, Flame, Shield, Share2 } from 'lucide-react';
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
  onClose,
}) => {
  const [roseSent, setRoseSent] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  const handleSendRose = () => {
    setRoseSent(true);
    setTimeout(() => setRoseSent(false), 3000);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
    }
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#14082b] border-2 border-pink-500/50 rounded-[32px] overflow-hidden shadow-2xl shadow-pink-900/60 max-h-[90vh] flex flex-col text-white">
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          {linkCopied && (
            <span className="text-xs bg-pink-500 text-white font-bold px-2.5 py-1 rounded-full shadow-lg animate-in fade-in">
              Link copied! ✨
            </span>
          )}
          <button
            onClick={handleShare}
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

        <div className="overflow-y-auto flex-1 pb-8">
          <div className="relative w-full h-80 sm:h-96 bg-gray-900">
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover object-top"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#14082b] via-[#14082b]/30 to-transparent pointer-events-none" />

            <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/90 text-white text-xs font-bold flex items-center gap-1.5 shadow-[0_0_12px_rgba(16,185,129,0.7)] border border-emerald-400/50 animate-pulse">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                    Online Now
                  </span>
                  {member.isVerified && (
                    <span className="px-2.5 py-0.5 rounded-full bg-sky-500/90 text-white text-xs font-bold flex items-center gap-1 shadow-[0_0_12px_rgba(14,165,233,0.7)] border border-sky-400/50">
                      <Shield className="w-3 h-3 fill-white" />
                      100% Verified
                    </span>
                  )}
                </div>
                <h2 className="text-3xl font-extrabold text-white flex items-center gap-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                  {member.name}, {member.age}
                </h2>
                <p className="text-sm text-pink-200/90 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-pink-400 animate-bounce" />
                  {member.city}, {member.country}
                </p>
              </div>

              <div className="flex flex-col items-center bg-gradient-to-tr from-pink-600 via-rose-600 to-purple-600 rounded-2xl p-3 shadow-xl border border-pink-300/60 animate-pink-glow relative overflow-hidden group">
                <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shine-sweep" />
                </div>
                <span className="text-2xl font-black text-white animate-text-glow leading-none">{member.matchScore}%</span>
                <span className="text-[10px] text-pink-100 uppercase tracking-wider font-extrabold mt-1">Neural Match</span>
              </div>
            </div>
          </div>

          <div className="px-5 sm:px-6 pt-3 space-y-6">
            <div>
              <h3 className="text-xs font-bold text-pink-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-sparkle-glow" />
                About Me
              </h3>
              <div className="relative overflow-hidden bg-white/5 p-4 rounded-2xl border border-pink-500/30 shadow-[0_0_15px_rgba(236,72,153,0.15)]">
                <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
                  <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-pink-400/10 to-transparent animate-shine-sweep" />
                </div>
                <p className="text-base text-gray-100 leading-relaxed font-normal relative z-10">
                  "{member.bio}"
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="relative overflow-hidden bg-gradient-to-b from-white/10 to-pink-950/30 p-3.5 rounded-2xl border border-pink-500/40 animate-data-glow group">
                <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
                  <div className="w-2/3 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine-sweep" />
                </div>
                <div className="text-[11px] text-pink-300 font-bold uppercase tracking-wider flex items-center justify-between">
                  <span>Profession</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-ping" />
                </div>
                <div className="text-sm font-black text-white truncate mt-1 animate-text-glow">
                  {member.profession}
                </div>
              </div>

              {member.zodiac && (
                <div className="relative overflow-hidden bg-gradient-to-b from-white/10 to-purple-950/30 p-3.5 rounded-2xl border border-pink-500/40 animate-data-glow group">
                  <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
                    <div className="w-2/3 h-full bg-gradient-to-r from-transparent via-purple-300/25 to-transparent animate-shine-sweep" />
                  </div>
                  <div className="text-[11px] text-pink-300 font-bold uppercase tracking-wider flex items-center justify-between">
                    <span>Zodiac</span>
                    <Sparkles className="w-3 h-3 text-amber-300 animate-sparkle-glow" />
                  </div>
                  <div className="text-sm font-black text-white mt-1 animate-text-glow">
                    {member.zodiac}
                  </div>
                </div>
              )}

              {member.height && (
                <div className="relative overflow-hidden bg-gradient-to-b from-white/10 to-rose-950/30 p-3.5 rounded-2xl border border-pink-500/40 animate-data-glow group">
                  <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
                    <div className="w-2/3 h-full bg-gradient-to-r from-transparent via-rose-300/25 to-transparent animate-shine-sweep" />
                  </div>
                  <div className="text-[11px] text-pink-300 font-bold uppercase tracking-wider flex items-center justify-between">
                    <span>Height</span>
                    <Flame className="w-3 h-3 text-rose-400 animate-pulse" />
                  </div>
                  <div className="text-sm font-black text-white mt-1 animate-text-glow">
                    {member.height}
                  </div>
                </div>
              )}
            </div>

            <div>
              <h3 className="text-xs font-bold text-pink-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <span>Passions & Aesthetics</span>
                <span className="text-[10px] text-pink-400/80">✨</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {member.interests.map((interest, idx) => (
                  <span
                    key={idx}
                    className="relative px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-pink-500/20 border border-pink-400/40 text-pink-100 shadow-[0_0_12px_rgba(236,72,153,0.3)] hover:shadow-[0_0_20px_rgba(236,72,153,0.7)] hover:border-pink-300 hover:scale-105 transition-all cursor-default"
                  >
                    #{interest}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative overflow-hidden bg-gradient-to-r from-pink-950/50 via-[#230d3d]/60 to-purple-950/50 p-4 rounded-2xl border border-pink-500/40 shadow-[0_0_20px_rgba(236,72,153,0.25)] space-y-3">
              <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-pink-400/15 to-transparent animate-shine-sweep" />
              </div>

              <div className="flex items-center justify-between text-xs font-extrabold">
                <span className="text-pink-100">Values & Life Goals</span>
                <span className="text-emerald-300 drop-shadow-[0_0_10px_rgba(52,211,153,0.9)] animate-pulse">98% Affinity</span>
              </div>
              <div className="w-full h-2.5 bg-black/40 rounded-full overflow-hidden p-[1px] border border-emerald-500/30">
                <div className="w-[98%] h-full bg-gradient-to-r from-pink-500 via-emerald-400 to-emerald-300 rounded-full shadow-[0_0_12px_rgba(52,211,153,0.8)] relative overflow-hidden">
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shine-sweep" />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs font-extrabold pt-1">
                <span className="text-pink-100">Humor & Communication</span>
                <span className="text-pink-300 drop-shadow-[0_0_10px_rgba(244,114,182,0.9)] animate-pulse">95% Affinity</span>
              </div>
              <div className="w-full h-2.5 bg-black/40 rounded-full overflow-hidden p-[1px] border border-pink-500/30">
                <div className="w-[95%] h-full bg-gradient-to-r from-purple-500 via-rose-500 to-pink-400 rounded-full shadow-[0_0_12px_rgba(236,72,153,0.8)] relative overflow-hidden">
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shine-sweep" />
                </div>
              </div>
            </div>

            {roseSent && (
              <div className="p-3 bg-pink-500/25 border border-pink-400 rounded-2xl text-center text-pink-100 font-extrabold text-sm animate-bounce shadow-[0_0_20px_rgba(236,72,153,0.5)]">
                🌹 Holographic Cyber Rose delivered to {member.name}! She was notified.
              </div>
            )}
          </div>
        </div>

        <div className="p-4 bg-[#1b0a36] border-t border-pink-500/30 flex items-center gap-3">
          <button
            onClick={onToggleLike}
            className={`flex-1 py-3.5 px-4 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer animate-button-hop-soft hover:scale-105 active:scale-95 ${
              isLiked
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/50 border border-rose-400'
                : 'bg-white/10 hover:bg-white/15 text-pink-200 border border-pink-400/40 shadow-sm'
            }`}
          >
            <Heart className={`w-4 h-4 transition-transform duration-200 ${isLiked ? 'fill-white scale-125' : 'fill-pink-400 text-pink-400'}`} />
            <span>{isLiked ? 'Liked ❤️' : 'Send Like'}</span>
          </button>

          <button
            onClick={handleSendRose}
            className="py-3.5 px-4 rounded-2xl font-extrabold text-sm bg-gradient-to-r from-rose-500/20 via-pink-500/20 to-rose-500/20 hover:bg-pink-500/30 text-rose-200 border border-rose-500/50 flex items-center gap-1.5 transition-all cursor-pointer animate-button-hop-soft hover:scale-105 active:scale-95 shadow-[0_0_12px_rgba(244,63,94,0.3)]"
            title="Send a cyber rose"
          >
            <span className="text-base">🌹</span>
            <span className="hidden sm:inline">Send Rose</span>
          </button>

          <button
            onClick={onStartChat}
            className="flex-1 py-3.5 px-4 rounded-2xl font-black text-sm bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 hover:from-pink-600 hover:to-amber-600 text-white shadow-xl shadow-pink-500/60 flex items-center justify-center gap-2 transition-all cursor-pointer animate-button-jump relative overflow-hidden active:scale-95"
          >
            <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
              <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shine-sweep" />
            </div>
            <MessageCircle className="w-4 h-4 fill-white animate-bounce" />
            <span className="tracking-wide text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]">Chat Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};
