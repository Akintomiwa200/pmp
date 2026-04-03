// app/glossary/page.tsx
"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, BookOpen, ChevronRight, Filter } from "lucide-react";

const GLOSSARY = [
  { term: "Agile", def: "An iterative approach to project management and software development that delivers value incrementally through collaboration and adaptation.", category: "Methodology", level: "beginner", related: ["Scrum", "Kanban", "Sprint"] },
  { term: "Backlog", def: "An ordered list of features, bugs, and tasks that represent work to be done. The Product Owner manages the product backlog in Scrum.", category: "Agile", level: "beginner", related: ["Product Owner", "Sprint", "User Story"] },
  { term: "BAC", def: "Budget at Completion — the total planned budget for a project. Used as the baseline in EVM calculations.", category: "EVM", level: "advanced", related: ["EVM", "EAC", "CPI"] },
  { term: "Baseline", def: "The approved plan for a project's scope, schedule, or cost. Used to measure and manage performance deviations.", category: "Planning", level: "intermediate", related: ["Scope Baseline", "Change Control"] },
  { term: "Change Control", def: "A formal process for reviewing, approving, and managing changes to project scope, schedule, or cost.", category: "Control", level: "intermediate", related: ["CCB", "Change Request"] },
  { term: "Charter", def: "A document that formally authorises a project, identifies the PM, and defines high-level objectives and constraints.", category: "Initiation", level: "beginner", related: ["Project Initiation", "Sponsor"] },
  { term: "CPI", def: "Cost Performance Index = EV / AC. A ratio measuring cost efficiency. CPI > 1 = under budget; CPI < 1 = over budget.", category: "EVM", level: "advanced", related: ["EVM", "SPI", "EV", "AC"] },
  { term: "Critical Path", def: "The longest sequence of dependent tasks. Any delay on the critical path directly delays the project end date.", category: "Scheduling", level: "intermediate", related: ["Float", "Network Diagram", "CPM"] },
  { term: "Decomposition", def: "Breaking down project deliverables and work into smaller, more manageable components. Used to create the WBS.", category: "Planning", level: "beginner", related: ["WBS", "Work Package", "Scope"] },
  { term: "Definition of Done", def: "A Scrum team's shared understanding of what 'complete' means for an increment. Ensures quality and consistency.", category: "Agile", level: "beginner", related: ["Scrum", "Sprint", "Increment"] },
  { term: "Deliverable", def: "Any unique, verifiable product, result, or capability required to complete a process, phase, or project.", category: "Scope", level: "beginner", related: ["Scope", "WBS", "Acceptance Criteria"] },
  { term: "EAC", def: "Estimate at Completion = BAC / CPI. The expected total cost of completing all work based on current performance.", category: "EVM", level: "advanced", related: ["CPI", "BAC", "EVM", "ETC"] },
  { term: "Epic", def: "A large user story too big to complete in a single sprint. Epics are broken down into smaller user stories.", category: "Agile", level: "intermediate", related: ["User Story", "Backlog", "Sprint"] },
  { term: "ETC", def: "Estimate to Complete = EAC - AC. The expected cost to complete all remaining project work.", category: "EVM", level: "advanced", related: ["EAC", "AC", "EVM"] },
  { term: "EV", def: "Earned Value — the value of work actually performed, expressed in terms of the approved budget assigned to that work.", category: "EVM", level: "advanced", related: ["CPI", "SPI", "PV", "AC"] },
  { term: "Float / Slack", def: "The amount of time a task can be delayed without delaying the project end date (total float) or the next task (free float).", category: "Scheduling", level: "intermediate", related: ["Critical Path", "Network Diagram"] },
  { term: "Gold Plating", def: "Adding features beyond approved scope without change control. Considered a bad practice in PM.", category: "Scope", level: "intermediate", related: ["Scope Creep", "Change Control"] },
  { term: "Iron Triangle", def: "The three primary constraints of a project: Scope, Time, and Cost. Changes to one affect the others.", category: "Foundations", level: "beginner", related: ["Scope", "Schedule", "Budget"] },
  { term: "Iteration", def: "A time-boxed cycle in Agile during which a team completes a set of work. Synonymous with Sprint in Scrum.", category: "Agile", level: "beginner", related: ["Sprint", "Increment"] },
  { term: "Kanban", def: "A visual workflow method using cards and columns (To Do, In Progress, Done) to manage work and limit WIP.", category: "Methodology", level: "beginner", related: ["WIP Limit", "Agile"] },
  { term: "Kickoff Meeting", def: "The first official project meeting to align team and stakeholders on objectives and set expectations.", category: "Initiation", level: "beginner", related: ["Charter", "Stakeholders"] },
  { term: "Lessons Learned", def: "Knowledge gained during a project to improve future performance. Captured throughout and stored for future use.", category: "Closing", level: "beginner", related: ["Retrospective", "Knowledge Management"] },
  { term: "Milestone", def: "A significant event in a project timeline with zero duration. Marks completion of a key deliverable or phase.", category: "Scheduling", level: "beginner", related: ["Schedule", "WBS"] },
  { term: "MoSCoW", def: "Prioritisation technique: Must Have, Should Have, Could Have, Won't Have. Used to prioritise backlog and requirements.", category: "Planning", level: "intermediate", related: ["Backlog", "Prioritisation"] },
  { term: "MVP", def: "Minimum Viable Product — the simplest product version that can be released to gather user feedback.", category: "Agile", level: "intermediate", related: ["Agile", "Iteration"] },
  { term: "PMO", def: "Project Management Office — standardises PM processes, provides support, and governs the project portfolio.", category: "Governance", level: "intermediate", related: ["Portfolio", "Programme"] },
  { term: "PMBOK", def: "Project Management Body of Knowledge — PMI's guide to PM standards. The PMP exam is based on its principles.", category: "Standards", level: "advanced", related: ["PMP", "PMI", "Process Groups"] },
  { term: "PMP", def: "Project Management Professional — the gold-standard PM certification from PMI requiring experience, education, and exam.", category: "Certification", level: "advanced", related: ["PMBOK", "PMI", "CAPM"] },
  { term: "Product Owner", def: "In Scrum, responsible for maximising product value by managing and prioritising the product backlog.", category: "Agile", level: "beginner", related: ["Scrum", "Backlog", "Scrum Master"] },
  { term: "PV", def: "Planned Value — the authorised budget assigned to scheduled work. Also called BCWS (Budgeted Cost of Work Scheduled).", category: "EVM", level: "advanced", related: ["EV", "AC", "SPI"] },
  { term: "RACI Matrix", def: "Responsibility assignment chart: Responsible, Accountable, Consulted, Informed. Clarifies team member roles.", category: "Planning", level: "intermediate", related: ["Stakeholders", "Team"] },
  { term: "Retrospective", def: "A Scrum ceremony at sprint end where the team reflects on their process and identifies improvements.", category: "Agile", level: "beginner", related: ["Sprint", "Scrum"] },
  { term: "Risk Register", def: "A document listing identified risks with probability, impact, risk score, and response strategies.", category: "Risk", level: "intermediate", related: ["Risk Response", "Risk Assessment"] },
  { term: "Scope Creep", def: "Uncontrolled expansion of project scope without adjustments to time, cost, or resources. A leading cause of failure.", category: "Scope", level: "beginner", related: ["Change Control", "Gold Plating"] },
  { term: "Scrum", def: "An Agile framework using time-boxed sprints, defined roles (PO, SM, Dev Team), and regular ceremonies.", category: "Methodology", level: "beginner", related: ["Sprint", "Product Owner", "Scrum Master"] },
  { term: "Scrum Master", def: "The servant-leader of a Scrum team. Removes impediments, facilitates ceremonies, coaches Agile practices.", category: "Agile", level: "beginner", related: ["Scrum", "Sprint"] },
  { term: "SPI", def: "Schedule Performance Index = EV / PV. SPI > 1 = ahead of schedule; SPI < 1 = behind schedule.", category: "EVM", level: "advanced", related: ["CPI", "EVM", "EV", "PV"] },
  { term: "Sprint", def: "A time-boxed Scrum iteration (1–4 weeks) in which the team creates a potentially shippable product increment.", category: "Agile", level: "beginner", related: ["Scrum", "Backlog", "Retrospective"] },
  { term: "Stakeholder", def: "Any individual or group that may affect, be affected by, or perceive themselves to be affected by a project.", category: "Stakeholders", level: "beginner", related: ["Stakeholder Register", "Communication Plan"] },
  { term: "UAT", def: "User Acceptance Testing — end-user testing to verify that a system meets requirements and is ready for deployment.", category: "Quality", level: "intermediate", related: ["Quality", "Testing", "Deliverable"] },
  { term: "User Story", def: "An informal description of a feature from an end-user perspective: 'As a [user], I want [goal] so that [benefit].'", category: "Agile", level: "beginner", related: ["Backlog", "Epic", "Acceptance Criteria"] },
  { term: "Velocity", def: "The amount of work a Scrum team completes per sprint, measured in story points. Used to forecast future sprints.", category: "Agile", level: "intermediate", related: ["Story Points", "Sprint"] },
  { term: "WBS", def: "Work Breakdown Structure — a hierarchical decomposition of project scope into deliverables and work packages.", category: "Planning", level: "beginner", related: ["Decomposition", "Deliverable", "Scope"] },
  { term: "Waterfall", def: "A linear, sequential PM approach where each phase must be completed before the next begins. Best for fixed-scope projects.", category: "Methodology", level: "beginner", related: ["Agile", "Methodology"] },
  { term: "WIP Limit", def: "Work in Progress limit. In Kanban, a cap on the number of tasks in any given stage to improve flow.", category: "Agile", level: "intermediate", related: ["Kanban", "Flow"] },
];

const CATEGORIES = ["All", ...Array.from(new Set(GLOSSARY.map(g => g.category))).sort()];
const LEVELS = ["All", "beginner", "intermediate", "advanced"];
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const LEVEL_COLORS: Record<string, string> = {
  beginner: "bg-beginner-light text-beginner-dark border-beginner/20",
  intermediate: "bg-intermediate-light text-intermediate-dark border-intermediate/20",
  advanced: "bg-advanced-light text-advanced-dark border-advanced/20",
};

export default function GlossaryPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [level, setLevel] = useState("All");
  const [activeLetter, setActiveLetter] = useState("All");

  const filtered = useMemo(() => {
    return GLOSSARY.filter((g) => {
      const matchQ = !query || g.term.toLowerCase().includes(query.toLowerCase()) || g.def.toLowerCase().includes(query.toLowerCase());
      const matchCat = category === "All" || g.category === category;
      const matchLevel = level === "All" || g.level === level;
      const matchLetter = activeLetter === "All" || g.term.toUpperCase().startsWith(activeLetter);
      return matchQ && matchCat && matchLevel && matchLetter;
    }).sort((a, b) => a.term.localeCompare(b.term));
  }, [query, category, level, activeLetter]);

  const grouped = useMemo(() => {
    const groups: Record<string, typeof GLOSSARY> = {};
    filtered.forEach(g => {
      const letter = g.term[0].toUpperCase();
      if (!groups[letter]) groups[letter] = [];
      groups[letter].push(g);
    });
    return groups;
  }, [filtered]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-10">
        <p className="section-tag mb-3"><BookOpen size={12} />Glossary</p>
        <h1 className="text-4xl font-display font-bold text-ink mb-3">PM Glossary</h1>
        <p className="text-ink-muted max-w-xl">
          The definitive reference for project management terminology. {GLOSSARY.length} terms covering beginner to advanced PM concepts.
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-subtle" />
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search terms, definitions..."
          className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-surface-3 bg-white text-ink text-sm focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-400/10 transition-all shadow-sm"
        />
        {query && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-ink-subtle">{filtered.length} results</span>
        )}
      </div>

      {/* Filters row */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="flex flex-wrap gap-1.5">
          {LEVELS.map(l => (
            <button key={l} onClick={() => setLevel(l)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all capitalize ${
                level === l
                  ? l === "All" ? "bg-ink text-white border-ink" : `border ${LEVEL_COLORS[l]}`
                  : "bg-white text-ink-muted border-surface-3 hover:border-ink/20"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
        <div className="w-px h-6 bg-surface-3 self-center" />
        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES.slice(0, 7).map(c => (
            <button key={c} onClick={() => setCategory(c)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                category === c ? "bg-ink text-white border-ink" : "bg-white text-ink-muted border-surface-3 hover:border-ink/20"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Alphabet filter */}
      <div className="flex flex-wrap gap-1 mb-8 p-3 bg-white rounded-2xl border border-surface-3 shadow-sm">
        <button onClick={() => setActiveLetter("All")}
          className={`px-2 py-1 rounded-lg text-xs font-bold transition-all ${activeLetter === "All" ? "bg-ink text-white" : "text-ink-muted hover:bg-surface-1"}`}>
          All
        </button>
        {ALPHABET.map(l => {
          const has = GLOSSARY.some(g => g.term[0].toUpperCase() === l);
          return (
            <button key={l} onClick={() => has && setActiveLetter(l)} disabled={!has}
              className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                activeLetter === l ? "bg-brand-600 text-white" : has ? "text-ink hover:bg-surface-1" : "text-surface-3 cursor-default"
              }`}>
              {l}
            </button>
          );
        })}
      </div>

      {/* Results count */}
      <p className="text-sm text-ink-muted mb-6">
        Showing <strong className="text-ink">{filtered.length}</strong> of {GLOSSARY.length} terms
      </p>

      {/* Grouped terms */}
      {Object.keys(grouped).length === 0 ? (
        <div className="text-center py-16">
          <BookOpen size={40} className="text-surface-3 mx-auto mb-3" />
          <p className="text-ink-muted">No terms found for "{query}"</p>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(grouped).map(([letter, terms]) => (
            <section key={letter}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-ink flex items-center justify-center text-white font-display font-bold text-lg shrink-0">
                  {letter}
                </div>
                <div className="flex-1 h-px bg-surface-3" />
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {terms.map(g => (
                  <div key={g.term} className="card-hover p-5 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-display font-bold text-lg text-ink leading-tight">{g.term}</h3>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 capitalize ${LEVEL_COLORS[g.level]}`}>
                        {g.level}
                      </span>
                    </div>
                    <p className="text-sm text-ink-muted leading-relaxed">{g.def}</p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-surface-1 border border-surface-3 text-ink-subtle font-medium">
                        {g.category}
                      </span>
                      {g.related.slice(0, 2).map(r => (
                        <button key={r} onClick={() => setQuery(r)}
                          className="text-[10px] px-2 py-0.5 rounded-full bg-brand-50 border border-brand-200 text-brand-700 hover:bg-brand-100 transition-colors">
                          → {r}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      {/* CTA */}
      <div className="mt-12 p-8 rounded-3xl bg-gradient-to-br from-brand-50 to-emerald-50 border border-brand-100 text-center">
        <h2 className="font-display font-bold text-xl text-ink mb-2">Learn These Terms in Context</h2>
        <p className="text-sm text-ink-muted mb-5 max-w-md mx-auto">The best way to learn PM vocabulary is through structured courses and real projects.</p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/learn/beginner" className="btn-primary text-sm">Start Beginner Path</Link>
          <Link href="/onboarding" className="btn-secondary text-sm">Take the Assessment</Link>
        </div>
      </div>
    </div>
  );
}
