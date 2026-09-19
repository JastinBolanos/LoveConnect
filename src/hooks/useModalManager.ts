import { useState, useCallback } from 'react';
import { Member } from '../types';

export function useModalManager() {
  const [isJoinOpen, setIsJoinOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSuccessStoriesOpen, setIsSuccessStoriesOpen] = useState(false);
  const [activeChatMember, setActiveChatMember] = useState<Member | null>(null);
  const [selectedProfile, setSelectedProfile] = useState<Member | null>(null);

  const openJoin = useCallback(() => setIsJoinOpen(true), []);
  const closeJoin = useCallback(() => setIsJoinOpen(false), []);

  const openLogin = useCallback(() => setIsLoginOpen(true), []);
  const closeLogin = useCallback(() => setIsLoginOpen(false), []);

  const openVideo = useCallback(() => setIsVideoOpen(true), []);
  const closeVideo = useCallback(() => setIsVideoOpen(false), []);

  const openSearch = useCallback(() => setIsSearchOpen(true), []);
  const closeSearch = useCallback(() => setIsSearchOpen(false), []);

  const openSuccessStories = useCallback(() => setIsSuccessStoriesOpen(true), []);
  const closeSuccessStories = useCallback(() => setIsSuccessStoriesOpen(false), []);

  const openChat = useCallback((member: Member) => setActiveChatMember(member), []);
  const closeChat = useCallback(() => setActiveChatMember(null), []);

  const openProfile = useCallback((member: Member) => setSelectedProfile(member), []);
  const closeProfile = useCallback(() => setSelectedProfile(null), []);

  return {
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
  };
}
