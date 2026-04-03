"use client";
// components/layout/Navbar.tsx
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  BookOpen, Calendar, Users, Briefcase, Home, Menu, X,
  ChevronDown, Flame, Star, GraduationCap, Target, Bell,
  User, Settings, LogOut, Award, MessageSquare, Zap
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  {
    label: "Learn",
    icon: BookOpen,
    children: [
      { href: "/learn/beginner", label: "Beginner Path", icon: Target, color: "text-beginner" },
      { href: "/learn/intermediate", label: "Intermediate", icon: GraduationCap, color: "text-intermediate" },
      { href: "/learn/advanced", label: "Advanced & PMP", icon: Star, color: "text-advanced" },
      { href: "/learn/advanced/flashcards", label: "Flashcards", icon: Zap, color: "text-amber-600" },
      { href: "/learn/advanced/mockexam", label: "Mock Exam", icon: Award, color: "text-purple-600" },
      { href: "/learn/intermediate/kanban", label: "Kanban Builder", icon: BookOpen, color: "text-blue-600" },
      { href: "/learn/advanced/studygroups", label: "Study Groups", icon: Users, color: "text-teal-600" },
      { href: "/roadmap", label: "My Roadmap", icon: Target, color: "text-brand-600" },
    ],
  },
  { href: "/events", label: "Events", icon: Calendar },
  { href: "/community", label: "Community", icon: Users },
  { href: "/jobs", label: "Jobs", icon: Briefcase },
  { href: "/mentorship", label: "Mentorship", icon: MessageSquare },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [learnOpen, setLearnOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // Hide main navbar for admin/superadmin routes
  if (pathname.startsWith("/admin") || pathname.startsWith("/superadmin")) {
    return null;
  }

  return (
    <nav className="sticky top-0 z-50 h-[var(--nav-height)] bg-white/80 backdrop-blur-xl border-b border-surface-3/80 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-sm">PM</span>
          </div>
          <span className="font-display font-bold text-xl text-ink">
            PM<span className="text-brand-600">Path</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-0.5 flex-1">
          {navItems.map((item) => {
            if (item.children) {
              return (
                <div key={item.label} className="relative">
                  <button
                    onClick={() => setLearnOpen(!learnOpen)}
                    className={cn(
                      "nav-link",
                      item.children.some((c) => pathname.startsWith(c.href)) && "nav-link-active"
                    )}
                  >
                    <item.icon size={15} />
                    {item.label}
                    <ChevronDown size={13} className={cn("transition-transform", learnOpen && "rotate-180")} />
                  </button>
                  {learnOpen && (
                    <div className="absolute top-full left-0 mt-2 w-60 card shadow-lg p-2 space-y-0.5 animate-slide-up">
                      {item.children.map((child) => (
                        <Link key={child.href} href={child.href} onClick={() => setLearnOpen(false)}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-surface-1 transition-colors">
                          <child.icon size={14} className={child.color} />
                          <span className="text-sm font-medium text-ink">{child.label}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            return (
              <Link key={item.href} href={item.href!}
                className={cn(pathname === item.href ? "nav-link-active" : "nav-link")}>
                <item.icon size={15} />
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Desktop right */}
        <div className="hidden md:flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-orange-50 border border-orange-200">
            <Flame size={13} className="text-orange-500" />
            <span className="text-xs font-bold text-orange-700">7</span>
          </div>

          {/* Notification bell */}
          <div className="relative">
            <Link href="/notifications" className="relative p-2 rounded-xl hover:bg-surface-1 transition-colors block">
              <Bell size={17} className="text-ink-muted" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 border-2 border-white" />
            </Link>
          </div>

          {/* Profile dropdown */}
          <div className="relative">
            <button onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 pl-1 pr-3 py-1.5 rounded-xl hover:bg-surface-1 transition-colors border border-surface-3">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-400 to-brand-700 flex items-center justify-center text-white text-xs font-bold">A</div>
              <span className="text-sm font-medium text-ink">Alex</span>
              <ChevronDown size={13} className={cn("text-ink-muted transition-transform", profileOpen && "rotate-180")} />
            </button>
            {profileOpen && (
              <div className="absolute top-full right-0 mt-2 w-52 card shadow-lg p-2 space-y-0.5 animate-slide-up">
                {[
                  { href: "/dashboard", icon: Home, label: "Dashboard" },
                  { href: "/profile", icon: User, label: "My Profile" },
                  { href: "/certificates", icon: Award, label: "Certificates" },
                  { href: "/settings", icon: Settings, label: "Settings" },
                ].map((item) => (
                  <Link key={item.href} href={item.href} onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-surface-1 transition-colors text-sm text-ink-muted hover:text-ink">
                    <item.icon size={14} />
                    {item.label}
                  </Link>
                ))}
                <div className="border-t border-surface-2 pt-1 mt-1">
                  <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg w-full text-sm text-red-500 hover:bg-red-50 transition-colors">
                    <LogOut size={14} />Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 rounded-lg hover:bg-surface-2 transition-colors">
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-x-0 top-[var(--nav-height)] bg-white/95 backdrop-blur-xl border-b border-surface-3 shadow-lg p-4 space-y-1 animate-slide-up max-h-[80vh] overflow-y-auto">
          {navItems.map((item) => {
            if (item.children) {
              return item.children.map((child) => (
                <Link key={child.href} href={child.href} onClick={() => setMobileOpen(false)}
                  className={cn("nav-link", pathname.startsWith(child.href) && "nav-link-active")}>
                  <child.icon size={15} className={child.color} />
                  {child.label}
                </Link>
              ));
            }
            return (
              <Link key={item.href} href={item.href!} onClick={() => setMobileOpen(false)}
                className={cn("nav-link", pathname === item.href && "nav-link-active")}>
                <item.icon size={15} />
                {item.label}
              </Link>
            );
          })}
          <div className="pt-3 border-t border-surface-2 space-y-1">
            {[
              { href: "/dashboard", label: "Dashboard", icon: Home },
              { href: "/profile", label: "Profile", icon: User },
              { href: "/certificates", label: "Certificates", icon: Award },
              { href: "/notifications", label: "Notifications", icon: Bell },
              { href: "/settings", label: "Settings", icon: Settings },
            ].map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className="nav-link">
                <item.icon size={15} />
                {item.label}
              </Link>
            ))}
            <div className="pt-2 flex gap-2">
              <Link href="/auth/signup" className="btn-primary flex-1 justify-center">Get Started</Link>
              <Link href="/auth/login" className="btn-secondary flex-1 justify-center">Log In</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
