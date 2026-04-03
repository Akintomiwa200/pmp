// app/admin/settings/page.tsx
import type { Metadata } from "next";
import { Settings, Save, Mail, Globe, DollarSign, Bell } from "lucide-react";

export const metadata: Metadata = { title: "Admin Settings" };

function DCard({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <div className="rounded-2xl p-5" style={{ background: "#0d1424", border: "1px solid #1e2a3d" }}>
      <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: "#4a5568" }}>Configuration</p>
      <p className="text-white font-semibold mb-4">{title}</p>
      {children}
    </div>
  );
}

export default function AdminSettingsPage() {
  return (
    <div className="p-6 space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-display font-bold text-white flex items-center gap-2">
          <Settings size={20} style={{ color: "#22c55e" }} /> Admin Settings
        </h1>
        <p className="text-sm mt-0.5" style={{ color: "#4a5568" }}>Platform configuration and preferences</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <DCard title="Platform Branding">
          <div className="space-y-4">
            {[
              { label: "Platform Name", value: "PMPath", type: "text" },
              { label: "Tagline", value: "Your PM Career Starts Here", type: "text" },
              { label: "Contact Email", value: "hello@pmpath.app", type: "email" },
              { label: "Support URL", value: "https://pmpath.app/support", type: "url" },
            ].map((field) => (
              <div key={field.label}>
                <label className="block text-xs mb-1.5" style={{ color: "#4a6080" }}>{field.label}</label>
                <input type={field.type} defaultValue={field.value} className="w-full px-3 py-2 text-sm rounded-xl focus:outline-none" style={{ background: "#111827", border: "1px solid #1e2a3d", color: "#94a3b8" }} />
              </div>
            ))}
          </div>
        </DCard>

        <DCard title="Content Moderation">
          <div className="space-y-4">
            <div>
              <label className="block text-xs mb-1.5" style={{ color: "#4a6080" }}>Auto-flag threshold (upvote reports)</label>
              <input type="number" defaultValue="3" className="w-full px-3 py-2 text-sm rounded-xl focus:outline-none" style={{ background: "#111827", border: "1px solid #1e2a3d", color: "#94a3b8" }} />
            </div>
            <div>
              <label className="block text-xs mb-1.5" style={{ color: "#4a6080" }}>Max post length (characters)</label>
              <input type="number" defaultValue="5000" className="w-full px-3 py-2 text-sm rounded-xl focus:outline-none" style={{ background: "#111827", border: "1px solid #1e2a3d", color: "#94a3b8" }} />
            </div>
            <div>
              <label className="block text-xs mb-1.5" style={{ color: "#4a6080" }}>New user post cooldown (hours)</label>
              <input type="number" defaultValue="24" className="w-full px-3 py-2 text-sm rounded-xl focus:outline-none" style={{ background: "#111827", border: "1px solid #1e2a3d", color: "#94a3b8" }} />
            </div>
            <div>
              <label className="block text-xs mb-1.5" style={{ color: "#4a6080" }}>Event review period (days)</label>
              <input type="number" defaultValue="2" className="w-full px-3 py-2 text-sm rounded-xl focus:outline-none" style={{ background: "#111827", border: "1px solid #1e2a3d", color: "#94a3b8" }} />
            </div>
          </div>
        </DCard>

        <DCard title="Premium Pricing">
          <div className="space-y-4">
            {[
              { label: "Monthly Price (USD)", value: "9.99" },
              { label: "Annual Price (USD)", value: "89.99" },
              { label: "Trial Period (days)", value: "7" },
            ].map((field) => (
              <div key={field.label}>
                <label className="block text-xs mb-1.5" style={{ color: "#4a6080" }}>{field.label}</label>
                <div className="relative">
                  <DollarSign size={13} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#4a6080" }} />
                  <input type="number" defaultValue={field.value} className="w-full pl-8 pr-3 py-2 text-sm rounded-xl focus:outline-none" style={{ background: "#111827", border: "1px solid #1e2a3d", color: "#94a3b8" }} />
                </div>
              </div>
            ))}
          </div>
        </DCard>

        <DCard title="Notification Defaults">
          <div className="space-y-3">
            {[
              { label: "Welcome email on signup", on: true },
              { label: "Progress milestone emails", on: true },
              { label: "Weekly learning digest", on: false },
              { label: "New mentor match notifications", on: true },
              { label: "Event reminder (24h before)", on: true },
              { label: "Community reply notifications", on: true },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between py-2" style={{ borderBottom: "1px solid #111827" }}>
                <span className="text-xs" style={{ color: "#94a3b8" }}>{item.label}</span>
                <div className={`w-9 h-5 rounded-full flex items-center px-0.5 cursor-pointer`} style={{ background: item.on ? "#22c55e" : "#1e2a3d" }}>
                  <div className={`w-4 h-4 rounded-full bg-white shadow transition-transform ${item.on ? "translate-x-4" : ""}`} />
                </div>
              </div>
            ))}
          </div>
        </DCard>
      </div>

      <div className="flex gap-3">
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold" style={{ background: "#22c55e", color: "white" }}>
          <Save size={15} /> Save Changes
        </button>
        <button className="px-5 py-2.5 rounded-xl text-sm font-semibold" style={{ background: "#1a2236", color: "#94a3b8", border: "1px solid #1e2a3d" }}>
          Discard
        </button>
      </div>
    </div>
  );
}
