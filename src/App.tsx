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
import { SuccessStoriesView } from './components/SuccessStoriesView';
import { MessagesView } from './components/MessagesView';
import { FEATURED_MEMBERS, SARAH_MATCH, WOMEN_MUTUAL_MATCHES, SUCCESS_STORIES } from './data/membersData';
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

  // User Interactive State - Initialize with Sarah + 8 new women mutual matches
  const initialLikedIds = new Set<string>([
    SARAH_MATCH.id,
    ...WOMEN_MUTUAL_MATCHES.map((m) => m.id)
  ]);
  const [likedMemberIds, setLikedMemberIds] = useState<Set<string>>(initialLikedIds);
  const [unreadCount, setUnreadCount] = useState(3);
  const [allMembers, setAllMembers] = useState<Member[]>([...FEATURED_MEMBERS, ...WOMEN_MUTUAL_MATCHES]);

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
              showAll={true}
            />
          </div>
        )}

        {/* MATCHES TAB */}
        {activeTab === 'Matches' && (
          <div className="w-full px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20 2xl:px-24 py-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-3xl sm:text-4xl font-black text-white flex items-center gap-3">
                  <span>Your Mutual Matches</span>
                  <span className="text-pink-400 text-2xl animate-bounce">🎉</span>
                  <span className="text-xs px-3 py-1 rounded-full bg-pink-500/20 border border-pink-400/40 text-pink-300 font-bold tracking-wide">
                    {allMembers.filter((m) => likedMemberIds.has(m.id)).length} Mujeres Matches
                  </span>
                </h1>
                <p className="text-sm text-pink-200/80 mt-1">
                  Chicas solteras verificadas que dieron like a tu perfil. ¡Inicia una conversación!
                </p>
              </div>
              <button
                onClick={() => setActiveTab('Home')}
                className="text-xs sm:text-sm font-bold text-pink-400 hover:text-pink-300 transition-colors flex items-center gap-1 self-start sm:self-auto cursor-pointer"
              >
                ← Back to Home
              </button>
            </div>

            {/* Grid of Matches - All Women (Sarah + 8 New Female Matches) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
              {allMembers
                .filter((m) => likedMemberIds.has(m.id))
                .map((m, idx) => (
                  <div
                    key={m.id}
                    id={`match-card-${m.id}`}
                    onClick={() => setSelectedProfile(m)}
                    className="bg-gradient-to-b from-[#1c0f3d] to-[#120826] border border-pink-500/30 hover:border-pink-400/70 rounded-3xl p-5 flex items-center gap-4 shadow-xl hover:shadow-pink-500/20 relative overflow-hidden group transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                  >
                    {/* Glowing rotating pink border & breathing photo */}
                    <div className="relative p-[2.5px] rounded-2xl overflow-hidden shrink-0 animate-pink-glow shadow-md">
                      <div
                        className="absolute -inset-[100%] w-[300%] h-[300%] -left-[100%] -top-[100%] animate-rotate-border pointer-events-none"
                        style={{
                          background: 'conic-gradient(from 0deg, #ec4899 0deg, #f43f5e 90deg, #ffffff 180deg, #f472b6 270deg, #ec4899 360deg)',
                          animationDelay: `${idx * 0.25}s`,
                        }}
                      />
                      <div className="relative w-20 h-20 rounded-[13.5px] overflow-hidden bg-gray-900 z-10 flex items-center justify-center">
                        <img
                          src={m.image}
                          alt={m.name}
                          className="w-full h-full object-cover animate-photo-shrink-expand will-change-transform"
                          style={{
                            animationDelay: `${idx * 0.3}s`,
                          }}
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>

                    {/* Member Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <h3 className="text-lg font-extrabold text-white truncate group-hover:text-pink-300 transition-colors">
                          {m.name}, {m.age}
                        </h3>
                        <span className="text-xs font-black text-pink-400 shrink-0 bg-pink-950/60 px-2 py-0.5 rounded-full border border-pink-500/30">
                          {m.matchScore}% Match
                        </span>
                      </div>
                      <p className="text-xs text-pink-200/70 truncate">
                        {m.city} • {m.matchedTime || 'Liked you today'}
                      </p>
                      <p className="text-[11px] text-pink-300/80 font-medium mb-3 truncate">
                        {m.profession}
                      </p>
                      
                      {/* Action Buttons */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenChat(m);
                          }}
                          className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-xs font-extrabold text-white shadow-md shadow-pink-500/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <MessageCircle className="w-3.5 h-3.5 fill-white/80" />
                          <span>Chat</span>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProfile(m);
                          }}
                          className="py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-pink-200 hover:text-white transition-all cursor-pointer"
                          title="Ver perfil completo"
                        >
                          Ver
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* MESSAGES TAB */}
        {activeTab === 'Messages' && (
          <MessagesView
            members={allMembers}
            onOpenChat={(m) => handleOpenChat(m)}
            onBackToHome={() => setActiveTab('Home')}
            onExploreSingles={() => setActiveTab('Browse')}
          />
        )}

        {/* SUCCESS STORIES TAB */}
        {activeTab === 'Success Stories' && (
          <SuccessStoriesView
            onBackToHome={() => setActiveTab('Home')}
            onJoinFree={() => setIsJoinOpen(true)}
            onFindMatch={() => setActiveTab('Matches')}
          />
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
