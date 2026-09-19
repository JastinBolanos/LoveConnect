import React from 'react';
import { Star, ArrowRight, CheckCircle2, Heart } from 'lucide-react';
import { Member } from '../types';

interface FeaturedMembersProps {
  members: Member[];
  onSelectMember: (member: Member) => void;
  onLikeMember: (member: Member, e: React.MouseEvent) => void;
  likedMemberIds: Set<string>;
  onViewAllClick: () => void;
}

export const FeaturedMembers: React.FC<FeaturedMembersProps> = ({
  members,
  onSelectMember,
  onLikeMember,
  likedMemberIds,
  onViewAllClick
}) => {

  return (
    <section className="w-full bg-white text-gray-900 pt-8 pb-4 sm:pt-10 sm:pb-6 px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20 2xl:px-24 rounded-t-[32px] sm:rounded-t-[44px] -mt-6 sm:-mt-8 relative z-20 shadow-2xl">
      <div className="w-full">
        
        {/* Section Header: Pink Star + Featured Members on left, View All Members on right */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div className="flex items-center gap-2.5">
            <Star className="w-6 h-6 text-[#ec4899] fill-[#ec4899]" />
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 tracking-tight">
              Featured Members
            </h2>
          </div>

          {/* View All Members Button */}
          <button
            id="view-all-members-link"
            onClick={onViewAllClick}
            className="flex items-center gap-1.5 text-sm sm:text-base font-bold text-[#ec4899] hover:text-[#db2777] transition-colors group cursor-pointer"
          >
            <span>View All Members</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Member Cards Grid: Exact 6 Columns matching screenshot */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5 xl:gap-6">
          {members.slice(0, 6).map((member) => {
            const isLiked = likedMemberIds.has(member.id);

            return (
              <div
                key={member.id}
                id={`member-card-${member.id}`}
                onClick={() => onSelectMember(member)}
                className="group relative bg-gray-900 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col"
              >
                {/* Image Container */}
                <div className="relative w-full aspect-[3.7/5] overflow-hidden bg-gray-800">
                  <img
                    src={member.image}
                    alt={`${member.name}, ${member.age}`}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />

                  {/* Dark gradient for text legibility at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                  {/* Top Badges */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                    {/* Online Pill Badge */}
                    <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#16a34a] text-white text-[11px] font-bold shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      <span>Online</span>
                    </div>

                    {/* Green dot indicator */}
                    <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e] border border-white/60 shadow-sm" />
                  </div>

                  {/* Bottom Member Info Overlay */}
                  <div className="absolute bottom-3 left-3 right-12 text-left pointer-events-none">
                    <div className="flex items-center gap-1 text-white">
                      <span className="text-sm sm:text-base font-bold tracking-tight drop-shadow-md">
                        {member.name}, {member.age}
                      </span>
                      {member.isVerified && (
                        <CheckCircle2 className="w-4 h-4 text-sky-400 fill-sky-400/20" />
                      )}
                    </div>
                    <p className="text-[11px] font-medium text-gray-300 drop-shadow truncate">
                      {member.city}, {member.country}
                    </p>
                  </div>

                  {/* Floating Like Heart Button with Heartbeat */}
                  <button
                    id={`like-btn-${member.id}`}
                    aria-label={`Like ${member.name}`}
                    onClick={(e) => onLikeMember(member, e)}
                    className="absolute bottom-2.5 right-2.5 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-[#ec4899] hover:scale-110 active:scale-95 transition-transform cursor-pointer"
                  >
                    <Heart
                      className={`w-5 h-5 transition-transform fill-[#ec4899] text-[#ec4899] ${
                        isLiked ? 'scale-110' : ''
                      }`}
                    />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
