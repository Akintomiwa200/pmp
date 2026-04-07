// app/exams/[id]/page.tsx
"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Lock, Shield, Clock, CheckCircle, XCircle, AlertTriangle, ChevronRight } from "lucide-react";

// Mock exam data — in production, fetched from API based on params.id
const EXAM_DATA = {
  id: "exam_001",
  title: "Q2 2025 PM Fundamentals Exam",
  level: "beginner",
  color: "#16a34a",
  instructions: "This is a timed exam. Once started, the timer cannot be paused. You have 1 attempt. Questions are shown one at a time. Good luck!",
  startDateTime: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // started 5 min ago - accessible
  durationMinutes: 30,
  accessWindow: 15,
  requiresCode: false,
  accessCode: "",
  maxAttempts: 1,
  questions: [
    { id:"eq1", question:"What is the Iron Triangle in project management?", options:["People, Process, Technology","Scope, Time, Cost","Plan, Execute, Review","Risk, Quality, Communication"], correct:1, explanation:"Scope, Time & Cost — the three primary constraints of every project." },
    { id:"eq2", question:"Which phase comes FIRST in the PM lifecycle?", options:["Planning","Execution","Initiation","Closing"], correct:2, explanation:"Initiation — the project is formally authorised here." },
    { id:"eq3", question:"Scope Creep is:", options:["A planned scope expansion","Uncontrolled scope growth without change control","A risk management tool","The critical path method"], correct:1, explanation:"Uncontrolled additions without adjusting time/cost — leading cause of failure." },
    { id:"eq4", question:"Who formally authorises a project?", options:["Project Manager","Scrum Master","Project Sponsor","Stakeholder"], correct:2, explanation:"The Project Sponsor authorises the project and provides resources." },
    { id:"eq5", question:"Which methodology uses Sprints?", options:["Waterfall","PRINCE2","Scrum","Critical Path"], correct:2, explanation:"Scrum uses time-boxed Sprints (1–4 weeks) to deliver working increments." },
  ],
};

const OPT_CONFIG = [
  { shape:"▲", color:"#e21b3c" },
  { shape:"◆", color:"#1368ce" },
  { shape:"●", color:"#d89e00" },
  { shape:"■", color:"#26890c" },
];

type ExamPhase = "gate" | "instructions" | "active" | "submitted";

export default function ExamSessionPage() {
  const params = useParams();
  const exam = EXAM_DATA; // In production: fetch by params.id

  const diff = new Date(exam.startDateTime).getTime() - Date.now();
  const isInWindow = diff <= 0 && diff > -exam.accessWindow * 60 * 1000;
  const isLive = diff <= 0 && diff > -exam.durationMinutes * 60 * 1000;

  const [phase, setPhase] = useState<ExamPhase>(isLive && isInWindow ? "gate" : "gate");
  const [codeInput, setCodeInput] = useState("");
  const [codeError, setCodeError] = useState("");
  const [qIdx, setQIdx] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(exam.questions.length).fill(null));
  const [flagged, setFlagged] = useState<boolean[]>(new Array(exam.questions.length).fill(false));
  const [timeLeft, setTimeLeft] = useState(exam.durationMinutes * 60);
  const [submitted, setSubmitted] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startExam = () => {
    setPhase("active");
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { handleSubmit(); return 0; }
        return t - 1;
      });
    }, 1000);
  };

  const handleSubmit = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setPhase("submitted");
    setSubmitted(true);
  }, []);

  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current); }, []);

  const handleAnswer = (optIdx: number) => {
    const updated = [...answers];
    updated[qIdx] = optIdx;
    setAnswers(updated);
  };

  const toggleFlag = () => {
    const updated = [...flagged];
    updated[qIdx] = !updated[qIdx];
    setFlagged(updated);
  };

  const handleCodeSubmit = () => {
    if (exam.requiresCode && codeInput.trim().toUpperCase() !== exam.accessCode) {
      setCodeError("Incorrect access code. Please try again.");
      return;
    }
    setPhase("instructions");
  };

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const timeUrgent = timeLeft < 300;
  const answered = answers.filter(a => a !== null).length;
  const score = exam.questions.filter((q, i) => answers[i] === q.correct).length;
  const pct = Math.round((score / exam.questions.length) * 100);

  // ── GATE (not accessible) ─────────────────────────────────────────────────
  if (!isLive) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4"
        style={{ background:"linear-gradient(160deg,#1a1a2e,#16213e,#0f3460)" }}>
        <div className="text-center max-w-sm">
          <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6"
            style={{ background:"rgba(255,255,255,.08)", border:"1px solid rgba(255,255,255,.12)" }}>
            <Lock size={36} className="text-white/40" />
          </div>
          <h1 className="text-2xl font-black text-white mb-2">{exam.title}</h1>
          <p className="text-white/40 mb-6">
            {diff > 0 ? "This exam hasn't started yet." : "This exam has ended."}
          </p>
          <Link href="/exams" className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-white text-sm"
            style={{ background:"rgba(255,255,255,.1)", border:"1px solid rgba(255,255,255,.15)" }}>
            ← Back to Exam Centre
          </Link>
        </div>
      </div>
    );
  }

  // ── CODE GATE ─────────────────────────────────────────────────────────────
  if (phase === "gate") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4"
        style={{ background:"linear-gradient(160deg,#1a1a2e,#16213e,#0f3460)" }}>
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">📋</div>
            <h1 className="text-3xl font-black text-white mb-2">{exam.title}</h1>
            <p className="text-white/40">{exam.questions.length} questions · {exam.durationMinutes} min</p>
          </div>

          <div className="rounded-3xl p-6 space-y-4" style={{ background:"rgba(255,255,255,.06)", border:"1px solid rgba(255,255,255,.1)" }}>
            {exam.requiresCode && (
              <div>
                <label className="block text-xs font-bold text-white/50 uppercase tracking-wider mb-2">Access Code</label>
                <input value={codeInput} onChange={e => { setCodeInput(e.target.value); setCodeError(""); }}
                  placeholder="Enter your access code…"
                  className="w-full px-4 py-3 rounded-xl text-center font-mono tracking-widest text-white text-lg focus:outline-none"
                  style={{ background:"rgba(255,255,255,.08)", border:`1px solid ${codeError?"rgba(239,68,68,.4)":"rgba(255,255,255,.12)"}` }} />
                {codeError && <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertTriangle size={10} />{codeError}</p>}
              </div>
            )}

            <div className="flex items-start gap-3 p-3.5 rounded-2xl" style={{ background:"rgba(255,255,255,.04)" }}>
              <Shield size={14} className="text-white/30 shrink-0 mt-0.5" />
              <p className="text-white/40 text-sm">This exam is monitored. You get {exam.maxAttempts} attempt. Once started, the timer cannot be paused.</p>
            </div>

            <button onClick={exam.requiresCode ? handleCodeSubmit : () => setPhase("instructions")}
              className="w-full py-4 rounded-2xl font-black text-white text-base hover:opacity-90 active:scale-95 transition-all"
              style={{ background:`linear-gradient(135deg,${exam.color},${exam.color}bb)` }}>
              {exam.requiresCode ? "Verify & Continue →" : "View Instructions →"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── INSTRUCTIONS ──────────────────────────────────────────────────────────
  if (phase === "instructions") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4"
        style={{ background:"linear-gradient(160deg,#1a1a2e,#16213e,#0f3460)" }}>
        <div className="w-full max-w-lg">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-white mb-1">{exam.title}</h1>
            <p className="text-white/40">Read carefully before beginning</p>
          </div>

          <div className="rounded-3xl p-6 space-y-5" style={{ background:"rgba(255,255,255,.06)", border:"1px solid rgba(255,255,255,.1)" }}>
            <p className="text-white/70 text-sm leading-relaxed">{exam.instructions}</p>

            <div className="grid grid-cols-2 gap-3">
              {[
                { icon:Clock, label:"Duration", value:`${exam.durationMinutes} minutes` },
                { icon:Shield, label:"Questions", value:`${exam.questions.length} total` },
                { icon:AlertTriangle, label:"Attempts", value:`${exam.maxAttempts} max` },
                { icon:CheckCircle, label:"Results", value:exam.questions.length > 0 ? "After submit" : "Hidden" },
              ].map(s => (
                <div key={s.label} className="flex items-center gap-2.5 p-3 rounded-2xl"
                  style={{ background:"rgba(255,255,255,.05)", border:"1px solid rgba(255,255,255,.08)" }}>
                  <s.icon size={14} className="text-white/30 shrink-0" />
                  <div>
                    <div className="text-[10px] text-white/30">{s.label}</div>
                    <div className="text-sm font-bold text-white">{s.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <button onClick={startExam}
              className="w-full py-4 rounded-2xl font-black text-white text-base hover:opacity-90 active:scale-95 transition-all"
              style={{ background:`linear-gradient(135deg,${exam.color},${exam.color}bb)` }}>
              Start Exam — Timer begins now ⏱
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── SUBMITTED ─────────────────────────────────────────────────────────────
  if (phase === "submitted") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4"
        style={{ background:"linear-gradient(160deg,#1a1a2e,#16213e,#0f3460)" }}>
        <div className="w-full max-w-md text-center">
          <div className="text-7xl mb-4">{pct >= 70 ? "🎉" : "📖"}</div>
          <h1 className="text-4xl font-black text-white mb-1">{pct}%</h1>
          <p className="text-white/40 mb-8">{score}/{exam.questions.length} correct</p>

          <div className="rounded-3xl overflow-hidden mb-6" style={{ background:"rgba(255,255,255,.06)", border:"1px solid rgba(255,255,255,.1)" }}>
            <div className="p-5 space-y-3">
              {exam.questions.map((q, i) => {
                const ans = answers[i];
                const isCorrect = ans === q.correct;
                return (
                  <div key={q.id} className="flex items-start gap-3 p-3 rounded-2xl text-left"
                    style={{ background: isCorrect ? "rgba(34,197,94,.1)" : "rgba(239,68,68,.1)" }}>
                    <div className="shrink-0 mt-0.5">
                      {isCorrect ? <CheckCircle size={15} className="text-green-400" /> : <XCircle size={15} className="text-red-400" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-white/70 mb-1">{q.question}</p>
                      <p className="text-[11px]" style={{ color: isCorrect ? "#86efac" : "#fca5a5" }}>{q.explanation}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex gap-3">
            <Link href="/exams" className="flex-1 py-3.5 rounded-2xl font-bold text-white/70 text-sm hover:bg-white/10 transition-colors text-center"
              style={{ background:"rgba(255,255,255,.08)", border:"1px solid rgba(255,255,255,.1)" }}>
              Exam Centre
            </Link>
            <Link href="/progress" className="flex-1 py-3.5 rounded-2xl font-bold text-white text-sm text-center hover:opacity-90 transition-all"
              style={{ background:`linear-gradient(135deg,${exam.color},${exam.color}bb)` }}>
              My Progress →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ── ACTIVE EXAM ───────────────────────────────────────────────────────────
  const q = exam.questions[qIdx];

  return (
    <div className="min-h-screen flex flex-col" style={{ background:"linear-gradient(160deg,#1a1a2e,#16213e,#0f3460)" }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-4 gap-4">
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-xl">
          <span className="text-white/50 text-xs font-bold">Q</span>
          <span className="text-white font-black text-lg">{qIdx+1}</span>
          <span className="text-white/30 text-xs">/{exam.questions.length}</span>
        </div>

        {/* Timer */}
        <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-black text-lg transition-all ${timeUrgent ? "animate-pulse" : ""}`}
          style={{ background: timeUrgent ? "rgba(239,68,68,.3)" : "rgba(255,255,255,.1)", color: timeUrgent ? "#ef4444" : "#fff" }}>
          <Clock size={16} />
          {String(mins).padStart(2,"0")}:{String(secs).padStart(2,"0")}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-white/40">{answered}/{exam.questions.length} answered</span>
          <button onClick={handleSubmit}
            className="px-3 py-1.5 rounded-xl text-xs font-bold text-white hover:opacity-80 transition-all"
            style={{ background:"rgba(239,68,68,.3)", border:"1px solid rgba(239,68,68,.3)" }}>
            Submit
          </button>
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 flex flex-col justify-between px-4 pb-4 gap-4">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-2xl rounded-3xl px-6 py-10 text-center"
            style={{ background:"rgba(255,255,255,.07)", backdropFilter:"blur(16px)", border:`1px solid ${flagged[qIdx]?"rgba(251,191,36,.4)":"rgba(255,255,255,.1)"}` }}>
            {flagged[qIdx] && <div className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-400 mb-3 px-3 py-1 rounded-full" style={{ background:"rgba(251,191,36,.2)" }}>🚩 Flagged for review</div>}
            <p className="text-xl sm:text-2xl font-black text-white leading-snug">{q.question}</p>
          </div>
        </div>

        <div className="w-full max-w-2xl mx-auto grid grid-cols-2 gap-2.5">
          {q.options.map((opt, i) => {
            const cfg = OPT_CONFIG[i];
            const isSelected = answers[qIdx] === i;
            return (
              <button key={i} onClick={() => handleAnswer(i)}
                className="flex items-center gap-3 p-3.5 rounded-2xl font-bold text-white text-left transition-all hover:opacity-90 active:scale-95"
                style={{ background: isSelected ? cfg.color : cfg.color+"bb", outline: isSelected ? `3px solid ${cfg.color}` : "none", outlineOffset:2, minHeight:64 }}>
                <div className="shrink-0 w-9 h-9 rounded-xl bg-black/25 flex items-center justify-center">
                  <span className="text-base">{cfg.shape}</span>
                </div>
                <span className="text-sm leading-snug flex-1">{opt}</span>
                {isSelected && <CheckCircle size={16} className="shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* Nav */}
        <div className="w-full max-w-2xl mx-auto flex items-center justify-between gap-3">
          <button onClick={toggleFlag}
            className="px-4 py-2.5 rounded-xl text-sm font-bold transition-all"
            style={{ background: flagged[qIdx] ? "rgba(251,191,36,.25)" : "rgba(255,255,255,.08)", color: flagged[qIdx] ? "#fbbf24" : "#6b8aad", border:`1px solid ${flagged[qIdx]?"rgba(251,191,36,.3)":"rgba(255,255,255,.08)"}` }}>
            {flagged[qIdx] ? "🚩 Flagged" : "🏳 Flag"}
          </button>

          {/* Dot nav */}
          <div className="flex items-center gap-1.5">
            {exam.questions.map((_, i) => (
              <button key={i} onClick={() => setQIdx(i)}
                className="rounded-full transition-all"
                style={{
                  width: i===qIdx ? 24 : 8, height:8,
                  background: i===qIdx ? exam.color : answers[i]!==null ? exam.color+"66" : "rgba(255,255,255,.2)",
                }} />
            ))}
          </div>

          {qIdx + 1 < exam.questions.length ? (
            <button onClick={() => setQIdx(i => i+1)}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-white text-sm hover:opacity-90 transition-all"
              style={{ background:`linear-gradient(135deg,${exam.color},${exam.color}bb)` }}>
              Next <ChevronRight size={14} />
            </button>
          ) : (
            <button onClick={handleSubmit}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-white text-sm hover:opacity-90 transition-all"
              style={{ background:"linear-gradient(135deg,#16a34a,#0d9488)" }}>
              Submit <CheckCircle size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
