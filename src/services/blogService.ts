import { BlogPost } from '../types';

export const blogService = {
  getPosts(): BlogPost[] {
    return [
      {
        id: 'post-1',
        category: 'Dating Science',
        title: 'How Neural Compatibility Predicts Chemistry',
        description:
          'Moving beyond surface-level swipes: how analyzing cadence, shared aesthetic taste, and psychological resonance creates marriages that last.',
      },
      {
        id: 'post-2',
        category: 'Date Ideas',
        title: '5 Holographic Video Date Ideas for Introverts',
        description:
          'From virtual synthwave lounge listening sessions to synchronized recipe cooking across miles.',
      },
      {
        id: 'post-3',
        category: 'Security',
        title: 'Biometric Verification & Anti-Catfish Protocols',
        description:
          'Ensuring 100% human-verified connections across the global dating network.',
      },
    ];
  },
};
