"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  BookOpen,
  Flame,
  Trophy,
  TrendingUp,
  Calendar,
  Clock,
  Target,
  Award,
  BarChart3,
  CheckCircle2,
  Zap,
} from "lucide-react";

// Import Recharts normally now (since the whole component is client-only)
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Mock data (unchanged)
const weeklyActivity = [
  { day: "Mon", minutes: 45, completed: 2 },
  { day: "Tue", minutes: 30, completed: 1 },
  { day: "Wed", minutes: 60, completed: 3 },
  { day: "Thu", minutes: 25, completed: 1 },
  { day: "Fri", minutes: 50, completed: 2 },
  { day: "Sat", minutes: 15, completed: 0 },
  { day: "Sun", minutes: 0, completed: 0 },
];

const progressData = [
  { name: "Completed", value: 35, color: "#10b981" },
  { name: "In Progress", value: 45, color: "#f59e0b" },
  { name: "Not Started", value: 20, color: "#94a3b8" },
];

const studyStreak = {
  current: 7,
  longest: 12,
  lastActive: "2024-01-15",
  target: 30,
};

const upcomingTasks = [
  { id: 1, title: "Complete Agile Methodologies Module", dueDate: "2024-01-20", priority: "high" },
  { id: 2, title: "Take PMP Practice Exam #1", dueDate: "2024-01-22", priority: "medium" },
  { id: 3, title: "Review Risk Management Notes", dueDate: "2024-01-18", priority: "low" },
];

const recentAchievements = [
  { id: 1, title: "7 Day Streak", earned: "2024-01-15", icon: Flame },
  { id: 2, title: "First Practice Exam", earned: "2024-01-10", icon: Trophy },
  { id: 3, title: "Module Master", earned: "2024-01-05", icon: Award },
];

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">("week");

  const StatCard = ({ title, value, subtitle, icon: Icon, trend }: any) => (
    <div className="rounded-2xl border border-slate-200/70 bg-white p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
          {subtitle && <p className="mt-1 text-xs text-slate-500">{subtitle}</p>}
        </div>
        <div className="rounded-xl bg-brand-50 p-2 text-brand-600">
          <Icon size={24} />
        </div>
      </div>
      {trend && (
        <div className="mt-4 flex items-center gap-1 text-xs">
          <TrendingUp size={12} className="text-green-500" />
          <span className="text-green-600">{trend}</span>
          <span className="text-slate-500">vs last week</span>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="rounded-2xl bg-gradient-to-r from-brand-600 to-brand-800 p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, PMP Candidate! 👋</h1>
            <p className="mt-1 text-brand-100">
              You're on a {studyStreak.current}-day streak. Keep up the momentum!
            </p>
          </div>
          <Link
            href="/learn/beginner"
            className="rounded-xl bg-white/10 px-4 py-2 text-sm font-medium transition hover:bg-white/20"
          >
            Resume Learning
          </Link>
        </div>
      </div>

      {/* Stats Grid - unchanged */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Study Time" value="225" subtitle="minutes this week" icon={Clock} trend="+12%" />
        <StatCard
          title="Current Streak"
          value={`${studyStreak.current} days`}
          subtitle={`Longest: ${studyStreak.longest} days`}
          icon={Flame}
          trend="🔥 On fire!"
        />
        <StatCard title="Modules Completed" value="8" subtitle="of 24 total" icon={CheckCircle2} trend="+2 this week" />
        <StatCard title="Practice Score" value="78%" subtitle="Average on mock exams" icon={Target} trend="+5% improvement" />
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Activity Chart */}
        <div className="rounded-2xl border border-slate-200/70 bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-slate-900">Study Activity</h3>
              <p className="text-sm text-slate-500">Daily learning minutes</p>
            </div>
            <div className="flex gap-2">
              {(["week", "month", "year"] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={cn(
                    "rounded-lg px-3 py-1 text-xs font-medium transition",
                    timeRange === range
                      ? "bg-brand-600 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  )}
                >
                  {range.charAt(0).toUpperCase() + range.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyActivity}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="day" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="minutes"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ fill: "#10b981", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Progress Distribution */}
        <div className="rounded-2xl border border-slate-200/70 bg-white p-6">
          <h3 className="mb-4 font-semibold text-slate-900">Progress Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={progressData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {progressData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex justify-center gap-6">
            {progressData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-sm text-slate-600">
                  {item.name} ({item.value}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section - Upcoming Tasks + Achievements */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Upcoming Tasks */}
        <div className="rounded-2xl border border-slate-200/70 bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-slate-900">Upcoming Tasks</h3>
              <p className="text-sm text-slate-500">Stay on track with your study plan</p>
            </div>
            <Link href="/learn" className="text-sm font-medium text-brand-600 hover:underline">
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {upcomingTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between rounded-xl border border-slate-100 p-4 transition hover:border-brand-200"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "h-2 w-2 rounded-full",
                      task.priority === "high" && "bg-red-500",
                      task.priority === "medium" && "bg-yellow-500",
                      task.priority === "low" && "bg-green-500"
                    )}
                  />
                  <div>
                    <p className="text-sm font-medium text-slate-900">{task.title}</p>
                    <p className="text-xs text-slate-500">Due {task.dueDate}</p>
                  </div>
                </div>
                <button className="rounded-lg px-3 py-1 text-xs font-medium text-brand-600 hover:bg-brand-50">
                  Start
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Achievements */}
        <div className="rounded-2xl border border-slate-200/70 bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-slate-900">Recent Achievements</h3>
              <p className="text-sm text-slate-500">Celebrate your progress</p>
            </div>
            <Link href="/dashboard/achievements" className="text-sm font-medium text-brand-600 hover:underline">
              View all
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {recentAchievements.map((achievement) => (
              <div
                key={achievement.id}
                className="flex items-center gap-3 rounded-xl border border-slate-100 p-3"
              >
                <div className="rounded-xl bg-amber-50 p-2 text-amber-600">
                  <achievement.icon size={20} />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">{achievement.title}</p>
                  <p className="text-xs text-slate-500">Earned {achievement.earned}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-xl bg-gradient-to-r from-brand-50 to-purple-50 p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-brand-100 p-2">
                <Zap size={20} className="text-brand-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-900">Next milestone: 14-day streak</p>
                <div className="mt-1 h-1.5 w-full rounded-full bg-slate-200">
                  <div
                    className="h-1.5 rounded-full bg-brand-600"
                    style={{ width: `${(studyStreak.current / studyStreak.target) * 100}%` }}
                  />
                </div>
              </div>
              <p className="text-xs font-medium text-brand-600">
                {studyStreak.target - studyStreak.current} days to go
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        <Link
          href="/learn/beginner"
          className="group flex items-center justify-between rounded-2xl border border-slate-200/70 bg-white p-5 transition hover:border-brand-200 hover:shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-brand-50 p-2 text-brand-600">
              <BookOpen size={20} />
            </div>
            <div>
              <p className="font-medium text-slate-900">Continue Learning</p>
              <p className="text-xs text-slate-500">Pick up where you left off</p>
            </div>
          </div>
          <ArrowRight size={18} className="text-slate-400 group-hover:text-brand-600" />
        </Link>

        <Link
          href="/learn/advanced/mockexam"
          className="group flex items-center justify-between rounded-2xl border border-slate-200/70 bg-white p-5 transition hover:border-brand-200 hover:shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-brand-50 p-2 text-brand-600">
              <Trophy size={20} />
            </div>
            <div>
              <p className="font-medium text-slate-900">Take Practice Exam</p>
              <p className="text-xs text-slate-500">Test your knowledge</p>
            </div>
          </div>
          <ArrowRight size={18} className="text-slate-400 group-hover:text-brand-600" />
        </Link>

        <Link
          href="/dashboard/progress"
          className="group flex items-center justify-between rounded-2xl border border-slate-200/70 bg-white p-5 transition hover:border-brand-200 hover:shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-brand-50 p-2 text-brand-600">
              <BarChart3 size={20} />
            </div>
            <div>
              <p className="font-medium text-slate-900">View Analytics</p>
              <p className="text-xs text-slate-500">Track your performance</p>
            </div>
          </div>
          <ArrowRight size={18} className="text-slate-400 group-hover:text-brand-600" />
        </Link>
      </div>
    </div>
  );
}