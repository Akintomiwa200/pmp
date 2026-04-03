// types/index.ts

export type Level = "beginner" | "intermediate" | "advanced" | "all";
export type SubscriptionTier = "free" | "premium";
export type EventFormat = "virtual" | "in_person" | "hybrid";
export type EventType = "conference" | "webinar" | "workshop" | "meetup" | "study_group";
export type JobType = "full_time" | "part_time" | "contract" | "internship" | "freelance";
export type JobLevel = "intern" | "entry" | "mid" | "senior" | "lead";

export interface User {
  _id: string;
  name: string;
  email: string;
  password?: string;
  avatar?: string;
  level: Level;
  goals: string[];
  badges: string[];
  streak: number;
  totalPoints: number;
  joinedAt: string;
  lastActiveAt: string;
  completedModules: string[];
  enrolledCourses: string[];
  mentorId?: string | null;
  isMentor: boolean;
  menteeIds?: string[];
  subscription: SubscriptionTier;
  bio?: string;
  location?: string;
  linkedIn?: string;
}

export interface Course {
  _id: string;
  title: string;
  slug: string;
  level: Level;
  description: string;
  thumbnail?: string;
  color: string;
  duration: string;
  lessonCount: number;
  enrolledCount: number;
  rating: number;
  instructor: string;
  tags: string[];
  modules: string[];
  prerequisites: string[];
  learningOutcomes: string[];
  isFree: boolean;
  price?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Module {
  _id: string;
  courseId: string;
  title: string;
  order: number;
  duration: string;
  type: string;
  content: {
    videoUrl?: string;
    articleMarkdown?: string;
    downloadables?: { name: string; url: string }[];
  };
  quiz?: string;
  isPreview: boolean;
  completedBy: string[];
}

export interface QuizQuestion {
  _id: string;
  question: string;
  type: "multiple_choice" | "scenario" | "true_false";
  options: string[];
  correctAnswer: number;
  explanation: string;
  points: number;
}

export interface Quiz {
  _id: string;
  moduleId: string;
  title: string;
  questions: QuizQuestion[];
  passingScore: number;
  timeLimit: number;
  difficulty: Level;
}

export interface EventLocation {
  city?: string;
  country?: string;
  venue?: string;
  address?: string;
  virtualLink?: string;
}

export interface PMEvent {
  _id: string;
  title: string;
  description: string;
  type: EventType;
  format: EventFormat;
  location: EventLocation;
  startDate: string;
  endDate: string;
  recurrence?: string;
  price: { inPerson?: number; virtual?: number; memberDiscount?: number };
  speakers: string[];
  topics: string[];
  registrationUrl: string;
  maxAttendees: number;
  registeredCount: number;
  isFeatured: boolean;
  level: Level;
  organizer: string;
  image?: string;
  tags: string[];
}

export interface Reply {
  _id: string;
  content: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  upvotes: number;
  upvotedBy: string[];
  createdAt: string;
  isExpert: boolean;
}

export interface Post {
  _id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  level: Level;
  category: string;
  tags: string[];
  upvotes: number;
  upvotedBy: string[];
  replies: Reply[];
  createdAt: string;
  updatedAt: string;
  isPinned: boolean;
  isResolved: boolean;
}

export interface Job {
  _id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  type: JobType;
  level: JobLevel;
  salary: { min: number; max: number; currency: string; period?: string };
  description: string;
  requirements: string[];
  benefits: string[];
  applyUrl: string;
  postedAt: string;
  expiresAt: string;
  tags: string[];
  isFeatured: boolean;
  isRemote: boolean;
}

export interface Mentor {
  _id: string;
  mentorId: string;
  mentorName: string;
  mentorAvatar?: string;
  expertise: string[];
  industry: string[];
  availability: string;
  sessionFormat: string[];
  rating: number;
  reviewCount: number;
  menteeCount: number;
  maxMentees: number;
  bio: string;
  languages: string[];
  timezone: string;
  isAccepting: boolean;
  matchScore?: number | null;
}

export interface Progress {
  _id: string;
  userId: string;
  courseId: string;
  completedModules: string[];
  totalModules: number;
  percentComplete: number;
  quizScores: Record<string, {
    score: number;
    attempts: number;
    passed: boolean;
    completedAt: string;
  }>;
  lastAccessedAt: string;
  startedAt: string;
  certificateEarned: boolean;
  certificateEarnedAt?: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export const BADGES: Record<string, Badge> = {
  first_login: { id: "first_login", name: "Welcome!", description: "Joined PMPath", icon: "🎉", color: "#16a34a" },
  quiz_ace: { id: "quiz_ace", name: "Quiz Ace", description: "Scored 100% on a quiz", icon: "🎯", color: "#0891b2" },
  streak_7: { id: "streak_7", name: "Week Warrior", description: "7-day learning streak", icon: "🔥", color: "#f97316" },
  streak_30: { id: "streak_30", name: "Month Master", description: "30-day streak", icon: "⚡", color: "#7c3aed" },
  streak_90: { id: "streak_90", name: "Legend", description: "90-day streak", icon: "👑", color: "#f59e0b" },
  course_complete: { id: "course_complete", name: "Course Grad", description: "Completed a course", icon: "🎓", color: "#16a34a" },
  community_star: { id: "community_star", name: "Community Star", description: "10+ upvotes on a post", icon: "⭐", color: "#f59e0b" },
  mentor_badge: { id: "mentor_badge", name: "Mentor", description: "Became a mentor", icon: "🤝", color: "#2563eb" },
  pmp_prep: { id: "pmp_prep", name: "PMP Ready", description: "Completed PMP Bootcamp", icon: "📜", color: "#7c3aed" },
};
