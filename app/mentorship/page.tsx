// app/mentorship/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { Users, Star, Clock, MessageSquare, Video, Check, Zap, Calendar, Globe } from "lucide-react";
import { getMentors } from "@/lib/db";

export const metadata: Metadata = { title: "Mentorship" };

export default async function MentorshipPage() {
  const mentors = await getMentors();

  const DEMO_MENTORS = [
    {
      _id: "mentor_001", mentorId: "usr_003", mentorName: "Marcus Johnson", mentorAvatar: null,
      expertise: ["PMP Prep", "Agile Transformation", "Stakeholder Management", "Enterprise PM"],
      industry: ["Technology", "Finance"], availability: "2 hours/week",
      sessionFormat: ["video", "chat"], rating: 4.9, reviewCount: 14,
      menteeCount: 3, maxMentees: 5, bio: "PMP-certified with 8 years leading enterprise software projects at Fortune 500 companies. I've been where you are and know the path forward.",
      languages: ["English"], timezone: "EST", isAccepting: true,
      yearsExp: 8, location: "Toronto, Canada", successStories: 12, badge: "Top Mentor"
    },
    {
      _id: "mentor_002", mentorId: "usr_004", mentorName: "Dr. Amira Hassan", mentorAvatar: null,
      expertise: ["Risk Management", "PRINCE2", "Agile", "Change Management"],
      industry: ["Healthcare", "Government"], availability: "3 hours/week",
      sessionFormat: ["video", "chat", "in-person"], rating: 5.0, reviewCount: 22,
      menteeCount: 4, maxMentees: 5, bio: "PRINCE2 Practitioner and certified risk management expert. Former NHS project lead, now passionate about helping others build PM careers in regulated sectors.",
      languages: ["English", "Arabic"], timezone: "GMT", isAccepting: true,
      yearsExp: 12, location: "London, UK", successStories: 18, badge: "Expert"
    },
    {
      _id: "mentor_003", mentorId: "usr_005", mentorName: "Lisa Park", mentorAvatar: null,
      expertise: ["Stakeholder Communication", "Scrum", "Product Management", "Career Coaching"],
      industry: ["Tech Startup", "E-commerce"], availability: "1 hour/week",
      sessionFormat: ["video", "chat"], rating: 4.8, reviewCount: 9,
      menteeCount: 2, maxMentees: 3, bio: "4 years pivoting from UX design to senior PM. Specialized in helping career switchers navigate the tech PM job market.",
      languages: ["English", "Korean"], timezone: "PST", isAccepting: true,
      yearsExp: 4, location: "San Francisco, USA", successStories: 7, badge: "Rising Star"
    },
    {
      _id: "mentor_004", mentorId: "usr_006", mentorName: "James Okafor", mentorAvatar: null,
      expertise: ["Agile", "Scrum Master", "Team Building", "Remote PM"],
      industry: ["Technology", "NGO"], availability: "2 hours/week",
      sessionFormat: ["video"], rating: 4.7, reviewCount: 6,
      menteeCount: 1, maxMentees: 4, bio: "Certified Scrum Master and remote-first PM. Helping teams and individuals thrive in distributed environments across Africa and Europe.",
      languages: ["English", "French", "Yoruba"], timezone: "WAT", isAccepting: true,
      yearsExp: 6, location: "Lagos, Nigeria", successStories: 5, badge: null
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="text-center mb-14">
        <p className="section-tag mb-3 justify-center"><Zap size={12} />AI-Powered Matching</p>
        <h1 className="text-5xl font-display font-bold text-ink mb-4">Find Your PM Mentor</h1>
        <p className="text-ink-muted max-w-2xl mx-auto text-lg">
          Get paired with experienced Project Managers who have walked the path you're on. 1-on-1 guidance, accountability, and real-world insight.
        </p>
      </div>

      {/* How it works */}
      <div className="grid sm:grid-cols-3 gap-6 mb-14">
        {[
          { step: "1", title: "Tell Us Your Goals", desc: "Share your current level, industry interest, and what you want to achieve in PM.", icon: "🎯" },
          { step: "2", title: "Get AI-Matched", desc: "Our algorithm pairs you with mentors whose experience, availability, and style fits your goals.", icon: "🤖" },
          { step: "3", title: "Start Growing", desc: "Book your first session, set milestones, and track your progress together.", icon: "🚀" },
        ].map((s) => (
          <div key={s.step} className="card p-6 text-center space-y-3">
            <span className="text-4xl">{s.icon}</span>
            <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 font-bold text-sm flex items-center justify-center mx-auto">
              {s.step}
            </div>
            <h3 className="font-semibold text-ink">{s.title}</h3>
            <p className="text-sm text-ink-muted">{s.desc}</p>
          </div>
        ))}
      </div>

      {/* CTA banner */}
      <div className="mb-10 p-6 rounded-3xl bg-gradient-to-r from-brand-600 to-emerald-500 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-bold text-xl mb-1">Get Your AI Match</h2>
          <p className="text-white/80 text-sm">Answer 5 quick questions and we'll find your ideal mentor in seconds.</p>
        </div>
        <button className="bg-white text-brand-700 font-semibold px-6 py-3 rounded-xl hover:bg-brand-50 transition-colors shrink-0">
          Find My Mentor →
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {["All Mentors", "PMP Prep", "Agile", "Career Switch", "Risk Management", "Available Now"].map((f, i) => (
          <button key={f} className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${i === 0 ? "bg-ink text-white border-ink" : "bg-white text-ink-muted border-surface-3 hover:border-ink/30"}`}>
            {f}
          </button>
        ))}
      </div>

      {/* Mentor cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {DEMO_MENTORS.map((mentor) => (
          <div key={mentor._id} className="card-hover p-6 space-y-5">
            {/* Top */}
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-400 to-brand-700 flex items-center justify-center text-white text-xl font-bold shrink-0">
                {mentor.mentorName.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-ink">{mentor.mentorName}</h3>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <Globe size={11} className="text-ink-subtle" />
                      <span className="text-xs text-ink-subtle">{mentor.location}</span>
                    </div>
                  </div>
                  {mentor.badge && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 shrink-0">
                      ⭐ {mentor.badge}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} size={11} className={i <= Math.round(mentor.rating) ? "fill-amber-400 text-amber-400" : "text-surface-3"} />
                    ))}
                    <span className="text-xs font-medium text-ink ml-1">{mentor.rating}</span>
                  </div>
                  <span className="text-xs text-ink-subtle">({mentor.reviewCount} reviews)</span>
                </div>
              </div>
            </div>

            {/* Bio */}
            <p className="text-sm text-ink-muted leading-relaxed">{mentor.bio}</p>

            {/* Expertise */}
            <div className="flex flex-wrap gap-2">
              {mentor.expertise.map((exp) => (
                <span key={exp} className="text-xs px-2.5 py-1 rounded-full bg-surface-1 border border-surface-3 text-ink font-medium">{exp}</span>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Experience", value: `${mentor.yearsExp} yrs`, icon: Clock },
                { label: "Success Stories", value: mentor.successStories, icon: Check },
                { label: "Availability", value: mentor.availability.split("/")[0], icon: Calendar },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-2.5 bg-surface-1 rounded-xl">
                  <stat.icon size={13} className="text-brand-600 mx-auto mb-1" />
                  <p className="text-xs font-bold text-ink">{stat.value}</p>
                  <p className="text-[10px] text-ink-subtle leading-tight">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Languages + Format */}
            <div className="flex flex-wrap gap-3 text-xs text-ink-subtle">
              <span>🌐 {mentor.languages.join(", ")}</span>
              <span>🕐 {mentor.timezone}</span>
              <span>
                {mentor.sessionFormat.includes("video") && "📹 Video "}
                {mentor.sessionFormat.includes("chat") && "💬 Chat "}
                {mentor.sessionFormat.includes("in-person") && "🤝 In-Person"}
              </span>
            </div>

            {/* Spots */}
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-ink-subtle">Mentee spots</span>
                <span className="font-medium text-ink">{mentor.maxMentees - mentor.menteeCount} of {mentor.maxMentees} remaining</span>
              </div>
              <div className="h-1.5 bg-surface-2 rounded-full overflow-hidden">
                <div className="h-full bg-brand-500 rounded-full" style={{ width: `${(mentor.menteeCount / mentor.maxMentees) * 100}%` }} />
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-1">
              <button className="btn-primary flex-1 justify-center text-sm">
                <Calendar size={14} /> Request Session
              </button>
              <Link href={`/mentorship/${mentor._id}`} className="btn-secondary text-sm px-4">
                View Profile
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Become a mentor */}
      <div className="mt-14 p-8 rounded-3xl bg-ink text-white text-center space-y-4">
        <h2 className="font-display font-bold text-3xl">Ready to Give Back?</h2>
        <p className="text-white/70 max-w-lg mx-auto">
          Share your PM expertise with the next generation. Join 50+ mentors on PMPath and make a real difference in someone's career.
        </p>
        <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto mt-6 mb-6">
          {[
            { emoji: "🏅", label: "Earn Mentor Badge" },
            { emoji: "🎓", label: "Free Premium Access" },
            { emoji: "🌍", label: "Global Impact" },
          ].map((b) => (
            <div key={b.label} className="p-3 bg-white/10 rounded-xl text-center">
              <span className="text-2xl">{b.emoji}</span>
              <p className="text-sm font-medium mt-1">{b.label}</p>
            </div>
          ))}
        </div>
        <button className="bg-white text-ink font-semibold px-8 py-3 rounded-xl hover:bg-surface-1 transition-colors">
          Apply to Become a Mentor
        </button>
      </div>
    </div>
  );
}
