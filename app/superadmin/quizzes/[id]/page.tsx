// app/admin/quizzes/[id]/page.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Save, Eye, Trash2, Plus, GripVertical, CheckCircle, AlertCircle, BarChart3 } from "lucide-react";

const DEMO = {
  id: "quiz_001", title: "PM Fundamentals Check", level: "beginner",
  description: "Core PM concepts every beginner must know",
  timePerQ: 20, passingScore: 70, published: true,
  questions: [
    { id:"q1", question:"What is the Iron Triangle?", type:"multiple_choice", options:["People, Process, Technology","Scope, Time, Cost","Plan, Execute, Review","Risk, Quality, Communication"], correct:1, explanation:"Scope, Time & Cost — the three primary constraints.", points:10 },
    { id:"q2", question:"Which phase comes FIRST in the PM lifecycle?", type:"multiple_choice", options:["Planning","Execution","Initiation","Closing"], correct:2, explanation:"Initiation — formally authorises the project.", points:10 },
    { id:"q3", question:"A project is BEST described as:", type:"multiple_choice", options:["Ongoing daily operations","Temporary endeavor with a unique result","Annual budget exercise","A team activity"], correct:1, explanation:"Projects are temporary and produce unique deliverables.", points:10 },
    { id:"q4", question:"Scope Creep is:", type:"multiple_choice", options:["A planned expansion","Uncontrolled scope growth without change control","A risk tool","The critical path"], correct:1, explanation:"Uncontrolled additions without adjusting time/cost.", points:10 },
    { id:"q5", question:"Which methodology uses Sprints?", type:"multiple_choice", options:["Waterfall","PRINCE2","Scrum","Critical Path"], correct:2, explanation:"Scrum uses time-boxed Sprints.", points:10 },
  ],
  stats: { attempts:847, avgScore:76, passRate:68 },
};

interface Q { id:string; question:string; type:string; options:string[]; correct:number; explanation:string; points:number; }

const OC = [
  { shape:"▲", color:"#e21b3c" }, { shape:"◆", color:"#1368ce" },
  { shape:"●", color:"#d89e00" }, { shape:"■", color:"#26890c" },
];

export default function EditQuizPage({ params }: { params: { id: string } }) {
  const [quiz, setQuiz] = useState(DEMO);
  const [questions, setQuestions] = useState<Q[]>(DEMO.questions);
  const [expandedQ, setExpandedQ] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 700));
    setSaving(false); setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const updateQ = (id: string, updates: Partial<Q>) =>
    setQuestions(prev => prev.map(q => q.id === id ? { ...q, ...updates } : q));

  const updateOption = (qId: string, oi: number, val: string) =>
    setQuestions(prev => prev.map(q => {
      if (q.id !== qId) return q;
      const opts = [...q.options]; opts[oi] = val; return { ...q, options: opts };
    }));

  const addQ = () => {
    const newQ: Q = { id: `q_${Date.now()}`, question:"", type:"multiple_choice", options:["","","",""], correct:0, explanation:"", points:10 };
    setQuestions(prev => [...prev, newQ]); setExpandedQ(newQ.id);
  };

  const removeQ = (id: string) => { if (questions.length <= 1) return; setQuestions(prev => prev.filter(q => q.id !== id)); };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <Link href="/admin/quizzes" className="flex items-center gap-1.5 text-sm hover:text-white transition-colors" style={{ color:"#4a6080" }}>
            <ChevronLeft size={14} />Quizzes
          </Link>
          <span style={{ color:"#1e2a3d" }}>/</span>
          <h1 className="text-lg font-bold text-white truncate max-w-xs">{quiz.title}</h1>
        </div>
        <div className="flex gap-2">
          <Link href="/quiz" target="_blank"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold"
            style={{ background:"rgba(59,130,246,.15)", color:"#60a5fa", border:"1px solid rgba(59,130,246,.2)" }}>
            <Eye size={12} />Preview Live
          </Link>
          <button onClick={handleSave}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white"
            style={{ background: saved ? "#16a34a" : "linear-gradient(135deg,#16a34a,#0d9488)" }}>
            <Save size={12} />{saving ? "Saving…" : saved ? "Saved!" : "Save Changes"}
          </button>
        </div>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { label:"Attempts", value:quiz.stats.attempts.toLocaleString(), color:"#60a5fa" },
          { label:"Avg Score", value:`${quiz.stats.avgScore}%`, color:quiz.stats.avgScore>=70?"#22c55e":"#f59e0b" },
          { label:"Pass Rate", value:`${quiz.stats.passRate}%`, color:quiz.stats.passRate>=70?"#22c55e":"#f59e0b" },
        ].map(s => (
          <div key={s.label} className="rounded-2xl p-3 text-center" style={{ background:"#0d1424", border:"1px solid #1e2a3d" }}>
            <div className="text-lg font-black" style={{ color:s.color }}>{s.value}</div>
            <div className="text-[10px]" style={{ color:"#4a6080" }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Questions */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-white">{questions.length} Questions</p>
            <button onClick={addQ}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold"
              style={{ background:"rgba(34,197,94,.15)", color:"#22c55e", border:"1px solid rgba(34,197,94,.2)" }}>
              <Plus size={12} />Add Question
            </button>
          </div>

          {questions.map((q, qi) => (
            <div key={q.id} className="rounded-2xl overflow-hidden" style={{ background:"#0d1424", border:"1px solid #1e2a3d" }}>
              <div className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-white/[.02]"
                onClick={() => setExpandedQ(expandedQ === q.id ? null : q.id)}>
                <GripVertical size={13} style={{ color:"#374151" }} />
                <div className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black shrink-0"
                  style={{ background:"rgba(255,255,255,.07)", color:"#94a3b8" }}>{qi+1}</div>
                <span className="flex-1 text-sm text-white truncate">{q.question || <span style={{ color:"#4a6080" }}>Untitled…</span>}</span>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background:"rgba(255,255,255,.06)", color:"#6b8aad" }}>{q.points}pts</span>
                  {q.question && q.options.every(o=>o) && q.explanation
                    ? <CheckCircle size={12} className="text-green-500" />
                    : <AlertCircle size={12} style={{ color:"#4a6080" }} />}
                  {questions.length > 1 && (
                    <button onClick={e => { e.stopPropagation(); removeQ(q.id); }}
                      className="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-red-900/30">
                      <Trash2 size={11} style={{ color:"#ef4444" }} />
                    </button>
                  )}
                </div>
              </div>

              {expandedQ === q.id && (
                <div className="px-4 pb-5 pt-2 space-y-4 border-t" style={{ borderColor:"#111827" }}>
                  {/* Question text */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider mb-1.5" style={{ color:"#94a3b8" }}>Question *</label>
                    <textarea defaultValue={q.question} onChange={e => updateQ(q.id,{question:e.target.value})}
                      className="w-full px-3 py-2.5 text-sm rounded-xl resize-none h-20 focus:outline-none"
                      style={{ background:"#111827", border:"1px solid #1e2a3d", color:"#e2e8f0" }} />
                  </div>
                  {/* Options */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color:"#94a3b8" }}>
                      Options <span style={{ color:"#4a6080", textTransform:"none", letterSpacing:"normal" }}>(tap letter to mark correct)</span>
                    </label>
                    <div className="space-y-2">
                      {q.options.map((opt,oi) => {
                        const isC = q.correct === oi;
                        return (
                          <div key={oi} className="flex items-center gap-2">
                            <button onClick={() => updateQ(q.id,{correct:oi})}
                              className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-black transition-all"
                              style={{ background:isC?"#16a34a":"rgba(255,255,255,.06)", color:isC?"#fff":"#4a6080", border:`1px solid ${isC?"#16a34a":"#1e2a3d"}` }}>
                              {isC?"✓":String.fromCharCode(65+oi)}
                            </button>
                            <div className="w-5 h-5 rounded flex items-center justify-center text-[11px]"
                              style={{ background:OC[oi].color+"20", color:OC[oi].color }}>{OC[oi].shape}</div>
                            <input defaultValue={opt} onChange={e => updateOption(q.id,oi,e.target.value)}
                              placeholder={`Option ${String.fromCharCode(65+oi)}…`}
                              className="flex-1 px-3 py-2 text-xs rounded-xl focus:outline-none"
                              style={{ background:"#111827", border:`1px solid ${isC?"rgba(22,163,74,.35)":"#1e2a3d"}`, color:"#e2e8f0" }} />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  {/* Explanation */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider mb-1.5" style={{ color:"#94a3b8" }}>Explanation</label>
                    <input defaultValue={q.explanation} onChange={e => updateQ(q.id,{explanation:e.target.value})}
                      className="w-full px-3 py-2 text-xs rounded-xl focus:outline-none"
                      style={{ background:"#111827", border:"1px solid #1e2a3d", color:"#e2e8f0" }} />
                  </div>
                  {/* Points */}
                  <div className="flex items-center gap-3">
                    <label className="text-[10px] font-bold uppercase tracking-wider" style={{ color:"#94a3b8" }}>Points</label>
                    <input type="number" defaultValue={q.points} onChange={e => updateQ(q.id,{points:Number(e.target.value)})}
                      className="w-20 px-3 py-2 text-xs rounded-xl focus:outline-none"
                      style={{ background:"#111827", border:"1px solid #1e2a3d", color:"#e2e8f0" }} min={1} max={100} />
                  </div>
                </div>
              )}
            </div>
          ))}

          <button onClick={addQ}
            className="w-full py-3 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2 transition-colors hover:bg-white/5"
            style={{ background:"rgba(255,255,255,.03)", border:"1px dashed #1e2a3d", color:"#4a6080" }}>
            <Plus size={14} />Add Question
          </button>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Settings */}
          <div className="rounded-2xl p-5 space-y-4" style={{ background:"#0d1424", border:"1px solid #1e2a3d" }}>
            <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color:"#4a5568" }}>Settings</p>
            {[
              { label:"Title", val:quiz.title, setter:(v: string)=>setQuiz({...quiz,title:v}) },
            ].map(f => (
              <div key={f.label}>
                <label className="block text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color:"#94a3b8" }}>{f.label}</label>
                <input defaultValue={f.val} onChange={e=>f.setter(e.target.value)} className="w-full px-3 py-2 text-xs rounded-xl focus:outline-none"
                  style={{ background:"#111827", border:"1px solid #1e2a3d", color:"#e2e8f0" }} />
              </div>
            ))}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color:"#94a3b8" }}>Secs/Q</label>
                <input type="number" defaultValue={quiz.timePerQ} className="w-full px-3 py-2 text-xs rounded-xl focus:outline-none"
                  style={{ background:"#111827", border:"1px solid #1e2a3d", color:"#e2e8f0" }} />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color:"#94a3b8" }}>Pass %</label>
                <input type="number" defaultValue={quiz.passingScore} className="w-full px-3 py-2 text-xs rounded-xl focus:outline-none"
                  style={{ background:"#111827", border:"1px solid #1e2a3d", color:"#e2e8f0" }} />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider mb-1.5" style={{ color:"#94a3b8" }}>Status</label>
              <button onClick={() => setQuiz({...quiz, published:!quiz.published})}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold"
                style={{ background:quiz.published?"rgba(34,197,94,.15)":"rgba(255,255,255,.06)", color:quiz.published?"#22c55e":"#4a6080", border:`1px solid ${quiz.published?"rgba(34,197,94,.25)":"#1e2a3d"}` }}>
                {quiz.published ? <><CheckCircle size={12} />Published</> : <><AlertCircle size={12} />Draft</>}
              </button>
            </div>
          </div>

          {/* Analytics link */}
          <div className="rounded-2xl p-4" style={{ background:"#0d1424", border:"1px solid #1e2a3d" }}>
            <p className="text-[10px] font-bold uppercase tracking-wider mb-3" style={{ color:"#4a5568" }}>Analytics</p>
            <Link href="/admin/analytics"
              className="flex items-center gap-2 text-xs font-semibold px-3 py-2.5 rounded-xl transition-all hover:bg-white/5"
              style={{ background:"rgba(255,255,255,.04)", color:"#60a5fa", border:"1px solid #1e2a3d" }}>
              <BarChart3 size={13} />View Full Analytics →
            </Link>
          </div>

          {/* Danger */}
          <div className="rounded-2xl p-4" style={{ background:"#0d1424", border:"1px solid rgba(239,68,68,.2)" }}>
            <p className="text-[10px] font-bold uppercase tracking-wider mb-3 text-red-500">Danger Zone</p>
            <button className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold"
              style={{ background:"rgba(239,68,68,.1)", color:"#ef4444", border:"1px solid rgba(239,68,68,.2)" }}>
              <Trash2 size={12} />Delete Quiz
            </button>
          </div>

          <button onClick={handleSave}
            className="w-full py-3 rounded-2xl text-sm font-bold text-white"
            style={{ background: saved?"#16a34a":"linear-gradient(135deg,#16a34a,#0d9488)" }}>
            {saving?"Saving…":saved?"✓ Saved!":"Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
