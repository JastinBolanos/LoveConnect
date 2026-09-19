import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { LoveAtmosphere } from './components/LoveAtmosphere';
import { Footer } from './components/layout/Footer';
import { HomeView } from './components/views/HomeView';
import { BrowseView } from './components/views/BrowseView';
import { MatchesView } from './components/views/MatchesView';
import { BlogView } from './components/views/BlogView';
import { MessagesView } from './components/MessagesView';
import { SuccessStoriesView } from './components/SuccessStoriesView';
import { ChatModal } from './components/ChatModal';
import { ProfileModal } from './components/ProfileModal';
import { JoinModal } from './components/JoinModal';
import { VideoModal } from './components/VideoModal';
import { MatchCelebrationModal } from './components/MatchCelebrationModal';
import { LoginModal } from './components/LoginModal';
import { SearchModal } from './components/SearchModal';
import { SuccessStoriesModal } from './components/SuccessStoriesModal';
import { SARAH_MATCH } from './data/membersData';
import { Member } from './types';
import { useModalManager } from './hooks/useModalManager';
import { useMemberMatches } from './hooks/useMemberMatches';

export default function App() {
  const [activeTab, setActiveTab] = useState('Home');
  const [unreadCount, setUnreadCount] = useState(3);

  const {
    isJoinOpen,
    openJoin,
    closeJoin,
    isLoginOpen,
    openLogin,
    closeLogin,
    isVideoOpen,
    openVideo,
    closeVideo,
    isSearchOpen,
    openSearch,
    closeSearch,
    isSuccessStoriesOpen,
    openSuccessStories,
    closeSuccessStories,
    activeChatMember,
    openChat,
    closeChat,
    selectedProfile,
    openProfile,
    closeProfile,
  } = useModalManager();

  const {
    allMembers,
    likedMemberIds,
    toggleLike,
    addMatchedMembers,
    celebrationMatch,
    clearCelebrationMatch,
  } = useMemberMatches();

  const handleOpenChat = (member: Member) => {
    openChat(member);
    if (unreadCount > 0) {
      setUnreadCount((c) => Math.max(0, c - 1));
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'Success Stories') {
      openSuccessStories();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0d061f] text-white selection:bg-pink-500 selection:text-white font-sans relative overflow-x-hidden">
      <LoveAtmosphere />

      <Navbar
        unreadCount={unreadCount}
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        onOpenJoin={openJoin}
        onOpenLogin={openLogin}
        onOpenChat={() => handleOpenChat(SARAH_MATCH)}
        onSearchClick={openSearch}
      />

      <main className="flex-1 w-full">
        {activeTab === 'Home' && (
          <HomeView
            members={allMembers}
            likedMemberIds={likedMemberIds}
            onSelectMember={openProfile}
            onLikeMember={toggleLike}
            onViewAllMembers={() => setActiveTab('Browse')}
            onJoinClick={openJoin}
            onWatchVideoClick={openVideo}
            onOpenSarahChat={() => handleOpenChat(SARAH_MATCH)}
            onViewJessicaStory={openSuccessStories}
          />
        )}

        {activeTab === 'Browse' && (
          <BrowseView
            members={allMembers}
            likedMemberIds={likedMemberIds}
            onSelectMember={openProfile}
            onLikeMember={toggleLike}
            onBackToHome={() => setActiveTab('Home')}
          />
        )}

        {activeTab === 'Matches' && (
          <MatchesView
            members={allMembers}
            likedMemberIds={likedMemberIds}
            onSelectMember={openProfile}
            onOpenChat={handleOpenChat}
            onBackToHome={() => setActiveTab('Home')}
          />
        )}

        {activeTab === 'Messages' && (
          <MessagesView
            members={allMembers}
            onOpenChat={handleOpenChat}
            onBackToHome={() => setActiveTab('Home')}
            onExploreSingles={() => setActiveTab('Browse')}
          />
        )}

        {activeTab === 'Success Stories' && (
          <SuccessStoriesView
            onBackToHome={() => setActiveTab('Home')}
            onJoinFree={openJoin}
            onFindMatch={() => setActiveTab('Matches')}
          />
        )}

        {activeTab === 'Blog' && (
          <BlogView onBackToHome={() => setActiveTab('Home')} />
        )}
      </main>

      <Footer
        onOpenJoin={openJoin}
        onOpenVideo={openVideo}
        onOpenSuccessStories={openSuccessStories}
        onOpenLogin={openLogin}
      />

      {activeChatMember && (
        <ChatModal
          member={activeChatMember}
          onClose={closeChat}
        />
      )}

      {selectedProfile && (
        <ProfileModal
          member={selectedProfile}
          isLiked={likedMemberIds.has(selectedProfile.id)}
          onToggleLike={() => toggleLike(selectedProfile)}
          onStartChat={() => {
            const member = selectedProfile;
            closeProfile();
            handleOpenChat(member);
          }}
          onClose={closeProfile}
        />
      )}

      {celebrationMatch && (
        <MatchCelebrationModal
          member={celebrationMatch}
          onClose={clearCelebrationMatch}
          onSendMessage={() => {
            const member = celebrationMatch;
            clearCelebrationMatch();
            handleOpenChat(member);
          }}
        />
      )}

      {isJoinOpen && (
        <JoinModal
          onClose={closeJoin}
          onSuccess={addMatchedMembers}
        />
      )}

      {isVideoOpen && (
        <VideoModal
          onClose={closeVideo}
          onJoinNow={openJoin}
        />
      )}

      {isLoginOpen && (
        <LoginModal
          onClose={closeLogin}
          onSwitchToJoin={() => {
            closeLogin();
            openJoin();
          }}
        />
      )}

      {isSearchOpen && (
        <SearchModal
          members={allMembers}
          onSelectMember={openProfile}
          onClose={closeSearch}
        />
      )}

      {isSuccessStoriesOpen && (
        <SuccessStoriesModal
          onClose={closeSuccessStories}
          onJoinNow={openJoin}
        />
      )}
    </div>
  );
}
