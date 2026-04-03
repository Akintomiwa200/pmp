// app/community/network/page.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import { Users, MessageSquare, Star, Globe, Briefcase, Filter, UserPlus, CheckCircle2, Zap } from "lucide-react";

const COMMUNITY_MEMBERS = [
  { id: "usr_002", name: "Priya Sharma", avatar: "P", level: "intermediate", location: "London, UK", goals: ["Master Agile", "Lead cross-functional teams"], interests: ["Agile", "Stakeholder Mgmt"], streak: 30, points: 4560, isMentor: false, mutualConnections: 3, connected: true },
  { id: "usr_003", name: "Marcus Johnson", avatar: "M", level: "advanced", location: "Toronto, CA", goals: ["Mentor 10 PMs"], interests: ["PMP Prep", "Enterprise PM"], streak: 90, points: 12800, isMentor: true, mutualConnections: 1, connected: false },
  { id: "usr_004", name: "Dr. Amira Hassan", avatar: "A", level: "advanced", location: "London, UK", goals: ["Share risk management expertise"], interests: ["Risk Mgmt", "PRINCE2"], streak: 45, points: 8900, isMentor: true, mutualConnections: 2, connected: false },
  { id: "usr_005", name: "Emma Wilson", avatar: "E", level: "intermediate", location: "New York, USA", goals: ["Land senior PM role"], interests: ["Agile", "Product Management"], streak: 18, points: 2800, isMentor: false, mutualConnections: 4, connected: false },
  { id: "usr_006", name: "James Okafor", avatar: "J", level: "intermediate", location: "Lagos, NG", goals: ["Remote PM specialist"], interests: ["Scrum", "Remote Teams"], streak: 25, points: 3400, isMentor: true, mutualConnections: 0, connected: false },
  { id: "usr_007", name: "Sofia Martinez", avatar: "S", level: "beginner", location: "Madrid, Spain", goals: ["Get CAPM certified"], interests: ["PM Basics", "Agile"], streak: 12, points: 980, isMentor: false, mutualConnections: 2, connected: false },
];

const LEVEL_COLORS: Record<string, string> = { beginner: "#16a34a", intermediate: "#2563eb", advanced: "#7c3aed" };

export default function NetworkPage() {
  const [connections, setConnections] = useState<Record<string, boolean>>({ usr_002: true });
  const [filter, setFilter] = useState("all");
  const [msgOpen, setMsgOpen] = useState<string | null>(null);

  const filtered = COMMUNITY_MEMBERS.filter(m => {
    if (filter === "mentors") return m.isMentor;
    if (filter === "connected") return connections[m.id];
    if (filter === "beginner" || filter === "intermediate" || filter === "advanced") return m.level === filter;
    return true;
  });

  const handleConnect = (id: string) => setConnections(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="section-tag mb-3"><Users size={12} />Networking</p>
          <h1 className="text-4xl font-display font-bold text-ink mb-2">PM Network</h1>
          <p className="text-ink-muted max-w-xl">Connect with fellow PM learners, mentors, and industry professionals.</p>
        </div>
        <Link href="/mentorship/match" className="btn-primary text-sm">
          <Zap size={14} /> AI Mentor Match
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "Your Connections", value: Object.values(connections).filter(Boolean).length },
          { label: "Community Members", value: "12,847" },
          { label: "Mentors Available", value: COMMUNITY_MEMBERS.filter(m => m.isMentor).length },
        ].map(s => (
          <div key={s.label} className="card p-4 text-center">
            <p className="text-2xl font-display font-bold text-ink">{s.value}</p>
            <p className="text-xs text-ink-subtle">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { id: "all", label: "All Members" },
          { id: "connected", label: "Connected" },
          { id: "mentors", label: "Mentors Only" },
          { id: "beginner", label: "Beginners" },
          { id: "intermediate", label: "Intermediate" },
          { id: "advanced", label: "Advanced" },
        ].map(f => (
          <button key={f.id} onClick={() => setFilter(f.id)}
            className={`px-4 py-2 rounded-full text-xs font-medium border transition-all ${filter === f.id ? "bg-ink text-white border-ink" : "bg-white text-ink-muted border-surface-3 hover:border-ink/30"}`}>
            {f.label}
          </button>
        ))}
      </div>

      {/* Member cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(member => {
          const isConnected = connections[member.id];
          const lc = LEVEL_COLORS[member.level];
          return (
            <div key={member.id} className={`card-hover p-5 space-y-4 ${isConnected ? "border-brand-200 bg-brand-50/20" : ""}`}>
              {/* Top row */}
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white text-lg font-bold shrink-0" style={{ background: `linear-gradient(135deg, ${lc}, ${lc}cc)` }}>
                  {member.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-ink text-sm">{member.name}</h3>
                      <p className="text-xs text-ink-subtle flex items-center gap-1"><Globe size={10} />{member.location}</p>
                    </div>
                    {member.isMentor && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 shrink-0">Mentor</span>
                    )}
                  </div>
                  <span className="text-[10px] font-bold capitalize mt-1 inline-block px-2 py-0.5 rounded-full" style={{ background: lc + "15", color: lc }}>
                    {member.level}
                  </span>
                </div>
              </div>

              {/* Interests */}
              <div className="flex flex-wrap gap-1.5">
                {member.interests.map(i => (
                  <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-surface-1 border border-surface-3 text-ink-muted">{i}</span>
                ))}
              </div>

              {/* Stats */}
              <div className="flex gap-3 text-xs text-ink-subtle">
                <span className="flex items-center gap-1">🔥 {member.streak}d</span>
                <span className="flex items-center gap-1">⭐ {member.points.toLocaleString()} pts</span>
                {member.mutualConnections > 0 && (
                  <span className="flex items-center gap-1"><Users size={10} />{member.mutualConnections} mutual</span>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-1">
                {isConnected ? (
                  <>
                    <button onClick={() => setMsgOpen(member.id)} className="btn-primary flex-1 justify-center text-xs py-2">
                      <MessageSquare size={12} /> Message
                    </button>
                    <button onClick={() => handleConnect(member.id)} className="btn-ghost text-xs py-2 px-3 text-red-500 hover:bg-red-50">
                      <CheckCircle2 size={12} />
                    </button>
                  </>
                ) : (
                  <button onClick={() => handleConnect(member.id)} className="btn-secondary flex-1 justify-center text-xs py-2">
                    <UserPlus size={12} /> Connect
                  </button>
                )}
                {member.isMentor && (
                  <Link href={`/mentorship/${member.id}`} className="btn-ghost text-xs py-2 px-3">
                    <Briefcase size={12} />
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Message modal */}
      {msgOpen && (
        <div className="fixed inset-0 bg-ink/50 z-50 flex items-center justify-center p-4">
          <div className="card p-6 w-full max-w-md space-y-4 animate-slide-up">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-ink">Send Message</h2>
              <button onClick={() => setMsgOpen(null)} className="p-2 hover:bg-surface-1 rounded-lg text-ink-muted">✕</button>
            </div>
            <p className="text-sm text-ink-muted">To: {COMMUNITY_MEMBERS.find(m => m.id === msgOpen)?.name}</p>
            <textarea className="input h-28 resize-none text-sm" placeholder="Write your message..." />
            <div className="flex gap-3">
              <button onClick={() => setMsgOpen(null)} className="btn-secondary flex-1 justify-center">Cancel</button>
              <button onClick={() => setMsgOpen(null)} className="btn-primary flex-1 justify-center">Send Message</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
