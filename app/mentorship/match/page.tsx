// app/mentorship/match/page.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import { Zap, ChevronRight, CheckCircle2, Users, Star, Globe, Calendar } from "lucide-react";

type Step = "intro" | "q1" | "q2" | "q3" | "q4" | "q5" | "processing" | "results";

const MENTORS = [
  {
    id: "mentor_001", name: "Marcus Johnson", avatar: "M",
    badge: "Top Mentor", rating: 4.9, reviewCount: 14,
    expertise: ["PMP Prep", "Agile Transformation", "Enterprise PM"],
    industry: ["Technology", "Finance"],
    yearsExp: 8, location: "Toronto, CA", availability: "2h/week",
    matchScore: 98, matchReasons: ["PMP certification goal", "Tech industry focus", "Beginner-friendly mentor"],
    bio: "8 years leading enterprise software projects. Helped 12+ students land PM roles and pass PMP.",
  },
  {
    id: "mentor_003", name: "Lisa Park", avatar: "L",
    badge: "Career Switcher Expert", rating: 4.8, reviewCount: 9,
    expertise: ["Career Coaching", "Scrum", "Product Management"],
    industry: ["Tech Startup", "E-commerce"],
    yearsExp: 4, location: "San Francisco, USA", availability: "1h/week",
    matchScore: 91, matchReasons: ["Career switch background", "Marketing-to-PM experience", "Startup focus"],
    bio: "Switched from UX design to PM. Specialised in helping career switchers navigate the tech PM job market.",
  },
  {
    id: "mentor_004", name: "James Okafor", avatar: "J",
    badge: null, rating: 4.7, reviewCount: 6,
    expertise: ["Agile", "Scrum Master", "Remote PM"],
    industry: ["Technology", "NGO"],
    yearsExp: 6, location: "Lagos, Nigeria", availability: "2h/week",
    matchScore: 84, matchReasons: ["Agile expertise", "Entry-level experience", "Remote PM focus"],
    bio: "Certified Scrum Master helping individuals thrive in remote-first PM environments.",
  },
];

const QUESTIONS = [
  {
    id: "q1", question: "What's your primary goal with mentorship?",
    options: ["Pass the PMP or CAPM exam", "Land my first PM role", "Grow into a senior/lead PM", "Transition from another field into PM"],
  },
  {
    id: "q2", question: "What's your current experience level?",
    options: ["Complete beginner — no formal PM experience", "0–2 years of PM or coordinator experience", "2–5 years as an active PM", "5+ years, targeting senior/leadership roles"],
  },
  {
    id: "q3", question: "Which industry are you targeting?",
    options: ["Technology / Software", "Finance / Banking", "Healthcare / Government", "Startup / E-commerce / Other"],
  },
  {
    id: "q4", question: "How much time can you commit weekly?",
    options: ["30 minutes (quick check-ins)", "1 hour per week", "2 hours per week", "3+ hours per week"],
  },
  {
    id: "q5", question: "What mentorship style works best for you?",
    options: ["Structured with clear goals and milestones", "Conversational — discuss challenges as they arise", "Accountability-focused (regular check-ins on progress)", "Mix of all styles"],
  },
];

export default function MentorMatchPage() {
  const [step, setStep] = useState<Step>("intro");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentQ, setCurrentQ] = useState(0);

  const handleAnswer = (answer: string) => {
    const q = QUESTIONS[currentQ];
    const newAnswers = { ...answers, [q.id]: answer };
    setAnswers(newAnswers);

    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setStep("processing");
      setTimeout(() => setStep("results"), 2500);
    }
  };

  if (step === "intro") {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-8">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-brand-500 to-teal-500 flex items-center justify-center mx-auto text-4xl shadow-lg">
          🤖
        </div>
        <div>
          <h1 className="text-4xl font-display font-bold text-ink mb-3">AI Mentor Matching</h1>
          <p className="text-ink-muted text-lg leading-relaxed">
            Answer 5 quick questions and our algorithm will match you with the ideal PM mentor based on your goals, background, and learning style.
          </p>
        </div>
        <div className="card p-5 text-left space-y-3">
          {[
            { icon: Zap, text: "2 minutes to complete" },
            { icon: CheckCircle2, text: "Personalised to your goals" },
            { icon: Users, text: "Matched from verified PM mentors" },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-3">
              <item.icon size={15} className="text-brand-600 shrink-0" />
              <span className="text-sm text-ink">{item.text}</span>
            </div>
          ))}
        </div>
        <button onClick={() => setStep("q1")} className="btn-primary w-full justify-center text-base py-3.5">
          Find My Mentor <ChevronRight size={18} />
        </button>
        <Link href="/mentorship" className="block text-sm text-ink-muted hover:text-ink transition-colors">
          Browse all mentors instead →
        </Link>
      </div>
    );
  }

  if (step === "processing") {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-8">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-brand-500 to-teal-500 flex items-center justify-center mx-auto text-4xl animate-pulse">
          🤖
        </div>
        <div>
          <h2 className="text-2xl font-display font-bold text-ink mb-3">Analysing your profile...</h2>
          <p className="text-ink-muted">Matching against {MENTORS.length * 20}+ data points across our mentor network.</p>
        </div>
        <div className="space-y-3 text-left max-w-sm mx-auto">
          {["Analysing your goals...", "Filtering by experience match...", "Checking availability...", "Calculating compatibility scores..."].map((msg, i) => (
            <div key={msg} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-surface-3 animate-pulse" style={{ animationDelay: `${i * 0.3}s` }}>
              <div className="w-4 h-4 rounded-full bg-brand-400 shrink-0" />
              <span className="text-sm text-ink">{msg}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (step === "results") {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🎯</div>
          <h1 className="text-4xl font-display font-bold text-ink mb-2">Your Matches Are Ready!</h1>
          <p className="text-ink-muted">Based on your profile, here are your top 3 mentor matches.</p>
        </div>

        <div className="space-y-5">
          {MENTORS.map((mentor, idx) => (
            <div key={mentor.id} className={`card-hover p-6 ${idx === 0 ? "border-2 border-brand-400 bg-brand-50/30" : ""}`}>
              {idx === 0 && (
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-brand-600 text-white">🥇 Best Match</span>
                </div>
              )}
              <div className="flex flex-col sm:flex-row gap-5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-400 to-brand-700 flex items-center justify-center text-white text-xl font-bold shrink-0">
                  {mentor.avatar}
                </div>
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-ink">{mentor.name}</h3>
                        {mentor.badge && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700">{mentor.badge}</span>}
                      </div>
                      <div className="flex items-center gap-1 mt-0.5">
                        {[1,2,3,4,5].map(i => <Star key={i} size={11} className="fill-amber-400 text-amber-400" />)}
                        <span className="text-xs text-ink-subtle ml-1">{mentor.rating} ({mentor.reviewCount} reviews)</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-2xl font-display font-bold" style={{ color: mentor.matchScore >= 95 ? "#16a34a" : mentor.matchScore >= 85 ? "#2563eb" : "#f59e0b" }}>
                        {mentor.matchScore}%
                      </p>
                      <p className="text-[10px] text-ink-subtle">match score</p>
                    </div>
                  </div>

                  <p className="text-sm text-ink-muted">{mentor.bio}</p>

                  <div className="flex flex-wrap gap-2">
                    {mentor.matchReasons.map(r => (
                      <span key={r} className="flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-brand-50 border border-brand-200 text-brand-700">
                        <CheckCircle2 size={9} /> {r}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-4 text-xs text-ink-subtle">
                    <span className="flex items-center gap-1"><Globe size={10} />{mentor.location}</span>
                    <span className="flex items-center gap-1"><Calendar size={10} />{mentor.availability}</span>
                    <span>{mentor.yearsExp} years exp</span>
                  </div>

                  <div className="flex gap-2 pt-1">
                    <Link href={`/mentorship/${mentor.id}`} className="btn-primary text-sm py-2 px-4">
                      Request Session
                    </Link>
                    <Link href={`/mentorship/${mentor.id}`} className="btn-secondary text-sm py-2 px-4">
                      View Profile
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button onClick={() => { setStep("intro"); setAnswers({}); setCurrentQ(0); }} className="btn-ghost text-sm">
            Retake matching quiz
          </button>
        </div>
      </div>
    );
  }

  // Quiz steps
  const q = QUESTIONS[currentQ];
  const progress = ((currentQ) / QUESTIONS.length) * 100;

  return (
    <div className="max-w-xl mx-auto px-4 py-16 space-y-8">
      <div>
        <div className="flex justify-between text-sm text-ink-muted mb-2">
          <span>Question {currentQ + 1} of {QUESTIONS.length}</span>
          <span className="font-medium text-brand-600">{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-surface-2 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-brand-500 to-teal-500 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="card p-7 space-y-6">
        <h2 className="text-2xl font-display font-bold text-ink">{q.question}</h2>
        <div className="space-y-3">
          {q.options.map((opt) => (
            <button key={opt} onClick={() => handleAnswer(opt)}
              className="w-full flex items-center gap-3 p-4 rounded-2xl border-2 border-surface-3 hover:border-brand-400 hover:bg-brand-50/50 transition-all text-left text-sm font-medium text-ink group">
              <div className="w-6 h-6 rounded-lg border-2 border-surface-3 group-hover:border-brand-500 group-hover:bg-brand-500 transition-all shrink-0 flex items-center justify-center">
                <ChevronRight size={12} className="text-ink-muted group-hover:text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
