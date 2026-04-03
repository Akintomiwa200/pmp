// app/dashboard/page.tsx
"use client";
import Link from "next/link";
import {
  Home, LayoutDashboard, BookOpen, Calendar, MessageSquare,
  Settings, LogOut, Bell, Search, Play, CheckCircle2, Flame,
  ArrowUpRight, Clock, Users, Target, Zap, Trophy, Award,
  TrendingUp, BarChart3, Star, ChevronRight
} from "lucide-react";

function ProgressRing({ pct, size = 72, stroke = 6, color = "#16a34a" }: {
  pct: number; size?: number; stroke?: number; color?: string;
}) {
  const r = (size - stroke * 2) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#f1f5f9" strokeWidth={stroke} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-base font-bold text-ink">{pct}%</span>
      </div>
    </div>
  );
}

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data), min = Math.min(...data);
  const H = 28, W = 72;
  const pts = data.map((v, i) => `${(i/(data.length-1))*W},${H-((v-min)/(max-min||1))*H}`).join(" ");
  return <svg width={W} height={H} className="overflow-visible"><polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

const NAV = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard", active: true },
  { href: "/learn/beginner", icon: BookOpen, label: "Learn" },
  { href: "/events", icon: Calendar, label: "Events" },
  { href: "/community", icon: MessageSquare, label: "Community" },
  { href: "/mentorship", icon: Users, label: "Mentorship" },
];

const ANALYSIS_CARDS = [
  { num: "01", pct: 25, color: "#16a34a", label: "PM Fundamentals", score: 78, trend: [60,65,70,68,72,75,78] },
  { num: "02", pct: 50, color: "#2563eb", label: "Agile & Scrum", score: 84, trend: [70,72,78,75,82,80,84] },
  { num: "03", pct: 75, color: "#7c3aed", label: "Risk Mgmt", score: 91, trend: [80,82,85,88,87,90,91] },
  { num: "04", pct: 100, color: "#0891b2", label: "Foundations", score: 100, trend: [90,92,95,96,98,99,100] },
];

const WEEKLY = [
  { day: "Mon", mins: 45 }, { day: "Tue", mins: 80 }, { day: "Wed", mins: 30 },
  { day: "Thu", mins: 95 }, { day: "Fri", mins: 60 }, { day: "Sat", mins: 20 }, { day: "Sun", mins: 75 },
];
const maxMins = Math.max(...WEEKLY.map(d => d.mins));

// Quick action links — linking to ALL major PRD features
const QUICK_ACTIONS = [
  { icon: Target, label: "My Roadmap", href: "/roadmap", color: "text-brand-600 bg-brand-50", badge: "25% done" },
  { icon: Zap, label: "Take a Quiz", href: "/quiz", color: "text-amber-600 bg-amber-50", badge: "Adaptive" },
  { icon: BarChart3, label: "Mock PMP Exam", href: "/learn/advanced/mockexam", color: "text-purple-600 bg-purple-50", badge: "3 exams" },
  { icon: TrendingUp, label: "Weak Areas", href: "/learn/advanced/analytics", color: "text-red-600 bg-red-50", badge: "AI-powered" },
  { icon: Users, label: "Study Groups", href: "/learn/advanced/studygroups", color: "text-teal-600 bg-teal-50", badge: "4 groups" },
  { icon: Trophy, label: "Leaderboard", href: "/leaderboard", color: "text-amber-600 bg-amber-50", badge: "#847" },
  { icon: Award, label: "Certificates", href: "/certificates", color: "text-brand-600 bg-brand-50", badge: "1 earned" },
  { icon: Star, label: "Mentorship", href: "/mentorship/match", color: "text-pink-600 bg-pink-50", badge: "AI match" },
];

export default function DashboardPage() {
  return (
    <div className="flex h-[calc(100vh-64px)] bg-[#eef2f7] font-body overflow-hidden">

      {/* Sidebar */}
      <aside className="hidden lg:flex w-56 shrink-0 flex-col bg-white border-r border-slate-200/60 shadow-sm">
        <div className="p-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-brand-400 to-brand-700 flex items-center justify-center text-white font-bold text-sm shadow-sm">A</div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-ink truncate">Alex Rivera</p>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                <span className="text-[10px] text-ink-subtle">Beginner</span>
              </div>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-0.5">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${item.active ? "bg-brand-600 text-white shadow-sm" : "text-slate-500 hover:bg-slate-50 hover:text-ink"}`}>
              <item.icon size={16} />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-3 space-y-0.5 border-t border-slate-100">
          <Link href="/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:bg-slate-50">
            <Settings size={16} /><span>Settings</span>
          </Link>
          <Link href="/feedback" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:bg-slate-50">
            <Star size={16} /><span>Give Feedback</span>
          </Link>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-50 transition-colors">
            <LogOut size={16} /><span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 overflow-y-auto">
        {/* Top bar */}
        <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-slate-200/60 px-6 py-3.5 flex items-center gap-4">
          <div className="flex-1">
            <h1 className="text-base font-bold text-ink">Dashboard</h1>
            <p className="text-[11px] text-slate-400">March 28, THU</p>
          </div>
          <div className="relative hidden sm:block">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input placeholder="Search courses, events..." className="pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-brand-400 focus:bg-white w-44 transition-all" />
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 border border-orange-200 rounded-full">
            <Flame size={13} className="text-orange-500" />
            <span className="text-[11px] font-bold text-orange-700">7 days</span>
          </div>
          <Link href="/notifications" className="relative p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
            <Bell size={17} className="text-slate-500" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 border-2 border-white" />
          </Link>
        </div>

        <div className="p-5 space-y-5 max-w-[1140px]">

          {/* Analysis rings row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {ANALYSIS_CARDS.map((card) => (
              <div key={card.num} className="bg-white rounded-2xl p-4 shadow-card">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Analysis</p>
                    <div className="flex gap-1 mt-1">
                      <button className="text-[8px] px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-500">Month</button>
                      <button className="text-[8px] px-1.5 py-0.5 rounded-md bg-brand-600 text-white">Year</button>
                    </div>
                  </div>
                  <span className="text-xl font-display font-bold text-slate-200">{card.num}</span>
                </div>
                <div className="flex items-center gap-3">
                  <ProgressRing pct={card.pct} color={card.color} />
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-semibold text-ink leading-snug">{card.label}</p>
                    <Sparkline data={card.trend} color={card.color} />
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-slate-100">
                  <span className="text-sm font-bold text-ink">{card.score}</span>
                  <button className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ backgroundColor: card.color + "18" }}>
                    <ArrowUpRight size={12} style={{ color: card.color }} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions — all PRD features accessible */}
          <div className="bg-white rounded-2xl p-5 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-ink">Quick Actions</h2>
              <Link href="/progress" className="text-xs text-brand-600 hover:underline">Full Progress →</Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {QUICK_ACTIONS.map(action => (
                <Link key={action.href} href={action.href}
                  className="flex flex-col items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all text-center group">
                  <div className={`w-9 h-9 rounded-xl ${action.color} flex items-center justify-center`}>
                    <action.icon size={18} />
                  </div>
                  <p className="text-[11px] font-semibold text-ink group-hover:text-brand-700 transition-colors">{action.label}</p>
                  <span className="text-[9px] text-ink-subtle">{action.badge}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Weekly chart + daily stats */}
          <div className="grid lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 bg-white rounded-2xl p-5 shadow-card">
              <div className="flex items-center justify-between mb-5">
                <p className="text-sm font-semibold text-ink">Weekly Activity</p>
                <div className="flex gap-1">
                  <button className="text-[8px] px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-500">Month</button>
                  <button className="text-[8px] px-1.5 py-0.5 rounded-md bg-brand-600 text-white">Week</button>
                </div>
              </div>
              <div className="flex items-end gap-3 h-36">
                {WEEKLY.map((d, i) => (
                  <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full relative rounded-t-xl overflow-hidden" style={{ height: `${(d.mins/maxMins)*120}px`, minHeight: 8 }}>
                      <div className="absolute inset-0 rounded-t-xl" style={{
                        background: i === 3 ? "linear-gradient(to top, #16a34a, #4ade80)" : "linear-gradient(to top, #2563eb99, #60a5fa99)"
                      }} />
                    </div>
                    <span className="text-[10px] font-medium text-slate-400">{d.day}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl p-5 shadow-card space-y-4">
              <p className="text-sm font-semibold text-ink">This Week</p>
              {[
                { label: "Points Earned", value: "1,240", data: [400,600,700,850,1000,1100,1240], color: "#2563eb" },
                { label: "Learning Hours", value: "14h", data: [2,4,6,7,9,12,14], color: "#16a34a" },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex-1">
                    <p className="text-xs text-slate-400">{item.label}</p>
                    <p className="text-base font-bold text-ink">{item.value}</p>
                  </div>
                  <Sparkline data={item.data} color={item.color} />
                </div>
              ))}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                <p className="text-xs text-slate-400 mb-2">Overall Progress</p>
                <div className="flex justify-center">
                  <svg width="110" height="62" viewBox="0 0 110 62">
                    <path d="M 12 55 A 43 43 0 0 1 98 55" fill="none" stroke="#f1f5f9" strokeWidth="9" strokeLinecap="round" />
                    <path d="M 12 55 A 43 43 0 0 1 98 55" fill="none" stroke="#16a34a" strokeWidth="9"
                      strokeDasharray={`${(52/100)*135} 135`} strokeLinecap="round" />
                    <text x="55" y="52" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">52%</text>
                  </svg>
                </div>
                <div className="flex justify-between text-[9px] text-slate-400 px-3">
                  <span>0%</span><span className="text-brand-600 font-semibold">Goal: 100%</span><span>100%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Continue learning + streak */}
          <div className="grid lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 bg-white rounded-2xl p-5 shadow-card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-ink">Continue Learning</h2>
                <Link href="/learn/beginner" className="text-xs text-brand-600 hover:underline flex items-center gap-0.5">View all <ChevronRight size={11} /></Link>
              </div>
              <div className="space-y-3">
                {[
                  { title: "PM Fundamentals", module: "Module 4: Stakeholder Mapping", pct: 25, color: "#16a34a", time: "25 min", href: "/learn/beginner/stakeholders" },
                  { title: "Agile & Scrum", module: "Module 2: Running Sprints", pct: 40, color: "#2563eb", time: "35 min", href: "/learn/beginner/agile-vs-waterfall" },
                ].map(course => (
                  <div key={course.title} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-slate-200 transition-all group">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: course.color + "15" }}>
                      <BookOpen size={18} style={{ color: course.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-ink">{course.title}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{course.module}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${course.pct}%`, backgroundColor: course.color }} />
                        </div>
                        <span className="text-[10px] text-slate-400">{course.pct}%</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <span className="text-[10px] text-slate-400 flex items-center gap-1"><Clock size={9} />{course.time}</span>
                      <Link href={course.href} className="w-8 h-8 rounded-xl flex items-center justify-center text-white group-hover:scale-105 transition-transform" style={{ backgroundColor: course.color }}>
                        <Play size={12} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-5 shadow-card">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center">
                    <Flame size={18} className="text-orange-500" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-ink">7 days</p>
                    <p className="text-[10px] text-slate-400">Streak 🔥</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  {["M","T","W","T","F","S","S"].map((d, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div className={`w-full h-5 rounded-md flex items-center justify-center text-[8px] font-bold ${i < 7 ? "bg-orange-400 text-white" : "bg-slate-100 text-slate-300"}`}>
                        {i < 7 ? "✓" : ""}
                      </div>
                      <span className="text-[8px] text-slate-400">{d}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-2xl p-5 shadow-card">
                <p className="text-sm font-semibold text-ink mb-3">Badges</p>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { icon: "🎉", name: "Welcome", e: true }, { icon: "🎯", name: "Quiz Ace", e: true },
                    { icon: "🔥", name: "Streak 7", e: true }, { icon: "⚡", name: "Streak 30", e: false },
                    { icon: "👑", name: "Legend", e: false }, { icon: "🎓", name: "Grad", e: false },
                  ].map(b => (
                    <div key={b.name} className={`flex flex-col items-center gap-1 p-2 rounded-xl ${b.e ? "bg-amber-50 border border-amber-100" : "bg-slate-50 opacity-40"}`}>
                      <span className="text-lg">{b.icon}</span>
                      <span className="text-[8px] text-slate-500 text-center">{b.name}</span>
                    </div>
                  ))}
                </div>
                <Link href="/profile" className="text-xs text-brand-600 hover:underline mt-3 block text-center">View all badges →</Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
