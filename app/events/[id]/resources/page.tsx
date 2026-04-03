// app/events/[id]/resources/page.tsx
import Link from "next/link";
import { ChevronLeft, Play, FileText, Download, Users, ExternalLink, Clock } from "lucide-react";

const EVENT_RESOURCES = {
  title: "Agile Fundamentals Webinar",
  date: "Apr 10, 2025",
  attendees: 312,
  recording: {
    url: "https://youtube.com/watch?v=example",
    duration: "1h 32m",
    thumbnail: null,
  },
  slides: { url: "/downloads/agile-fundamentals-slides.pdf", pages: 48 },
  summary: `The Agile Fundamentals Webinar covered the core principles of the Agile Manifesto, Scrum framework basics, and how to advocate for Agile adoption in traditional organisations.

Key takeaways included:
• The 4 Agile values and 12 principles are a mindset, not a rigid process
• Scrum works best with teams of 3–9 people with clear roles (PO, SM, Dev Team)
• Starting with 2-week sprints is recommended for most new Agile teams
• The biggest barrier to Agile adoption is management buy-in, not team capability

Speakers agreed that "Agile-washing" (using Agile labels without the principles) is one of the most common failure modes in organisations.`,
  resources: [
    { name: "Agile Manifesto One-Pager", type: "PDF", size: "145KB", url: "/downloads/agile-manifesto.pdf" },
    { name: "Scrum Framework Diagram", type: "PDF", size: "320KB", url: "/downloads/scrum-diagram.pdf" },
    { name: "Sprint Planning Template", type: "XLSX", size: "85KB", url: "/downloads/sprint-planning-template.xlsx" },
    { name: "Agile Vocabulary Glossary", type: "PDF", size: "210KB", url: "/downloads/agile-glossary.pdf" },
  ],
  speakers: [
    { name: "Lisa Park", role: "Senior PM at TechCorp", linkedin: "#" },
    { name: "James Okafor", role: "Certified Scrum Master", linkedin: "#" },
  ],
  qa: [
    { q: "Is Scrum suitable for non-software projects?", a: "Absolutely. Scrum has been used in construction, healthcare, and marketing. The key is adapting the ceremonies to your context — the principles are universal." },
    { q: "How long should sprints be?", a: "2 weeks is the most common starting point. Some teams use 1-week sprints for faster feedback. 4-week sprints exist but are closer to mini-Waterfalls. We recommend 2 weeks." },
    { q: "What's the difference between Scrum Master and Project Manager?", a: "A PM manages the project. A Scrum Master serves the team — removing blockers, facilitating ceremonies, and coaching Agile practices. Many PMs become Scrum Masters as organisations go Agile." },
  ],
};

export default function EventResourcesPage({ params }: { params: { id: string } }) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center gap-2 mb-6">
        <Link href={`/events/${params.id}`} className="inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink transition-colors">
          <ChevronLeft size={15} /> Back to Event
        </Link>
        <span className="text-ink-subtle">/</span>
        <span className="text-sm font-medium text-ink">Post-Event Resources</span>
      </div>

      {/* Header */}
      <div className="card p-6 mb-6 bg-brand-50 border-brand-100">
        <h1 className="text-2xl font-display font-bold text-ink mb-1">{EVENT_RESOURCES.title}</h1>
        <p className="text-ink-muted text-sm">{EVENT_RESOURCES.date} · {EVENT_RESOURCES.attendees} attendees</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Recording */}
          <div className="card p-5">
            <h2 className="font-display font-bold text-xl text-ink mb-4 flex items-center gap-2">
              <Play size={18} className="text-brand-600" /> Session Recording
            </h2>
            <div className="aspect-video bg-ink rounded-2xl flex items-center justify-center relative overflow-hidden mb-3">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-900/20 to-ink/80" />
              <div className="relative text-center">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
                  <Play size={28} className="text-white ml-1" />
                </div>
                <p className="text-white font-semibold">{EVENT_RESOURCES.title}</p>
                <p className="text-white/70 text-sm flex items-center justify-center gap-1 mt-1">
                  <Clock size={12} /> {EVENT_RESOURCES.recording.duration}
                </p>
              </div>
            </div>
            <a href={EVENT_RESOURCES.recording.url} target="_blank" rel="noopener noreferrer" className="btn-primary text-sm">
              <Play size={14} /> Watch on YouTube
            </a>
          </div>

          {/* Summary */}
          <div className="card p-5">
            <h2 className="font-display font-bold text-xl text-ink mb-4 flex items-center gap-2">
              <FileText size={18} className="text-brand-600" /> Event Summary
            </h2>
            <div className="prose prose-sm max-w-none">
              {EVENT_RESOURCES.summary.split("\n").map((line, i) => {
                if (line.startsWith("•")) {
                  return (
                    <div key={i} className="flex items-start gap-2 mb-1.5">
                      <span className="text-brand-500 mt-0.5 shrink-0">•</span>
                      <p className="text-sm text-ink-muted">{line.slice(2)}</p>
                    </div>
                  );
                }
                return line.trim() ? (
                  <p key={i} className="text-sm text-ink-muted leading-relaxed mb-3">{line}</p>
                ) : <div key={i} className="h-2" />;
              })}
            </div>
          </div>

          {/* Q&A Highlights */}
          <div className="card p-5">
            <h2 className="font-display font-bold text-xl text-ink mb-4">Q&A Highlights</h2>
            <div className="space-y-4">
              {EVENT_RESOURCES.qa.map((item, i) => (
                <div key={i} className="p-4 bg-surface-1 rounded-xl border border-surface-2">
                  <p className="text-sm font-semibold text-ink mb-1.5">Q: {item.q}</p>
                  <p className="text-sm text-ink-muted leading-relaxed">A: {item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Downloads */}
          <div className="card p-5">
            <h3 className="font-semibold text-ink mb-3 flex items-center gap-2">
              <Download size={14} className="text-brand-600" /> Downloads
            </h3>
            <div className="space-y-2">
              {EVENT_RESOURCES.resources.map((res) => (
                <a key={res.name} href={res.url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 p-2.5 bg-surface-1 rounded-xl hover:bg-brand-50 transition-colors group">
                  <div className="w-7 h-7 rounded-lg bg-brand-100 flex items-center justify-center shrink-0 text-[10px] font-bold text-brand-700">
                    {res.type}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-ink group-hover:text-brand-700 transition-colors truncate">{res.name}</p>
                    <p className="text-[10px] text-ink-subtle">{res.size}</p>
                  </div>
                  <Download size={12} className="text-ink-subtle group-hover:text-brand-600 shrink-0 transition-colors" />
                </a>
              ))}
              <a href={EVENT_RESOURCES.slides.url} className="flex items-center gap-3 p-2.5 bg-surface-1 rounded-xl hover:bg-brand-50 transition-colors group mt-2">
                <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center shrink-0 text-[10px] font-bold text-blue-700">PDF</div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-ink group-hover:text-brand-700 transition-colors">Presentation Slides</p>
                  <p className="text-[10px] text-ink-subtle">{EVENT_RESOURCES.slides.pages} slides</p>
                </div>
                <Download size={12} className="text-ink-subtle group-hover:text-brand-600 shrink-0 transition-colors" />
              </a>
            </div>
          </div>

          {/* Speakers */}
          <div className="card p-5">
            <h3 className="font-semibold text-ink mb-3 flex items-center gap-2">
              <Users size={14} className="text-brand-600" /> Speakers
            </h3>
            <div className="space-y-3">
              {EVENT_RESOURCES.speakers.map((speaker) => (
                <div key={speaker.name} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-400 to-brand-700 flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {speaker.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-ink">{speaker.name}</p>
                    <p className="text-xs text-ink-subtle">{speaker.role}</p>
                  </div>
                  <a href={speaker.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 transition-colors">
                    <ExternalLink size={13} />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Next event */}
          <div className="card p-5 bg-brand-50 border-brand-100">
            <h3 className="font-semibold text-ink mb-2 text-sm">Next Webinar</h3>
            <p className="text-xs text-ink-muted mb-3">Risk Management Workshop — May 2, 2025</p>
            <Link href="/events/evt_005" className="btn-primary text-xs py-2 w-full justify-center">
              Register Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
