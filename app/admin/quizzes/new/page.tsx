// app/admin/quizzes/new/page.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Plus, Trash2, GripVertical, Save, Eye, CheckCircle, Clock, AlertCircle } from "lucide-react";

interface Question {
  id: string;
  question: string;
  type: "multiple_choice" | "true_false" | "scenario";
  options: string[];
  correct: number;
  explanation: string;
  points: number;
  domain?: string;
}

const newQ = (): Question => ({
  id: `q_${Date.now()}`,
  question: "",
  type: "multiple_choice",
  options: ["", "", "", ""],
  correct: 0,
  explanation: "",
  points: 10,
});

const Field = ({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) => (
  <div>
    <label className="block text-xs font-semibold mb-1.5" style={{ color:"#94a3b8" }}>{label}</label>
    {children}
    {hint && <p className="text-[11px] mt-1" style={{ color:"#4a6080" }}>{hint}</p>}
  </div>
);

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input {...props} className="w-full px-3 py-2.5 text-sm rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500/50"
    style={{ background:"#111827", border:"1px solid #1e2a3d", color:"#e2e8f0", ...(props.style || {}) }} />
);

const Select = ({ value, onChange, children }: { value: string; onChange: (v: string) => void; children: React.ReactNode }) => (
  <select value={value} onChange={e => onChange(e.target.value)}
    className="w-full px-3 py-2.5 text-sm rounded-xl focus:outline-none"
    style={{ background:"#111827", border:"1px solid #1e2a3d", color:"#e2e8f0" }}>
    {children}
  </select>
);

export default function NewQuizPage() {
  const [title, setTitle] = useState("");
  const [level, setLevel] = useState("beginner");
  const [timePerQ, setTimePerQ] = useState(20);
  const [passingScore, setPassingScore] = useState(70);
  const [description, setDescription] = useState("");
  const [published, setPublished] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([newQ()]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [expandedQ, setExpandedQ] = useState<string | null>(questions[0].id);

  const addQuestion = () => {
    const q = newQ();
    setQuestions(prev => [...prev, q]);
    setExpandedQ(q.id);
  };

  const removeQuestion = (id: string) => {
    if (questions.length <= 1) return;
    setQuestions(prev => prev.filter(q => q.id !== id));
  };

  const updateQ = (id: string, updates: Partial<Question>) => {
    setQuestions(prev => prev.map(q => q.id === id ? { ...q, ...updates } : q));
  };

  const updateOption = (qId: string, optIdx: number, val: string) => {
    setQuestions(prev => prev.map(q => {
      if (q.id !== qId) return q;
      const opts = [...q.options];
      opts[optIdx] = val;
      return { ...q, options: opts };
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 800));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const LEVEL_COLORS: Record<string, string> = { beginner:"#22c55e", intermediate:"#60a5fa", advanced:"#a78bfa" };

  return (
    <div className="p-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <Link href="/admin/quizzes" className="flex items-center gap-1.5 text-sm transition-colors hover:text-white" style={{ color:"#4a6080" }}>
            <ChevronLeft size={15} />Quizzes
          </Link>
          <span style={{ color:"#1e2a3d" }}>/</span>
          <h1 className="text-lg font-bold text-white">New Quiz</h1>
        </div>
        <div className="flex gap-2">
          <Link href="/quiz" target="_blank"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all"
            style={{ background:"rgba(59,130,246,.15)", color:"#60a5fa", border:"1px solid rgba(59,130,246,.2)" }}>
            <Eye size={13} />Preview
          </Link>
          <button onClick={handleSave} disabled={saving || !title.trim()}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white transition-all disabled:opacity-50"
            style={{ background: saved ? "#16a34a" : "linear-gradient(135deg,#16a34a,#0d9488)" }}>
            <Save size={13} />{saving ? "Saving…" : saved ? "Saved!" : "Save Quiz"}
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Main */}
        <div className="lg:col-span-2 space-y-4">
          {/* Meta */}
          <div className="rounded-2xl p-5 space-y-4" style={{ background:"#0d1424", border:"1px solid #1e2a3d" }}>
            <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color:"#4a5568" }}>Quiz Info</p>
            <Field label="Quiz Title *">
              <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. PM Fundamentals Check" />
            </Field>
            <Field label="Description">
              <textarea value={description} onChange={e => setDescription(e.target.value)}
                placeholder="What will this quiz test?"
                className="w-full px-3 py-2.5 text-sm rounded-xl focus:outline-none resize-none h-20"
                style={{ background:"#111827", border:"1px solid #1e2a3d", color:"#e2e8f0" }} />
            </Field>
            <div className="grid grid-cols-3 gap-3">
              <Field label="Level">
                <Select value={level} onChange={setLevel}>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </Select>
              </Field>
              <Field label="Seconds per Question">
                <Input type="number" value={timePerQ} onChange={e => setTimePerQ(Number(e.target.value))} min={10} max={120} />
              </Field>
              <Field label="Passing Score (%)">
                <Input type="number" value={passingScore} onChange={e => setPassingScore(Number(e.target.value))} min={50} max={100} />
              </Field>
            </div>
          </div>

          {/* Questions */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-white">{questions.length} Question{questions.length!==1?"s":""}</p>
              <button onClick={addQuestion}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all hover:opacity-90"
                style={{ background:"rgba(34,197,94,.2)", color:"#22c55e", border:"1px solid rgba(34,197,94,.2)" }}>
                <Plus size={13} />Add Question
              </button>
            </div>

            {questions.map((q, qi) => (
              <div key={q.id} className="rounded-2xl overflow-hidden transition-all" style={{ background:"#0d1424", border:"1px solid #1e2a3d" }}>
                {/* Question header */}
                <div className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-white/[.03] transition-colors"
                  onClick={() => setExpandedQ(expandedQ === q.id ? null : q.id)}>
                  <GripVertical size={14} style={{ color:"#374151" }} className="cursor-grab shrink-0" />
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black shrink-0"
                    style={{ background:"rgba(255,255,255,.08)", color:"#94a3b8" }}>{qi+1}</div>
                  <p className="flex-1 text-sm text-white truncate">
                    {q.question || <span style={{ color:"#4a6080" }}>Untitled question…</span>}
                  </p>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ background:"rgba(255,255,255,.06)", color:"#6b8aad" }}>
                      {q.points}pts
                    </span>
                    {q.question && q.options.every(o=>o) && q.explanation && (
                      <CheckCircle size={13} className="text-green-500" />
                    )}
                    {questions.length > 1 && (
                      <button onClick={e => { e.stopPropagation(); removeQuestion(q.id); }}
                        className="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-red-900/30 transition-colors">
                        <Trash2 size={12} style={{ color:"#ef4444" }} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Expanded editor */}
                {expandedQ === q.id && (
                  <div className="px-4 pb-5 pt-1 space-y-4 border-t" style={{ borderColor:"#111827" }}>
                    <Field label="Question Text *">
                      <textarea value={q.question} onChange={e => updateQ(q.id, { question: e.target.value })}
                        placeholder="Write a clear, unambiguous question…"
                        className="w-full px-3 py-2.5 text-sm rounded-xl focus:outline-none resize-none h-20"
                        style={{ background:"#111827", border:"1px solid #1e2a3d", color:"#e2e8f0" }} />
                    </Field>

                    <div className="grid grid-cols-3 gap-3">
                      <Field label="Type">
                        <Select value={q.type} onChange={v => updateQ(q.id, { type: v as Question["type"] })}>
                          <option value="multiple_choice">Multiple Choice</option>
                          <option value="true_false">True / False</option>
                          <option value="scenario">Scenario</option>
                        </Select>
                      </Field>
                      <Field label="Points">
                        <Input type="number" value={q.points} onChange={e => updateQ(q.id, { points: Number(e.target.value) })} min={1} max={100} />
                      </Field>
                      <Field label="Domain (optional)">
                        <Input value={q.domain ?? ""} onChange={e => updateQ(q.id, { domain: e.target.value })} placeholder="e.g. EVM, PMBOK 7" />
                      </Field>
                    </div>

                    {/* Options */}
                    <div>
                      <label className="block text-xs font-semibold mb-2" style={{ color:"#94a3b8" }}>
                        Answer Options <span style={{ color:"#4a6080" }}>(click radio to mark correct)</span>
                      </label>
                      <div className="space-y-2">
                        {(q.type === "true_false" ? ["True","False"] : q.options).map((opt, oi) => {
                          const isCorrect = q.correct === oi;
                          const shapes = ["▲","◆","●","■"];
                          const colors = ["#e21b3c","#1368ce","#d89e00","#26890c"];
                          return (
                            <div key={oi} className="flex items-center gap-2.5">
                              <button onClick={() => updateQ(q.id, { correct: oi })}
                                className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all hover:scale-110 font-bold text-xs"
                                style={{ background: isCorrect ? "#16a34a" : "rgba(255,255,255,.06)", color: isCorrect ? "#fff" : "#4a6080", border:`1px solid ${isCorrect?"#16a34a":"#1e2a3d"}` }}>
                                {isCorrect ? "✓" : String.fromCharCode(65+oi)}
                              </button>
                              <div className="w-5 h-5 rounded-md flex items-center justify-center text-[11px]"
                                style={{ background:colors[oi]+"25", color:colors[oi] }}>{shapes[oi]}</div>
                              {q.type === "true_false"
                                ? <div className="flex-1 px-3 py-2 text-sm rounded-xl" style={{ background:"#111827", border:"1px solid #1e2a3d", color:"#94a3b8" }}>{opt}</div>
                                : <input value={opt} onChange={e => updateOption(q.id, oi, e.target.value)}
                                    placeholder={`Option ${String.fromCharCode(65+oi)}…`}
                                    className="flex-1 px-3 py-2 text-sm rounded-xl focus:outline-none"
                                    style={{ background:"#111827", border:`1px solid ${isCorrect?"#16a34a33":"#1e2a3d"}`, color:"#e2e8f0" }} />
                              }
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <Field label="Explanation (shown after answer)" hint="Explain why the correct answer is right. Keep it concise.">
                      <textarea value={q.explanation} onChange={e => updateQ(q.id, { explanation: e.target.value })}
                        placeholder="Because…"
                        className="w-full px-3 py-2 text-sm rounded-xl focus:outline-none resize-none h-16"
                        style={{ background:"#111827", border:"1px solid #1e2a3d", color:"#e2e8f0" }} />
                    </Field>
                  </div>
                )}
              </div>
            ))}

            <button onClick={addQuestion}
              className="w-full py-3 rounded-2xl text-sm font-semibold transition-all hover:bg-white/5 flex items-center justify-center gap-2"
              style={{ background:"rgba(255,255,255,.04)", border:"1px dashed #1e2a3d", color:"#4a6080" }}>
              <Plus size={15} />Add Another Question
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Publish */}
          <div className="rounded-2xl p-5" style={{ background:"#0d1424", border:"1px solid #1e2a3d" }}>
            <p className="text-[10px] font-bold uppercase tracking-wider mb-4" style={{ color:"#4a5568" }}>Publish Settings</p>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-white">Status</span>
              <button onClick={() => setPublished(p => !p)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all"
                style={{ background: published ? "rgba(34,197,94,.2)" : "rgba(255,255,255,.06)", color: published ? "#22c55e" : "#4a6080", border:`1px solid ${published?"rgba(34,197,94,.3)":"#1e2a3d"}` }}>
                {published ? <CheckCircle size={12} /> : <AlertCircle size={12} />}
                {published ? "Published" : "Draft"}
              </button>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-xl text-xs" style={{ background:"rgba(255,255,255,.04)", color:"#4a6080" }}>
              <Clock size={12} />
              {timePerQ}s per question · {questions.length * timePerQ}s total
            </div>
          </div>

          {/* Summary */}
          <div className="rounded-2xl p-5" style={{ background:"#0d1424", border:"1px solid #1e2a3d" }}>
            <p className="text-[10px] font-bold uppercase tracking-wider mb-4" style={{ color:"#4a5568" }}>Summary</p>
            {[
              { label:"Questions", value:questions.length },
              { label:"Total Points", value:questions.reduce((a,q)=>a+q.points,0) },
              { label:"Time limit", value:`${Math.ceil(questions.length * timePerQ / 60)}m` },
              { label:"Level", value:level, color:LEVEL_COLORS[level] },
              { label:"Passing", value:`${passingScore}%` },
            ].map(s => (
              <div key={s.label} className="flex items-center justify-between py-2.5" style={{ borderBottom:"1px solid #111827" }}>
                <span className="text-xs" style={{ color:"#4a6080" }}>{s.label}</span>
                <span className="text-sm font-bold" style={{ color:(s as {color?:string}).color ?? "#fff" }}>{s.value}</span>
              </div>
            ))}
          </div>

          {/* Completeness check */}
          <div className="rounded-2xl p-5" style={{ background:"#0d1424", border:"1px solid #1e2a3d" }}>
            <p className="text-[10px] font-bold uppercase tracking-wider mb-3" style={{ color:"#4a5568" }}>Checklist</p>
            {[
              { label:"Quiz title set", done:!!title.trim() },
              { label:"At least 1 question", done:questions.length >= 1 },
              { label:"All questions have text", done:questions.every(q=>q.question.trim()) },
              { label:"All options filled", done:questions.every(q=>q.options.every(o=>o.trim())) },
              { label:"All have explanations", done:questions.every(q=>q.explanation.trim()) },
            ].map(c => (
              <div key={c.label} className="flex items-center gap-2 py-1.5">
                <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: c.done ? "rgba(34,197,94,.2)" : "rgba(255,255,255,.06)" }}>
                  {c.done ? <CheckCircle size={10} style={{ color:"#22c55e" }} /> : <span style={{ width:6, height:6, borderRadius:"50%", background:"#374151", display:"block" }} />}
                </div>
                <span className="text-xs" style={{ color: c.done ? "#e2e8f0" : "#4a6080" }}>{c.label}</span>
              </div>
            ))}
          </div>

          <button onClick={handleSave} disabled={saving || !title.trim()}
            className="w-full py-3 rounded-2xl text-sm font-bold text-white transition-all disabled:opacity-40"
            style={{ background: saved ? "#16a34a" : "linear-gradient(135deg,#16a34a,#0d9488)" }}>
            {saving ? "Saving…" : saved ? "✓ Saved!" : "Save Quiz"}
          </button>
        </div>
      </div>
    </div>
  );
}

const LEVEL_COLORS: Record<string, string> = { beginner:"#22c55e", intermediate:"#60a5fa", advanced:"#a78bfa" };
