// app/progress/page.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import { Flame, Trophy, Star, CheckCircle2, TrendingUp, Download, Award, BarChart3, Clock, Target, Zap, BookOpen } from "lucide-react";

const WEEKLY_DATA = [
  { day: "Mon", mins: 45, modules: 1 }, { day: "Tue", mins: 80, modules: 2 },
  { day: "Wed", mins: 0, modules: 0 }, { day: "Thu", mins: 95, modules: 3 },
  { day: "Fri", mins: 60, modules: 1 }, { day: "Sat", mins: 20, modules: 1 },
  { day: "Sun", mins: 75, modules: 2 },
];
const maxMins = Math.max(...WEEKLY_DATA.map(d => d.mins));

const COURSE_PROGRESS = [
  { title: "PM Fundamentals", pct: 25, color: "#16a34a", modules: "3/12", timeLeft: "3h 10m", cert: false },
  { title: "Agile & Scrum", pct: 40, color: "#2563eb", modules: "7/18", timeLeft: "3h 30m", cert: false },
];

const COMPLETED = [
  { title: "PM Glossary Mastery", date: "Mar 15, 2025", type: "achievement" },
  { title: "Module: What is PM?", date: "Mar 10, 2025", type: "module" },
  { title: "Module: PM Lifecycle", date: "Mar 12, 2025", type: "module" },
  { title: "Module: Agile vs Waterfall", date: "Mar 15, 2025", type: "module" },
];

const BADGES = [
  { icon: "🎉", name: "Welcome!", desc: "Joined PMPath", earned: true, date: "Jan 15, 2025" },
  { icon: "🎯", name: "Quiz Ace", desc: "100% on a quiz", earned: true, date: "Mar 10, 2025" },
  { icon: "🔥", name: "Week Warrior", desc: "7-day streak", earned: true, date: "Mar 28, 2025" },
  { icon: "⚡", name: "Month Master", desc: "30-day streak", earned: false, date: null },
  { icon: "👑", name: "Legend", desc: "90-day streak", earned: false, date: null },
  { icon: "🎓", name: "Course Grad", desc: "Complete a course", earned: false, date: null },
  { icon: "⭐", name: "Community Star", desc: "10+ upvotes", earned: false, date: null },
  { icon: "🤝", name: "Mentor", desc: "Became a mentor", earned: false, date: null },
  { icon: "📜", name: "PMP Ready", desc: "Completed PMP Bootcamp", earned: false, date: null },
];

export default function ProgressPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "courses" | "badges" | "history">("overview");

  const totalMins = WEEKLY_DATA.reduce((a, d) => a + d.mins, 0);
  const activeDays = WEEKLY_DATA.filter(d => d.mins > 0).length;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="section-tag mb-3"><TrendingUp size={12} />Progress</p>
          <h1 className="text-4xl font-display font-bold text-ink mb-1">My Progress</h1>
          <p className="text-ink-muted">Track your learning journey, badges, and streaks.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2.5 bg-orange-50 border border-orange-200 rounded-full">
          <Flame size={16} className="text-orange-500" />
          <span className="font-bold text-orange-700">7 day streak 🔥</span>
        </div>
      </div>

      {/* Top stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { icon: Trophy, label: "Total Points", value: "1,240", color: "text-amber-600 bg-amber-50" },
          { icon: BookOpen, label: "Modules Done", value: "12", color: "text-brand-600 bg-brand-50" },
          { icon: Clock, label: "Learning Time", value: "14h", color: "text-blue-600 bg-blue-50" },
          { icon: Target, label: "Current Rank", value: "#847", color: "text-purple-600 bg-purple-50" },
        ].map(s => (
          <div key={s.label} className="card p-5">
            <div className={`w-9 h-9 rounded-xl ${s.color} flex items-center justify-center mb-3`}>
              <s.icon size={18} />
            </div>
            <p className="text-2xl font-display font-bold text-ink">{s.value}</p>
            <p className="text-xs text-ink-subtle mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-surface-3 gap-0.5 mb-8">
        {(["overview", "courses", "badges", "history"] as const).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-5 py-2.5 text-sm font-medium capitalize border-b-2 -mb-px transition-colors ${activeTab === tab ? "text-brand-700 border-brand-600" : "text-ink-muted border-transparent hover:text-ink"}`}>
            {tab}
          </button>
        ))}
      </div>

      {/* Overview tab */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Weekly activity chart */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-semibold text-ink">This Week's Activity</h2>
              <div className="flex gap-4 text-xs text-ink-subtle">
                <span>{totalMins} min total</span>
                <span>{activeDays} active days</span>
              </div>
            </div>
            <div className="flex items-end gap-3 h-36">
              {WEEKLY_DATA.map((d, i) => (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-[9px] text-ink-subtle">{d.mins > 0 ? `${d.mins}m` : ""}</span>
                  <div className="w-full relative rounded-t-xl overflow-hidden" style={{ height: d.mins > 0 ? `${(d.mins / maxMins) * 120}px` : "6px", minHeight: "6px" }}>
                    <div className="absolute inset-0 rounded-t-xl" style={{
                      background: d.mins === 0 ? "#f1f5f9" : i === 3 ? "linear-gradient(to top, #16a34a, #4ade80)" : "linear-gradient(to top, #2563eb99, #60a5fa99)"
                    }} />
                  </div>
                  <span className="text-[10px] font-medium text-ink-muted">{d.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Streak calendar */}
          <div className="card p-5">
            <h2 className="font-semibold text-ink mb-4">Learning Streak</h2>
            <div className="flex items-center gap-1 flex-wrap">
              {Array.from({ length: 28 }).map((_, i) => {
                const active = [0,1,3,4,6,7,8,10,11,12,14,15,17,18,20,21,22,24,25,26,27].includes(i);
                const today = i === 27;
                return (
                  <div key={i} className={`w-7 h-7 rounded-lg flex items-center justify-center ${today ? "ring-2 ring-brand-400 ring-offset-1" : ""} ${active ? "bg-brand-500" : "bg-surface-2"}`}>
                    {today && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                );
              })}
            </div>
            <div className="flex items-center gap-4 mt-4 text-xs text-ink-subtle">
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-brand-500 inline-block" /> Active day</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-surface-2 inline-block" /> No activity</span>
              <span className="ml-auto">Last 28 days</span>
            </div>
          </div>

          {/* Goals progress */}
          <div className="card p-5">
            <h2 className="font-semibold text-ink mb-4 flex items-center gap-2"><Target size={16} className="text-brand-600" />Goal Progress</h2>
            <div className="space-y-4">
              {[
                { goal: "Get PMP certified in 6 months", pct: 12, milestone: "Just started PM Fundamentals" },
                { goal: "Land a PM role within 6 months", pct: 18, milestone: "Building portfolio — 2 of 5 projects done" },
              ].map(g => (
                <div key={g.goal}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="font-medium text-ink">{g.goal}</span>
                    <span className="text-ink-subtle">{g.pct}%</span>
                  </div>
                  <div className="h-2.5 bg-surface-2 rounded-full overflow-hidden mb-1">
                    <div className="h-full bg-brand-500 rounded-full" style={{ width: `${g.pct}%` }} />
                  </div>
                  <p className="text-xs text-ink-subtle">{g.milestone}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Courses tab */}
      {activeTab === "courses" && (
        <div className="space-y-5">
          <h2 className="font-semibold text-ink">Active Courses</h2>
          {COURSE_PROGRESS.map(course => (
            <div key={course.title} className="card p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-ink">{course.title}</h3>
                <span className="text-sm font-bold" style={{ color: course.color }}>{course.pct}%</span>
              </div>
              <div className="h-3 bg-surface-2 rounded-full overflow-hidden mb-3">
                <div className="h-full rounded-full" style={{ width: `${course.pct}%`, background: course.color }} />
              </div>
              <div className="flex items-center justify-between text-xs text-ink-subtle">
                <span><BookOpen size={10} className="inline mr-1" />{course.modules} modules</span>
                <span><Clock size={10} className="inline mr-1" />{course.timeLeft} remaining</span>
                {course.cert ? (
                  <span className="flex items-center gap-1 text-brand-600 font-semibold"><Award size={10} />Cert earned!</span>
                ) : (
                  <Link href="/learn/beginner" className="text-brand-600 font-semibold hover:underline">Continue →</Link>
                )}
              </div>
            </div>
          ))}

          <div className="card p-5 text-center bg-surface-1 border-dashed border-2 border-surface-3">
            <p className="text-sm text-ink-muted mb-3">Explore more courses to build your PM skills</p>
            <Link href="/learn/beginner" className="btn-primary text-sm">Browse Courses</Link>
          </div>
        </div>
      )}

      {/* Badges tab */}
      {activeTab === "badges" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-ink">Badges</h2>
            <span className="text-sm text-ink-subtle">{BADGES.filter(b => b.earned).length}/{BADGES.length} earned</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {BADGES.map(badge => (
              <div key={badge.name} className={`card p-5 text-center space-y-2 transition-all ${badge.earned ? "" : "opacity-40 grayscale"}`}>
                <span className="text-4xl block">{badge.icon}</span>
                <div>
                  <p className="font-semibold text-sm text-ink">{badge.name}</p>
                  <p className="text-xs text-ink-subtle">{badge.desc}</p>
                  {badge.earned && badge.date && (
                    <p className="text-[10px] text-brand-600 font-medium mt-1">Earned {badge.date}</p>
                  )}
                  {!badge.earned && (
                    <p className="text-[10px] text-ink-subtle mt-1">Not yet earned</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* History tab */}
      {activeTab === "history" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-ink">Activity History</h2>
            <button className="btn-secondary text-xs py-2 px-3 flex items-center gap-1.5">
              <Download size={13} /> Export
            </button>
          </div>
          <div className="card overflow-hidden">
            {COMPLETED.map((item, i) => (
              <div key={i} className="flex items-center gap-4 px-5 py-4 border-b border-surface-2 last:border-0 hover:bg-surface-1/50 transition-colors">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${item.type === "module" ? "bg-brand-50" : "bg-amber-50"}`}>
                  {item.type === "module" ? <CheckCircle2 size={16} className="text-brand-600" /> : <Zap size={16} className="text-amber-600" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-ink">{item.title}</p>
                  <p className="text-xs text-ink-subtle capitalize">{item.type}</p>
                </div>
                <p className="text-xs text-ink-subtle shrink-0">{item.date}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
