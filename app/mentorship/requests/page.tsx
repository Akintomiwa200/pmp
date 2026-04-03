// app/mentorship/requests/page.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, X, Clock, MessageSquare, Star, ChevronRight } from "lucide-react";

const REQUESTS = [
  {
    id: "req_001", type: "outgoing", status: "accepted",
    otherName: "Marcus Johnson", otherAvatar: "M", otherLevel: "advanced",
    message: "Hi Marcus! I'm a marketing professional transitioning into PM. I'd love guidance on PMP prep and building my first PM portfolio.",
    goals: ["Get PMP certified", "Land my first PM role"],
    createdAt: "Mar 22, 2025", respondedAt: "Mar 23, 2025",
    sessionBooked: false,
  },
  {
    id: "req_incoming_1", type: "incoming", status: "pending",
    otherName: "Jordan Lee", otherAvatar: "J", otherLevel: "beginner",
    message: "I've been following your community posts and really respect your perspective. Would love to be your mentee for PMP prep!",
    goals: ["Get PMP certified", "Understand Agile"],
    createdAt: "Mar 27, 2025", respondedAt: null,
    sessionBooked: false,
  },
];

const STATUS_CONFIG = {
  accepted: { label: "Accepted ✓", bg: "bg-brand-50 border-brand-200 text-brand-800" },
  pending: { label: "Pending ⏳", bg: "bg-amber-50 border-amber-200 text-amber-800" },
  declined: { label: "Declined", bg: "bg-red-50 border-red-200 text-red-800" },
};

export default function MentorshipRequestsPage() {
  const [requests, setRequests] = useState(REQUESTS);

  const respond = (id: string, action: "accept" | "decline") => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: action === "accept" ? "accepted" : "declined", respondedAt: "Just now" } : r));
  };

  const outgoing = requests.filter(r => r.type === "outgoing");
  const incoming = requests.filter(r => r.type === "incoming");

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-ink mb-2">Mentorship Requests</h1>
        <p className="text-ink-muted">Manage your mentorship connections and requests.</p>
      </div>

      {/* Outgoing requests */}
      {outgoing.length > 0 && (
        <section className="mb-8">
          <h2 className="font-semibold text-ink mb-4">My Requests ({outgoing.length})</h2>
          <div className="space-y-4">
            {outgoing.map(req => {
              const sc = STATUS_CONFIG[req.status as keyof typeof STATUS_CONFIG];
              return (
                <div key={req.id} className="card p-5 space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-brand-400 to-brand-700 flex items-center justify-center text-white text-sm font-bold shrink-0">
                      {req.otherAvatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-semibold text-ink">{req.otherName}</h3>
                          <p className="text-xs text-ink-subtle">Sent {req.createdAt}</p>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${sc.bg}`}>{sc.label}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-surface-1 rounded-xl border border-surface-2">
                    <p className="text-sm text-ink-muted italic">"{req.message}"</p>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {req.goals.map(g => (
                      <span key={g} className="text-[10px] px-2 py-0.5 rounded-full bg-surface-1 border border-surface-3 text-ink-muted">{g}</span>
                    ))}
                  </div>

                  {req.status === "accepted" && (
                    <div className="flex gap-2 pt-1 border-t border-surface-2">
                      <Link href={`/mentorship/${req.otherName.toLowerCase().replace(" ", "_")}`} className="btn-primary text-sm py-2 px-4">
                        Book a Session <ChevronRight size={13} />
                      </Link>
                      <button className="btn-secondary text-sm py-2 px-3">
                        <MessageSquare size={13} /> Message
                      </button>
                    </div>
                  )}
                  {req.status === "pending" && (
                    <p className="text-xs text-ink-subtle flex items-center gap-1.5"><Clock size={11} />Awaiting response from {req.otherName}. Usually within 48 hours.</p>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Incoming requests (for mentors) */}
      {incoming.length > 0 && (
        <section className="mb-8">
          <h2 className="font-semibold text-ink mb-4 flex items-center gap-2">
            Mentee Requests
            <span className="w-5 h-5 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center">{incoming.filter(r => r.status === "pending").length}</span>
          </h2>
          <div className="space-y-4">
            {incoming.map(req => {
              const sc = STATUS_CONFIG[req.status as keyof typeof STATUS_CONFIG];
              return (
                <div key={req.id} className={`card p-5 space-y-4 ${req.status === "pending" ? "border-amber-200 bg-amber-50/30" : ""}`}>
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-700 flex items-center justify-center text-white text-sm font-bold shrink-0">
                      {req.otherAvatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-semibold text-ink">{req.otherName}</h3>
                          <p className="text-xs text-ink-subtle capitalize">{req.otherLevel} level · {req.createdAt}</p>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${sc.bg}`}>{sc.label}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-surface-2">
                    <p className="text-sm text-ink-muted">"{req.message}"</p>
                  </div>

                  <div>
                    <p className="text-[10px] text-ink-subtle font-semibold uppercase mb-2">Their goals:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {req.goals.map(g => (
                        <span key={g} className="text-[10px] px-2 py-0.5 rounded-full bg-surface-1 border border-surface-3 text-ink-muted">{g}</span>
                      ))}
                    </div>
                  </div>

                  {req.status === "pending" && (
                    <div className="flex gap-3 pt-1 border-t border-surface-2">
                      <button onClick={() => respond(req.id, "accept")} className="btn-primary flex-1 justify-center text-sm py-2.5">
                        <CheckCircle2 size={14} /> Accept Request
                      </button>
                      <button onClick={() => respond(req.id, "decline")} className="btn-secondary flex-1 justify-center text-sm py-2.5 text-red-500 hover:bg-red-50">
                        <X size={14} /> Decline
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* CTA to find mentors */}
      <div className="card p-6 bg-brand-50 border-brand-100 text-center">
        <h3 className="font-semibold text-ink mb-2">Looking for a mentor?</h3>
        <p className="text-sm text-ink-muted mb-4">Use our AI matching to find the perfect PM mentor for your goals.</p>
        <div className="flex gap-3 justify-center">
          <Link href="/mentorship/match" className="btn-primary text-sm">
            <Star size={14} /> Find My Match
          </Link>
          <Link href="/mentorship" className="btn-secondary text-sm">Browse All Mentors</Link>
        </div>
      </div>
    </div>
  );
}
