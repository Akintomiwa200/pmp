// app/learn/advanced/flashcards/page.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, RotateCcw, Check, X, Zap, Plus } from "lucide-react";

const CARD_SETS = [
  { id: "fcs_pmp_001", name: "PMBOK 7 Core Concepts", count: 42, mastered: 18, level: "advanced" },
  { id: "fcs_agile_001", name: "Agile & Scrum Fundamentals", count: 28, mastered: 22, level: "beginner" },
  { id: "fcs_evm_001", name: "Earned Value Management", count: 15, mastered: 5, level: "advanced" },
  { id: "fcs_risk_001", name: "Risk Management", count: 20, mastered: 8, level: "intermediate" },
];

const DEMO_CARDS = [
  { id: "fc_001", front: "What is CPI?", back: "Cost Performance Index = EV / AC\n\nCPI > 1 → Under budget ✅\nCPI < 1 → Over budget ❌\nCPI = 1 → On budget ✓", category: "EVM", difficulty: 3 },
  { id: "fc_002", front: "What is SPI?", back: "Schedule Performance Index = EV / PV\n\nSPI > 1 → Ahead of schedule ✅\nSPI < 1 → Behind schedule ❌\nSPI = 1 → On schedule ✓", category: "EVM", difficulty: 3 },
  { id: "fc_003", front: "What are the 12 PM Principles in PMBOK 7?", back: "1. Stewardship\n2. Team\n3. Stakeholders\n4. Value\n5. Systems Thinking\n6. Leadership\n7. Tailoring\n8. Quality\n9. Complexity\n10. Risk\n11. Adaptability & Resiliency\n12. Change Management", category: "PMBOK 7", difficulty: 2 },
  { id: "fc_004", front: "What is the formula for EAC?", back: "Estimate at Completion:\n\nEAC = BAC / CPI\n\nor if the estimate is updated:\nEAC = AC + ETC\n\nThis predicts the final total project cost.", category: "EVM", difficulty: 3 },
  { id: "fc_005", front: "What is a Project Charter?", back: "A document that:\n• Formally authorizes the project\n• Grants the PM authority to use resources\n• Identifies the project sponsor\n• Contains high-level objectives & constraints\n\nCreated in the INITIATION phase.", category: "Foundations", difficulty: 1 },
];

type Mode = "browse" | "study" | "done";
type CardResult = "know" | "dontknow";

export default function FlashcardsPage() {
  const [selectedSet, setSelectedSet] = useState<string | null>(null);
  const [mode, setMode] = useState<Mode>("browse");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [results, setResults] = useState<Record<string, CardResult>>({});
  const [showCreate, setShowCreate] = useState(false);

  const cards = DEMO_CARDS;
  const currentCard = cards[currentIdx];
  const progress = ((currentIdx) / cards.length) * 100;

  const handleResult = (result: CardResult) => {
    setResults({ ...results, [currentCard.id]: result });
    if (currentIdx < cards.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setFlipped(false);
    } else {
      setMode("done");
    }
  };

  const reset = () => {
    setCurrentIdx(0);
    setFlipped(false);
    setResults({});
    setMode("browse");
    setSelectedSet(null);
  };

  const knownCount = Object.values(results).filter((r) => r === "know").length;
  const unknownCount = Object.values(results).filter((r) => r === "dontknow").length;

  if (mode === "done") {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="text-6xl mb-4">
          {knownCount >= cards.length * 0.8 ? "🎉" : knownCount >= cards.length * 0.5 ? "💪" : "📚"}
        </div>
        <h1 className="text-3xl font-display font-bold text-ink">Session Complete!</h1>
        <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
          <div className="card p-4 text-center bg-brand-50 border-brand-100">
            <p className="text-3xl font-bold text-brand-600">{knownCount}</p>
            <p className="text-sm text-ink-muted">Knew it ✅</p>
          </div>
          <div className="card p-4 text-center bg-red-50 border-red-100">
            <p className="text-3xl font-bold text-red-500">{unknownCount}</p>
            <p className="text-sm text-ink-muted">Still learning 📖</p>
          </div>
        </div>
        <p className="text-ink-muted text-sm">
          {knownCount >= cards.length * 0.8
            ? "Excellent work! You're mastering this material."
            : "Keep reviewing the cards you missed — repetition is key!"}
        </p>
        <div className="flex gap-3 justify-center">
          <button onClick={reset} className="btn-secondary">
            <RotateCcw size={15} /> Study Again
          </button>
          <Link href="/learn/advanced" className="btn-primary">Back to Advanced Path</Link>
        </div>
      </div>
    );
  }

  if (mode === "study") {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button onClick={reset} className="btn-ghost"><ChevronLeft size={16} /> Sets</button>
          <span className="text-sm text-ink-subtle">{currentIdx + 1} / {cards.length}</span>
          <span className="text-xs px-2 py-1 rounded-full bg-surface-2 text-ink-muted">{currentCard.category}</span>
        </div>

        {/* Progress */}
        <div className="h-2 bg-surface-2 rounded-full overflow-hidden">
          <div className="h-full bg-brand-500 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>

        {/* Flashcard */}
        <div
          onClick={() => setFlipped(!flipped)}
          className="cursor-pointer select-none"
          style={{ perspective: "1200px" }}
        >
          <div
            className="relative w-full transition-transform duration-500"
            style={{
              transformStyle: "preserve-3d",
              transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
              height: "280px",
            }}
          >
            {/* Front */}
            <div
              className="absolute inset-0 card p-8 flex flex-col items-center justify-center text-center"
              style={{ backfaceVisibility: "hidden" }}
            >
              <span className="text-xs font-bold uppercase tracking-widest text-ink-subtle mb-4">Question</span>
              <p className="text-2xl font-display font-bold text-ink">{currentCard.front}</p>
              <p className="text-sm text-ink-subtle mt-6">Click to reveal answer</p>
            </div>
            {/* Back */}
            <div
              className="absolute inset-0 card p-8 flex flex-col items-center justify-center text-center bg-brand-50 border-brand-200"
              style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
            >
              <span className="text-xs font-bold uppercase tracking-widest text-brand-600 mb-4">Answer</span>
              <pre className="text-sm text-ink leading-relaxed font-body whitespace-pre-wrap">{currentCard.back}</pre>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        {flipped ? (
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleResult("dontknow")}
              className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-red-50 border-2 border-red-200 text-red-700 font-semibold hover:bg-red-100 transition-colors"
            >
              <X size={20} /> Still Learning
            </button>
            <button
              onClick={() => handleResult("know")}
              className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-brand-50 border-2 border-brand-200 text-brand-700 font-semibold hover:bg-brand-100 transition-colors"
            >
              <Check size={20} /> Got It!
            </button>
          </div>
        ) : (
          <div className="flex justify-center gap-4">
            <button disabled={currentIdx === 0} onClick={() => { setCurrentIdx(currentIdx - 1); setFlipped(false); }} className="btn-secondary">
              <ChevronLeft size={16} />
            </button>
            <button onClick={() => setFlipped(true)} className="btn-primary px-8">Reveal Answer</button>
            <button onClick={() => { setCurrentIdx(Math.min(currentIdx + 1, cards.length - 1)); setFlipped(false); }} className="btn-secondary">
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        {/* Score running */}
        <div className="flex justify-center gap-6 text-sm">
          <span className="flex items-center gap-1.5 text-brand-600"><Check size={14} /> {knownCount} known</span>
          <span className="flex items-center gap-1.5 text-red-500"><X size={14} /> {unknownCount} still learning</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="section-tag mb-2"><Zap size={12} />Flashcards</p>
          <h1 className="text-4xl font-display font-bold text-ink mb-2">Flashcard Study</h1>
          <p className="text-ink-muted">Spaced repetition learning for key PM concepts.</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="btn-primary">
          <Plus size={15} /> Create Set
        </button>
      </div>

      {/* Card sets */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-5 mb-10">
        {CARD_SETS.map((set) => {
          const masteryPct = Math.round((set.mastered / set.count) * 100);
          return (
            <div key={set.id} className="card-hover p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-ink mb-1">{set.name}</h3>
                  <p className="text-xs text-ink-subtle">{set.count} cards</p>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                  set.level === "beginner" ? "badge-beginner" : set.level === "intermediate" ? "badge-intermediate" : "badge-advanced"
                }`}>{set.level}</span>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-ink-subtle">Mastered</span>
                  <span className="font-medium text-ink">{set.mastered}/{set.count} ({masteryPct}%)</span>
                </div>
                <div className="h-2 bg-surface-2 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-brand-500 to-brand-400 rounded-full" style={{ width: `${masteryPct}%` }} />
                </div>
              </div>
              <button
                onClick={() => { setSelectedSet(set.id); setMode("study"); }}
                className="btn-primary w-full justify-center text-sm"
              >
                Study Now <ChevronRight size={14} />
              </button>
            </div>
          );
        })}
      </div>

      {/* Create modal */}
      {showCreate && (
        <div className="fixed inset-0 bg-ink/50 z-50 flex items-center justify-center p-4">
          <div className="card p-6 w-full max-w-md space-y-4 animate-slide-up">
            <div className="flex items-center justify-between">
              <h2 className="font-display font-bold text-xl text-ink">Create Flashcard Set</h2>
              <button onClick={() => setShowCreate(false)} className="p-2 hover:bg-surface-1 rounded-lg"><X size={18} /></button>
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-1.5">Set Name</label>
              <input className="input" placeholder="e.g. My PMP Notes" />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-1.5">Level</label>
              <select className="input">
                <option>Beginner</option>
                <option>Intermediate</option>
                <option selected>Advanced</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <label className="block text-sm font-medium text-ink mb-1.5 col-span-2">First Card</label>
              <div>
                <label className="block text-xs text-ink-subtle mb-1">Front (Question)</label>
                <textarea className="input h-20 resize-none text-sm" placeholder="Question..." />
              </div>
              <div>
                <label className="block text-xs text-ink-subtle mb-1">Back (Answer)</label>
                <textarea className="input h-20 resize-none text-sm" placeholder="Answer..." />
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowCreate(false)} className="btn-secondary flex-1 justify-center">Cancel</button>
              <button className="btn-primary flex-1 justify-center">Create Set</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
