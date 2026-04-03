// app/learn/beginner/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen, Clock, Users, Star, CheckCircle2, ArrowRight,
  Play, Lock, Download, Zap, Target, Globe, Search, Gamepad2
} from "lucide-react";
import { getCourses } from "@/lib/db";

export const metadata: Metadata = { title: "Beginner Learning Path" };

const ROADMAP = [
  { id: 1, label: "PM Fundamentals", done: true, active: false, href: "/learn/beginner/what-is-pm" },
  { id: 2, label: "Agile & Scrum", done: false, active: true, href: "/learn/beginner/agile-vs-waterfall" },
  { id: 3, label: "Project Simulation", done: false, active: false, href: "/learn/beginner/simulation" },
  { id: 4, label: "CAPM Prep", done: false, active: false, href: "/learn/beginner/stakeholders" },
];

const GLOSSARY_PREVIEW = [
  { term: "Iron Triangle", def: "Scope, Time, Cost — the three primary constraints of every project." },
  { term: "Stakeholder", def: "Anyone affected by or who can influence a project." },
  { term: "Scope Creep", def: "Uncontrolled expansion of scope without adjusting time/cost." },
  { term: "WBS", def: "Work Breakdown Structure — hierarchical decomposition of project scope." },
  { term: "Sprint", def: "A time-boxed Scrum iteration (1–4 weeks) delivering a product increment." },
  { term: "Kanban", def: "Visual workflow method using To Do / In Progress / Done columns." },
];

export default async function BeginnerPage() {
  const courses = await getCourses("beginner");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-emerald-600 to-teal-500 p-8 sm:p-12 mb-10 text-white">
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/4" />
        <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-white/5 rounded-full translate-y-1/2" />
        <div className="relative">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 border border-white/30 px-3 py-1 text-xs font-medium mb-4">
            🌱 Beginner Path
          </span>
          <h1 className="text-4xl sm:text-5xl font-display font-bold mb-3">
            Project Management<br />Fundamentals
          </h1>
          <p className="text-white/80 max-w-xl text-lg mb-6">
            No experience needed. Start with the essentials and build a rock-solid PM foundation through interactive lessons, quizzes, and a real project simulation.
          </p>
          <div className="flex flex-wrap gap-6 text-sm">
            <span className="flex items-center gap-2"><Clock size={15} />{courses.reduce((a, c) => a + parseInt(c.duration), 0)}+ hours</span>
            <span className="flex items-center gap-2"><BookOpen size={15} />{courses.length} courses</span>
            <span className="flex items-center gap-2"><Users size={15} />3,400+ enrolled</span>
            <span className="flex items-center gap-2"><Star size={15} />Free to start</span>
          </div>
          <div className="flex flex-wrap gap-3 mt-6">
            <Link href="/onboarding" className="inline-flex items-center gap-2 bg-white text-brand-700 font-semibold px-5 py-2.5 rounded-xl hover:bg-brand-50 transition-all text-sm shadow-sm">
              Take Assessment <ArrowRight size={15} />
            </Link>
            <Link href="/roadmap" className="inline-flex items-center gap-2 bg-white/20 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-white/30 transition-all text-sm border border-white/30">
              <Target size={15} /> View My Roadmap
            </Link>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-10">

          {/* Interactive Roadmap Strip */}
          <section className="card p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display font-bold text-xl text-ink">Your Beginner Roadmap</h2>
              <Link href="/roadmap" className="text-sm text-brand-600 font-medium hover:underline flex items-center gap-1">
                Full roadmap <ArrowRight size={13} />
              </Link>
            </div>
            <div className="flex items-center gap-0 overflow-x-auto pb-2 scrollbar-hide">
              {ROADMAP.map((step, i) => (
                <div key={step.id} className="flex items-center shrink-0">
                  <Link href={step.href} className={`flex flex-col items-center gap-2 px-4 py-3 rounded-xl transition-all hover:opacity-90 ${
                    step.done ? "bg-beginner-light" : step.active ? "bg-brand-50 border border-brand-200" : "bg-surface-1"
                  }`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                      step.done ? "bg-brand-500 text-white" : step.active ? "bg-white border-2 border-brand-500 text-brand-600" : "bg-surface-2 text-ink-subtle"
                    }`}>
                      {step.done ? <CheckCircle2 size={15} /> : step.id}
                    </div>
                    <span className={`text-xs font-medium text-center max-w-[80px] leading-tight ${
                      step.done ? "text-brand-800" : step.active ? "text-brand-700 font-semibold" : "text-ink-muted"
                    }`}>{step.label}</span>
                    {step.active && <span className="text-[9px] text-brand-600 font-bold">CURRENT</span>}
                  </Link>
                  {i < ROADMAP.length - 1 && (
                    <div className={`w-8 h-0.5 ${step.done ? "bg-brand-400" : "bg-surface-3"}`} />
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Courses */}
          <section>
            <h2 className="font-display font-bold text-2xl text-ink mb-5">Beginner Courses</h2>
            <div className="space-y-4">
              {courses.map((course, i) => (
                <div key={course._id} className="card-hover p-5 flex flex-col sm:flex-row gap-5">
                  <div className="sm:w-20 sm:h-20 w-full h-28 rounded-xl flex items-center justify-center text-4xl shrink-0"
                    style={{ background: `${course.color}18`, border: `1px solid ${course.color}25` }}>
                    {["📚","⚡","🔍","🏆","💬"][i] || "📖"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-2 flex-wrap mb-1">
                      <h3 className="font-semibold text-ink">{course.title}</h3>
                      {course.isFree
                        ? <span className="text-[10px] font-bold text-brand-700 bg-brand-50 border border-brand-200 px-2 py-0.5 rounded-full">FREE</span>
                        : <span className="text-[10px] font-bold text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-full">PREMIUM</span>}
                    </div>
                    <p className="text-sm text-ink-muted mb-3 line-clamp-2">{course.description}</p>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-ink-subtle mb-3">
                      <span className="flex items-center gap-1"><Clock size={11} />{course.duration}</span>
                      <span className="flex items-center gap-1"><BookOpen size={11} />{course.lessonCount} lessons</span>
                      <span className="flex items-center gap-1"><Users size={11} />{course.enrolledCount.toLocaleString()} enrolled</span>
                      <span className="flex items-center gap-1"><Star size={11} className="fill-amber-400 text-amber-400" />{course.rating}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {course.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-[11px] px-2 py-0.5 bg-surface-1 border border-surface-3 rounded-full text-ink-muted">#{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex sm:flex-col gap-2 sm:justify-center shrink-0">
                    {course.isFree
                      ? <Link href={`/learn/beginner/${course.slug || "what-is-pm"}`} className="btn-primary text-xs px-4 py-2"><Play size={12} />Start</Link>
                      : <button className="inline-flex items-center gap-1.5 text-xs px-4 py-2 rounded-xl bg-purple-600 text-white hover:bg-purple-700 transition-colors"><Lock size={12} />Enroll</button>
                    }
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Project Simulation — PRD §3.1.1 */}
          <section className="card p-6 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-100">
            <div className="flex items-start gap-4 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-2xl shrink-0">🚀</div>
              <div>
                <h2 className="font-display font-bold text-xl text-ink mb-1">First Project Simulation</h2>
                <p className="text-sm text-ink-muted">
                  Step into the role of a junior PM and manage a real project end-to-end — from charter to close.
                  Make decisions and see how they affect project health.
                </p>
              </div>
            </div>
            <div className="grid sm:grid-cols-3 gap-3 mb-5">
              {[
                { label: "5 PM phases", icon: "🗺️" },
                { label: "Real decisions", icon: "⚡" },
                { label: "Earn certificate", icon: "🏅" },
              ].map(f => (
                <div key={f.label} className="flex items-center gap-2 text-sm text-ink">
                  <span>{f.icon}</span>{f.label}
                </div>
              ))}
            </div>
            <Link href="/learn/beginner/simulation" className="inline-flex items-center gap-2 bg-amber-600 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-amber-700 transition-all text-sm">
              <Gamepad2 size={15} /> Start Simulation
            </Link>
          </section>

          {/* Glossary Preview — PRD §3.1.1 searchable glossary */}
          <section className="card p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="font-display font-bold text-xl text-ink mb-1">PM Glossary</h2>
                <p className="text-sm text-ink-muted">Essential terms every beginner should know. 45 terms total.</p>
              </div>
              <Link href="/glossary" className="btn-secondary text-sm flex items-center gap-1.5">
                <Search size={13} />Browse All
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 gap-3 mb-4">
              {GLOSSARY_PREVIEW.map(item => (
                <div key={item.term} className="p-3 bg-surface-1 rounded-xl border border-surface-3">
                  <p className="font-semibold text-sm text-ink mb-1">{item.term}</p>
                  <p className="text-xs text-ink-muted leading-relaxed">{item.def}</p>
                </div>
              ))}
            </div>
            <Link href="/glossary" className="text-sm text-brand-600 font-medium hover:underline">View all 45 PM terms →</Link>
          </section>

          {/* Quiz section — PRD §3.1.1 quizzes at lesson ends */}
          <section className="card p-6 bg-gradient-to-br from-brand-50 to-emerald-50 border-brand-100">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-100 flex items-center justify-center shrink-0">
                <Zap size={22} className="text-brand-700" />
              </div>
              <div className="flex-1">
                <h2 className="font-display font-bold text-xl text-ink mb-1">Test Your Knowledge</h2>
                <p className="text-sm text-ink-muted mb-4">Take the beginner quiz to check your understanding and get personalised recommendations.</p>
                <div className="flex flex-wrap gap-3">
                  <Link href="/quiz" className="btn-primary text-sm">Start Quiz</Link>
                  <Link href="/learn/advanced/analytics" className="btn-secondary text-sm">View My Analytics</Link>
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* Sidebar */}
        <div className="space-y-5">

          {/* Quick start */}
          <div className="card p-5 bg-beginner-light border-beginner/30">
            <h3 className="font-semibold text-brand-800 mb-3">New Here?</h3>
            <p className="text-sm text-ink-muted mb-4">Take our 5-min assessment to find your perfect starting point.</p>
            <Link href="/onboarding" className="btn-primary w-full justify-center text-sm">
              Take Assessment <ArrowRight size={13} />
            </Link>
          </div>

          {/* Learning tools */}
          <div className="card p-5">
            <h3 className="font-semibold text-ink mb-4">Beginner Tools</h3>
            <div className="space-y-2">
              {[
                { icon: Target, label: "My Roadmap", href: "/roadmap", badge: "Track progress", color: "text-brand-600 bg-brand-50" },
                { icon: Gamepad2, label: "Project Simulation", href: "/learn/beginner/simulation", badge: "Hands-on", color: "text-amber-600 bg-amber-50" },
                { icon: Zap, label: "Take a Quiz", href: "/quiz", badge: "Adaptive", color: "text-purple-600 bg-purple-50" },
                { icon: Search, label: "PM Glossary", href: "/glossary", badge: "45 terms", color: "text-teal-600 bg-teal-50" },
                { icon: Globe, label: "Community Forum", href: "/community", badge: "Ask anything", color: "text-blue-600 bg-blue-50" },
              ].map(item => (
                <Link key={item.href} href={item.href}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-1 transition-colors group">
                  <div className={`w-8 h-8 rounded-lg ${item.color} flex items-center justify-center shrink-0`}>
                    <item.icon size={15} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-ink group-hover:text-brand-700 transition-colors">{item.label}</p>
                    <p className="text-[10px] text-ink-subtle">{item.badge}</p>
                  </div>
                  <ArrowRight size={12} className="text-ink-subtle group-hover:text-brand-600 transition-colors" />
                </Link>
              ))}
            </div>
          </div>

          {/* What you'll learn */}
          <div className="card p-5">
            <h3 className="font-semibold text-ink mb-3">What You'll Learn</h3>
            <ul className="space-y-2.5">
              {[
                "Understand the full PM lifecycle",
                "Differentiate Agile vs Waterfall",
                "Write a basic project charter",
                "Run an Agile sprint",
                "Identify and manage stakeholders",
                "Complete a full project simulation",
                "Prepare for CAPM exam",
              ].map(outcome => (
                <li key={outcome} className="flex items-start gap-2 text-sm text-ink-muted">
                  <CheckCircle2 size={13} className="text-brand-500 mt-0.5 shrink-0" />
                  {outcome}
                </li>
              ))}
            </ul>
          </div>

          {/* Downloads */}
          <div className="card p-5">
            <h3 className="font-semibold text-ink mb-3 flex items-center gap-2">
              <Download size={14} className="text-brand-600" />Free Resources
            </h3>
            <div className="space-y-2">
              {["PM Terminology Cheatsheet", "Project Charter Template", "Agile vs Waterfall Guide", "WBS Template"].map(resource => (
                <button key={resource} className="flex items-center gap-2 w-full text-left text-sm text-ink-muted hover:text-brand-600 transition-colors py-1.5 group">
                  <Download size={12} className="text-brand-500 shrink-0" />
                  <span className="group-hover:underline">{resource}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Next level teaser */}
          <div className="card p-5 border-blue-100 bg-blue-50/50">
            <h3 className="font-semibold text-ink mb-2 text-sm">Ready to Level Up?</h3>
            <p className="text-xs text-ink-muted mb-3">Once you've mastered the basics, move to the Intermediate path.</p>
            <Link href="/learn/intermediate" className="text-sm text-blue-600 font-semibold hover:underline flex items-center gap-1">
              View Intermediate Path <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
