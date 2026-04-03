// app/learn/intermediate/[slug]/page.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, CheckCircle2, Play, Download, BookOpen, BarChart3, List } from "lucide-react";

const MODULES = [
  { id: "mod_006", title: "Identifying Project Risks", slug: "identifying-risks", done: false, current: true, duration: "45 min" },
  { id: "mod_007", title: "Risk Assessment Matrix", slug: "risk-assessment", done: false, current: false, duration: "35 min" },
  { id: "mod_008", title: "Risk Response Strategies", slug: "risk-response", done: false, current: false, duration: "40 min" },
  { id: "mod_009", title: "Stakeholder Mapping", slug: "stakeholder-mapping", done: false, current: false, duration: "30 min" },
  { id: "mod_010", title: "Communication Planning", slug: "communication-planning", done: false, current: false, duration: "25 min" },
];

export default function IntermediateModulePage({ params }: { params: { slug: string } }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<"content" | "notes">("content");
  const [quizActive, setQuizActive] = useState(false);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const questions = [
    { id: "q1", q: "Which technique uses expert judgment to identify risks?", opts: ["Brainstorming","Delphi Technique","SWOT Analysis","All of the above"], correct: 3, exp: "All three techniques — brainstorming, Delphi, and SWOT — use expert judgment to identify project risks." },
    { id: "q2", q: "A risk register primarily contains:", opts: ["Budget items","Identified risks and responses","Team member assignments","Project milestones"], correct: 1, exp: "The risk register is the key document for recording identified risks, their probability, impact, and planned responses." },
  ];

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-[#eef2f7]">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? "w-60" : "w-0"} shrink-0 transition-all duration-300 overflow-hidden border-r border-slate-200 bg-white flex flex-col`}>
        <div className="p-4 border-b border-slate-100">
          <Link href="/learn/intermediate" className="flex items-center gap-2 text-xs text-slate-400 hover:text-ink mb-2 transition-colors">
            <ChevronLeft size={12} /> Risk Management
          </Link>
          <p className="text-xs font-semibold text-ink">Risk Management & Mitigation</p>
          <div className="mt-2 h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full" style={{ width: "6.7%" }} />
          </div>
          <p className="text-[10px] text-slate-400 mt-0.5">1 of 15 modules</p>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
          {MODULES.map((mod) => (
            <Link key={mod.id} href={`/learn/intermediate/${mod.slug}`}
              className={`flex items-start gap-2.5 p-2.5 rounded-xl transition-all ${mod.current ? "bg-blue-50 border border-blue-200" : "hover:bg-slate-50"}`}>
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${mod.done ? "bg-blue-500 border-blue-500" : mod.current ? "border-blue-500" : "border-slate-300"}`}>
                {mod.done && <CheckCircle2 size={10} className="text-white" />}
                {mod.current && !mod.done && <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />}
              </div>
              <div>
                <p className={`text-[11px] font-medium leading-snug ${mod.current ? "text-blue-800" : "text-ink"}`}>{mod.title}</p>
                <p className="text-[9px] text-slate-400">{mod.duration}</p>
              </div>
            </Link>
          ))}
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 overflow-y-auto">
        {/* Top bar */}
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200 px-5 py-3 flex items-center gap-3">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-xl hover:bg-slate-100 transition-colors">
            <List size={16} className="text-slate-500" />
          </button>
          <div className="flex-1">
            <p className="text-sm font-semibold text-ink">Identifying Project Risks</p>
            <p className="text-[10px] text-slate-400">Risk Management · 45 min</p>
          </div>
          <span className="badge-intermediate text-[10px]">Intermediate</span>
        </div>

        <div className="max-w-3xl mx-auto px-5 py-8 space-y-6">
          {/* Video */}
          <div className="aspect-video bg-ink rounded-2xl overflow-hidden shadow-lg">
            <iframe src="https://www.youtube.com/embed/example" className="w-full h-full" allowFullScreen />
          </div>

          {/* Tabs */}
          <div className="flex border-b border-slate-200 gap-1">
            {(["content","notes"] as const).map((t) => (
              <button key={t} onClick={() => setActiveTab(t)} className={`px-4 py-2.5 text-sm font-medium capitalize transition-colors border-b-2 -mb-px ${activeTab===t ? "text-blue-700 border-blue-600" : "text-slate-400 border-transparent hover:text-ink"}`}>{t}</button>
            ))}
          </div>

          {activeTab === "content" && (
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="font-display font-bold text-2xl text-ink">Identifying Project Risks</h2>
                <p className="text-sm text-ink-muted leading-relaxed">Risk identification is the process of finding, recognising, and recording risks that might affect your project objectives. The earlier you identify risks, the more time you have to plan effective responses.</p>
                <h3 className="font-semibold text-lg text-ink">Key Identification Techniques</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { name: "Brainstorming", desc: "Team workshop to generate risk ideas freely" },
                    { name: "Delphi Technique", desc: "Anonymous expert consensus through rounds" },
                    { name: "SWOT Analysis", desc: "Strengths, Weaknesses, Opportunities, Threats" },
                    { name: "Checklist Analysis", desc: "Historical risk lists from past projects" },
                  ].map((t) => (
                    <div key={t.name} className="p-3 bg-blue-50 border border-blue-100 rounded-xl">
                      <p className="font-semibold text-sm text-ink">{t.name}</p>
                      <p className="text-xs text-ink-muted mt-0.5">{t.desc}</p>
                    </div>
                  ))}
                </div>
                <blockquote className="border-l-4 border-blue-400 pl-4 py-1 bg-blue-50 rounded-r-xl text-sm text-blue-800 italic">
                  💡 Pro tip: Involve key stakeholders and subject matter experts in your risk identification sessions. Their domain knowledge often surfaces risks that the PM team would miss.
                </blockquote>
              </div>

              {/* Downloads */}
              <div className="card p-4">
                <h3 className="font-semibold text-ink mb-3 flex items-center gap-2"><Download size={14} className="text-blue-600" />Resources</h3>
                {["Risk Register Template.xlsx", "Risk Identification Checklist.pdf"].map(f => (
                  <button key={f} className="flex items-center gap-2 w-full text-left text-sm text-ink-muted hover:text-blue-600 py-2 transition-colors">
                    <BookOpen size={13} className="text-blue-500 shrink-0" />{f}
                  </button>
                ))}
              </div>

              {/* Quiz */}
              {!quizActive ? (
                <div className="card p-6 text-center bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-100">
                  <BarChart3 size={28} className="text-blue-600 mx-auto mb-3" />
                  <h3 className="font-bold text-lg text-ink mb-2">Test Your Knowledge</h3>
                  <p className="text-sm text-ink-muted mb-4">{questions.length} questions · 70% to pass</p>
                  <button onClick={() => setQuizActive(true)} className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors">
                    <Play size={14} /> Start Quiz
                  </button>
                </div>
              ) : (
                <div className="card p-6 space-y-5">
                  <h3 className="font-bold text-lg text-ink">Module Quiz</h3>
                  {questions.map((q, qi) => (
                    <div key={q.id} className="space-y-2.5">
                      <p className="font-medium text-sm text-ink">{qi+1}. {q.q}</p>
                      <div className="space-y-1.5">
                        {q.opts.map((opt, oi) => {
                          const sel = answers[q.id] === oi;
                          const correct = submitted && oi === q.correct;
                          const wrong = submitted && sel && oi !== q.correct;
                          return (
                            <button key={oi} onClick={() => !submitted && setAnswers({...answers,[q.id]:oi})} disabled={submitted}
                              className={`w-full flex items-center gap-2 p-3 rounded-xl border text-left text-sm transition-all ${correct?"border-blue-500 bg-blue-50 text-blue-800":wrong?"border-red-400 bg-red-50 text-red-800":sel?"border-blue-400 bg-blue-50 text-ink":"border-slate-200 hover:border-blue-300 text-ink-muted"}`}>
                              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 text-[10px] font-bold ${correct?"bg-blue-500 border-blue-500 text-white":wrong?"bg-red-500 border-red-500 text-white":sel?"border-blue-500":""}`}>
                                {correct?"✓":wrong?"✗":String.fromCharCode(65+oi)}
                              </div>
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                      {submitted && <div className="p-2.5 bg-blue-50 border border-blue-100 rounded-xl text-xs text-blue-800">💡 {q.exp}</div>}
                    </div>
                  ))}
                  {!submitted ? (
                    <button onClick={() => setSubmitted(true)} disabled={Object.keys(answers).length < questions.length} className="btn-primary w-full justify-center" style={{ background: "#2563eb" }}>Submit</button>
                  ) : (
                    <div className="p-4 rounded-xl text-center bg-blue-50 border border-blue-200">
                      <p className="text-2xl font-bold text-ink">{Math.round((Object.values(answers).filter((a, i) => a === questions[i]?.correct).length / questions.length)*100)}%</p>
                      <p className="text-sm text-ink-muted mt-1">Module {Math.round((Object.values(answers).filter((a, i) => a === questions[i]?.correct).length / questions.length)*100) >= 70 ? "passed! ✅" : "— try again"}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === "notes" && (
            <div className="space-y-3">
              <textarea className="input h-40 resize-none text-sm font-mono" placeholder="Your notes for this module..." />
              <button className="btn-primary text-sm" style={{ background: "#2563eb" }}>Save Notes</button>
            </div>
          )}

          {/* Nav */}
          <div className="flex justify-between pt-4 border-t border-slate-200">
            <button className="btn-secondary" disabled><ChevronLeft size={16} />Previous</button>
            <Link href="/learn/intermediate/risk-assessment" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors">
              Next Module <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
