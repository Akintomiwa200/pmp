// app/search/page.tsx
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, BookOpen, Calendar, Users, Briefcase, FileText, X, Filter } from "lucide-react";

type ResultType = "course" | "event" | "community" | "job" | "resource";

interface SearchResult {
  id: string;
  type: ResultType;
  title: string;
  desc: string;
  meta: string;
  href: string;
  badge?: string;
  badgeColor?: string;
}

const ALL_RESULTS: SearchResult[] = [
  { id: "r1", type: "course", title: "PM Fundamentals", desc: "Master the core concepts of project management, Agile, and Waterfall.", meta: "Beginner · Free · 4 hours", href: "/learn/beginner", badge: "Free", badgeColor: "bg-brand-50 text-brand-700 border-brand-200" },
  { id: "r2", type: "course", title: "Risk Management & Mitigation", desc: "Identify, assess and mitigate project risks. Build risk registers.", meta: "Intermediate · Premium · 5 hours", href: "/learn/intermediate", badge: "Premium", badgeColor: "bg-purple-50 text-purple-700 border-purple-200" },
  { id: "r3", type: "course", title: "PMP Certification Bootcamp", desc: "Comprehensive PMP exam prep with 200+ practice questions and mock exams.", meta: "Advanced · Premium · 40 hours", href: "/learn/advanced", badge: "Premium", badgeColor: "bg-purple-50 text-purple-700 border-purple-200" },
  { id: "r4", type: "course", title: "Agile & Scrum in Practice", desc: "Go hands-on with Agile frameworks. Run sprints, manage backlogs.", meta: "Beginner · Free · 6 hours", href: "/learn/beginner", badge: "Free", badgeColor: "bg-brand-50 text-brand-700 border-brand-200" },
  { id: "r5", type: "event", title: "PMI Global Summit 2025", desc: "3 days of keynotes, workshops, and networking with 10,000+ PM professionals.", meta: "Hybrid · Sep 15, 2025", href: "/events/evt_001", badge: "Featured", badgeColor: "bg-amber-50 text-amber-700 border-amber-200" },
  { id: "r6", type: "event", title: "Agile Fundamentals Webinar", desc: "Free 90-minute webinar on Agile principles and Scrum basics.", meta: "Virtual · Apr 10, 2025 · Free", href: "/events/evt_002", badge: "Free", badgeColor: "bg-brand-50 text-brand-700 border-brand-200" },
  { id: "r7", type: "event", title: "Risk Management Workshop", desc: "Half-day intensive workshop on risk identification and mitigation planning.", meta: "Hybrid · May 2, 2025 · $49–$89", href: "/events/evt_005" },
  { id: "r8", type: "community", title: "How did you choose your first PM certification?", desc: "Advice thread with 14 replies from experienced PMs.", meta: "Beginner · 34 upvotes", href: "/community/post_001" },
  { id: "r9", type: "community", title: "Resources for learning Earned Value Management?", desc: "Curated EVM study resources recommended by the community.", meta: "Advanced · 28 upvotes · Pinned", href: "/community/post_002" },
  { id: "r10", type: "job", title: "Junior Project Manager", desc: "Join TechFlow's PM team. Agile-focused, 0-2 years experience required.", meta: "San Francisco · Full-time · $70k–$95k", href: "/jobs/job_001", badge: "Featured", badgeColor: "bg-amber-50 text-amber-700 border-amber-200" },
  { id: "r11", type: "job", title: "Project Coordinator (Remote)", desc: "Support distributed PM team. Great stepping stone into a PM role.", meta: "Remote · Full-time · $55k–$75k", href: "/jobs/job_002", badge: "Remote", badgeColor: "bg-blue-50 text-blue-700 border-blue-200" },
  { id: "r12", type: "resource", title: "PMBOK Guide 7th Edition", desc: "The definitive PM standard. Essential for all PMP candidates.", meta: "Book · PMI · External", href: "/resources" },
  { id: "r13", type: "resource", title: "Project Charter Template", desc: "Ready-to-use project charter with all key sections pre-filled.", meta: "Template · Free Download", href: "/resources" },
  { id: "r14", type: "resource", title: "Risk Register Spreadsheet", desc: "Track risks with probability/impact scoring built in.", meta: "Template · Free Download", href: "/resources" },
  { id: "r15", type: "resource", title: "PM Happy Hour Podcast", desc: "Fun and practical PM conversations for all levels.", meta: "Podcast · Weekly Episodes", href: "/resources" },
  { id: "r16", type: "course", title: "Stakeholder Communication Mastery", desc: "Build stakeholder maps, run effective meetings, deliver compelling reports.", meta: "Intermediate · Premium · 3 hours", href: "/learn/intermediate" },
];

const TYPE_CONFIG: Record<ResultType, { icon: React.ElementType; color: string; bg: string; label: string }> = {
  course: { icon: BookOpen, color: "text-brand-600", bg: "bg-brand-50", label: "Course" },
  event: { icon: Calendar, color: "text-blue-600", bg: "bg-blue-50", label: "Event" },
  community: { icon: Users, color: "text-purple-600", bg: "bg-purple-50", label: "Community" },
  job: { icon: Briefcase, color: "text-teal-600", bg: "bg-teal-50", label: "Job" },
  resource: { icon: FileText, color: "text-amber-600", bg: "bg-amber-50", label: "Resource" },
};

const POPULAR = ["PMP certification", "Agile scrum", "Risk management", "Project charter", "Remote PM jobs", "EVM formulas"];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [activeType, setActiveType] = useState<ResultType | "all">("all");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (query.length < 2) { setResults([]); setHasSearched(false); return; }
    const filtered = ALL_RESULTS.filter((r) => {
      const matchesQuery =
        r.title.toLowerCase().includes(query.toLowerCase()) ||
        r.desc.toLowerCase().includes(query.toLowerCase()) ||
        r.meta.toLowerCase().includes(query.toLowerCase());
      const matchesType = activeType === "all" || r.type === activeType;
      return matchesQuery && matchesType;
    });
    setResults(filtered);
    setHasSearched(true);
  }, [query, activeType]);

  const countByType = (type: ResultType) =>
    ALL_RESULTS.filter((r) => r.title.toLowerCase().includes(query.toLowerCase()) && r.type === type).length;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-display font-bold text-ink mb-3">Search PMPath</h1>
        <p className="text-ink-muted">Find courses, events, jobs, resources, and community posts.</p>
      </div>

      {/* Search input */}
      <div className="relative mb-6">
        <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-ink-subtle" />
        <input
          autoFocus
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search courses, events, jobs, resources..."
          className="w-full pl-13 pr-12 py-4 rounded-2xl border-2 border-surface-3 bg-white text-ink placeholder:text-ink-subtle focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-400/10 transition-all text-lg shadow-sm"
          style={{ paddingLeft: "3.25rem" }}
        />
        {query && (
          <button onClick={() => setQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-surface-1 rounded-lg transition-colors">
            <X size={18} className="text-ink-muted" />
          </button>
        )}
      </div>

      {/* Type filters */}
      {hasSearched && (
        <div className="flex flex-wrap gap-2 mb-6">
          {[{ type: "all" as const, label: "All", count: results.length },
            ...["course", "event", "job", "community", "resource"].map((t) => ({
              type: t as ResultType,
              label: TYPE_CONFIG[t as ResultType].label + "s",
              count: results.filter((r) => r.type === t).length,
            }))
          ].map((f) => (
            <button
              key={f.type}
              onClick={() => setActiveType(f.type)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                activeType === f.type ? "bg-ink text-white border-ink" : "bg-white text-ink-muted border-surface-3 hover:border-ink/30"
              }`}
            >
              {f.label}
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${activeType === f.type ? "bg-white/20 text-white" : "bg-surface-2 text-ink-subtle"}`}>
                {f.count}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Popular searches (before search) */}
      {!hasSearched && (
        <div className="mb-8">
          <p className="text-sm font-medium text-ink-muted mb-3">Popular searches</p>
          <div className="flex flex-wrap gap-2">
            {POPULAR.map((term) => (
              <button
                key={term}
                onClick={() => setQuery(term)}
                className="px-3 py-2 rounded-xl bg-white border border-surface-3 text-sm text-ink hover:border-brand-300 hover:bg-brand-50 transition-all"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      {hasSearched && (
        <div>
          {results.length === 0 ? (
            <div className="text-center py-16">
              <Search size={40} className="text-surface-3 mx-auto mb-3" />
              <p className="text-ink-muted font-medium">No results for "{query}"</p>
              <p className="text-ink-subtle text-sm mt-1">Try different keywords or browse by category</p>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-ink-subtle">{results.length} results for "{query}"</p>
              {results.map((result) => {
                const config = TYPE_CONFIG[result.type];
                const Icon = config.icon;
                return (
                  <Link key={result.id} href={result.href}
                    className="card-hover p-4 flex items-start gap-4 block">
                    <div className={`w-10 h-10 rounded-xl ${config.bg} flex items-center justify-center shrink-0`}>
                      <Icon size={18} className={config.color} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-0.5">
                            <h3 className="font-semibold text-ink text-sm">{result.title}</h3>
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full border ${config.bg} ${config.color}`}>
                              {config.label}
                            </span>
                            {result.badge && (
                              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full border ${result.badgeColor}`}>
                                {result.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-ink-muted">{result.desc}</p>
                        </div>
                      </div>
                      <p className="text-[11px] text-ink-subtle mt-1">{result.meta}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Browse categories */}
      {!hasSearched && (
        <div>
          <p className="text-sm font-medium text-ink-muted mb-4">Browse by category</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {Object.entries(TYPE_CONFIG).map(([type, config]) => {
              const Icon = config.icon;
              const count = ALL_RESULTS.filter((r) => r.type === type).length;
              return (
                <button
                  key={type}
                  onClick={() => { setQuery(type); setActiveType(type as ResultType); }}
                  className="card-hover p-4 flex items-center gap-3 text-left"
                >
                  <div className={`w-9 h-9 rounded-xl ${config.bg} flex items-center justify-center shrink-0`}>
                    <Icon size={18} className={config.color} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink">{config.label}s</p>
                    <p className="text-xs text-ink-subtle">{count} available</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
