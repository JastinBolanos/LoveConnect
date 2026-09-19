import { useState, useCallback } from 'react';
import { Member } from '../types';
import { memberService } from '../services/memberService';

export function useMemberMatches() {
  const [allMembers, setAllMembers] = useState<Member[]>(() => memberService.getInitialMembers());
  const [likedMemberIds, setLikedMemberIds] = useState<Set<string>>(() => memberService.getInitialLikedIds());
  const [celebrationMatch, setCelebrationMatch] = useState<Member | null>(null);

  const toggleLike = useCallback((member: Member, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    setLikedMemberIds((prev) => {
      const next = new Set(prev);
      if (next.has(member.id)) {
        next.delete(member.id);
      } else {
        next.add(member.id);
        setCelebrationMatch(member);
      }
      return next;
    });
  }, []);

  const addMatchedMembers = useCallback((newMatches: Member[]) => {
    setLikedMemberIds((prev) => {
      const next = new Set(prev);
      newMatches.forEach((m) => next.add(m.id));
      return next;
    });

    if (newMatches.length > 0) {
      setCelebrationMatch(newMatches[0]);
    }
  }, []);

  const clearCelebrationMatch = useCallback(() => {
    setCelebrationMatch(null);
  }, []);

  return {
    allMembers,
    setAllMembers,
    likedMemberIds,
    toggleLike,
    addMatchedMembers,
    celebrationMatch,
    clearCelebrationMatch,
  };
}
