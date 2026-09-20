import React, { useState } from 'react';
import { Star, ArrowRight, CheckCircle2, Heart, Sparkles, Wand2 } from 'lucide-react';
import { Member } from '../types';

interface FeaturedMembersProps {
  members: Member[];
  onSelectMember: (member: Member) => void;
  onLikeMember: (member: Member, e: React.MouseEvent) => void;
  likedMemberIds: Set<string>;
  onViewAllClick: () => void;
  showAll?: boolean;
}

export const FeaturedMembers: React.FC<FeaturedMembersProps> = ({
  members,
  onSelectMember,
  onLikeMember,
  likedMemberIds,
  onViewAllClick,
  showAll = false,
}) => {
  const [pulseSpeed, setPulseSpeed] = useState<'normal' | 'fast'>('normal');
  const displayedMembers = showAll ? members : members.slice(0, 6);

  return (
    <section className="w-full bg-white text-gray-900 pt-8 pb-16 sm:pt-10 sm:pb-20 lg:pb-24 px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20 2xl:px-24 rounded-[32px] sm:rounded-[44px] border-2 border-pink-100/90 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] relative z-20 mb-8 sm:mb-12">
      <div className="w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
          <div className="flex items-center gap-3">
            <Star className="w-6 h-6 text-[#ec4899] fill-[#ec4899]" />
            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 tracking-tight">
                Featured Members
              </h2>
              <p className="text-xs text-pink-600 font-semibold flex items-center gap-1 mt-0.5">
                <Sparkles className="w-3.5 h-3.5 text-pink-500 animate-spin-slow" />
                <span>Dynamic rotating borders & vibrant member profiles</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            <button
              id="toggle-pulse-speed-btn"
              onClick={() => setPulseSpeed((s) => (s === 'normal' ? 'fast' : 'normal'))}
              className="px-3 py-1.5 rounded-full bg-pink-50 border border-pink-200 text-pink-700 hover:bg-pink-100 transition-colors text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
              title="Toggle glow speed and border rotation"
            >
              <Wand2 className="w-3.5 h-3.5 text-pink-500" />
              <span>Speed: {pulseSpeed === 'normal' ? 'Smooth' : 'Intense'}</span>
            </button>

            {!showAll && (
              <button
                id="view-all-members-link"
                onClick={onViewAllClick}
                className="flex items-center gap-1.5 text-sm sm:text-base font-bold text-[#ec4899] hover:text-[#db2777] transition-colors group cursor-pointer"
              >
                <span>View All Members</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5 xl:gap-6">
          {displayedMembers.map((member, index) => {
            const isLiked = likedMemberIds.has(member.id);

            return (
              <div
                key={member.id}
                id={`member-card-wrapper-${member.id}`}
                onClick={() => onSelectMember(member)}
                className="group relative p-[3.5px] rounded-[22px] overflow-hidden cursor-pointer shadow-xl transition-all duration-300 hover:scale-[1.04] hover:-translate-y-1.5 animate-pink-glow"
                style={{
                  animationDelay: `${index * 0.3}s`,
                }}
              >
                <div
                  className={`absolute -inset-[150%] w-[400%] h-[400%] -left-[150%] -top-[150%] pointer-events-none transition-opacity ${
                    pulseSpeed === 'fast'
                      ? 'animate-rotate-border-fast'
                      : 'animate-rotate-border group-hover:animate-rotate-border-fast'
                  }`}
                  style={{
                    background:
                      'conic-gradient(from 0deg, #ec4899 0deg, #f43f5e 60deg, #fda4af 110deg, #ffffff 140deg, #fb7185 180deg, #ec4899 240deg, #ffffff 290deg, #f472b6 330deg, #ec4899 360deg)',
                    animationDelay: `${index * 0.25}s`,
                  }}
                />

                <div className="absolute top-1 right-1 w-3 h-3 rounded-full bg-pink-300/80 blur-[2px] animate-sparkle-glow pointer-events-none z-20" />
                <div className="absolute bottom-1 left-1 w-3 h-3 rounded-full bg-rose-400/80 blur-[2px] animate-sparkle-glow pointer-events-none z-20" />

                <div
                  id={`member-card-${member.id}`}
                  className="relative w-full h-full bg-gray-950 rounded-[18.5px] overflow-hidden z-10 flex flex-col"
                >
                  <div className="relative w-full aspect-[3.7/5] overflow-hidden bg-gray-900 flex items-center justify-center">
                    <img
                      src={member.image}
                      alt={`${member.name}, ${member.age}`}
                      className="w-full h-full object-cover object-center animate-photo-shrink-expand will-change-transform select-none"
                      style={{
                        animationDuration: pulseSpeed === 'fast' ? '2.2s' : '3.4s',
                        animationDelay: `${index * 0.45}s`,
                      }}
                      referrerPolicy="no-referrer"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent pointer-events-none" />

                    <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none z-20">
                      <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#16a34a] text-white text-[11px] font-bold shadow-md backdrop-blur-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        <span>Online</span>
                      </div>

                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#22c55e] border border-white/80 shadow-sm"></span>
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-12 text-left pointer-events-none z-20">
                      <div className="flex items-center gap-1 text-white">
                        <span className="text-sm sm:text-base font-bold tracking-tight drop-shadow-md">
                          {member.name}, {member.age}
                        </span>
                        {member.isVerified && (
                          <CheckCircle2 className="w-4 h-4 text-sky-400 fill-sky-400/20" />
                        )}
                      </div>
                      <p className="text-[11px] font-medium text-pink-200/90 drop-shadow truncate">
                        {member.city}, {member.country}
                      </p>
                    </div>

                    <button
                      id={`like-btn-${member.id}`}
                      aria-label={`Like ${member.name}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onLikeMember(member, e);
                      }}
                      className="absolute bottom-2.5 right-2.5 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/95 backdrop-blur-xs shadow-lg flex items-center justify-center text-[#ec4899] hover:scale-115 active:scale-95 transition-all cursor-pointer z-30 group-hover:shadow-pink-500/50"
                    >
                      <Heart
                        className={`w-5 h-5 transition-transform fill-[#ec4899] text-[#ec4899] ${
                          isLiked ? 'scale-125 animate-heartbeat' : 'hover:scale-110'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
