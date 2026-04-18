// app/admin/exams/[id]/page.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Save, Clock, Calendar, Users, Shield, Eye, Trash2, CheckCircle, AlertCircle, BarChart3 } from "lucide-react";

const DEMO_EXAM = {
  id: "exam_001",
  title: "Q2 2025 PM Fundamentals Exam",
  quizId: "quiz_001",
  quizTitle: "PM Fundamentals Check",
  level: "all",
  color: "#16a34a",
  description: "Official quarterly assessment covering the full PM lifecycle, Agile basics, and stakeholder fundamentals.",
  startDate: "2025-04-15",
  startTime: "14:00",
  durationMinutes: 30,
  accessWindow: 15,
  maxAttempts: 1,
  requiresCode: false,
  accessCode: "",
  showResults: true,
  isActive: true,
  stats: { registered: 284, started: 201, completed: 198, avgScore: 74 },
};

export default function EditExamPage({ params }: { params: { id: string } }) {
  const [exam, setExam] = useState(DEMO_EXAM);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 700));
    setSaving(false); setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const endTime = (() => {
    const [h, m] = exam.startTime.split(":").map(Number);
    const total = h * 60 + m + exam.durationMinutes;
    return `${String(Math.floor(total / 60) % 24).padStart(2,"0")}:${String(total % 60).padStart(2,"0")}`;
  })();

  return (
    <div className="p-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <Link href="/admin/quizzes" className="flex items-center gap-1.5 text-sm hover:text-white transition-colors" style={{ color:"#4a6080" }}>
            <ChevronLeft size={14} />Quizzes
          </Link>
          <span style={{ color:"#1e2a3d" }}>/</span>
          <h1 className="text-lg font-bold text-white">Edit Exam</h1>
        </div>
        <div className="flex gap-2">
          <Link href="/exams" target="_blank"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold"
            style={{ background:"rgba(59,130,246,.15)", color:"#60a5fa", border:"1px solid rgba(59,130,246,.2)" }}>
            <Eye size={12} />Student View
          </Link>
          <button onClick={handleSave}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white"
            style={{ background: saved?"#16a34a":"linear-gradient(135deg,#7c3aed,#db2777)" }}>
            <Save size={12} />{saving?"Saving…":saved?"Saved!":"Save Changes"}
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 mb-5">
        {[
          { label:"Registered", value:exam.stats.registered, color:"#60a5fa" },
          { label:"Started", value:exam.stats.started, color:"#fbbf24" },
          { label:"Completed", value:exam.stats.completed, color:"#22c55e" },
          { label:"Avg Score", value:`${exam.stats.avgScore}%`, color:exam.stats.avgScore>=70?"#22c55e":"#f59e0b" },
        ].map(s => (
          <div key={s.label} className="rounded-2xl p-3 text-center" style={{ background:"#0d1424", border:"1px solid #1e2a3d" }}>
            <div className="text-xl font-black" style={{ color:s.color }}>{s.value}</div>
            <div className="text-[10px]" style={{ color:"#4a6080" }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-4">

          {/* Details */}
          <div className="rounded-2xl p-5 space-y-4" style={{ background:"#0d1424", border:"1px solid #1e2a3d" }}>
            <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color:"#4a5568" }}>Exam Details</p>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider mb-1.5" style={{ color:"#94a3b8" }}>Title</label>
              <input defaultValue={exam.title} onChange={e=>setExam({...exam,title:e.target.value})}
                className="w-full px-3 py-2.5 text-sm rounded-xl focus:outline-none"
                style={{ background:"#111827", border:"1px solid #1e2a3d", color:"#e2e8f0" }} />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider mb-1.5" style={{ color:"#94a3b8" }}>Quiz Source</label>
              <div className="px-3 py-2.5 rounded-xl text-sm flex items-center justify-between"
                style={{ background:"#111827", border:"1px solid #1e2a3d", color:"#94a3b8" }}>
                <span>{exam.quizTitle}</span>
                <Link href={`/admin/quizzes/${exam.quizId}`} className="text-xs" style={{ color:"#60a5fa" }}>Edit quiz →</Link>
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider mb-1.5" style={{ color:"#94a3b8" }}>Description</label>
              <textarea defaultValue={exam.description} onChange={e=>setExam({...exam,description:e.target.value})}
                className="w-full px-3 py-2.5 text-sm rounded-xl resize-none h-20 focus:outline-none"
                style={{ background:"#111827", border:"1px solid #1e2a3d", color:"#e2e8f0" }} />
            </div>
          </div>

          {/* Schedule */}
          <div className="rounded-2xl p-5 space-y-4" style={{ background:"#0d1424", border:"1px solid #1e2a3d" }}>
            <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color:"#4a5568" }}>Schedule</p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider mb-1.5" style={{ color:"#94a3b8" }}>Date</label>
                <input type="date" defaultValue={exam.startDate} onChange={e=>setExam({...exam,startDate:e.target.value})}
                  className="w-full px-3 py-2.5 text-sm rounded-xl focus:outline-none"
                  style={{ background:"#111827", border:"1px solid #1e2a3d", color:"#e2e8f0", colorScheme:"dark" }} />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider mb-1.5" style={{ color:"#94a3b8" }}>Start Time</label>
                <input type="time" defaultValue={exam.startTime} onChange={e=>setExam({...exam,startTime:e.target.value})}
                  className="w-full px-3 py-2.5 text-sm rounded-xl focus:outline-none"
                  style={{ background:"#111827", border:"1px solid #1e2a3d", color:"#e2e8f0", colorScheme:"dark" }} />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label:"Duration (min)", val:exam.durationMinutes, key:"durationMinutes" },
                { label:"Access Window (min)", val:exam.accessWindow, key:"accessWindow" },
                { label:"Max Attempts", val:exam.maxAttempts, key:"maxAttempts" },
              ].map(f => (
                <div key={f.key}>
                  <label className="block text-[10px] font-bold uppercase tracking-wider mb-1.5" style={{ color:"#94a3b8" }}>{f.label}</label>
                  <input type="number" defaultValue={f.val}
                    className="w-full px-3 py-2.5 text-sm rounded-xl focus:outline-none"
                    style={{ background:"#111827", border:"1px solid #1e2a3d", color:"#e2e8f0" }} />
                </div>
              ))}
            </div>
            {/* Timeline */}
            <div className="grid grid-cols-4 gap-2 text-center">
              {[
                { icon:"🔒", label:"Locked", val:"Before "+exam.startTime, col:"#4a6080" },
                { icon:"🟢", label:"Opens", val:exam.startTime, col:"#22c55e" },
                { icon:"⏳", label:"No new joins", val:`+${exam.accessWindow}m`, col:"#f59e0b" },
                { icon:"🏁", label:"Ends", val:endTime, col:"#ef4444" },
              ].map((s,i) => (
                <div key={i} className="p-2.5 rounded-xl text-center" style={{ background:"rgba(255,255,255,.04)", border:"1px solid #1e2a3d" }}>
                  <div className="text-xl mb-1">{s.icon}</div>
                  <div className="text-[11px] font-bold" style={{ color:s.col }}>{s.val}</div>
                  <div className="text-[9px]" style={{ color:"#4a6080" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Access */}
          <div className="rounded-2xl p-5 space-y-4" style={{ background:"#0d1424", border:"1px solid #1e2a3d" }}>
            <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color:"#4a5568" }}>Access Control</p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider mb-1.5" style={{ color:"#94a3b8" }}>Who can access</label>
                <select defaultValue={exam.level} className="w-full px-3 py-2.5 text-sm rounded-xl focus:outline-none"
                  style={{ background:"#111827", border:"1px solid #1e2a3d", color:"#e2e8f0" }}>
                  <option value="all">All Users</option>
                  <option value="beginner">Beginners</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="premium">Premium only</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider mb-1.5" style={{ color:"#94a3b8" }}>Show Results After?</label>
                <button onClick={() => setExam({...exam, showResults:!exam.showResults})}
                  className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm"
                  style={{ background:"#111827", border:"1px solid #1e2a3d", color:exam.showResults?"#22c55e":"#4a6080" }}>
                  <div className={`w-9 h-5 rounded-full flex items-center px-0.5 ${exam.showResults?"bg-green-600":"bg-slate-600"}`}>
                    <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${exam.showResults?"translate-x-4":""}`} />
                  </div>
                  {exam.showResults?"Yes":"No"}
                </button>
              </div>
            </div>
            {exam.requiresCode && (
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider mb-1.5" style={{ color:"#94a3b8" }}>Access Code</label>
                <input defaultValue={exam.accessCode} className="w-full px-3 py-2.5 text-sm rounded-xl font-mono tracking-widest focus:outline-none"
                  style={{ background:"#111827", border:"1px solid #1e2a3d", color:"#e2e8f0" }} />
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="rounded-2xl p-5" style={{ background:"#0d1424", border:"1px solid #1e2a3d" }}>
            <p className="text-[10px] font-bold uppercase tracking-wider mb-3" style={{ color:"#4a5568" }}>Status</p>
            <button onClick={() => setExam({...exam, isActive:!exam.isActive})}
              className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-bold mb-3"
              style={{ background:exam.isActive?"rgba(34,197,94,.15)":"rgba(255,255,255,.06)", color:exam.isActive?"#22c55e":"#4a6080", border:`1px solid ${exam.isActive?"rgba(34,197,94,.25)":"#1e2a3d"}` }}>
              {exam.isActive?<><CheckCircle size={13}/>Active</>:<><AlertCircle size={13}/>Inactive</>}
            </button>
            {[
              { icon:Calendar, label:"Date", val:exam.startDate },
              { icon:Clock, label:"Time", val:exam.startTime },
              { icon:Clock, label:"Duration", val:`${exam.durationMinutes}m` },
              { icon:Users, label:"Access", val:`${exam.accessWindow}m window` },
              { icon:Shield, label:"Attempts", val:exam.maxAttempts },
            ].map(s => (
              <div key={s.label} className="flex items-center gap-2 py-2" style={{ borderBottom:"1px solid #111827" }}>
                <s.icon size={12} style={{ color:"#4a6080" }} className="shrink-0" />
                <span className="text-[11px] flex-1" style={{ color:"#4a6080" }}>{s.label}</span>
                <span className="text-xs font-bold text-white">{String(s.val)}</span>
              </div>
            ))}
          </div>

          <Link href="/admin/analytics"
            className="flex items-center gap-2 w-full px-4 py-3 rounded-2xl text-sm font-semibold transition-all hover:bg-white/5"
            style={{ background:"rgba(255,255,255,.04)", color:"#a78bfa", border:"1px solid rgba(124,58,237,.2)" }}>
            <BarChart3 size={14} />View Exam Analytics →
          </Link>

          <div className="rounded-2xl p-4" style={{ background:"#0d1424", border:"1px solid rgba(239,68,68,.2)" }}>
            <p className="text-[10px] font-bold text-red-500 uppercase tracking-wider mb-2">Danger Zone</p>
            <button className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold"
              style={{ background:"rgba(239,68,68,.1)", color:"#ef4444", border:"1px solid rgba(239,68,68,.2)" }}>
              <Trash2 size={12}/>Cancel Exam
            </button>
          </div>

          <button onClick={handleSave}
            className="w-full py-3 rounded-2xl text-sm font-bold text-white"
            style={{ background:saved?"#16a34a":"linear-gradient(135deg,#7c3aed,#db2777)" }}>
            {saving?"Saving…":saved?"✓ Saved!":"Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
