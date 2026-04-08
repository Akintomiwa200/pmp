"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import {
  Trophy, Zap, RotateCcw, Home, Volume2, VolumeX,
  CheckCircle, XCircle, Flame, Image, ChevronRight, Medal
} from "lucide-react";

// ─── QUIZ DATA ───────────────────────────────────────────────────────────────
const QUIZ_BANK = {
  beginner: {
    title: "PM Fundamentals", emoji: "🌱", color: "#16a34a", timePerQ: 20,
    questions: [
      { id:"b1", question:"What is the 'Iron Triangle' in project management?", options:["People, Process, Technology","Scope, Time, Cost","Plan, Execute, Review","Risk, Quality, Communication"], correct:1, explanation:"Scope, Time & Cost — change one and the others are affected." },
      { id:"b2", question:"Which phase comes FIRST in the PM lifecycle?", options:["Planning","Execution","Initiation","Closing"], correct:2, explanation:"Initiation — the project is formally authorised here." },
      { id:"b3", question:"A project is BEST described as:", options:["Ongoing daily operations","Temporary endeavor with a unique result","Annual budget exercise","A team-building activity"], correct:1, explanation:"Projects are temporary and produce unique deliverables." },
      { id:"b4", question:"Scope Creep is:", options:["A planned scope expansion","Uncontrolled scope growth without change control","A risk management tool","The critical path method"], correct:1, explanation:"Uncontrolled additions without adjusting time/cost — leading cause of failure." },
      { id:"b5", question:"Which methodology uses Sprints?", options:["Waterfall","PRINCE2","Scrum","Critical Path"], correct:2, explanation:"Scrum uses time-boxed Sprints (1–4 weeks) to deliver working increments." },
      { id:"b6", question:"WBS stands for:", options:["Work Budget Schedule","Work Breakdown Structure","Weekly Budget Summary","Workforce Balance System"], correct:1, explanation:"Work Breakdown Structure — hierarchical decomposition of project scope." },
      { id:"b7", question:"Who formally authorises a project?", options:["Project Manager","Scrum Master","Project Sponsor","Stakeholder"], correct:2, explanation:"The Project Sponsor authorises the project and provides resources." },
      { id:"b8", question:"A Kanban board uses which columns?", options:["Draft, Review, Final","To Do, In Progress, Done","Initiate, Plan, Execute","Backlog, Sprint, Release"], correct:1, explanation:"To Do / In Progress / Done — visualises workflow and limits WIP." },
    ],
  },
  intermediate: {
    title: "Intermediate PM", emoji: "📈", color: "#2563eb", timePerQ: 25,
    questions: [
      { id:"i1", question:"The Critical Path is:", options:["Most expensive sequence","Longest dependent task sequence","Riskiest path","Shortest path"], correct:1, explanation:"Longest sequence of dependent tasks — delays here delay the whole project." },
      { id:"i2", question:"RACI stands for:", options:["Risk, Audit, Control, Index","Responsible, Accountable, Consulted, Informed","Resource, Assign, Cost, Implement","Review, Approve, Control, Implement"], correct:1, explanation:"RACI clarifies who does work, owns it, gives input, and stays informed." },
      { id:"i3", question:"The Risk Register is created during:", options:["Only when a risk occurs","Project closure","Planning, updated throughout","Initiation only"], correct:2, explanation:"Created in Planning and continuously updated as new risks emerge." },
      { id:"i4", question:"High interest, LOW power stakeholder strategy:", options:["Manage closely","Keep satisfied","Keep informed","Monitor only"], correct:2, explanation:"Keep Informed — they care deeply but can't directly affect the project." },
      { id:"i5", question:"Gold Plating means:", options:["Using expensive tools","Adding features beyond scope without change control","Premium QA technique","Bonus pay for early delivery"], correct:1, explanation:"Adding unrequested features — wastes resources and bypasses change control." },
      { id:"i6", question:"Float (Slack) is:", options:["Contingency budget","Time a task can slip without delaying the project","Team break time","Buffer on every task"], correct:1, explanation:"Float = scheduling flexibility. Critical path tasks have zero float." },
    ],
  },
  advanced: {
    title: "Advanced / PMP", emoji: "🏆", color: "#7c3aed", timePerQ: 30,
    questions: [
      { id:"a1", question:"CPI = 0.85, SPI = 0.92. PM should do FIRST:", options:["Issue change request for more budget","Analyse root cause of variance","Notify sponsor of cancellation","Crash all activities"], correct:1, explanation:"Always analyse root cause FIRST before taking corrective action.", domain:"Monitoring" },
      { id:"a2", question:"PMBOK 7 'Systems Thinking' principle recognises:", options:["Stewardship is paramount","Stakeholder engagement above all","That projects exist in complex interrelated systems","Value delivery is the only goal"], correct:2, explanation:"Projects exist in complex environments where components interact.", domain:"PMBOK 7" },
      { id:"a3", question:"BAC=$500k, EV=$200k, AC=$250k. CPI = ?", options:["0.80","1.25","0.64","0.40"], correct:0, explanation:"CPI = EV/AC = 200k/250k = 0.80. Over budget.", domain:"EVM" },
      { id:"a4", question:"Stakeholder wants scope change after baseline. PM should:", options:["Add it immediately","Reject it to protect baseline","Evaluate & submit through Integrated Change Control","Add it silently"], correct:2, explanation:"All changes go through Integrated Change Control.", domain:"Change Mgmt" },
      { id:"a5", question:"EAC formula using current CPI:", options:["EAC = BAC + AC","EAC = BAC / CPI","EAC = AC + ETC","EAC = PV − EV"], correct:1, explanation:"EAC = BAC/CPI — forecasts total cost assuming current efficiency continues.", domain:"EVM" },
      { id:"a6", question:"Velocity = 30 pts/sprint, Backlog = 180 pts. Sprints needed:", options:["3","5","6","9"], correct:2, explanation:"180 ÷ 30 = 6 sprints.", domain:"Agile" },
    ],
  },
};

// ─── SIMULATED LEADERBOARD PLAYERS ──────────────────────────────────────────
const BOT_PLAYERS = [
  { name: "Alex R.",    avatar: "🌱", color: "#16a34a" },
  { name: "Priya S.",   avatar: "📊", color: "#2563eb" },
  { name: "Marcus J.",  avatar: "🏆", color: "#7c3aed" },
  { name: "Jordan L.",  avatar: "⚡", color: "#f59e0b" },
  { name: "Sofia M.",   avatar: "🎯", color: "#e11d48" },
];

// ─── BACKGROUND THEMES ───────────────────────────────────────────────────────
const BACKGROUNDS = [
  { id: "space",   label: "Galaxy",   icon: "🌌", style: "linear-gradient(160deg,#0f0c29,#302b63,#24243e)" },
  { id: "ocean",   label: "Ocean",    icon: "🌊", style: "linear-gradient(160deg,#0f2027,#203a43,#2c5364)" },
  { id: "forest",  label: "Forest",   icon: "🌲", style: "linear-gradient(160deg,#0a2e0a,#1a4a1a,#0d3320)" },
  { id: "neon",    label: "Neon",     icon: "⚡", style: "linear-gradient(160deg,#0d0221,#1a0533,#0d0f2b)" },
  { id: "sunset",  label: "Sunset",   icon: "🌅", style: "linear-gradient(160deg,#1a0a2e,#3d1a5c,#6b1a2e)" },
  { id: "minimal", label: "Minimal",  icon: "◻",  style: "linear-gradient(160deg,#1a1a1a,#2d2d2d,#1a1a1a)" },
];

// ─── OPTION CONFIG ───────────────────────────────────────────────────────────
const OPT_CONFIG = [
  { shape: "▲", solidBg: "#e21b3c", hoverBg: "#f52f4e", label: "A" },
  { shape: "◆", solidBg: "#1368ce", hoverBg: "#2479df", label: "B" },
  { shape: "●", solidBg: "#d89e00", hoverBg: "#e8ab00", label: "C" },
  { shape: "■", solidBg: "#26890c", hoverBg: "#339a12", label: "D" },
];

// ─── WEB AUDIO ───────────────────────────────────────────────────────────────
function useAudio(muted: boolean) {
  const ctx = useRef<AudioContext | null>(null);
  const getCtx = useCallback(() => {
    if (!ctx.current) ctx.current = new (window.AudioContext || (window as unknown as Record<string, typeof AudioContext>).webkitAudioContext)();
    if (ctx.current.state === "suspended") ctx.current.resume();
    return ctx.current;
  }, []);
  const tone = useCallback((freq: number, type: OscillatorType, dur: number, vol = 0.18, delay = 0) => {
    if (muted) return;
    try {
      const ac = getCtx(), o = ac.createOscillator(), g = ac.createGain();
      o.connect(g); g.connect(ac.destination);
      o.type = type; o.frequency.value = freq;
      const t = ac.currentTime + delay;
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(vol, t + 0.01);
      g.gain.exponentialRampToValueAtTime(0.001, t + dur);
      o.start(t); o.stop(t + dur);
    } catch { /**/ }
  }, [muted, getCtx]);

  return {
    beep:      useCallback(() => { tone(880,"sine",.12,.22); }, [tone]),
    qStart:    useCallback(() => { tone(220,"sawtooth",.08,.06); tone(330,"sawtooth",.08,.06,.05); tone(440,"sawtooth",.1,.08,.1); }, [tone]),
    tick:      useCallback(() => { tone(660,"square",.06,.08); }, [tone]),
    urgentTick:useCallback(() => { tone(880,"square",.08,.18); }, [tone]),
    correct:   useCallback(() => { tone(523,"sine",.12,.22); tone(659,"sine",.12,.22,.12); tone(784,"sine",.18,.28,.24); }, [tone]),
    wrong:     useCallback(() => { tone(180,"sawtooth",.18,.22); tone(130,"sawtooth",.14,.18,.18); }, [tone]),
    timeUp:    useCallback(() => { tone(330,"sawtooth",.08,.16); tone(220,"sawtooth",.1,.16,.1); tone(110,"sawtooth",.12,.22,.22); }, [tone]),
    fanfare:   useCallback(() => { [523,659,784,1047].forEach((n,i) => tone(n,"sine",.32,.24,i*.14)); }, [tone]),
    streakSfx: useCallback(() => { tone(784,"sine",.1,.22); tone(988,"sine",.1,.22,.1); tone(1047,"sine",.14,.28,.21); }, [tone]),
    leaderboard: useCallback(() => { [440,494,523].forEach((n,i) => tone(n,"sine",.18,.2,i*.09)); }, [tone]),
  };
}

// ─── TYPES ───────────────────────────────────────────────────────────────────
type Level = "beginner" | "intermediate" | "advanced";
type Phase = "select" | "countdown" | "question" | "reveal" | "leaderboard" | "results";

interface Player { name: string; avatar: string; color: string; points: number; lastPts: number; rank: number; isYou?: boolean; }

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function QuizPage() {
  const [level, setLevel]       = useState<Level | null>(null);
  const [phase, setPhase]       = useState<Phase>("select");
  const [qIndex, setQIndex]     = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [selected, setSelected] = useState<number | null>(null);
  const [scores, setScores]     = useState<number[]>([]);
  const [streak, setStreak]     = useState(0);
  const [totalPts, setTotalPts] = useState(0);
  const [muted, setMuted]       = useState(false);
  const [animate, setAnimate]   = useState(false);
  const [showStreak, setShowStreak] = useState(false);
  const [bgIndex, setBgIndex]   = useState(0);
  const [showBgPicker, setShowBgPicker] = useState(false);
  const [countNum, setCountNum] = useState(3);
  const [players, setPlayers]   = useState<Player[]>([]);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const audio = useAudio(muted);

  const quiz = level ? QUIZ_BANK[level] : null;
  const question = quiz?.questions[qIndex];
  const totalQ = quiz?.questions.length ?? 0;

  // ── init players ──────────────────────────────────────────────────────────
  const initPlayers = useCallback(() => {
    const bots: Player[] = BOT_PLAYERS.map(b => ({ ...b, points: 0, lastPts: 0, rank: 0 }));
    setPlayers([{ name: "You", avatar: "🎮", color: "#fff", points: 0, lastPts: 0, rank: 1, isYou: true }, ...bots]);
  }, []);

  // ── clear timer ───────────────────────────────────────────────────────────
  const clearTimer = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
  }, []);

  // ── update leaderboard scores ─────────────────────────────────────────────
  const updateLeaderboard = useCallback((myNewPts: number, addedPts: number) => {
    setPlayers(prev => {
      const updated = prev.map(p => {
        if (p.isYou) return { ...p, points: myNewPts, lastPts: addedPts };
        // Bots score randomly but plausibly
        const botPts = Math.random() > 0.4 ? Math.round((400 + Math.random() * 600)) : 0;
        return { ...p, points: p.points + botPts, lastPts: botPts };
      });
      // Assign ranks
      const sorted = [...updated].sort((a, b) => b.points - a.points);
      return updated.map(p => ({ ...p, rank: sorted.findIndex(s => s.name === p.name) + 1 }));
    });
  }, []);

  // ── start question ────────────────────────────────────────────────────────
  const startQuestion = useCallback((idx: number) => {
    if (!quiz) return;
    setQIndex(idx);
    setSelected(null);
    setTimeLeft(quiz.timePerQ);
    setPhase("question");
    setAnimate(true);
    audio.qStart();
    setTimeout(() => setAnimate(false), 500);

    clearTimer();
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearTimer();
          audio.timeUp();
          setPhase("reveal");
          setScores(s => [...s, 0]);
          setStreak(0);
          return 0;
        }
        if (prev <= 5) audio.urgentTick();
        else if (prev % 5 === 0) audio.tick();
        return prev - 1;
      });
    }, 1000);
  }, [quiz, audio, clearTimer]);

  // ── countdown ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== "countdown" || !level) return;
    setCountNum(3);
    let c = 3;
    audio.beep();
    const iv = setInterval(() => {
      c--;
      if (c <= 0) { clearInterval(iv); startQuestion(0); }
      else { setCountNum(c); audio.beep(); }
    }, 1000);
    return () => clearInterval(iv);
  }, [phase, level]); // eslint-disable-line

  // ── answer ────────────────────────────────────────────────────────────────
  const handleAnswer = useCallback((idx: number) => {
    if (selected !== null || phase !== "question" || !question || !quiz) return;
    clearTimer();
    setSelected(idx);
    setPhase("reveal");
    const isCorrect = idx === question.correct;

    if (isCorrect) {
      const timeBonus = Math.round((timeLeft / quiz.timePerQ) * 500);
      const streakBonus = streak >= 4 ? 300 : streak >= 2 ? 150 : 0;
      const pts = 500 + timeBonus + streakBonus;
      const newTotal = totalPts + pts;
      setTotalPts(newTotal);
      setScores(s => [...s, pts]);
      setStreak(s => s + 1);
      audio.correct();
      updateLeaderboard(newTotal, pts);
      if (streak >= 1) {
        setTimeout(() => { audio.streakSfx(); setShowStreak(true); setTimeout(() => setShowStreak(false), 1800); }, 350);
      }
    } else {
      setScores(s => [...s, 0]);
      setStreak(0);
      audio.wrong();
      updateLeaderboard(totalPts, 0);
    }
  }, [selected, phase, question, quiz, clearTimer, timeLeft, streak, totalPts, audio, updateLeaderboard]);

  // ── next (show leaderboard between questions) ─────────────────────────────
  const handleNext = useCallback(() => {
    if (!quiz) return;
    audio.leaderboard();
    setPhase("leaderboard");
  }, [quiz, audio]);

  const handleLeaderboardNext = useCallback(() => {
    if (!quiz) return;
    if (qIndex + 1 < totalQ) startQuestion(qIndex + 1);
    else { setPhase("results"); audio.fanfare(); }
  }, [quiz, qIndex, totalQ, startQuestion, audio]);

  // ── restart ───────────────────────────────────────────────────────────────
  const restart = useCallback((l: Level) => {
    clearTimer();
    setLevel(l);
    setScores([]);
    setStreak(0);
    setTotalPts(0);
    setSelected(null);
    setQIndex(0);
    initPlayers();
    setPhase("countdown");
  }, [clearTimer, initPlayers]);

  const pct = totalQ > 0 ? Math.round((scores.filter(s => s > 0).length / totalQ) * 100) : 0;
  const rankLabel = pct >= 90 ? "🥇 PM Master" : pct >= 70 ? "🥈 PM Pro" : pct >= 50 ? "🥉 Rising Star" : "📚 Keep Practising";
  const bg = BACKGROUNDS[bgIndex];
  const tpq = quiz?.timePerQ ?? 20;
  const timerPct = (timeLeft / tpq) * 100;
  const timerColor = timeLeft > tpq * 0.5 ? (quiz?.color ?? "#16a34a") : timeLeft > tpq * 0.25 ? "#f59e0b" : "#ef4444";
  const circum = 2 * Math.PI * 26;

  // ── KEYFRAMES style tag ───────────────────────────────────────────────────
  const STYLES = `
    @keyframes countPop{0%{transform:scale(1.6);opacity:0}100%{transform:scale(1);opacity:1}}
    @keyframes slideDown{0%{transform:translateY(-32px);opacity:0}100%{transform:translateY(0);opacity:1}}
    @keyframes fadeUp{0%{transform:translateY(20px);opacity:0}100%{transform:translateY(0);opacity:1}}
    @keyframes fadeZoom{0%{transform:scale(.88);opacity:0}100%{transform:scale(1);opacity:1}}
    @keyframes streakPop{0%{transform:translate(-50%,-50%) scale(.3);opacity:0}60%{transform:translate(-50%,-50%) scale(1.12)}100%{transform:translate(-50%,-50%) scale(1);opacity:1}}
    @keyframes shake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-9px)}40%,80%{transform:translateX(9px)}}
    @keyframes correctPulse{0%{transform:scale(1)}35%{transform:scale(1.055)}100%{transform:scale(1)}}
    @keyframes confettiFall{0%{transform:translateY(-60px) rotate(0deg);opacity:1}100%{transform:translateY(110vh) rotate(720deg);opacity:0}}
    @keyframes slideRight{0%{transform:translateX(-40px);opacity:0}100%{transform:translateX(0);opacity:1}}
    @keyframes rankBounce{0%{transform:scale(.5) translateX(-20px);opacity:0}70%{transform:scale(1.08)}100%{transform:scale(1) translateX(0);opacity:1}}
  `;

  // ══════════════════════════════════════════════════════════════════════════
  // LEVEL SELECT
  // ══════════════════════════════════════════════════════════════════════════
  if (phase === "select") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12" style={{ background: bg.style }}>
        <style>{STYLES}</style>
        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <div key={i} className="fixed pointer-events-none rounded-full opacity-10"
            style={{ width: 4 + (i * 7) % 20, height: 4 + (i * 7) % 20, background: "#fff", top: `${(i * 13) % 90}%`, left: `${(i * 17) % 90}%`, animation: `confettiFall ${6 + i}s ease-in-out ${i * 0.8}s infinite alternate` }} />
        ))}

        <div className="text-6xl mb-4" style={{ animation: "fadeZoom .6s ease-out" }}>🧠</div>
        <h1 className="text-5xl sm:text-6xl font-black text-white mb-2 text-center" style={{ animation: "fadeUp .5s .1s ease-out both" }}>PMPath Quiz</h1>
        <p className="text-white/50 uppercase tracking-widest text-sm mb-12 text-center" style={{ animation: "fadeUp .5s .2s ease-out both" }}>
          Kahoot-style · Sounds · Live Leaderboard · Streaks
        </p>

        <div className="grid sm:grid-cols-3 gap-5 w-full max-w-3xl mb-8">
          {(["beginner","intermediate","advanced"] as Level[]).map((l, i) => {
            const q = QUIZ_BANK[l];
            const gradients = ["from-green-600 via-emerald-500 to-teal-500","from-blue-600 via-blue-500 to-cyan-500","from-purple-600 via-purple-500 to-pink-500"];
            return (
              <button key={l} onClick={() => restart(l)}
                className={`relative overflow-hidden rounded-3xl p-6 text-left text-white bg-gradient-to-br ${gradients[i]} hover:scale-105 active:scale-95 transition-all duration-200 shadow-2xl`}
                style={{ animation: `fadeUp .5s ${.15 + i * .1}s ease-out both` }}>
                <div className="absolute -top-4 -right-4 text-7xl opacity-15 pointer-events-none select-none">{q.emoji}</div>
                <div className="text-4xl mb-3">{q.emoji}</div>
                <div className="font-black text-xl mb-1">{q.title}</div>
                <div className="text-white/65 text-sm mb-5">{q.questions.length} questions · {q.timePerQ}s each</div>
                <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl font-bold text-sm">
                  Play Now <ChevronRight size={14} />
                </span>
              </button>
            );
          })}
        </div>

        <Link href="/exams" className="text-white/40 text-sm hover:text-white/80 transition-colors underline underline-offset-4">
          View scheduled exams →
        </Link>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════════════
  // COUNTDOWN
  // ══════════════════════════════════════════════════════════════════════════
  if (phase === "countdown") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4" style={{ background: bg.style }}>
        <style>{STYLES}</style>
        <div className="text-white/40 uppercase tracking-widest text-sm font-bold">{quiz?.title}</div>
        <div key={countNum} className="text-[22vw] font-black text-white leading-none"
          style={{ animation: "countPop .45s ease-out" }}>
          {countNum}
        </div>
        <div className="text-white/30 text-base">Get ready!</div>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════════════
  // LEADERBOARD (after each question)
  // ══════════════════════════════════════════════════════════════════════════
  if (phase === "leaderboard") {
    const sorted = [...players].sort((a, b) => b.points - a.points).slice(0, 5);
    const myRank = sorted.findIndex(p => p.isYou) + 1;
    const medalColors = ["#FFD700","#C0C0C0","#CD7F32","#a78bfa","#60a5fa"];
    const medalEmojis = ["🥇","🥈","🥉","4th","5th"];

    return (
      <div className="min-h-screen flex flex-col" style={{ background: bg.style }}>
        <style>{STYLES}</style>
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <div className="flex items-center gap-2 text-white/60 text-sm font-bold uppercase tracking-wider">
            <Trophy size={16} className="text-yellow-400" />Leaderboard
          </div>
          <div className="text-xs text-white/30">After Q{qIndex + 1} of {totalQ}</div>
          <div className="text-xs text-white/50 bg-white/10 px-3 py-1.5 rounded-xl font-bold">
            Your rank: #{myRank > 0 ? myRank : "—"}
          </div>
        </div>

        {/* Podium top 3 */}
        <div className="flex items-end justify-center gap-3 px-6 pt-4 pb-6">
          {/* 2nd */}
          {sorted[1] && (
            <div className="flex flex-col items-center gap-2" style={{ animation: "rankBounce .5s .15s ease-out both" }}>
              <div className="text-2xl">{sorted[1].avatar}</div>
              <div className="text-xs text-white/70 font-semibold max-w-[70px] text-center truncate">{sorted[1].name}</div>
              <div className="text-sm font-black" style={{ color: medalColors[1] }}>🥈</div>
              <div className="w-20 rounded-t-2xl flex items-end justify-center pb-3 font-black text-white text-sm"
                style={{ height: 80, background: "rgba(192,192,192,.25)", border: "1px solid rgba(192,192,192,.3)" }}>
                {sorted[1].points.toLocaleString()}
              </div>
            </div>
          )}
          {/* 1st */}
          {sorted[0] && (
            <div className="flex flex-col items-center gap-2" style={{ animation: "rankBounce .5s ease-out both" }}>
              <div className="text-3xl">{sorted[0].avatar}</div>
              <div className="text-xs text-white/80 font-bold max-w-[80px] text-center truncate">{sorted[0].name}</div>
              <div className="text-base font-black" style={{ color: medalColors[0] }}>🥇</div>
              <div className="w-24 rounded-t-2xl flex items-end justify-center pb-3 font-black text-white text-sm"
                style={{ height: 110, background: "rgba(255,215,0,.25)", border: "1px solid rgba(255,215,0,.3)" }}>
                {sorted[0].points.toLocaleString()}
              </div>
            </div>
          )}
          {/* 3rd */}
          {sorted[2] && (
            <div className="flex flex-col items-center gap-2" style={{ animation: "rankBounce .5s .3s ease-out both" }}>
              <div className="text-2xl">{sorted[2].avatar}</div>
              <div className="text-xs text-white/70 font-semibold max-w-[70px] text-center truncate">{sorted[2].name}</div>
              <div className="text-sm font-black" style={{ color: medalColors[2] }}>🥉</div>
              <div className="w-20 rounded-t-2xl flex items-end justify-center pb-3 font-black text-white text-sm"
                style={{ height: 60, background: "rgba(205,127,50,.25)", border: "1px solid rgba(205,127,50,.3)" }}>
                {sorted[2].points.toLocaleString()}
              </div>
            </div>
          )}
        </div>

        {/* Full list */}
        <div className="flex-1 px-4 pb-4 space-y-2 max-w-lg mx-auto w-full">
          {sorted.map((p, i) => (
            <div key={p.name} className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${p.isYou ? "ring-2" : ""}`}
              style={{
                background: p.isYou ? "rgba(255,255,255,.15)" : "rgba(255,255,255,.07)",
                border: `1px solid ${p.isYou ? "rgba(255,255,255,.3)" : "rgba(255,255,255,.08)"}`,
                boxShadow: p.isYou ? "0 0 0 2px rgba(255,255,255,.9)" : "none",
                animation: `slideRight .4s ${i * 0.07}s ease-out both`,
              }}>
              <div className="w-7 text-center font-black text-base" style={{ color: medalColors[i] ?? "#94a3b8" }}>
                {medalEmojis[i] ?? `${i+1}`}
              </div>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0"
                style={{ background: p.color + "22" }}>{p.avatar}</div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-sm text-white truncate">{p.name}{p.isYou && " (You)"}</div>
                {p.lastPts > 0 && (
                  <div className="text-xs font-semibold text-green-400">+{p.lastPts} pts this round</div>
                )}
              </div>
              <div className="text-right shrink-0">
                <div className="font-black text-white text-base">{p.points.toLocaleString()}</div>
                <div className="text-[10px] text-white/40">pts</div>
              </div>
            </div>
          ))}
        </div>

        {/* Next button */}
        <div className="px-4 pb-6 max-w-lg mx-auto w-full">
          <button onClick={handleLeaderboardNext}
            className="w-full py-4 rounded-2xl font-black text-white text-base hover:opacity-90 active:scale-95 transition-all shadow-xl"
            style={{ background: `linear-gradient(135deg, ${quiz?.color}, ${quiz?.color}bb)` }}>
            {qIndex + 1 < totalQ ? `Next Question (${qIndex + 2}/${totalQ}) →` : "See Final Results 🏆"}
          </button>
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════════════
  // RESULTS
  // ══════════════════════════════════════════════════════════════════════════
  if (phase === "results") {
    const correct = scores.filter(s => s > 0).length;
    const sorted = [...players].sort((a, b) => b.points - a.points);
    const myFinalRank = sorted.findIndex(p => p.isYou) + 1;

    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 relative overflow-hidden" style={{ background: bg.style }}>
        <style>{STYLES}</style>
        {pct >= 70 && [...Array(22)].map((_, i) => (
          <div key={i} className="fixed pointer-events-none rounded-sm"
            style={{ left: `${Math.random()*100}%`, top: "-20px", width: 10, height: 10,
              background: ["#f59e0b","#16a34a","#3b82f6","#e11d48","#7c3aed","#06b6d4"][i%6],
              borderRadius: Math.random() > .5 ? "50%" : "3px",
              animation: `confettiFall ${1.5+Math.random()*2}s ease-in ${Math.random()*2}s both` }} />
        ))}

        <div className="w-full max-w-md" style={{ animation: "fadeZoom .6s ease-out" }}>
          <div className="text-center mb-6">
            <div className="text-7xl mb-3">{pct>=90?"🏆":pct>=70?"🎉":pct>=50?"💪":"📚"}</div>
            <h1 className="text-4xl font-black text-white mb-1">Quiz Complete!</h1>
            <p className="text-white/50">{quiz?.title}</p>
          </div>

          {/* Score card */}
          <div className="rounded-3xl overflow-hidden mb-4" style={{ background:"rgba(255,255,255,.08)", border:"1px solid rgba(255,255,255,.12)" }}>
            <div className="px-8 py-8 text-center" style={{ background: `linear-gradient(135deg,${quiz?.color}55,${quiz?.color}22)` }}>
              <div className="text-6xl font-black text-white mb-1">{pct}%</div>
              <div className="text-white/50 text-sm">{correct}/{totalQ} correct · {totalPts.toLocaleString()} pts</div>
              <div className="h-2.5 bg-white/10 rounded-full overflow-hidden mt-4 mb-3">
                <div className="h-full rounded-full transition-all duration-1000" style={{ width:`${pct}%`, background: quiz?.color }} />
              </div>
              <div className="text-lg font-black text-white">{rankLabel}</div>
            </div>

            {/* Final rank */}
            <div className="px-6 py-4 flex items-center justify-between border-b border-white/10">
              <div className="text-sm text-white/50 font-semibold">Final Rank</div>
              <div className="flex items-center gap-2">
                <Medal size={16} className="text-yellow-400" />
                <span className="font-black text-white text-lg">#{myFinalRank} of {players.length}</span>
              </div>
            </div>

            {/* Q breakdown */}
            <div className="px-6 py-4">
              <div className="text-xs text-white/40 font-bold uppercase tracking-wider mb-3">Per-question</div>
              <div className="grid grid-cols-8 gap-1.5">
                {quiz?.questions.map((_, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-black"
                      style={{ background: scores[i]>0?"#22c55e":"rgba(239,68,68,.7)", animation:`fadeZoom .3s ${i*.04}s ease-out both` }}>
                      {scores[i]>0?"✓":"✗"}
                    </div>
                    <div className="text-[9px] text-white/30">{i+1}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <button onClick={() => restart(level!)}
              className="w-full py-4 rounded-2xl font-black text-white text-base hover:opacity-90 active:scale-95 transition-all shadow-lg"
              style={{ background: `linear-gradient(135deg,${quiz?.color},${quiz?.color}bb)` }}>
              <RotateCcw size={16} className="inline mr-2" />Play Again
            </button>
            <div className="grid grid-cols-2 gap-2.5">
              <button onClick={() => { setLevel(null); setPhase("select"); clearTimer(); }}
                className="py-3 rounded-2xl font-bold text-white/80 text-sm hover:bg-white/15 transition-colors"
                style={{ background:"rgba(255,255,255,.1)", border:"1px solid rgba(255,255,255,.15)" }}>
                Change Level
              </button>
              <Link href="/dashboard"
                className="py-3 rounded-2xl font-bold text-white/80 text-sm hover:bg-white/15 transition-colors flex items-center justify-center gap-2"
                style={{ background:"rgba(255,255,255,.1)", border:"1px solid rgba(255,255,255,.15)" }}>
                <Home size={14} />Dashboard
              </Link>
            </div>
            <Link href="/learn/advanced/analytics"
              className="text-center text-white/30 text-xs hover:text-white/60 transition-colors mt-1 py-1">
              View detailed analytics →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!question || !quiz) return null;

  // ══════════════════════════════════════════════════════════════════════════
  // QUESTION / REVEAL
  // ══════════════════════════════════════════════════════════════════════════
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden transition-all duration-700" style={{ background: bg.style }}>
      <style>{STYLES}</style>

      {/* Streak popup */}
      {showStreak && streak > 1 && (
        <div className="fixed top-1/2 left-1/2 z-50 pointer-events-none"
          style={{ transform:"translate(-50%,-50%)", animation:"streakPop .5s ease-out" }}>
          <div className="flex items-center gap-3 bg-orange-500 text-white px-8 py-4 rounded-3xl shadow-2xl"
            style={{ boxShadow:"0 0 40px rgba(249,115,22,.6)" }}>
            <Flame size={28} className="animate-pulse" />
            <div>
              <div className="text-2xl font-black">{streak}x Streak!</div>
              <div className="text-sm opacity-75">+{streak >= 4 ? 300 : 150} bonus</div>
            </div>
            <Flame size={28} className="animate-pulse" />
          </div>
        </div>
      )}

      {/* Background picker panel */}
      {showBgPicker && (
        <div className="absolute top-16 right-4 z-40 p-3 rounded-2xl shadow-2xl"
          style={{ background:"rgba(15,15,25,.95)", border:"1px solid rgba(255,255,255,.15)", animation:"fadeZoom .2s ease-out" }}>
          <div className="text-[10px] text-white/40 uppercase tracking-wider font-bold mb-2 px-1">Background</div>
          <div className="grid grid-cols-3 gap-2">
            {BACKGROUNDS.map((b, i) => (
              <button key={b.id} onClick={() => { setBgIndex(i); setShowBgPicker(false); }}
                className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl transition-all hover:scale-105"
                style={{ background: bgIndex===i ? "rgba(255,255,255,.2)" : "rgba(255,255,255,.07)", border:`1px solid ${bgIndex===i?"rgba(255,255,255,.4)":"rgba(255,255,255,.08)"}` }}>
                <span className="text-lg">{b.icon}</span>
                <span className="text-[10px] text-white/60 font-medium">{b.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── TOP BAR ── */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2 gap-3">
        {/* Q counter + score */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-xl">
            <span className="text-white/50 text-xs font-bold">Q</span>
            <span className="text-white font-black text-lg leading-none">{qIndex+1}</span>
            <span className="text-white/30 text-xs">/{totalQ}</span>
          </div>
          <div className="flex items-center gap-1 bg-yellow-500/20 px-3 py-1 rounded-xl">
            <Zap size={11} className="text-yellow-400" />
            <span className="text-yellow-300 font-black text-xs">{totalPts.toLocaleString()}</span>
          </div>
        </div>

        {/* Timer */}
        <div className="flex flex-col items-center gap-1.5 flex-1">
          <div className="relative w-14 h-14">
            <svg className="absolute inset-0" viewBox="0 0 64 64" style={{ transform:"rotate(-90deg)" }}>
              <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(255,255,255,.1)" strokeWidth="5" />
              <circle cx="32" cy="32" r="26" fill="none" stroke={timerColor} strokeWidth="5"
                strokeLinecap="round" strokeDasharray={circum}
                strokeDashoffset={circum * (1 - timerPct / 100)}
                style={{ transition:"stroke-dashoffset 0.9s linear,stroke .3s" }} />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-black text-xl" style={{ color: timeLeft <= 5 ? "#ef4444" : "#fff" }}>{timeLeft}</span>
            </div>
          </div>
          <div className="w-full max-w-[200px] h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full rounded-full" style={{ width:`${timerPct}%`, background:timerColor, transition:"width .9s linear,background .3s" }} />
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-end gap-1.5">
          {streak >= 2 && (
            <div className="flex items-center gap-1 bg-orange-500/25 px-2.5 py-1 rounded-lg">
              <Flame size={12} className="text-orange-400" />
              <span className="text-orange-300 font-black text-xs">{streak}x</span>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            {/* Background switcher icon */}
            <button onClick={() => setShowBgPicker(s => !s)}
              className="w-8 h-8 rounded-xl flex items-center justify-center transition-all hover:scale-110"
              style={{ background: showBgPicker ? "rgba(255,255,255,.25)" : "rgba(255,255,255,.1)" }}>
              <Image size={14} className="text-white/70" />
            </button>
            <button onClick={() => setMuted(m => !m)}
              className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-white/20 transition-colors"
              style={{ background:"rgba(255,255,255,.1)" }}>
              {muted ? <VolumeX size={14} className="text-white/40" /> : <Volume2 size={14} className="text-white/80" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── QUESTION CARD ── */}
      <div className="flex-1 flex flex-col justify-between px-4 pb-3 gap-3 min-h-0">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-2xl rounded-3xl px-6 py-8 sm:px-10 sm:py-12 text-center"
            style={{ background:"rgba(255,255,255,.07)", backdropFilter:"blur(16px)", border:"1px solid rgba(255,255,255,.12)",
              animation: animate ? "slideDown .4s ease-out" : "none" }}>
            {(question as Record<string,unknown>).domain && (
              <div className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider mb-4"
                style={{ background:quiz.color+"35", color:quiz.color }}>
                {(question as Record<string,unknown>).domain as string}
              </div>
            )}
            <p className="text-xl sm:text-2xl lg:text-3xl font-black text-white leading-snug">{question.question}</p>
          </div>
        </div>

        {/* ── OPTIONS ── */}
        <div className="w-full max-w-2xl mx-auto grid grid-cols-2 gap-2.5">
          {question.options.map((opt, i) => {
            const cfg = OPT_CONFIG[i];
            const isRevealed = phase === "reveal";
            const isCorrect = question.correct === i;
            const isSelected = selected === i;

            let background = cfg.solidBg;
            let extraCss: React.CSSProperties = {};
            let anim = "";

            if (isRevealed) {
              if (isCorrect) {
                background = "#16a34a";
                extraCss = { boxShadow:"0 0 28px rgba(34,197,94,.65)" };
                anim = "correctPulse .4s ease-out";
              } else if (isSelected) {
                background = "#b91c1c";
                anim = "shake .4s ease-out";
              } else {
                background = "rgba(255,255,255,.08)";
              }
            }

            return (
              <button key={i} onClick={() => handleAnswer(i)} disabled={isRevealed}
                className="relative flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl font-bold text-white text-left transition-all disabled:cursor-default"
                style={{ background, animation:anim, minHeight:64, ...extraCss,
                  ...(isRevealed ? {} : { cursor:"pointer" }) }}
                onMouseEnter={e => { if (!isRevealed) (e.currentTarget as HTMLElement).style.background = cfg.hoverBg; }}
                onMouseLeave={e => { if (!isRevealed) (e.currentTarget as HTMLElement).style.background = cfg.solidBg; }}>
                <div className="shrink-0 w-9 h-9 rounded-xl bg-black/25 flex items-center justify-center">
                  <span className="text-base leading-none">{cfg.shape}</span>
                </div>
                <span className="text-sm sm:text-base leading-snug flex-1">{opt}</span>
                {isRevealed && isCorrect && <CheckCircle size={20} className="shrink-0 text-white" />}
                {isRevealed && isSelected && !isCorrect && <XCircle size={20} className="shrink-0 text-white" />}
              </button>
            );
          })}
        </div>

        {/* ── REVEAL PANEL ── */}
        {phase === "reveal" && (
          <div className="w-full max-w-2xl mx-auto rounded-2xl overflow-hidden"
            style={{ animation:"fadeUp .3s ease-out", background:"rgba(255,255,255,.08)", border:"1px solid rgba(255,255,255,.14)", backdropFilter:"blur(12px)" }}>
            <div className="flex items-center gap-3 p-4">
              {selected === question.correct ? (
                <><div className="w-9 h-9 rounded-xl bg-green-500 flex items-center justify-center shrink-0"><CheckCircle size={18} className="text-white" /></div>
                  <div className="flex-1 min-w-0"><div className="font-black text-green-400 text-sm">Correct! +{scores[qIndex]} pts</div><div className="text-white/45 text-xs truncate">{question.explanation}</div></div></>
              ) : selected === null ? (
                <><div className="w-9 h-9 rounded-xl bg-orange-500 flex items-center justify-center shrink-0 text-base">⏱</div>
                  <div className="flex-1 min-w-0"><div className="font-black text-orange-400 text-sm">Time's up!</div><div className="text-white/45 text-xs truncate">{question.explanation}</div></div></>
              ) : (
                <><div className="w-9 h-9 rounded-xl bg-red-600 flex items-center justify-center shrink-0"><XCircle size={18} className="text-white" /></div>
                  <div className="flex-1 min-w-0"><div className="font-black text-red-400 text-sm">Wrong — correct was {String.fromCharCode(65+question.correct)}</div><div className="text-white/45 text-xs truncate">{question.explanation}</div></div></>
              )}
              <button onClick={handleNext}
                className="shrink-0 px-5 py-2.5 rounded-xl font-black text-white text-sm hover:opacity-90 active:scale-95 transition-all"
                style={{ background:`linear-gradient(135deg,${quiz.color},${quiz.color}bb)` }}>
                {qIndex+1 < totalQ ? "Leaderboard →" : "Results 🏆"}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── PROGRESS DOTS ── */}
      <div className="flex justify-center gap-2 pb-3.5">
        {quiz.questions.map((_, i) => (
          <div key={i} className="rounded-full transition-all duration-300"
            style={{ width:8, height:8,
              background: i<qIndex ? (scores[i]>0?"#22c55e":"#ef4444") : i===qIndex ? "#fff" : "rgba(255,255,255,.2)",
              transform: i===qIndex ? "scale(1.7)" : "scale(1)" }} />
        ))}
      </div>
    </div>
  );
}
