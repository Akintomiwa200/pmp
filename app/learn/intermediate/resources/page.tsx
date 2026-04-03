// app/learn/intermediate/resources/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, Star, Clock, BookOpen, Award, Filter } from "lucide-react";

export const metadata: Metadata = { title: "External Learning Resources | Intermediate" };

const MOOCS = [
  {
    id: "mooc_001",
    platform: "Coursera",
    platformColor: "#0056D2",
    title: "Google Project Management Certificate",
    provider: "Google",
    duration: "6 months (at own pace)",
    rating: 4.8,
    reviewCount: 145000,
    level: "Beginner to Intermediate",
    topics: ["PM Fundamentals", "Agile", "Scrum", "Stakeholders"],
    url: "https://www.coursera.org/professional-certificates/google-project-management",
    isFree: false,
    hasFreeAudit: true,
    price: "$49/month",
    badge: "Top Rated",
    desc: "A 6-course professional certificate from Google covering all aspects of entry-level PM. Covers Agile, Scrum, Jira, and Asana. Earns a Google Career Certificate.",
  },
  {
    id: "mooc_002",
    platform: "edX",
    platformColor: "#97252B",
    title: "Professional Certificate in Project Management",
    provider: "University of Adelaide",
    duration: "4 months (6–10 hrs/week)",
    rating: 4.6,
    reviewCount: 12000,
    level: "Intermediate",
    topics: ["Risk Management", "Leadership", "PMBOK", "Scheduling"],
    url: "https://www.edx.org/professional-certificate/adelaidex-project-management",
    isFree: false,
    hasFreeAudit: true,
    price: "$498",
    badge: "University Accredited",
    desc: "University-backed PM certificate covering risk, scheduling, leadership, and change management. Great for those wanting academic rigour alongside practical skills.",
  },
  {
    id: "mooc_003",
    platform: "Coursera",
    platformColor: "#0056D2",
    title: "Agile Development Specialization",
    provider: "University of Virginia",
    duration: "5 months",
    rating: 4.7,
    reviewCount: 28000,
    level: "Intermediate",
    topics: ["Agile", "Design Thinking", "Product Management", "Scrum"],
    url: "https://www.coursera.org/specializations/agile-development",
    isFree: false,
    hasFreeAudit: true,
    price: "$49/month",
    badge: "Specialization",
    desc: "4-course specialization on Agile at scale. Includes design thinking, hypothesis-driven development, and how to run Agile in enterprise environments.",
  },
  {
    id: "mooc_004",
    platform: "LinkedIn Learning",
    platformColor: "#0A66C2",
    title: "Become a Project Manager",
    provider: "LinkedIn Learning",
    duration: "15 hours",
    rating: 4.5,
    reviewCount: 35000,
    level: "Beginner to Intermediate",
    topics: ["PM Fundamentals", "Communication", "Tools", "Stakeholders"],
    url: "https://www.linkedin.com/learning/paths/become-a-project-manager",
    isFree: false,
    hasFreeAudit: false,
    price: "Included in LinkedIn Premium",
    badge: "Pathway",
    desc: "Curated learning path from LinkedIn covering PM basics through to stakeholder management. Certificates display directly on your LinkedIn profile.",
  },
  {
    id: "mooc_005",
    platform: "PMI",
    platformColor: "#1a6497",
    title: "CAPM Exam Prep Course",
    provider: "PMI (Official)",
    duration: "Self-paced",
    rating: 4.9,
    reviewCount: 5000,
    level: "Advanced",
    topics: ["PMBOK", "CAPM Exam", "Process Groups", "Knowledge Areas"],
    url: "https://www.pmi.org/certifications/project-management-capm",
    isFree: false,
    hasFreeAudit: false,
    price: "$225 (member) / $300 (non-member)",
    badge: "Official",
    desc: "The official CAPM exam prep from PMI. Includes exam registration, study materials, and 15 PDUs of education. Best resource if you're pursuing the CAPM certification.",
  },
  {
    id: "mooc_006",
    platform: "Coursera",
    platformColor: "#0056D2",
    title: "Project Management Principles and Practices",
    provider: "University of California, Irvine",
    duration: "4 months",
    rating: 4.5,
    reviewCount: 65000,
    level: "Beginner",
    topics: ["PM Basics", "Budgeting", "Scheduling", "Risk"],
    url: "https://www.coursera.org/specializations/project-management",
    isFree: true,
    hasFreeAudit: true,
    price: "Free to audit",
    badge: "Free",
    desc: "4-course specialization covering PM fundamentals — completely free to audit. Perfect for beginners who want university-quality content at no cost.",
  },
];

const PLATFORM_ICONS: Record<string, string> = {
  Coursera: "📘",
  edX: "📕",
  "LinkedIn Learning": "💼",
  PMI: "🏛️",
};

export default function IntermediateResourcesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <p className="section-tag mb-3"><ExternalLink size={12} />External Learning</p>
        <h1 className="text-4xl font-display font-bold text-ink mb-2">Curated MOOC Resources</h1>
        <p className="text-ink-muted max-w-2xl">
          Hand-picked online courses from top platforms to supplement your PMPath learning. Filter by platform, price, or topic.
        </p>
      </div>

      {/* Note banner */}
      <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl mb-8 flex items-start gap-3">
        <BookOpen size={16} className="text-blue-600 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-blue-800">Complementary Learning</p>
          <p className="text-sm text-blue-700">These external courses pair perfectly with your PMPath journey. We recommend completing PMPath Intermediate modules first, then using these for specialisation or certification prep.</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {["All", "Free / Audit", "Coursera", "edX", "PMI Official", "Agile Focus", "Certification Prep"].map((f, i) => (
          <button key={f} className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${i === 0 ? "bg-ink text-white border-ink" : "bg-white text-ink-muted border-surface-3 hover:border-ink/30"}`}>
            {f}
          </button>
        ))}
      </div>

      {/* Cards grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {MOOCS.map((mooc) => (
          <div key={mooc.id} className="card-hover p-5 flex flex-col gap-4">
            {/* Platform + badge */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">{PLATFORM_ICONS[mooc.platform] || "🎓"}</span>
                <span className="text-xs font-bold" style={{ color: mooc.platformColor }}>{mooc.platform}</span>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${mooc.isFree ? "bg-brand-50 text-brand-700 border-brand-200" : mooc.badge === "Official" ? "bg-blue-50 text-blue-700 border-blue-200" : "bg-surface-1 text-ink-muted border-surface-3"}`}>
                {mooc.badge}
              </span>
            </div>

            {/* Content */}
            <div className="flex-1">
              <h3 className="font-semibold text-ink mb-1 leading-snug">{mooc.title}</h3>
              <p className="text-xs text-ink-subtle mb-2">by {mooc.provider}</p>
              <p className="text-sm text-ink-muted leading-relaxed">{mooc.desc}</p>
            </div>

            {/* Topics */}
            <div className="flex flex-wrap gap-1.5">
              {mooc.topics.slice(0, 3).map((t) => (
                <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-surface-1 border border-surface-3 text-ink-muted">{t}</span>
              ))}
            </div>

            {/* Meta */}
            <div className="flex items-center gap-3 text-xs text-ink-subtle">
              <span className="flex items-center gap-1"><Clock size={10} />{mooc.duration}</span>
              <span className="flex items-center gap-1"><Star size={10} className="fill-amber-400 text-amber-400" />{mooc.rating} ({(mooc.reviewCount / 1000).toFixed(0)}k reviews)</span>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-2 border-t border-surface-2">
              <div>
                <p className="text-xs font-bold text-ink">{mooc.price}</p>
                {mooc.hasFreeAudit && !mooc.isFree && (
                  <p className="text-[10px] text-brand-600">Free audit available</p>
                )}
              </div>
              <a href={mooc.url} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl text-white transition-all hover:-translate-y-0.5"
                style={{ background: mooc.platformColor }}>
                View Course <ExternalLink size={11} />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom note */}
      <div className="mt-12 p-6 rounded-3xl bg-surface-1 border border-surface-3 text-center">
        <h3 className="font-semibold text-ink mb-2">Know a Great PM Course?</h3>
        <p className="text-sm text-ink-muted mb-4">Suggest a MOOC to add to our curated list. We review all suggestions within 48 hours.</p>
        <button className="btn-secondary">Suggest a Course</button>
      </div>
    </div>
  );
}
