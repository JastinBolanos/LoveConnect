import React from 'react';
import { Heart, Users, ShieldCheck, Play, Send, Star } from 'lucide-react';
import { SARAH_MATCH, JESSICA_TESTIMONIAL, USER_AVATAR, HERO_COUPLE_IMAGE } from '../data/membersData';
import { SparkJoinButton } from './SparkJoinButton';

interface HeroSectionProps {
  onJoinClick: () => void;
  onWatchVideoClick: () => void;
  onOpenSarahChat: () => void;
  onViewJessicaStory: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onJoinClick,
  onWatchVideoClick,
  onOpenSarahChat,
  onViewJessicaStory,
}) => {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#13082a] via-[#220c48] to-[#120826] text-white pt-8 pb-16 lg:pt-14 lg:pb-24">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-600/25 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[30rem] h-[30rem] bg-purple-600/30 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-80 h-80 bg-amber-500/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="absolute top-12 left-1/2 -translate-x-1/2 opacity-30 pointer-events-none hidden md:block">
        <svg className="w-28 h-28 text-pink-500 animate-float" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
      </div>

      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20 2xl:px-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center">
          <div className="lg:col-span-5 xl:col-span-5 2xl:col-span-5 space-y-6 lg:space-y-7 text-left z-20">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-950/80 border border-pink-500/40 text-pink-300 shadow-[0_0_15px_rgba(236,72,153,0.3)] animate-gentle-sway">
              <Heart className="w-3.5 h-3.5 fill-[#ec4899] text-[#ec4899] animate-heartbeat" />
              <span className="text-[11px] sm:text-xs font-black tracking-wider uppercase text-pink-200">
                The #1 Dating Community
              </span>
            </div>

            <div className="space-y-1 relative animate-float">
              <div className="flex items-center gap-3 sm:gap-4">
                <span className="text-4xl sm:text-6xl xl:text-7xl font-extrabold text-white tracking-tight leading-none drop-shadow-md">
                  Find Your
                </span>
                <div className="relative inline-block shrink-0 animate-neon-pulse-rotate">
                  <svg
                    className="w-11 h-11 sm:w-16 sm:h-16 text-[#ec4899] drop-shadow-[0_0_18px_rgba(236,72,153,0.9)]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                  <span className="absolute -inset-1 rounded-full border border-pink-400/40 animate-ping pointer-events-none opacity-40" />
                </div>
              </div>

              <div className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight mt-1 sm:mt-2 leading-none">
                <span className="text-[#ec4899] drop-shadow-[0_0_26px_rgba(236,72,153,0.7)] inline-block transition-transform hover:scale-105 duration-300">
                  Perfect
                </span>{' '}
                <span className="text-[#fbbf24] drop-shadow-[0_0_26px_rgba(251,191,36,0.7)] inline-block transition-transform hover:scale-105 duration-300">
                  Match
                </span>
              </div>
            </div>

            <p className="text-base sm:text-lg text-pink-100/90 max-w-lg font-normal leading-relaxed">
              Join thousands of singles looking for meaningful connections and lasting relationships.
            </p>

            <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-md pt-2">
              <div className="flex items-center gap-2.5 animate-float hover:translate-y-[-3px] transition-transform">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#ec4899] flex items-center justify-center shadow-[0_0_16px_rgba(236,72,153,0.5)] flex-shrink-0 animate-pulse-slow">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-black text-white leading-tight">2M+</div>
                  <div className="text-[11px] sm:text-xs text-pink-200/80 font-medium">Active Members</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 animate-float-delayed hover:translate-y-[-3px] transition-transform">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#f97316] flex items-center justify-center shadow-[0_0_16px_rgba(249,115,22,0.5)] flex-shrink-0">
                  <ShieldCheck className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-black text-white leading-tight">100%</div>
                  <div className="text-[11px] sm:text-xs text-pink-200/80 font-medium">Verified Profiles</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 animate-float hover:translate-y-[-3px] transition-transform">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#6366f1] flex items-center justify-center shadow-[0_0_16px_rgba(99,102,241,0.5)] flex-shrink-0">
                  <Heart className="w-5 h-5 text-white fill-white animate-heartbeat" />
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-black text-white leading-tight">85%</div>
                  <div className="text-[11px] sm:text-xs text-pink-200/80 font-medium">Find Love</div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-5 pt-2">
              <SparkJoinButton
                id="hero-join-cta"
                onClick={onJoinClick}
                size="lg"
                text="Join Now – It's Free!"
              />

              <button
                id="hero-watch-video-cta"
                onClick={onWatchVideoClick}
                className="flex items-center gap-3.5 text-white group cursor-pointer"
              >
                <div className="relative w-12 h-12 rounded-full border border-purple-400/50 bg-purple-950/70 flex items-center justify-center group-hover:scale-110 shadow-lg shadow-purple-900/50 transition-all duration-300">
                  <span className="absolute inset-0 rounded-full border border-pink-400/70 animate-ripple pointer-events-none" />
                  <span className="absolute -inset-1.5 rounded-full border border-purple-400/50 animate-ripple [animation-delay:0.8s] pointer-events-none" />
                  <Play className="w-5 h-5 fill-white text-white ml-0.5 relative z-10" />
                </div>
                <div className="text-left">
                  <div className="text-base font-bold text-white group-hover:text-pink-200 transition-colors">
                    Watch Video
                  </div>
                  <div className="text-xs text-pink-200/70 font-medium">See how it works</div>
                </div>
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 xl:col-span-7 2xl:col-span-7 relative flex items-center justify-center w-full">
            <div className="absolute w-[360px] h-[360px] sm:w-[500px] sm:h-[500px] xl:w-[650px] xl:h-[650px] rounded-full border border-pink-500/20 animate-pulse-slow pointer-events-none" />
            <div className="absolute w-[420px] h-[420px] sm:w-[580px] sm:h-[580px] xl:w-[720px] xl:h-[720px] rounded-full border border-purple-500/15 pointer-events-none" />

            <svg className="absolute -left-16 top-10 w-48 h-32 text-pink-400/50 pointer-events-none hidden xl:block" fill="none" viewBox="0 0 200 120">
              <path d="M 10 110 Q 90 20 190 60" stroke="currentColor" strokeWidth="2" strokeDasharray="5 7" />
              <circle cx="100" cy="50" r="3" fill="#ec4899" />
              <circle cx="150" cy="52" r="2.5" fill="#f43f5e" />
            </svg>

            <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] lg:aspect-[16/10] xl:aspect-[16/9.5] 2xl:aspect-[16/9] min-h-[420px] sm:min-h-[480px] lg:min-h-[520px] xl:min-h-[580px] rounded-[32px] overflow-hidden shadow-2xl shadow-pink-900/40 group">
              <img
                src={HERO_COUPLE_IMAGE}
                alt="Couple smiling happily at sunset"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#13082a]/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-950/20 via-transparent to-pink-900/20 pointer-events-none" />
            </div>

            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 xl:top-8 xl:right-8 z-20 w-64 sm:w-72 bg-white text-gray-900 rounded-2xl p-4 shadow-2xl shadow-pink-500/30 border border-white/60 animate-float transition-transform hover:scale-105">
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="relative flex items-center justify-center">
                  <img
                    src={USER_AVATAR}
                    alt="User"
                    className="w-12 h-12 rounded-full border-2 border-white object-cover shadow-md z-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="relative -ml-3 z-10">
                    <img
                      src={SARAH_MATCH.image}
                      alt="Sarah"
                      className="w-12 h-12 rounded-full border-2 border-[#ec4899] object-cover shadow-md"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#ec4899] flex items-center justify-center text-white text-[10px] shadow">
                      ❤️
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm sm:text-base font-extrabold text-gray-900 flex items-center justify-center gap-1">
                    It's a Match! 🎉
                  </h3>
                  <p className="text-xs text-gray-500">
                    You and {SARAH_MATCH.name} liked each other
                  </p>
                </div>

                <button
                  id="hero-send-message-btn"
                  onClick={onOpenSarahChat}
                  className="w-full py-2 px-4 text-xs font-bold text-white rounded-xl bg-gradient-to-r from-[#ec4899] to-[#f43f5e] hover:brightness-105 shadow-md shadow-pink-500/30 transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message</span>
                </button>
              </div>
            </div>

            <div
              onClick={onViewJessicaStory}
              className="absolute -bottom-4 right-4 sm:-bottom-5 sm:right-6 xl:bottom-4 xl:right-10 z-20 max-w-[300px] sm:max-w-xs bg-white text-gray-900 rounded-2xl p-3.5 shadow-2xl shadow-purple-950/40 border border-white/60 flex items-center gap-3.5 animate-float-delayed hover:scale-105 transition-all cursor-pointer"
            >
              <div className="relative flex-shrink-0">
                <img
                  src={JESSICA_TESTIMONIAL.image}
                  alt={JESSICA_TESTIMONIAL.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-amber-400 shadow"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-amber-400 flex items-center justify-center text-[9px] text-white">
                  ★
                </div>
              </div>

              <div className="flex-1 min-w-0 text-left">
                <p className="text-[12px] font-semibold text-gray-800 leading-snug line-clamp-2">
                  "{JESSICA_TESTIMONIAL.quote}"
                </p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[11px] font-medium text-gray-500">
                    – {JESSICA_TESTIMONIAL.name}, {JESSICA_TESTIMONIAL.age}
                  </span>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-2.5 h-2.5 fill-amber-400" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
