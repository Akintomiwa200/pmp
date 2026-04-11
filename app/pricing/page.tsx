// app/pricing/page.tsx
import Link from "next/link";
import { CheckCircle2, X, Zap, Star, ArrowRight, Shield } from "lucide-react";
import type { Metadata } from "next";
import MarketingShell from "@/components/layout/MarketingShell";

export const metadata: Metadata = { title: "Pricing" };

const FREE_FEATURES = [
  "All Beginner courses (12 modules)",
  "Agile & Scrum Fundamentals course",
  "Community forum access",
  "Events calendar & RSVP",
  "Basic progress tracking",
  "PM glossary & resources",
  "Job board browsing",
  "1 flashcard set (20 cards)",
];

const PREMIUM_FEATURES = [
  "Everything in Free",
  "All Intermediate & Advanced courses",
  "PMP Certification Bootcamp (60 modules)",
  "200+ PMP practice questions",
  "3 full timed mock exams",
  "Weak areas analytics dashboard",
  "Unlimited flashcard sets",
  "AI-powered mentorship matching",
  "Priority study group access",
  "Downloadable certificates (PDF)",
  "Ad-free experience",
  "Advanced progress analytics",
];

const FREE_NOT_INCLUDED = [
  "Advanced & Intermediate courses",
  "PMP mock exams",
  "Performance analytics",
  "Mentor matching",
];

export default function PricingPage() {
  return (
    <MarketingShell>
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      {/* Header */}
      <div className="text-center mb-14">
        <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400 mb-4">
          <Zap size={12} /> Pricing
        </p>
        <h1 className="text-5xl font-display font-bold text-ink mb-4">
          Simple, Honest Pricing
        </h1>
        <p className="text-xl text-ink-muted font-light max-w-xl mx-auto">
          Start free and upgrade when you're ready. No hidden fees. Cancel anytime.
        </p>
      </div>

      {/* Plans */}
      <div className="grid md:grid-cols-2 gap-6 mb-16">
        {/* Free */}
        <div className="card p-8 space-y-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-ink-subtle mb-2">Free</p>
            <div className="flex items-end gap-1 mb-1">
              <span className="text-5xl font-display font-bold text-ink">$0</span>
              <span className="text-ink-muted mb-2">/ forever</span>
            </div>
            <p className="text-sm text-ink-muted">Core learning content, community access, and events — always free.</p>
          </div>

          <Link href="/auth/signup" className="btn-secondary w-full justify-center py-3">
            Get Started Free
          </Link>

          <div className="space-y-2.5">
            <p className="text-xs font-semibold text-ink-subtle uppercase tracking-wide">What's included</p>
            {FREE_FEATURES.map((f) => (
              <div key={f} className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                <span className="text-sm text-ink">{f}</span>
              </div>
            ))}
            <div className="pt-2 border-t border-surface-2">
              <p className="text-xs font-semibold text-ink-subtle uppercase tracking-wide mb-2.5">Not included</p>
              {FREE_NOT_INCLUDED.map((f) => (
                <div key={f} className="flex items-start gap-2 mb-2">
                  <X size={14} className="text-slate-300 shrink-0 mt-0.5" />
                  <span className="text-sm text-ink-subtle">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Premium */}
        <div className="card p-8 space-y-6 border-2 border-cyan-400 dark:border-cyan-600 relative overflow-hidden">
          <div className="absolute top-4 right-4">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-600 text-white text-xs font-bold shadow-sm">
              <Star size={11} className="fill-white" /> Most Popular
            </span>
          </div>
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-400/10 rounded-full" />

          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400 mb-2">Premium</p>
            <div className="flex items-end gap-1 mb-3">
              <span className="text-5xl font-display font-bold text-ink">$9</span>
              <span className="text-ink-muted mb-2">/ month</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-ink-muted">
              <span>or</span>
              <span className="font-semibold text-ink">$89/year</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-50 text-cyan-800 border border-cyan-200 dark:bg-cyan-950/50 dark:text-cyan-200 dark:border-cyan-800">Save 17%</span>
            </div>
            <p className="text-sm text-ink-muted mt-2">Full platform access with everything you need for PMP success.</p>
          </div>

          <Link
            href="/auth/signup?plan=premium"
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-cyan-600 text-white font-semibold shadow-lg hover:bg-cyan-700 hover:shadow-xl hover:-translate-y-0.5 transition-all"
          >
            Start 7-Day Free Trial <ArrowRight size={16} />
          </Link>
          <p className="text-center text-xs text-ink-subtle">No credit card required for trial · Cancel anytime</p>

          <div className="space-y-2.5">
            <p className="text-xs font-semibold text-ink-subtle uppercase tracking-wide">Everything included</p>
            {PREMIUM_FEATURES.map((f) => (
              <div key={f} className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                <span className="text-sm text-ink">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enterprise */}
      <div className="card p-8 mb-16 flex flex-col sm:flex-row items-center gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Shield size={18} className="text-ink" />
            <h2 className="font-display font-bold text-xl text-ink">Team & Enterprise</h2>
          </div>
          <p className="text-ink-muted mb-1">Upskilling a team? We offer volume discounts, SSO, admin dashboards, and custom content for corporate PM training.</p>
          <p className="text-sm text-ink-muted">Minimum 5 seats · Custom pricing · Dedicated support</p>
        </div>
        <Link href="mailto:enterprise@pmpath.app" className="btn-secondary whitespace-nowrap">
          Contact Sales
        </Link>
      </div>

      {/* FAQ */}
      <div className="max-w-2xl mx-auto">
        <h2 className="font-display font-bold text-2xl text-ink text-center mb-8">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            { q: "Can I switch from Free to Premium anytime?", a: "Yes. You can upgrade at any time and get immediate access to all Premium features. We'll prorate any unused period." },
            { q: "What happens to my progress if I cancel Premium?", a: "Your progress, certificates, and completed courses are always yours — we never delete them. You'll lose access to Premium-only courses but keep everything from Free." },
            { q: "Is the 7-day trial really free?", a: "Yes — no credit card required. You'll get full Premium access for 7 days. We'll remind you before the trial ends." },
            { q: "Does Premium include the PMP application fee?", a: "No. PMPath Premium covers all study materials and prep. The PMI exam fee ($405 for PMI members, $555 non-members) is paid directly to PMI." },
            { q: "Are group/team discounts available?", a: "Yes! Teams of 5+ get 20% off. Teams of 20+ get custom pricing. Contact us at enterprise@pmpath.app." },
          ].map((faq) => (
            <div key={faq.q} className="card p-5">
              <h3 className="font-semibold text-ink mb-2 text-sm">{faq.q}</h3>
              <p className="text-sm text-ink-muted leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    </MarketingShell>
  );
}
