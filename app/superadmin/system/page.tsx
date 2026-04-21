// app/superadmin/system/page.tsx
import type { Metadata } from "next";
import { Database, Server, Settings, AlertTriangle, CheckCircle2, Zap } from "lucide-react";

export const metadata: Metadata = { title: "System Config | Super Admin" };

function DCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-2xl p-5 ${className}`} style={{ background: "#0d1424", border: "1px solid #1e2a3d" }}>{children}</div>;
}

const Toggle = ({ on, label }: { on: boolean; label: string }) => (
  <div className="flex items-center justify-between py-3" style={{ borderBottom: "1px solid #111827" }}>
    <span className="text-sm" style={{ color: "#94a3b8" }}>{label}</span>
    <div className={`w-10 h-5 rounded-full flex items-center px-0.5 cursor-pointer transition-colors ${on ? "" : ""}`} style={{ background: on ? "#22c55e" : "#1e2a3d" }}>
      <div className={`w-4 h-4 rounded-full bg-white shadow transition-transform ${on ? "translate-x-5" : ""}`} />
    </div>
  </div>
);

export default function SystemConfigPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: "#4a5568" }}>Super Admin</p>
        <h1 className="text-2xl font-display font-bold text-white flex items-center gap-2">
          <Database size={20} style={{ color: "#a78bfa" }} /> System Configuration
        </h1>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Platform Settings */}
        <DCard>
          <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: "#4a5568" }}>Platform</p>
          <p className="text-white font-semibold mb-4">Feature Flags</p>
          <Toggle on={true} label="User Registrations Open" />
          <Toggle on={true} label="Community Forum Active" />
          <Toggle on={true} label="Job Board Active" />
          <Toggle on={true} label="Mentorship Matching" />
          <Toggle on={false} label="Maintenance Mode" />
          <Toggle on={true} label="Premium Subscriptions" />
          <Toggle on={false} label="AI Moderation (Beta)" />
        </DCard>

        {/* Database */}
        <DCard>
          <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: "#4a5568" }}>Database</p>
          <p className="text-white font-semibold mb-4">MongoDB Status</p>
          <div className="space-y-2.5">
            {[
              { label: "Connection", value: "Connected", ok: true },
              { label: "Database", value: "pmpath", ok: true },
              { label: "Collections", value: "9 collections", ok: true },
              { label: "Documents", value: "~18,500", ok: true },
              { label: "Indexes", value: "12 indexes", ok: true },
              { label: "Backup", value: "Daily @ 2AM UTC", ok: true },
              { label: "Last Backup", value: "6h ago", ok: true },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between p-2.5 rounded-xl" style={{ background: "#111827" }}>
                <span className="text-xs" style={{ color: "#4a6080" }}>{item.label}</span>
                <div className="flex items-center gap-1.5">
                  {item.ok ? <CheckCircle2 size={11} style={{ color: "#22c55e" }} /> : <AlertTriangle size={11} style={{ color: "#ef4444" }} />}
                  <span className="text-xs font-semibold" style={{ color: item.ok ? "#22c55e" : "#ef4444" }}>{item.value}</span>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-3 py-2 rounded-xl text-xs font-semibold" style={{ background: "#3b82f618", color: "#60a5fa", border: "1px solid #3b82f630" }}>
            Run Manual Backup
          </button>
        </DCard>

        {/* Email / SMTP */}
        <DCard>
          <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: "#4a5568" }}>Notifications</p>
          <p className="text-white font-semibold mb-4">Email (SMTP) Config</p>
          <div className="space-y-3">
            {[
              { label: "SMTP Host", value: "smtp.resend.com" },
              { label: "SMTP Port", value: "587 (TLS)" },
              { label: "From Address", value: "noreply@pmpath.app" },
              { label: "Status", value: "Active ✓" },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-[10px]" style={{ color: "#4a5568" }}>{item.label}</p>
                <p className="text-sm text-white font-medium">{item.value}</p>
              </div>
            ))}
            <button className="mt-2 py-2 px-4 rounded-xl text-xs font-semibold" style={{ background: "#22c55e18", color: "#22c55e", border: "1px solid #22c55e30" }}>
              Send Test Email
            </button>
          </div>
        </DCard>

        {/* Rate Limits */}
        <DCard>
          <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: "#4a5568" }}>Security</p>
          <p className="text-white font-semibold mb-4">Rate Limiting</p>
          <div className="space-y-3">
            {[
              { endpoint: "POST /api/auth/login", limit: "5 req/min", enabled: true },
              { endpoint: "POST /api/users", limit: "3 req/min", enabled: true },
              { endpoint: "GET /api/*", limit: "100 req/min", enabled: true },
              { endpoint: "POST /api/community", limit: "10 req/min", enabled: true },
            ].map((item) => (
              <div key={item.endpoint} className="flex items-center justify-between p-2.5 rounded-xl" style={{ background: "#111827" }}>
                <div>
                  <p className="text-[10px] font-mono" style={{ color: "#60a5fa" }}>{item.endpoint}</p>
                  <p className="text-[9px]" style={{ color: "#4a5568" }}>{item.limit}</p>
                </div>
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full" style={{ background: "#22c55e18", color: "#22c55e" }}>ON</span>
              </div>
            ))}
          </div>
        </DCard>
      </div>

      {/* Danger zone */}
      <DCard>
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle size={16} style={{ color: "#ef4444" }} />
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "#4a5568" }}>Irreversible</p>
            <p className="text-white font-semibold">Danger Zone</p>
          </div>
        </div>
        <div className="grid sm:grid-cols-3 gap-3">
          {[
            { label: "Enable Maintenance Mode", desc: "Temporarily disables all public access", color: "#f59e0b" },
            { label: "Purge Redis Cache", desc: "Clears all cached API responses", color: "#3b82f6" },
            { label: "Reset Rate Limits", desc: "Clears all current rate limit counters", color: "#22c55e" },
          ].map((item) => (
            <div key={item.label} className="p-4 rounded-xl" style={{ background: "#111827", border: "1px solid #1a2236" }}>
              <p className="text-sm font-semibold text-white mb-1">{item.label}</p>
              <p className="text-[10px] mb-3" style={{ color: "#4a5568" }}>{item.desc}</p>
              <button className="text-xs px-3 py-1.5 rounded-lg font-semibold" style={{ background: item.color + "20", color: item.color, border: `1px solid ${item.color}40` }}>
                Execute
              </button>
            </div>
          ))}
        </div>
      </DCard>
    </div>
  );
}
