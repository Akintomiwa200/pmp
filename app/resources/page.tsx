// app/resources/page.tsx
"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { BookOpen, Headphones, Wrench, FileText, ExternalLink, Search, Star, Download, Filter } from "lucide-react";

const RESOURCES = [
  // Books
  { id: "r01", type: "book", title: "A Guide to the PMBOK (7th Edition)", author: "PMI", level: "advanced", isFree: false, price: "$59.95 (PMI member: $44)", rating: 4.8, url: "https://www.pmi.org/pmbok-guide-standards", tags: ["pmbok", "pmp", "certification", "standard"], desc: "The definitive PM standard from PMI. Essential reading for all PMP candidates." },
  { id: "r02", type: "book", title: "The Lean Startup", author: "Eric Ries", level: "intermediate", isFree: false, price: "$18", rating: 4.6, url: "https://theleanstartup.com", tags: ["agile", "startup", "product", "mvp"], desc: "How continuous innovation creates radically successful businesses. A must for Agile PMs." },
  { id: "r03", type: "book", title: "Making Things Happen", author: "Scott Berkun", level: "intermediate", isFree: false, price: "$22", rating: 4.5, url: "https://scottberkun.com/books/making-things-happen", tags: ["leadership", "practical", "planning"], desc: "Practical, no-nonsense guide to project management by a former Microsoft PM." },
  { id: "r04", type: "book", title: "Scrum: The Art of Doing Twice the Work in Half the Time", author: "Jeff Sutherland", level: "beginner", isFree: false, price: "$16", rating: 4.7, url: "https://www.scruminc.com/new-scrum-the-book", tags: ["scrum", "agile", "beginner"], desc: "The co-creator of Scrum explains how it works and why it changes everything." },
  { id: "r05", type: "book", title: "Project Management for Dummies", author: "Stanley Portny", level: "beginner", isFree: false, price: "$24", rating: 4.4, url: "https://www.dummies.com/book/business-careers-money/business/project-management", tags: ["beginner", "fundamentals", "reference"], desc: "Clear, jargon-free introduction to project management. Perfect for absolute beginners." },
  { id: "r06", type: "book", title: "The Phoenix Project", author: "Gene Kim", level: "intermediate", isFree: false, price: "$20", rating: 4.8, url: "https://itrevolution.com/the-phoenix-project", tags: ["devops", "agile", "novel", "transformation"], desc: "A novel about IT, DevOps, and helping your business win. Secretly a PM masterclass." },

  // Podcasts
  { id: "r07", type: "podcast", title: "PM Happy Hour", author: "Kim Essenmacher & Jennifer Tharp", level: "beginner", isFree: true, rating: 4.7, url: "https://pmhappyhour.com", tags: ["pmp", "career", "interviews", "fun"], desc: "Fun and practical conversations about all things project management. Great for commutes." },
  { id: "r08", type: "podcast", title: "People and Projects Podcast", author: "Andy Kaufman", level: "intermediate", isFree: true, rating: 4.6, url: "https://andykaufman.com/podcast", tags: ["leadership", "communication", "teams"], desc: "Leadership, communication, and practical project management — episodes under 30 minutes." },
  { id: "r09", type: "podcast", title: "Mastering Project Management", author: "PMI", level: "advanced", isFree: true, rating: 4.5, url: "https://www.pmi.org/podcast", tags: ["pmp", "certification", "pmbok", "advanced"], desc: "PMI's official podcast featuring expert insights, trends, and certification guidance." },
  { id: "r10", type: "podcast", title: "Agile Uprising", author: "Agile Uprising Community", level: "intermediate", isFree: true, rating: 4.4, url: "https://agileuprising.libsyn.com", tags: ["agile", "scrum", "community", "transformation"], desc: "Honest conversations about Agile in practice — including what doesn't work." },

  // Tools
  { id: "r11", type: "tool", title: "Asana (Free)", author: "Asana Inc.", level: "beginner", isFree: true, rating: 4.6, url: "https://asana.com", tags: ["task-management", "kanban", "collaboration", "free"], desc: "Intuitive task and project management. Free for teams up to 15. Great for beginners." },
  { id: "r12", type: "tool", title: "Trello (Free)", author: "Atlassian", level: "beginner", isFree: true, rating: 4.5, url: "https://trello.com", tags: ["kanban", "visual", "free", "beginner"], desc: "Visual Kanban-style boards. The easiest PM tool to get started with. Free forever for basics." },
  { id: "r13", type: "tool", title: "Notion", author: "Notion Labs", level: "beginner", isFree: true, rating: 4.7, url: "https://notion.so", tags: ["notes", "docs", "collaboration", "free"], desc: "All-in-one workspace for notes, docs, and project tracking. Free for individuals." },
  { id: "r14", type: "tool", title: "Jira Software", author: "Atlassian", level: "intermediate", isFree: false, price: "Free for up to 10 users", rating: 4.4, url: "https://www.atlassian.com/software/jira", tags: ["agile", "scrum", "enterprise", "software-development"], desc: "The industry-standard Agile project management tool. Used by most tech companies." },
  { id: "r15", type: "tool", title: "Microsoft Project", author: "Microsoft", level: "advanced", isFree: false, price: "$10/user/mo", rating: 4.3, url: "https://www.microsoft.com/en-us/microsoft-365/project", tags: ["gantt", "scheduling", "enterprise", "waterfall"], desc: "Powerful scheduling and resource management. Standard in enterprise and government PM." },
  { id: "r16", type: "tool", title: "ClickUp (Free)", author: "ClickUp", level: "beginner", isFree: true, rating: 4.6, url: "https://clickup.com", tags: ["all-in-one", "free", "agile", "collaboration"], desc: "Feature-packed free tier with Gantt, Kanban, docs, time tracking, and more." },

  // Templates
  { id: "r17", type: "template", title: "Project Charter Template", author: "PMPath", level: "beginner", isFree: true, rating: 5.0, url: "/downloads/project-charter.docx", tags: ["charter", "initiation", "beginner", "download"], desc: "Ready-to-use project charter with all key sections pre-filled with examples." },
  { id: "r18", type: "template", title: "Risk Register Template", author: "PMPath", level: "intermediate", isFree: true, rating: 4.9, url: "/downloads/risk-register.xlsx", tags: ["risk", "register", "intermediate", "download"], desc: "Probability/impact scoring built in. Track up to 50 risks across all categories." },
  { id: "r19", type: "template", title: "Stakeholder Register", author: "PMPath", level: "beginner", isFree: true, rating: 4.8, url: "/downloads/stakeholder-register.xlsx", tags: ["stakeholder", "communication", "beginner", "download"], desc: "Track all stakeholders with power/interest matrix and communication preferences." },
  { id: "r20", type: "template", title: "Agile Sprint Planning Template", author: "PMPath", level: "beginner", isFree: true, rating: 4.9, url: "/downloads/sprint-planning.xlsx", tags: ["sprint", "agile", "planning", "download"], desc: "Sprint goal, capacity planning, and backlog selection — all in one clean spreadsheet." },
  { id: "r21", type: "template", title: "Project Status Report", author: "PMPath", level: "beginner", isFree: true, rating: 4.7, url: "/downloads/status-report.docx", tags: ["reporting", "communication", "template", "download"], desc: "Weekly status report template. RAG status, milestones, risks, and next steps." },
  { id: "r22", type: "template", title: "Lessons Learned Register", author: "PMPath", level: "intermediate", isFree: true, rating: 4.8, url: "/downloads/lessons-learned.xlsx", tags: ["lessons", "closing", "knowledge", "download"], desc: "Capture what went well, what to improve, and recommendations for future projects." },
];

const TYPE_CONFIG = {
  book:     { icon: BookOpen,   label: "Books",     color: "text-blue-600",   bg: "bg-blue-50",   border: "border-blue-200" },
  podcast:  { icon: Headphones, label: "Podcasts",  color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-200" },
  tool:     { icon: Wrench,     label: "Tools",     color: "text-amber-600",  bg: "bg-amber-50",  border: "border-amber-200" },
  template: { icon: FileText,   label: "Templates", color: "text-brand-600",  bg: "bg-brand-50",  border: "border-brand-200" },
};

type ResourceType = keyof typeof TYPE_CONFIG;
type Level = "all" | "beginner" | "intermediate" | "advanced";

export default function ResourcesPage() {
  const [query, setQuery] = useState("");
  const [activeType, setActiveType] = useState<ResourceType | "all">("all");
  const [activeLevel, setActiveLevel] = useState<Level>("all");
  const [freeOnly, setFreeOnly] = useState(false);

  const filtered = useMemo(() => {
    return RESOURCES.filter(r => {
      const q = query.toLowerCase();
      const matchQ = !query || r.title.toLowerCase().includes(q) || r.desc.toLowerCase().includes(q) || r.tags.some(t => t.includes(q));
      const matchType = activeType === "all" || r.type === activeType;
      const matchLevel = activeLevel === "all" || r.level === activeLevel;
      const matchFree = !freeOnly || r.isFree;
      return matchQ && matchType && matchLevel && matchFree;
    });
  }, [query, activeType, activeLevel, freeOnly]);

  const counts = { all: RESOURCES.length, book: 6, podcast: 4, tool: 6, template: 6 };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-10">
        <p className="section-tag mb-3"><BookOpen size={12} />Resource Library</p>
        <h1 className="text-4xl font-display font-bold text-ink mb-3">PM Resource Library</h1>
        <p className="text-ink-muted max-w-xl">
          Searchable database of books, podcasts, tools, and free templates for every stage of your PM journey.
          {" "}<strong className="text-ink">{RESOURCES.filter(r => r.isFree).length} free resources</strong> inside.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {Object.entries(TYPE_CONFIG).map(([type, cfg]) => (
          <div key={type} className="card p-4 text-center">
            <div className={`w-9 h-9 rounded-xl ${cfg.bg} flex items-center justify-center mx-auto mb-2`}>
              <cfg.icon size={18} className={cfg.color} />
            </div>
            <p className="text-xl font-display font-bold text-ink">{counts[type as ResourceType]}</p>
            <p className="text-xs text-ink-subtle">{cfg.label}</p>
          </div>
        ))}
      </div>

      {/* Search & Filters */}
      <div className="space-y-3 mb-8">
        <div className="relative max-w-xl">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-subtle" />
          <input type="text" value={query} onChange={e => setQuery(e.target.value)}
            placeholder="Search books, podcasts, tools, templates..."
            className="input pl-10" />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {/* Type filter */}
          <div className="flex gap-1.5 flex-wrap">
            {([["all", "All", counts.all]] as [string, string, number][]).concat(
              Object.entries(TYPE_CONFIG).map(([type, cfg]) => [type, cfg.label, counts[type as ResourceType]])
            ).map(([type, label, count]) => (
              <button key={type} onClick={() => setActiveType(type as ResourceType | "all")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                  activeType === type ? "bg-ink text-white border-ink" : "bg-white text-ink-muted border-surface-3 hover:border-ink/20"
                }`}>
                {label} <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${activeType === type ? "bg-white/20 text-white" : "bg-surface-2 text-ink-subtle"}`}>{count}</span>
              </button>
            ))}
          </div>
          <div className="w-px h-5 bg-surface-3" />
          {/* Level filter */}
          <div className="flex gap-1.5 flex-wrap">
            {(["all", "beginner", "intermediate", "advanced"] as Level[]).map(l => (
              <button key={l} onClick={() => setActiveLevel(l)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border capitalize transition-all ${
                  activeLevel === l ? "bg-ink text-white border-ink" : "bg-white text-ink-muted border-surface-3 hover:border-ink/20"
                }`}>
                {l}
              </button>
            ))}
          </div>
          {/* Free only toggle */}
          <label className="flex items-center gap-2 cursor-pointer ml-1">
            <div onClick={() => setFreeOnly(f => !f)}
              className={`w-9 h-5 rounded-full flex items-center px-0.5 transition-colors ${freeOnly ? "bg-brand-600" : "bg-surface-3"}`}>
              <div className={`w-4 h-4 rounded-full bg-white shadow transition-transform ${freeOnly ? "translate-x-4" : ""}`} />
            </div>
            <span className="text-xs font-medium text-ink-muted">Free only</span>
          </label>
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-ink-muted mb-6">
        Showing <strong className="text-ink">{filtered.length}</strong> of {RESOURCES.length} resources
        {query && ` for "${query}"`}
      </p>

      {/* Resource grid grouped by type */}
      {(["book", "podcast", "tool", "template"] as ResourceType[]).map(type => {
        const group = filtered.filter(r => r.type === type);
        if (group.length === 0 && activeType !== "all") return null;
        if (group.length === 0) return null;
        const cfg = TYPE_CONFIG[type];
        return (
          <section key={type} className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <div className={`w-9 h-9 rounded-xl ${cfg.bg} flex items-center justify-center`}>
                <cfg.icon size={18} className={cfg.color} />
              </div>
              <h2 className="font-display font-bold text-xl text-ink">{cfg.label}</h2>
              <span className="text-sm text-ink-subtle">({group.length})</span>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {group.map(res => (
                <div key={res.id} className="card-hover p-5 flex flex-col gap-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-ink text-sm leading-snug mb-0.5">{res.title}</h3>
                      <p className="text-xs text-ink-subtle">by {res.author}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      {res.isFree
                        ? <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-50 border border-brand-200 text-brand-700">Free</span>
                        : <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-surface-1 border border-surface-3 text-ink-subtle">Paid</span>}
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${
                        res.level === "beginner" ? "bg-beginner-light text-beginner-dark" :
                        res.level === "intermediate" ? "bg-intermediate-light text-intermediate-dark" :
                        "bg-advanced-light text-advanced-dark"
                      }`}>{res.level}</span>
                    </div>
                  </div>
                  <p className="text-xs text-ink-muted leading-relaxed flex-1">{res.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {res.tags.slice(0, 3).map(t => (
                      <button key={t} onClick={() => setQuery(t)}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-surface-1 border border-surface-3 text-ink-muted hover:border-brand-300 hover:text-brand-700 transition-all">
                        #{t}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-surface-2">
                    <div className="flex items-center gap-1">
                      <Star size={12} className="fill-amber-400 text-amber-400" />
                      <span className="text-xs font-semibold text-ink">{res.rating}</span>
                    </div>
                    {res.type === "template" ? (
                      <a href={res.url} className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:underline">
                        <Download size={12} />Download Free
                      </a>
                    ) : (
                      <a href={res.url} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:underline">
                        <ExternalLink size={12} />
                        {res.isFree ? "Access Free" : res.price ? `${res.price}` : "View"}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      })}

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <Search size={40} className="text-surface-3 mx-auto mb-3" />
          <p className="text-ink-muted font-medium">No resources found for "{query}"</p>
          <button onClick={() => { setQuery(""); setActiveType("all"); setActiveLevel("all"); setFreeOnly(false); }} className="btn-secondary text-sm mt-4">
            Clear filters
          </button>
        </div>
      )}

      {/* CTA */}
      <div className="card p-8 text-center mt-4">
        <h3 className="font-display font-bold text-xl text-ink mb-2">Know a Great PM Resource?</h3>
        <p className="text-sm text-ink-muted mb-5 max-w-md mx-auto">Suggest a book, tool, podcast, or template to add to our library. We review all suggestions within 48 hours.</p>
        <Link href="/feedback" className="btn-primary">Suggest a Resource</Link>
      </div>
    </div>
  );
}
