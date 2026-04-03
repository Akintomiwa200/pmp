// app/learn/advanced/mockexam/page.tsx
"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Clock, ChevronLeft, ChevronRight, AlertTriangle, CheckCircle2, BarChart3, Flag } from "lucide-react";

const EXAM_QUESTIONS = [
  { id: "q1", question: "A project manager notices that the CPI is 0.82 and SPI is 0.91. What should the PM do FIRST?", options: ["Immediately request more budget", "Analyze the root cause of the variance", "Notify the project sponsor to close the project", "Compress the schedule by crashing"], correct: 1, explanation: "Before taking any corrective action, the PM must first analyze why performance is below baseline. CPI < 1 = over budget; SPI < 1 = behind schedule.", domain: "Monitoring & Control" },
  { id: "q2", question: "Which document formally authorizes the project and grants the PM authority to apply resources?", options: ["Project Management Plan", "Project Charter", "Scope Statement", "Business Case"], correct: 1, explanation: "The Project Charter is the document that formally authorizes a project and grants the project manager authority.", domain: "Initiation" },
  { id: "q3", question: "A key stakeholder wants to add a significant feature after the project baseline was approved. The PM should FIRST:", options: ["Add it immediately to maintain stakeholder satisfaction", "Reject the request as scope creep", "Evaluate the impact and submit a change request", "Escalate to the sponsor without evaluating"], correct: 2, explanation: "All changes should go through the Integrated Change Control process. The PM evaluates impact first, then submits a formal change request.", domain: "Change Management" },
  { id: "q4", question: "Which Agile value from the Agile Manifesto prioritizes individuals over processes?", options: ["Working software over comprehensive documentation", "Individuals and interactions over processes and tools", "Customer collaboration over contract negotiation", "Responding to change over following a plan"], correct: 1, explanation: "The first Agile Manifesto value explicitly states: 'Individuals and interactions over processes and tools.'", domain: "Agile" },
  { id: "q5", question: "In a Scrum framework, who is responsible for maximizing the value of the product?", options: ["Scrum Master", "Development Team", "Product Owner", "Project Sponsor"], correct: 2, explanation: "The Product Owner is responsible for maximizing the value of the product and managing the product backlog.", domain: "Agile" },
  { id: "q6", question: "You are managing a project and realize that a key risk has occurred. The risk was NOT in the risk register. This is called a:", options: ["Known risk", "Residual risk", "Secondary risk", "Unknown risk (Unknown-unknown)"], correct: 3, explanation: "Risks not identified in planning are called 'unknown-unknowns' or 'unk-unks'. Management reserves are typically used for these.", domain: "Risk Management" },
  { id: "q7", question: "A PM has a CPI of 1.15. This means the project is:", options: ["15% over budget", "15% behind schedule", "Getting $1.15 of work for every $1 spent", "Spending $1.15 for every $1 of work"], correct: 2, explanation: "CPI = EV/AC. CPI > 1 means the project is under budget — getting more value per dollar spent than planned.", domain: "EVM" },
  { id: "q8", question: "Which of the following BEST describes the purpose of a lessons learned register?", options: ["Track team performance metrics", "Document knowledge gained to benefit future projects", "Log stakeholder complaints and issues", "Record daily project status"], correct: 1, explanation: "Lessons learned are captured throughout the project and stored to benefit current and future projects.", domain: "Knowledge Management" },
];

type ExamState = "intro" | "active" | "review";

export default function MockExamPage() {
  const [examState, setExamState] = useState<ExamState>("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [flagged, setFlagged] = useState<Set<string>>(new Set());
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 min

  const startExam = () => {
    setExamState("active");
    setTimeLeft(30 * 60);
    setCurrentQ(0);
    setAnswers({});
    setFlagged(new Set());
  };

  useEffect(() => {
    if (examState !== "active") return;
    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) { setExamState("review"); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [examState]);

  const formatTime = (s: number) => `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;
  const timerColor = timeLeft < 300 ? "text-red-600 bg-red-50 border-red-200" : timeLeft < 600 ? "text-amber-600 bg-amber-50 border-amber-200" : "text-ink bg-surface-1 border-surface-3";

  const score = EXAM_QUESTIONS.reduce((acc, q) => acc + (answers[q.id] === q.correct ? 1 : 0), 0);
  const scorePercent = Math.round((score / EXAM_QUESTIONS.length) * 100);

  const toggleFlag = (id: string) => {
    const next = new Set(flagged);
    next.has(id) ? next.delete(id) : next.add(id);
    setFlagged(next);
  };

  if (examState === "intro") {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 space-y-8">
        <div>
          <p className="section-tag mb-3"><BarChart3 size={12} />PMP Mock Exam</p>
          <h1 className="text-4xl font-display font-bold text-ink mb-3">PMP Practice Exam</h1>
          <p className="text-ink-muted">Simulate the real PMP exam experience with timed questions across all knowledge domains.</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Questions", value: EXAM_QUESTIONS.length },
            { label: "Time Limit", value: "30 min" },
            { label: "Passing Score", value: "75%" },
            { label: "Domains Covered", value: "8" },
          ].map((s) => (
            <div key={s.label} className="card p-4 text-center">
              <p className="text-2xl font-display font-bold text-ink">{s.value}</p>
              <p className="text-xs text-ink-subtle">{s.label}</p>
            </div>
          ))}
        </div>
        <div className="card p-5 bg-amber-50 border-amber-100">
          <div className="flex gap-2 mb-2">
            <AlertTriangle size={16} className="text-amber-600 shrink-0 mt-0.5" />
            <h3 className="font-semibold text-amber-900">Before You Start</h3>
          </div>
          <ul className="text-sm text-amber-800 space-y-1 ml-5 list-disc">
            <li>Timer starts immediately when you click "Begin Exam"</li>
            <li>You can flag questions to review later</li>
            <li>All questions must be answered before submitting</li>
            <li>Detailed explanations shown after submission</li>
          </ul>
        </div>
        <button onClick={startExam} className="btn-primary text-base px-8 py-3.5 w-full justify-center shadow-glow-green">
          Begin Exam <Clock size={18} />
        </button>
        <Link href="/learn/advanced" className="btn-ghost w-full justify-center">← Back to Advanced Path</Link>
      </div>
    );
  }

  if (examState === "review") {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
        <div className="card p-8 text-center space-y-4">
          <div className="text-5xl">{scorePercent >= 75 ? "🎉" : "📖"}</div>
          <h1 className="text-4xl font-display font-bold text-ink">{scorePercent}%</h1>
          <p className="text-lg text-ink-muted">{score} / {EXAM_QUESTIONS.length} correct</p>
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${scorePercent >= 75 ? "bg-brand-50 text-brand-800 border border-brand-200" : "bg-red-50 text-red-800 border border-red-200"}`}>
            {scorePercent >= 75 ? <><CheckCircle2 size={15} /> Passed! You're PMP-ready 🎯</> : <><AlertTriangle size={15} /> Below passing score (75%) — keep studying!</>}
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {["Initiation", "Agile", "EVM", "Risk Management", "Change Management", "Monitoring & Control"].map((domain) => {
              const domainQs = EXAM_QUESTIONS.filter((q) => q.domain === domain);
              if (domainQs.length === 0) return null;
              const correct = domainQs.filter((q) => answers[q.id] === q.correct).length;
              const pct = Math.round((correct / domainQs.length) * 100);
              return (
                <div key={domain} className="card p-3 text-center">
                  <p className={`text-lg font-bold ${pct >= 75 ? "text-brand-600" : "text-red-500"}`}>{pct}%</p>
                  <p className="text-[10px] text-ink-subtle leading-tight">{domain}</p>
                </div>
              );
            }).filter(Boolean)}
          </div>
        </div>

        <h2 className="font-display font-bold text-2xl text-ink">Review Answers</h2>
        <div className="space-y-5">
          {EXAM_QUESTIONS.map((q, i) => {
            const userAnswer = answers[q.id];
            const isCorrect = userAnswer === q.correct;
            return (
              <div key={q.id} className={`card p-5 border-l-4 ${isCorrect ? "border-l-brand-500" : "border-l-red-400"}`}>
                <div className="flex items-start gap-3 mb-3">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${isCorrect ? "bg-brand-500 text-white" : "bg-red-500 text-white"}`}>
                    {i + 1}
                  </span>
                  <p className="font-medium text-ink text-sm">{q.question}</p>
                </div>
                <div className="ml-9 space-y-1.5 mb-3">
                  {q.options.map((opt, oi) => (
                    <div key={oi} className={`flex items-center gap-2 text-xs p-2 rounded-lg ${oi === q.correct ? "bg-brand-50 text-brand-800 font-medium" : oi === userAnswer && !isCorrect ? "bg-red-50 text-red-700" : "text-ink-muted"}`}>
                      <span className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] shrink-0 ${oi === q.correct ? "bg-brand-500 border-brand-500 text-white" : oi === userAnswer && !isCorrect ? "bg-red-500 border-red-500 text-white" : "border-surface-3"}`}>
                        {oi === q.correct ? "✓" : oi === userAnswer && !isCorrect ? "✗" : ""}
                      </span>
                      {opt}
                    </div>
                  ))}
                </div>
                <div className="ml-9 p-3 bg-blue-50 border border-blue-100 rounded-xl text-xs text-blue-800">
                  💡 {q.explanation}
                </div>
                <p className="ml-9 mt-2 text-[10px] text-ink-subtle">Domain: {q.domain}</p>
              </div>
            );
          })}
        </div>
        <div className="flex gap-4 justify-center">
          <button onClick={startExam} className="btn-secondary"><BarChart3 size={15} /> Retake Exam</button>
          <Link href="/learn/advanced" className="btn-primary">Back to Advanced Path</Link>
        </div>
      </div>
    );
  }

  const question = EXAM_QUESTIONS[currentQ];
  const isFlagged = flagged.has(question.id);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      {/* Timer + progress */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-sm text-ink-subtle">Q{currentQ + 1} of {EXAM_QUESTIONS.length}</span>
          <div className="w-32 h-1.5 bg-surface-2 rounded-full overflow-hidden">
            <div className="h-full bg-brand-500 rounded-full transition-all" style={{ width: `${((currentQ + 1) / EXAM_QUESTIONS.length) * 100}%` }} />
          </div>
        </div>
        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm font-mono font-bold ${timerColor}`}>
          <Clock size={14} />
          {formatTime(timeLeft)}
        </div>
      </div>

      {/* Question card */}
      <div className="card p-6 space-y-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-ink-subtle">{question.domain}</span>
            <p className="font-semibold text-ink mt-1 leading-relaxed">{question.question}</p>
          </div>
          <button
            onClick={() => toggleFlag(question.id)}
            className={`p-2 rounded-lg transition-colors shrink-0 ${isFlagged ? "text-amber-600 bg-amber-50" : "text-ink-subtle hover:bg-surface-1"}`}
            title="Flag for review"
          >
            <Flag size={16} />
          </button>
        </div>

        <div className="space-y-2.5">
          {question.options.map((opt, oi) => {
            const selected = answers[question.id] === oi;
            return (
              <button
                key={oi}
                onClick={() => setAnswers({ ...answers, [question.id]: oi })}
                className={`w-full flex items-center gap-3 p-3.5 rounded-xl border-2 text-left text-sm transition-all ${
                  selected ? "border-brand-500 bg-brand-50 text-brand-800 font-medium" : "border-surface-3 hover:border-brand-300 text-ink-muted"
                }`}
              >
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 text-xs font-bold ${selected ? "bg-brand-500 border-brand-500 text-white" : "border-surface-3"}`}>
                  {selected ? "✓" : String.fromCharCode(65 + oi)}
                </div>
                {opt}
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button onClick={() => setCurrentQ(Math.max(0, currentQ - 1))} disabled={currentQ === 0} className="btn-secondary">
          <ChevronLeft size={16} /> Prev
        </button>

        {/* Question grid */}
        <div className="flex flex-wrap gap-1.5 justify-center max-w-xs">
          {EXAM_QUESTIONS.map((q, i) => (
            <button
              key={q.id}
              onClick={() => setCurrentQ(i)}
              className={`w-7 h-7 rounded-lg text-xs font-bold transition-colors ${
                i === currentQ ? "bg-brand-600 text-white"
                : flagged.has(q.id) ? "bg-amber-100 text-amber-700 border border-amber-300"
                : answers[q.id] !== undefined ? "bg-brand-100 text-brand-700"
                : "bg-surface-2 text-ink-muted"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {currentQ === EXAM_QUESTIONS.length - 1 ? (
          <button onClick={() => setExamState("review")} className="btn-primary">
            Submit <CheckCircle2 size={16} />
          </button>
        ) : (
          <button onClick={() => setCurrentQ(Math.min(EXAM_QUESTIONS.length - 1, currentQ + 1))} className="btn-primary">
            Next <ChevronRight size={16} />
          </button>
        )}
      </div>

      <p className="text-center text-xs text-ink-subtle">
        Answered: {Object.keys(answers).length}/{EXAM_QUESTIONS.length} · Flagged: {flagged.size}
      </p>
    </div>
  );
}
