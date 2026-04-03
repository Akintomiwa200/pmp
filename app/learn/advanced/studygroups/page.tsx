// app/learn/advanced/studygroups/page.tsx
"use client";
import { useState } from "react";
import { Users, Video, Calendar, Clock, Plus, CheckCircle2, Globe, MessageSquare } from "lucide-react";

const STUDY_GROUPS = [
  {
    id: "sg_001",
    name: "PMP Week 1–4 Study Circle",
    host: "Marcus Johnson, PMP",
    schedule: "Every Tuesday · 7:00 PM EST",
    nextSession: "Apr 1, 2025 · 7:00 PM EST",
    topic: "PMBOK 7 Principles + EVM Formulas",
    members: 18,
    maxMembers: 25,
    format: "Video Call (Zoom)",
    level: "advanced",
    description: "Structured weekly sessions covering one PMBOK knowledge area per meeting. Pre-reading materials shared 48h in advance. Includes mock Q&A.",
    joined: true,
    agenda: ["PMBOK 7 — 12 Principles recap", "EVM formula drill (15 min)", "Practice questions group challenge", "Open Q&A"],
  },
  {
    id: "sg_002",
    name: "EVM Deep Dive Group",
    host: "Dr. Amira Hassan",
    schedule: "Every Saturday · 10:00 AM GMT",
    nextSession: "Apr 5, 2025 · 10:00 AM GMT",
    topic: "Earned Value Management Mastery",
    members: 12,
    maxMembers: 15,
    format: "Video Call (Google Meet)",
    level: "advanced",
    description: "Intense focus on EVM calculations, earned value formulas, and scenario-based practice. For those who struggle with EVM on the mock exams.",
    joined: false,
    agenda: ["CPI/SPI calculations", "BAC, EAC, ETC practice", "Scenario questions", "Formula memorisation techniques"],
  },
  {
    id: "sg_003",
    name: "CAPM Study Buddy Group",
    host: "Community-led",
    schedule: "Every Sunday · 2:00 PM EST",
    nextSession: "Apr 6, 2025 · 2:00 PM EST",
    topic: "CAPM Exam Prep",
    members: 9,
    maxMembers: 20,
    format: "Video Call (Zoom)",
    level: "advanced",
    description: "For CAPM candidates. Covers all PMBOK fundamentals, practice questions, and experience sharing from recent exam takers.",
    joined: false,
    agenda: ["PMBOK process groups", "Practice questions (20 min)", "Exam tips from recent test takers", "Q&A"],
  },
  {
    id: "sg_004",
    name: "Agile Hybrid Practitioners",
    host: "Lisa Park",
    schedule: "Bi-weekly Thursday · 6:00 PM PST",
    nextSession: "Apr 10, 2025 · 6:00 PM PST",
    topic: "Agile, Hybrid & Adaptive Approaches",
    members: 14,
    maxMembers: 20,
    format: "Video Call (Zoom)",
    level: "advanced",
    description: "Focus on Agile and hybrid approaches in PMBOK 7. Great for those from an Agile background preparing for PMP.",
    joined: false,
    agenda: ["Agile manifesto vs PMBOK 7", "Hybrid project scenarios", "Real-world case discussions", "Mock exam questions"],
  },
];

export default function StudyGroupsPage() {
  const [joined, setJoined] = useState<Record<string, boolean>>({ sg_001: true });

  const handleJoin = (id: string) => {
    setJoined((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="section-tag mb-3"><Users size={12} />Study Groups</p>
          <h1 className="text-4xl font-display font-bold text-ink mb-2">PMP Study Groups</h1>
          <p className="text-ink-muted max-w-xl">
            Join virtual study sessions with fellow PMP candidates. Accountability, peer learning, and expert-facilitated discussion.
          </p>
        </div>
        <button className="btn-primary text-sm">
          <Plus size={14} /> Create Group
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Active Groups", value: STUDY_GROUPS.length, icon: Users },
          { label: "Total Members", value: STUDY_GROUPS.reduce((a, g) => a + g.members, 0), icon: Users },
          { label: "Sessions This Week", value: 4, icon: Calendar },
          { label: "Joined", value: Object.values(joined).filter(Boolean).length, icon: CheckCircle2 },
        ].map((s) => (
          <div key={s.label} className="card p-4">
            <p className="text-2xl font-display font-bold text-ink">{s.value}</p>
            <p className="text-xs text-ink-subtle">{s.label}</p>
          </div>
        ))}
      </div>

      {/* My groups first */}
      {Object.values(joined).some(Boolean) && (
        <div className="mb-8">
          <h2 className="font-semibold text-ink mb-4">📅 Your Upcoming Sessions</h2>
          {STUDY_GROUPS.filter((g) => joined[g.id]).map((group) => (
            <div key={group.id} className="card p-5 mb-3 bg-brand-50 border-brand-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-ink">{group.name}</h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-100 text-brand-700 border border-brand-200">Joined ✓</span>
                  </div>
                  <p className="text-sm text-ink-muted flex items-center gap-1.5">
                    <Calendar size={12} /> Next: {group.nextSession}
                  </p>
                  <p className="text-xs text-ink-subtle mt-0.5">Topic: {group.topic}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button className="btn-primary text-xs py-2 px-4">
                    <Video size={13} /> Join Call
                  </button>
                  <button className="btn-ghost text-xs py-2 px-3">Agenda</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* All groups */}
      <h2 className="font-semibold text-ink mb-4">All Study Groups</h2>
      <div className="grid md:grid-cols-2 gap-5">
        {STUDY_GROUPS.map((group) => {
          const isJoined = joined[group.id];
          const spotsLeft = group.maxMembers - group.members;
          const fillPct = Math.round((group.members / group.maxMembers) * 100);

          return (
            <div key={group.id} className={`card-hover p-6 space-y-4 ${isJoined ? "border-brand-200 bg-brand-50/30" : ""}`}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-ink mb-0.5">{group.name}</h3>
                  <p className="text-xs text-ink-subtle">Hosted by {group.host}</p>
                </div>
                {isJoined && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-50 text-brand-700 border border-brand-200 shrink-0">
                    ✓ Joined
                  </span>
                )}
              </div>

              <p className="text-sm text-ink-muted leading-relaxed">{group.description}</p>

              {/* Schedule + format */}
              <div className="space-y-1.5 text-xs text-ink-muted">
                <div className="flex items-center gap-1.5"><Clock size={11} />{group.schedule}</div>
                <div className="flex items-center gap-1.5"><Calendar size={11} />Next: {group.nextSession}</div>
                <div className="flex items-center gap-1.5"><Video size={11} />{group.format}</div>
                <div className="flex items-center gap-1.5"><Globe size={11} />{group.topic}</div>
              </div>

              {/* Agenda preview */}
              <div className="p-3 bg-surface-1 rounded-xl">
                <p className="text-[10px] font-bold text-ink-subtle uppercase tracking-wide mb-2">This week's agenda</p>
                <ol className="space-y-1">
                  {group.agenda.map((item, i) => (
                    <li key={item} className="flex items-center gap-2 text-xs text-ink-muted">
                      <span className="w-4 h-4 rounded-full bg-surface-2 flex items-center justify-center text-[9px] font-bold text-ink shrink-0">{i + 1}</span>
                      {item}
                    </li>
                  ))}
                </ol>
              </div>

              {/* Capacity */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-ink-subtle">{group.members}/{group.maxMembers} members</span>
                  <span className={spotsLeft <= 3 ? "text-red-500 font-semibold" : "text-ink-subtle"}>
                    {spotsLeft} spots left
                  </span>
                </div>
                <div className="h-1.5 bg-surface-2 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-500 rounded-full" style={{ width: `${fillPct}%` }} />
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-1">
                {isJoined ? (
                  <>
                    <button className="btn-primary flex-1 justify-center text-sm">
                      <Video size={14} /> Join Next Session
                    </button>
                    <button onClick={() => handleJoin(group.id)} className="btn-ghost text-sm text-red-500 hover:bg-red-50 px-3">
                      Leave
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleJoin(group.id)}
                      disabled={spotsLeft === 0}
                      className="btn-primary flex-1 justify-center text-sm disabled:opacity-50"
                    >
                      <Users size={14} /> {spotsLeft === 0 ? "Full" : "Join Group"}
                    </button>
                    <button className="btn-ghost text-sm px-3">
                      <MessageSquare size={14} />
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Create group CTA */}
      <div className="mt-10 p-8 rounded-3xl bg-advanced-light border border-advanced/20 text-center">
        <h2 className="font-display font-bold text-xl text-ink mb-2">Start Your Own Study Group</h2>
        <p className="text-ink-muted text-sm mb-5 max-w-md mx-auto">
          Can't find a group that fits your schedule? Create one. We'll help you find members from our community.
        </p>
        <button className="btn-primary" style={{ background: "#7c3aed" }}>
          <Plus size={15} /> Create a Study Group
        </button>
      </div>
    </div>
  );
}
