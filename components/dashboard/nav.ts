// components/dashboard/nav.ts
import {
  Activity,
  BarChart3,
  BookOpen,
  Briefcase,
  Calendar,
  Clock,
  Database,
  Home,
  LayoutDashboard,
  MessageSquare,
  Bell,
  CircleUserRound,
  Settings,
  Shield,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

import type { SidebarNavItem } from "@/components/layout/DashboardSidebar";

// Dashboard navigation - using string icons (as before)
export const dashboardNav: SidebarNavItem[] = [
  { href: "/", label: "Home", icon: "Home" },
  { href: "/dashboard", label: "Overview", icon: "LayoutDashboard" },
  { href: "/dashboard/progress", label: "Progress", icon: "TrendingUp" },
  { href: "/dashboard/profile", label: "Profile", icon: "CircleUserRound" },
  { href: "/dashboard/notifications", label: "Notifications", icon: "Bell" },
  { href: "/dashboard/settings", label: "Settings", icon: "Settings" },
  { href: "/learn/beginner", label: "Learn", icon: "BookOpen" },
  { href: "/events", label: "Events", icon: "Calendar" },
  { href: "/community", label: "Community", icon: "MessageSquare" },
  { href: "/mentorship", label: "Mentorship", icon: "Users" },
];

// Admin navigation - using actual Lucide components
export const adminNav: SidebarNavItem[] = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/courses", label: "Courses", icon: BookOpen },
  { href: "/admin/quizzes", label: "Quizzes", icon: Zap },
  { href: "/admin/exams/new", label: "Schedule Exam", icon: Clock },
  { href: "/admin/events", label: "Events", icon: Calendar },
  { href: "/admin/community", label: "Community", icon: MessageSquare },
  { href: "/admin/jobs", label: "Jobs", icon: Briefcase },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

// Super Admin navigation
export const superAdminNav: SidebarNavItem[] = [
  { href: "/superadmin/dashboard", label: "SA Dashboard", icon: LayoutDashboard },
  { href: "/superadmin/admins", label: "Manage Admins", icon: Users },
  { href: "/superadmin/security", label: "Security Center", icon: Shield },
  { href: "/superadmin/logs", label: "Audit Logs", icon: Activity },
  { href: "/superadmin/system", label: "System Config", icon: Database },
  { href: "/superadmin/settings", label: "SA Settings", icon: Settings },
];