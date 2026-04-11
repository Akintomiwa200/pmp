// app/roadmap/page.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2, Circle, Lock, ChevronRight, Target,
  BookOpen, Award, Users, Zap, Star, Clock, ArrowRight
} from "lucide-react";
import MarketingShell from "@/components/layout/MarketingShell";

type Level = "beginner" | "intermediate" | "advanced";

const ROADMAPS: Record<Level, {
  title: string; color: string; bg: string; border: string; textColor: string;
  phases: {
    id: string; title: string; emoji: string; duration: string;
    milestones: { id: string; title: string; desc: string; done: boolean; locked: boolean; type: string; href: string }[];
  }[];
}> = {
  beginner: {
    title: "Beginner Roadmap",
    color: "#0891b2", bg: "bg-cyan-50", border: "border-cyan-200", textColor: "text-cyan-800 dark:text-cyan-200",
    phases: [
      {
        id: "p1", title: "Foundation", emoji: "🌱", duration: "Week 1–2",
        milestones: [
          { id: "m1", title: "What is Project Management?", desc: "Understand what PMs do and how projects differ from operations.", done: true, locked: false, type: "lesson", href: "/learn/beginner/what-is-pm" },
          { id: "m2", title: "PM Lifecycle: 5 Phases", desc: "Initiation → Planning → Execution → Monitor → Close.", done: true, locked: false, type: "lesson", href: "/learn/beginner/pm-lifecycle" },
          { id: "m3", title: "Agile vs Waterfall", desc: "Choose the right methodology for any project.", done: false, locked: false, type: "lesson", href: "/learn/beginner/agile-vs-waterfall" },
          { id: "m4", title: "Foundation Quiz", desc: "Test your understanding of PM basics.", done: false, locked: false, type: "quiz", href: "/learn/beginner/what-is-pm" },
        ],
      },
      {
        id: "p2", title: "Core Skills", emoji: "📚", duration: "Week 3–5",
        milestones: [
          { id: "m5", title: "Write a Project Charter", desc: "Formally authorise a project — your first real PM document.", done: false, locked: false, type: "project", href: "/learn/beginner/project-charter" },
          { id: "m6", title: "Identify Stakeholders", desc: "Map who's affected by or influences your project.", done: false, locked: false, type: "lesson", href: "/learn/beginner/stakeholders" },
          { id: "m7", title: "Scrum Basics", desc: "Sprints, standups, backlogs — the Agile playbook.", done: false, locked: false, type: "lesson", href: "/learn/beginner" },
          { id: "m8", title: "PM Terminology Glossary", desc: "Master the language of project management.", done: false, locked: true, type: "resource", href: "/resources" },
        ],
      },
      {
        id: "p3", title: "First Project", emoji: "🚀", duration: "Week 6–8",
        milestones: [
          { id: "m9", title: "Project Simulation", desc: "End-to-end project from charter to close — simulated.", done: false, locked: true, type: "simulation", href: "/learn/beginner" },
          { id: "m10", title: "Join Community", desc: "Post your first question or success story.", done: false, locked: true, type: "community", href: "/community" },
          { id: "m11", title: "CAPM Eligibility Check", desc: "See if you qualify for the CAPM exam.", done: false, locked: true, type: "resource", href: "/resources" },
          { id: "m12", title: "🎓 Beginner Certificate", desc: "Earn your PMPath Beginner certificate!", done: false, locked: true, type: "certificate", href: "/certificates" },
        ],
      },
    ],
  },
  intermediate: {
    title: "Intermediate Roadmap",
    color: "#2563eb", bg: "bg-blue-50", border: "border-blue-200", textColor: "text-blue-800",
    phases: [
      {
        id: "p1", title: "Risk & Stakeholders", emoji: "⚠️", duration: "Week 1–3",
        milestones: [
          { id: "m1", title: "Risk Identification", desc: "Brainstorm, Delphi, SWOT — find risks before they find you.", done: false, locked: false, type: "lesson", href: "/learn/intermediate/identifying-risks" },
          { id: "m2", title: "Risk Assessment Matrix", desc: "Probability vs Impact scoring and risk registers.", done: false, locked: false, type: "lesson", href: "/learn/intermediate/risk-assessment" },
          { id: "m3", title: "Stakeholder Communication Plan", desc: "Who needs what info, when, and in what format.", done: false, locked: false, type: "project", href: "/learn/intermediate" },
          { id: "m4", title: "Risk Management Quiz", desc: "Test your risk knowledge.", done: false, locked: false, type: "quiz", href: "/learn/intermediate" },
        ],
      },
      {
        id: "p2", title: "Agile at Scale", emoji: "⚡", duration: "Week 4–6",
        milestones: [
          { id: "m5", title: "Advanced Scrum", desc: "Multi-team Scrum, scaled frameworks (SAFe overview).", done: false, locked: false, type: "lesson", href: "/learn/intermediate" },
          { id: "m6", title: "Kanban Board Builder", desc: "Build and manage your own Kanban workflow.", done: false, locked: false, type: "tool", href: "/learn/intermediate/kanban" },
          { id: "m7", title: "Resource Allocation Simulation", desc: "Drag-and-drop resource planning exercise.", done: false, locked: true, type: "simulation", href: "/learn/intermediate" },
          { id: "m8", title: "Peer Review: Submit a Plan", desc: "Submit a project plan for peer review.", done: false, locked: true, type: "peer_review", href: "/learn/intermediate/peerreview" },
        ],
      },
      {
        id: "p3", title: "Leadership", emoji: "👑", duration: "Week 7–9",
        milestones: [
          { id: "m9", title: "Change Management", desc: "Leading people through project-driven change.", done: false, locked: true, type: "lesson", href: "/learn/intermediate" },
          { id: "m10", title: "External MOOCs", desc: "Curated Coursera/edX courses to supplement.", done: false, locked: true, type: "resource", href: "/learn/intermediate/resources" },
          { id: "m11", title: "Find a Mentor", desc: "Connect with an experienced PM mentor.", done: false, locked: true, type: "community", href: "/mentorship" },
          { id: "m12", title: "🎓 Intermediate Certificate", desc: "Earn your PMPath Intermediate certificate!", done: false, locked: true, type: "certificate", href: "/certificates" },
        ],
      },
    ],
  },
  advanced: {
    title: "Advanced & PMP Roadmap",
    color: "#7c3aed", bg: "bg-purple-50", border: "border-purple-200", textColor: "text-purple-800",
    phases: [
      {
        id: "p1", title: "PMBOK Mastery", emoji: "📖", duration: "Month 1–2",
        milestones: [
          { id: "m1", title: "PMBOK 7 — 12 Principles", desc: "Deep dive into all 12 PM principles.", done: false, locked: false, type: "lesson", href: "/learn/advanced" },
          { id: "m2", title: "Performance Domains", desc: "All 8 domains and how they interact.", done: false, locked: false, type: "lesson", href: "/learn/advanced" },
          { id: "m3", title: "EVM Mastery", desc: "CPI, SPI, EAC, ETC — master every formula.", done: false, locked: false, type: "lesson", href: "/learn/advanced" },
          { id: "m4", title: "Flashcard Set: PMBOK", desc: "Create and study your PMBOK flashcard set.", done: false, locked: false, type: "tool", href: "/learn/advanced/flashcards" },
        ],
      },
      {
        id: "p2", title: "Exam Prep", emoji: "🎯", duration: "Month 2–3",
        milestones: [
          { id: "m5", title: "200+ Practice Questions", desc: "Work through all practice question banks.", done: false, locked: false, type: "quiz", href: "/learn/advanced" },
          { id: "m6", title: "Mock Exam 1", desc: "Full timed mock exam with review.", done: false, locked: false, type: "exam", href: "/learn/advanced/mockexam" },
          { id: "m7", title: "Weak Areas Analysis", desc: "Review your performance dashboard.", done: false, locked: true, type: "analytics", href: "/learn/advanced/analytics" },
          { id: "m8", title: "Join Study Group", desc: "Weekly virtual study sessions.", done: false, locked: true, type: "community", href: "/learn/advanced/studygroups" },
        ],
      },
      {
        id: "p3", title: "Certification", emoji: "🏆", duration: "Month 3–4",
        milestones: [
          { id: "m9", title: "Mock Exam 2 & 3", desc: "Final preparation mock exams.", done: false, locked: true, type: "exam", href: "/learn/advanced/mockexam" },
          { id: "m10", title: "PMI Application", desc: "Guidance on submitting your PMP application.", done: false, locked: true, type: "resource", href: "/resources" },
          { id: "m11", title: "Apply for Mentorship", desc: "Final review with a PMP-certified mentor.", done: false, locked: true, type: "community", href: "/mentorship" },
          { id: "m12", title: "🏆 PMP Exam Day!", desc: "You're ready. Go pass that exam!", done: false, locked: true, type: "certificate", href: "/certificates" },
        ],
      },
    ],
  },
};

const TYPE_CONFIG: Record<string, { icon: React.ElementType; color: string; bg: string; label: string }> = {
  lesson: { icon: BookOpen, color: "text-brand-600", bg: "bg-brand-50", label: "Lesson" },
  quiz: { icon: Zap, color: "text-amber-600", bg: "bg-amber-50", label: "Quiz" },
  project: { icon: Target, color: "text-blue-600", bg: "bg-blue-50", label: "Project" },
  simulation: { icon: Star, color: "text-purple-600", bg: "bg-purple-50", label: "Simulation" },
  community: { icon: Users, color: "text-teal-600", bg: "bg-teal-50", label: "Community" },
  certificate: { icon: Award, color: "text-amber-600", bg: "bg-amber-50", label: "Certificate" },
  resource: { icon: BookOpen, color: "text-slate-600", bg: "bg-slate-50", label: "Resource" },
  tool: { icon: Zap, color: "text-blue-600", bg: "bg-blue-50", label: "Tool" },
  peer_review: { icon: Users, color: "text-pink-600", bg: "bg-pink-50", label: "Peer Review" },
  exam: { icon: Award, color: "text-purple-600", bg: "bg-purple-50", label: "Exam" },
  analytics: { icon: Star, color: "text-orange-600", bg: "bg-orange-50", label: "Analytics" },
};

export default function RoadmapPage() {
  const [activeLevel, setActiveLevel] = useState<Level>("beginner");
  const roadmap = ROADMAPS[activeLevel];
  const totalMilestones = roadmap.phases.reduce((a, p) => a + p.milestones.length, 0);
  const doneMilestones = roadmap.phases.reduce((a, p) => a + p.milestones.filter((m) => m.done).length, 0);

  return (
    <MarketingShell>
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      {/* Header */}
      <div className="mb-10">
        <p className="section-tag mb-3"><Target size={12} />Your Roadmap</p>
        <h1 className="text-4xl font-display font-bold text-ink mb-3">Learning Roadmap</h1>
        <p className="text-ink-muted max-w-xl">
          A step-by-step visual guide through your PM journey. Each milestone unlocks the next.
        </p>
      </div>

      {/* Level selector */}
      <div className="flex flex-wrap gap-3 mb-8">
        {(["beginner", "intermediate", "advanced"] as Level[]).map((level) => {
          const r = ROADMAPS[level];
          return (
            <button
              key={level}
              onClick={() => setActiveLevel(level)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-semibold border-2 transition-all ${
                activeLevel === level
                  ? "text-white shadow-md"
                  : "bg-white text-ink-muted border-surface-3 hover:border-slate-300"
              }`}
              style={activeLevel === level ? { background: r.color, borderColor: r.color } : {}}
            >
              {["🌱", "📈", "🏆"][["beginner", "intermediate", "advanced"].indexOf(level)]}
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
          );
        })}
      </div>

      {/* Overall progress */}
      <div className="card p-5 mb-8 flex items-center gap-5">
        <div className="flex-1">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-semibold text-ink">{roadmap.title} Progress</span>
            <span className="font-bold" style={{ color: roadmap.color }}>{doneMilestones}/{totalMilestones} milestones</span>
          </div>
          <div className="h-3 bg-surface-2 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${(doneMilestones / totalMilestones) * 100}%`, background: roadmap.color }}
            />
          </div>
        </div>
        <div className="text-center shrink-0">
          <p className="text-2xl font-display font-bold" style={{ color: roadmap.color }}>
            {Math.round((doneMilestones / totalMilestones) * 100)}%
          </p>
          <p className="text-xs text-ink-subtle">Complete</p>
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-12">
        {roadmap.phases.map((phase, phaseIdx) => (
          <div key={phase.id} className="relative">
            {/* Phase connector line */}
            {phaseIdx < roadmap.phases.length - 1 && (
              <div className="absolute left-6 top-full w-0.5 h-12 -z-10" style={{ background: `${roadmap.color}30` }} />
            )}

            {/* Phase header */}
            <div className="flex items-center gap-3 mb-5">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 ${roadmap.bg} border ${roadmap.border}`}>
                {phase.emoji}
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider" style={{ color: roadmap.color }}>
                  Phase {phaseIdx + 1} · {phase.duration}
                </p>
                <h2 className="text-xl font-display font-bold text-ink">{phase.title}</h2>
              </div>
              <div className="ml-auto">
                <span className="text-xs text-ink-subtle">
                  {phase.milestones.filter((m) => m.done).length}/{phase.milestones.length} done
                </span>
              </div>
            </div>

            {/* Milestones */}
            <div className="relative ml-6">
              {/* Vertical connector */}
              <div className="absolute left-5 top-0 bottom-0 w-0.5" style={{ background: `${roadmap.color}20` }} />

              <div className="space-y-3">
                {phase.milestones.map((milestone, mIdx) => {
                  const typeConfig = TYPE_CONFIG[milestone.type] || TYPE_CONFIG.lesson;
                  const TypeIcon = typeConfig.icon;

                  return (
                    <div
                      key={milestone.id}
                      className={`relative flex items-start gap-4 p-4 rounded-2xl border transition-all ${
                        milestone.done
                          ? "bg-surface-1 border-surface-3"
                          : milestone.locked
                          ? "bg-white border-surface-2 opacity-50"
                          : "bg-white border-surface-3 hover:border-slate-300 hover:shadow-sm"
                      }`}
                    >
                      {/* Timeline dot */}
                      <div className="absolute -left-[22px] top-5 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center"
                        style={{ background: milestone.done ? roadmap.color : milestone.locked ? "#e2e8f0" : "#fff", borderColor: milestone.done ? roadmap.color : milestone.locked ? "#e2e8f0" : roadmap.color }}
                      >
                        {milestone.done && <CheckCircle2 size={8} className="text-white" />}
                        {!milestone.done && !milestone.locked && <div className="w-1.5 h-1.5 rounded-full" style={{ background: roadmap.color }} />}
                        {milestone.locked && <Lock size={7} className="text-slate-400" />}
                      </div>

                      {/* Type icon */}
                      <div className={`w-9 h-9 rounded-xl ${typeConfig.bg} flex items-center justify-center shrink-0`}>
                        <TypeIcon size={16} className={typeConfig.color} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className={`font-semibold text-sm ${milestone.done ? "text-ink-muted line-through" : "text-ink"}`}>
                              {milestone.title}
                            </h3>
                            <p className="text-xs text-ink-subtle mt-0.5">{milestone.desc}</p>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${typeConfig.bg} ${typeConfig.color}`}>
                              {typeConfig.label}
                            </span>
                            {milestone.done && <CheckCircle2 size={15} className="text-cyan-600 dark:text-cyan-400" />}
                            {milestone.locked && <Lock size={13} className="text-slate-300" />}
                          </div>
                        </div>

                        {!milestone.locked && !milestone.done && (
                          <Link
                            href={milestone.href}
                            className="inline-flex items-center gap-1 mt-2 text-xs font-semibold transition-colors hover:gap-2"
                            style={{ color: roadmap.color }}
                          >
                            Start <ChevronRight size={12} />
                          </Link>
                        )}
                        {milestone.done && (
                          <span className="inline-flex items-center gap-1 mt-1 text-xs text-ink-subtle">
                            <CheckCircle2 size={11} className="text-cyan-600 dark:text-cyan-400" /> Completed
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-12 p-8 rounded-3xl text-white text-center" style={{ background: `linear-gradient(135deg, ${roadmap.color}, ${roadmap.color}bb)` }}>
        <h2 className="font-display font-bold text-2xl mb-2">Continue Your Journey</h2>
        <p className="text-white/80 mb-5 text-sm">
          {doneMilestones === 0
            ? "Start your first milestone and begin building your PM career."
            : `You've completed ${doneMilestones} milestones. Keep the momentum going!`}
        </p>
        <Link
          href={ROADMAPS[activeLevel].phases[0].milestones.find((m) => !m.done && !m.locked)?.href ?? "/dashboard"}
          className="inline-flex items-center gap-2 bg-white font-semibold px-8 py-3 rounded-xl hover:bg-slate-50 transition-colors text-sm"
          style={{ color: roadmap.color }}
        >
          {doneMilestones === 0 ? "Begin Roadmap" : "Next Milestone"} <ArrowRight size={16} />
        </Link>
      </div>
    </div>
    </MarketingShell>
  );
}
