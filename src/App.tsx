import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeaturedMembers } from './components/FeaturedMembers';
import { FeatureBanners } from './components/FeatureBanners';
import { LoveAtmosphere } from './components/LoveAtmosphere';
import { ChatModal } from './components/ChatModal';
import { ProfileModal } from './components/ProfileModal';
import { JoinModal } from './components/JoinModal';
import { VideoModal } from './components/VideoModal';
import { MatchCelebrationModal } from './components/MatchCelebrationModal';
import { LoginModal } from './components/LoginModal';
import { SearchModal } from './components/SearchModal';
import { SuccessStoriesModal } from './components/SuccessStoriesModal';
import { FEATURED_MEMBERS, SARAH_MATCH, SUCCESS_STORIES } from './data/membersData';
import { Member } from './types';
import { Heart, Sparkles, BookOpen, MessageCircle, Flame, Shield, ArrowRight } from 'lucide-react';

export default function App() {
  // Navigation and Modal State
  const [activeTab, setActiveTab] = useState('Home');
  const [isJoinOpen, setIsJoinOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSuccessStoriesOpen, setIsSuccessStoriesOpen] = useState(false);

  // Active Interactive Dialogs
  const [activeChatMember, setActiveChatMember] = useState<Member | null>(null);
  const [selectedProfile, setSelectedProfile] = useState<Member | null>(null);
  const [celebrationMatch, setCelebrationMatch] = useState<Member | null>(null);

  // User Interactive State
  const [likedMemberIds, setLikedMemberIds] = useState<Set<string>>(new Set(['sarah-26']));
  const [unreadCount, setUnreadCount] = useState(3);
  const [allMembers, setAllMembers] = useState<Member[]>(FEATURED_MEMBERS);

  // Like Member Handler
  const handleLikeMember = (member: Member, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    setLikedMemberIds((prev) => {
      const next = new Set(prev);
      if (next.has(member.id)) {
        next.delete(member.id);
      } else {
        next.add(member.id);
        // Trigger Match Celebration!
        setCelebrationMatch(member);
      }
      return next;
    });
  };

  // Open Chat with Member
  const handleOpenChat = (member: Member) => {
    setActiveChatMember(member);
    if (unreadCount > 0) {
      setUnreadCount((c) => Math.max(0, c - 1));
    }
  };

  // Onboarding Complete
  const handleJoinSuccess = (newMatches: Member[]) => {
    // Add matched members to liked list
    setLikedMemberIds((prev) => {
      const next = new Set(prev);
      newMatches.forEach((m) => next.add(m.id));
      return next;
    });
    // Trigger celebration for the top one
    if (newMatches.length > 0) {
      setCelebrationMatch(newMatches[0]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0d061f] text-white selection:bg-pink-500 selection:text-white font-sans relative overflow-x-hidden">
      
      {/* Interactive Love Atmosphere: Floating hearts, click bursts, and Love Shower button */}
      <LoveAtmosphere />

      {/* 1. Futuristic Navbar */}
      <Navbar
        unreadCount={unreadCount}
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'Success Stories') setIsSuccessStoriesOpen(true);
        }}
        onOpenJoin={() => setIsJoinOpen(true)}
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenChat={() => handleOpenChat(SARAH_MATCH)}
        onSearchClick={() => setIsSearchOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {activeTab === 'Home' && (
          <>
            {/* 2. Vibrant Hero Section with Couple & Floating Cards */}
            <HeroSection
              onJoinClick={() => setIsJoinOpen(true)}
              onWatchVideoClick={() => setIsVideoOpen(true)}
              onOpenSarahChat={() => handleOpenChat(SARAH_MATCH)}
              onViewJessicaStory={() => setIsSuccessStoriesOpen(true)}
            />

            {/* 3. Featured Members Grid (Exact replica of cards) */}
            <FeaturedMembers
              members={allMembers}
              onSelectMember={(m) => setSelectedProfile(m)}
              onLikeMember={handleLikeMember}
              likedMemberIds={likedMemberIds}
              onViewAllClick={() => setActiveTab('Browse')}
            />

            {/* 4. Bottom 4 Feature Banners with Vibrant Gradient */}
            <FeatureBanners onLearnMore={() => setIsJoinOpen(true)} />
          </>
        )}

        {/* BROWSE TAB */}
        {activeTab === 'Browse' && (
          <div className="w-full px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20 2xl:px-24 py-10">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-extrabold text-white">Explore All Singles</h1>
                <p className="text-sm text-pink-200">Discover verified members tailored to your frequency</p>
              </div>
              <button
                onClick={() => setActiveTab('Home')}
                className="text-xs font-bold text-pink-400 hover:text-pink-300"
              >
                ← Back to Home
              </button>
            </div>

            <FeaturedMembers
              members={allMembers}
              onSelectMember={(m) => setSelectedProfile(m)}
              onLikeMember={handleLikeMember}
              likedMemberIds={likedMemberIds}
              onViewAllClick={() => {}}
            />
          </div>
        )}

        {/* MATCHES TAB */}
        {activeTab === 'Matches' && (
          <div className="w-full px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20 2xl:px-24 py-10">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-extrabold text-white flex items-center gap-2">
                  <span>Your Mutual Matches</span>
                  <span className="text-pink-400 text-xl">🎉</span>
                </h1>
                <p className="text-sm text-pink-200">Singles who liked you back. Start a conversation!</p>
              </div>
              <button
                onClick={() => setActiveTab('Home')}
                className="text-xs font-bold text-pink-400 hover:text-pink-300"
              >
                ← Back to Home
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {/* Sarah Match Card */}
              <div className="bg-[#180c35] border border-pink-500/30 rounded-3xl p-5 flex items-center gap-4 shadow-xl">
                <img
                  src={SARAH_MATCH.image}
                  alt={SARAH_MATCH.name}
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-pink-500 shadow-md"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white">{SARAH_MATCH.name}, {SARAH_MATCH.age}</h3>
                    <span className="text-xs font-bold text-pink-400">99% Match</span>
                  </div>
                  <p className="text-xs text-pink-200/70 mb-3">{SARAH_MATCH.city} • Liked you today</p>
                  <button
                    onClick={() => handleOpenChat(SARAH_MATCH)}
                    className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 text-xs font-bold text-white shadow-md shadow-pink-500/30 hover:scale-105 transition-transform flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Open Chat</span>
                  </button>
                </div>
              </div>

              {/* Liked Members */}
              {allMembers
                .filter((m) => likedMemberIds.has(m.id) && m.id !== SARAH_MATCH.id)
                .map((m) => (
                  <div key={m.id} className="bg-[#180c35] border border-pink-500/30 rounded-3xl p-5 flex items-center gap-4 shadow-xl">
                    <img
                      src={m.image}
                      alt={m.name}
                      className="w-20 h-20 rounded-2xl object-cover border-2 border-pink-500 shadow-md"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-white">{m.name}, {m.age}</h3>
                        <span className="text-xs font-bold text-pink-400">{m.matchScore}% Match</span>
                      </div>
                      <p className="text-xs text-pink-200/70 mb-3">{m.city} • Mutual Interest</p>
                      <button
                        onClick={() => handleOpenChat(m)}
                        className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 text-xs font-bold text-white shadow-md shadow-pink-500/30 hover:scale-105 transition-transform flex items-center justify-center gap-1.5"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Send Message</span>
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* BLOG TAB */}
        {activeTab === 'Blog' && (
          <div className="w-full px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20 2xl:px-24 py-10">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-extrabold text-white">LoveConnect Cyber Journal</h1>
                <p className="text-sm text-pink-200">Insights, science of attraction, and modern dating stories</p>
              </div>
              <button
                onClick={() => setActiveTab('Home')}
                className="text-xs font-bold text-pink-400 hover:text-pink-300"
              >
                ← Back to Home
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-[#160a2f] border border-pink-500/20 rounded-3xl p-6 space-y-3">
                <span className="text-xs font-bold text-pink-400 bg-pink-500/10 px-2.5 py-1 rounded-full">Dating Science</span>
                <h3 className="text-xl font-bold text-white">How Neural Compatibility Predicts Chemistry</h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Moving beyond surface-level swipes: how analyzing cadence, shared aesthetic taste, and psychological resonance creates marriages that last.
                </p>
              </div>

              <div className="bg-[#160a2f] border border-pink-500/20 rounded-3xl p-6 space-y-3">
                <span className="text-xs font-bold text-pink-400 bg-pink-500/10 px-2.5 py-1 rounded-full">Date Ideas</span>
                <h3 className="text-xl font-bold text-white">5 Holographic Video Date Ideas for Introverts</h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  From virtual synthwave lounge listening sessions to synchronized recipe cooking across miles.
                </p>
              </div>

              <div className="bg-[#160a2f] border border-pink-500/20 rounded-3xl p-6 space-y-3">
                <span className="text-xs font-bold text-pink-400 bg-pink-500/10 px-2.5 py-1 rounded-full">Security</span>
                <h3 className="text-xl font-bold text-white">Biometric Verification & Anti-Catfish Protocols</h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Ensuring 100% human-verified connections across the global dating network.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Futuristic Footer */}
      <footer className="w-full bg-[#0a0418] border-t border-pink-500/20 text-gray-400 text-xs py-10 px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20 2xl:px-24">
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-white font-extrabold text-base">
            <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
            <span>LoveConnect © 2026</span>
            <span className="text-xs font-medium text-gray-400">• The Futuristic Dating Network</span>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-gray-300">
            <button onClick={() => setIsJoinOpen(true)} className="hover:text-pink-400 transition-colors">Join Free</button>
            <button onClick={() => setIsVideoOpen(true)} className="hover:text-pink-400 transition-colors">How It Works</button>
            <button onClick={() => setIsSuccessStoriesOpen(true)} className="hover:text-pink-400 transition-colors">Success Stories</button>
            <button onClick={() => setIsLoginOpen(true)} className="hover:text-pink-400 transition-colors">Member Portal</button>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-pink-300/80">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Neural Matching Online (2.4M Active)</span>
          </div>
        </div>
      </footer>

      {/* INTERACTIVE MODALS */}
      
      {/* 1. Chat Modal with active member */}
      {activeChatMember && (
        <ChatModal
          member={activeChatMember}
          onClose={() => setActiveChatMember(null)}
        />
      )}

      {/* 2. Full Profile Inspector */}
      {selectedProfile && (
        <ProfileModal
          member={selectedProfile}
          isLiked={likedMemberIds.has(selectedProfile.id)}
          onToggleLike={() => handleLikeMember(selectedProfile)}
          onStartChat={() => {
            const m = selectedProfile;
            setSelectedProfile(null);
            handleOpenChat(m);
          }}
          onClose={() => setSelectedProfile(null)}
        />
      )}

      {/* 3. Match Celebration Modal */}
      {celebrationMatch && (
        <MatchCelebrationModal
          member={celebrationMatch}
          onClose={() => setCelebrationMatch(null)}
          onSendMessage={() => {
            const m = celebrationMatch;
            setCelebrationMatch(null);
            handleOpenChat(m);
          }}
        />
      )}

      {/* 4. Join / Register Wizard */}
      {isJoinOpen && (
        <JoinModal
          onClose={() => setIsJoinOpen(false)}
          onSuccess={handleJoinSuccess}
        />
      )}

      {/* 5. Watch Video Showcase Modal */}
      {isVideoOpen && (
        <VideoModal
          onClose={() => setIsVideoOpen(false)}
          onJoinNow={() => setIsJoinOpen(true)}
        />
      )}

      {/* 6. Login Modal */}
      {isLoginOpen && (
        <LoginModal
          onClose={() => setIsLoginOpen(false)}
          onSwitchToJoin={() => {
            setIsLoginOpen(false);
            setIsJoinOpen(true);
          }}
        />
      )}

      {/* 7. Search Singles Modal */}
      {isSearchOpen && (
        <SearchModal
          members={allMembers}
          onSelectMember={(m) => setSelectedProfile(m)}
          onClose={() => setIsSearchOpen(false)}
        />
      )}

      {/* 8. Success Stories Modal */}
      {isSuccessStoriesOpen && (
        <SuccessStoriesModal
          onClose={() => setIsSuccessStoriesOpen(false)}
          onJoinNow={() => setIsJoinOpen(true)}
        />
      )}

    </div>
  );
}
