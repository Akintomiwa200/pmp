// app/learn/beginner/simulation/page.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, CheckCircle2, Star, Trophy, RotateCcw, Target, Briefcase } from "lucide-react";

const PHASES = ["Initiation", "Planning", "Execution", "Monitoring", "Closing"];

const STEPS = [
  {
    phase: "Initiation", phaseIdx: 0,
    title: "Define the Project",
    scenario: "Your manager asks you to launch a company blog within 6 weeks. You have a designer, developer, and content writer. Budget: $5,000.",
    context: "You've just been assigned your first PM project! The company wants a new blog to improve their content marketing.",
    task: "Create a project charter defining the project objectives, key deliverables, and stakeholders.",
    tip: "💡 A project charter formally authorises the project. Without it, you risk scope disagreements and unclear ownership.",
    choices: [
      { id: "A", text: "Write a thorough charter: objectives, scope, stakeholders, budget, timeline, and success criteria.", points: 30, quality: "excellent", feedback: "Excellent! A thorough charter gives your team clarity and gets formal sign-off from leadership. This is exactly what PMs do." },
      { id: "B", text: "Send a quick email summarising the project to the team and get started immediately.", points: 5, quality: "poor", feedback: "Moving fast but skipping formal initiation. You'll face scope disagreements and unclear ownership. Always start with a charter." },
      { id: "C", text: "Call a kickoff meeting with all stakeholders before writing anything.", points: 20, quality: "good", feedback: "Smart approach! Gathering input first improves charter quality. You're one meeting away from best practice." },
    ],
  },
  {
    phase: "Planning", phaseIdx: 1,
    title: "Plan the Work",
    scenario: "Your charter is approved. Now you need to plan 6 weeks of work across design, development, and content.",
    context: "Great start! Your stakeholders are aligned. Now you need to figure out exactly how to get this done.",
    task: "Break down the project into tasks and create a schedule.",
    tip: "💡 Planning is the most impactful phase — projects with thorough plans are 2x more likely to succeed.",
    choices: [
      { id: "A", text: "Build a full WBS, assign owners, set dependencies, and create a schedule with milestones.", points: 30, quality: "excellent", feedback: "Thorough planning! Your team knows exactly what to do and when. This investment pays off massively during execution." },
      { id: "B", text: "Create a Kanban board with To Do / In Progress / Done columns.", points: 22, quality: "good", feedback: "Lightweight but effective for a small team. A Kanban board works well for Agile-friendly projects like this." },
      { id: "C", text: "Let team members plan their own work and report back weekly.", points: 8, quality: "poor", feedback: "Risky. Without shared planning, tasks may overlap, dependencies get missed, and no one has the full picture." },
    ],
  },
  {
    phase: "Execution", phaseIdx: 2,
    title: "Manage a Change Request",
    scenario: "Week 3. The CEO sees the mockup and wants to add a podcast section. This would take 2 extra weeks and $1,500.",
    context: "Things were going smoothly… until the CEO decided to get involved with new ideas mid-project.",
    task: "How do you handle this change request?",
    tip: "💡 Scope creep is the #1 cause of project failure. All changes — even from the CEO — need to go through formal change control.",
    choices: [
      { id: "A", text: "Evaluate the impact, document a change request, get sponsor approval before proceeding.", points: 30, quality: "excellent", feedback: "Perfect! Formal change control protects your baseline and ensures everyone understands the cost of the change." },
      { id: "B", text: "Just add it — the CEO asked for it, so you have to do it.", points: 5, quality: "poor", feedback: "Scope creep! Adding work without approval puts your timeline and budget at risk. The CEO may not realise the impact." },
      { id: "C", text: "Add it to Phase 2 backlog and explain why it can't fit in the current scope.", points: 25, quality: "good", feedback: "Smart scope management! Deferring to Phase 2 keeps this project on track while respecting the CEO's idea." },
    ],
  },
  {
    phase: "Monitoring", phaseIdx: 3,
    title: "Track Performance",
    scenario: "Week 4. Development is 50% done but has used 70% of the dev budget. CPI = 0.71. Content is on track.",
    context: "Your dashboard is showing warning signs. The developer is spending more time than estimated.",
    task: "Your CPI for development is 0.71. What do you do?",
    tip: "💡 CPI < 1 means over budget. A CPI of 0.71 means you're getting $0.71 of work for every $1 spent. Act now!",
    choices: [
      { id: "A", text: "Analyse root cause, raise a flag to the sponsor with clear options (reduce scope, add budget, accept risk).", points: 30, quality: "excellent", feedback: "Excellent! Proactive communication and presenting data-driven options is exactly what great PMs do." },
      { id: "B", text: "Wait and see if the developer speeds up in the next 2 weeks.", points: 5, quality: "poor", feedback: "Risky. CPI of 0.71 won't fix itself. Waiting makes it worse and creates a nasty surprise for stakeholders later." },
      { id: "C", text: "Bring in a second developer at extra cost to get back on track.", points: 18, quality: "okay", feedback: "An option, but you've taken unilateral action on budget. Always get sponsor approval first when spending money." },
    ],
  },
  {
    phase: "Closing", phaseIdx: 4,
    title: "Close the Project",
    scenario: "Week 6. The blog is live! 500 visitors on day 1. Now you need to formally close the project.",
    context: "Congratulations — the blog launched successfully! But the PM job isn't done until the project is formally closed.",
    task: "What closing activities should you complete?",
    tip: "💡 Formal project closure captures lessons learned, obtains acceptance, and frees up team resources properly.",
    choices: [
      { id: "A", text: "Get formal stakeholder acceptance, document lessons learned, archive files, release team, celebrate!", points: 30, quality: "excellent", feedback: "Perfect closure! You've done it all — formal acceptance, knowledge transfer, team recognition. Full marks!" },
      { id: "B", text: "Send a 'project complete' email and move straight to the next project.", points: 5, quality: "poor", feedback: "Informal closure misses lessons learned, formal acceptance, and leaves loose ends. Always document your close." },
      { id: "C", text: "Write the final project report and archive it, but skip the celebration — too busy.", points: 20, quality: "good", feedback: "Good documentation instincts! But don't forget the team celebration — morale and retention depend on it." },
    ],
  },
];

const QUALITY_CONFIG = {
  excellent: { color: "border-brand-500 bg-brand-50 text-brand-800", badge: "bg-brand-500 text-white" },
  good: { color: "border-blue-400 bg-blue-50 text-blue-800", badge: "bg-blue-500 text-white" },
  okay: { color: "border-amber-400 bg-amber-50 text-amber-800", badge: "bg-amber-500 text-white" },
  poor: { color: "border-red-400 bg-red-50 text-red-800", badge: "bg-red-500 text-white" },
};

export default function SimulationPage() {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<Record<number, string>>({});
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  const [totalScore, setTotalScore] = useState(0);
  const [done, setDone] = useState(false);

  const current = STEPS[step];
  const choice = selected[step];
  const choiceData = current?.choices.find(c => c.id === choice);
  const isRevealed = revealed[step];
  const maxScore = STEPS.reduce((a, s) => a + 30, 0); // 150 max

  const handleChoice = (id: string) => {
    if (isRevealed) return;
    setSelected({ ...selected, [step]: id });
  };

  const handleReveal = () => {
    if (!choice) return;
    const pts = choiceData?.points ?? 0;
    setTotalScore(prev => prev + pts);
    setRevealed({ ...revealed, [step]: true });
  };

  const handleNext = () => {
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      setDone(true);
    }
  };

  const restart = () => {
    setStep(0); setSelected({}); setRevealed({}); setTotalScore(0); setDone(false);
  };

  const pct = Math.round((totalScore / maxScore) * 100);
  const grade = pct >= 90 ? "A" : pct >= 75 ? "B" : pct >= 60 ? "C" : "D";
  const gradeLabel = pct >= 90 ? "Outstanding PM! 🏆" : pct >= 75 ? "Good PM ✅" : pct >= 60 ? "Developing PM 📈" : "Keep Practising 📚";

  if (done) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-8">
        <div className="text-7xl animate-bounce">{pct >= 90 ? "🏆" : pct >= 75 ? "🎉" : pct >= 60 ? "💪" : "📚"}</div>
        <div>
          <h1 className="text-4xl font-display font-bold text-ink mb-2">Simulation Complete!</h1>
          <p className="text-ink-muted text-lg">You managed your first project end-to-end</p>
        </div>
        <div className="card p-8 space-y-4">
          <div className="flex items-center justify-center gap-6">
            <div className="text-center">
              <p className="text-6xl font-display font-bold" style={{ color: pct >= 75 ? "#16a34a" : pct >= 60 ? "#f59e0b" : "#ef4444" }}>
                {grade}
              </p>
              <p className="text-sm text-ink-subtle">Grade</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-ink">{totalScore}/{maxScore}</p>
              <p className="text-sm text-ink-subtle">Points ({pct}%)</p>
            </div>
          </div>
          <p className="text-lg font-semibold text-ink">{gradeLabel}</p>
          <div className="h-3 bg-surface-2 rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: pct >= 75 ? "#16a34a" : pct >= 60 ? "#f59e0b" : "#ef4444" }} />
          </div>
          <div className="grid grid-cols-5 gap-2 pt-2">
            {STEPS.map((s, i) => {
              const c = selected[i];
              const pts = s.choices.find(ch => ch.id === c)?.points ?? 0;
              return (
                <div key={i} className="text-center">
                  <div className={`w-8 h-8 rounded-full mx-auto mb-1 flex items-center justify-center text-xs font-bold ${pts >= 25 ? "bg-brand-500 text-white" : pts >= 18 ? "bg-blue-500 text-white" : "bg-red-400 text-white"}`}>
                    {pts}
                  </div>
                  <p className="text-[9px] text-ink-subtle leading-tight">{s.phase}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-wrap gap-3 justify-center">
          <button onClick={restart} className="btn-secondary"><RotateCcw size={15} /> Try Again</button>
          <Link href="/learn/beginner" className="btn-primary">Continue Learning <ChevronRight size={16} /></Link>
          {pct >= 75 && <Link href="/certificates" className="btn-primary" style={{ background: "#7c3aed" }}><Trophy size={15} /> View Certificate</Link>}
        </div>
        {pct < 75 && (
          <p className="text-sm text-ink-muted">
            Score 75%+ to unlock your certificate. Review the{" "}
            <Link href="/learn/beginner" className="text-brand-600 font-medium hover:underline">beginner courses</Link>{" "}
            and try again.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link href="/learn/beginner" className="inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink transition-colors">
          <ChevronLeft size={15} /> Back
        </Link>
        <div className="flex-1 h-2 bg-surface-2 rounded-full overflow-hidden">
          <div className="h-full bg-brand-500 rounded-full transition-all duration-500" style={{ width: `${((step) / STEPS.length) * 100}%` }} />
        </div>
        <span className="text-sm font-medium text-ink">{step + 1}/{STEPS.length}</span>
      </div>

      {/* Phase indicator */}
      <div className="flex items-center gap-1 mb-6 overflow-x-auto pb-1 scrollbar-hide">
        {PHASES.map((ph, i) => (
          <div key={ph} className="flex items-center gap-1 shrink-0">
            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-all ${
              i < step ? "bg-brand-500 text-white" : i === step ? "bg-brand-100 text-brand-800 border border-brand-300" : "bg-surface-1 text-ink-subtle"
            }`}>
              {i < step && <CheckCircle2 size={10} />}
              {ph}
            </div>
            {i < PHASES.length - 1 && <div className={`w-5 h-px ${i < step ? "bg-brand-400" : "bg-surface-3"}`} />}
          </div>
        ))}
      </div>

      {/* Step card */}
      <div className="card p-7 space-y-6">
        {/* Context */}
        <div className="flex items-start gap-3 p-4 bg-surface-1 rounded-xl border border-surface-2">
          <Briefcase size={16} className="text-brand-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold text-brand-600 uppercase tracking-wide mb-1">Phase {step + 1}: {current.phase}</p>
            <p className="text-sm text-ink">{current.context}</p>
          </div>
        </div>

        {/* Scenario */}
        <div>
          <h2 className="text-2xl font-display font-bold text-ink mb-2">{current.title}</h2>
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl mb-3">
            <p className="text-sm font-semibold text-amber-900 mb-1">📋 Scenario</p>
            <p className="text-sm text-amber-800">{current.scenario}</p>
          </div>
          <p className="text-sm font-semibold text-ink">{current.task}</p>
        </div>

        {/* Choices */}
        <div className="space-y-3">
          {current.choices.map((c) => {
            const isSelected = choice === c.id;
            const qc = QUALITY_CONFIG[c.quality as keyof typeof QUALITY_CONFIG] || QUALITY_CONFIG.okay;
            return (
              <button key={c.id} onClick={() => handleChoice(c.id)} disabled={isRevealed}
                className={`w-full flex items-start gap-3 p-4 rounded-2xl border-2 text-left transition-all ${
                  isRevealed && isSelected ? qc.color
                  : isRevealed && !isSelected ? "opacity-40 border-surface-3 bg-white"
                  : isSelected ? "border-brand-500 bg-brand-50"
                  : "border-surface-3 hover:border-brand-300 bg-white"
                }`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 transition-all ${
                  isRevealed && isSelected ? qc.badge : isSelected ? "bg-brand-500 text-white" : "bg-surface-1 border border-surface-3 text-ink-muted"
                }`}>
                  {c.id}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-ink">{c.text}</p>
                  {isRevealed && isSelected && (
                    <p className="text-xs mt-2 text-ink-muted leading-relaxed">{c.feedback}</p>
                  )}
                </div>
                {isRevealed && isSelected && (
                  <span className={`text-sm font-bold shrink-0 px-2 py-1 rounded-lg ${qc.badge}`}>+{c.points}</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tip */}
        <p className="text-xs text-ink-muted italic">{current.tip}</p>

        {/* Score running total */}
        <div className="flex items-center justify-between p-3 bg-surface-1 rounded-xl">
          <span className="text-sm text-ink-muted">Score so far</span>
          <span className="text-sm font-bold text-ink">{totalScore}/{step * 30} pts</span>
        </div>

        {/* Action button */}
        {!isRevealed ? (
          <button onClick={handleReveal} disabled={!choice} className="btn-primary w-full justify-center disabled:opacity-50">
            <Star size={15} /> Reveal Feedback
          </button>
        ) : (
          <button onClick={handleNext} className="btn-primary w-full justify-center">
            {step < STEPS.length - 1 ? <>Next Phase <ChevronRight size={16} /></> : <>View Results <Trophy size={16} /></>}
          </button>
        )}
      </div>
    </div>
  );
}
