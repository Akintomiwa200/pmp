// app/onboarding/page.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft, CheckCircle2, Target, Clock, Award } from "lucide-react";

// ── Assessment quiz that determines user's starting level ──────────────────
const ASSESSMENT_QUESTIONS = [
  {
    id: "q1",
    question: "Which best describes your current PM experience?",
    options: [
      { label: "Complete beginner — I've never managed a project formally", level: 0 },
      { label: "Some experience — I've managed small tasks or helped on projects", level: 1 },
      { label: "Active PM — I manage projects regularly but want to formalise", level: 2 },
      { label: "Experienced PM — I'm aiming for certification or leadership", level: 3 },
    ],
  },
  {
    id: "q2",
    question: "What is the 'Iron Triangle' in project management?",
    options: [
      { label: "People, Process, Technology", level: 0 },
      { label: "Scope, Time, Cost", level: 2 },
      { label: "Plan, Execute, Review", level: 1 },
      { label: "Risk, Quality, Communication", level: 0 },
    ],
  },
  {
    id: "q3",
    question: "Which methodology uses Sprints to deliver incremental work?",
    options: [
      { label: "Waterfall", level: 0 },
      { label: "PRINCE2", level: 1 },
      { label: "Scrum", level: 2 },
      { label: "Critical Path Method", level: 1 },
    ],
  },
  {
    id: "q4",
    question: "What does CPI stand for in Earned Value Management?",
    options: [
      { label: "I don't know EVM yet", level: 0 },
      { label: "Critical Project Index", level: 0 },
      { label: "Cost Performance Index", level: 3 },
      { label: "Control Project Implementation", level: 1 },
    ],
  },
  {
    id: "q5",
    question: "What is your primary goal with PMPath?",
    options: [
      { label: "🌱 Learn PM basics and understand what PMs do", level: 0 },
      { label: "📈 Deepen skills and lead more complex projects", level: 1 },
      { label: "🏆 Prepare for PMP or CAPM certification", level: 2 },
      { label: "💼 Transition into a PM role within 6 months", level: 1 },
    ],
  },
];

const GOALS = [
  "Get PMP certified",
  "Land my first PM role",
  "Switch from another field",
  "Improve current PM skills",
  "Prepare for CAPM",
  "Build & lead a team",
  "Understand Agile",
  "Start freelance PM work",
];

const LEVEL_MAP: Record<number, { label: string; color: string; path: string; emoji: string; desc: string }> = {
  0: { label: "Beginner", color: "#16a34a", path: "/learn/beginner", emoji: "🌱", desc: "Start with PM fundamentals — no experience needed." },
  1: { label: "Intermediate", color: "#2563eb", path: "/learn/intermediate", emoji: "📈", desc: "Build on basics with risk management and advanced Agile." },
  2: { label: "Advanced", color: "#7c3aed", path: "/learn/advanced", emoji: "🏆", desc: "PMP certification prep and leadership skills." },
};

type Step = "welcome" | "quiz" | "goals" | "result";

export default function OnboardingPage() {
  const [step, setStep] = useState<Step>("welcome");
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState<number[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [animating, setAnimating] = useState(false);

  const handleAnswer = (level: number) => {
    if (animating) return;
    setAnimating(true);
    const newScores = [...scores, level];
    setScores(newScores);
    setTimeout(() => {
      if (currentQ < ASSESSMENT_QUESTIONS.length - 1) {
        setCurrentQ(currentQ + 1);
      } else {
        setStep("goals");
      }
      setAnimating(false);
    }, 300);
  };

  const toggleGoal = (goal: string) => {
    setSelectedGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  };

  const computedLevel = (() => {
    if (scores.length === 0) return 0;
    const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
    if (avg >= 2.2) return 2;
    if (avg >= 1.1) return 1;
    return 0;
  })();

  const levelInfo = LEVEL_MAP[computedLevel];
  const progress = ((currentQ + 1) / ASSESSMENT_QUESTIONS.length) * 100;

  // ── Welcome ──────────────────────────────────────────────────────────────
  if (step === "welcome") {
    return (
      <div className="min-h-[90vh] flex items-center justify-center px-4 py-12 bg-slate-50">
        <div className="max-w-lg w-full text-center space-y-8">
          <div>
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center mx-auto mb-6 shadow-lg">
              <span className="text-3xl">🎯</span>
            </div>
            <h1 className="text-4xl font-display font-bold text-ink mb-3">
              Let's Find Your<br />Perfect Starting Point
            </h1>
            <p className="text-ink-muted text-lg leading-relaxed">
              Answer 5 quick questions and we'll build a personalised learning path tailored exactly to your level and goals.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: Clock, label: "2 minutes", desc: "to complete" },
              { icon: Target, label: "5 questions", desc: "no right/wrong" },
              { icon: Award, label: "Personalised", desc: "learning path" },
            ].map((item) => (
              <div key={item.label} className="card p-4 text-center">
                <item.icon size={20} className="text-brand-600 mx-auto mb-2" />
                <p className="text-sm font-bold text-ink">{item.label}</p>
                <p className="text-xs text-ink-muted">{item.desc}</p>
              </div>
            ))}
          </div>

          <button
            onClick={() => setStep("quiz")}
            className="inline-flex items-center gap-2 px-10 py-4 rounded-2xl text-white font-semibold text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all w-full justify-center"
            style={{ background: "linear-gradient(135deg,#16a34a,#0d9488)" }}
          >
            Start Assessment <ArrowRight size={18} />
          </button>

          <p className="text-sm text-ink-subtle">
            Already know your level?{" "}
            <Link href="/learn/beginner" className="text-brand-600 font-medium hover:underline">Skip to Beginner</Link>
            {" · "}
            <Link href="/learn/intermediate" className="text-brand-600 font-medium hover:underline">Intermediate</Link>
            {" · "}
            <Link href="/learn/advanced" className="text-brand-600 font-medium hover:underline">Advanced</Link>
          </p>
        </div>
      </div>
    );
  }

  // ── Quiz ─────────────────────────────────────────────────────────────────
  if (step === "quiz") {
    const q = ASSESSMENT_QUESTIONS[currentQ];
    return (
      <div className="min-h-[90vh] flex items-center justify-center px-4 py-12 bg-slate-50">
        <div className="max-w-xl w-full space-y-6">
          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-ink-muted">
              <span>Question {currentQ + 1} of {ASSESSMENT_QUESTIONS.length}</span>
              <span className="font-medium text-brand-600">{Math.round(progress)}% complete</span>
            </div>
            <div className="h-2 bg-surface-2 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-brand-500 to-teal-500 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question card */}
          <div className={`card p-8 space-y-6 transition-all duration-300 ${animating ? "opacity-50 scale-[0.99]" : "opacity-100 scale-100"}`}>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-brand-600 mb-3">Assessment</p>
              <h2 className="text-2xl font-display font-bold text-ink leading-tight">{q.question}</h2>
            </div>

            <div className="space-y-3">
              {q.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(opt.level)}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl border-2 border-surface-3 hover:border-brand-400 hover:bg-brand-50/50 transition-all text-left group"
                >
                  <div className="w-8 h-8 rounded-xl border-2 border-surface-3 group-hover:border-brand-500 group-hover:bg-brand-500 flex items-center justify-center shrink-0 transition-all text-xs font-bold text-ink-muted group-hover:text-white">
                    {String.fromCharCode(65 + i)}
                  </div>
                  <span className="text-sm font-medium text-ink">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Back */}
          {currentQ > 0 && (
            <button
              onClick={() => { setCurrentQ(currentQ - 1); setScores(scores.slice(0, -1)); }}
              className="btn-ghost text-sm"
            >
              <ArrowLeft size={14} /> Previous question
            </button>
          )}
        </div>
      </div>
    );
  }

  // ── Goals ─────────────────────────────────────────────────────────────────
  if (step === "goals") {
    return (
      <div className="min-h-[90vh] flex items-center justify-center px-4 py-12 bg-slate-50">
        <div className="max-w-xl w-full space-y-6">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-600 mb-3">Almost done!</p>
            <h2 className="text-3xl font-display font-bold text-ink mb-2">What are your goals?</h2>
            <p className="text-ink-muted">Select all that apply — we'll tailor your recommendations.</p>
          </div>

          <div className="card p-6">
            <div className="grid grid-cols-2 gap-3">
              {GOALS.map((goal) => {
                const selected = selectedGoals.includes(goal);
                return (
                  <button
                    key={goal}
                    onClick={() => toggleGoal(goal)}
                    className={`flex items-center gap-2.5 p-3.5 rounded-xl border-2 text-left text-sm font-medium transition-all ${
                      selected
                        ? "border-brand-500 bg-brand-50 text-brand-800"
                        : "border-surface-3 hover:border-brand-300 text-ink-muted"
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${selected ? "bg-brand-500 border-brand-500" : "border-surface-3"}`}>
                      {selected && <CheckCircle2 size={12} className="text-white" />}
                    </div>
                    {goal}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            onClick={() => setStep("result")}
            disabled={selectedGoals.length === 0}
            className="w-full py-4 rounded-2xl text-white font-semibold text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ background: "linear-gradient(135deg,#16a34a,#0d9488)" }}
          >
            See My Personalised Path <ArrowRight size={18} className="inline ml-2" />
          </button>
        </div>
      </div>
    );
  }

  // ── Result ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 py-12 bg-slate-50">
      <div className="max-w-lg w-full space-y-8 text-center">
        {/* Celebration */}
        <div>
          <div className="text-7xl mb-4 animate-bounce">{levelInfo.emoji}</div>
          <h1 className="text-4xl font-display font-bold text-ink mb-3">
            Your Path is Ready!
          </h1>
          <p className="text-ink-muted text-lg">Based on your answers, we recommend:</p>
        </div>

        {/* Level card */}
        <div className="card p-8 space-y-4 border-2" style={{ borderColor: levelInfo.color + "40", background: levelInfo.color + "08" }}>
          <div className="text-5xl">{levelInfo.emoji}</div>
          <h2 className="text-3xl font-display font-bold" style={{ color: levelInfo.color }}>
            {levelInfo.label} Path
          </h2>
          <p className="text-ink-muted">{levelInfo.desc}</p>

          {selectedGoals.length > 0 && (
            <div className="pt-3 border-t border-surface-2">
              <p className="text-xs text-ink-subtle mb-2 font-medium">Your goals:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {selectedGoals.map((g) => (
                  <span key={g} className="text-xs px-2.5 py-1 rounded-full bg-white border border-surface-3 text-ink-muted">{g}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Score breakdown */}
        <div className="card p-5">
          <p className="text-xs font-bold uppercase tracking-widest text-ink-subtle mb-4">Assessment Breakdown</p>
          <div className="space-y-2.5">
            {ASSESSMENT_QUESTIONS.map((q, i) => (
              <div key={q.id} className="flex items-center gap-3">
                <span className="text-xs text-ink-subtle w-6 shrink-0">Q{i + 1}</span>
                <div className="flex-1 h-2 bg-surface-2 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${((scores[i] ?? 0) / 3) * 100}%`,
                      background: levelInfo.color,
                      transitionDelay: `${i * 100}ms`,
                    }}
                  />
                </div>
                <span className="text-xs font-medium text-ink w-16 text-right shrink-0">
                  {["Beginner", "Basic", "Intermediate", "Advanced"][scores[i] ?? 0]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="space-y-3">
          <Link
            href={levelInfo.path}
            className="w-full inline-flex items-center justify-center gap-2 py-4 rounded-2xl text-white font-semibold text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
            style={{ background: `linear-gradient(135deg, ${levelInfo.color}, ${levelInfo.color}cc)` }}
          >
            Start {levelInfo.label} Path <ArrowRight size={18} />
          </Link>
          <Link href="/dashboard" className="btn-secondary w-full justify-center py-3">
            Go to Dashboard
          </Link>
        </div>

        <button
          onClick={() => { setStep("welcome"); setCurrentQ(0); setScores([]); setSelectedGoals([]); }}
          className="text-sm text-ink-subtle hover:text-ink transition-colors"
        >
          Retake assessment
        </button>
      </div>
    </div>
  );
}
