"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, ArrowRight, CheckCircle2, Check } from "lucide-react";
import { signIn } from "next-auth/react";
import type { UserRole } from "@/types";

const LEVELS = [
  { value: "beginner", label: "Beginner", emoji: "🌱", desc: "New to PM" },
  { value: "intermediate", label: "Intermediate", emoji: "📈", desc: "Some experience" },
  { value: "advanced", label: "Advanced", emoji: "🏆", desc: "Preparing for PMP" },
];

const GOAL_OPTIONS = [
  "Get PMP certified",
  "Land my first PM role",
  "Switch from another field",
  "Improve current PM skills",
  "Build a team / lead projects",
  "Prepare for CAPM",
];

const getAccessCodeLabel = (role: UserRole) => {
  if (role === "admin") return "Admin access code";
  if (role === "superadmin") return "Superadmin access code";
  return "";
};

const getAccessCodeHelper = (role: UserRole) => {
  if (role === "admin") return "Enter the invite code shared with your admin team.";
  if (role === "superadmin") return "Enter the superadmin code provided by your platform owner.";
  return "";
};

const getAccessCodePlaceholder = (role: UserRole) => {
  if (role === "admin") return "e.g. ADM-XXXX";
  if (role === "superadmin") return "e.g. SADMIN-XXXX";
  return "";
};

const getHeading = (role: UserRole, custom?: string) => {
  if (custom) return custom;
  if (role === "admin") return "Create an admin account";
  if (role === "superadmin") return "Create a superadmin account";
  return "Create your account";
};

const getSubtitle = (role: UserRole, custom?: string) => {
  if (custom) return custom;
  if (role === "admin") return "Invite only · Manage courses, events, and community";
  if (role === "superadmin") return "Invite only · Full system access";
  return "Free forever · No credit card needed";
};

const getRedirectPath = (role: UserRole, custom?: string | null) => {
  if (custom) return custom;
  if (role === "superadmin") return "/superadmin/dashboard";
  if (role === "admin") return "/admin/dashboard";
  return "/dashboard";
};

type SignupFormProps = {
  role?: UserRole;
  title?: string;
  subtitle?: string;
  successRedirect?: string | null;
};

export default function SignupForm({
  role = "user",
  title,
  subtitle,
  successRedirect,
}: SignupFormProps) {
  const [step, setStep] = useState(1);
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", level: "", goals: [] as string[] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [accessCode, setAccessCode] = useState("");

  const normalizedRole = role ?? "user";
  const requireAccessCode = normalizedRole === "admin" || normalizedRole === "superadmin";

  const toggleGoal = (goal: string) => {
    setForm((prev) => {
      const exists = prev.goals.includes(goal);

      return {
        ...prev,
        goals: exists ? prev.goals.filter((g) => g !== goal) : [...prev.goals, goal],
      };
    });
  };

  const handleSubmit = async () => {
    setError("");
    const normalizedEmail = form.email.trim().toLowerCase();
    const trimmedAccessCode = accessCode.trim();

    if (requireAccessCode && !trimmedAccessCode) {
      setError("Access code is required for this role.");
      return;
    }
    if (form.goals.length === 0) {
      setError("Select at least one goal before creating your account.");
      return;
    }

    setLoading(true);

    const payload = {
      ...form,
      email: normalizedEmail,
      role: normalizedRole,
      ...(requireAccessCode ? { accessCode: trimmedAccessCode } : {}),
    };

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data?.success) {
        setError(data?.error ?? "Failed to create account.");
        return;
      }

      const authRes = await signIn("credentials", {
        email: normalizedEmail,
        password: form.password,
        redirect: false,
      });

      if (!authRes?.ok) {
        setError("Account created but signing you in failed. Please log in manually.");
        return;
      }

      window.location.href = getRedirectPath(normalizedRole, successRedirect ?? null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 py-12 bg-surface-1">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center mx-auto mb-3 shadow-sm">
            <span className="text-white font-bold text-sm">PM</span>
          </div>
          <h1 className="text-2xl font-display font-bold text-ink">{getHeading(normalizedRole, title)}</h1>
          <p className="text-sm text-ink-muted mt-1">{getSubtitle(normalizedRole, subtitle)}</p>
        </div>

        <div className="flex items-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className={`flex-1 h-1.5 rounded-full transition-all duration-300 ${s <= step ? "bg-brand-500" : "bg-surface-3"}`} />
          ))}
        </div>

        <div className="card p-6 sm:p-8 space-y-5">
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          )}

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
                {requireAccessCode && (
                  <div>
                    <label className="block text-sm font-medium text-ink mb-1.5">
                      {getAccessCodeLabel(normalizedRole)}
                    </label>
                    <input
                      className="input"
                      value={accessCode}
                      onChange={(e) => setAccessCode(e.target.value)}
                      placeholder={getAccessCodePlaceholder(normalizedRole)}
                    />
                    <p className="text-xs text-ink-subtle mt-1">{getAccessCodeHelper(normalizedRole)}</p>
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => setStep(2)}
                disabled={
                  !form.name ||
                  !form.email ||
                  form.password.length < 8 ||
                  (requireAccessCode && !accessCode.trim())
                }
                className="btn-primary w-full justify-center"
              >
                Continue <ArrowRight size={16} />
              </button>
            </>
          )}

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
                        : "border-gray-200 hover:border-brand-300"
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
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="btn-secondary flex-1 justify-center"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  disabled={!form.level}
                  className="btn-primary flex-1 justify-center"
                >
                  Continue <ArrowRight size={16} />
                </button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div>
                <h2 className="font-display font-semibold text-lg text-ink mb-1">Your Goals</h2>
                <p className="text-sm text-ink-subtle">Select all that apply</p>
              </div>
              <div className="space-y-2">
                {GOAL_OPTIONS.map((goal) => {
                  const selected = form.goals.includes(goal);

                  return (
                    <button
                      key={goal}
                      type="button"
                      onClick={() => toggleGoal(goal)}
                      className={`w-full flex items-center gap-3 rounded-xl border p-3 text-left text-sm transition-all duration-200 ${
                        selected
                          ? "border-brand-500 bg-brand-50 text-brand-800"
                          : "border-surface-3 bg-white text-ink-muted hover:border-brand-300"
                      }`}
                    >
                      <div
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-all ${
                          selected
                            ? "border-brand-500 bg-brand-500"
                            : "border-surface-3 bg-white"
                        }`}
                      >
                        {selected && <Check size={12} className="text-white" strokeWidth={3} />}
                      </div>

                      <span className="flex-1">{goal}</span>
                    </button>
                  );
                })}
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="btn-secondary flex-1 justify-center"
                >
                  Back
                </button>
                <button
                  type="button"
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
          <Link href="/auth/login" className="text-brand-600 font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
