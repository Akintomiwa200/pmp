// app/admin/events/page.tsx
import type { Metadata } from "next";
import { Calendar, Plus, Search, CheckCircle2, XCircle, Eye, Edit2, Trash2, Globe, MapPin } from "lucide-react";

export const metadata: Metadata = { title: "Manage Events | Admin" };

const EVENTS = [
  { id: "evt_001", title: "PMI Global Summit 2025", type: "conference", format: "hybrid", organizer: "PMI", date: "Sep 15, 2025", registered: 6240, max: 10000, status: "approved", isFeatured: true },
  { id: "evt_002", title: "Agile Fundamentals Webinar", type: "webinar", format: "virtual", organizer: "PMPath Team", date: "Apr 10, 2025", registered: 312, max: 500, status: "approved", isFeatured: true },
  { id: "evt_003", title: "PMP Study Group - Weekly", type: "study_group", format: "virtual", organizer: "PMPath Community", date: "Apr 5, 2025", registered: 22, max: 30, status: "approved", isFeatured: false },
  { id: "evt_004", title: "New York PM Meetup", type: "meetup", format: "in_person", organizer: "NYC PM Community", date: "Apr 18, 2025", registered: 54, max: 80, status: "approved", isFeatured: false },
  { id: "evt_005", title: "Risk Management Workshop", type: "workshop", format: "hybrid", organizer: "PMPath Academy", date: "May 2, 2025", registered: 67, max: 120, status: "approved", isFeatured: true },
  { id: "evt_pending_1", title: "Agile Coach Masterclass", type: "workshop", format: "virtual", organizer: "User: john_doe", date: "Apr 25, 2025", registered: 0, max: 50, status: "pending", isFeatured: false },
  { id: "evt_pending_2", title: "PM Networking Night - London", type: "meetup", format: "in_person", organizer: "User: sarah_uk", date: "Apr 30, 2025", registered: 0, max: 40, status: "pending", isFeatured: false },
];

const STATUS_STYLES: Record<string, { bg: string; color: string }> = {
  approved: { bg: "#22c55e18", color: "#22c55e" },
  pending: { bg: "#f59e0b18", color: "#f59e0b" },
  rejected: { bg: "#ef444418", color: "#ef4444" },
};
const FORMAT_ICON = { virtual: Globe, in_person: MapPin, hybrid: Calendar };

export default function AdminEventsPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-white">Events</h1>
          <p className="text-sm" style={{ color: "#4a6080" }}>7 events · 2 pending approval</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold" style={{ background: "#22c55e", color: "white" }}>
          <Plus size={14} /> Add Event
        </button>
      </div>

      {/* Pending notice */}
      <div className="p-4 rounded-2xl flex items-center justify-between" style={{ background: "#f59e0b10", border: "1px solid #f59e0b30" }}>
        <p className="text-sm" style={{ color: "#f59e0b" }}>⚠ 2 user-submitted events are waiting for review</p>
        <button className="text-xs font-semibold px-3 py-1.5 rounded-xl" style={{ background: "#f59e0b20", color: "#f59e0b" }}>Review Now</button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#4a6080" }} />
          <input placeholder="Search events..." className="pl-9 pr-4 py-2 text-xs rounded-xl w-56 focus:outline-none" style={{ background: "#0d1424", border: "1px solid #1e2a3d", color: "#94a3b8" }} />
        </div>
        {["All","Pending","Virtual","In Person","Hybrid"].map((f, i) => (
          <button key={f} className="px-3 py-1.5 rounded-xl text-xs font-medium" style={{
            background: i === 0 ? "#22c55e" : i === 1 ? "#f59e0b18" : "#0d1424",
            color: i === 0 ? "white" : i === 1 ? "#f59e0b" : "#6b8aad",
            border: "1px solid " + (i === 0 ? "#22c55e" : i === 1 ? "#f59e0b40" : "#1e2a3d")
          }}>{f}</button>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-2xl overflow-hidden" style={{ background: "#0d1424", border: "1px solid #1e2a3d" }}>
        <table className="w-full">
          <thead>
            <tr style={{ background: "#111827", borderBottom: "1px solid #1e2a3d" }}>
              {["Event","Format","Date","Registered","Status","Actions"].map(h => (
                <th key={h} className="text-left px-4 py-3 text-[9px] font-bold uppercase tracking-wider" style={{ color: "#4a5568" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {EVENTS.map((event) => {
              const FIcon = FORMAT_ICON[event.format as keyof typeof FORMAT_ICON] || Calendar;
              const ss = STATUS_STYLES[event.status];
              const pct = Math.round((event.registered / event.max) * 100);
              return (
                <tr key={event.id} style={{ borderBottom: "1px solid #111827" }}>
                  <td className="px-4 py-3 max-w-[200px]">
                    <p className="text-sm font-medium text-white line-clamp-1">{event.title}</p>
                    <p className="text-[10px] mt-0.5" style={{ color: "#4a5568" }}>by {event.organizer} · {event.type}</p>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <FIcon size={12} style={{ color: "#4a6080" }} />
                      <span className="text-xs capitalize" style={{ color: "#94a3b8" }}>{event.format.replace("_"," ")}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3"><span className="text-xs" style={{ color: "#94a3b8" }}>{event.date}</span></td>
                  <td className="px-4 py-3">
                    <div>
                      <span className="text-xs text-white">{event.registered}/{event.max}</span>
                      <div className="w-16 h-1 rounded-full mt-1 overflow-hidden" style={{ background: "#1e2a3d" }}>
                        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: "#22c55e" }} />
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full capitalize" style={{ background: ss.bg, color: ss.color }}>
                      {event.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      {event.status === "pending" ? (
                        <>
                          <button className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: "#22c55e18" }}><CheckCircle2 size={12} style={{ color: "#22c55e" }} /></button>
                          <button className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: "#ef444418" }}><XCircle size={12} style={{ color: "#ef4444" }} /></button>
                        </>
                      ) : (
                        <>
                          <button className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: "#3b82f618" }}><Eye size={11} style={{ color: "#60a5fa" }} /></button>
                          <button className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: "#22c55e18" }}><Edit2 size={11} style={{ color: "#22c55e" }} /></button>
                          <button className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: "#ef444418" }}><Trash2 size={11} style={{ color: "#ef4444" }} /></button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
