// app/admin/dashboard/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { Users, BookOpen, DollarSign, AlertTriangle, TrendingUp, Flag, Clock, ArrowUpRight, Eye, CheckCircle2, UserX, BarChart3 } from "lucide-react";

export const metadata: Metadata = { title: "Admin Dashboard" };

const KPI = [
  { label: "Total Users", value: "12,847", sub: "+543 this week", change: "+4.4%", icon: Users, color: "#22c55e" },
  { label: "Revenue (Mar)", value: "$9,840", sub: "+$890 vs Feb", change: "+9.9%", icon: DollarSign, color: "#3b82f6" },
  { label: "Flagged Content", value: "12", sub: "Needs review", change: "urgent", icon: Flag, color: "#ef4444" },
  { label: "Pending Approvals", value: "11", sub: "4 events · 7 jobs", change: "pending", icon: Clock, color: "#f59e0b" },
];

const TOP_COURSES = [
  { title: "PM Fundamentals", enrollments: 3420, rate: 78, revenue: "$0", level: "beginner" },
  { title: "Agile & Scrum", enrollments: 2180, rate: 65, revenue: "$0", level: "beginner" },
  { title: "Stakeholder Comms", enrollments: 1680, rate: 72, revenue: "$33.5k", level: "intermediate" },
  { title: "Risk Management", enrollments: 1240, rate: 68, revenue: "$37.2k", level: "intermediate" },
  { title: "PMP Bootcamp", enrollments: 890, rate: 58, revenue: "$89k", level: "advanced" },
];

const RECENT_USERS = [
  { name: "Jordan Lee", email: "jordan@gmail.com", level: "beginner", time: "2 min ago", status: "active" },
  { name: "Sofia Martinez", email: "sofia@hotmail.com", level: "intermediate", time: "18 min ago", status: "active" },
  { name: "Oliver Brown", email: "o.brown@yahoo.com", level: "beginner", time: "45 min ago", status: "active" },
  { name: "Emma Wilson", email: "emma.w@outlook.com", level: "advanced", time: "1h ago", status: "active" },
];

const FLAGS = [
  { title: "Misleading PMP advice post", user: "user_xxx", severity: "high", time: "30m ago" },
  { title: "Spam link in reply", user: "user_yyy", severity: "medium", time: "2h ago" },
  { title: "Off-topic promotion", user: "user_zzz", severity: "low", time: "5h ago" },
];

const DAU = [1120, 1340, 980, 1560, 1390, 1480, 1423];
const DAYS = ["Sa","Su","Mo","Tu","We","Th","Fr"];
const maxDAU = Math.max(...DAU);

const LEVEL_DOT = { beginner: "#22c55e", intermediate: "#3b82f6", advanced: "#a855f7" };

// Dark card wrapper
function DCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl p-5 ${className}`} style={{ background: "#0d1424", border: "1px solid #1e2a3d" }}>
      {children}
    </div>
  );
}

function StatLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "#4a6080" }}>{children}</p>;
}

export default function AdminDashboardPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <StatLabel>Admin Dashboard</StatLabel>
          <h1 className="text-2xl font-display font-bold text-white mt-1">Platform Overview</h1>
          <p className="text-xs mt-0.5" style={{ color: "#4a6080" }}>March 28, 2025 · Live data</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/analytics" className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all" style={{ background: "#151f30", color: "#94a3b8", border: "1px solid #1e2a3d" }}>
            <BarChart3 size={14} /> Full Analytics
          </Link>
          <Link href="/superadmin/dashboard" className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold" style={{ background: "linear-gradient(135deg, #7c3aed, #1d4ed8)", color: "white" }}>
            Super Admin →
          </Link>
        </div>
      </div>

      {/* ── KPI Cards ──────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {KPI.map((kpi) => (
          <DCard key={kpi.label}>
            <div className="flex items-start justify-between mb-4">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: kpi.color + "18" }}>
                <kpi.icon size={18} style={{ color: kpi.color }} />
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{
                background: kpi.change === "urgent" ? "#ef444418" : kpi.change === "pending" ? "#f59e0b18" : "#22c55e18",
                color: kpi.change === "urgent" ? "#ef4444" : kpi.change === "pending" ? "#f59e0b" : "#22c55e"
              }}>
                {kpi.change === "urgent" || kpi.change === "pending" ? kpi.change : `↑ ${kpi.change}`}
              </span>
            </div>
            <p className="text-2xl font-bold text-white">{kpi.value}</p>
            <StatLabel>{kpi.label}</StatLabel>
            <p className="text-xs mt-1" style={{ color: "#4a6080" }}>{kpi.sub}</p>
          </DCard>
        ))}
      </div>

      {/* ── Middle row: DAU chart + User breakdown ──────────────────── */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* DAU bar chart */}
        <DCard className="lg:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <div>
              <StatLabel>Daily Active Users</StatLabel>
              <p className="text-white font-semibold mt-0.5">Last 7 days</p>
            </div>
            <div className="flex gap-2">
              {["7d","30d","90d"].map((t, i) => (
                <button key={t} className="text-[10px] px-2.5 py-1 rounded-lg font-medium transition-all" style={{
                  background: i === 0 ? "#22c55e" : "#151f30",
                  color: i === 0 ? "white" : "#6b8aad",
                  border: "1px solid " + (i === 0 ? "#22c55e" : "#1e2a3d")
                }}>{t}</button>
              ))}
            </div>
          </div>
          <div className="flex items-end gap-3 h-40 mb-3">
            {DAU.map((v, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-[9px]" style={{ color: "#4a6080" }}>{v.toLocaleString()}</span>
                <div className="w-full relative rounded-t-xl overflow-hidden" style={{ height: `${(v/maxDAU)*110}px`, minHeight: 8 }}>
                  <div className="absolute inset-0 rounded-t-xl" style={{
                    background: i === 3
                      ? "linear-gradient(to top, #22c55e, #4ade80)"
                      : "linear-gradient(to top, #1d4ed8aa, #3b82f6aa)"
                  }} />
                </div>
                <span className="text-[10px] font-medium" style={{ color: i === 3 ? "#22c55e" : "#4a6080" }}>{DAYS[i]}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between text-[10px] pt-3 border-t" style={{ borderColor: "#1e2a3d", color: "#4a6080" }}>
            <span>Peak: <span className="text-white font-semibold">1,560</span> on Tuesday</span>
            <span>Weekly avg: <span className="text-white font-semibold">1,327/day</span></span>
            <span style={{ color: "#22c55e" }}>↑ 8.2% vs last week</span>
          </div>
        </DCard>

        {/* User level breakdown */}
        <DCard>
          <StatLabel>Users by Level</StatLabel>
          <p className="text-white font-semibold mt-0.5 mb-5">12,847 total</p>
          <div className="space-y-5">
            {[
              { level: "Beginner", count: 7420, pct: 58, color: "#22c55e" },
              { level: "Intermediate", count: 3840, pct: 30, color: "#3b82f6" },
              { level: "Advanced", count: 1587, pct: 12, color: "#a855f7" },
            ].map((item) => (
              <div key={item.level}>
                <div className="flex justify-between text-sm mb-2">
                  <span style={{ color: item.color }} className="font-medium">{item.level}</span>
                  <span className="text-white font-semibold">{item.count.toLocaleString()} <span style={{ color: "#4a6080" }}>({item.pct}%)</span></span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: "#1e2a3d" }}>
                  <div className="h-full rounded-full transition-all" style={{ width: `${item.pct}%`, backgroundColor: item.color }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 pt-4 border-t" style={{ borderColor: "#1e2a3d" }}>
            <div className="flex justify-between text-xs" style={{ color: "#4a6080" }}>
              <span>Premium users</span>
              <span className="text-white font-semibold">1,240 <span style={{ color: "#22c55e" }}>(9.7%)</span></span>
            </div>
            <div className="flex justify-between text-xs mt-2" style={{ color: "#4a6080" }}>
              <span>30-day retention</span>
              <span className="text-white font-semibold">54%</span>
            </div>
            <div className="flex justify-between text-xs mt-2" style={{ color: "#4a6080" }}>
              <span>NPS Score</span>
              <span className="font-semibold" style={{ color: "#22c55e" }}>8.4 / 10</span>
            </div>
          </div>
        </DCard>
      </div>

      {/* ── Bottom row: Top Courses + Recent Users + Flags ──────────── */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Top Courses */}
        <DCard>
          <div className="flex items-center justify-between mb-4">
            <div><StatLabel>Top Courses</StatLabel><p className="text-white font-semibold text-sm mt-0.5">Performance</p></div>
            <Link href="/admin/courses" className="text-[10px] font-semibold" style={{ color: "#22c55e" }}>View all →</Link>
          </div>
          <div className="space-y-3">
            {TOP_COURSES.slice(0, 4).map((course) => (
              <div key={course.title} className="flex items-center gap-3 p-2.5 rounded-xl" style={{ background: "#151f30" }}>
                <div className="w-1 h-8 rounded-full shrink-0" style={{ backgroundColor: LEVEL_DOT[course.level as keyof typeof LEVEL_DOT] }} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-white truncate">{course.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: "#1e2a3d" }}>
                      <div className="h-full rounded-full" style={{ width: `${course.rate}%`, backgroundColor: LEVEL_DOT[course.level as keyof typeof LEVEL_DOT] }} />
                    </div>
                    <span className="text-[9px]" style={{ color: "#4a6080" }}>{course.rate}%</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[10px] text-white font-semibold">{course.enrollments.toLocaleString()}</p>
                  <p className="text-[9px]" style={{ color: "#4a6080" }}>enrolled</p>
                </div>
              </div>
            ))}
          </div>
        </DCard>

        {/* Recent Signups */}
        <DCard>
          <div className="flex items-center justify-between mb-4">
            <div><StatLabel>New Users</StatLabel><p className="text-white font-semibold text-sm mt-0.5">Recent Signups</p></div>
            <Link href="/admin/users" className="text-[10px] font-semibold" style={{ color: "#3b82f6" }}>View all →</Link>
          </div>
          <div className="space-y-3">
            {RECENT_USERS.map((user) => (
              <div key={user.email} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-bold shrink-0" style={{ background: "linear-gradient(135deg, #1d4ed8, #7c3aed)" }}>
                  {user.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-white truncate">{user.name}</p>
                  <p className="text-[10px] truncate" style={{ color: "#4a6080" }}>{user.email}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: LEVEL_DOT[user.level as keyof typeof LEVEL_DOT] }} />
                    <span className="text-[9px] text-white">{user.level}</span>
                  </div>
                  <p className="text-[9px]" style={{ color: "#4a6080" }}>{user.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t text-center" style={{ borderColor: "#1e2a3d" }}>
            <p className="text-sm font-bold text-white">87</p>
            <p className="text-[10px]" style={{ color: "#22c55e" }}>signups today ↑</p>
          </div>
        </DCard>

        {/* Flagged Content */}
        <DCard>
          <div className="flex items-center justify-between mb-4">
            <div>
              <StatLabel>Moderation Queue</StatLabel>
              <p className="text-white font-semibold text-sm mt-0.5 flex items-center gap-1.5">
                <AlertTriangle size={13} style={{ color: "#ef4444" }} />
                Flagged Content
              </p>
            </div>
            <Link href="/admin/community" className="text-[10px] font-semibold" style={{ color: "#f59e0b" }}>Review →</Link>
          </div>
          <div className="space-y-3">
            {FLAGS.map((item, i) => (
              <div key={i} className="p-3 rounded-xl flex items-start gap-3" style={{
                background: item.severity === "high" ? "#ef444410" : item.severity === "medium" ? "#f59e0b10" : "#151f30",
                border: `1px solid ${item.severity === "high" ? "#ef444430" : item.severity === "medium" ? "#f59e0b30" : "#1e2a3d"}`
              }}>
                <div className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0" style={{
                  backgroundColor: item.severity === "high" ? "#ef4444" : item.severity === "medium" ? "#f59e0b" : "#374151",
                  color: "white"
                }}>
                  {item.severity === "high" ? "!" : "⚠"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-medium text-white leading-snug">{item.title}</p>
                  <p className="text-[9px] mt-0.5" style={{ color: "#4a6080" }}>{item.time}</p>
                </div>
                <div className="flex gap-1.5 shrink-0">
                  <button className="w-6 h-6 rounded-lg flex items-center justify-center transition-all hover:opacity-80" style={{ background: "#22c55e18" }}>
                    <CheckCircle2 size={11} style={{ color: "#22c55e" }} />
                  </button>
                  <button className="w-6 h-6 rounded-lg flex items-center justify-center transition-all hover:opacity-80" style={{ background: "#ef444418" }}>
                    <UserX size={11} style={{ color: "#ef4444" }} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t" style={{ borderColor: "#1e2a3d" }}>
            <p className="text-[10px] text-center" style={{ color: "#4a6080" }}>
              <span className="text-white font-semibold">12</span> items need review · <span style={{ color: "#22c55e" }}>AI moderation active</span>
            </p>
          </div>
        </DCard>
      </div>
    </div>
  );
}
