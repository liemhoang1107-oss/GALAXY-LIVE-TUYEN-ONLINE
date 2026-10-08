export interface ApplicationFormData {
  id: string;
  fullName: string;
  phone: string;
  zalo: string;
  birthYear: string;
  gender: 'female' | 'male' | 'other';
  city: string;
  platform: 'bigo' | 'tiktok' | 'both' | 'dance_offline' | 'other';
  liveHoursPerDay: string;
  shiftPreference: string;
  talents: string[];
  socialLink: string;
  note: string;
  createdAt: string;
  status: 'pending' | 'contacted' | 'audition_scheduled' | 'approved' | 'rejected';
}

export interface PlatformInfo {
  id: string;
  name: string;
  badge: string;
  logoColor: string;
  accentColor: string;
  tagline: string;
  description: string;
  baseSalary: string;
  giftShare: string;
  suitableFor: string[];
  highlights: string[];
  requirements: string[];
}

export interface TopIdol {
  id: string;
  name: string;
  age: number;
  platform: 'Bigo Live' | 'TikTok Live' | 'Đa Nền Tảng';
  badge: string;
  monthlyIncome: string;
  liveHours: string;
  talent: string;
  quote: string;
  image: string;
  growth: string;
  videoUrl?: string;
  youtubeId?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'policy' | 'salary' | 'equipment' | 'training';
}
