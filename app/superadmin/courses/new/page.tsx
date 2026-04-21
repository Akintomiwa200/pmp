// app/admin/courses/new/page.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Save, Plus, Trash2, Upload, Eye } from "lucide-react";

export default function AdminCourseCreatePage() {
  const [modules, setModules] = useState([
    { id: 1, title: "", duration: "", type: "video+article", order: 1 },
  ]);
  const [outcomes, setOutcomes] = useState([""]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const addModule = () => setModules(prev => [...prev, { id: Date.now(), title: "", duration: "", type: "video+article", order: prev.length + 1 }]);
  const removeModule = (id: number) => setModules(prev => prev.filter(m => m.id !== id));
  const addOutcome = () => setOutcomes(prev => [...prev, ""]);
  const removeOutcome = (i: number) => setOutcomes(prev => prev.filter((_, idx) => idx !== i));

  const handleSave = async (publish = false) => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 900));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin/courses" className="flex items-center gap-1.5 text-sm transition-all" style={{ color: "#4a6080" }}>
            <ChevronLeft size={14} /> Courses
          </Link>
          <span style={{ color: "#1e2a3d" }}>/</span>
          <h1 className="text-xl font-display font-bold text-white">Create New Course</h1>
        </div>
        <div className="flex gap-2">
          <button onClick={() => handleSave(false)} className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold" style={{ background: "#1a2236", color: "#94a3b8", border: "1px solid #1e2a3d" }}>
            <Save size={13} /> Save Draft
          </button>
          <button onClick={() => handleSave(true)} className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold" style={{ background: "#22c55e", color: "white" }}>
            <Eye size={13} /> Publish Course
          </button>
        </div>
      </div>

      {saved && (
        <div className="p-3 rounded-xl text-sm font-medium" style={{ background: "#22c55e18", color: "#22c55e", border: "1px solid #22c55e30" }}>
          ✓ Course saved successfully
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main form */}
        <div className="lg:col-span-2 space-y-5">
          {/* Basic Info */}
          <div className="rounded-2xl p-5 space-y-4" style={{ background: "#0d1424", border: "1px solid #1e2a3d" }}>
            <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "#4a5568" }}>Course Information</p>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "#94a3b8" }}>Course Title *</label>
              <input className="w-full px-3 py-2.5 text-sm rounded-xl focus:outline-none" style={{ background: "#111827", border: "1px solid #1e2a3d", color: "#e2e8f0" }} placeholder="e.g. Project Risk Management Masterclass" />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "#94a3b8" }}>Slug (URL) *</label>
              <input className="w-full px-3 py-2.5 text-sm rounded-xl focus:outline-none font-mono" style={{ background: "#111827", border: "1px solid #1e2a3d", color: "#60a5fa" }} placeholder="project-risk-management-masterclass" />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "#94a3b8" }}>Description *</label>
              <textarea className="w-full px-3 py-2.5 text-sm rounded-xl focus:outline-none resize-none h-28" style={{ background: "#111827", border: "1px solid #1e2a3d", color: "#94a3b8" }} placeholder="Describe what learners will gain from this course..." />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: "#94a3b8" }}>Instructor Name *</label>
                <input className="w-full px-3 py-2.5 text-sm rounded-xl focus:outline-none" style={{ background: "#111827", border: "1px solid #1e2a3d", color: "#e2e8f0" }} placeholder="Dr. Amira Hassan" />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: "#94a3b8" }}>Duration</label>
                <input className="w-full px-3 py-2.5 text-sm rounded-xl focus:outline-none" style={{ background: "#111827", border: "1px solid #1e2a3d", color: "#e2e8f0" }} placeholder="e.g. 5 hours" />
              </div>
            </div>
          </div>

          {/* Learning Outcomes */}
          <div className="rounded-2xl p-5 space-y-4" style={{ background: "#0d1424", border: "1px solid #1e2a3d" }}>
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "#4a5568" }}>Learning Outcomes</p>
              <button onClick={addOutcome} className="text-xs font-medium flex items-center gap-1" style={{ color: "#22c55e" }}><Plus size={12} />Add</button>
            </div>
            {outcomes.map((outcome, i) => (
              <div key={i} className="flex gap-2">
                <input value={outcome} onChange={e => setOutcomes(prev => prev.map((o, idx) => idx === i ? e.target.value : o))}
                  className="flex-1 px-3 py-2 text-sm rounded-xl focus:outline-none" style={{ background: "#111827", border: "1px solid #1e2a3d", color: "#e2e8f0" }}
                  placeholder={`Outcome ${i + 1}...`} />
                {outcomes.length > 1 && (
                  <button onClick={() => removeOutcome(i)} className="w-8 h-9 rounded-xl flex items-center justify-center" style={{ background: "#ef444418" }}>
                    <Trash2 size={12} style={{ color: "#ef4444" }} />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Modules */}
          <div className="rounded-2xl p-5 space-y-4" style={{ background: "#0d1424", border: "1px solid #1e2a3d" }}>
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "#4a5568" }}>Course Modules ({modules.length})</p>
              <button onClick={addModule} className="text-xs font-medium flex items-center gap-1" style={{ color: "#22c55e" }}><Plus size={12} />Add Module</button>
            </div>
            {modules.map((mod, i) => (
              <div key={mod.id} className="p-4 rounded-xl space-y-3" style={{ background: "#111827" }}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold" style={{ color: "#4a5568" }}>Module {i + 1}</span>
                  {modules.length > 1 && (
                    <button onClick={() => removeModule(mod.id)}><Trash2 size={12} style={{ color: "#ef4444" }} /></button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input className="px-3 py-2 text-xs rounded-lg focus:outline-none col-span-2" style={{ background: "#0d1424", border: "1px solid #1e2a3d", color: "#e2e8f0" }} placeholder="Module title" />
                  <input className="px-3 py-2 text-xs rounded-lg focus:outline-none" style={{ background: "#0d1424", border: "1px solid #1e2a3d", color: "#e2e8f0" }} placeholder="Duration (e.g. 20 min)" />
                  <select className="px-3 py-2 text-xs rounded-lg focus:outline-none" style={{ background: "#0d1424", border: "1px solid #1e2a3d", color: "#94a3b8" }}>
                    <option>video+article</option>
                    <option>video</option>
                    <option>article</option>
                    <option>quiz</option>
                    <option>simulation</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar settings */}
        <div className="space-y-5">
          {/* Settings */}
          <div className="rounded-2xl p-5 space-y-4" style={{ background: "#0d1424", border: "1px solid #1e2a3d" }}>
            <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "#4a5568" }}>Settings</p>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "#94a3b8" }}>Level *</label>
              <select className="w-full px-3 py-2 text-sm rounded-xl focus:outline-none" style={{ background: "#111827", border: "1px solid #1e2a3d", color: "#e2e8f0" }}>
                <option>beginner</option>
                <option>intermediate</option>
                <option>advanced</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "#94a3b8" }}>Pricing</label>
              <div className="flex gap-2 mb-2">
                {["Free", "Premium"].map((p, i) => (
                  <button key={p} className="flex-1 py-2 text-xs rounded-xl font-semibold" style={{ background: i === 0 ? "#22c55e" : "#1a2236", color: i === 0 ? "white" : "#6b8aad", border: "1px solid " + (i === 0 ? "#22c55e" : "#1e2a3d") }}>{p}</button>
                ))}
              </div>
              <input className="w-full px-3 py-2 text-sm rounded-xl focus:outline-none" style={{ background: "#111827", border: "1px solid #1e2a3d", color: "#e2e8f0" }} placeholder="Price (USD) — leave blank for free" type="number" />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "#94a3b8" }}>Tags (comma-separated)</label>
              <input className="w-full px-3 py-2 text-sm rounded-xl focus:outline-none" style={{ background: "#111827", border: "1px solid #1e2a3d", color: "#e2e8f0" }} placeholder="agile, risk, pmp" />
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-xs" style={{ color: "#94a3b8" }}>Allow Preview Module</span>
              <div className="w-10 h-5 rounded-full flex items-center px-0.5 cursor-pointer" style={{ background: "#22c55e" }}>
                <div className="w-4 h-4 rounded-full bg-white shadow translate-x-5" />
              </div>
            </div>
          </div>

          {/* Thumbnail */}
          <div className="rounded-2xl p-5 space-y-3" style={{ background: "#0d1424", border: "1px solid #1e2a3d" }}>
            <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "#4a5568" }}>Course Thumbnail</p>
            <div className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer" style={{ borderColor: "#1e2a3d" }}>
              <Upload size={20} style={{ color: "#4a6080" }} className="mx-auto mb-2" />
              <p className="text-xs" style={{ color: "#4a6080" }}>Drop image or click to upload</p>
              <p className="text-[10px] mt-1" style={{ color: "#374151" }}>PNG, JPG up to 2MB · 16:9 ratio</p>
            </div>
          </div>

          {/* Colour accent */}
          <div className="rounded-2xl p-5 space-y-3" style={{ background: "#0d1424", border: "1px solid #1e2a3d" }}>
            <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "#4a5568" }}>Accent Color</p>
            <div className="flex gap-2 flex-wrap">
              {["#16a34a","#2563eb","#7c3aed","#0891b2","#f97316","#e11d48"].map(c => (
                <button key={c} className="w-8 h-8 rounded-xl border-2" style={{ background: c, borderColor: c === "#16a34a" ? "white" : "transparent" }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
