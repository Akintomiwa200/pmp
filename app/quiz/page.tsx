"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { Trophy, Zap, RotateCcw, Home, Volume2, VolumeX, CheckCircle, XCircle, Flame } from "lucide-react";

// ─── QUIZ DATA ──────────────────────────────────────────────────────────────
const QUIZ_BANK = {
  beginner: {
    title: "PM Fundamentals",
    emoji: "🌱",
    color: "#16a34a",
    bg: "from-green-600 to-emerald-500",
    timePerQ: 20,
    questions: [
      { id: "b1", question: "What is the 'Iron Triangle' in project management?", options: ["People, Process, Technology", "Scope, Time, Cost", "Plan, Execute, Review", "Risk, Quality, Communication"], correct: 1, explanation: "Scope, Time & Cost — change one and the others are affected." },
      { id: "b2", question: "Which phase comes FIRST in the PM lifecycle?", options: ["Planning", "Execution", "Initiation", "Closing"], correct: 2, explanation: "Initiation — the project is formally authorised here." },
      { id: "b3", question: "A project is BEST described as:", options: ["Ongoing daily operations", "Temporary endeavor with a unique result", "Annual budget exercise", "A team-building activity"], correct: 1, explanation: "Projects are temporary (have a start & end) and produce unique deliverables." },
      { id: "b4", question: "Scope Creep is:", options: ["A planned scope expansion", "Uncontrolled scope growth without change control", "A risk management tool", "The critical path method"], correct: 1, explanation: "Scope creep = uncontrolled additions without adjusting time/cost. Leading cause of failure." },
      { id: "b5", question: "Which methodology uses Sprints?", options: ["Waterfall", "PRINCE2", "Scrum", "Critical Path"], correct: 2, explanation: "Scrum uses time-boxed Sprints (1–4 weeks) to deliver working increments." },
      { id: "b6", question: "WBS stands for:", options: ["Work Budget Schedule", "Work Breakdown Structure", "Weekly Budget Summary", "Workforce Balance System"], correct: 1, explanation: "Work Breakdown Structure — hierarchical decomposition of project scope." },
      { id: "b7", question: "Who formally authorises a project?", options: ["Project Manager", "Scrum Master", "Project Sponsor", "Stakeholder"], correct: 2, explanation: "The Project Sponsor authorises the project and provides resources." },
      { id: "b8", question: "A Kanban board uses which columns?", options: ["Draft, Review, Final", "To Do, In Progress, Done", "Initiate, Plan, Execute", "Backlog, Sprint, Release"], correct: 1, explanation: "To Do / In Progress / Done — visualises workflow and limits WIP." },
    ],
  },
  intermediate: {
    title: "Intermediate PM",
    emoji: "📈",
    color: "#2563eb",
    bg: "from-blue-600 to-cyan-500",
    timePerQ: 25,
    questions: [
      { id: "i1", question: "The Critical Path is:", options: ["Most expensive sequence", "Longest dependent task sequence", "Riskiest path", "Shortest path"], correct: 1, explanation: "Longest sequence of dependent tasks — delays here delay the whole project." },
      { id: "i2", question: "RACI stands for:", options: ["Risk, Audit, Control, Index", "Responsible, Accountable, Consulted, Informed", "Resource, Assign, Cost, Implement", "Review, Approve, Control, Implement"], correct: 1, explanation: "RACI clarifies who does the work, owns it, gives input, and stays informed." },
      { id: "i3", question: "The Risk Register is created during:", options: ["Only when a risk occurs", "Project closure", "Planning, updated throughout", "Initiation only"], correct: 2, explanation: "Created in Planning and continuously updated as new risks emerge." },
      { id: "i4", question: "High interest, LOW power stakeholder → strategy:", options: ["Manage closely", "Keep satisfied", "Keep informed", "Monitor only"], correct: 2, explanation: "Keep Informed — they care deeply but can't directly affect the project." },
      { id: "i5", question: "Gold Plating means:", options: ["Using expensive tools", "Adding features beyond scope without change control", "Premium QA technique", "Bonus pay for early delivery"], correct: 1, explanation: "Adding unrequested features — wastes resources and bypasses change control." },
      { id: "i6", question: "Float (Slack) is:", options: ["Contingency budget", "Time a task can slip without delaying the project", "Team break time", "Buffer on every task"], correct: 1, explanation: "Float = scheduling flexibility. Critical path tasks have zero float." },
    ],
  },
  advanced: {
    title: "Advanced / PMP",
    emoji: "🏆",
    color: "#7c3aed",
    bg: "from-purple-600 to-pink-500",
    timePerQ: 30,
    questions: [
      { id: "a1", question: "CPI = 0.85, SPI = 0.92. PM should do FIRST:", options: ["Issue change request for more budget", "Analyse root cause of variance", "Notify sponsor of cancellation", "Crash all activities"], correct: 1, explanation: "Always analyse root cause FIRST before taking corrective action." },
      { id: "a2", question: "PMBOK 7 'Systems Thinking' principle:", options: ["Stewardship", "Stakeholder Engagement", "Recognise system interactions", "Value Delivery"], correct: 2, explanation: "Recognise that projects exist in complex interrelated environments." },
      { id: "a3", question: "BAC=$500k, EV=$200k, AC=$250k. CPI = ?", options: ["0.80", "1.25", "0.64", "0.40"], correct: 0, explanation: "CPI = EV/AC = 200k/250k = 0.80. Over budget." },
      { id: "a4", question: "Stakeholder wants scope change after baseline. PM should:", options: ["Add it immediately", "Reject it to protect baseline", "Evaluate & submit through Integrated Change Control", "Add it silently"], correct: 2, explanation: "All changes go through Integrated Change Control regardless of source." },
      { id: "a5", question: "EAC formula using current CPI:", options: ["EAC = BAC + AC", "EAC = BAC / CPI", "EAC = AC + ETC", "EAC = PV − EV"], correct: 1, explanation: "EAC = BAC/CPI — forecasts total cost assuming current efficiency continues." },
      { id: "a6", question: "Velocity = 30 pts/sprint, Backlog = 180 pts. Sprints needed:", options: ["3", "5", "6", "9"], correct: 2, explanation: "180 ÷ 30 = 6 sprints." },
    ],
  },
};

// ─── WEB AUDIO ENGINE ───────────────────────────────────────────────────────
function useAudio(muted: boolean) {
  const ctx = useRef<AudioContext | null>(null);

  const getCtx = useCallback(() => {
    if (!ctx.current) ctx.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    if (ctx.current.state === "suspended") ctx.current.resume();
    return ctx.current;
  }, []);

  const playTone = useCallback((freq: number, type: OscillatorType, duration: number, vol = 0.18, delay = 0) => {
    if (muted) return;
    try {
      const ac = getCtx();
      const osc = ac.createOscillator();
      const gain = ac.createGain();
      osc.connect(gain);
      gain.connect(ac.destination);
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ac.currentTime + delay);
      gain.gain.setValueAtTime(0, ac.currentTime + delay);
      gain.gain.linearRampToValueAtTime(vol, ac.currentTime + delay + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + delay + duration);
      osc.start(ac.currentTime + delay);
      osc.stop(ac.currentTime + delay + duration);
    } catch { /* ignore */ }
  }, [muted, getCtx]);

  return {
    // Lobby countdown beep
    lobbyBeep: useCallback(() => { playTone(880, "sine", 0.12, 0.2); }, [playTone]),

    // Question appears — dramatic swoosh
    questionStart: useCallback(() => {
      playTone(220, "sawtooth", 0.08, 0.06);
      playTone(330, "sawtooth", 0.08, 0.06, 0.05);
      playTone(440, "sawtooth", 0.1, 0.08, 0.1);
    }, [playTone]),

    // Countdown tick
    tick: useCallback(() => { playTone(660, "square", 0.06, 0.08); }, [playTone]),

    // Urgent ticking (last 5 seconds)
    urgentTick: useCallback(() => {
      playTone(880, "square", 0.08, 0.15);
    }, [playTone]),

    // Correct answer
    correct: useCallback(() => {
      playTone(523, "sine", 0.12, 0.2);
      playTone(659, "sine", 0.12, 0.2, 0.12);
      playTone(784, "sine", 0.18, 0.25, 0.24);
    }, [playTone]),

    // Wrong answer
    wrong: useCallback(() => {
      playTone(200, "sawtooth", 0.15, 0.2);
      playTone(150, "sawtooth", 0.12, 0.15, 0.18);
    }, [playTone]),

    // Time up
    timeUp: useCallback(() => {
      playTone(330, "sawtooth", 0.08, 0.15);
      playTone(220, "sawtooth", 0.1, 0.15, 0.1);
      playTone(110, "sawtooth", 0.12, 0.2, 0.22);
    }, [playTone]),

    // Results fanfare
    fanfare: useCallback(() => {
      const notes = [523, 659, 784, 1047];
      notes.forEach((n, i) => playTone(n, "sine", 0.3, 0.22, i * 0.13));
    }, [playTone]),

    // Streak bonus
    streak: useCallback(() => {
      playTone(784, "sine", 0.1, 0.2);
      playTone(988, "sine", 0.1, 0.2, 0.1);
      playTone(1047, "sine", 0.14, 0.25, 0.2);
    }, [playTone]),
  };
}

// ─── OPTION SHAPES (A B C D colours) ───────────────────────────────────────
const OPTION_CONFIG = [
  { shape: "▲", bg: "bg-red-500",    hover: "hover:bg-red-400",    label: "A" },
  { shape: "◆", bg: "bg-blue-500",   hover: "hover:bg-blue-400",   label: "B" },
  { shape: "●", bg: "bg-yellow-400", hover: "hover:bg-yellow-300", label: "C" },
  { shape: "■", bg: "bg-green-500",  hover: "hover:bg-green-400",  label: "D" },
];

type Phase = "lobby" | "question" | "reveal" | "results" | "podium";
type Level = "beginner" | "intermediate" | "advanced";

// ─── COMPONENT ──────────────────────────────────────────────────────────────
export default function QuizPage() {
  const [level, setLevel] = useState<Level | null>(null);
  const [phase, setPhase] = useState<Phase>("lobby");
  const [qIndex, setQIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [selected, setSelected] = useState<number | null>(null);
  const [scores, setScores] = useState<number[]>([]);
  const [streak, setStreak] = useState(0);
  const [muted, setMuted] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [showStreak, setShowStreak] = useState(false);
  const [totalPoints, setTotalPoints] = useState(0);
  const [lobbyCount, setLobbyCount] = useState(3);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const audio = useAudio(muted);

  const quiz = level ? QUIZ_BANK[level] : null;
  const question = quiz?.questions[qIndex];
  const totalQ = quiz?.questions.length ?? 0;

  // ─ Cleanup timer ─
  const clearTimer = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
  }, []);

  // ─ Start question ─
  const startQuestion = useCallback((idx: number) => {
    if (!quiz) return;
    const tpq = quiz.timePerQ;
    setQIndex(idx);
    setSelected(null);
    setTimeLeft(tpq);
    setAnimate(true);
    setPhase("question");
    audio.questionStart();
    setTimeout(() => setAnimate(false), 600);

    clearTimer();
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearTimer();
          audio.timeUp();
          setPhase("reveal");
          setScores(s => [...s, 0]);
          return 0;
        }
        if (prev <= 6) audio.urgentTick();
        else if (prev % 5 === 0) audio.tick();
        return prev - 1;
      });
    }, 1000);
  }, [quiz, audio, clearTimer]);

  // ─ Lobby countdown ─
  useEffect(() => {
    if (phase !== "lobby" || !level) return;
    setLobbyCount(3);
    let count = 3;
    audio.lobbyBeep();
    const iv = setInterval(() => {
      count--;
      if (count <= 0) { clearInterval(iv); startQuestion(0); }
      else { setLobbyCount(count); audio.lobbyBeep(); }
    }, 1000);
    return () => clearInterval(iv);
  }, [phase, level]);

  // ─ Answer ─
  const handleAnswer = useCallback((idx: number) => {
    if (selected !== null || phase !== "question" || !question) return;
    clearTimer();
    setSelected(idx);
    setPhase("reveal");

    const isCorrect = idx === question.correct;
    if (isCorrect) {
      const timeBonus = Math.round((timeLeft / (quiz?.timePerQ ?? 20)) * 500);
      const streakBonus = streak >= 2 ? (streak >= 4 ? 300 : 150) : 0;
      const pts = 500 + timeBonus + streakBonus;
      setTotalPoints(p => p + pts);
      setScores(s => [...s, pts]);
      setStreak(s => s + 1);
      audio.correct();
      if (streak >= 1) {
        setTimeout(() => { audio.streak(); setShowStreak(true); setTimeout(() => setShowStreak(false), 1800); }, 300);
      }
    } else {
      setScores(s => [...s, 0]);
      setStreak(0);
      audio.wrong();
    }
  }, [selected, phase, question, clearTimer, timeLeft, quiz, streak, audio]);

  // ─ Next ─
  const handleNext = useCallback(() => {
    if (!quiz) return;
    if (qIndex + 1 < totalQ) {
      startQuestion(qIndex + 1);
    } else {
      setPhase("results");
      audio.fanfare();
    }
  }, [quiz, qIndex, totalQ, startQuestion, audio]);

  // ─ Restart ─
  const restart = useCallback((l: Level) => {
    clearTimer();
    setLevel(l);
    setScores([]);
    setStreak(0);
    setTotalPoints(0);
    setSelected(null);
    setQIndex(0);
    setPhase("lobby");
  }, [clearTimer]);

  const pct = totalQ > 0 ? Math.round((scores.filter(s => s > 0).length / totalQ) * 100) : 0;
  const rank = pct >= 90 ? "🥇 PM Master" : pct >= 70 ? "🥈 PM Pro" : pct >= 50 ? "🥉 Developing" : "📚 Keep Learning";

  // ─── LOBBY SCREEN ─────────────────────────────────────────────────────────
  if (!level || phase === "lobby") {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: "linear-gradient(135deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%)" }}>
        {/* Mute button */}
        <div className="absolute top-4 right-4 z-50">
          <button onClick={() => setMuted(m => !m)} className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-colors">
            {muted ? <VolumeX size={18} className="text-white/60" /> : <Volume2 size={18} className="text-white" />}
          </button>
        </div>

        {!level ? (
          /* Level select */
          <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
            <div className="text-6xl mb-4 animate-bounce">🧠</div>
            <h1 className="text-5xl font-display font-bold text-white mb-2 text-center">PMPath Quiz</h1>
            <p className="text-white/60 text-lg mb-12 text-center">Kahoot-style · Sounds · Streaks · Podium</p>
            <div className="grid sm:grid-cols-3 gap-5 w-full max-w-3xl">
              {(["beginner","intermediate","advanced"] as Level[]).map(l => {
                const q = QUIZ_BANK[l];
                return (
                  <button key={l} onClick={() => restart(l)}
                    className={`relative overflow-hidden rounded-3xl p-6 text-left text-white transition-all hover:scale-105 hover:shadow-2xl active:scale-95 bg-gradient-to-br ${q.bg}`}>
                    <div className="absolute -top-4 -right-4 text-7xl opacity-20">{q.emoji}</div>
                    <div className="relative">
                      <div className="text-3xl mb-3">{q.emoji}</div>
                      <div className="font-bold text-xl mb-1">{q.title}</div>
                      <div className="text-sm text-white/70 mb-4">{q.questions.length} questions · {q.timePerQ}s each</div>
                      <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-xl font-semibold text-sm">
                        Play Now →
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          /* Countdown */
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="text-xl text-white/60 font-semibold mb-4 uppercase tracking-widest">Get Ready!</div>
            <div
              key={lobbyCount}
              className="text-[12rem] font-display font-black text-white leading-none"
              style={{ animation: "countPop 0.5s ease-out" }}
            >
              {lobbyCount}
            </div>
            <div className="text-white/40 mt-4 text-lg">{quiz?.title}</div>
          </div>
        )}

        <style>{`
          @keyframes countPop { 0%{transform:scale(1.4);opacity:0} 100%{transform:scale(1);opacity:1} }
          @keyframes slideIn { 0%{transform:translateY(-40px);opacity:0} 100%{transform:translateY(0);opacity:1} }
          @keyframes fadeZoom { 0%{transform:scale(0.85);opacity:0} 100%{transform:scale(1);opacity:1} }
          @keyframes streakPop { 0%{transform:scale(0.5);opacity:0} 50%{transform:scale(1.2)} 100%{transform:scale(1);opacity:1} }
          @keyframes shake { 0%,100%{transform:translateX(0)} 20%,60%{transform:translateX(-8px)} 40%,80%{transform:translateX(8px)} }
          @keyframes correctPulse { 0%{transform:scale(1)} 30%{transform:scale(1.06)} 100%{transform:scale(1)} }
          @keyframes timerShrink { 0%{width:100%} 100%{width:0%} }
        `}</style>
      </div>
    );
  }

  // ─── RESULTS SCREEN ───────────────────────────────────────────────────────
  if (phase === "results") {
    const correct = scores.filter(s => s > 0).length;
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10"
        style={{ background: "linear-gradient(135deg,#1a1a2e,#16213e,#0f3460)" }}>
        <style>{`@keyframes confettiFall{0%{transform:translateY(-100vh) rotate(0deg);opacity:1}100%{transform:translateY(100vh) rotate(720deg);opacity:0}}`}</style>

        {/* Confetti dots */}
        {pct >= 70 && Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="fixed pointer-events-none"
            style={{
              left: `${Math.random() * 100}%`,
              top: "-10px",
              width: `${8 + Math.random() * 8}px`,
              height: `${8 + Math.random() * 8}px`,
              background: ["#f59e0b","#16a34a","#3b82f6","#e11d48","#7c3aed"][i % 5],
              borderRadius: Math.random() > 0.5 ? "50%" : "0",
              animation: `confettiFall ${1.5 + Math.random() * 2}s ease-in ${Math.random() * 1.5}s forwards`,
            }} />
        ))}

        <div className="w-full max-w-xl text-center" style={{ animation: "fadeZoom .6s ease-out" }}>
          <div className="text-8xl mb-4">{pct >= 90 ? "🏆" : pct >= 70 ? "🎉" : pct >= 50 ? "💪" : "📚"}</div>
          <h1 className="text-4xl font-display font-bold text-white mb-1">Quiz Complete!</h1>
          <p className="text-white/50 text-lg mb-8">{quiz.title}</p>

          {/* Score card */}
          <div className="rounded-3xl overflow-hidden mb-6" style={{ background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.12)" }}>
            <div className="p-8 text-center" style={{ background: `linear-gradient(135deg, ${quiz.color}40, ${quiz.color}20)` }}>
              <div className="text-7xl font-display font-black text-white mb-1">{pct}%</div>
              <div className="text-white/60 text-sm">{correct}/{totalQ} correct · {totalPoints.toLocaleString()} pts</div>
            </div>
            <div className="px-8 py-6">
              <div className="h-3 bg-white/10 rounded-full overflow-hidden mb-2">
                <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${quiz.color}, ${quiz.color}bb)` }} />
              </div>
              <div className="text-xl font-bold text-white mt-4">{rank}</div>
            </div>
          </div>

          {/* Per-question breakdown */}
          <div className="grid grid-cols-8 gap-2 mb-8">
            {quiz.questions.map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold ${scores[i] > 0 ? "bg-green-500 text-white" : "bg-red-500/70 text-white"}`}>
                  {scores[i] > 0 ? "✓" : "✗"}
                </div>
                <div className="text-[9px] text-white/40">{i + 1}</div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 justify-center">
            <button onClick={() => restart(level!)} className="btn-play text-white font-bold px-8 py-3.5 rounded-2xl text-base"
              style={{ background: `linear-gradient(135deg, ${quiz.color}, ${quiz.color}bb)` }}>
              <RotateCcw size={16} className="inline mr-2" />Play Again
            </button>
            <button onClick={() => { setLevel(null); setPhase("lobby"); clearTimer(); }} className="px-8 py-3.5 rounded-2xl text-sm font-semibold text-white/80 border border-white/20 hover:bg-white/10 transition-colors">
              Change Level
            </button>
            <Link href="/dashboard" className="px-8 py-3.5 rounded-2xl text-sm font-semibold text-white/80 border border-white/20 hover:bg-white/10 transition-colors flex items-center gap-2">
              <Home size={15} />Dashboard
            </Link>
          </div>

          {pct >= 70 && (
            <div className="mt-6 p-4 rounded-2xl bg-white/5 border border-white/10 text-sm text-white/60">
              Score saved · <Link href="/learn/advanced/analytics" className="text-white/80 underline">View analytics →</Link>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (!question) return null;

  // ─── QUESTION / REVEAL SCREEN ─────────────────────────────────────────────
  const tpq = quiz.timePerQ;
  const timerPct = (timeLeft / tpq) * 100;
  const timerColor = timeLeft > tpq * 0.5 ? quiz.color : timeLeft > tpq * 0.25 ? "#f59e0b" : "#ef4444";

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "linear-gradient(160deg,#1a1a2e 0%,#16213e 60%,#0f3460 100%)" }}>

      {/* Streak popup */}
      {showStreak && streak > 1 && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none text-center"
          style={{ animation: "streakPop .5s ease-out" }}>
          <div className="flex items-center gap-3 bg-orange-500 text-white px-8 py-4 rounded-3xl shadow-2xl">
            <Flame size={28} className="animate-pulse" />
            <div>
              <div className="text-3xl font-black">{streak}x Streak!</div>
              <div className="text-sm opacity-80">+{streak >= 4 ? 300 : 150} bonus pts</div>
            </div>
            <Flame size={28} className="animate-pulse" />
          </div>
        </div>
      )}

      {/* TOP BAR */}
      <div className="flex items-center justify-between px-5 py-4 gap-4">
        {/* Q counter */}
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-xl">
          <span className="text-white/60 text-xs">Q</span>
          <span className="text-white font-bold text-lg">{qIndex + 1}</span>
          <span className="text-white/40 text-xs">/ {totalQ}</span>
        </div>

        {/* Timer circle + bar */}
        <div className="flex-1 flex flex-col items-center gap-1.5">
          {/* Number */}
          <div className="relative w-16 h-16">
            <svg className="absolute inset-0 -rotate-90" viewBox="0 0 64 64">
              <circle cx="32" cy="32" r="27" fill="none" stroke="rgba(255,255,255,.1)" strokeWidth="5" />
              <circle cx="32" cy="32" r="27" fill="none" stroke={timerColor} strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 27}`}
                strokeDashoffset={`${2 * Math.PI * 27 * (1 - timerPct / 100)}`}
                style={{ transition: "stroke-dashoffset 0.9s linear, stroke 0.3s" }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white font-black text-xl" style={{ color: timeLeft <= 5 ? "#ef4444" : "white" }}>
                {timeLeft}
              </span>
            </div>
          </div>
          {/* Bar */}
          <div className="w-full max-w-sm h-2 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all ease-linear" style={{ width: `${timerPct}%`, background: timerColor, transitionDuration: "0.9s" }} />
          </div>
        </div>

        {/* Points + streak */}
        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur px-3 py-1.5 rounded-xl">
            <Zap size={14} className="text-yellow-400" />
            <span className="text-white font-bold text-sm">{totalPoints.toLocaleString()}</span>
          </div>
          {streak >= 2 && (
            <div className="flex items-center gap-1 text-orange-400 text-xs font-bold">
              <Flame size={12} />{streak}x
            </div>
          )}
          <button onClick={() => setMuted(m => !m)} className="text-white/40 hover:text-white/80 transition-colors">
            {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>
        </div>
      </div>

      {/* QUESTION */}
      <div className="flex-1 flex flex-col justify-between px-4 pb-4 gap-4">
        <div className="flex-1 flex items-center justify-center">
          <div
            className="w-full max-w-3xl rounded-3xl px-8 py-10 text-center"
            style={{
              background: "rgba(255,255,255,.06)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,.1)",
              animation: animate ? "slideIn .4s ease-out" : "none",
            }}
          >
            {(question as { domain?: string }).domain && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-4 uppercase tracking-wider"
                style={{ background: quiz.color + "30", color: quiz.color }}>
                {(question as { domain?: string }).domain}
              </div>
            )}
            <p className="text-2xl sm:text-3xl font-bold text-white leading-snug">{question.question}</p>
          </div>
        </div>

        {/* OPTIONS GRID */}
        <div className="w-full max-w-3xl mx-auto grid grid-cols-2 gap-3">
          {question.options.map((opt, i) => {
            const cfg = OPTION_CONFIG[i];
            const isSelected = selected === i;
            const isCorrect = question.correct === i;
            const isRevealed = phase === "reveal";

            let bg = cfg.bg;
            let extraStyle: React.CSSProperties = {};
            let anim = "";

            if (isRevealed) {
              if (isCorrect) {
                bg = "bg-green-500";
                anim = "correctPulse .4s ease-out";
                extraStyle = { boxShadow: "0 0 30px rgba(34,197,94,.6)" };
              } else if (isSelected && !isCorrect) {
                bg = "bg-red-600";
                anim = "shake .4s ease-out";
              } else {
                bg = "bg-white/10";
              }
            }

            return (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                disabled={isRevealed}
                className={`relative flex items-center gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl text-left font-bold text-white transition-all ${isRevealed ? "" : `${cfg.bg} ${cfg.hover} hover:scale-[1.02] active:scale-[0.98]`} ${bg} disabled:cursor-default`}
                style={{ animation: anim, ...extraStyle, minHeight: "72px" }}
              >
                {/* Shape icon */}
                <div className="shrink-0 w-10 h-10 rounded-xl bg-black/20 flex items-center justify-center">
                  <span className="text-lg leading-none">{cfg.shape}</span>
                </div>
                <span className="text-sm sm:text-base leading-snug flex-1">{opt}</span>

                {/* Reveal icons */}
                {isRevealed && isCorrect && <CheckCircle size={22} className="shrink-0 text-white" />}
                {isRevealed && isSelected && !isCorrect && <XCircle size={22} className="shrink-0 text-white" />}
              </button>
            );
          })}
        </div>

        {/* REVEAL PANEL */}
        {phase === "reveal" && (
          <div className="w-full max-w-3xl mx-auto rounded-2xl overflow-hidden"
            style={{ animation: "fadeZoom .35s ease-out", background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", backdropFilter: "blur(12px)" }}>
            <div className="flex items-center justify-between p-4 sm:p-5">
              <div className="flex items-center gap-3">
                {selected !== null && selected === question.correct
                  ? <><div className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center"><CheckCircle size={20} className="text-white" /></div><div><div className="font-bold text-green-400 text-sm">Correct! +{scores[qIndex]} pts</div><div className="text-white/50 text-xs">{question.explanation}</div></div></>
                  : selected === null
                    ? <><div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center"><span className="text-white text-lg">⏱</span></div><div><div className="font-bold text-orange-400 text-sm">Time's up!</div><div className="text-white/50 text-xs">{question.explanation}</div></div></>
                    : <><div className="w-10 h-10 rounded-xl bg-red-500 flex items-center justify-center"><XCircle size={20} className="text-white" /></div><div><div className="font-bold text-red-400 text-sm">Wrong answer</div><div className="text-white/50 text-xs">{question.explanation}</div></div></>
                }
              </div>
              <button onClick={handleNext}
                className="shrink-0 px-6 py-3 rounded-xl font-bold text-white text-sm hover:opacity-90 active:scale-95 transition-all"
                style={{ background: `linear-gradient(135deg, ${quiz.color}, ${quiz.color}bb)` }}>
                {qIndex + 1 < totalQ ? "Next →" : "Results 🏆"}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-2 pb-4">
        {quiz.questions.map((_, i) => (
          <div key={i} className="w-2 h-2 rounded-full transition-all"
            style={{
              background: i < qIndex ? (scores[i] > 0 ? "#22c55e" : "#ef4444") : i === qIndex ? "#fff" : "rgba(255,255,255,.2)",
              transform: i === qIndex ? "scale(1.5)" : "scale(1)",
            }} />
        ))}
      </div>

      <style>{`
        @keyframes countPop{0%{transform:scale(1.4);opacity:0}100%{transform:scale(1);opacity:1}}
        @keyframes slideIn{0%{transform:translateY(-30px);opacity:0}100%{transform:translateY(0);opacity:1}}
        @keyframes fadeZoom{0%{transform:scale(0.9);opacity:0}100%{transform:scale(1);opacity:1}}
        @keyframes streakPop{0%{transform:translate(-50%,-50%) scale(.5);opacity:0}50%{transform:translate(-50%,-50%) scale(1.15)}100%{transform:translate(-50%,-50%) scale(1);opacity:1}}
        @keyframes shake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-7px)}40%,80%{transform:translateX(7px)}}
        @keyframes correctPulse{0%{transform:scale(1)}30%{transform:scale(1.04)}100%{transform:scale(1)}}
        @keyframes confettiFall{0%{transform:translateY(-100vh) rotate(0deg);opacity:1}100%{transform:translateY(100vh) rotate(720deg);opacity:0}}
      `}</style>
    </div>
  );
}
