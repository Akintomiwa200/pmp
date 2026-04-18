// app/admin/exams/new/page.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Save, Clock, Calendar, Lock, Users, AlertCircle, CheckCircle, Shield } from "lucide-react";

const QUIZZES_FOR_EXAM = [
  { id:"quiz_001", title:"PM Fundamentals Check", questions:5, level:"beginner" },
  { id:"quiz_002", title:"Agile & Scrum Assessment", questions:5, level:"beginner" },
  { id:"quiz_003", title:"Risk Management Quiz", questions:5, level:"intermediate" },
  { id:"quiz_004", title:"PMP Certification Practice", questions:5, level:"advanced" },
];

const Field = ({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) => (
  <div>
    <label className="block text-xs font-semibold mb-1.5" style={{ color:"#94a3b8" }}>{label}</label>
    {children}
    {hint && <p className="text-[11px] mt-1" style={{ color:"#4a6080" }}>{hint}</p>}
  </div>
);

export default function NewExamPage() {
  const [title, setTitle] = useState("");
  const [selectedQuiz, setSelectedQuiz] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [durationMinutes, setDurationMinutes] = useState(60);
  const [accessWindow, setAccessWindow] = useState(15);
  const [maxAttempts, setMaxAttempts] = useState(1);
  const [level, setLevel] = useState("all");
  const [instructions, setInstructions] = useState("This is a timed exam. Once started, the timer cannot be paused. Ensure you have a stable internet connection before beginning.");
  const [showResults, setShowResults] = useState(false);
  const [requiresCode, setRequiresCode] = useState(false);
  const [accessCode, setAccessCode] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 900));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const generateCode = () => {
    setAccessCode(Math.random().toString(36).slice(2, 8).toUpperCase());
  };

  const endTime = startTime && durationMinutes
    ? (() => {
        const [h,m] = startTime.split(":").map(Number);
        const total = h*60 + m + durationMinutes;
        return `${String(Math.floor(total/60)%24).padStart(2,"0")}:${String(total%60).padStart(2,"0")}`;
      })()
    : "—";

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <Link href="/admin/quizzes" className="flex items-center gap-1.5 text-sm hover:text-white transition-colors" style={{ color:"#4a6080" }}>
            <ChevronLeft size={15} />Quizzes
          </Link>
          <span style={{ color:"#1e2a3d" }}>/</span>
          <h1 className="text-lg font-bold text-white">Schedule Exam</h1>
        </div>
        <button onClick={handleSave} disabled={saving || !title || !selectedQuiz || !startDate || !startTime}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white transition-all disabled:opacity-40"
          style={{ background: saved ? "#16a34a" : "linear-gradient(135deg,#7c3aed,#db2777)" }}>
          <Save size={14} />{saving ? "Scheduling…" : saved ? "Scheduled! ✓" : "Schedule Exam"}
        </button>
      </div>

      {/* Info banner */}
      <div className="flex items-start gap-3 p-4 rounded-2xl mb-6" style={{ background:"rgba(124,58,237,.15)", border:"1px solid rgba(124,58,237,.25)" }}>
        <Shield size={16} className="text-purple-400 shrink-0 mt-0.5" />
        <div className="text-sm" style={{ color:"#c4b5fd" }}>
          <strong className="text-white">Scheduled exams</strong> are locked until the exact start date and time. Students see a countdown but cannot begin early. The exam closes automatically after the access window expires.
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-4">

          {/* Basics */}
          <div className="rounded-2xl p-5 space-y-4" style={{ background:"#0d1424", border:"1px solid #1e2a3d" }}>
            <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color:"#4a5568" }}>Exam Details</p>
            <Field label="Exam Title *">
              <input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Q1 2025 PMP Mock Exam"
                className="w-full px-3 py-2.5 text-sm rounded-xl focus:outline-none"
                style={{ background:"#111827", border:"1px solid #1e2a3d", color:"#e2e8f0" }} />
            </Field>
            <Field label="Select Quiz *" hint="This quiz's questions will be used for the exam.">
              <select value={selectedQuiz} onChange={e => setSelectedQuiz(e.target.value)}
                className="w-full px-3 py-2.5 text-sm rounded-xl focus:outline-none"
                style={{ background:"#111827", border:"1px solid #1e2a3d", color:"#e2e8f0" }}>
                <option value="">— Select a quiz —</option>
                {QUIZZES_FOR_EXAM.map(q => (
                  <option key={q.id} value={q.id}>{q.title} ({q.questions} questions · {q.level})</option>
                ))}
              </select>
            </Field>
            <Field label="Exam Instructions" hint="Shown to students before they begin.">
              <textarea value={instructions} onChange={e => setInstructions(e.target.value)}
                className="w-full px-3 py-2.5 text-sm rounded-xl focus:outline-none resize-none h-24"
                style={{ background:"#111827", border:"1px solid #1e2a3d", color:"#e2e8f0" }} />
            </Field>
          </div>

          {/* Schedule */}
          <div className="rounded-2xl p-5 space-y-4" style={{ background:"#0d1424", border:"1px solid #1e2a3d" }}>
            <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color:"#4a5568" }}>Schedule & Timing</p>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Exam Date *">
                <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm rounded-xl focus:outline-none"
                  style={{ background:"#111827", border:"1px solid #1e2a3d", color:"#e2e8f0", colorScheme:"dark" }} />
              </Field>
              <Field label="Start Time *">
                <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm rounded-xl focus:outline-none"
                  style={{ background:"#111827", border:"1px solid #1e2a3d", color:"#e2e8f0", colorScheme:"dark" }} />
              </Field>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <Field label="Exam Duration (min)" hint="Total time for the exam">
                <input type="number" value={durationMinutes} onChange={e => setDurationMinutes(Number(e.target.value))}
                  min={5} max={300} className="w-full px-3 py-2.5 text-sm rounded-xl focus:outline-none"
                  style={{ background:"#111827", border:"1px solid #1e2a3d", color:"#e2e8f0" }} />
              </Field>
              <Field label="Access Window (min)" hint="How long after start can students join">
                <input type="number" value={accessWindow} onChange={e => setAccessWindow(Number(e.target.value))}
                  min={1} max={60} className="w-full px-3 py-2.5 text-sm rounded-xl focus:outline-none"
                  style={{ background:"#111827", border:"1px solid #1e2a3d", color:"#e2e8f0" }} />
              </Field>
              <Field label="Max Attempts">
                <input type="number" value={maxAttempts} onChange={e => setMaxAttempts(Number(e.target.value))}
                  min={1} max={5} className="w-full px-3 py-2.5 text-sm rounded-xl focus:outline-none"
                  style={{ background:"#111827", border:"1px solid #1e2a3d", color:"#e2e8f0" }} />
              </Field>
            </div>

            {/* Timeline preview */}
            {startDate && startTime && (
              <div className="p-3 rounded-xl" style={{ background:"rgba(255,255,255,.04)", border:"1px solid #1e2a3d" }}>
                <p className="text-[10px] font-bold uppercase tracking-wider mb-3" style={{ color:"#4a5568" }}>Timeline Preview</p>
                <div className="flex items-center gap-0">
                  {[
                    { label:"Countdown", sub:"Locked", icon:"🔒", color:"#4a6080" },
                    { label:startTime, sub:"Opens", icon:"🟢", color:"#22c55e" },
                    { label:`${startTime}+${accessWindow}m`, sub:"No new joins", icon:"⏳", color:"#f59e0b" },
                    { label:endTime, sub:"Exam ends", icon:"🏁", color:"#ef4444" },
                  ].map((step, i) => (
                    <div key={i} className="flex items-center gap-0">
                      <div className="text-center" style={{ minWidth:80 }}>
                        <div className="text-base mb-1">{step.icon}</div>
                        <div className="text-xs font-bold" style={{ color:step.color }}>{step.label}</div>
                        <div className="text-[10px]" style={{ color:"#4a6080" }}>{step.sub}</div>
                      </div>
                      {i < 3 && <div className="flex-1 h-px mx-1" style={{ background:"#1e2a3d", minWidth:16 }} />}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Access Control */}
          <div className="rounded-2xl p-5 space-y-4" style={{ background:"#0d1424", border:"1px solid #1e2a3d" }}>
            <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color:"#4a5568" }}>Access Control</p>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Who can take this exam?">
                <select value={level} onChange={e => setLevel(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm rounded-xl focus:outline-none"
                  style={{ background:"#111827", border:"1px solid #1e2a3d", color:"#e2e8f0" }}>
                  <option value="all">All Users</option>
                  <option value="beginner">Beginners only</option>
                  <option value="intermediate">Intermediate only</option>
                  <option value="advanced">Advanced only</option>
                  <option value="premium">Premium subscribers</option>
                </select>
              </Field>
              <Field label="Show Results After?">
                <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer" style={{ background:"#111827", border:"1px solid #1e2a3d" }}
                  onClick={() => setShowResults(r => !r)}>
                  <div className={`w-10 h-5 rounded-full flex items-center px-0.5 transition-colors ${showResults?"bg-green-600":"bg-slate-600"}`}>
                    <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${showResults?"translate-x-5":""}`} />
                  </div>
                  <span className="text-sm" style={{ color:showResults?"#22c55e":"#4a6080" }}>{showResults?"Yes":"No"}</span>
                </div>
              </Field>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold" style={{ color:"#94a3b8" }}>Access Code (optional)</label>
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => setRequiresCode(r => !r)}>
                  <div className={`w-8 h-4 rounded-full flex items-center px-0.5 transition-colors ${requiresCode?"bg-purple-600":"bg-slate-600"}`}>
                    <div className={`w-3 h-3 bg-white rounded-full shadow transition-transform ${requiresCode?"translate-x-4":""}`} />
                  </div>
                  <span className="text-xs" style={{ color:requiresCode?"#a78bfa":"#4a6080" }}>
                    {requiresCode ? "Required" : "Optional"}
                  </span>
                </div>
              </div>
              {requiresCode && (
                <div className="flex gap-2">
                  <input value={accessCode} onChange={e => setAccessCode(e.target.value.toUpperCase())}
                    placeholder="e.g. PM2025" maxLength={8}
                    className="flex-1 px-3 py-2.5 text-sm rounded-xl focus:outline-none font-mono tracking-widest"
                    style={{ background:"#111827", border:"1px solid #1e2a3d", color:"#e2e8f0" }} />
                  <button onClick={generateCode}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold transition-all hover:opacity-80"
                    style={{ background:"rgba(124,58,237,.25)", color:"#a78bfa", border:"1px solid rgba(124,58,237,.3)" }}>
                    Generate
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="rounded-2xl p-5" style={{ background:"#0d1424", border:"1px solid #1e2a3d" }}>
            <p className="text-[10px] font-bold uppercase tracking-wider mb-4" style={{ color:"#4a5568" }}>Exam Summary</p>
            {[
              { icon:Calendar, label:"Date", value:startDate || "Not set", color:"#60a5fa" },
              { icon:Clock, label:"Start", value:startTime || "Not set", color:"#22c55e" },
              { icon:Clock, label:"Duration", value:`${durationMinutes} min`, color:"#fbbf24" },
              { icon:Users, label:"Access window", value:`${accessWindow} min`, color:"#a78bfa" },
              { icon:Lock, label:"Max attempts", value:maxAttempts, color:"#f87171" },
            ].map(s => (
              <div key={s.label} className="flex items-center gap-3 py-2.5" style={{ borderBottom:"1px solid #111827" }}>
                <s.icon size={13} style={{ color:s.color }} className="shrink-0" />
                <span className="text-xs flex-1" style={{ color:"#4a6080" }}>{s.label}</span>
                <span className="text-xs font-bold text-white">{String(s.value)}</span>
              </div>
            ))}
          </div>

          <div className="rounded-2xl p-5" style={{ background:"#0d1424", border:"1px solid #1e2a3d" }}>
            <p className="text-[10px] font-bold uppercase tracking-wider mb-3" style={{ color:"#4a5568" }}>Checklist</p>
            {[
              { label:"Exam title", done:!!title },
              { label:"Quiz selected", done:!!selectedQuiz },
              { label:"Date set", done:!!startDate },
              { label:"Time set", done:!!startTime },
              { label:"Access code (optional)", done:!requiresCode || !!accessCode },
            ].map(c => (
              <div key={c.label} className="flex items-center gap-2 py-1.5">
                {c.done
                  ? <CheckCircle size={12} style={{ color:"#22c55e" }} />
                  : <AlertCircle size={12} style={{ color:"#4a6080" }} />}
                <span className="text-xs" style={{ color:c.done?"#e2e8f0":"#4a6080" }}>{c.label}</span>
              </div>
            ))}
          </div>

          <button onClick={handleSave} disabled={saving || !title || !selectedQuiz || !startDate || !startTime}
            className="w-full py-3.5 rounded-2xl text-sm font-black text-white transition-all disabled:opacity-40"
            style={{ background: saved ? "#16a34a" : "linear-gradient(135deg,#7c3aed,#db2777)" }}>
            {saving ? "Scheduling…" : saved ? "✓ Exam Scheduled!" : "Schedule Exam"}
          </button>

          <p className="text-xs text-center" style={{ color:"#4a6080" }}>
            Students will see a countdown on <Link href="/exams" className="underline hover:text-white transition-colors">/exams</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
