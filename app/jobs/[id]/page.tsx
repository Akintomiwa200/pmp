// app/jobs/[id]/page.tsx
import Link from "next/link";
import { ChevronLeft, MapPin, DollarSign, Clock, Wifi, CheckCircle2, Briefcase, ExternalLink, Share2, Bookmark } from "lucide-react";

const DEMO_JOB = {
  _id: "job_001",
  title: "Junior Project Manager",
  company: "TechFlow Inc.",
  location: "San Francisco, CA (Hybrid)",
  type: "full_time",
  level: "entry",
  salary: { min: 70000, max: 95000, currency: "USD" },
  description: "Join our growing PM team supporting 3-5 concurrent software projects. Work alongside senior PMs, learn our Agile delivery framework, and take ownership of smaller initiatives from day one. You'll have real impact — managing stakeholder updates, running sprint ceremonies, and tracking project metrics.",
  requirements: ["0-2 years of PM or project coordinator experience", "Familiarity with Agile/Scrum methodology", "Strong communication and organisation skills", "Experience with tools like Jira, Asana, or Trello preferred", "CAPM or equivalent is a plus but not required"],
  responsibilities: ["Manage 2-3 smaller projects end-to-end", "Facilitate daily standups and sprint planning", "Track project KPIs and produce weekly status reports", "Coordinate with engineering, design, and stakeholder teams", "Maintain project documentation and risk registers"],
  benefits: ["Full health, dental, and vision insurance", "401k with 4% company match", "$2,000 annual learning & development budget", "Hybrid schedule — 2 days in office", "Stock options (cliff: 1yr, vest: 4yr)"],
  applyUrl: "https://techflow.com/jobs/junior-pm",
  postedAt: "Mar 20, 2025",
  expiresAt: "Apr 20, 2025",
  isRemote: false,
  tags: ["agile","scrum","entry-level","software"],
};

export default function JobDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link href="/jobs" className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-ink mb-6 transition-colors">
        <ChevronLeft size={15} /> Back to Job Board
      </Link>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <div className="card p-6">
            <div className="flex items-start gap-5">
              <div className="w-16 h-16 rounded-2xl bg-surface-1 border border-surface-3 flex items-center justify-center text-3xl shrink-0">🏢</div>
              <div className="flex-1">
                <h1 className="text-2xl font-display font-bold text-ink mb-1">{DEMO_JOB.title}</h1>
                <p className="text-ink-muted font-medium">{DEMO_JOB.company}</p>
                <div className="flex flex-wrap gap-3 mt-3 text-sm text-ink-muted">
                  <span className="flex items-center gap-1.5"><MapPin size={13} />{DEMO_JOB.location}</span>
                  <span className="flex items-center gap-1.5"><DollarSign size={13} />${Math.round(DEMO_JOB.salary.min/1000)}k–${Math.round(DEMO_JOB.salary.max/1000)}k</span>
                  <span className="flex items-center gap-1.5"><Briefcase size={13} />Full-time · Entry Level</span>
                  <span className="flex items-center gap-1.5"><Clock size={13} />Posted {DEMO_JOB.postedAt}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="card p-5">
            <h2 className="font-display font-bold text-xl text-ink mb-3">About the Role</h2>
            <p className="text-sm text-ink-muted leading-relaxed">{DEMO_JOB.description}</p>
          </div>

          {/* Responsibilities */}
          <div className="card p-5">
            <h2 className="font-display font-bold text-xl text-ink mb-3">Responsibilities</h2>
            <ul className="space-y-2.5">
              {DEMO_JOB.responsibilities.map(r => (
                <li key={r} className="flex items-start gap-2 text-sm text-ink-muted">
                  <CheckCircle2 size={14} className="text-brand-500 mt-0.5 shrink-0" />{r}
                </li>
              ))}
            </ul>
          </div>

          {/* Requirements */}
          <div className="card p-5">
            <h2 className="font-display font-bold text-xl text-ink mb-3">Requirements</h2>
            <ul className="space-y-2.5">
              {DEMO_JOB.requirements.map(r => (
                <li key={r} className="flex items-start gap-2 text-sm text-ink-muted">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-400 mt-2 shrink-0" />{r}
                </li>
              ))}
            </ul>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {DEMO_JOB.tags.map(t => <span key={t} className="text-xs px-3 py-1.5 rounded-full bg-surface-1 border border-surface-3 text-ink-muted">#{t}</span>)}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="card p-5 space-y-4">
            <a href={DEMO_JOB.applyUrl} target="_blank" rel="noopener noreferrer" className="btn-primary w-full justify-center">
              Apply Now <ExternalLink size={14} />
            </a>
            <div className="grid grid-cols-2 gap-2">
              <button className="btn-secondary text-sm justify-center py-2"><Bookmark size={14} />Save</button>
              <button className="btn-secondary text-sm justify-center py-2"><Share2 size={14} />Share</button>
            </div>
            <p className="text-xs text-center text-ink-subtle">Closes {DEMO_JOB.expiresAt}</p>
          </div>

          <div className="card p-5">
            <h3 className="font-semibold text-ink mb-3">Benefits</h3>
            <ul className="space-y-2">
              {DEMO_JOB.benefits.map(b => (
                <li key={b} className="flex items-start gap-2 text-sm text-ink-muted">
                  <CheckCircle2 size={13} className="text-brand-500 mt-0.5 shrink-0" />{b}
                </li>
              ))}
            </ul>
          </div>

          <div className="card p-5 bg-brand-50 border-brand-100">
            <h3 className="font-semibold text-ink mb-2 text-sm">💡 Career Tip</h3>
            <p className="text-xs text-ink-muted leading-relaxed">Before applying, complete the PM Fundamentals course on PMPath to strengthen your application. Hiring managers notice structured preparation.</p>
            <Link href="/learn/beginner" className="inline-flex items-center gap-1 mt-2 text-xs text-brand-600 font-semibold hover:underline">
              Start the course →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
