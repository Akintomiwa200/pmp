"use client";

import {
  Home,
  LayoutDashboard,
  TrendingUp,
  CircleUserRound,
  Bell,
  Settings,
  BookOpen,
  Calendar,
  MessageSquare,
  Users,
  Flame,
  Trophy,
  Clock,
  Target,
  Award,
  CheckCircle2,
  Zap,
  BarChart3,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Home,
  LayoutDashboard,
  TrendingUp,
  CircleUserRound,
  Bell,
  Settings,
  BookOpen,
  Calendar,
  MessageSquare,
  Users,
  Flame,
  Trophy,
  Clock,
  Target,
  Award,
  CheckCircle2,
  Zap,
  BarChart3,
};

interface IconMapperProps {
  name: string;
  size?: number;
  className?: string;
}

export function IconMapper({ name, size = 16, className }: IconMapperProps) {
  const Icon = iconMap[name];
  if (!Icon) {
    console.warn(`Icon "${name}" not found in iconMap`);
    return null;
  }
  return <Icon size={size} className={className} />;
}