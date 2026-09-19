export interface Member {
  id: string;
  name: string;
  age: number;
  city: string;
  country: string;
  gender: 'female' | 'male' | 'non-binary';
  image: string;
  isOnline: boolean;
  isVerified: boolean;
  bio: string;
  matchScore: number;
  profession: string;
  interests: string[];
  zodiac?: string;
  height?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  age: number;
  location: string;
  image: string;
  quote: string;
  rating: number;
  story: string;
  yearsTogether: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'match';
  text: string;
  timestamp: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  iconName: 'heart' | 'shield' | 'message' | 'gift';
}
