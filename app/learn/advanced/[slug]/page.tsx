// app/learn/advanced/[slug]/page.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, CheckCircle2, List, Bookmark, Share2, BarChart3, Clock } from "lucide-react";

const MODULES = [
  { title: "PMBOK 7 — 12 Principles", slug: "pmbok-principles", done: false, current: true, duration: "50 min" },
  { title: "Performance Domains Deep Dive", slug: "performance-domains", done: false, current: false, duration: "60 min" },
  { title: "EVM Mastery & Formulas", slug: "evm-mastery", done: false, current: false, duration: "45 min" },
  { title: "Risk & Uncertainty in PMBOK 7", slug: "risk-uncertainty", done: false, current: false, duration: "40 min" },
  { title: "Agile Hybrid Approaches", slug: "agile-hybrid", done: false, current: false, duration: "55 min" },
  { title: "Stakeholder Engagement Mastery", slug: "stakeholder-mastery", done: false, current: false, duration: "35 min" },
];

const QUIZ = [
  { id: "q1", q: "According to PMBOK 7, which of the following is NOT one of the 12 PM Principles?", opts: ["Stewardship", "Micromanagement", "Leadership", "Adaptability & Resiliency"], correct: 1, exp: "Micromanagement is not a PM principle. PMBOK 7 emphasises servant leadership and team empowerment over micromanagement." },
  { id: "q2", q: "How many Performance Domains are defined in PMBOK 7?", opts: ["5", "8", "10", "12"], correct: 1, exp: "PMBOK 7 defines 8 Performance Domains: Stakeholders, Team, Development Approach & Lifecycle, Planning, Project Work, Delivery, Measurement, and Uncertainty." },
  { id: "q3", q: "PMBOK 7 represents a shift from _____ to _____.", opts: ["Process-based to principles-based", "Agile to Waterfall", "Risk-based to quality-based", "Input/output to checklist"], correct: 0, exp: "PMBOK 7 shifted from the prescriptive process-based approach of PMBOK 6 to a principles-based approach focused on outcomes." },
];

export default function AdvancedModulePage({ params }: { params: { slug: string } }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [tab, setTab] = useState<"content" | "notes">("content");
  const [quizActive, setQuizActive] = useState(false);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const score = submitted ? QUIZ.filter((q, i) => answers[q.id] === q.correct).length : 0;
  const scorePct = Math.round((score / QUIZ.length) * 100);

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-[#eef2f7]">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? "w-60" : "w-0"} shrink-0 transition-all duration-300 overflow-hidden border-r border-slate-200 bg-white flex flex-col`}>
        <div className="p-4 border-b border-slate-100">
          <Link href="/learn/advanced" className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-ink mb-2 transition-colors">
            <ChevronLeft size={12} /> PMP Bootcamp
          </Link>
          <p className="text-xs font-semibold text-ink">PMP Certification Bootcamp</p>
          <div className="mt-2 h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full rounded-full" style={{ width: "1.7%", background: "#7c3aed" }} />
          </div>
          <p className="text-[10px] text-slate-400 mt-0.5">1 of 60 modules</p>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
          {MODULES.map((mod) => (
            <Link key={mod.slug} href={`/learn/advanced/${mod.slug}`}
              className={`flex items-start gap-2.5 p-2.5 rounded-xl transition-all ${mod.current ? "bg-purple-50 border border-purple-200" : "hover:bg-slate-50"}`}>
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${mod.done ? "bg-purple-600 border-purple-600" : mod.current ? "border-purple-500" : "border-slate-300"}`}>
                {mod.done && <CheckCircle2 size={10} className="text-white" />}
                {mod.current && !mod.done && <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />}
              </div>
              <div>
                <p className={`text-[11px] font-medium leading-snug ${mod.current ? "text-purple-800" : "text-ink"}`}>{mod.title}</p>
                <p className="text-[9px] text-slate-400">{mod.duration}</p>
              </div>
            </Link>
          ))}
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 overflow-y-auto">
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200 px-5 py-3 flex items-center gap-3">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-xl hover:bg-slate-100 transition-colors">
            <List size={16} className="text-slate-500" />
          </button>
          <div className="flex-1">
            <p className="text-sm font-semibold text-ink">PMBOK 7 — 12 PM Principles</p>
            <p className="text-[10px] text-slate-400 flex items-center gap-1.5">
              <Clock size={10} />50 min · PMP Bootcamp
            </p>
          </div>
          <button onClick={() => setBookmarked(!bookmarked)} className={`p-2 rounded-xl transition-colors ${bookmarked ? "text-amber-500 bg-amber-50" : "text-slate-400 hover:bg-slate-100"}`}>
            <Bookmark size={15} />
          </button>
          <button className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 transition-colors">
            <Share2 size={15} />
          </button>
          <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-advanced-light text-advanced border border-advanced/20">Advanced</span>
        </div>

        <div className="max-w-3xl mx-auto px-5 py-8 space-y-6">
          {/* Video */}
          <div className="aspect-video bg-ink rounded-2xl overflow-hidden shadow-lg">
            <iframe src="https://www.youtube.com/embed/example-pmbok7" className="w-full h-full" allowFullScreen />
          </div>

          {/* Tabs */}
          <div className="flex border-b border-slate-200 gap-1">
            {(["content", "notes"] as const).map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`px-4 py-2.5 text-sm font-medium capitalize border-b-2 -mb-px transition-colors ${tab === t ? "text-purple-700 border-purple-600" : "text-slate-400 border-transparent hover:text-ink"}`}>
                {t}
              </button>
            ))}
          </div>

          {tab === "content" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-display font-bold text-ink mb-4">PMBOK 7 — 12 PM Principles</h1>
                <p className="text-sm text-ink-muted leading-relaxed mb-4">
                  PMBOK 7 represents a fundamental shift in how PMI defines project management. Instead of prescriptive processes,
                  it now offers 12 principles that guide PM thinking and decision-making.
                </p>

                {/* Principles list */}
                <div className="space-y-3 mb-6">
                  {[
                    ["1", "Stewardship", "Be a diligent, respectful, and caring steward. Act with integrity and take responsibility for project outcomes.", "#7c3aed"],
                    ["2", "Team", "Create a collaborative project team environment. Build a high-performing team with clear roles and accountability.", "#2563eb"],
                    ["3", "Stakeholders", "Engage stakeholders proactively. Understand their interests and manage them throughout the project.", "#16a34a"],
                    ["4", "Value", "Focus on value delivery. Every project action should connect to delivering value to the customer or organisation.", "#0891b2"],
                    ["5", "Systems Thinking", "Recognise, evaluate, and respond to system interactions. Projects exist within complex environments.", "#7c3aed"],
                    ["6", "Leadership", "Demonstrate leadership behaviours. Inspire, motivate, and guide — not just manage tasks.", "#f97316"],
                    ["7", "Tailoring", "Tailor the approach based on context. No single approach works for every project.", "#16a34a"],
                    ["8", "Quality", "Build quality into processes and outcomes. Quality is everyone's responsibility, not just QA.", "#2563eb"],
                    ["9", "Complexity", "Navigate complexity. Embrace uncertainty and adapt approaches to complex situations.", "#7c3aed"],
                    ["10", "Risk", "Optimise risk responses. Seek opportunities, not just threats, and manage uncertainty proactively.", "#ef4444"],
                    ["11", "Adaptability & Resiliency", "Build in resilience. Teams should be able to adapt quickly to changing conditions.", "#16a34a"],
                    ["12", "Change", "Enable change to achieve the envisioned future state. Manage change deliberately and empathetically.", "#0891b2"],
                  ].map(([num, name, desc, color]) => (
                    <div key={num} className="flex gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0" style={{ background: color as string }}>
                        {num}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-ink">{name}</p>
                        <p className="text-xs text-ink-muted mt-0.5">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <blockquote className="border-l-4 border-purple-400 pl-4 py-2 bg-purple-50 rounded-r-xl text-sm text-purple-800 italic">
                  💡 Exam tip: The 12 principles are tested conceptually — you need to understand WHEN to apply each, not just memorise them. Focus on scenario-based questions.
                </blockquote>
              </div>

              {/* Quiz */}
              {!quizActive ? (
                <div className="card p-6 text-center bg-gradient-to-br from-purple-50 to-pink-50 border-purple-100">
                  <BarChart3 size={28} className="text-purple-600 mx-auto mb-3" />
                  <h3 className="font-bold text-lg text-ink mb-2">Knowledge Check</h3>
                  <p className="text-sm text-ink-muted mb-4">{QUIZ.length} PMP-style questions · Need 75%+ to pass</p>
                  <button onClick={() => setQuizActive(true)} className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-white text-sm font-semibold hover:-translate-y-0.5 transition-all" style={{ background: "#7c3aed" }}>
                    Start Quiz
                  </button>
                </div>
              ) : (
                <div className="card p-6 space-y-5">
                  <h3 className="font-bold text-lg text-ink">Module Quiz</h3>
                  {QUIZ.map((q, qi) => (
                    <div key={q.id} className="space-y-2.5">
                      <p className="font-medium text-sm text-ink">{qi + 1}. {q.q}</p>
                      <div className="space-y-1.5">
                        {q.opts.map((opt, oi) => {
                          const sel = answers[q.id] === oi;
                          const correct = submitted && oi === q.correct;
                          const wrong = submitted && sel && oi !== q.correct;
                          return (
                            <button key={oi} onClick={() => !submitted && setAnswers({ ...answers, [q.id]: oi })} disabled={submitted}
                              className={`w-full flex items-center gap-2 p-3 rounded-xl border text-left text-sm transition-all ${correct ? "border-purple-500 bg-purple-50 text-purple-800" : wrong ? "border-red-400 bg-red-50" : sel ? "border-purple-400 bg-purple-50" : "border-slate-200 hover:border-purple-300 text-ink-muted"}`}>
                              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 text-[10px] font-bold ${correct ? "bg-purple-600 border-purple-600 text-white" : wrong ? "bg-red-500 border-red-500 text-white" : sel ? "border-purple-500" : "border-slate-300"}`}>
                                {correct ? "✓" : wrong ? "✗" : String.fromCharCode(65 + oi)}
                              </div>
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                      {submitted && <div className="p-2.5 bg-purple-50 border border-purple-100 rounded-xl text-xs text-purple-800">💡 {q.exp}</div>}
                    </div>
                  ))}
                  {!submitted ? (
                    <button onClick={() => setSubmitted(true)} disabled={Object.keys(answers).length < QUIZ.length}
                      className="w-full py-3 rounded-2xl text-white font-semibold disabled:opacity-50" style={{ background: "#7c3aed" }}>
                      Submit Answers
                    </button>
                  ) : (
                    <div className="p-4 rounded-xl text-center" style={{ background: scorePct >= 75 ? "#f0fdf4" : "#fef2f2", border: `1px solid ${scorePct >= 75 ? "#bbf7d0" : "#fecaca"}` }}>
                      <p className="text-2xl font-bold text-ink">{scorePct}%</p>
                      <p className="text-sm text-ink-muted mt-1">{scorePct >= 75 ? "✅ Passed!" : "Need 75%+ to pass — retry"}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {tab === "notes" && (
            <div className="space-y-3">
              <textarea className="input h-40 resize-none text-sm font-mono" placeholder="Your notes for this module..." />
              <button className="py-2.5 px-5 rounded-xl text-white text-sm font-semibold" style={{ background: "#7c3aed" }}>Save Notes</button>
            </div>
          )}

          {/* Nav */}
          <div className="flex justify-between pt-4 border-t border-slate-200">
            <button className="btn-secondary" disabled><ChevronLeft size={16} />Previous</button>
            <Link href="/learn/advanced/performance-domains" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold" style={{ background: "#7c3aed" }}>
              Next Module <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
