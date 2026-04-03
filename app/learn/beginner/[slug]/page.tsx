// app/learn/beginner/[slug]/page.tsx
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ChevronLeft, ChevronRight, CheckCircle2, Play, Download,
  BookOpen, Clock, Users, ChevronDown, X, Volume2,
  List, BarChart3, MessageSquare, Share2, Bookmark
} from "lucide-react";

const DEMO_MODULE = {
  id: "mod_001",
  title: "What is Project Management?",
  courseTitle: "PM Fundamentals",
  duration: "20 min",
  order: 1,
  totalModules: 12,
  videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  content: `## Introduction to Project Management

Project management is the practice of **initiating, planning, executing, controlling, and closing** the work of a team to achieve specific goals within defined constraints.

### The PM Iron Triangle

Every project is shaped by three constraints that form what's called the "Iron Triangle":

- **Scope** — What needs to be delivered
- **Time** — When it needs to be done  
- **Cost** — The budget available

Changing any one of these affects the others. A good PM understands how to balance these trade-offs.

### Why Project Management Matters

Research by PMI (Project Management Institute) shows that organizations with mature PM practices:
- Waste **28x less money** than those without
- Complete **71% more projects** on time and budget
- Experience significantly higher stakeholder satisfaction

### Key PM Roles

| Role | Responsibility |
|------|---------------|
| Project Manager | Overall delivery accountability |
| Sponsor | Provides resources and direction |
| Team Members | Execute project tasks |
| Stakeholders | Affected by or influence the project |

### The PM Lifecycle

1. **Initiation** — Define the project, create the charter
2. **Planning** — Map out scope, schedule, budget, risks
3. **Execution** — Do the work!
4. **Monitoring & Control** — Track progress, manage changes
5. **Closing** — Deliver, document, celebrate 🎉

> 💡 **Key Insight**: Most PM failures happen in the Planning phase — either too much planning (paralysis) or too little (chaos). Aim for "just enough" planning.`,
  downloadables: [
    { name: "PM Intro Cheatsheet.pdf", size: "240KB" },
    { name: "Project Charter Template.docx", size: "85KB" },
  ],
  quiz: {
    id: "qz_001",
    questions: [
      {
        id: "q1",
        question: "Which of the following best describes the 'Iron Triangle' in project management?",
        options: ["People, Process, Tools", "Scope, Time, Cost", "Planning, Execution, Closing", "Quality, Risk, Communication"],
        correct: 1,
        explanation: "The Iron Triangle (Triple Constraint) consists of Scope, Time, and Cost. Any change to one affects the others.",
      },
      {
        id: "q2",
        question: "What is the FIRST phase of the PM lifecycle?",
        options: ["Planning", "Execution", "Initiation", "Monitoring"],
        correct: 2,
        explanation: "Initiation is where the project is defined and formally authorized through a Project Charter.",
      },
      {
        id: "q3",
        question: "A project is best described as:",
        options: [
          "Ongoing daily operations",
          "A temporary endeavor to create a unique product or service",
          "An annual budget exercise",
          "A team building activity",
        ],
        correct: 1,
        explanation: "Projects are temporary (have start/end dates) and produce unique deliverables — distinguishing them from ongoing operations.",
      },
    ],
  },
  prevModule: null,
  nextModule: { slug: "pm-lifecycle", title: "The PM Lifecycle" },
};

const SIDEBAR_MODULES = [
  { id: "mod_001", title: "What is Project Management?", slug: "what-is-pm", done: true, current: true, duration: "20 min" },
  { id: "mod_002", title: "The PM Lifecycle", slug: "pm-lifecycle", done: false, current: false, duration: "25 min" },
  { id: "mod_003", title: "Agile vs Waterfall", slug: "agile-vs-waterfall", done: false, current: false, duration: "30 min" },
  { id: "mod_004", title: "Creating a Project Charter", slug: "project-charter", done: false, current: false, duration: "35 min" },
  { id: "mod_005", title: "Stakeholder Identification", slug: "stakeholders", done: false, current: false, duration: "20 min" },
  { id: "mod_006", title: "Work Breakdown Structure", slug: "wbs", done: false, current: false, duration: "30 min" },
];

type QuizState = "idle" | "active" | "done";

export default function ModulePage({ params }: { params: { slug: string } }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<"content" | "notes" | "discussion">("content");
  const [quizState, setQuizState] = useState<QuizState>("idle");
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [completed, setCompleted] = useState(false);

  const module = DEMO_MODULE;

  const score = submitted
    ? module.quiz.questions.reduce((acc, q, i) => {
        return acc + (answers[q.id] === q.correct ? 1 : 0);
      }, 0)
    : 0;
  const scorePercent = Math.round((score / module.quiz.questions.length) * 100);

  const handleQuizSubmit = () => {
    setSubmitted(true);
    if (scorePercent >= 70) setCompleted(true);
  };

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-surface-1">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? "w-72" : "w-0"} shrink-0 transition-all duration-300 overflow-hidden border-r border-surface-3 bg-white flex flex-col`}>
        <div className="p-4 border-b border-surface-3">
          <Link href="/learn/beginner" className="flex items-center gap-2 text-sm text-ink-muted hover:text-ink mb-3 transition-colors">
            <ChevronLeft size={14} /> Back to Course
          </Link>
          <h2 className="font-display font-bold text-ink text-sm">{module.courseTitle}</h2>
          <div className="mt-2 h-1.5 bg-surface-2 rounded-full overflow-hidden">
            <div className="h-full bg-brand-500 rounded-full" style={{ width: "8.3%" }} />
          </div>
          <p className="text-xs text-ink-subtle mt-1">1 of 12 modules</p>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {SIDEBAR_MODULES.map((mod) => (
            <Link
              key={mod.id}
              href={`/learn/beginner/${mod.slug}`}
              className={`flex items-start gap-3 p-3 rounded-xl transition-all ${
                mod.current
                  ? "bg-brand-50 border border-brand-200"
                  : "hover:bg-surface-1"
              }`}
            >
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                mod.done
                  ? "bg-brand-500 border-brand-500"
                  : mod.current
                  ? "border-brand-500"
                  : "border-surface-3"
              }`}>
                {mod.done && <CheckCircle2 size={12} className="text-white" />}
                {mod.current && !mod.done && <div className="w-2 h-2 rounded-full bg-brand-500" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-xs font-medium leading-snug ${mod.current ? "text-brand-800" : "text-ink"}`}>
                  {mod.title}
                </p>
                <p className="text-[10px] text-ink-subtle mt-0.5">{mod.duration}</p>
              </div>
            </Link>
          ))}
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        {/* Top bar */}
        <div className="sticky top-0 z-10 bg-white border-b border-surface-3 px-4 py-3 flex items-center gap-3">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="btn-ghost p-2">
            <List size={18} />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="font-semibold text-ink text-sm truncate">{module.title}</h1>
            <p className="text-xs text-ink-subtle">{module.courseTitle} · {module.duration}</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setBookmarked(!bookmarked)} className={`p-2 rounded-lg transition-colors ${bookmarked ? "text-amber-500 bg-amber-50" : "text-ink-muted hover:bg-surface-1"}`}>
              <Bookmark size={16} />
            </button>
            <button className="p-2 rounded-lg text-ink-muted hover:bg-surface-1 transition-colors">
              <Share2 size={16} />
            </button>
            {completed && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-50 border border-brand-200 rounded-full">
                <CheckCircle2 size={13} className="text-brand-600" />
                <span className="text-xs font-medium text-brand-700">Completed</span>
              </div>
            )}
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8 space-y-8">
          {/* Video */}
          <div className="aspect-video bg-ink rounded-2xl overflow-hidden shadow-lg">
            <iframe
              src={module.videoUrl}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
              allowFullScreen
            />
          </div>

          {/* Tabs */}
          <div className="flex border-b border-surface-3 gap-1">
            {(["content", "notes", "discussion"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2.5 text-sm font-medium capitalize transition-colors border-b-2 -mb-px ${
                  activeTab === tab
                    ? "text-brand-700 border-brand-600"
                    : "text-ink-muted border-transparent hover:text-ink"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Content tab */}
          {activeTab === "content" && (
            <div className="space-y-8">
              {/* Article content */}
              <div className="prose prose-sm max-w-none">
                {module.content.split("\n").map((line, i) => {
                  if (line.startsWith("## ")) return <h2 key={i} className="font-display font-bold text-2xl text-ink mt-6 mb-3">{line.slice(3)}</h2>;
                  if (line.startsWith("### ")) return <h3 key={i} className="font-display font-semibold text-lg text-ink mt-5 mb-2">{line.slice(4)}</h3>;
                  if (line.startsWith("- **")) {
                    const [bold, ...rest] = line.slice(2).split("** — ");
                    return <div key={i} className="flex items-start gap-2 mb-2"><span className="text-brand-500 mt-1">•</span><p className="text-sm text-ink-muted"><strong className="text-ink">{bold.replace("**","")}</strong>{rest.length ? ` — ${rest.join("")}` : ""}</p></div>;
                  }
                  if (line.startsWith("> ")) return <blockquote key={i} className="border-l-4 border-brand-400 pl-4 py-1 my-4 bg-brand-50 rounded-r-xl text-sm text-brand-800 italic">{line.slice(2)}</blockquote>;
                  if (line.trim() === "") return <div key={i} className="h-2" />;
                  return <p key={i} className="text-sm text-ink-muted leading-relaxed mb-2">{line}</p>;
                })}
              </div>

              {/* Downloads */}
              <div className="card p-5">
                <h3 className="font-semibold text-ink mb-3 flex items-center gap-2"><Download size={15} className="text-brand-600" /> Downloads</h3>
                <div className="space-y-2">
                  {module.downloadables.map((file) => (
                    <button key={file.name} className="flex items-center gap-3 w-full p-3 bg-surface-1 rounded-xl hover:bg-brand-50 transition-colors group text-left">
                      <div className="w-8 h-8 bg-brand-100 rounded-lg flex items-center justify-center shrink-0">
                        <BookOpen size={14} className="text-brand-700" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-ink group-hover:text-brand-700 transition-colors">{file.name}</p>
                        <p className="text-xs text-ink-subtle">{file.size}</p>
                      </div>
                      <Download size={14} className="text-ink-subtle group-hover:text-brand-600 transition-colors" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Quiz Section */}
              {quizState === "idle" && (
                <div className="card p-6 text-center bg-gradient-to-br from-brand-50 to-emerald-50 border-brand-100">
                  <div className="w-14 h-14 bg-brand-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <BarChart3 size={24} className="text-brand-700" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-ink mb-2">Ready for the Quiz?</h3>
                  <p className="text-sm text-ink-muted mb-5 max-w-sm mx-auto">Test your understanding with {module.quiz.questions.length} questions. You need 70%+ to mark this module complete.</p>
                  <button onClick={() => setQuizState("active")} className="btn-primary mx-auto">
                    Start Quiz
                  </button>
                </div>
              )}

              {quizState === "active" && (
                <div className="card p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display font-bold text-xl text-ink">Module Quiz</h3>
                    <span className="text-sm text-ink-subtle">{Object.keys(answers).length} / {module.quiz.questions.length} answered</span>
                  </div>
                  {module.quiz.questions.map((q, qi) => (
                    <div key={q.id} className="space-y-3">
                      <p className="font-medium text-ink text-sm">{qi + 1}. {q.question}</p>
                      <div className="grid gap-2">
                        {q.options.map((opt, oi) => {
                          const selected = answers[q.id] === oi;
                          const correct = submitted && oi === q.correct;
                          const wrong = submitted && selected && oi !== q.correct;
                          return (
                            <button
                              key={oi}
                              onClick={() => !submitted && setAnswers({ ...answers, [q.id]: oi })}
                              disabled={submitted}
                              className={`flex items-center gap-3 p-3 rounded-xl border text-left text-sm transition-all ${
                                correct ? "border-brand-500 bg-brand-50 text-brand-800"
                                : wrong ? "border-red-400 bg-red-50 text-red-800"
                                : selected ? "border-brand-400 bg-brand-50 text-ink"
                                : "border-surface-3 hover:border-brand-300 text-ink-muted"
                              }`}
                            >
                              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 text-xs font-bold ${
                                correct ? "border-brand-500 bg-brand-500 text-white"
                                : wrong ? "border-red-500 bg-red-500 text-white"
                                : selected ? "border-brand-500" : "border-surface-3"
                              }`}>
                                {correct ? "✓" : wrong ? "✗" : String.fromCharCode(65 + oi)}
                              </div>
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                      {submitted && (
                        <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl text-xs text-blue-800">
                          💡 {q.explanation}
                        </div>
                      )}
                    </div>
                  ))}
                  {!submitted ? (
                    <button
                      onClick={handleQuizSubmit}
                      disabled={Object.keys(answers).length < module.quiz.questions.length}
                      className="btn-primary w-full justify-center"
                    >
                      Submit Answers
                    </button>
                  ) : (
                    <div className={`p-5 rounded-2xl text-center ${scorePercent >= 70 ? "bg-brand-50 border border-brand-200" : "bg-red-50 border border-red-200"}`}>
                      <p className="text-3xl font-display font-bold mb-1 text-ink">{scorePercent}%</p>
                      <p className="text-sm text-ink-muted mb-3">
                        {score}/{module.quiz.questions.length} correct · {scorePercent >= 70 ? "🎉 Passed!" : "Try again to pass (70%+)"}
                      </p>
                      {scorePercent >= 70 ? (
                        <Link href={`/learn/beginner/${module.nextModule?.slug}`} className="btn-primary">
                          Next Module <ChevronRight size={16} />
                        </Link>
                      ) : (
                        <button onClick={() => { setSubmitted(false); setAnswers({}); }} className="btn-secondary">
                          Retry Quiz
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Notes tab */}
          {activeTab === "notes" && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-ink mb-2">My Notes</h3>
                <p className="text-sm text-ink-muted mb-3">Jot down key points as you learn. Notes are saved automatically.</p>
                <textarea
                  className="input h-48 resize-none font-mono text-sm"
                  placeholder="Type your notes here... e.g. 'The Iron Triangle = Scope, Time, Cost'"
                />
              </div>
              <button className="btn-primary">Save Notes</button>
            </div>
          )}

          {/* Discussion tab */}
          {activeTab === "discussion" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-ink">Module Discussion</h3>
                <span className="text-sm text-ink-subtle">4 comments</span>
              </div>
              <div className="space-y-4">
                {[
                  { name: "Priya S.", time: "2h ago", comment: "The Iron Triangle analogy finally clicked for me after this module. Great explanation!", likes: 5 },
                  { name: "Marcus J.", time: "1d ago", comment: "Key takeaway: most PM failures happen in Planning. I learned this the hard way at my previous job!", likes: 12 },
                ].map((c) => (
                  <div key={c.name} className="flex gap-3">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                      {c.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-ink">{c.name}</span>
                        <span className="text-xs text-ink-subtle">{c.time}</span>
                      </div>
                      <p className="text-sm text-ink-muted">{c.comment}</p>
                      <button className="text-xs text-ink-subtle hover:text-brand-600 mt-1 transition-colors">👍 {c.likes}</button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 pt-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white text-xs font-bold shrink-0">A</div>
                <div className="flex-1">
                  <textarea className="input h-20 resize-none text-sm" placeholder="Add to the discussion..." />
                  <button className="btn-primary text-xs mt-2 py-2">Post Comment</button>
                </div>
              </div>
            </div>
          )}

          {/* Nav */}
          <div className="flex justify-between pt-4 border-t border-surface-2">
            <button className="btn-secondary" disabled={!module.prevModule}>
              <ChevronLeft size={16} /> Previous
            </button>
            <Link href={`/learn/beginner/${module.nextModule?.slug}`} className="btn-primary">
              Next: {module.nextModule?.title} <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
