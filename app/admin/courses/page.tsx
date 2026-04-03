// app/admin/courses/page.tsx
import type { Metadata } from "next";
import { BookOpen, Plus, Search, Edit2, Eye, Trash2, Star, Users, Clock } from "lucide-react";

export const metadata: Metadata = { title: "Manage Courses | Admin" };

const COURSES = [
  { id: "crs_001", title: "PM Fundamentals", level: "beginner", instructor: "Sarah Chen", lessons: 12, enrolled: 3420, rating: 4.8, isFree: true, status: "published", updatedAt: "Jan 10, 2025" },
  { id: "crs_002", title: "Agile & Scrum in Practice", level: "beginner", instructor: "James Okafor", lessons: 18, enrolled: 2180, rating: 4.7, isFree: true, status: "published", updatedAt: "Feb 5, 2025" },
  { id: "crs_003", title: "Risk Management & Mitigation", level: "intermediate", instructor: "Dr. Amira Hassan", lessons: 15, enrolled: 1240, rating: 4.9, isFree: false, status: "published", updatedAt: "Mar 1, 2025" },
  { id: "crs_004", title: "PMP Certification Bootcamp", level: "advanced", instructor: "Marcus Johnson, PMP", lessons: 60, enrolled: 890, rating: 4.95, isFree: false, status: "published", updatedAt: "Mar 15, 2025" },
  { id: "crs_005", title: "Stakeholder Communication", level: "intermediate", instructor: "Lisa Park", lessons: 10, enrolled: 1680, rating: 4.6, isFree: false, status: "published", updatedAt: "Mar 20, 2025" },
  { id: "crs_006", title: "PRINCE2 Foundations", level: "advanced", instructor: "TBD", lessons: 0, enrolled: 0, rating: 0, isFree: false, status: "draft", updatedAt: "Mar 28, 2025" },
];

const LEVEL_STYLES = { beginner: { bg: "#16a34a18", color: "#16a34a", label: "Beginner" }, intermediate: { bg: "#2563eb18", color: "#2563eb", label: "Intermediate" }, advanced: { bg: "#7c3aed18", color: "#7c3aed", label: "Advanced" } };

export default function AdminCoursesPage() {
  return (
    <div className="p-6 space-y-6 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-white">Courses</h1>
          <p className="text-sm" style={{ color: "#4a6080" }}>6 courses · 9,410 total enrollments</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold" style={{ background: "#22c55e", color: "white" }}>
          <Plus size={15} /> Add Course
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#4a6080" }} />
          <input placeholder="Search courses..." className="pl-9 pr-4 py-2 text-xs rounded-xl w-56 focus:outline-none" style={{ background: "#0d1424", border: "1px solid #1e2a3d", color: "#94a3b8" }} />
        </div>
        {["All", "Beginner", "Intermediate", "Advanced", "Free", "Premium", "Draft"].map((f, i) => (
          <button key={f} className="px-3 py-1.5 rounded-xl text-xs font-medium transition-all" style={{
            background: i === 0 ? "#22c55e" : "#0d1424",
            color: i === 0 ? "white" : "#6b8aad",
            border: "1px solid " + (i === 0 ? "#22c55e" : "#1e2a3d")
          }}>{f}</button>
        ))}
      </div>

      {/* Course cards grid */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {COURSES.map((course) => {
          const ls = LEVEL_STYLES[course.level as keyof typeof LEVEL_STYLES];
          return (
            <div key={course.id} className="rounded-2xl p-5 space-y-4" style={{ background: "#0d1424", border: "1px solid #1e2a3d" }}>
              <div className="flex items-start justify-between">
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full" style={{ background: ls.bg, color: ls.color, border: `1px solid ${ls.color}30` }}>
                  {ls.label}
                </span>
                <div className="flex items-center gap-1">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${course.status === "published" ? "" : ""}`} style={{
                    background: course.status === "published" ? "#22c55e18" : "#f59e0b18",
                    color: course.status === "published" ? "#22c55e" : "#f59e0b"
                  }}>{course.status}</span>
                  {!course.isFree && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "#a855f718", color: "#a855f7" }}>PAID</span>}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-white mb-0.5">{course.title}</h3>
                <p className="text-xs" style={{ color: "#4a6080" }}>by {course.instructor}</p>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[
                  { icon: BookOpen, val: course.lessons, label: "lessons" },
                  { icon: Users, val: course.enrolled.toLocaleString(), label: "enrolled" },
                  { icon: Star, val: course.rating || "—", label: "rating" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center p-2 rounded-xl" style={{ background: "#111827" }}>
                    <stat.icon size={12} className="mx-auto mb-1" style={{ color: "#4a6080" }} />
                    <p className="text-xs font-bold text-white">{stat.val}</p>
                    <p className="text-[9px]" style={{ color: "#4a6080" }}>{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: "#1e2a3d" }}>
                <span className="text-[10px]" style={{ color: "#4a6080" }}>Updated {course.updatedAt}</span>
                <div className="flex gap-1.5">
                  <button className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "#3b82f618" }}><Eye size={12} style={{ color: "#60a5fa" }} /></button>
                  <button className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "#22c55e18" }}><Edit2 size={12} style={{ color: "#22c55e" }} /></button>
                  <button className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "#ef444418" }}><Trash2 size={12} style={{ color: "#ef4444" }} /></button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
