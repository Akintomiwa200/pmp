// app/superadmin/security/page.tsx
import type { Metadata } from "next";
import { Shield, Lock, AlertTriangle, Eye, CheckCircle2, XCircle, Globe, Clock } from "lucide-react";

export const metadata: Metadata = { title: "Security Center | Super Admin" };

const RECENT_LOGINS = [
  { user: "Super Admin", ip: "10.0.0.1", device: "Chrome/macOS", time: "2h ago", success: true, location: "New York, US" },
  { user: "Sarah Chen", ip: "192.168.1.1", device: "Firefox/Windows", time: "2h ago", success: true, location: "San Francisco, US" },
  { user: "James Okafor", ip: "192.168.2.5", device: "Safari/macOS", time: "14h ago", success: true, location: "Lagos, NG" },
  { user: "Unknown", ip: "185.220.101.45", device: "Unknown", time: "1d ago", success: false, location: "Moscow, RU" },
  { user: "Unknown", ip: "45.33.32.156", device: "curl/7.68", time: "2d ago", success: false, location: "Germany, DE" },
];

const SECURITY_CHECKS = [
  { label: "HTTPS Enforced", status: "pass" },
  { label: "Data Encryption (AES-256)", status: "pass" },
  { label: "GDPR Compliance", status: "pass" },
  { label: "Rate Limiting Active", status: "pass" },
  { label: "SQL Injection Protection", status: "pass" },
  { label: "XSS Prevention Headers", status: "pass" },
  { label: "CORS Policy", status: "pass" },
  { label: "2FA for Admins", status: "warning" },
  { label: "Last Security Audit", status: "warning" },
  { label: "Penetration Test", status: "pending" },
];

function DCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl p-5 ${className}`} style={{ background: "#0d1424", border: "1px solid #1e2a3d" }}>
      {children}
    </div>
  );
}

export default function SecurityPage() {
  return (
    <div className="p-6 space-y-6 ">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #7c3aed, #1d4ed8)" }}>
          <Shield size={20} className="text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-display font-bold text-white">Security Center</h1>
          <p className="text-sm" style={{ color: "#4a5568" }}>Platform security overview and access control</p>
        </div>
      </div>

      {/* Security score */}
      <DCard>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: "#4a5568" }}>Security Score</p>
            <div className="flex items-end gap-3">
              <span className="text-5xl font-bold" style={{ color: "#22c55e" }}>87</span>
              <span className="text-2xl font-bold mb-1" style={{ color: "#2a3a50" }}>/100</span>
            </div>
            <p className="text-sm mt-1" style={{ color: "#6b8aad" }}>Good — 2 recommendations to reach 100</p>
          </div>
          <div className="text-right">
            <div className="w-24 h-24 relative flex items-center justify-center">
              <svg width="96" height="96" className="-rotate-90">
                <circle cx="48" cy="48" r="40" fill="none" stroke="#1e2a3d" strokeWidth="8" />
                <circle cx="48" cy="48" r="40" fill="none" stroke="#22c55e" strokeWidth="8"
                  strokeDasharray={`${(87/100)*251.2} 251.2`} strokeLinecap="round" />
              </svg>
              <span className="absolute text-2xl font-bold text-white">87</span>
            </div>
          </div>
        </div>
      </DCard>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Security checks */}
        <DCard>
          <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: "#4a5568" }}>Security Checklist</p>
          <p className="text-white font-semibold mb-4">Compliance Status</p>
          <div className="space-y-2.5">
            {SECURITY_CHECKS.map((check) => (
              <div key={check.label} className="flex items-center gap-3 p-2.5 rounded-xl" style={{ background: "#111827" }}>
                {check.status === "pass" ? (
                  <CheckCircle2 size={15} style={{ color: "#22c55e" }} />
                ) : check.status === "warning" ? (
                  <AlertTriangle size={15} style={{ color: "#f59e0b" }} />
                ) : (
                  <Clock size={15} style={{ color: "#4a5568" }} />
                )}
                <span className="text-sm flex-1" style={{ color: check.status === "pass" ? "#94a3b8" : "#e2e8f0" }}>{check.label}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{
                  background: check.status === "pass" ? "#22c55e18" : check.status === "warning" ? "#f59e0b18" : "#1e2a3d",
                  color: check.status === "pass" ? "#22c55e" : check.status === "warning" ? "#f59e0b" : "#4a5568"
                }}>
                  {check.status === "pass" ? "PASS" : check.status === "warning" ? "ACTION" : "PENDING"}
                </span>
              </div>
            ))}
          </div>
        </DCard>

        {/* Recent login attempts */}
        <DCard>
          <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: "#4a5568" }}>Access Logs</p>
          <p className="text-white font-semibold mb-4">Recent Login Attempts</p>
          <div className="space-y-3">
            {RECENT_LOGINS.map((login, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl" style={{
                background: login.success ? "#111827" : "#ef444410",
                border: `1px solid ${login.success ? "#1e2a3d" : "#ef444430"}`
              }}>
                {login.success ? (
                  <CheckCircle2 size={14} style={{ color: "#22c55e" }} />
                ) : (
                  <XCircle size={14} style={{ color: "#ef4444" }} />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-semibold text-white">{login.user}</p>
                    <span className="text-[9px] font-mono" style={{ color: "#4a5568" }}>{login.ip}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Globe size={9} style={{ color: "#4a5568" }} />
                    <span className="text-[10px]" style={{ color: "#4a5568" }}>{login.location} · {login.device}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[10px]" style={{ color: "#4a5568" }}>{login.time}</p>
                  {!login.success && (
                    <button className="text-[9px] mt-0.5 font-semibold" style={{ color: "#ef4444" }}>Block IP</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </DCard>
      </div>

      {/* Actions */}
      <DCard>
        <p className="text-white font-semibold mb-4">Security Actions</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: "Force Password Reset", desc: "All admin accounts", color: "#f59e0b", icon: Lock },
            { label: "Enable 2FA Mandatory", desc: "For all admins", color: "#22c55e", icon: Shield },
            { label: "Rotate JWT Secret", desc: "Invalidates all sessions", color: "#ef4444", icon: AlertTriangle },
            { label: "View Full IP Blocklist", desc: "Manage blocked IPs", color: "#3b82f6", icon: Globe },
          ].map((action) => (
            <div key={action.label} className="p-4 rounded-xl" style={{ background: "#111827", border: "1px solid #1a2236" }}>
              <action.icon size={16} className="mb-2" style={{ color: action.color }} />
              <p className="text-sm font-semibold text-white mb-0.5">{action.label}</p>
              <p className="text-[10px] mb-3" style={{ color: "#4a5568" }}>{action.desc}</p>
              <button className="text-xs font-semibold px-3 py-1.5 rounded-lg" style={{ background: action.color + "20", color: action.color }}>
                Execute
              </button>
            </div>
          ))}
        </div>
      </DCard>
    </div>
  );
}
