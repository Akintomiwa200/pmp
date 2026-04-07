// app/admin/courses/[id]/page.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Save, Trash2, Plus, Eye, GripVertical } from "lucide-react";

const DEMO_COURSE = {
  id: "crs_001", title: "Project Management Fundamentals", slug: "pm-fundamentals",
  level: "beginner", instructor: "Sarah Chen", duration: "4 hours", lessonCount: 12,
  isFree: true, price: 0, status: "published",
  description: "Master the core concepts of project management from the ground up. This course covers the PM lifecycle, key roles, methodologies, and practical tools.",
  outcomes: ["Understand the full PM lifecycle", "Differentiate Agile vs Waterfall", "Write a basic project charter", "Run an Agile sprint"],
  tags: ["beginner", "fundamentals", "agile", "waterfall"],
  color: "#16a34a",
  modules: [
    { id: "mod_001", title: "What is Project Management?", duration: "18 min", type: "video+article", isPreview: true },
    { id: "mod_002", title: "The PM Lifecycle", duration: "22 min", type: "video+article", isPreview: false },
    { id: "mod_003", title: "Agile vs Waterfall", duration: "25 min", type: "video+article", isPreview: false },
  ],
};

function DInput({ label, value, type = "text", onChange }: { label: string; value: string; type?: string; onChange?: (v: string) => void }) {
  return (
    <div>
      <label className="block text-xs font-medium mb-1.5" style={{ color: "#94a3b8" }}>{label}</label>
      <input type={type} defaultValue={value} onChange={e => onChange?.(e.target.value)}
        className="w-full px-3 py-2.5 text-sm rounded-xl focus:outline-none"
        style={{ background: "#111827", border: "1px solid #1e2a3d", color: "#e2e8f0" }} />
    </div>
  );
}

export default function EditCoursePage({ params }: { params: { id: string } }) {
  const [modules, setModules] = useState(DEMO_COURSE.modules);
  const [outcomes, setOutcomes] = useState(DEMO_COURSE.outcomes);
  const [saved, setSaved] = useState(false);

  const addModule = () => setModules(prev => [...prev, { id: `mod_new_${Date.now()}`, title: "", duration: "", type: "video+article", isPreview: false }]);
  const removeModule = (id: string) => setModules(prev => prev.filter(m => m.id !== id));
  const addOutcome = () => setOutcomes(prev => [...prev, ""]);

  const handleSave = async () => {
    await new Promise(r => setTimeout(r, 700));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="p-6 space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <Link href="/admin/courses" className="flex items-center gap-1.5 text-sm" style={{ color: "#4a6080" }}>
            <ChevronLeft size={14} />Courses
          </Link>
          <span style={{ color: "#1e2a3d" }}>/</span>
          <h1 className="text-lg font-bold text-white">Edit: {DEMO_COURSE.title}</h1>
        </div>
        <div className="flex gap-2">
          <Link href={`/learn/beginner/${DEMO_COURSE.slug}`} target="_blank"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium"
            style={{ background: "#3b82f618", color: "#60a5fa", border: "1px solid #3b82f630" }}>
            <Eye size={13} />Preview
          </Link>
          <button onClick={handleSave}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold"
            style={{ background: saved ? "#22c55e" : "#16a34a", color: "white" }}>
            <Save size={13} />{saved ? "Saved!" : "Save Changes"}
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main */}
        <div className="lg:col-span-2 space-y-5">
          <div className="rounded-2xl p-5 space-y-4" style={{ background: "#0d1424", border: "1px solid #1e2a3d" }}>
            <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "#4a5568" }}>Course Information</p>
            <DInput label="Title *" value={DEMO_COURSE.title} />
            <DInput label="Slug (URL)" value={DEMO_COURSE.slug} />
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "#94a3b8" }}>Description *</label>
              <textarea defaultValue={DEMO_COURSE.description}
                className="w-full px-3 py-2.5 text-sm rounded-xl focus:outline-none resize-none h-24"
                style={{ background: "#111827", border: "1px solid #1e2a3d", color: "#94a3b8" }} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <DInput label="Instructor" value={DEMO_COURSE.instructor} />
              <DInput label="Duration" value={DEMO_COURSE.duration} />
            </div>
          </div>

          {/* Modules */}
          <div className="rounded-2xl p-5 space-y-4" style={{ background: "#0d1424", border: "1px solid #1e2a3d" }}>
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "#4a5568" }}>Modules ({modules.length})</p>
              <button onClick={addModule} className="flex items-center gap-1 text-xs font-medium" style={{ color: "#22c55e" }}>
                <Plus size={12} />Add Module
              </button>
            </div>
            <div className="space-y-2">
              {modules.map((mod, i) => (
                <div key={mod.id} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "#111827" }}>
                  <GripVertical size={14} style={{ color: "#374151" }} className="cursor-grab shrink-0" />
                  <span className="text-xs font-mono w-6 shrink-0" style={{ color: "#4a5568" }}>{i + 1}</span>
                  <input defaultValue={mod.title}
                    className="flex-1 px-2 py-1.5 text-xs rounded-lg focus:outline-none"
                    style={{ background: "#0d1424", border: "1px solid #1e2a3d", color: "#e2e8f0" }}
                    placeholder="Module title" />
                  <input defaultValue={mod.duration}
                    className="w-20 px-2 py-1.5 text-xs rounded-lg focus:outline-none"
                    style={{ background: "#0d1424", border: "1px solid #1e2a3d", color: "#94a3b8" }}
                    placeholder="Duration" />
                  <select defaultValue={mod.type}
                    className="text-xs px-2 py-1.5 rounded-lg focus:outline-none"
                    style={{ background: "#0d1424", border: "1px solid #1e2a3d", color: "#94a3b8" }}>
                    <option>video+article</option>
                    <option>video</option>
                    <option>article</option>
                    <option>quiz</option>
                  </select>
                  <button className="text-[10px] font-medium px-2 py-1 rounded-lg"
                    style={{ background: mod.isPreview ? "#22c55e20" : "#1e2a3d", color: mod.isPreview ? "#22c55e" : "#4a5568" }}>
                    {mod.isPreview ? "Preview" : "Locked"}
                  </button>
                  <button onClick={() => removeModule(mod.id)}><Trash2 size={12} style={{ color: "#ef4444" }} /></button>
                </div>
              ))}
            </div>
          </div>

          {/* Outcomes */}
          <div className="rounded-2xl p-5 space-y-3" style={{ background: "#0d1424", border: "1px solid #1e2a3d" }}>
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "#4a5568" }}>Learning Outcomes</p>
              <button onClick={addOutcome} className="flex items-center gap-1 text-xs font-medium" style={{ color: "#22c55e" }}>
                <Plus size={12} />Add
              </button>
            </div>
            {outcomes.map((o, i) => (
              <div key={i} className="flex gap-2">
                <input defaultValue={o}
                  className="flex-1 px-3 py-2 text-xs rounded-xl focus:outline-none"
                  style={{ background: "#111827", border: "1px solid #1e2a3d", color: "#e2e8f0" }}
                  placeholder={`Outcome ${i + 1}`} />
                {outcomes.length > 1 && (
                  <button onClick={() => setOutcomes(prev => prev.filter((_, idx) => idx !== i))}
                    className="w-8 h-8 flex items-center justify-center rounded-xl" style={{ background: "#ef444418" }}>
                    <Trash2 size={11} style={{ color: "#ef4444" }} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          <div className="rounded-2xl p-5 space-y-4" style={{ background: "#0d1424", border: "1px solid #1e2a3d" }}>
            <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "#4a5568" }}>Settings</p>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "#94a3b8" }}>Status</label>
              <select defaultValue={DEMO_COURSE.status}
                className="w-full px-3 py-2 text-sm rounded-xl focus:outline-none"
                style={{ background: "#111827", border: "1px solid #1e2a3d", color: "#e2e8f0" }}>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "#94a3b8" }}>Level</label>
              <select defaultValue={DEMO_COURSE.level}
                className="w-full px-3 py-2 text-sm rounded-xl focus:outline-none"
                style={{ background: "#111827", border: "1px solid #1e2a3d", color: "#e2e8f0" }}>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "#94a3b8" }}>Pricing</label>
              <div className="flex gap-2 mb-2">
                {["Free", "Paid"].map((p, i) => (
                  <button key={p} className="flex-1 py-2 text-xs rounded-xl font-semibold"
                    style={{ background: (i === 0 && DEMO_COURSE.isFree) ? "#22c55e" : "#1a2236", color: (i === 0 && DEMO_COURSE.isFree) ? "white" : "#6b8aad", border: "1px solid #1e2a3d" }}>
                    {p}
                  </button>
                ))}
              </div>
              <input type="number" defaultValue={DEMO_COURSE.price} placeholder="Price (0 = free)"
                className="w-full px-3 py-2 text-sm rounded-xl focus:outline-none"
                style={{ background: "#111827", border: "1px solid #1e2a3d", color: "#e2e8f0" }} />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "#94a3b8" }}>Tags</label>
              <input defaultValue={DEMO_COURSE.tags.join(", ")} placeholder="tag1, tag2, tag3"
                className="w-full px-3 py-2 text-sm rounded-xl focus:outline-none"
                style={{ background: "#111827", border: "1px solid #1e2a3d", color: "#e2e8f0" }} />
            </div>
          </div>

          {/* Stats */}
          <div className="rounded-2xl p-5" style={{ background: "#0d1424", border: "1px solid #1e2a3d" }}>
            <p className="text-[10px] font-bold uppercase tracking-wider mb-3" style={{ color: "#4a5568" }}>Course Stats</p>
            {[{ label: "Enrolled", value: "3,420" }, { label: "Completion Rate", value: "64%" }, { label: "Rating", value: "4.8 ★" }, { label: "Reviews", value: "847" }].map(s => (
              <div key={s.label} className="flex items-center justify-between py-2" style={{ borderBottom: "1px solid #111827" }}>
                <span className="text-xs" style={{ color: "#4a6080" }}>{s.label}</span>
                <span className="text-sm font-bold text-white">{s.value}</span>
              </div>
            ))}
          </div>

          {/* Danger zone */}
          <div className="rounded-2xl p-5" style={{ background: "#0d1424", border: "1px solid #ef444440" }}>
            <p className="text-xs font-semibold text-red-400 mb-2">Danger Zone</p>
            <button className="w-full py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-2"
              style={{ background: "#ef444418", color: "#ef4444", border: "1px solid #ef444430" }}>
              <Trash2 size={13} />Delete Course
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
