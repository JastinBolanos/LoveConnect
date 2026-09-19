import React from 'react';
import { MessageCircle } from 'lucide-react';
import { Member } from '../../types';

interface MatchesViewProps {
  members: Member[];
  likedMemberIds: Set<string>;
  onSelectMember: (member: Member) => void;
  onOpenChat: (member: Member) => void;
  onBackToHome: () => void;
}

export const MatchesView: React.FC<MatchesViewProps> = ({
  members,
  likedMemberIds,
  onSelectMember,
  onOpenChat,
  onBackToHome,
}) => {
  const matchedMembers = members.filter((m) => likedMemberIds.has(m.id));

  return (
    <div className="w-full px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20 2xl:px-24 py-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-white flex items-center gap-3">
            <span>Your Mutual Matches</span>
            <span className="text-pink-400 text-2xl animate-bounce">🎉</span>
            <span className="text-xs px-3 py-1 rounded-full bg-pink-500/20 border border-pink-400/40 text-pink-300 font-bold tracking-wide">
              {matchedMembers.length} Matches
            </span>
          </h1>
          <p className="text-sm text-pink-200/80 mt-1">
            Verified singles who liked your profile. Start a conversation!
          </p>
        </div>
        <button
          onClick={onBackToHome}
          className="text-xs sm:text-sm font-bold text-pink-400 hover:text-pink-300 transition-colors flex items-center gap-1 self-start sm:self-auto cursor-pointer"
        >
          ← Back to Home
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {matchedMembers.map((member, idx) => (
          <div
            key={member.id}
            id={`match-card-${member.id}`}
            onClick={() => onSelectMember(member)}
            className="bg-gradient-to-b from-[#1c0f3d] to-[#120826] border border-pink-500/30 hover:border-pink-400/70 rounded-3xl p-5 flex items-center gap-4 shadow-xl hover:shadow-pink-500/20 relative overflow-hidden group transition-all duration-300 hover:scale-[1.02] cursor-pointer"
          >
            <div className="relative p-[2.5px] rounded-2xl overflow-hidden shrink-0 animate-pink-glow shadow-md">
              <div
                className="absolute -inset-[100%] w-[300%] h-[300%] -left-[100%] -top-[100%] animate-rotate-border pointer-events-none"
                style={{
                  background:
                    'conic-gradient(from 0deg, #ec4899 0deg, #f43f5e 90deg, #ffffff 180deg, #f472b6 270deg, #ec4899 360deg)',
                  animationDelay: `${idx * 0.25}s`,
                }}
              />
              <div className="relative w-20 h-20 rounded-[13.5px] overflow-hidden bg-gray-900 z-10 flex items-center justify-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover animate-photo-shrink-expand will-change-transform"
                  style={{
                    animationDelay: `${idx * 0.3}s`,
                  }}
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1 mb-0.5">
                <h3 className="text-lg font-extrabold text-white truncate group-hover:text-pink-300 transition-colors">
                  {member.name}, {member.age}
                </h3>
                <span className="text-xs font-black text-pink-400 shrink-0 bg-pink-950/60 px-2 py-0.5 rounded-full border border-pink-500/30">
                  {member.matchScore}% Match
                </span>
              </div>
              <p className="text-xs text-pink-200/70 truncate">
                {member.city} • {member.matchedTime || 'Liked you today'}
              </p>
              <p className="text-[11px] text-pink-300/80 font-medium mb-3 truncate">
                {member.profession}
              </p>

              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenChat(member);
                  }}
                  className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-xs font-extrabold text-white shadow-md shadow-pink-500/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-white/80" />
                  <span>Chat</span>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectMember(member);
                  }}
                  className="py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-pink-200 hover:text-white transition-all cursor-pointer"
                  title="View full profile"
                >
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
