import { Member, Testimonial, FeatureItem } from '../types';

export const FEATURED_MEMBERS: Member[] = [
  {
    id: 'sophia-27',
    name: 'Sophia',
    age: 27,
    city: 'New York',
    country: 'USA',
    gender: 'female',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80',
    isOnline: true,
    isVerified: true,
    bio: 'Art director & synthwave enthusiast. Exploring rooftop galleries, indie film marathons, and cyberpunk aesthetics.',
    matchScore: 97,
    profession: 'Creative Director',
    interests: ['Digital Art', 'Synthwave', 'Photography', 'Matcha', 'Travel'],
    zodiac: 'Scorpio',
    height: "5'7\""
  },
  {
    id: 'liam-30',
    name: 'Liam',
    age: 30,
    city: 'Los Angeles',
    country: 'USA',
    gender: 'male',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    isOnline: true,
    isVerified: true,
    bio: 'Architect passionate about sustainable smart cities. Weekend surfer, vinyl record collector, and espresso purist.',
    matchScore: 94,
    profession: 'Urban Architect',
    interests: ['Architecture', 'Surfing', 'Vinyl', 'Coffee Culture', 'Design'],
    zodiac: 'Leo',
    height: "6'1\""
  },
  {
    id: 'olivia-25',
    name: 'Olivia',
    age: 25,
    city: 'Chicago',
    country: 'USA',
    gender: 'female',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    isOnline: true,
    isVerified: true,
    bio: 'Biotech researcher by day, festival goer by night. Lover of warm hats, deep conversations, and stargazing.',
    matchScore: 92,
    profession: 'Bioinformatics Lead',
    interests: ['Neuroscience', 'Live Music', 'Astronomy', 'Hiking', 'Cider'],
    zodiac: 'Taurus',
    height: "5'5\""
  },
  {
    id: 'noah-29',
    name: 'Noah',
    age: 29,
    city: 'Miami',
    country: 'USA',
    gender: 'male',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    isOnline: true,
    isVerified: true,
    bio: 'Fintech founder with a passion for night boat rides, Latin jazz, and street photography around Wynwood.',
    matchScore: 95,
    profession: 'Tech Entrepreneur',
    interests: ['Sailing', 'Jazz', 'Cryptocurrency', 'Fitness', 'Sunset Cocktails'],
    zodiac: 'Sagittarius',
    height: "6'0\""
  },
  {
    id: 'emma-26',
    name: 'Emma',
    age: 26,
    city: 'Dallas',
    country: 'USA',
    gender: 'female',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    isOnline: true,
    isVerified: true,
    bio: 'Product designer obsessed with sleek neon typography, culinary adventures, and cozy book nooks.',
    matchScore: 96,
    profession: 'UI/UX Designer',
    interests: ['Typography', 'Baking', 'Board Games', 'Sci-Fi', 'Yoga'],
    zodiac: 'Libra',
    height: "5'6\""
  },
  {
    id: 'james-31',
    name: 'James',
    age: 31,
    city: 'Seattle',
    country: 'USA',
    gender: 'male',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
    isOnline: true,
    isVerified: true,
    bio: 'Aerospace engineer building tomorrow. Passionate about mountain trekking, craft cider, and acoustic guitar.',
    matchScore: 91,
    profession: 'Aerospace Systems',
    interests: ['Rock Climbing', 'Aviation', 'Acoustic Guitar', 'Camping', 'Robotics'],
    zodiac: 'Capricorn',
    height: "6'2\""
  },
  {
    id: 'maya-24',
    name: 'Maya',
    age: 24,
    city: 'Austin',
    country: 'USA',
    gender: 'female',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
    isOnline: true,
    isVerified: true,
    bio: 'Sound designer & VR game creator. Looking for someone to explore neon night markets and share playlists.',
    matchScore: 98,
    profession: 'Sound & Audio Designer',
    interests: ['VR Gaming', 'Synth', 'Tacos', 'Night Cycling', 'Cyberpunk'],
    zodiac: 'Gemini',
    height: "5'4\""
  },
  {
    id: 'lucas-28',
    name: 'Lucas',
    age: 28,
    city: 'San Francisco',
    country: 'USA',
    gender: 'male',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80',
    isOnline: true,
    isVerified: true,
    bio: 'AI researcher and avid runner. Always ready to debate the future of humanity or find the best ramen spot.',
    matchScore: 93,
    profession: 'AI Engineer',
    interests: ['Marathon', 'Ramen', 'Philosophy', 'Podcasts', 'Generative Art'],
    zodiac: 'Aquarius',
    height: "5'11\""
  }
];

export const SARAH_MATCH: Member = {
  id: 'sarah-26',
  name: 'Sarah',
  age: 26,
  city: 'Austin',
  country: 'USA',
  gender: 'female',
  image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80',
  isOnline: true,
  isVerified: true,
  bio: 'Visual artist and synth lover. Excited to find someone who gets the vibe!',
  matchScore: 99,
  profession: 'Concept Artist',
  interests: ['Digital Art', 'Synthwave', 'Stargazing', 'Coffee']
};

export const JESSICA_TESTIMONIAL: Testimonial = {
  id: 'jessica-28',
  name: 'Jessica',
  age: 28,
  location: 'Chicago, USA',
  image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
  quote: 'I found my soulmate here. Very happy! 💖',
  rating: 5,
  story: 'We matched in 2024 through the smart bio-algorithm and got engaged under the northern lights last spring!',
  yearsTogether: '2 years together'
};

export const SUCCESS_STORIES: Testimonial[] = [
  JESSICA_TESTIMONIAL,
  {
    id: 'david-elena',
    name: 'Elena & David',
    age: 30,
    location: 'San Francisco, USA',
    image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=500&q=80',
    quote: 'From our first holographic video date to our wedding day. Best decision ever! ✨',
    rating: 5,
    story: 'We were skeptical about digital algorithms, but the neural match was 99% accurate on values, humor, and life goals.',
    yearsTogether: 'Married 1 year'
  },
  {
    id: 'mateo-chloe',
    name: 'Chloe & Mateo',
    age: 27,
    location: 'Barcelona, Spain',
    image: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&w=500&q=80',
    quote: 'Instant chemistry! We bonded over retro arcade games and indie cinema.',
    rating: 5,
    story: 'LoveConnect connected us across 500 miles, and now we live together in our dream studio.',
    yearsTogether: 'Together 3 years'
  }
];

export const BOTTOM_FEATURES: FeatureItem[] = [
  {
    id: 'smart-matching',
    title: 'Smart Matching',
    description: 'Our advanced algorithm finds your perfect match',
    iconName: 'heart'
  },
  {
    id: 'safe-secure',
    title: 'Safe & Secure',
    description: 'Your privacy and safety are our top priority',
    iconName: 'shield'
  },
  {
    id: 'real-connections',
    title: 'Real Connections',
    description: 'Meaningful conversations lead to real relationships',
    iconName: 'message'
  },
  {
    id: 'premium-benefits',
    title: 'Premium Benefits',
    description: 'Unlock exciting features and exclusive perks',
    iconName: 'gift'
  }
];

export const HERO_HEART_HANDS_IMAGE = 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1800&q=85';
export const HERO_PREVIOUS_IMAGE = 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1800&q=85';
export const HERO_COUPLE_IMAGE = 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1800&q=85';
export const USER_AVATAR = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80';
