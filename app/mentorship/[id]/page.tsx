// app/mentorship/[id]/page.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Star, Clock, Globe, Calendar, MessageSquare, Video, CheckCircle2, Award, Users } from "lucide-react";

const DEMO_MENTOR = {
  _id: "mentor_001",
  mentorName: "Marcus Johnson",
  expertise: ["PMP Prep","Agile Transformation","Stakeholder Management","Enterprise PM"],
  industry: ["Technology","Finance"],
  availability: "2 hours/week",
  sessionFormat: ["video","chat"],
  rating: 4.9,
  reviewCount: 14,
  menteeCount: 3,
  maxMentees: 5,
  bio: "PMP-certified with 8 years leading enterprise software projects at Fortune 500 companies. Before becoming a mentor, I spent years struggling to find guidance on my own PM journey. I know what it takes to make the switch, pass the PMP, and thrive in complex organisations. I'm here to shortcut that journey for you.",
  languages: ["English"],
  timezone: "EST",
  isAccepting: true,
  yearsExp: 8,
  location: "Toronto, Canada",
  successStories: 12,
  badge: "Top Mentor",
  reviews: [
    { author: "Priya S.", rating: 5, text: "Marcus gave me exactly the clarity I needed. After 2 sessions I had a clear 6-month PMP study plan.", date: "Feb 2025" },
    { author: "Jordan L.", rating: 5, text: "Incredibly generous with his time and very direct. He helped me land my first PM internship.", date: "Jan 2025" },
    { author: "Alex R.", rating: 5, text: "Best mentor on the platform. He has real experience and doesn't just give generic advice.", date: "Mar 2025" },
  ],
  sessionTypes: [
    { name: "Introduction Call", duration: "30 min", desc: "Get to know each other and define your goals", price: "Free" },
    { name: "Study Strategy Session", duration: "60 min", desc: "Build your personalised PMP study plan", price: "$0 (free for members)" },
    { name: "Monthly Mentorship", duration: "2 hrs/mo", desc: "Ongoing 1-on-1 mentorship with accountability", price: "Included with Premium" },
  ],
};

export default function MentorProfilePage({ params }: { params: { id: string } }) {
  const [requestSent, setRequestSent] = useState(false);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link href="/mentorship" className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-ink mb-6 transition-colors">
        <ChevronLeft size={15} /> Back to Mentors
      </Link>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <div className="card p-6">
            <div className="flex items-start gap-5">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-brand-400 to-brand-700 flex items-center justify-center text-white text-3xl font-bold shrink-0">M</div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h1 className="text-2xl font-display font-bold text-ink">{DEMO_MENTOR.mentorName}</h1>
                  {DEMO_MENTOR.badge && <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 shrink-0">⭐ {DEMO_MENTOR.badge}</span>}
                </div>
                <p className="text-ink-muted text-sm mb-2 flex items-center gap-1.5"><Globe size={13} />{DEMO_MENTOR.location} · {DEMO_MENTOR.timezone}</p>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-0.5">
                    {[1,2,3,4,5].map(i => <Star key={i} size={13} className={i <= Math.round(DEMO_MENTOR.rating) ? "fill-amber-400 text-amber-400" : "text-surface-3"} />)}
                  </div>
                  <span className="text-sm font-bold text-ink">{DEMO_MENTOR.rating}</span>
                  <span className="text-sm text-ink-subtle">({DEMO_MENTOR.reviewCount} reviews)</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {DEMO_MENTOR.expertise.map(e => <span key={e} className="text-xs px-2.5 py-1 rounded-full bg-surface-1 border border-surface-3 font-medium text-ink">{e}</span>)}
                </div>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="card p-5">
            <h2 className="font-display font-bold text-xl text-ink mb-3">About</h2>
            <p className="text-sm text-ink-muted leading-relaxed">{DEMO_MENTOR.bio}</p>
          </div>

          {/* Session types */}
          <div className="card p-5">
            <h2 className="font-display font-bold text-xl text-ink mb-4">Session Types</h2>
            <div className="space-y-3">
              {DEMO_MENTOR.sessionTypes.map((session) => (
                <div key={session.name} className="flex items-center gap-4 p-4 bg-surface-1 rounded-xl border border-surface-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center shrink-0">
                    <Calendar size={18} className="text-brand-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-ink text-sm">{session.name}</p>
                    <p className="text-xs text-ink-subtle mt-0.5">{session.duration} · {session.desc}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-brand-600">{session.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div className="card p-5">
            <h2 className="font-display font-bold text-xl text-ink mb-4">Mentee Reviews</h2>
            <div className="space-y-4">
              {DEMO_MENTOR.reviews.map((review) => (
                <div key={review.author} className="flex gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white text-xs font-bold shrink-0">{review.author.charAt(0)}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-sm text-ink">{review.author}</span>
                      <div className="flex items-center gap-0.5">{[1,2,3,4,5].map(i => <Star key={i} size={11} className="fill-amber-400 text-amber-400" />)}</div>
                      <span className="text-xs text-ink-subtle">{review.date}</span>
                    </div>
                    <p className="text-sm text-ink-muted">"{review.text}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="card p-5 space-y-4">
            {/* Spots */}
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-ink-subtle">Mentee spots</span>
                <span className="font-medium text-ink">{DEMO_MENTOR.maxMentees - DEMO_MENTOR.menteeCount} remaining</span>
              </div>
              <div className="h-2 bg-surface-2 rounded-full overflow-hidden">
                <div className="h-full bg-brand-500 rounded-full" style={{ width: `${(DEMO_MENTOR.menteeCount / DEMO_MENTOR.maxMentees) * 100}%` }} />
              </div>
            </div>

            {requestSent ? (
              <div className="p-3 bg-brand-50 border border-brand-200 rounded-xl text-center">
                <CheckCircle2 size={20} className="text-brand-600 mx-auto mb-1" />
                <p className="text-sm font-semibold text-brand-700">Request Sent!</p>
                <p className="text-xs text-ink-muted mt-0.5">Marcus will respond within 48 hours</p>
              </div>
            ) : (
              <button onClick={() => setRequestSent(true)} className="btn-primary w-full justify-center">
                <Calendar size={15} /> Request Session
              </button>
            )}
            <button className="btn-secondary w-full justify-center text-sm">
              <MessageSquare size={14} /> Send Message
            </button>
          </div>

          {/* Stats */}
          <div className="card p-5">
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Clock, label: "Experience", value: `${DEMO_MENTOR.yearsExp} years` },
                { icon: Users, label: "Active Mentees", value: `${DEMO_MENTOR.menteeCount}/${DEMO_MENTOR.maxMentees}` },
                { icon: Award, label: "Success Stories", value: DEMO_MENTOR.successStories },
                { icon: Star, label: "Rating", value: DEMO_MENTOR.rating },
              ].map((s) => (
                <div key={s.label} className="text-center p-3 bg-surface-1 rounded-xl">
                  <s.icon size={15} className="text-brand-600 mx-auto mb-1" />
                  <p className="text-sm font-bold text-ink">{s.value}</p>
                  <p className="text-[10px] text-ink-subtle">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-4">
            <p className="text-xs text-ink-muted leading-relaxed">
              <span className="flex items-center gap-1.5 font-semibold text-ink mb-1">
                {DEMO_MENTOR.sessionFormat.includes("video") && <><Video size={12} className="text-brand-600" />Video calls</>}
              </span>
              {DEMO_MENTOR.sessionFormat.includes("chat") && "💬 Chat sessions available"}<br />
              🌐 {DEMO_MENTOR.languages.join(", ")}<br />
              🕐 Available {DEMO_MENTOR.availability}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
