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
  Settings,
  Shield,
  Users,
  Zap,
} from "lucide-react";
import type { SidebarNavItem } from "@/components/layout/DashboardSidebar";

export const dashboardNav: SidebarNavItem[] = [
  { href: "/", label: "Home", icon: Home },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, active: true },
  { href: "/learn/beginner", label: "Learn", icon: BookOpen },
  { href: "/events", label: "Events", icon: Calendar },
  { href: "/community", label: "Community", icon: MessageSquare },
  { href: "/mentorship", label: "Mentorship", icon: Users },
];

export const adminNav: SidebarNavItem[] = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard, active: true },
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

export const superAdminNav: SidebarNavItem[] = [
  { href: "/superadmin/dashboard", label: "SA Dashboard", icon: LayoutDashboard, active: true },
  { href: "/superadmin/admins", label: "Manage Admins", icon: Users },
  { href: "/superadmin/security", label: "Security Center", icon: Shield },
  { href: "/superadmin/logs", label: "Audit Logs", icon: Activity },
  { href: "/superadmin/system", label: "System Config", icon: Database },
  { href: "/superadmin/settings", label: "SA Settings", icon: Settings },
];
