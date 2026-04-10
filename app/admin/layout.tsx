// app/admin/layout.tsx
import Link from "next/link";
import {
  LayoutDashboard, Users, BookOpen, Calendar, MessageSquare,
  Briefcase, BarChart3, Settings, Shield, Bell, Search,
  ChevronDown, Zap, LogOut, Clock
} from "lucide-react";

const adminNav = [
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

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-[calc(100vh-64px)]" style={{ background: "#0a0f1e" }}>
      {/* ── Dark Sidebar ──────────────────────────────────────────── */}
      <aside className="hidden lg:flex w-60 shrink-0 flex-col border-r" style={{ background: "#0d1424", borderColor: "#1e2a3d" }}>
        {/* Logo / Brand */}
        <div className="p-5 border-b" style={{ borderColor: "#1e2a3d" }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #16a34a, #0891b2)" }}>
              <span className="text-white font-bold text-sm">PM</span>
            </div>
            <div>
              <p className="text-white font-bold text-sm">PMPath</p>
              <p className="text-[10px]" style={{ color: "#4a6080" }}>Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Admin user */}
        <div className="px-4 py-3 border-b" style={{ borderColor: "#1e2a3d" }}>
          <div className="flex items-center gap-3 p-2 rounded-xl cursor-pointer" style={{ background: "#151f30" }}>
            <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-bold shrink-0" style={{ background: "linear-gradient(135deg, #1d4ed8, #7c3aed)" }}>S</div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">Sarah Chen</p>
              <p className="text-[10px] truncate" style={{ color: "#22c55e" }}>● Admin</p>
            </div>
            <ChevronDown size={12} style={{ color: "#4a6080" }} />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {adminNav.map((item) => (
            <Link key={item.href} href={item.href}
              className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#6b8aad] transition-all hover:bg-[#1a2840] hover:text-[#e2e8f0]"
            >
              <item.icon size={16} />
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Super Admin link */}
        <div className="p-3 space-y-1 border-t" style={{ borderColor: "#1e2a3d" }}>
          <Link href="/superadmin/dashboard"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
            style={{ background: "linear-gradient(135deg, #7c3aed20, #1d4ed820)", color: "#a78bfa", border: "1px solid #7c3aed30" }}
          >
            <Shield size={16} />
            <span className="flex-1">Super Admin</span>
            <Zap size={12} />
          </Link>
          <button
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#ef4444] transition-all hover:bg-[#ef444410]"
          >
            <LogOut size={16} /><span>Logout</span>
          </button>
        </div>
      </aside>

      {/* ── Main area ─────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <div className="shrink-0 px-6 py-3.5 flex items-center gap-4 border-b" style={{ background: "#0d1424", borderColor: "#1e2a3d" }}>
          <div className="flex-1 relative hidden sm:block">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#4a6080" }} />
            <input
              placeholder="Search users, courses, events..."
              className="w-72 pl-9 pr-4 py-2 text-xs rounded-xl border text-white placeholder-opacity-50 focus:outline-none transition-all"
              style={{ background: "#151f30", borderColor: "#1e2a3d", color: "#94a3b8" }}
            />
          </div>
          <div className="flex items-center gap-3 ml-auto">
            <button className="relative p-2 rounded-xl transition-all" style={{ background: "#151f30" }}>
              <Bell size={16} style={{ color: "#6b8aad" }} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 border" style={{ borderColor: "#0d1424" }} />
            </button>
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: "#151f30" }}>
              <div className="w-6 h-6 rounded-lg flex items-center justify-center text-white text-[10px] font-bold" style={{ background: "linear-gradient(135deg, #1d4ed8, #7c3aed)" }}>S</div>
              <span className="text-xs font-medium" style={{ color: "#94a3b8" }}>Sarah Chen</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto" style={{ background: "#0a0f1e" }}>
          {children}
        </div>
      </div>
    </div>
  );
}
