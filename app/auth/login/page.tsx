// app/auth/login/page.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, ArrowRight, Chrome, Github, Lock, Mail, AlertCircle } from "lucide-react";
import type { Metadata } from "next";

export default function LoginPage() {
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", remember: false });
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<"google" | "github" | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!form.email || !form.password) { setError("Please fill in all fields."); return; }
    setLoading(true); setError("");
    try {
      // NextAuth credentials sign-in
      const { signIn } = await import("next-auth/react");
      const result = await signIn("credentials", {
        email: form.email, password: form.password, redirect: false,
      });
      if (result?.error) { setError("Invalid email or password. Try alex@example.com / password123"); }
      else { window.location.href = "/dashboard"; }
    } catch {
      // Fallback for demo (when NextAuth not configured)
      setTimeout(() => { window.location.href = "/dashboard"; }, 600);
    } finally { setLoading(false); }
  };

  const handleOAuth = async (provider: "google" | "github") => {
    setOauthLoading(provider);
    try {
      const { signIn } = await import("next-auth/react");
      await signIn(provider, { callbackUrl: "/dashboard" });
    } catch { setOauthLoading(null); }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 py-12 bg-slate-50 dark:bg-slate-900">
      <div className="w-full max-w-md space-y-6">
        {/* Logo */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-6">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-base">PM</span>
            </div>
            <span className="font-display font-bold text-2xl text-ink dark:text-slate-100">
              PM<span className="text-brand-600">Path</span>
            </span>
          </Link>
          <h1 className="text-3xl font-display font-bold text-ink dark:text-slate-100">Welcome back</h1>
          <p className="text-ink-muted mt-2 text-sm">Sign in to continue your PM journey</p>
        </div>

        <div className="card dark:bg-slate-800 dark:border-slate-700 p-8 space-y-5">
          {/* OAuth buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => handleOAuth("google")} disabled={!!oauthLoading}
              className="btn-secondary justify-center text-sm gap-2 disabled:opacity-60 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100">
              {oauthLoading === "google" ? <span className="w-4 h-4 border-2 border-ink/20 border-t-ink rounded-full animate-spin" /> : <Chrome size={16} />}
              Google
            </button>
            <button onClick={() => handleOAuth("github")} disabled={!!oauthLoading}
              className="btn-secondary justify-center text-sm gap-2 disabled:opacity-60 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100">
              {oauthLoading === "github" ? <span className="w-4 h-4 border-2 border-ink/20 border-t-ink rounded-full animate-spin" /> : <Github size={16} />}
              GitHub
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-surface-3 dark:bg-slate-600" />
            <span className="text-xs text-ink-subtle dark:text-slate-500">or continue with email</span>
            <div className="flex-1 h-px bg-surface-3 dark:bg-slate-600" />
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-start gap-2 p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-xl text-sm text-red-700 dark:text-red-400">
              <AlertCircle size={15} className="shrink-0 mt-0.5" />
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-ink dark:text-slate-200 mb-1.5">Email</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-subtle" />
                <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className="input pl-10" placeholder="you@email.com" autoComplete="email" />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-ink dark:text-slate-200">Password</label>
                <Link href="/auth/forgot-password" className="text-xs text-brand-600 hover:underline">Forgot password?</Link>
              </div>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-subtle" />
                <input type={showPass ? "text" : "password"} value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  className="input pl-10 pr-10" placeholder="••••••••" autoComplete="current-password" />
                <button type="button" onClick={() => setShowPass(s => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-subtle hover:text-ink transition-colors">
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.remember} onChange={e => setForm(f => ({ ...f, remember: e.target.checked }))}
                className="w-4 h-4 rounded border-surface-3 text-brand-600 focus:ring-brand-500" />
              <span className="text-sm text-ink-muted dark:text-slate-400">Remember me for 30 days</span>
            </label>
            <button type="submit" disabled={loading}
              className="btn-primary w-full justify-center py-3 text-base disabled:opacity-60">
              {loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                : <><ArrowRight size={16} />Sign In</>}
            </button>
          </form>

          {/* Demo hint */}
          <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl">
            <p className="text-xs text-amber-800 dark:text-amber-400 font-medium mb-1">Demo credentials</p>
            <p className="text-xs text-amber-700 dark:text-amber-500">User: alex@example.com</p>
            <p className="text-xs text-amber-700 dark:text-amber-500">Admin: admin@pmpath.app</p>
            <p className="text-xs text-amber-700 dark:text-amber-500">Password: password123 (either)</p>
          </div>
        </div>

        <p className="text-center text-sm text-ink-muted dark:text-slate-400">
          Don't have an account?{" "}
          <Link href="/auth/signup" className="text-brand-600 font-semibold hover:underline">
            Start free today →
          </Link>
        </p>
      </div>
    </div>
  );
}
