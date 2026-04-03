// components/quiz/QuizEngine.tsx
"use client";
import { useState, useEffect, useCallback } from "react";
import { Clock, ChevronRight, RotateCcw, CheckCircle2, XCircle, AlertTriangle, Award } from "lucide-react";

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  points: number;
  difficulty?: "easy" | "medium" | "hard";
  domain?: string;
}

interface QuizEngineProps {
  title: string;
  questions: QuizQuestion[];
  timeLimit?: number; // seconds, 0 = no limit
  passingScore?: number; // percentage
  onComplete?: (result: QuizResult) => void;
  accentColor?: string;
  showProgress?: boolean;
  allowRetry?: boolean;
}

export interface QuizResult {
  score: number;
  total: number;
  percentage: number;
  passed: boolean;
  timeTaken: number;
  answers: Record<string, number>;
  correctAnswers: number;
}

type QuizPhase = "intro" | "active" | "review";

export default function QuizEngine({
  title, questions, timeLimit = 0, passingScore = 70,
  onComplete, accentColor = "#16a34a", showProgress = true, allowRetry = true,
}: QuizEngineProps) {
  const [phase, setPhase] = useState<QuizPhase>("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [startTime, setStartTime] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [flagged, setFlagged] = useState<Set<string>>(new Set());

  const total = questions.length;
  const current = questions[currentQ];

  // Timer
  useEffect(() => {
    if (phase !== "active" || timeLimit === 0) return;
    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) { handleSubmit(); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [phase, timeLimit]);

  const formatTime = (s: number) =>
    `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

  const timerColor =
    timeLeft < 60 ? "#ef4444" : timeLeft < 120 ? "#f59e0b" : "#0f172a";

  const handleStart = () => {
    setPhase("active");
    setStartTime(Date.now());
    setTimeLeft(timeLimit);
  };

  const handleAnswer = (optionIdx: number) => {
    if (animating || answers[current.id] !== undefined) return;
    setAnswers((prev) => ({ ...prev, [current.id]: optionIdx }));
  };

  const handleNext = () => {
    setAnimating(true);
    setTimeout(() => {
      if (currentQ < total - 1) {
        setCurrentQ((q) => q + 1);
      }
      setAnimating(false);
    }, 200);
  };

  const handleSubmit = useCallback(() => {
    const timeTaken = Math.round((Date.now() - startTime) / 1000);
    const correctAnswers = questions.reduce(
      (acc, q) => acc + (answers[q.id] === q.correctAnswer ? 1 : 0), 0
    );
    const percentage = Math.round((correctAnswers / total) * 100);
    const result: QuizResult = {
      score: correctAnswers,
      total,
      percentage,
      passed: percentage >= passingScore,
      timeTaken,
      answers,
      correctAnswers,
    };
    onComplete?.(result);
    setPhase("review");
  }, [answers, questions, passingScore, startTime, total, onComplete]);

  const handleRetry = () => {
    setPhase("intro");
    setCurrentQ(0);
    setAnswers({});
    setTimeLeft(timeLimit);
    setFlagged(new Set());
  };

  const toggleFlag = (id: string) => {
    setFlagged((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  // Compute results for review phase
  const correctAnswers = questions.reduce(
    (acc, q) => acc + (answers[q.id] === q.correctAnswer ? 1 : 0), 0
  );
  const percentage = Math.round((correctAnswers / total) * 100);
  const passed = percentage >= passingScore;

  // ── Intro ─────────────────────────────────────────────────────────────────
  if (phase === "intro") {
    return (
      <div className="card p-8 space-y-6 text-center max-w-xl mx-auto">
        <div className="w-16 h-16 rounded-3xl mx-auto flex items-center justify-center text-white text-3xl font-bold shadow-lg"
          style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)` }}>
          📝
        </div>
        <div>
          <h2 className="text-2xl font-display font-bold text-ink mb-2">{title}</h2>
          <p className="text-ink-muted text-sm">Test your knowledge and track your progress.</p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Questions", value: total },
            { label: "Pass Mark", value: `${passingScore}%` },
            { label: timeLimit ? "Time Limit" : "No Limit", value: timeLimit ? formatTime(timeLimit) : "∞" },
          ].map((s) => (
            <div key={s.label} className="p-3 bg-surface-1 rounded-xl border border-surface-2">
              <p className="text-lg font-bold text-ink">{s.value}</p>
              <p className="text-xs text-ink-subtle">{s.label}</p>
            </div>
          ))}
        </div>
        <button
          onClick={handleStart}
          className="w-full py-3.5 rounded-2xl text-white font-semibold text-base shadow-md hover:opacity-90 hover:-translate-y-0.5 transition-all"
          style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)` }}
        >
          Start Quiz
        </button>
      </div>
    );
  }

  // ── Review ─────────────────────────────────────────────────────────────────
  if (phase === "review") {
    return (
      <div className="space-y-6 max-w-2xl mx-auto">
        {/* Score card */}
        <div className={`card p-8 text-center space-y-4 ${passed ? "bg-brand-50 border-brand-200" : "bg-red-50 border-red-200"}`}>
          <div className="text-5xl">{passed ? "🎉" : "📖"}</div>
          <h2 className="text-4xl font-display font-bold text-ink">{percentage}%</h2>
          <p className="text-ink-muted">{correctAnswers}/{total} correct</p>
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${passed ? "bg-brand-100 text-brand-800" : "bg-red-100 text-red-800"}`}>
            {passed ? <><CheckCircle2 size={15} />Passed!</> : <><XCircle size={15} />Below {passingScore}% — try again</>}
          </div>
          <div className="h-3 bg-white/60 rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all duration-700"
              style={{ width: `${percentage}%`, background: passed ? accentColor : "#ef4444" }} />
          </div>
        </div>

        {/* Question review */}
        <h3 className="font-semibold text-ink">Review Answers</h3>
        <div className="space-y-4">
          {questions.map((q, qi) => {
            const userAnswer = answers[q.id];
            const isCorrect = userAnswer === q.correctAnswer;
            return (
              <div key={q.id} className={`card p-5 border-l-4 ${isCorrect ? "border-l-brand-500" : "border-l-red-400"}`}>
                <div className="flex items-start gap-3 mb-3">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 text-white ${isCorrect ? "bg-brand-500" : "bg-red-500"}`}>
                    {qi + 1}
                  </span>
                  <p className="text-sm font-medium text-ink">{q.question}</p>
                </div>
                <div className="ml-9 space-y-1.5 mb-3">
                  {q.options.map((opt, oi) => (
                    <div key={oi} className={`flex items-center gap-2 text-xs p-2.5 rounded-xl ${oi === q.correctAnswer ? "bg-brand-50 text-brand-800 font-semibold" : oi === userAnswer && !isCorrect ? "bg-red-50 text-red-700" : "text-ink-subtle"}`}>
                      <span className={`w-4 h-4 rounded-full border flex items-center justify-center text-[9px] font-bold shrink-0 ${oi === q.correctAnswer ? "bg-brand-500 border-brand-500 text-white" : oi === userAnswer && !isCorrect ? "bg-red-400 border-red-400 text-white" : "border-surface-3"}`}>
                        {oi === q.correctAnswer ? "✓" : oi === userAnswer && !isCorrect ? "✗" : ""}
                      </span>
                      {opt}
                    </div>
                  ))}
                </div>
                <div className="ml-9 p-3 bg-blue-50 border border-blue-100 rounded-xl text-xs text-blue-800">
                  💡 {q.explanation}
                </div>
                {q.domain && <p className="ml-9 mt-1.5 text-[10px] text-ink-subtle">Domain: {q.domain}</p>}
              </div>
            );
          })}
        </div>

        {allowRetry && (
          <button onClick={handleRetry}
            className="w-full py-3 rounded-2xl font-semibold text-white"
            style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)` }}>
            <RotateCcw size={15} className="inline mr-2" />Retry Quiz
          </button>
        )}
      </div>
    );
  }

  // ── Active ─────────────────────────────────────────────────────────────────
  const progress = ((currentQ) / total) * 100;

  return (
    <div className="space-y-5 max-w-2xl mx-auto">
      {/* Header bar */}
      <div className="flex items-center gap-4">
        {showProgress && (
          <div className="flex-1">
            <div className="flex justify-between text-xs text-ink-subtle mb-1.5">
              <span>Question {currentQ + 1} of {total}</span>
              <span>{Object.keys(answers).length} answered</span>
            </div>
            <div className="h-2 bg-surface-2 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-500"
                style={{ width: `${progress}%`, background: accentColor }} />
            </div>
          </div>
        )}
        {timeLimit > 0 && (
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm font-mono font-bold shrink-0 ${timeLeft < 60 ? "bg-red-50 border-red-200 text-red-600 animate-pulse" : "bg-surface-1 border-surface-3 text-ink"}`}>
            <Clock size={14} style={{ color: timerColor }} />
            {formatTime(timeLeft)}
          </div>
        )}
      </div>

      {/* Question card */}
      <div className={`card p-6 space-y-5 transition-opacity duration-200 ${animating ? "opacity-0" : "opacity-100"}`}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            {current.domain && (
              <p className="text-[10px] font-bold uppercase tracking-wider text-ink-subtle mb-2">{current.domain}</p>
            )}
            <p className="font-semibold text-ink leading-relaxed">{current.question}</p>
          </div>
          <button
            onClick={() => toggleFlag(current.id)}
            className={`p-2 rounded-xl transition-colors shrink-0 ${flagged.has(current.id) ? "bg-amber-50 text-amber-600" : "hover:bg-surface-1 text-ink-subtle"}`}
            title="Flag for review"
          >
            <AlertTriangle size={15} />
          </button>
        </div>

        <div className="space-y-2.5">
          {current.options.map((opt, oi) => {
            const selected = answers[current.id] === oi;
            return (
              <button
                key={oi}
                onClick={() => handleAnswer(oi)}
                disabled={answers[current.id] !== undefined}
                className={`w-full flex items-center gap-3 p-4 rounded-2xl border-2 text-left text-sm transition-all ${
                  selected
                    ? "border-2 text-white font-semibold shadow-sm"
                    : "border-surface-3 hover:border-surface-3/60 bg-white text-ink hover:bg-surface-1"
                }`}
                style={selected ? { borderColor: accentColor, background: accentColor } : {}}
              >
                <div className={`w-7 h-7 rounded-xl border-2 flex items-center justify-center shrink-0 text-xs font-bold transition-all ${
                  selected ? "border-white/30 bg-white/20 text-white" : "border-surface-3 text-ink-muted"
                }`}>
                  {String.fromCharCode(65 + oi)}
                </div>
                {opt}
              </button>
            );
          })}
        </div>

        {/* Question nav */}
        <div className="flex items-center justify-between pt-2 border-t border-surface-2">
          <button
            disabled={currentQ === 0}
            onClick={() => setCurrentQ((q) => q - 1)}
            className="btn-ghost text-sm disabled:opacity-30"
          >
            ← Previous
          </button>

          {/* Mini dot navigation */}
          <div className="flex gap-1.5 flex-wrap justify-center max-w-[200px]">
            {questions.map((q, i) => (
              <button
                key={q.id}
                onClick={() => setCurrentQ(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === currentQ ? "scale-150 opacity-100" :
                  flagged.has(q.id) ? "bg-amber-400" :
                  answers[q.id] !== undefined ? "opacity-100" : "opacity-30"
                }`}
                style={i === currentQ || answers[q.id] !== undefined ? { background: accentColor } : { background: "#94a3b8" }}
              />
            ))}
          </div>

          {currentQ < total - 1 ? (
            <button
              onClick={handleNext}
              disabled={answers[current.id] === undefined}
              className="text-sm font-semibold px-4 py-2 rounded-xl text-white disabled:opacity-30 transition-all"
              style={{ background: accentColor }}
            >
              Next <ChevronRight size={14} className="inline" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={Object.keys(answers).length < total}
              className="text-sm font-semibold px-4 py-2 rounded-xl text-white disabled:opacity-40 transition-all"
              style={{ background: accentColor }}
            >
              <Award size={14} className="inline mr-1" />Submit
            </button>
          )}
        </div>
      </div>

      {/* Question grid */}
      <div className="card p-4">
        <p className="text-xs font-medium text-ink-subtle mb-3">Jump to question</p>
        <div className="flex flex-wrap gap-1.5">
          {questions.map((q, i) => (
            <button key={q.id} onClick={() => setCurrentQ(i)}
              className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                i === currentQ ? "text-white shadow-sm scale-110" :
                flagged.has(q.id) ? "bg-amber-100 text-amber-700 border border-amber-300" :
                answers[q.id] !== undefined ? "text-white opacity-70" : "bg-surface-1 text-ink-muted hover:bg-surface-2"
              }`}
              style={i === currentQ ? { background: accentColor } :
                answers[q.id] !== undefined && !flagged.has(q.id) ? { background: accentColor } : {}}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
