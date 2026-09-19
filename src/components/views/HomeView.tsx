import React from 'react';
import { HeroSection } from '../HeroSection';
import { FeaturedMembers } from '../FeaturedMembers';
import { FeatureBanners } from '../FeatureBanners';
import { Member } from '../../types';

interface HomeViewProps {
  members: Member[];
  likedMemberIds: Set<string>;
  onSelectMember: (member: Member) => void;
  onLikeMember: (member: Member, e: React.MouseEvent) => void;
  onViewAllMembers: () => void;
  onJoinClick: () => void;
  onWatchVideoClick: () => void;
  onOpenSarahChat: () => void;
  onViewJessicaStory: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  members,
  likedMemberIds,
  onSelectMember,
  onLikeMember,
  onViewAllMembers,
  onJoinClick,
  onWatchVideoClick,
  onOpenSarahChat,
  onViewJessicaStory,
}) => {
  return (
    <>
      <HeroSection
        onJoinClick={onJoinClick}
        onWatchVideoClick={onWatchVideoClick}
        onOpenSarahChat={onOpenSarahChat}
        onViewJessicaStory={onViewJessicaStory}
      />

      <FeaturedMembers
        members={members}
        onSelectMember={onSelectMember}
        onLikeMember={onLikeMember}
        likedMemberIds={likedMemberIds}
        onViewAllClick={onViewAllMembers}
      />

      <FeatureBanners onLearnMore={onJoinClick} />
    </>
  );
};
