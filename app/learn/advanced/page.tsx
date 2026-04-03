// app/learn/advanced/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen, Clock, Users, Star, CheckCircle2, Trophy, Target,
  Zap, BarChart3, FileText, Play, Lock, ArrowRight, Award
} from "lucide-react";
import { getCourses } from "@/lib/db";

export const metadata: Metadata = { title: "Advanced & PMP Certification Prep" };

const PMBOK_QUICK = [
  { icon: "🎯", title: "12 PM Principles", desc: "Stewardship, Team, Stakeholders, Value, Systems Thinking, Leadership, Tailoring, Quality, Complexity, Risk, Adaptability, Change" },
  { icon: "📐", title: "8 Performance Domains", desc: "Stakeholders, Team, Dev Approach, Planning, Project Work, Delivery, Measurement, Uncertainty" },
  { icon: "📊", title: "EVM Formula Sheet", desc: "CPI = EV/AC · SPI = EV/PV · EAC = BAC/CPI · ETC = EAC–AC · TCPI = (BAC–EV)/(BAC–AC)" },
  { icon: "🔄", title: "Process Groups", desc: "Initiating → Planning → Executing → Monitoring & Control → Closing" },
];

const EXAM_STATS = [
  { label: "Practice Questions", value: "200+" },
  { label: "Full Mock Exams", value: "3" },
  { label: "Pass Rate", value: "91%" },
  { label: "Avg Study Time", value: "40h" },
];

export default async function AdvancedPage() {
  const courses = await getCourses("advanced");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-700 via-purple-800 to-pink-600 p-8 sm:p-12 mb-10 text-white">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "24px 24px" }} />
        <div className="relative">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 border border-white/30 px-3 py-1 text-xs font-medium mb-4">
            🏆 Advanced & PMP Path
          </span>
          <h1 className="text-4xl sm:text-5xl font-display font-bold mb-3">Get PMP Certified</h1>
          <p className="text-white/80 max-w-xl text-lg mb-6">
            Comprehensive exam prep with PMBOK 7 mastery, 200+ practice questions, timed mock exams, flashcards, and study groups. 91% of our students pass on their first attempt.
          </p>

          {/* Exam Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            {EXAM_STATS.map(stat => (
              <div key={stat.label} className="text-center p-3 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20">
                <p className="text-2xl font-display font-bold mb-0.5">{stat.value}</p>
                <p className="text-xs text-white/70">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/learn/advanced/mockexam" className="inline-flex items-center gap-2 bg-white text-purple-700 font-semibold px-5 py-2.5 rounded-xl hover:bg-purple-50 transition-all text-sm shadow-sm">
              <BarChart3 size={14} />Take Mock Exam
            </Link>
            <Link href="/learn/advanced/analytics" className="inline-flex items-center gap-2 bg-white/20 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-white/30 transition-all text-sm border border-white/30">
              <Target size={14} />View Weak Areas
            </Link>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-10">

          {/* PMBOK Quick Reference — PRD §3.1.3 concept snippets */}
          <section className="card p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="font-display font-bold text-xl text-ink mb-1">PMBOK 7 Quick Reference</h2>
                <p className="text-sm text-ink-muted">Essential exam concepts at a glance.</p>
              </div>
              <Link href="/learn/advanced/pmbok-principles" className="text-sm text-purple-600 font-medium hover:underline flex items-center gap-1">
                Study now <ArrowRight size={12} />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {PMBOK_QUICK.map(card => (
                <div key={card.title} className="p-4 bg-surface-1 rounded-xl border border-surface-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{card.icon}</span>
                    <h3 className="font-semibold text-sm text-ink">{card.title}</h3>
                  </div>
                  <p className="text-xs text-ink-muted leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Courses */}
          <section>
            <h2 className="font-display font-bold text-2xl text-ink mb-5">Advanced Courses</h2>
            <div className="space-y-4">
              {courses.map((course, i) => (
                <div key={course._id} className="card-hover p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-advanced-light border border-advanced/20 flex items-center justify-center text-2xl shrink-0">
                      {["🏆","📋","⚡"][i] || "🎓"}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-semibold text-ink">{course.title}</h3>
                        <span className="text-sm font-bold text-purple-700 shrink-0">${course.price}</span>
                      </div>
                      <p className="text-sm text-ink-muted mb-3">{course.description}</p>
                      <div className="flex flex-wrap gap-4 text-xs text-ink-subtle mb-3">
                        <span className="flex items-center gap-1"><Clock size={11} />{course.duration}</span>
                        <span className="flex items-center gap-1"><BookOpen size={11} />{course.lessonCount} lessons</span>
                        <span className="flex items-center gap-1"><Users size={11} />{course.enrolledCount.toLocaleString()}</span>
                        <span className="flex items-center gap-1"><Star size={11} className="fill-amber-400 text-amber-400" />{course.rating}</span>
                      </div>
                      <ul className="space-y-1">
                        {course.learningOutcomes.slice(0, 3).map(o => (
                          <li key={o} className="flex items-center gap-1.5 text-xs text-ink-muted">
                            <CheckCircle2 size={10} className="text-purple-500 shrink-0" />{o}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-surface-2 flex gap-3">
                    <Link href={`/learn/advanced/${course.slug || "pmbok-principles"}`}
                      className="flex-1 justify-center inline-flex items-center gap-2 text-sm font-semibold py-2.5 rounded-xl text-white hover:opacity-90 transition-all"
                      style={{ background: "#7c3aed" }}>
                      <Play size={13} />Enroll — ${course.price}
                    </Link>
                    <Link href={`/learn/advanced/${course.slug || "pmbok-principles"}`} className="btn-secondary text-sm px-4">Preview</Link>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Mock Exams — PRD §3.1.3 timed mock exams */}
          <section className="card p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-100">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center text-2xl shrink-0">📝</div>
              <div className="flex-1">
                <h2 className="font-display font-bold text-xl text-ink mb-1">Timed Mock PMP Exams</h2>
                <p className="text-sm text-ink-muted mb-3">
                  Simulate the real PMP exam experience. Full timed exams with scenario-based questions across all knowledge domains. Detailed review after each attempt.
                </p>
                <div className="grid sm:grid-cols-3 gap-3 mb-4">
                  {[
                    { label: "8 questions / exam", icon: "❓" },
                    { label: "30 min time limit", icon: "⏱️" },
                    { label: "75%+ to pass", icon: "🎯" },
                  ].map(f => (
                    <div key={f.label} className="flex items-center gap-2 text-xs text-ink-muted">
                      <span>{f.icon}</span>{f.label}
                    </div>
                  ))}
                </div>
                <Link href="/learn/advanced/mockexam" className="inline-flex items-center gap-2 text-white font-semibold px-6 py-2.5 rounded-xl hover:opacity-90 transition-all text-sm" style={{ background: "#7c3aed" }}>
                  <BarChart3 size={15} />Start Mock Exam
                </Link>
              </div>
            </div>
          </section>

          {/* Flashcards — PRD §3.1.3 flashcard generator */}
          <section className="card p-6 bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-100">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-2xl shrink-0">🃏</div>
              <div className="flex-1">
                <h2 className="font-display font-bold text-xl text-ink mb-1">Flashcard Generator</h2>
                <p className="text-sm text-ink-muted mb-3">
                  Spaced repetition flashcards for PMBOK concepts, EVM formulas, and Agile principles. Create custom sets or study from curated decks.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {["PMBOK 7 Core Concepts", "EVM Formulas", "Agile & Scrum", "Custom Sets"].map(s => (
                    <span key={s} className="text-[11px] px-2.5 py-1 rounded-full bg-white border border-amber-200 text-amber-800">{s}</span>
                  ))}
                </div>
                <Link href="/learn/advanced/flashcards" className="inline-flex items-center gap-2 bg-amber-600 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-amber-700 transition-all text-sm">
                  <Zap size={15} />Study Flashcards
                </Link>
              </div>
            </div>
          </section>

          {/* Study Groups — PRD §3.1.3 virtual study sessions */}
          <section className="card p-6 bg-gradient-to-br from-teal-50 to-emerald-50 border-teal-100">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-100 flex items-center justify-center text-2xl shrink-0">👥</div>
              <div className="flex-1">
                <h2 className="font-display font-bold text-xl text-ink mb-1">Virtual Study Groups</h2>
                <p className="text-sm text-ink-muted mb-3">
                  Join weekly PMP study sessions with fellow candidates. Expert-facilitated, agenda-driven, with real mock questions and peer accountability.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {["4 active groups", "Weekly sessions", "Free to join", "Zoom/Meet"].map(f => (
                    <span key={f} className="text-[11px] px-2.5 py-1 rounded-full bg-teal-100 text-teal-800 font-medium">{f}</span>
                  ))}
                </div>
                <Link href="/learn/advanced/studygroups" className="inline-flex items-center gap-2 bg-teal-600 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-teal-700 transition-all text-sm">
                  <Users size={15} />Browse Study Groups
                </Link>
              </div>
            </div>
          </section>

        </div>

        {/* Sidebar */}
        <div className="space-y-5">

          {/* PMP Eligibility */}
          <div className="card p-5 bg-advanced-light border-advanced/30">
            <div className="flex items-center gap-2 mb-3">
              <Trophy size={15} className="text-advanced" />
              <h3 className="font-semibold text-advanced-dark">PMP Eligibility</h3>
            </div>
            <ul className="space-y-2 text-sm text-ink-muted">
              {[
                "4-yr degree + 36 months PM experience",
                "OR high school + 60 months PM experience",
                "35 hours PM education (we cover this!)",
              ].map(req => (
                <li key={req} className="flex items-start gap-2">
                  <CheckCircle2 size={12} className="text-advanced mt-0.5 shrink-0" />{req}
                </li>
              ))}
            </ul>
          </div>

          {/* Advanced tools */}
          <div className="card p-5">
            <h3 className="font-semibold text-ink mb-4">PMP Prep Tools</h3>
            <div className="space-y-2">
              {[
                { icon: BarChart3, label: "Mock PMP Exam", href: "/learn/advanced/mockexam", badge: "3 full exams", color: "text-purple-600 bg-purple-50" },
                { icon: Zap, label: "Flashcards", href: "/learn/advanced/flashcards", badge: "200+ cards", color: "text-amber-600 bg-amber-50" },
                { icon: Target, label: "Weak Areas Dashboard", href: "/learn/advanced/analytics", badge: "AI-powered", color: "text-red-600 bg-red-50" },
                { icon: Users, label: "Study Groups", href: "/learn/advanced/studygroups", badge: "4 active groups", color: "text-teal-600 bg-teal-50" },
                { icon: FileText, label: "PMBOK Module", href: "/learn/advanced/pmbok-principles", badge: "Core content", color: "text-blue-600 bg-blue-50" },
                { icon: Award, label: "Certificates", href: "/certificates", badge: "Earn & export", color: "text-brand-600 bg-brand-50" },
              ].map(item => (
                <Link key={item.href} href={item.href}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-1 transition-colors group">
                  <div className={`w-8 h-8 rounded-lg ${item.color} flex items-center justify-center shrink-0`}>
                    <item.icon size={14} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-ink group-hover:text-purple-700 transition-colors">{item.label}</p>
                    <p className="text-[10px] text-ink-subtle">{item.badge}</p>
                  </div>
                  <ArrowRight size={11} className="text-ink-subtle group-hover:text-purple-600" />
                </Link>
              ))}
            </div>
          </div>

          {/* Mentorship */}
          <div className="card p-5">
            <h3 className="font-semibold text-ink mb-2 flex items-center gap-2">
              <Target size={14} className="text-brand-600" />Get a PMP Mentor
            </h3>
            <p className="text-sm text-ink-muted mb-4">Connect with PMP-certified mentors for 1-on-1 exam guidance and study accountability.</p>
            <div className="flex gap-2">
              <Link href="/mentorship/match" className="btn-primary text-sm flex-1 justify-center text-xs py-2">AI Match</Link>
              <Link href="/mentorship" className="btn-secondary text-sm text-xs py-2 px-3">Browse</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
