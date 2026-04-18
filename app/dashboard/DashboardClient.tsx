
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
  Clock,
  Target,
  Award,
  BarChart3,
  CheckCircle2,
  Zap,
} from "lucide-react";

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
  target: 14,
};

const upcomingTasks = [
  {
    id: 1,
    title: "Complete Agile Methodologies Module",
    dueDate: "2024-01-20",
    priority: "high",
  },
  {
    id: 2,
    title: "Take PMP Practice Exam #1",
    dueDate: "2024-01-22",
    priority: "medium",
  },
  {
    id: 3,
    title: "Review Risk Management Notes",
    dueDate: "2024-01-18",
    priority: "low",
  },
];

const recentAchievements = [
  { id: 1, title: "7 Day Streak", earned: "2024-01-15", icon: Flame },
  { id: 2, title: "First Practice Exam", earned: "2024-01-10", icon: Trophy },
  { id: 3, title: "Module Master", earned: "2024-01-05", icon: Award },
];

type StatCardProps = {
  title: string;
  value: string;
  subtitle?: string;
  icon: React.ComponentType<{ size?: number }>;
  trend?: string;
};

function StatCard({ title, value, subtitle, icon: Icon, trend }: StatCardProps) {
  return (
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
}

export default function DashboardClient() {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">("week");

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-r from-brand-600 to-brand-800 p-6 text-black">
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
        <StatCard title="Practice Score" value="78%" subtitle="Average on mock exams" icon={Target} trend="+5%" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
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
                  {range}
                </button>
              ))}
            </div>
          </div>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyActivity}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="minutes" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/70 bg-white p-6">
          <h3 className="mb-4 font-semibold text-slate-900">Progress Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={progressData} dataKey="value" cx="50%" cy="50%" innerRadius={60} outerRadius={80}>
                  {progressData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Link href="/learn/beginner" className="rounded-2xl border bg-white p-5">
          Continue Learning
        </Link>
        <Link href="/learn/advanced/mockexam" className="rounded-2xl border bg-white p-5">
          Take Practice Exam
        </Link>
        <Link href="/dashboard/progress" className="rounded-2xl border bg-white p-5">
          View Analytics
        </Link>
      </div>
    </div>
  );
}