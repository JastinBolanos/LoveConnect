import { Member } from '../types';
import { FEATURED_MEMBERS, SARAH_MATCH, WOMEN_MUTUAL_MATCHES } from '../data/membersData';

export const memberService = {
  getInitialMembers(): Member[] {
    return [...FEATURED_MEMBERS, ...WOMEN_MUTUAL_MATCHES];
  },

  getInitialLikedIds(): Set<string> {
    return new Set<string>([
      SARAH_MATCH.id,
      ...WOMEN_MUTUAL_MATCHES.map((m) => m.id),
    ]);
  },

  getMutualMatches(members: Member[], likedIds: Set<string>): Member[] {
    return members.filter((member) => likedIds.has(member.id));
  },

  searchMembers(members: Member[], query: string): Member[] {
    const term = query.trim().toLowerCase();
    if (!term) return members;

    return members.filter(
      (member) =>
        member.name.toLowerCase().includes(term) ||
        member.city.toLowerCase().includes(term) ||
        member.profession.toLowerCase().includes(term) ||
        member.interests.some((interest) => interest.toLowerCase().includes(term))
    );
  },
};
