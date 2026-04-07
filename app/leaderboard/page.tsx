"use client";
import { useState } from "react";
import { Trophy, Flame, Star, TrendingUp, Award, Medal, Crown } from "lucide-react";

// -----------------------------
// Types
// -----------------------------
type Period = "weekly" | "monthly" | "alltime";

type User = {
  rank: number;
  name: string;
  avatar: string;
  points: number;
  streak: number;
  level: "beginner" | "intermediate" | "advanced";
  badges: number;
  change: number;
};

type LeaderboardData = {
  weekly: User[];
  monthly: User[];
  alltime: User[];
};

// -----------------------------
// Leaderboard Data
// -----------------------------
const LEADERBOARD: LeaderboardData = {
  weekly: [
    { rank: 1, name: "Marcus Johnson", avatar: "M", points: 2840, streak: 90, level: "advanced", badges: 8, change: 0 },
    { rank: 2, name: "Priya Sharma", avatar: "P", points: 2120, streak: 30, level: "intermediate", badges: 5, change: 2 },
    { rank: 3, name: "Dr. Amira Hassan", avatar: "A", points: 1980, streak: 45, level: "advanced", badges: 7, change: -1 },
    { rank: 4, name: "Alex Rivera", avatar: "A", points: 1240, streak: 7, level: "beginner", badges: 3, change: 3 },
    { rank: 5, name: "Jordan Lee", avatar: "J", points: 1100, streak: 14, level: "beginner", badges: 2, change: -2 },
    { rank: 6, name: "Sofia Martinez", avatar: "S", points: 980, streak: 21, level: "intermediate", badges: 4, change: 1 },
    { rank: 7, name: "Oliver Brown", avatar: "O", points: 860, streak: 5, level: "beginner", badges: 2, change: -1 },
    { rank: 8, name: "Emma Wilson", avatar: "E", points: 790, streak: 18, level: "intermediate", badges: 3, change: 4 },
    { rank: 9, name: "Liam Davis", avatar: "L", points: 720, streak: 3, level: "beginner", badges: 1, change: -2 },
    { rank: 10, name: "James Okafor", avatar: "J", points: 680, streak: 12, level: "intermediate", badges: 3, change: 0 },
  ],
  monthly: [],
  alltime: [],
};

// Generate monthly & alltime data
LEADERBOARD.monthly = LEADERBOARD.weekly.map((u, i) => ({ ...u, points: u.points * 4, rank: i + 1 }));
LEADERBOARD.alltime = LEADERBOARD.weekly.map((u, i) => ({ ...u, points: u.points * 12, rank: i + 1 }));

// -----------------------------
// Constants
// -----------------------------
const LEVEL_COLORS: Record<User["level"], string> = {
  beginner: "#16a34a",
  intermediate: "#2563eb",
  advanced: "#7c3aed",
};

const RANK_STYLES: Record<number, { bg: string; text: string; icon: React.ElementType; iconColor: string }> = {
  1: { bg: "from-amber-50 to-yellow-50 border-amber-200", text: "text-amber-700", icon: Crown, iconColor: "text-amber-500" },
  2: { bg: "from-slate-50 to-slate-100 border-slate-300", text: "text-slate-600", icon: Medal, iconColor: "text-slate-400" },
  3: { bg: "from-orange-50 to-amber-50 border-orange-200", text: "text-orange-700", icon: Award, iconColor: "text-orange-400" },
};

// -----------------------------
// Component
// -----------------------------
export default function LeaderboardPage() {
  const [period, setPeriod] = useState<Period>("weekly");
  const data = LEADERBOARD[period];
  const top3 = data.slice(0, 3);
  const rest = data.slice(3);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="text-center mb-8">
        <p className="section-tag mb-3 justify-center"><Trophy size={12} />Leaderboard</p>
        <h1 className="text-4xl font-display font-bold text-ink mb-2">Top Learners</h1>
        <p className="text-ink-muted">Earn points by completing modules, quizzes, and staying consistent.</p>
      </div>

      {/* Period tabs */}
      <div className="flex justify-center mb-8">
        <div className="flex rounded-2xl border border-surface-3 p-1 bg-white">
          {(["weekly", "monthly", "alltime"] as Period[]).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-all capitalize ${
                period === p ? "bg-ink text-white shadow-sm" : "text-ink-muted hover:text-ink"
              }`}
            >
              {p === "alltime" ? "All Time" : p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Top 3 podium */}
      <div className="grid grid-cols-3 gap-3 mb-8 items-end">
        {/* 2nd place */}
        <div className={`card p-4 text-center bg-gradient-to-b ${RANK_STYLES[2].bg} border order-1`}>
          <div className="text-2xl mb-2">🥈</div>
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-400 to-slate-600 flex items-center justify-center text-white font-bold text-lg mx-auto mb-2">
            {top3[1]?.avatar}
          </div>
          <p className="text-sm font-semibold text-ink truncate">{top3[1]?.name.split(" ")[0]}</p>
          <p className="text-xs text-ink-subtle">{top3[1]?.points.toLocaleString()} pts</p>
          <span
            className="text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 inline-block"
            style={{ color: LEVEL_COLORS[top3[1]?.level], background: LEVEL_COLORS[top3[1]?.level] + "15" }}
          >
            {top3[1]?.level}
          </span>
        </div>

        {/* 1st place */}
        <div className={`card p-5 text-center bg-gradient-to-b ${RANK_STYLES[1].bg} border order-2 -mt-4 shadow-lg`}>
          <Crown size={24} className="text-amber-500 mx-auto mb-2" />
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white font-bold text-xl mx-auto mb-2 shadow-md">
            {top3[0]?.avatar}
          </div>
          <p className="font-bold text-ink">{top3[0]?.name.split(" ")[0]}</p>
          <p className="text-sm font-bold text-amber-600 mt-0.5">{top3[0]?.points.toLocaleString()} pts</p>
          <div className="flex items-center justify-center gap-1 mt-1">
            <Flame size={12} className="text-orange-500" />
            <span className="text-[11px] text-orange-600 font-semibold">{top3[0]?.streak}d streak</span>
          </div>
        </div>

        {/* 3rd place */}
        <div className={`card p-4 text-center bg-gradient-to-b ${RANK_STYLES[3].bg} border order-3`}>
          <div className="text-2xl mb-2">🥉</div>
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-lg mx-auto mb-2">
            {top3[2]?.avatar}
          </div>
          <p className="text-sm font-semibold text-ink truncate">{top3[2]?.name.split(" ")[0]}</p>
          <p className="text-xs text-ink-subtle">{top3[2]?.points.toLocaleString()} pts</p>
          <span
            className="text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 inline-block"
            style={{ color: LEVEL_COLORS[top3[2]?.level], background: LEVEL_COLORS[top3[2]?.level] + "15" }}
          >
            {top3[2]?.level}
          </span>
        </div>
      </div>

      {/* Full table for rest */}
      <div className="card overflow-hidden">
        {rest.map((user) => (
          <div
            key={user.rank}
            className={`flex items-center gap-4 px-5 py-4 border-b border-surface-2 last:border-0 hover:bg-surface-1/50 transition-colors ${user.name === "Alex Rivera" ? "bg-brand-50/50" : ""}`}
          >
            {/* Rank */}
            <div className="w-8 text-center shrink-0">
              <span className="text-sm font-bold text-ink-muted">#{user.rank}</span>
              {user.change !== 0 && (
                <div className={`text-[9px] font-bold ${user.change > 0 ? "text-brand-600" : "text-red-500"}`}>
                  {user.change > 0 ? `↑${user.change}` : `↓${Math.abs(user.change)}`}
                </div>
              )}
            </div>

            {/* Avatar */}
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold shrink-0"
              style={{ background: `linear-gradient(135deg, ${LEVEL_COLORS[user.level]}, ${LEVEL_COLORS[user.level]}99)` }}
            >
              {user.avatar}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className={`text-sm font-semibold ${user.name === "Alex Rivera" ? "text-brand-700" : "text-ink"}`}>
                  {user.name} {user.name === "Alex Rivera" && <span className="text-[10px] font-normal text-brand-500">(You)</span>}
                </p>
                <span
                  className="text-[10px] font-bold px-1.5 py-0.5 rounded-full capitalize"
                  style={{ color: LEVEL_COLORS[user.level], background: LEVEL_COLORS[user.level] + "15" }}
                >
                  {user.level}
                </span>
              </div>
              <div className="flex items-center gap-3 mt-0.5">
                <span className="flex items-center gap-1 text-[11px] text-ink-subtle">
                  <Flame size={10} className="text-orange-400" /> {user.streak}d
                </span>
                <span className="flex items-center gap-1 text-[11px] text-ink-subtle">
                  <Star size={10} className="text-amber-400" /> {user.badges} badges
                </span>
              </div>
            </div>

            {/* Points */}
            <div className="text-right shrink-0">
              <p className="text-sm font-bold text-ink">{user.points.toLocaleString()}</p>
              <p className="text-[10px] text-ink-subtle">points</p>
            </div>
          </div>
        ))}
      </div>

      {/* How to earn points */}
      <div className="mt-8 card p-6">
        <h2 className="font-semibold text-ink mb-4 flex items-center gap-2">
          <TrendingUp size={16} className="text-brand-600" /> How to Earn Points
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { action: "Complete a module", points: "+50 pts" },
            { action: "Pass a quiz (≥70%)", points: "+100 pts" },
            { action: "Perfect quiz score (100%)", points: "+200 pts" },
            { action: "Daily login streak", points: "+10 pts/day" },
            { action: "7-day streak bonus", points: "+100 pts" },
            { action: "Complete a course", points: "+500 pts" },
            { action: "Post in community", points: "+20 pts" },
            { action: "Receive 10 upvotes", points: "+50 pts" },
          ].map((item) => (
            <div key={item.action} className="flex items-center justify-between p-3 bg-surface-1 rounded-xl">
              <span className="text-sm text-ink-muted">{item.action}</span>
              <span className="text-sm font-bold text-brand-600">{item.points}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}