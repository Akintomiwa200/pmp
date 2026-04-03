// app/admin/analytics/page.tsx
import type { Metadata } from "next";
import { TrendingUp, Users, BookOpen, DollarSign, Globe, BarChart3 } from "lucide-react";

export const metadata: Metadata = { title: "Analytics | Admin" };

const DAU = [1120, 1340, 980, 1560, 1390, 1480, 1423];
const SIGNUPS = [62, 78, 54, 91, 84, 97, 87];
const REVENUE = [4200, 5800, 7200, 8100, 8950, 9840];
const MONTHS = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];
const DAYS = ["Sa", "Su", "Mo", "Tu", "We", "Th", "Fr"];

const topCourses = [
  { title: "PM Fundamentals", enrollments: 3420, completionRate: 78, revenue: 0 },
  { title: "Agile & Scrum", enrollments: 2180, completionRate: 65, revenue: 0 },
  { title: "Stakeholder Communication", enrollments: 1680, completionRate: 72, revenue: 33566 },
  { title: "Risk Management", enrollments: 1240, completionRate: 68, revenue: 37188 },
  { title: "PMP Bootcamp", enrollments: 890, completionRate: 58, revenue: 88991 },
];

const geoData = [
  { country: "🇺🇸 USA", users: 4820, pct: 37 },
  { country: "🇮🇳 India", users: 1920, pct: 15 },
  { country: "🇬🇧 UK", users: 1540, pct: 12 },
  { country: "🇨🇦 Canada", users: 980, pct: 8 },
  { country: "🇦🇺 Australia", users: 640, pct: 5 },
  { country: "🌍 Other", users: 2947, pct: 23 },
];

export default function AdminAnalyticsPage() {
  const maxRevenue = Math.max(...REVENUE);
  const maxDAU = Math.max(...DAU);
  const maxSignup = Math.max(...SIGNUPS);

  return (
    <div className="p-6 space-y-8 max-w-7xl">
      <div>
        <h1 className="text-2xl font-display font-bold text-ink mb-1">Analytics</h1>
        <p className="text-sm text-ink-muted">Platform performance · March 2025</p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Monthly Active Users", value: "9,340", sub: "+8% MoM", icon: Users, color: "text-brand-600 bg-brand-50" },
          { label: "Course Completions", value: "4,320", sub: "71% completion rate", icon: BookOpen, color: "text-blue-600 bg-blue-50" },
          { label: "Revenue (Mar)", value: "$9,840", sub: "+$890 vs Feb", icon: DollarSign, color: "text-emerald-600 bg-emerald-50" },
          { label: "NPS Score", value: "8.4/10", sub: "From 340 surveys", icon: TrendingUp, color: "text-purple-600 bg-purple-50" },
        ].map((kpi) => (
          <div key={kpi.label} className="card p-5">
            <div className={`w-9 h-9 rounded-xl ${kpi.color} flex items-center justify-center mb-3`}>
              <kpi.icon size={18} />
            </div>
            <p className="text-2xl font-display font-bold text-ink">{kpi.value}</p>
            <p className="text-xs text-ink-subtle mt-0.5">{kpi.label}</p>
            <p className="text-xs text-brand-600 font-medium mt-1">{kpi.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Daily Active Users */}
        <div className="card p-6">
          <h2 className="font-semibold text-ink mb-5 flex items-center gap-2"><Users size={16} className="text-brand-600" />Daily Active Users</h2>
          <div className="flex items-end gap-2 h-36">
            {DAU.map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[9px] text-ink-subtle">{val.toLocaleString()}</span>
                <div className="w-full bg-gradient-to-t from-brand-600 to-brand-400 rounded-t-lg" style={{ height: `${(val / maxDAU) * 100}%`, minHeight: "6px" }} />
                <span className="text-[10px] text-ink-subtle">{DAYS[i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue */}
        <div className="card p-6">
          <h2 className="font-semibold text-ink mb-5 flex items-center gap-2"><DollarSign size={16} className="text-emerald-600" />Monthly Revenue</h2>
          <div className="flex items-end gap-2 h-36">
            {REVENUE.map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[9px] text-ink-subtle">${(val/1000).toFixed(1)}k</span>
                <div className="w-full bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-lg" style={{ height: `${(val / maxRevenue) * 100}%`, minHeight: "6px" }} />
                <span className="text-[10px] text-ink-subtle">{MONTHS[i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Signups */}
        <div className="card p-6">
          <h2 className="font-semibold text-ink mb-5 flex items-center gap-2"><TrendingUp size={16} className="text-blue-600" />Daily Signups</h2>
          <div className="flex items-end gap-2 h-28">
            {SIGNUPS.map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[9px] text-ink-subtle">{val}</span>
                <div className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg" style={{ height: `${(val / maxSignup) * 100}%`, minHeight: "4px" }} />
                <span className="text-[10px] text-ink-subtle">{DAYS[i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Users by level */}
        <div className="card p-6">
          <h2 className="font-semibold text-ink mb-5 flex items-center gap-2"><BarChart3 size={16} className="text-purple-600" />Users by Level</h2>
          <div className="space-y-4">
            {[
              { level: "Beginner", count: 7420, pct: 58, color: "bg-brand-500" },
              { level: "Intermediate", count: 3840, pct: 30, color: "bg-blue-500" },
              { level: "Advanced", count: 1587, pct: 12, color: "bg-purple-500" },
            ].map((item) => (
              <div key={item.level}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-medium text-ink">{item.level}</span>
                  <span className="text-ink-subtle">{item.count.toLocaleString()} ({item.pct}%)</span>
                </div>
                <div className="h-3 bg-surface-2 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Courses */}
      <div className="card p-6">
        <h2 className="font-semibold text-ink mb-5 flex items-center gap-2"><BookOpen size={16} className="text-brand-600" />Top Courses Performance</h2>
        <table className="w-full">
          <thead>
            <tr className="border-b border-surface-3">
              <th className="text-left pb-3 text-xs font-semibold text-ink-subtle uppercase">Course</th>
              <th className="text-right pb-3 text-xs font-semibold text-ink-subtle uppercase">Enrollments</th>
              <th className="text-right pb-3 text-xs font-semibold text-ink-subtle uppercase hidden sm:table-cell">Completion</th>
              <th className="text-right pb-3 text-xs font-semibold text-ink-subtle uppercase hidden md:table-cell">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {topCourses.map((course) => (
              <tr key={course.title} className="border-b border-surface-2 last:border-0">
                <td className="py-3 text-sm font-medium text-ink">{course.title}</td>
                <td className="py-3 text-sm text-right text-ink">{course.enrollments.toLocaleString()}</td>
                <td className="py-3 hidden sm:table-cell">
                  <div className="flex items-center justify-end gap-2">
                    <div className="w-20 h-1.5 bg-surface-2 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${course.completionRate >= 70 ? "bg-brand-500" : "bg-amber-400"}`} style={{ width: `${course.completionRate}%` }} />
                    </div>
                    <span className="text-xs text-ink-subtle w-8 text-right">{course.completionRate}%</span>
                  </div>
                </td>
                <td className="py-3 text-sm text-right hidden md:table-cell">
                  {course.revenue > 0 ? <span className="text-emerald-700 font-medium">${course.revenue.toLocaleString()}</span> : <span className="text-ink-subtle">Free</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Geographic Distribution */}
      <div className="card p-6">
        <h2 className="font-semibold text-ink mb-5 flex items-center gap-2"><Globe size={16} className="text-teal-600" />Geographic Distribution</h2>
        <div className="space-y-3">
          {geoData.map((geo) => (
            <div key={geo.country} className="flex items-center gap-4">
              <span className="text-sm font-medium text-ink w-32 shrink-0">{geo.country}</span>
              <div className="flex-1 h-2.5 bg-surface-2 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-teal-500 to-teal-400 rounded-full" style={{ width: `${geo.pct}%` }} />
              </div>
              <div className="text-right shrink-0 w-24">
                <span className="text-xs font-medium text-ink">{geo.users.toLocaleString()}</span>
                <span className="text-xs text-ink-subtle ml-1">({geo.pct}%)</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
