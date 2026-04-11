// app/certificates/page.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import { Award, Download, Share2, Copy, CheckCircle2, Lock, ExternalLink, Trophy, Clock } from "lucide-react";
import { LinkedInIcon } from "@/components/icons/LinkedInIcon";

const EARNED = [
  {
    id: "cert_001",
    courseTitle: "PM Fundamentals",
    level: "beginner",
    earnedAt: "Jan 20, 2025",
    credentialId: "PMPath-BEG-001-2025",
    instructor: "Sarah Chen",
    hours: 4,
    color: "#16a34a",
    emoji: "🌱",
    skills: ["PM Lifecycle", "Agile vs Waterfall", "Project Charter", "Stakeholder Mapping"],
  },
];

const IN_PROGRESS = [
  { id: "prog_001", courseTitle: "Agile & Scrum in Practice", level: "beginner", pct: 40, color: "#2563eb", emoji: "📈", modulesLeft: 11 },
  { id: "prog_002", courseTitle: "Risk Management & Mitigation", level: "intermediate", pct: 20, color: "#7c3aed", emoji: "⚠️", modulesLeft: 12 },
  { id: "prog_003", courseTitle: "PMP Certification Bootcamp", level: "advanced", pct: 5, color: "#e11d48", emoji: "🏆", modulesLeft: 57 },
];

export default function CertificatesPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyLink = (certId: string) => {
    const url = `${window.location.origin}/verify/${certId}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(certId);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-10">
        <p className="section-tag mb-3"><Award size={12} />Certificates</p>
        <h1 className="text-4xl font-display font-bold text-ink dark:text-slate-100 mb-2">My Certificates</h1>
        <p className="text-ink-muted">Earn verifiable certificates for every completed course. Share on LinkedIn or download as PDF.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        {[
          { label: "Earned", value: EARNED.length, icon: Trophy, color: "text-brand-600 bg-brand-50 dark:bg-brand-950/30" },
          { label: "In Progress", value: IN_PROGRESS.length, icon: Clock, color: "text-amber-600 bg-amber-50 dark:bg-amber-950/30" },
          { label: "Total Hours", value: EARNED.reduce((a, c) => a + c.hours, 0) + "h", icon: Award, color: "text-blue-600 bg-blue-50 dark:bg-blue-950/30" },
        ].map(s => (
          <div key={s.label} className="card dark:bg-slate-800 dark:border-slate-700 p-5 text-center">
            <div className={`w-9 h-9 rounded-xl ${s.color} flex items-center justify-center mx-auto mb-2`}>
              <s.icon size={18} />
            </div>
            <p className="text-2xl font-display font-bold text-ink dark:text-slate-100">{s.value}</p>
            <p className="text-xs text-ink-subtle">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Earned certificates */}
      {EARNED.length > 0 && (
        <section className="mb-12">
          <h2 className="font-display font-bold text-2xl text-ink dark:text-slate-100 mb-5">
            🏆 Earned Certificates ({EARNED.length})
          </h2>
          <div className="space-y-6">
            {EARNED.map(cert => (
              <div key={cert.id} className="card dark:bg-slate-800 dark:border-slate-700 overflow-hidden">
                {/* Certificate visual */}
                <div className="relative p-8 text-white overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${cert.color}, ${cert.color}bb)` }}>
                  <div className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "20px 20px" }} />
                  <div className="absolute top-4 right-4 text-5xl opacity-20">{cert.emoji}</div>
                  <div className="relative">
                    <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-2">Certificate of Completion</p>
                    <h3 className="text-2xl font-display font-bold mb-1">{cert.courseTitle}</h3>
                    <p className="text-sm opacity-80">Awarded to Alex Rivera · {cert.earnedAt}</p>
                    <div className="flex items-center gap-4 mt-4 text-sm opacity-80">
                      <span>Instructor: {cert.instructor}</span>
                      <span>·</span>
                      <span>{cert.hours} hours</span>
                      <span>·</span>
                      <span className="capitalize">{cert.level} Level</span>
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div className="p-5 border-b border-surface-3 dark:border-slate-700">
                  <p className="text-xs font-semibold text-ink-subtle uppercase tracking-wider mb-3">Skills Verified</p>
                  <div className="flex flex-wrap gap-2">
                    {cert.skills.map(s => (
                      <span key={s} className="text-xs px-3 py-1.5 rounded-full bg-surface-1 dark:bg-slate-700 border border-surface-3 dark:border-slate-600 text-ink-muted font-medium">
                        <CheckCircle2 size={10} className="inline mr-1 text-brand-500" />{s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="p-5 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs text-ink-subtle">Credential ID</p>
                    <p className="text-sm font-mono font-medium text-ink dark:text-slate-200">{cert.credentialId}</p>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <button className="btn-primary text-sm gap-2 py-2">
                      <Download size={14} />Download PDF
                    </button>
                    <a href={`https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(cert.courseTitle)}&organizationName=PMPath&issueYear=2025&certUrl=${encodeURIComponent(`https://pmpath.app/verify/${cert.credentialId}`)}`}
                      target="_blank" rel="noopener noreferrer"
                      className="btn-secondary text-sm gap-2 py-2">
                      <LinkedInIcon size={14} />Add to LinkedIn
                    </a>
                    <button onClick={() => copyLink(cert.credentialId)} className="btn-secondary text-sm gap-2 py-2">
                      {copied === cert.credentialId ? <><CheckCircle2 size={14} className="text-brand-500" />Copied!</> : <><Copy size={14} />Copy Link</>}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* In Progress */}
      <section>
        <h2 className="font-display font-bold text-2xl text-ink dark:text-slate-100 mb-5">
          📈 In Progress ({IN_PROGRESS.length})
        </h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {IN_PROGRESS.map(course => (
            <div key={course.id} className="card dark:bg-slate-800 dark:border-slate-700 p-5 space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{course.emoji}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-ink dark:text-slate-100 text-sm leading-tight">{course.courseTitle}</h3>
                  <span className="text-[10px] font-bold capitalize" style={{ color: course.color }}>{course.level}</span>
                </div>
                <Lock size={14} className="text-ink-subtle shrink-0" />
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-ink-subtle">Progress</span>
                  <span className="font-semibold text-ink dark:text-slate-200">{course.pct}%</span>
                </div>
                <div className="h-2 bg-surface-2 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${course.pct}%`, background: course.color }} />
                </div>
                <p className="text-[10px] text-ink-subtle mt-1">{course.modulesLeft} modules remaining</p>
              </div>
              <Link href={`/learn/${course.level}`} className="btn-secondary w-full justify-center text-sm py-2 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100">
                Continue →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Verify section */}
      <div className="mt-12 card dark:bg-slate-800 dark:border-slate-700 p-6 flex flex-col sm:flex-row items-center gap-4">
        <div className="flex-1">
          <h3 className="font-semibold text-ink dark:text-slate-100 mb-1 flex items-center gap-2">
            <ExternalLink size={15} className="text-brand-600" />Certificate Verification
          </h3>
          <p className="text-sm text-ink-muted">All PMPath certificates have a unique credential ID. Anyone can verify a certificate is genuine at pmpath.app/verify/[ID].</p>
        </div>
        <Link href="/glossary" className="btn-secondary text-sm whitespace-nowrap dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100">
          Learn More
        </Link>
      </div>
    </div>
  );
}
