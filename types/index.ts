export interface User {
  _id: string;
  name: string;
  email: string;
  image?: string;
  username: string;
  bio?: string;
  city?: string;
  country: string;
  skillsTeach: Skill[];
  skillsLearn: Skill[];
  level: number;
  xp: number;
  badges: Badge[];
  rating: number;
  reviewCount: number;
  isVerified: boolean;
  isOnline: boolean;
  lastSeen: Date;
  socialLinks?: SocialLinks;
  joinedAt: Date;
  completedExchanges: number;
  languages: string[];
}

export interface Skill {
  name: string;
  category: SkillCategory;
  level: ExperienceLevel;
  description?: string;
}

export type SkillCategory =
  | "technology"
  | "design"
  | "business"
  | "language"
  | "music"
  | "cooking"
  | "fitness"
  | "art"
  | "writing"
  | "science"
  | "crafts"
  | "other";

export type ExperienceLevel = "beginner" | "intermediate" | "advanced" | "expert";

export interface Exchange {
  _id: string;
  requester: User;
  receiver: User;
  requesterSkill: Skill;
  receiverSkill: Skill;
  status: ExchangeStatus;
  message?: string;
  sessions: Session[];
  createdAt: Date;
  updatedAt: Date;
}

export type ExchangeStatus =
  | "pending"
  | "accepted"
  | "rejected"
  | "active"
  | "completed"
  | "cancelled";

export interface Session {
  _id: string;
  exchangeId: string;
  date: Date;
  duration: number; // minutes
  meetLink?: string;
  status: "scheduled" | "completed" | "cancelled";
  notes?: string;
}

export interface Message {
  _id: string;
  conversationId: string;
  senderId: string;
  content: string;
  type: "text" | "image" | "file";
  readBy: string[];
  createdAt: Date;
}

export interface Conversation {
  _id: string;
  participants: User[];
  lastMessage?: Message;
  exchangeId?: string;
  updatedAt: Date;
}

export interface Review {
  _id: string;
  reviewer: User;
  reviewee: User;
  exchangeId: string;
  rating: number;
  comment: string;
  skillTaught: string;
  createdAt: Date;
}

export interface Notification {
  _id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  link?: string;
  isRead: boolean;
  createdAt: Date;
  fromUser?: Pick<User, "_id" | "name" | "image" | "username">;
}

export type NotificationType =
  | "exchange_request"
  | "exchange_accepted"
  | "exchange_rejected"
  | "new_message"
  | "new_review"
  | "session_reminder"
  | "badge_earned"
  | "level_up";

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: Date;
}

export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  website?: string;
}

export interface LeaderboardEntry {
  rank: number;
  user: User;
  xp: number;
  exchanges: number;
}

export interface SkillStats {
  category: SkillCategory;
  count: number;
  trending: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export const SKILL_CATEGORIES: { value: SkillCategory; label: string; icon: string; color: string }[] = [
  { value: "technology", label: "Technology", icon: "💻", color: "neon-green" },
  { value: "design", label: "Design", icon: "🎨", color: "neon-cyan" },
  { value: "business", label: "Business", icon: "📊", color: "neon-purple" },
  { value: "language", label: "Languages", icon: "🌍", color: "yellow" },
  { value: "music", label: "Music", icon: "🎵", color: "pink" },
  { value: "cooking", label: "Cooking", icon: "🍳", color: "orange" },
  { value: "fitness", label: "Fitness", icon: "💪", color: "red" },
  { value: "art", label: "Art & Crafts", icon: "✏️", color: "indigo" },
  { value: "writing", label: "Writing", icon: "✍️", color: "teal" },
  { value: "science", label: "Science", icon: "🔬", color: "blue" },
  { value: "crafts", label: "Crafts", icon: "🔨", color: "amber" },
  { value: "other", label: "Other", icon: "⭐", color: "gray" },
];

export const MOROCCAN_CITIES = [
  "Casablanca", "Rabat", "Fès", "Marrakech", "Agadir",
  "Tanger", "Meknès", "Oujda", "Tétouan", "Safi",
  "El Jadida", "Beni Mellal", "Kénitra", "Nador", "Settat",
];

export const EXPERIENCE_LEVELS: { value: ExperienceLevel; label: string }[] = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
  { value: "expert", label: "Expert" },
];

export const XP_LEVELS = [
  { level: 1, minXP: 0, maxXP: 100, title: "Novice" },
  { level: 2, minXP: 100, maxXP: 300, title: "Apprentice" },
  { level: 3, minXP: 300, maxXP: 600, title: "Learner" },
  { level: 4, minXP: 600, maxXP: 1000, title: "Practitioner" },
  { level: 5, minXP: 1000, maxXP: 1500, title: "Skilled" },
  { level: 6, minXP: 1500, maxXP: 2200, title: "Expert" },
  { level: 7, minXP: 2200, maxXP: 3000, title: "Master" },
  { level: 8, minXP: 3000, maxXP: 4000, title: "Grand Master" },
  { level: 9, minXP: 4000, maxXP: 5500, title: "Legend" },
  { level: 10, minXP: 5500, maxXP: Infinity, title: "Grandmaster" },
];
