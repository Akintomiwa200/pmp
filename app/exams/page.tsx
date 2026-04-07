// app/exams/page.tsx
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Lock, Clock, Calendar, ChevronRight, Shield, Trophy, AlertCircle, CheckCircle } from "lucide-react";

const SCHEDULED_EXAMS = [
  {
    id: "exam_001",
    title: "Q2 2025 PM Fundamentals Exam",
    quizId: "quiz_001",
    level: "beginner",
    color: "#16a34a",
    description: "Official quarterly assessment covering the full PM lifecycle, Agile basics, and stakeholder fundamentals.",
    startDateTime: new Date(Date.now() + 1000 * 60 * 60 * 2).toISOString(), // 2 hours from now
    durationMinutes: 30,
    accessWindow: 15,
    questions: 5,
    maxAttempts: 1,
    requiresCode: false,
    showResults: true,
    eligibleLevel: "all",
  },
  {
    id: "exam_002",
    title: "PMP Mock Certification Exam",
    quizId: "quiz_004",
    level: "advanced",
    color: "#7c3aed",
    description: "Full PMP-style exam with scenario-based questions. Timed under exam conditions. One attempt only.",
    startDateTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days from now
    durationMinutes: 60,
    accessWindow: 10,
    questions: 5,
    maxAttempts: 1,
    requiresCode: true,
    accessCode: "PMP2025",
    showResults: false,
    eligibleLevel: "advanced",
  },
  {
    id: "exam_003",
    title: "Risk Management Assessment",
    quizId: "quiz_003",
    level: "intermediate",
    color: "#2563eb",
    description: "Intermediate-level risk management exam. RACI, risk registers, stakeholder strategies.",
    startDateTime: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // started 30 min ago — LIVE
    durationMinutes: 25,
    accessWindow: 15,
    questions: 5,
    maxAttempts: 2,
    requiresCode: false,
    showResults: true,
    eligibleLevel: "intermediate",
  },
];

function useCountdown(targetISO: string) {
  const [diff, setDiff] = useState(() => new Date(targetISO).getTime() - Date.now());
  useEffect(() => {
    const iv = setInterval(() => setDiff(new Date(targetISO).getTime() - Date.now()), 1000);
    return () => clearInterval(iv);
  }, [targetISO]);
  return diff;
}

function CountdownBlock({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="text-2xl font-black text-white w-12 h-12 rounded-xl flex items-center justify-center"
        style={{ background: "rgba(255,255,255,.1)" }}>
        {String(value).padStart(2,"0")}
      </div>
      <span className="text-[9px] uppercase tracking-wider text-white/40 font-bold">{label}</span>
    </div>
  );
}

function ExamCard({ exam }: { exam: typeof SCHEDULED_EXAMS[0] }) {
  const diff = useCountdown(exam.startDateTime);
  const endDiff = diff - exam.durationMinutes * 60 * 1000;
  const accessWindowMs = exam.accessWindow * 60 * 1000;

  const isLive = diff <= 0 && diff > -exam.durationMinutes * 60 * 1000;
  const isInAccessWindow = diff <= 0 && diff > -accessWindowMs;
  const isPast = diff <= -exam.durationMinutes * 60 * 1000;
  const isUpcoming = diff > 0;

  const totalSecs = Math.max(0, Math.floor(diff / 1000));
  const hrs = Math.floor(totalSecs / 3600);
  const mins = Math.floor((totalSecs % 3600) / 60);
  const secs = totalSecs % 60;

  const LEVEL_COLORS: Record<string, string> = { beginner:"#16a34a", intermediate:"#2563eb", advanced:"#7c3aed", all:"#64748b" };
  const lc = LEVEL_COLORS[exam.level] ?? "#64748b";

  return (
    <div className="rounded-3xl overflow-hidden border" style={{ background:"rgba(255,255,255,.05)", borderColor:"rgba(255,255,255,.1)" }}>
      {/* Top accent */}
      <div className="h-1.5 w-full" style={{ background:`linear-gradient(90deg,${exam.color},${exam.color}88)` }} />

      <div className="p-6">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full capitalize"
                style={{ background:lc+"25", color:lc }}>{exam.level}</span>
              {isLive && <span className="flex items-center gap-1.5 text-[10px] font-black text-white px-2.5 py-1 rounded-full animate-pulse"
                style={{ background:"rgba(239,68,68,.35)", border:"1px solid rgba(239,68,68,.4)" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />LIVE NOW
              </span>}
              {isPast && <span className="text-[10px] font-bold text-white/30 px-2 py-1 rounded-full" style={{ background:"rgba(255,255,255,.06)" }}>Ended</span>}
              {exam.requiresCode && <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full" style={{ background:"rgba(124,58,237,.2)", color:"#a78bfa" }}><Lock size={9} />Code required</span>}
            </div>
            <h3 className="text-lg font-black text-white leading-tight mb-1">{exam.title}</h3>
            <p className="text-sm text-white/50 leading-relaxed">{exam.description}</p>
          </div>
        </div>

        {/* Meta */}
        <div className="flex flex-wrap gap-4 text-xs text-white/40 mb-5">
          <span className="flex items-center gap-1.5"><Calendar size={11} />{new Date(exam.startDateTime).toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"})}</span>
          <span className="flex items-center gap-1.5"><Clock size={11} />{new Date(exam.startDateTime).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"})}</span>
          <span className="flex items-center gap-1.5"><Trophy size={11} />{exam.questions} questions · {exam.durationMinutes} min</span>
          <span className="flex items-center gap-1.5"><Shield size={11} />{exam.maxAttempts} attempt{exam.maxAttempts!==1?"s":""}</span>
        </div>

        {/* Status-specific UI */}
        {isUpcoming && (
          <div>
            <div className="text-xs text-white/40 uppercase tracking-wider font-bold mb-3">Starts in</div>
            <div className="flex items-center gap-2 mb-5">
              <CountdownBlock label="hrs" value={hrs} />
              <span className="text-white/30 text-xl font-black pb-4">:</span>
              <CountdownBlock label="min" value={mins} />
              <span className="text-white/30 text-xl font-black pb-4">:</span>
              <CountdownBlock label="sec" value={secs} />
            </div>
            <div className="flex items-center gap-2 p-3.5 rounded-2xl text-sm" style={{ background:"rgba(255,255,255,.05)", border:"1px solid rgba(255,255,255,.08)" }}>
              <Lock size={14} className="text-white/30 shrink-0" />
              <span className="text-white/40">Exam locked until start time. Bookmark this page to return.</span>
            </div>
          </div>
        )}

        {isLive && (
          <div>
            {isInAccessWindow ? (
              <div>
                <div className="flex items-center gap-2 p-3 rounded-xl mb-4" style={{ background:"rgba(239,68,68,.15)", border:"1px solid rgba(239,68,68,.25)" }}>
                  <AlertCircle size={14} className="text-red-400 shrink-0" />
                  <span className="text-red-300 text-sm">Access window closes in {Math.ceil((accessWindowMs + diff)/60000)}m — join now!</span>
                </div>
                <Link href={`/exams/${exam.id}`}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-white text-base hover:opacity-90 active:scale-95 transition-all shadow-xl"
                  style={{ background:`linear-gradient(135deg,${exam.color},${exam.color}bb)` }}>
                  Enter Exam Now <ChevronRight size={18} />
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-3 p-4 rounded-2xl" style={{ background:"rgba(255,165,0,.1)", border:"1px solid rgba(255,165,0,.2)" }}>
                <Clock size={16} className="text-orange-400 shrink-0" />
                <span className="text-orange-300 text-sm">The access window has closed. New participants cannot join.</span>
              </div>
            )}
          </div>
        )}

        {isPast && (
          <div className="flex items-center gap-3 p-4 rounded-2xl" style={{ background:"rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.08)" }}>
            <CheckCircle size={16} className="text-white/20 shrink-0" />
            <div>
              <span className="text-white/30 text-sm block">This exam has ended.</span>
              {exam.showResults && <Link href="/progress" className="text-xs text-white/50 hover:text-white transition-colors underline">View your results →</Link>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ExamsPage() {
  const live = SCHEDULED_EXAMS.filter(e => {
    const diff = new Date(e.startDateTime).getTime() - Date.now();
    return diff <= 0 && diff > -e.durationMinutes * 60 * 1000;
  });
  const upcoming = SCHEDULED_EXAMS.filter(e => new Date(e.startDateTime).getTime() > Date.now());
  const past = SCHEDULED_EXAMS.filter(e => {
    const diff = new Date(e.startDateTime).getTime() - Date.now();
    return diff <= -e.durationMinutes * 60 * 1000;
  });

  return (
    <div className="min-h-screen" style={{ background:"linear-gradient(160deg,#1a1a2e,#16213e,#0f3460)" }}>
      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-6"
            style={{ background:"rgba(124,58,237,.25)", border:"1px solid rgba(124,58,237,.3)", color:"#c4b5fd" }}>
            <Shield size={12} />Scheduled Exams
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-3">Exam Centre</h1>
          <p className="text-white/40 text-lg max-w-md mx-auto">
            Timed exams set by your instructors. Only accessible on the scheduled day and time.
          </p>
        </div>

        {/* Live */}
        {live.length > 0 && (
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <h2 className="text-sm font-black text-white uppercase tracking-wider">Live Now</h2>
            </div>
            <div className="space-y-4">
              {live.map(e => <ExamCard key={e.id} exam={e} />)}
            </div>
          </section>
        )}

        {/* Upcoming */}
        {upcoming.length > 0 && (
          <section className="mb-8">
            <h2 className="text-sm font-black text-white/60 uppercase tracking-wider mb-4">Upcoming</h2>
            <div className="space-y-4">
              {upcoming.map(e => <ExamCard key={e.id} exam={e} />)}
            </div>
          </section>
        )}

        {/* Past */}
        {past.length > 0 && (
          <section className="mb-8">
            <h2 className="text-sm font-black text-white/30 uppercase tracking-wider mb-4">Past Exams</h2>
            <div className="space-y-4 opacity-60">
              {past.map(e => <ExamCard key={e.id} exam={e} />)}
            </div>
          </section>
        )}

        <div className="text-center mt-8">
          <Link href="/quiz" className="text-white/30 text-sm hover:text-white/60 transition-colors">
            ← Practice quizzes (always open)
          </Link>
        </div>
      </div>
    </div>
  );
}
