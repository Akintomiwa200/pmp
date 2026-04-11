// app/about/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { Target, Users, BookOpen, Award, Globe, Heart, ArrowRight, CheckCircle2, Zap, Star } from "lucide-react";
import MarketingShell from "@/components/layout/MarketingShell";

export const metadata: Metadata = {
  title: "About PMPath",
  description: "Learn about PMPath — the platform helping aspiring Project Managers transition into rewarding PM careers.",
};

export default function AboutPage() {
  return (
    <MarketingShell>
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-24">

      {/* Hero */}
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-200 bg-cyan-50 text-sm font-medium text-cyan-800 dark:border-cyan-800/50 dark:bg-cyan-950/40 dark:text-cyan-200">
          <Heart size={14} className="text-cyan-600 dark:text-cyan-400" />
          Built for aspiring PMs, by former career switchers
        </div>
        <h1 className="text-6xl font-display font-bold text-ink dark:text-slate-100 leading-tight">
          We Believe Everyone<br />
          <span className="italic bg-gradient-to-r from-cyan-600 to-cyan-500 bg-clip-text text-transparent">
            Deserves a PM Career.
          </span>
        </h1>
        <p className="text-xl text-ink-muted font-light max-w-2xl mx-auto leading-relaxed">
          PMPath was born from frustration. When our founders tried to transition into project management,
          the resources were scattered, expensive, or hopelessly generic. So we built what we wished had existed.
        </p>
      </section>

      {/* Mission */}
      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400 mb-3">Our Mission</p>
            <h2 className="text-4xl font-display font-bold text-ink mb-4">
              Democratise Access to PM Knowledge
            </h2>
            <p className="text-ink-muted leading-relaxed">
              Project management is one of the most in-demand, well-paying careers in the world —
              yet there's no clear, affordable path to enter it. We're changing that with structured
              learning paths, real-world tools, and a community of people who've been where you are.
            </p>
          </div>
          <ul className="space-y-3">
            {[
              "Free core content — always, for everyone",
              "Structured paths that actually get results",
              "Real practitioners as mentors, not just instructors",
              "Community built on mutual support",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <CheckCircle2 size={15} className="text-cyan-600 dark:text-cyan-400 shrink-0" />
                <span className="text-sm text-ink">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { value: "12,400+", label: "Active Learners", icon: Users, color: "text-cyan-700 bg-cyan-50 dark:text-cyan-300 dark:bg-cyan-950/50" },
            { value: "87%", label: "Career Transition Rate", icon: Target, color: "text-teal-600 bg-teal-50" },
            { value: "5", label: "Structured Courses", icon: BookOpen, color: "text-blue-600 bg-blue-50" },
            { value: "200+", label: "PM Events Tracked", icon: Globe, color: "text-purple-600 bg-purple-50" },
          ].map((stat) => (
            <div key={stat.label} className="card p-5 text-center">
              <div className={`w-9 h-9 rounded-xl ${stat.color} flex items-center justify-center mx-auto mb-3`}>
                <stat.icon size={18} />
              </div>
              <p className="text-2xl font-display font-bold text-ink">{stat.value}</p>
              <p className="text-xs text-ink-subtle">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="card p-10 bg-gradient-to-br from-cyan-50 to-sky-50 border-cyan-100 dark:from-cyan-950/40 dark:to-slate-900 dark:border-cyan-900/40">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400 mb-3">Our Story</p>
          <h2 className="text-3xl font-display font-bold text-ink mb-5">From Frustrated Learners to Platform Builders</h2>
          <div className="space-y-4 text-ink-muted leading-relaxed">
            <p>
              In 2024, two marketing professionals — both trying to break into PM — spent months
              piecing together resources from YouTube, Reddit, Udemy, and scattered blog posts.
              They paid for expensive courses, some of which barely mentioned real PM workflows.
            </p>
            <p>
              What they needed was a single, structured place: one that started from zero, escalated
              intelligently, included PMP prep, and connected them with people who'd already made the jump.
            </p>
            <p className="font-semibold text-ink">
              PMPath is that place. And it's free to start — because financial barriers shouldn't
              determine who gets to build a great PM career.
            </p>
          </div>
        </div>
      </section>

      {/* What we offer */}
      <section>
        <div className="text-center mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400 mb-3">Platform Features</p>
          <h2 className="text-4xl font-display font-bold text-ink">Everything You Need in One Place</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { icon: BookOpen, title: "3 Learning Paths", desc: "Beginner → Intermediate → Advanced/PMP. Each level builds on the last with courses, videos, and downloadable resources.", color: "text-cyan-700 bg-cyan-50 dark:text-cyan-300 dark:bg-cyan-950/50" },
            { icon: Zap, title: "Adaptive Quizzes", desc: "Every module ends with a quiz. Our engine tracks weak areas and surfaces personalised recommendations.", color: "text-amber-600 bg-amber-50" },
            { icon: Target, title: "Visual Roadmap", desc: "See exactly where you are in your PM journey and what milestone comes next.", color: "text-teal-600 bg-teal-50" },
            { icon: Users, title: "AI Mentorship Matching", desc: "Get matched with experienced PM mentors based on your goals, industry, and learning style.", color: "text-purple-600 bg-purple-50" },
            { icon: Globe, title: "Events Calendar", desc: "200+ PM events tracked yearly — webinars, conferences, meetups, study groups.", color: "text-blue-600 bg-blue-50" },
            { icon: Award, title: "Certificates", desc: "Earn verifiable certificates for completed courses. Shareable directly to LinkedIn.", color: "text-rose-600 bg-rose-50" },
          ].map((f) => (
            <div key={f.title} className="card p-5 space-y-3">
              <div className={`w-10 h-10 rounded-xl ${f.color} flex items-center justify-center`}>
                <f.icon size={20} />
              </div>
              <h3 className="font-semibold text-ink">{f.title}</h3>
              <p className="text-sm text-ink-muted leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team values */}
      <section>
        <div className="text-center mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400 mb-3">Our Values</p>
          <h2 className="text-4xl font-display font-bold text-ink">What We Stand For</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          {[
            { emoji: "🌱", title: "Accessibility First", desc: "Core learning is free forever. We believe financial circumstances shouldn't determine career potential." },
            { emoji: "🎯", title: "Practical Over Theoretical", desc: "Every concept is taught through real-world examples, case studies, and hands-on simulations — not just theory." },
            { emoji: "🤝", title: "Community Over Competition", desc: "PM is a collaborative profession. Our community reflects that — helping each other succeed is the point." },
            { emoji: "📈", title: "Continuous Improvement", desc: "We collect NPS scores, user surveys, and course completion data constantly. What isn't working gets fixed." },
          ].map((v) => (
            <div key={v.title} className="card p-6 flex gap-4">
              <span className="text-3xl shrink-0">{v.emoji}</span>
              <div>
                <h3 className="font-semibold text-ink mb-1">{v.title}</h3>
                <p className="text-sm text-ink-muted leading-relaxed">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center space-y-6">
        <h2 className="text-4xl font-display font-bold text-ink">
          Ready to Start Your PM Journey?
        </h2>
        <p className="text-ink-muted text-lg font-light max-w-lg mx-auto">
          Join 12,400+ learners building their PM careers with PMPath. Free to start, structured to succeed.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/auth/signup"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-cyan-600 text-white font-semibold shadow-lg hover:bg-cyan-700 hover:shadow-xl hover:-translate-y-0.5 transition-all"
          >
            Get Started Free <ArrowRight size={18} />
          </Link>
          <Link href="/onboarding" className="btn-secondary px-8 py-4 rounded-2xl">
            Take the Assessment
          </Link>
        </div>
      </section>
    </div>
    </MarketingShell>
  );
}
