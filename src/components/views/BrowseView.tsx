import React from 'react';
import { Member } from '../../types';
import { FeaturedMembers } from '../FeaturedMembers';

interface BrowseViewProps {
  members: Member[];
  likedMemberIds: Set<string>;
  onSelectMember: (member: Member) => void;
  onLikeMember: (member: Member, e: React.MouseEvent) => void;
  onBackToHome: () => void;
}

export const BrowseView: React.FC<BrowseViewProps> = ({
  members,
  likedMemberIds,
  onSelectMember,
  onLikeMember,
  onBackToHome,
}) => {
  return (
    <div className="w-full px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20 2xl:px-24 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Explore All Singles</h1>
          <p className="text-sm text-pink-200">Discover verified members tailored to your frequency</p>
        </div>
        <button
          onClick={onBackToHome}
          className="text-xs font-bold text-pink-400 hover:text-pink-300 transition-colors cursor-pointer"
        >
          ← Back to Home
        </button>
      </div>

      <FeaturedMembers
        members={members}
        onSelectMember={onSelectMember}
        onLikeMember={onLikeMember}
        likedMemberIds={likedMemberIds}
        onViewAllClick={() => {}}
        showAll={true}
      />
    </div>
  );
};
