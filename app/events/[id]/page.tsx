// app/events/[id]/page.tsx
import Link from "next/link";
import { ChevronLeft, MapPin, Globe, Clock, Users, Calendar, ExternalLink, CheckCircle2, Share2 } from "lucide-react";

const DEMO_EVENT = {
  _id: "evt_001",
  title: "PMI Global Summit 2025",
  description: "The world's premier project management conference. 3 days of keynotes, workshops, and networking with 10,000+ PM professionals. Featuring industry leaders from Fortune 500 companies, hands-on workshops across 8 tracks, and the largest PM job fair of the year.",
  type: "conference", format: "hybrid",
  location: { city: "Chicago", country: "USA", venue: "McCormick Place", virtualLink: "https://pmi.org/summit/virtual" },
  startDate: "Sep 15, 2025 · 9:00 AM CDT",
  endDate: "Sep 17, 2025 · 6:00 PM CDT",
  price: { inPerson: 1200, virtual: 399, memberDiscount: 20 },
  speakers: ["Marcus Johnson, PMP", "Dr. Sarah Lee", "Tom Richards", "Dr. Amira Hassan", "Lisa Park"],
  topics: ["Leadership", "AI in PM", "Agile at Scale", "Change Management", "Risk Strategy", "DEI in PM"],
  registrationUrl: "https://pmi.org/summit/register",
  maxAttendees: 10000,
  registeredCount: 6240,
  isFeatured: true,
  level: "all",
  organizer: "PMI",
  agenda: [
    { time: "Day 1, 9:00 AM", title: "Opening Keynote: The Future of Project Management", speaker: "Dr. Sarah Lee" },
    { time: "Day 1, 11:00 AM", title: "AI Tools Transforming PM Workflows", speaker: "Tom Richards" },
    { time: "Day 1, 2:00 PM", title: "Workshop: Agile at Enterprise Scale", speaker: "Marcus Johnson, PMP" },
    { time: "Day 2, 9:00 AM", title: "Risk Management in Uncertain Times", speaker: "Dr. Amira Hassan" },
    { time: "Day 2, 3:00 PM", title: "PM Job Fair & Networking", speaker: "Open" },
    { time: "Day 3, 10:00 AM", title: "Closing Keynote + Certification Announcements", speaker: "All Speakers" },
  ],
};

export default function EventDetailPage({ params }: { params: { id: string } }) {
  const pct = Math.round((DEMO_EVENT.registeredCount / DEMO_EVENT.maxAttendees) * 100);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link href="/events" className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-ink mb-6 transition-colors">
        <ChevronLeft size={15} /> Back to Events
      </Link>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="badge-beginner">All Levels</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-50 border border-purple-200 text-purple-700">Hybrid</span>
              {DEMO_EVENT.isFeatured && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700">⭐ Featured</span>}
            </div>
            <h1 className="text-3xl font-display font-bold text-ink mb-3">{DEMO_EVENT.title}</h1>
            <p className="text-ink-muted leading-relaxed">{DEMO_EVENT.description}</p>
          </div>

          {/* Meta */}
          <div className="card p-5 grid sm:grid-cols-2 gap-4">
            {[
              { icon: Clock, label: "Starts", value: DEMO_EVENT.startDate },
              { icon: Clock, label: "Ends", value: DEMO_EVENT.endDate },
              { icon: MapPin, label: "Venue", value: `${DEMO_EVENT.location.venue}, ${DEMO_EVENT.location.city}` },
              { icon: Globe, label: "Virtual", value: "Stream available online" },
            ].map((m) => (
              <div key={m.label} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-surface-1 flex items-center justify-center shrink-0">
                  <m.icon size={15} className="text-brand-600" />
                </div>
                <div>
                  <p className="text-[10px] text-ink-subtle">{m.label}</p>
                  <p className="text-sm font-medium text-ink">{m.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Agenda */}
          <div className="card p-5">
            <h2 className="font-display font-bold text-xl text-ink mb-4">Agenda Highlights</h2>
            <div className="space-y-3">
              {DEMO_EVENT.agenda.map((item, i) => (
                <div key={i} className="flex gap-4 p-3 bg-surface-1 rounded-xl">
                  <div className="shrink-0 w-28">
                    <p className="text-[11px] font-bold text-brand-600">{item.time}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-ink">{item.title}</p>
                    <p className="text-xs text-ink-subtle mt-0.5">🎙 {item.speaker}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Topics + Speakers */}
          <div className="card p-5">
            <h2 className="font-display font-bold text-lg text-ink mb-3">Topics Covered</h2>
            <div className="flex flex-wrap gap-2 mb-5">
              {DEMO_EVENT.topics.map(t => <span key={t} className="text-xs px-3 py-1.5 rounded-full bg-surface-1 border border-surface-3 font-medium text-ink">{t}</span>)}
            </div>
            <h2 className="font-display font-bold text-lg text-ink mb-3">Featured Speakers</h2>
            <div className="flex flex-wrap gap-2">
              {DEMO_EVENT.speakers.map(s => (
                <div key={s} className="flex items-center gap-2 px-3 py-2 bg-surface-1 rounded-xl border border-surface-3">
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-brand-400 to-brand-700 flex items-center justify-center text-white text-[10px] font-bold">{s.charAt(0)}</div>
                  <span className="text-xs font-medium text-ink">{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="card p-5 space-y-4">
            <h2 className="font-display font-semibold text-lg text-ink">Register</h2>
            {/* Capacity */}
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-ink-subtle">Capacity</span>
                <span className="font-medium text-ink">{DEMO_EVENT.registeredCount.toLocaleString()} / {DEMO_EVENT.maxAttendees.toLocaleString()}</span>
              </div>
              <div className="h-2 bg-surface-2 rounded-full overflow-hidden">
                <div className="h-full bg-brand-500 rounded-full" style={{ width: `${pct}%` }} />
              </div>
              <p className="text-[10px] text-ink-subtle mt-1">{pct}% full · {(DEMO_EVENT.maxAttendees - DEMO_EVENT.registeredCount).toLocaleString()} spots remaining</p>
            </div>
            {/* Pricing */}
            <div className="space-y-2">
              {[
                { type: "Virtual Ticket", price: DEMO_EVENT.price.virtual },
                { type: "In-Person Ticket", price: DEMO_EVENT.price.inPerson },
              ].map((ticket) => (
                <div key={ticket.type} className="flex items-center justify-between p-3 bg-surface-1 rounded-xl border border-surface-3">
                  <div className="flex items-center gap-2">
                    {ticket.price === DEMO_EVENT.price.virtual ? <Globe size={13} className="text-blue-500" /> : <MapPin size={13} className="text-brand-600" />}
                    <span className="text-sm text-ink">{ticket.type}</span>
                  </div>
                  <span className="font-bold text-ink">${ticket.price}</span>
                </div>
              ))}
              <p className="text-xs text-ink-subtle text-center">PMI members get {DEMO_EVENT.price.memberDiscount}% off</p>
            </div>
            <a href={DEMO_EVENT.registrationUrl} target="_blank" rel="noopener noreferrer" className="btn-primary w-full justify-center">
              Register Now <ExternalLink size={14} />
            </a>
            <button className="btn-secondary w-full justify-center text-sm">
              <Share2 size={14} /> Share Event
            </button>
          </div>

          {/* What's included */}
          <div className="card p-5">
            <h3 className="font-semibold text-ink mb-3">What's Included</h3>
            <ul className="space-y-2">
              {["3 days of keynotes & workshops","Access to all 8 tracks","Networking sessions","PM Job Fair access","Post-event recordings","Certificate of attendance"].map(item => (
                <li key={item} className="flex items-center gap-2 text-sm text-ink-muted">
                  <CheckCircle2 size={13} className="text-brand-500 shrink-0" />{item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
