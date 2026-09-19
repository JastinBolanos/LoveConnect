import { ConversationPreview } from '../types';

export const chatService = {
  getConversationPreviews(): ConversationPreview[] {
    return [
      {
        memberId: 'sarah-26',
        lastMessage: 'Hey! Loved your bio about stargazing & synthwave ✨ When are you free?',
        time: '10:42 AM',
        unread: true,
      },
      {
        memberId: 'elena-25',
        lastMessage: 'Totally agree on sunset photography! Have you visited the south beach piers?',
        time: 'Yesterday',
        unread: true,
      },
      {
        memberId: 'camila-24',
        lastMessage: 'That holographic lighting concept sounds unreal! Would love to chat more.',
        time: 'Yesterday',
        unread: true,
      },
      {
        memberId: 'chloe-27',
        lastMessage: 'Did you hear the new synth album that dropped last week?',
        time: 'Tuesday',
        unread: false,
      },
      {
        memberId: 'valeria-26',
        lastMessage: 'Ocean sunsets never get old 🌅',
        time: 'Sep 15',
        unread: false,
      },
    ];
  },

  getQuickReplies(name: string): string[] {
    return [
      `Hey ${name}! Having a great day now 😊`,
      `Love your profile vibe! What synth track are you playing? 🎧`,
      `Would love to get coffee or matcha this week! ☕`,
    ];
  },
};
