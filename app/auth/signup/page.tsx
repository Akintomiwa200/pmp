// app/auth/signup/page.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, ArrowRight, CheckCircle2 } from "lucide-react";

const LEVELS = [
  { value: "beginner", label: "Beginner", emoji: "🌱", desc: "New to PM" },
  { value: "intermediate", label: "Intermediate", emoji: "📈", desc: "Some experience" },
  { value: "advanced", label: "Advanced", emoji: "🏆", desc: "Preparing for PMP" },
];

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", level: "", goals: [] as string[] });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const goalOptions = [
    "Get PMP certified",
    "Land my first PM role",
    "Switch from another field",
    "Improve current PM skills",
    "Build a team / lead projects",
    "Prepare for CAPM",
  ];

  const toggleGoal = (goal: string) => {
    setForm((f) => ({
      ...f,
      goals: f.goals.includes(goal) ? f.goals.filter((g) => g !== goal) : [...f.goals, goal],
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setDone(true);
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="text-center space-y-4 max-w-md">
          <div className="w-20 h-20 rounded-full bg-brand-50 border-4 border-brand-200 flex items-center justify-center mx-auto text-4xl">
            🎉
          </div>
          <h1 className="text-3xl font-display font-bold text-ink">Welcome to PMPath!</h1>
          <p className="text-ink-muted">Your account is created. Start your PM journey today.</p>
          <Link href="/dashboard" className="btn-primary mx-auto">
            Go to Dashboard <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 py-12 bg-surface-1">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center mx-auto mb-3 shadow-sm">
            <span className="text-white font-bold text-sm">PM</span>
          </div>
          <h1 className="text-2xl font-display font-bold text-ink">Create your account</h1>
          <p className="text-sm text-ink-muted mt-1">Free forever · No credit card needed</p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className={`flex-1 h-1.5 rounded-full transition-all duration-300 ${s <= step ? "bg-brand-500" : "bg-surface-3"}`} />
          ))}
        </div>

        <div className="card p-6 sm:p-8 space-y-5">
          {/* Step 1: Basic info */}
          {step === 1 && (
            <>
              <div>
                <h2 className="font-display font-semibold text-lg text-ink mb-1">Basic Info</h2>
                <p className="text-sm text-ink-subtle">Tell us who you are</p>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-ink mb-1.5">Full Name</label>
                  <input
                    className="input"
                    placeholder="Alex Rivera"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink mb-1.5">Email</label>
                  <input
                    className="input"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink mb-1.5">Password</label>
                  <div className="relative">
                    <input
                      className="input pr-10"
                      type={showPass ? "text" : "password"}
                      placeholder="At least 8 characters"
                      value={form.password}
                      onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-subtle hover:text-ink"
                    >
                      {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setStep(2)}
                disabled={!form.name || !form.email || form.password.length < 8}
                className="btn-primary w-full justify-center"
              >
                Continue <ArrowRight size={16} />
              </button>
            </>
          )}

          {/* Step 2: Level */}
          {step === 2 && (
            <>
              <div>
                <h2 className="font-display font-semibold text-lg text-ink mb-1">Your Level</h2>
                <p className="text-sm text-ink-subtle">Where are you in your PM journey?</p>
              </div>
              <div className="space-y-3">
                {LEVELS.map((level) => (
                  <button
                    key={level.value}
                    onClick={() => setForm((f) => ({ ...f, level: level.value }))}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
                      form.level === level.value
                        ? "border-brand-500 bg-brand-50"
                        : "border-surface-3 hover:border-brand-300"
                    }`}
                  >
                    <span className="text-2xl">{level.emoji}</span>
                    <div>
                      <p className="font-semibold text-ink text-sm">{level.label}</p>
                      <p className="text-xs text-ink-muted">{level.desc}</p>
                    </div>
                    {form.level === level.value && (
                      <CheckCircle2 size={18} className="text-brand-600 ml-auto" />
                    )}
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="btn-secondary flex-1 justify-center">Back</button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!form.level}
                  className="btn-primary flex-1 justify-center"
                >
                  Continue <ArrowRight size={16} />
                </button>
              </div>
            </>
          )}

          {/* Step 3: Goals */}
          {step === 3 && (
            <>
              <div>
                <h2 className="font-display font-semibold text-lg text-ink mb-1">Your Goals</h2>
                <p className="text-sm text-ink-subtle">Select all that apply</p>
              </div>
              <div className="space-y-2">
                {goalOptions.map((goal) => (
                  <button
                    key={goal}
                    onClick={() => toggleGoal(goal)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left text-sm ${
                      form.goals.includes(goal)
                        ? "border-brand-500 bg-brand-50 text-brand-800"
                        : "border-surface-3 text-ink-muted hover:border-brand-300"
                    }`}
                  >
                    <div className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 ${
                      form.goals.includes(goal) ? "bg-brand-500 border-brand-500" : "border-surface-3"
                    }`}>
                      {form.goals.includes(goal) && <CheckCircle2 size={10} className="text-white" />}
                    </div>
                    {goal}
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(2)} className="btn-secondary flex-1 justify-center">Back</button>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="btn-primary flex-1 justify-center"
                >
                  {loading ? "Creating..." : "Create Account"}
                </button>
              </div>
            </>
          )}
        </div>

        <p className="text-center text-sm text-ink-muted mt-5">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-brand-600 font-medium hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
