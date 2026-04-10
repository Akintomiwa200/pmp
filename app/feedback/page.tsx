// app/feedback/page.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import { Star, CheckCircle2, MessageSquare, Send } from "lucide-react";

type Step = "nps" | "details" | "thanks";

const ASPECTS = [
  "Course content quality",
  "Ease of navigation",
  "Quiz & assessment usefulness",
  "Community & mentorship",
  "Event calendar",
  "Job board quality",
  "Mobile experience",
  "Overall value",
];

const NPS_LABELS: Record<number, string> = {
  0: "Not at all", 1: "Very unlikely", 2: "Unlikely", 3: "Somewhat unlikely",
  4: "Neutral", 5: "Maybe", 6: "Slightly likely", 7: "Likely",
  8: "Very likely", 9: "Extremely likely", 10: "Absolutely!",
};

export default function FeedbackPage() {
  const [step, setStep] = useState<Step>("nps");
  const [npsScore, setNpsScore] = useState<number | null>(null);
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [comment, setComment] = useState("");
  const [category, setCategory] = useState("general");
  const [submitting, setSubmitting] = useState(false);

  const handleNpsNext = () => {
    if (npsScore === null) return;
    setStep("details");
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1000));
    setSubmitting(false);
    setStep("thanks");
  };

  const npsCategory = npsScore !== null
    ? npsScore >= 9 ? "Promoter 🎉" : npsScore >= 7 ? "Passive 😊" : "Detractor 😔"
    : "";

  if (step === "thanks") {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-6">
        <div className="text-7xl">🙏</div>
        <h1 className="text-4xl font-display font-bold text-ink">Thank You!</h1>
        <p className="text-ink-muted text-lg leading-relaxed">
          Your feedback helps us build a better platform for every aspiring PM. We read every response.
        </p>
        {npsScore !== null && npsScore >= 9 && (
          <div className="card p-5 bg-brand-50 border-brand-100">
            <p className="text-sm font-semibold text-brand-800 mb-2">Since you love PMPath...</p>
            <p className="text-sm text-ink-muted mb-4">Would you share it with a colleague or friend who's interested in PM?</p>
            <div className="flex gap-3 justify-center">
              <button className="btn-primary text-sm">Share with a Friend</button>
              <button className="btn-secondary text-sm">Write a Review</button>
            </div>
          </div>
        )}
        <Link href="/dashboard" className="btn-secondary inline-flex">Back to Dashboard</Link>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <MessageSquare size={28} className="text-brand-600 mx-auto mb-3" />
        <h1 className="text-3xl font-display font-bold text-ink mb-2">Share Your Feedback</h1>
        <p className="text-ink-muted">Help us improve PMPath. Takes 2 minutes.</p>
      </div>

      {/* Progress */}
      <div className="flex gap-2 mb-8">
        {["nps", "details"].map((s, i) => (
          <div key={s} className={`flex-1 h-1.5 rounded-full transition-all ${step === "nps" && i === 0 ? "bg-brand-600" : step === "details" ? "bg-brand-500" : "bg-surface-2"}`} />
        ))}
      </div>

      {/* Step 1: NPS */}
      {step === "nps" && (
        <div className="card p-7 space-y-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-ink-subtle mb-3">NPS Survey</p>
            <h2 className="text-xl font-display font-bold text-ink mb-2">
              How likely are you to recommend PMPath to a friend or colleague?
            </h2>
            <p className="text-sm text-ink-muted">0 = Not at all · 10 = Absolutely!</p>
          </div>

          {/* NPS scale */}
          <div className="space-y-3">
            <div className="flex gap-1.5 flex-wrap justify-between">
              {Array.from({ length: 11 }, (_, i) => i).map(n => {
                const active = npsScore === n;
                const color = n >= 9 ? "#16a34a" : n >= 7 ? "#2563eb" : "#ef4444";
                return (
                  <button
                    key={n}
                    onClick={() => setNpsScore(n)}
                    className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${active ? "text-white shadow-md scale-110" : "border border-surface-3 hover:scale-105"}`}
                    style={active ? { background: color } : { color: "#94a3b8" }}
                  >
                    {n}
                  </button>
                );
              })}
            </div>
            <div className="flex justify-between text-[10px] text-ink-subtle">
              <span>Not likely</span>
              <span>Extremely likely</span>
            </div>
          </div>

          {npsScore !== null && (
            <div className={`p-3 rounded-xl text-sm font-medium text-center ${npsScore >= 9 ? "bg-brand-50 text-brand-800" : npsScore >= 7 ? "bg-blue-50 text-blue-800" : "bg-red-50 text-red-800"}`}>
              {NPS_LABELS[npsScore]} — {npsCategory}
            </div>
          )}

          <button onClick={handleNpsNext} disabled={npsScore === null} className="btn-primary w-full justify-center disabled:opacity-50">
            Continue <CheckCircle2 size={15} />
          </button>
        </div>
      )}

      {/* Step 2: Details */}
      {step === "details" && (
        <div className="card p-7 space-y-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-ink-subtle mb-2">Your score: {npsScore}/10</p>
            <h2 className="text-xl font-display font-bold text-ink">Tell us more</h2>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-ink mb-2">What's your feedback about?</label>
            <div className="flex flex-wrap gap-2">
              {["general", "courses", "community", "events", "jobs", "technical"].map(c => (
                <button key={c} onClick={() => setCategory(c)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border capitalize transition-all ${category === c ? "bg-ink text-white border-ink" : "border-surface-3 text-ink-muted hover:border-ink/30"}`}>
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Aspect ratings */}
          <div>
            <label className="block text-sm font-medium text-ink mb-3">Rate specific aspects (optional)</label>
            <div className="space-y-3">
              {ASPECTS.slice(0, 4).map(aspect => (
                <div key={aspect} className="flex items-center justify-between">
                  <span className="text-sm text-ink-muted">{aspect}</span>
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(s => (
                      <button key={s} onClick={() => setRatings(prev => ({ ...prev, [aspect]: s }))}>
                        <Star size={18} className={ratings[aspect] >= s ? "fill-amber-400 text-amber-400" : "text-surface-3"} />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Open comment */}
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">Additional comments</label>
            <textarea
              value={comment}
              onChange={e => setComment(e.target.value)}
              className="input h-28 resize-none"
              placeholder={npsScore !== null && npsScore >= 9
                ? "What do you love most about PMPath?"
                : npsScore !== null && npsScore < 7
                ? "What would make PMPath much better for you?"
                : "Any thoughts or suggestions for us?"}
            />
          </div>

          <button onClick={handleSubmit} disabled={submitting} className="btn-primary w-full justify-center">
            <Send size={15} /> {submitting ? "Submitting..." : "Submit Feedback"}
          </button>
        </div>
      )}
    </div>
  );
}
