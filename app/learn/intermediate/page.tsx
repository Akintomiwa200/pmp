// app/learn/intermediate/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen, Clock, Users, Star, CheckCircle2, ArrowRight,
  Play, Lock, Layers, FileSearch, Globe, Zap, Target, BarChart3
} from "lucide-react";
import { getCourses } from "@/lib/db";

export const metadata: Metadata = { title: "Intermediate Learning Path" };

const CASE_STUDIES = [
  { title: "Managing a Product Launch Gone Wrong", domain: "Risk Management", outcome: "How proper risk identification could have saved $2M and 3 months", level: "Real case" },
  { title: "Stakeholder Conflict at a Healthcare Startup", domain: "Stakeholder Management", outcome: "Communication plan that turned adversaries into advocates", level: "Real case" },
  { title: "Rescuing a Failing Agile Transformation", domain: "Agile at Scale", outcome: "Hybrid approach that saved a 6-month digital overhaul", level: "Real case" },
];

export default async function IntermediatePage() {
  const courses = await getCourses("intermediate");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-500 p-8 sm:p-12 mb-10 text-white">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
        <div className="relative">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 border border-white/30 px-3 py-1 text-xs font-medium mb-4">
            📈 Intermediate Path
          </span>
          <h1 className="text-4xl sm:text-5xl font-display font-bold mb-3">Deepen Your PM Skills</h1>
          <p className="text-white/80 max-w-xl text-lg mb-6">
            Build on your foundation with risk management, stakeholder strategy, and advanced Agile — through real case studies, simulations, and peer review.
          </p>
          <div className="flex flex-wrap gap-6 text-sm mb-6">
            <span className="flex items-center gap-2"><Clock size={15} />8+ hours content</span>
            <span className="flex items-center gap-2"><BookOpen size={15} />{courses.length} courses</span>
            <span className="flex items-center gap-2"><Users size={15} />1,200+ enrolled</span>
            <span className="flex items-center gap-2"><Star size={15} />Premium features</span>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/roadmap" className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold px-5 py-2.5 rounded-xl hover:bg-blue-50 transition-all text-sm shadow-sm">
              <Target size={14} />View My Roadmap
            </Link>
            <Link href="/quiz" className="inline-flex items-center gap-2 bg-white/20 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-white/30 transition-all text-sm border border-white/30">
              <Zap size={14} />Take Level Quiz
            </Link>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-10">

          {/* Courses */}
          <section>
            <h2 className="font-display font-bold text-2xl text-ink mb-5">Intermediate Courses</h2>
            <div className="space-y-4">
              {courses.map((course, i) => (
                <div key={course._id} className="card-hover p-5 flex flex-col sm:flex-row gap-5">
                  <div className="sm:w-20 sm:h-20 w-full h-28 rounded-xl flex items-center justify-center text-4xl shrink-0"
                    style={{ background: `${course.color}18`, border: `1px solid ${course.color}25` }}>
                    {["⚠️","💬","📊","⚡","🔄"][i] || "📘"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-2 mb-1">
                      <h3 className="font-semibold text-ink">{course.title}</h3>
                      {!course.isFree && <span className="text-[10px] font-bold text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-full shrink-0">PREMIUM</span>}
                    </div>
                    <p className="text-sm text-ink-muted mb-3 line-clamp-2">{course.description}</p>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-ink-subtle mb-3">
                      <span className="flex items-center gap-1"><Clock size={11} />{course.duration}</span>
                      <span className="flex items-center gap-1"><BookOpen size={11} />{course.lessonCount} lessons</span>
                      <span className="flex items-center gap-1"><Star size={11} className="fill-amber-400 text-amber-400" />{course.rating}</span>
                    </div>
                    <ul className="space-y-1">
                      {course.learningOutcomes.slice(0, 2).map(o => (
                        <li key={o} className="flex items-center gap-1.5 text-xs text-ink-muted">
                          <CheckCircle2 size={11} className="text-blue-500 shrink-0" />{o}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="shrink-0">
                    {course.isFree
                      ? <Link href={`/learn/intermediate/${course.slug || "identifying-risks"}`} className="inline-flex items-center gap-1.5 text-xs px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors"><Play size={12} />Start</Link>
                      : <button className="inline-flex items-center gap-1.5 text-xs px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors"><Lock size={12} />${course.price}</button>}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Kanban Board Builder — PRD §3.1.2 drag-and-drop simulation */}
          <section className="card p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-100">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-2xl shrink-0">📋</div>
              <div className="flex-1">
                <h2 className="font-display font-bold text-xl text-ink mb-1">Kanban Board Builder</h2>
                <p className="text-sm text-ink-muted mb-3">
                  Interactive drag-and-drop Kanban tool to practise Agile task management. Build, organise, and save your own board templates.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {["Drag & Drop Cards", "Priority Labels", "WIP Limits", "Export Board"].map(f => (
                    <span key={f} className="text-[11px] px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 font-medium">{f}</span>
                  ))}
                </div>
                <Link href="/learn/intermediate/kanban" className="inline-flex items-center gap-2 bg-blue-600 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-blue-700 transition-all text-sm">
                  <Layers size={15} />Open Kanban Builder
                </Link>
              </div>
            </div>
          </section>

          {/* Peer Review — PRD §3.1.2 */}
          <section className="card p-6 bg-gradient-to-br from-pink-50 to-purple-50 border-pink-100">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-pink-100 flex items-center justify-center text-2xl shrink-0">👥</div>
              <div className="flex-1">
                <h2 className="font-display font-bold text-xl text-ink mb-1">Peer Review System</h2>
                <p className="text-sm text-ink-muted mb-3">
                  Submit your project plans, risk registers, and communication plans for structured feedback from peers. Review others to earn points.
                </p>
                <div className="grid sm:grid-cols-3 gap-3 mb-4 text-xs text-ink-muted">
                  {[
                    { icon: "📤", label: "Submit your work", desc: "Docs, plans, templates" },
                    { icon: "⭐", label: "Get 3 peer reviews", desc: "Scored rubric + feedback" },
                    { icon: "🏅", label: "Earn +100 points", desc: "Per review received" },
                  ].map(s => (
                    <div key={s.label} className="text-center p-2 bg-white rounded-xl border border-surface-2">
                      <p className="text-lg mb-1">{s.icon}</p>
                      <p className="font-medium text-ink text-[11px]">{s.label}</p>
                      <p className="text-[10px]">{s.desc}</p>
                    </div>
                  ))}
                </div>
                <Link href="/learn/intermediate/peerreview" className="inline-flex items-center gap-2 bg-purple-600 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-purple-700 transition-all text-sm">
                  <FileSearch size={15} />Browse Submissions
                </Link>
              </div>
            </div>
          </section>

          {/* Case Studies — PRD §3.1.2 */}
          <section className="card p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="font-display font-bold text-xl text-ink mb-1">Real Case Studies</h2>
                <p className="text-sm text-ink-muted">Learn from real projects — what went wrong, and how PMs fixed it.</p>
              </div>
            </div>
            <div className="space-y-4">
              {CASE_STUDIES.map((cs, i) => (
                <div key={i} className="p-4 bg-surface-1 rounded-xl border border-surface-2 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-xl shrink-0">
                    {["⚡","🤝","🔄"][i]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-ink text-sm mb-0.5">{cs.title}</p>
                    <p className="text-xs text-blue-600 font-medium mb-1">{cs.domain}</p>
                    <p className="text-xs text-ink-muted">{cs.outcome}</p>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-surface-2 border border-surface-3 text-ink-subtle shrink-0">{cs.level}</span>
                </div>
              ))}
            </div>
          </section>

          {/* External MOOCs — PRD §3.1.2 integration */}
          <section className="card p-6 border-amber-100 bg-amber-50/40">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-2xl shrink-0">🌐</div>
              <div className="flex-1">
                <h2 className="font-display font-bold text-xl text-ink mb-1">External MOOC Resources</h2>
                <p className="text-sm text-ink-muted mb-3">
                  Curated courses from Coursera, edX, PMI, and LinkedIn Learning to complement your PMPath journey.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {["Coursera", "edX", "LinkedIn Learning", "PMI Official", "Free audit options"].map(p => (
                    <span key={p} className="text-[11px] px-2.5 py-1 rounded-full bg-white border border-surface-3 text-ink-muted">{p}</span>
                  ))}
                </div>
                <Link href="/learn/intermediate/resources" className="inline-flex items-center gap-2 bg-amber-600 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-amber-700 transition-all text-sm">
                  <Globe size={15} />Browse External Courses
                </Link>
              </div>
            </div>
          </section>

        </div>

        {/* Sidebar */}
        <div className="space-y-5">

          {/* Prerequisites */}
          <div className="card p-5 bg-blue-50 border-blue-100">
            <h3 className="font-semibold text-ink mb-3">Prerequisites</h3>
            <ul className="space-y-2 mb-4">
              {["PM Fundamentals", "Agile & Scrum Basics"].map(req => (
                <li key={req} className="flex items-center gap-2 text-sm text-ink">
                  <CheckCircle2 size={13} className="text-blue-500" />{req}
                </li>
              ))}
            </ul>
            <Link href="/learn/beginner" className="text-xs text-blue-600 font-medium hover:underline flex items-center gap-1">
              Start from Beginner <ArrowRight size={11} />
            </Link>
          </div>

          {/* Intermediate tools */}
          <div className="card p-5">
            <h3 className="font-semibold text-ink mb-4">Intermediate Tools</h3>
            <div className="space-y-2">
              {[
                { icon: Layers, label: "Kanban Builder", href: "/learn/intermediate/kanban", badge: "Interactive", color: "text-blue-600 bg-blue-50" },
                { icon: FileSearch, label: "Peer Review", href: "/learn/intermediate/peerreview", badge: "Community", color: "text-pink-600 bg-pink-50" },
                { icon: Globe, label: "External MOOCs", href: "/learn/intermediate/resources", badge: "6 platforms", color: "text-amber-600 bg-amber-50" },
                { icon: Zap, label: "Intermediate Quiz", href: "/quiz", badge: "Adaptive", color: "text-purple-600 bg-purple-50" },
                { icon: BarChart3, label: "Progress Analytics", href: "/progress", badge: "Track growth", color: "text-teal-600 bg-teal-50" },
              ].map(item => (
                <Link key={item.href} href={item.href}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-1 transition-colors group">
                  <div className={`w-8 h-8 rounded-lg ${item.color} flex items-center justify-center shrink-0`}>
                    <item.icon size={14} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-ink group-hover:text-blue-700 transition-colors">{item.label}</p>
                    <p className="text-[10px] text-ink-subtle">{item.badge}</p>
                  </div>
                  <ArrowRight size={11} className="text-ink-subtle group-hover:text-blue-600" />
                </Link>
              ))}
            </div>
          </div>

          {/* What you'll master */}
          <div className="card p-5">
            <h3 className="font-semibold text-ink mb-3">What You'll Master</h3>
            <ul className="space-y-2">
              {["Build a risk register", "Create stakeholder maps", "Manage resource allocation", "Lead change management", "Use advanced Agile", "Write status reports", "Handle scope changes"].map(o => (
                <li key={o} className="flex items-start gap-2 text-sm text-ink-muted">
                  <CheckCircle2 size={13} className="text-blue-500 mt-0.5 shrink-0" />{o}
                </li>
              ))}
            </ul>
          </div>

          {/* Next level */}
          <div className="card p-5 border-purple-100 bg-purple-50/50">
            <h3 className="font-semibold text-ink mb-2 text-sm">Ready for Advanced?</h3>
            <p className="text-xs text-ink-muted mb-3">After mastering intermediate skills, tackle PMP certification prep.</p>
            <Link href="/learn/advanced" className="text-sm text-purple-600 font-semibold hover:underline flex items-center gap-1">
              View Advanced Path <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
