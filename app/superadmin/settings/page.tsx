import type { Metadata } from "next";
import { Settings, Shield, Key, Database, Bell, Globe, Save, AlertTriangle } from "lucide-react";

export const metadata: Metadata = { title: "Super Admin Settings" };

function DCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl p-5 ${className}`} style={{ background: "#0d1424", border: "1px solid #1e2a3d" }}>
      {children}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: "#4a5568" }}>{children}</p>;
}

const ACCESS_CODES = [
  { role: "Admin", prefix: "ADM-", current: "ADM-7X9K", lastRotated: "14 days ago" },
  { role: "Super Admin", prefix: "SADMIN-", current: "SADMIN-3M2P", lastRotated: "30 days ago" },
];

const SYSTEM_SETTINGS = [
  { label: "Maintenance Mode", description: "Temporarily disable public access to the platform", enabled: false },
  { label: "User Registration", description: "Allow new users to create accounts", enabled: true },
  { label: "Email Notifications", description: "Send system emails for signups, password resets, etc.", enabled: true },
  { label: "API Rate Limiting", description: "Enforce request limits on public API endpoints", enabled: true },
  { label: "Debug Logging", description: "Enable verbose logging for troubleshooting", enabled: false },
];

export default function SuperAdminSettingsPage() {
  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-[1000px]">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Settings size={16} style={{ color: "#a78bfa" }} />
          <Label>Configuration</Label>
        </div>
        <h1 className="text-2xl font-bold text-white">Super Admin Settings</h1>
        <p className="text-xs mt-0.5" style={{ color: "#4a5568" }}>Platform-wide configuration and access management</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Access Code Management */}
        <DCard>
          <div className="flex items-center justify-between mb-4">
            <div>
              <Label>Security</Label>
              <p className="text-white font-semibold flex items-center gap-2">
                <Key size={14} style={{ color: "#a78bfa" }} />
                Access Codes
              </p>
            </div>
          </div>
          <div className="space-y-3">
            {ACCESS_CODES.map((code) => (
              <div key={code.role} className="p-4 rounded-xl" style={{ background: "#111827", border: "1px solid #1a2236" }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-white">{code.role} Code</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold" style={{ background: "#7c3aed18", color: "#a78bfa" }}>
                    {code.prefix}****
                  </span>
                </div>
                <p className="text-[10px] mb-3" style={{ color: "#4a5568" }}>Last rotated: {code.lastRotated}</p>
                <div className="flex gap-2">
                  <button className="text-[10px] px-3 py-1.5 rounded-lg font-semibold transition-all" style={{ background: "#3b82f618", color: "#60a5fa", border: "1px solid #3b82f630" }}>
                    Reveal
                  </button>
                  <button className="text-[10px] px-3 py-1.5 rounded-lg font-semibold transition-all" style={{ background: "#f59e0b18", color: "#fbbf24", border: "1px solid #f59e0b30" }}>
                    Rotate
                  </button>
                </div>
              </div>
            ))}
          </div>
        </DCard>

        {/* Backup & Data */}
        <DCard>
          <div className="flex items-center justify-between mb-4">
            <div>
              <Label>Infrastructure</Label>
              <p className="text-white font-semibold flex items-center gap-2">
                <Database size={14} style={{ color: "#22c55e" }} />
                Backup &amp; Data
              </p>
            </div>
          </div>
          <div className="space-y-3">
            {[
              { label: "Last Backup", value: "2 hours ago", status: "good" },
              { label: "Backup Frequency", value: "Every 6 hours", status: "good" },
              { label: "Storage Used", value: "4.2 GB / 50 GB", status: "good" },
              { label: "Data Retention", value: "90 days", status: "good" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between p-3 rounded-xl" style={{ background: "#111827" }}>
                <span className="text-xs" style={{ color: "#94a3b8" }}>{item.label}</span>
                <span className="text-xs font-semibold" style={{ color: "#22c55e" }}>{item.value}</span>
              </div>
            ))}
            <div className="flex gap-2 pt-2">
              <button className="flex-1 text-xs px-3 py-2 rounded-xl font-semibold transition-all text-center" style={{ background: "#22c55e18", color: "#22c55e", border: "1px solid #22c55e30" }}>
                Backup Now
              </button>
              <button className="flex-1 text-xs px-3 py-2 rounded-xl font-semibold transition-all text-center" style={{ background: "#3b82f618", color: "#60a5fa", border: "1px solid #3b82f630" }}>
                Export Data
              </button>
            </div>
          </div>
        </DCard>
      </div>

      {/* System Toggles */}
      <DCard>
        <div className="flex items-center justify-between mb-4">
          <div>
            <Label>Platform</Label>
            <p className="text-white font-semibold flex items-center gap-2">
              <Globe size={14} style={{ color: "#3b82f6" }} />
              System Settings
            </p>
          </div>
          <button className="flex items-center gap-2 text-xs px-4 py-2 rounded-xl font-semibold transition-all" style={{ background: "linear-gradient(135deg, #7c3aed, #1d4ed8)", color: "white" }}>
            <Save size={12} /> Save Changes
          </button>
        </div>
        <div className="space-y-1">
          {SYSTEM_SETTINGS.map((setting) => (
            <div key={setting.label} className="flex items-center justify-between p-4 rounded-xl transition-all hover:opacity-90" style={{ background: "#111827" }}>
              <div className="flex-1 min-w-0 mr-4">
                <p className="text-sm font-medium text-white">{setting.label}</p>
                <p className="text-[11px] mt-0.5" style={{ color: "#4a5568" }}>{setting.description}</p>
              </div>
              <div
                className="w-10 h-5 rounded-full relative cursor-pointer shrink-0 transition-all"
                style={{ background: setting.enabled ? "#22c55e" : "#1e2a3d" }}
              >
                <div
                  className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all shadow-sm"
                  style={{ left: setting.enabled ? "22px" : "2px" }}
                />
              </div>
            </div>
          ))}
        </div>
      </DCard>

      {/* Danger Zone */}
      <DCard>
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle size={16} style={{ color: "#ef4444" }} />
          <div>
            <Label>Irreversible</Label>
            <p className="text-white font-semibold">Danger Zone</p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="p-4 rounded-xl" style={{ background: "#111827", border: "1px solid #ef444430" }}>
            <p className="text-sm font-semibold text-white mb-1">Reset All Access Codes</p>
            <p className="text-[10px] mb-3" style={{ color: "#4a5568" }}>Invalidate and regenerate all admin and SA access codes</p>
            <button className="text-xs px-3 py-1.5 rounded-lg font-semibold" style={{ background: "#ef444420", color: "#ef4444", border: "1px solid #ef444440" }}>
              Reset Codes
            </button>
          </div>
          <div className="p-4 rounded-xl" style={{ background: "#111827", border: "1px solid #ef444430" }}>
            <p className="text-sm font-semibold text-white mb-1">Purge All Sessions</p>
            <p className="text-[10px] mb-3" style={{ color: "#4a5568" }}>Force logout all users, admins, and super admins platform-wide</p>
            <button className="text-xs px-3 py-1.5 rounded-lg font-semibold" style={{ background: "#ef444420", color: "#ef4444", border: "1px solid #ef444440" }}>
              Purge Sessions
            </button>
          </div>
        </div>
      </DCard>
    </div>
  );
}
