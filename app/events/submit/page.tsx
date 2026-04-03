// app/events/submit/page.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Calendar, CheckCircle2, Globe, MapPin, Info } from "lucide-react";

export default function SubmitEventPage() {
  const [submitted, setSubmitted] = useState(false);
  const [format, setFormat] = useState("virtual");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-brand-50 border-4 border-brand-200 flex items-center justify-center mx-auto text-4xl">🎉</div>
        <h1 className="text-3xl font-display font-bold text-ink">Event Submitted!</h1>
        <p className="text-ink-muted leading-relaxed">
          Your event is under review. Our team will approve it within <strong>48 hours</strong>.
          You'll receive an email confirmation when it's live.
        </p>
        <div className="card p-4 bg-amber-50 border-amber-100 text-left">
          <p className="text-sm font-semibold text-amber-900 mb-2">What happens next?</p>
          <ul className="text-sm text-amber-800 space-y-1">
            <li>✓ Admin review within 48 hours</li>
            <li>✓ Event published to the PMPath calendar</li>
            <li>✓ Notified when attendees register</li>
          </ul>
        </div>
        <div className="flex gap-3 justify-center">
          <Link href="/events" className="btn-primary">Browse Events</Link>
          <button onClick={() => setSubmitted(false)} className="btn-secondary">Submit Another</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      <Link href="/events" className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-ink mb-6 transition-colors">
        <ChevronLeft size={15} /> Back to Events
      </Link>

      <div className="mb-8">
        <p className="section-tag mb-3"><Calendar size={12} />Submit an Event</p>
        <h1 className="text-4xl font-display font-bold text-ink mb-2">Host a PM Event</h1>
        <p className="text-ink-muted max-w-lg">
          Share your webinar, workshop, or meetup with PMPath's 12,000+ community members. All submissions are reviewed within 48 hours.
        </p>
      </div>

      <div className="card p-5 bg-blue-50 border-blue-100 mb-6 flex items-start gap-3">
        <Info size={16} className="text-blue-600 shrink-0 mt-0.5" />
        <p className="text-sm text-blue-800">
          Events must be relevant to project management. Promotional content without educational value will not be approved.
          Free events are prioritised for featuring.
        </p>
      </div>

      <div className="space-y-6">
        {/* Basic info */}
        <div className="card p-6 space-y-4">
          <h2 className="font-semibold text-ink">Event Details</h2>
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">Event Title *</label>
            <input className="input" placeholder="e.g. Agile for Non-Tech PMs — Live Webinar" />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">Event Type *</label>
            <select className="input">
              <option>Webinar</option>
              <option>Workshop</option>
              <option>Meetup</option>
              <option>Conference</option>
              <option>Study Group</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">Description *</label>
            <textarea className="input h-28 resize-none" placeholder="What will attendees learn? Who is this for? What's the format?" />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">Target Level *</label>
            <div className="flex flex-wrap gap-2">
              {["Beginner", "Intermediate", "Advanced", "All Levels"].map(l => (
                <button key={l} className="px-3 py-2 rounded-xl border border-surface-3 text-sm text-ink-muted hover:border-brand-400 hover:bg-brand-50 transition-all">
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Date & time */}
        <div className="card p-6 space-y-4">
          <h2 className="font-semibold text-ink">Date & Time</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-ink mb-1.5">Start Date & Time *</label>
              <input type="datetime-local" className="input" />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-1.5">End Date & Time *</label>
              <input type="datetime-local" className="input" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">Recurring?</label>
            <select className="input">
              <option>One-time event</option>
              <option>Weekly</option>
              <option>Bi-weekly</option>
              <option>Monthly</option>
            </select>
          </div>
        </div>

        {/* Format & location */}
        <div className="card p-6 space-y-4">
          <h2 className="font-semibold text-ink">Format & Location</h2>
          <div className="flex gap-3">
            {[
              { value: "virtual", icon: Globe, label: "Virtual" },
              { value: "in_person", icon: MapPin, label: "In Person" },
              { value: "hybrid", icon: Calendar, label: "Hybrid" },
            ].map(f => (
              <button key={f.value} onClick={() => setFormat(f.value)}
                className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border-2 text-sm font-medium transition-all ${format === f.value ? "border-brand-500 bg-brand-50 text-brand-800" : "border-surface-3 text-ink-muted hover:border-brand-300"}`}>
                <f.icon size={15} /> {f.label}
              </button>
            ))}
          </div>
          {(format === "virtual" || format === "hybrid") && (
            <div>
              <label className="block text-sm font-medium text-ink mb-1.5">Virtual Link (Zoom, Meet, etc.)</label>
              <input className="input" placeholder="https://zoom.us/j/..." />
            </div>
          )}
          {(format === "in_person" || format === "hybrid") && (
            <div>
              <label className="block text-sm font-medium text-ink mb-1.5">Venue & Address</label>
              <input className="input mb-2" placeholder="Venue name" />
              <input className="input" placeholder="Full address including city and country" />
            </div>
          )}
        </div>

        {/* Tickets & capacity */}
        <div className="card p-6 space-y-4">
          <h2 className="font-semibold text-ink">Tickets & Capacity</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-ink mb-1.5">Maximum Attendees</label>
              <input type="number" className="input" placeholder="e.g. 100" />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-1.5">Ticket Price</label>
              <div className="flex gap-2">
                <span className="flex items-center px-3 bg-surface-1 border border-surface-3 rounded-l-xl border-r-0 text-sm text-ink-muted">$</span>
                <input type="number" className="input rounded-l-none flex-1" placeholder="0 for free" />
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">Registration / RSVP URL</label>
            <input className="input" placeholder="https://eventbrite.com/your-event or your own link" />
          </div>
        </div>

        {/* Organiser */}
        <div className="card p-6 space-y-4">
          <h2 className="font-semibold text-ink">Organiser Information</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-ink mb-1.5">Organiser Name *</label>
              <input className="input" placeholder="Your name or organisation" />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-1.5">Contact Email *</label>
              <input className="input" type="email" placeholder="you@organisation.com" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">Speakers / Facilitators</label>
            <input className="input" placeholder="e.g. Jane Smith, PMP — Agile Coach" />
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-start gap-3 p-4 bg-surface-1 rounded-xl border border-surface-2">
          <CheckCircle2 size={14} className="text-brand-500 shrink-0 mt-0.5" />
          <p className="text-xs text-ink-muted">
            By submitting, you confirm this event is relevant to project management and agree to PMPath's
            {" "}<Link href="/terms" className="text-brand-600 hover:underline">event submission guidelines</Link>.
          </p>
        </div>

        <button onClick={handleSubmit} disabled={loading} className="btn-primary w-full justify-center py-3.5 text-base">
          <Calendar size={16} /> {loading ? "Submitting..." : "Submit for Review"}
        </button>
      </div>
    </div>
  );
}
