// app/events/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, MapPin, Globe, Users, Clock, ExternalLink, Plus, ArrowRight } from "lucide-react";
import { getEvents } from "@/lib/db";
import { formatDate, formatTime, getLevelColor } from "@/lib/utils";
import type { PMEvent } from "@/types";
import MarketingShell from "@/components/layout/MarketingShell";

export const metadata: Metadata = { title: "Events & Activities" };

const EVENT_TYPE_EMOJI: Record<string, string> = {
  conference: "🏛️", webinar: "💻", workshop: "🔧", meetup: "🤝", study_group: "📖",
};

function EventCard({ event }: { event: PMEvent }) {
  const lc = getLevelColor(event.level);
  const isFree = Object.values(event.price).some(v => v === 0);
  const fillPct = Math.round((event.registeredCount / event.maxAttendees) * 100);

  return (
    <div className="card-hover p-5 flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{EVENT_TYPE_EMOJI[event.type] || "📅"}</span>
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${lc.bg} ${lc.text} ${lc.border}`}>
            {event.level}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {event.isFeatured && <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">⭐ Featured</span>}
          {isFree && <span className="text-[10px] font-bold text-brand-700 bg-brand-50 border border-brand-200 px-2 py-0.5 rounded-full">Free</span>}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-ink mb-1.5 leading-snug line-clamp-2">{event.title}</h3>
        <p className="text-sm text-ink-muted line-clamp-2">{event.description}</p>
      </div>

      <div className="space-y-1.5 text-xs text-ink-muted">
        <div className="flex items-center gap-1.5"><Clock size={11} />{formatDate(event.startDate)} · {formatTime(event.startDate)}</div>
        <div className="flex items-center gap-1.5">
          {event.format === "virtual" || event.format === "hybrid" ? <Globe size={11} /> : <MapPin size={11} />}
          {event.format === "virtual" ? "Virtual Event" : `${event.location.city}, ${event.location.country}`}
          {event.format === "hybrid" && <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">Hybrid</span>}
        </div>
        <div className="flex items-center gap-1.5"><Users size={11} />{event.registeredCount.toLocaleString()} / {event.maxAttendees.toLocaleString()} registered</div>
      </div>

      <div>
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="text-ink-subtle">Capacity</span>
          <span className={`font-medium ${fillPct > 85 ? "text-red-600" : "text-ink"}`}>{fillPct}% full</span>
        </div>
        <div className="h-1.5 bg-surface-2 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-brand-500 to-brand-400 rounded-full"
            style={{ width: `${Math.min(fillPct, 100)}%` }} />
        </div>
      </div>

      <div className="flex items-center justify-between pt-1 border-t border-surface-2">
        <div>
          <p className="text-[10px] text-ink-subtle">By {event.organizer}</p>
          <p className="text-xs font-semibold text-ink">
            {isFree ? "Free" : event.format === "virtual" && event.price.virtual ? `$${event.price.virtual}` : event.price.inPerson ? `From $${event.price.inPerson}` : "Paid"}
          </p>
        </div>
        <div className="flex gap-2">
          <Link href={`/events/${event._id}`} className="btn-ghost text-xs py-1.5 px-3">Details</Link>
          <a href={event.registrationUrl} target="_blank" rel="noopener noreferrer" className="btn-primary text-xs py-1.5 px-3">
            RSVP <ExternalLink size={10} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default async function EventsPage() {
  const events = await getEvents();
  const featured = events.filter(e => e.isFeatured);
  const upcoming = events
    .filter(e => new Date(e.startDate) > new Date())
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

  const virtual = events.filter(e => e.format === "virtual").length;
  const inPerson = events.filter(e => e.format === "in_person").length;
  const free = events.filter(e => Object.values(e.price).some(v => v === 0)).length;

  return (
    <MarketingShell>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* Header */}
      <div className="mb-10">
        <p className="section-tag mb-3"><Calendar size={12} />Events & Activities</p>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-display font-bold text-ink mb-2">PM Events & Networking</h1>
            <p className="text-ink-muted max-w-xl">
              Webinars, conferences, workshops, and meetups — discover the best PM events worldwide.
              RSVP, set reminders, and access post-event recordings.
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            <Link href="/community/network" className="btn-secondary text-sm flex items-center gap-1.5">
              <Users size={14} />Network
            </Link>
            <Link href="/events/submit" className="btn-primary text-sm flex items-center gap-1.5">
              <Plus size={14} />Submit Event
            </Link>
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Events", value: events.length, icon: Calendar, color: "text-brand-600 bg-brand-50" },
          { label: "Virtual", value: virtual, icon: Globe, color: "text-blue-600 bg-blue-50" },
          { label: "In-Person", value: inPerson, icon: MapPin, color: "text-teal-600 bg-teal-50" },
          { label: "Free Events", value: free, icon: Users, color: "text-amber-600 bg-amber-50" },
        ].map(s => (
          <div key={s.label} className="card p-4">
            <div className={`w-8 h-8 rounded-xl ${s.color} flex items-center justify-center mb-2`}>
              <s.icon size={16} />
            </div>
            <p className="text-xl font-display font-bold text-ink">{s.value}</p>
            <p className="text-xs text-ink-subtle">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filter pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        {["All", "Virtual", "In Person", "Hybrid", "Free", "Webinar", "Conference", "Workshop", "Meetup", "Study Group"].map((f, i) => (
          <button key={f}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${i === 0 ? "bg-brand-600 text-white border-brand-600" : "bg-white text-ink-muted border-surface-3 hover:border-brand-300 hover:text-brand-700"}`}>
            {f}
          </button>
        ))}
      </div>

      {/* Featured events */}
      {featured.length > 0 && (
        <section className="mb-12">
          <h2 className="font-display font-bold text-2xl text-ink mb-5">✨ Featured Events</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map(event => <EventCard key={event._id} event={event} />)}
          </div>
        </section>
      )}

      {/* All upcoming */}
      <section className="mb-12">
        <h2 className="font-display font-bold text-2xl text-ink mb-5">All Upcoming Events</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {upcoming.map(event => <EventCard key={event._id} event={event} />)}
        </div>
      </section>

      {/* Post-event resources callout — PRD §3.2 */}
      <section className="card p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100 mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-display font-bold text-lg text-ink mb-1">📹 Post-Event Resources</h3>
            <p className="text-sm text-ink-muted max-w-lg">
              Missed a session? Access recordings, slide decks, summaries, and Q&A highlights from past events.
            </p>
          </div>
          <Link href="/events/evt_002/resources" className="btn-primary text-sm shrink-0">
            Browse Recordings <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* Networking callout — PRD §3.2 */}
      <section className="card p-6 bg-gradient-to-br from-teal-50 to-green-50 border-teal-100 mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-display font-bold text-lg text-ink mb-1">🤝 Event Networking</h3>
            <p className="text-sm text-ink-muted max-w-lg">
              Connect with other attendees before and after events. Match with PMs who share your interests and goals.
            </p>
          </div>
          <Link href="/community/network" className="btn-primary text-sm shrink-0" style={{ background: "#0d9488" }}>
            Find Connections <Users size={14} />
          </Link>
        </div>
      </section>

      {/* Submit event */}
      <section className="p-8 rounded-3xl bg-gradient-to-br from-brand-50 to-emerald-50 border border-brand-100 text-center">
        <h3 className="font-display font-bold text-xl text-ink mb-2">Hosting a PM Event?</h3>
        <p className="text-sm text-ink-muted mb-5 max-w-md mx-auto">
          Submit your webinar, workshop, or meetup to be featured in front of our 12,000+ community members. All submissions reviewed within 48 hours.
        </p>
        <Link href="/events/submit" className="btn-primary">
          <Plus size={15} />Submit Your Event
        </Link>
      </section>
      </div>
    </MarketingShell>
  );
}
