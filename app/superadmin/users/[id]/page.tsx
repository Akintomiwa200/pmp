// app/admin/users/[id]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, User, Mail, MapPin, Calendar, Trophy, Flame, BookOpen, MessageSquare, UserX, Shield, Edit2 } from "lucide-react";

export const metadata: Metadata = { title: "User Detail | Admin" };

const DEMO_USER = {
  _id: "usr_002",
  name: "Priya Sharma",
  email: "priya@example.com",
  avatar: "P",
  level: "intermediate",
  subscription: "premium",
  status: "active",
  bio: "3 years in operations, transitioning to formal PM. Agile enthusiast.",
  location: "London, UK",
  linkedIn: "https://linkedin.com/in/priyasharma",
  streak: 30,
  totalPoints: 4560,
  badges: ["first_login", "course_complete", "community_star", "streak_30"],
  joinedAt: "Aug 20, 2024",
  lastActiveAt: "30 minutes ago",
  completedModules: 42,
  enrolledCourses: 3,
  communityPosts: 12,
  flags: 0,
  goals: ["Master Agile methodologies", "Lead a cross-functional team"],
  quizAvgScore: 84,
};

const ACTIVITY = [
  { type: "quiz", desc: "Passed Risk Management Quiz — 84%", time: "2h ago", icon: "📊" },
  { type: "module", desc: "Completed: Stakeholder Communication", time: "1d ago", icon: "✅" },
  { type: "post", desc: "Posted in Community: 'Resources for EVM?'", time: "3d ago", icon: "💬" },
  { type: "login", desc: "Logged in", time: "4d ago", icon: "🔐" },
  { type: "module", desc: "Completed: Risk Assessment Matrix", time: "5d ago", icon: "✅" },
];

function DCard({ children }: { children: React.ReactNode }) {
  return <div className="rounded-2xl p-5" style={{ background: "#0d1424", border: "1px solid #1e2a3d" }}>{children}</div>;
}

const LEVEL_COLOR: Record<string, string> = { beginner: "#22c55e", intermediate: "#3b82f6", advanced: "#a855f7" };

export default function AdminUserDetailPage({ params }: { params: { id: string } }) {
  const lc = LEVEL_COLOR[DEMO_USER.level];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/users" className="flex items-center gap-2 text-sm transition-all" style={{ color: "#4a6080" }}>
          <ChevronLeft size={14} /> All Users
        </Link>
        <span style={{ color: "#1e2a3d" }}>/</span>
        <span className="text-sm text-white">{DEMO_USER.name}</span>
      </div>

      {/* Header */}
      <DCard>
        <div className="flex items-start gap-5 flex-wrap">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shrink-0" style={{ background: `linear-gradient(135deg, ${lc}, ${lc}99)` }}>
            {DEMO_USER.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div>
                <h1 className="text-xl font-bold text-white">{DEMO_USER.name}</h1>
                <p className="text-sm" style={{ color: "#4a6080" }}>{DEMO_USER.email}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "#22c55e18", color: "#22c55e" }}>● Active</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full capitalize" style={{ background: lc+"18", color: lc }}>
                  {DEMO_USER.level}
                </span>
                {DEMO_USER.subscription === "premium" && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "#a855f718", color: "#a855f7" }}>Premium</span>
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-4 mt-3 text-xs" style={{ color: "#4a6080" }}>
              <span className="flex items-center gap-1"><MapPin size={11} />{DEMO_USER.location}</span>
              <span className="flex items-center gap-1"><Calendar size={11} />Joined {DEMO_USER.joinedAt}</span>
              <span className="flex items-center gap-1"><User size={11} />Last active {DEMO_USER.lastActiveAt}</span>
            </div>
          </div>
          <div className="flex gap-2 shrink-0">
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all" style={{ background: "#22c55e18", color: "#22c55e", border: "1px solid #22c55e30" }}>
              <Edit2 size={12} /> Edit
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all" style={{ background: "#3b82f618", color: "#60a5fa", border: "1px solid #3b82f630" }}>
              <Shield size={12} /> Reset PW
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all" style={{ background: "#ef444418", color: "#ef4444", border: "1px solid #ef444430" }}>
              <UserX size={12} /> Suspend
            </button>
          </div>
        </div>
      </DCard>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Points", value: DEMO_USER.totalPoints.toLocaleString(), icon: Trophy, color: "#f59e0b" },
          { label: "Streak", value: `${DEMO_USER.streak}d`, icon: Flame, color: "#f97316" },
          { label: "Modules Done", value: DEMO_USER.completedModules, icon: BookOpen, color: "#22c55e" },
          { label: "Community Posts", value: DEMO_USER.communityPosts, icon: MessageSquare, color: "#3b82f6" },
        ].map((stat) => (
          <DCard key={stat.label}>
            <div className="flex items-center gap-2 mb-1">
              <stat.icon size={14} style={{ color: stat.color }} />
              <span className="text-[10px]" style={{ color: "#4a5568" }}>{stat.label}</span>
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
          </DCard>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Profile info */}
        <DCard>
          <p className="text-[10px] font-bold uppercase tracking-wider mb-3" style={{ color: "#4a5568" }}>Profile</p>
          <div className="space-y-3">
            {DEMO_USER.bio && <p className="text-sm" style={{ color: "#94a3b8" }}>{DEMO_USER.bio}</p>}
            <div className="space-y-2 text-sm" style={{ color: "#4a6080" }}>
              {DEMO_USER.goals.map((g) => (
                <div key={g} className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full" style={{ background: lc }} />{g}</div>
              ))}
            </div>
            <div className="pt-3 border-t" style={{ borderColor: "#1e2a3d" }}>
              <p className="text-[10px]" style={{ color: "#4a5568" }}>Quiz Average</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: "#1e2a3d" }}>
                  <div className="h-full rounded-full" style={{ width: `${DEMO_USER.quizAvgScore}%`, background: lc }} />
                </div>
                <span className="text-sm font-bold text-white">{DEMO_USER.quizAvgScore}%</span>
              </div>
            </div>
          </div>
        </DCard>

        {/* Activity log */}
        <DCard>
          <p className="text-[10px] font-bold uppercase tracking-wider mb-3" style={{ color: "#4a5568" }}>Recent Activity</p>
          <div className="space-y-3">
            {ACTIVITY.map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl" style={{ background: "#111827" }}>
                <span className="text-lg shrink-0">{item.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-white truncate">{item.desc}</p>
                </div>
                <span className="text-[10px] shrink-0" style={{ color: "#4a5568" }}>{item.time}</span>
              </div>
            ))}
          </div>
        </DCard>
      </div>

      {/* Badges */}
      <DCard>
        <p className="text-[10px] font-bold uppercase tracking-wider mb-3" style={{ color: "#4a5568" }}>Badges Earned</p>
        <div className="flex flex-wrap gap-2">
          {DEMO_USER.badges.map((b) => (
            <div key={b} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-white" style={{ background: "#1e2a3d" }}>
              {b === "first_login" ? "🎉" : b === "course_complete" ? "🎓" : b === "community_star" ? "⭐" : b === "streak_30" ? "⚡" : "🏅"} {b.replace(/_/g, " ")}
            </div>
          ))}
        </div>
      </DCard>
    </div>
  );
}
