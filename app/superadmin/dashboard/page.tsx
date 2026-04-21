// app/superadmin/dashboard/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { Shield, Users, Activity, Database, AlertTriangle, CheckCircle2, Eye, Trash2, UserX, Clock, ArrowUpRight, AlertOctagon, Server } from "lucide-react";

export const metadata: Metadata = { title: "Super Admin" };

const ADMINS = [
  { id: "admin_001", name: "Sarah Chen", email: "admin@pmpath.app", role: "admin", permissions: 6, lastLogin: "2h ago", isActive: true },
  { id: "admin_002", name: "James Okafor", email: "content@pmpath.app", role: "admin", permissions: 3, lastLogin: "14h ago", isActive: true },
];

const AUDIT = [
  { admin: "Sarah Chen", action: "UPDATE_COURSE", resource: "courses/crs_001", time: "10m ago", severity: "info" },
  { admin: "Super Admin", action: "CREATE_ADMIN", resource: "admins/admin_002", time: "13d ago", severity: "info" },
  { admin: "Sarah Chen", action: "BAN_USER", resource: "users/usr_xxx", time: "2d ago", severity: "warning" },
  { admin: "James Okafor", action: "DELETE_POST", resource: "community/post_xxx", time: "3d ago", severity: "warning" },
  { admin: "Super Admin", action: "SYSTEM_CONFIG", resource: "system/config", time: "8d ago", severity: "critical" },
];

const SYSTEM_HEALTH = [
  { label: "API Response Time", value: "142ms", status: "good", target: "<200ms" },
  { label: "DB Query Avg", value: "23ms", status: "good", target: "<50ms" },
  { label: "Error Rate", value: "0.12%", status: "good", target: "<1%" },
  { label: "Uptime (30d)", value: "99.97%", status: "good", target: ">99.9%" },
  { label: "Active Sessions", value: "1,423", status: "good", target: "—" },
  { label: "Memory Usage", value: "67%", status: "warning", target: "<80%" },
];

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

const SEV_STYLES: Record<string, { bg: string; color: string; label: string }> = {
  info: { bg: "#3b82f618", color: "#60a5fa", label: "INFO" },
  warning: { bg: "#f59e0b18", color: "#fbbf24", label: "WARN" },
  critical: { bg: "#ef444418", color: "#f87171", label: "CRIT" },
};

export default function SuperAdminDashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <AlertOctagon size={16} style={{ color: "#a78bfa" }} />
            <Label>Super Admin Console</Label>
          </div>
          <h1 className="text-2xl font-display font-bold text-white">System Dashboard</h1>
          <p className="text-xs mt-0.5" style={{ color: "#4a5568" }}>Full platform control · March 28, 2025</p>
        </div>
        <div className="flex gap-2">
          <Link href="/superadmin/logs" className="text-xs px-4 py-2 rounded-xl font-semibold" style={{ background: "#1a2236", color: "#94a3b8", border: "1px solid #1e2a3d" }}>
            <Activity size={12} className="inline mr-1" />Audit Logs
          </Link>
          <Link href="/superadmin/security" className="text-xs px-4 py-2 rounded-xl font-semibold" style={{ background: "linear-gradient(135deg, #7c3aed, #1d4ed8)", color: "white" }}>
            <Shield size={12} className="inline mr-1" />Security Center
          </Link>
        </div>
      </div>

      {/* SA KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Platform Revenue", value: "$9,840", sub: "This month", color: "#22c55e", icon: ArrowUpRight },
          { label: "Active Admins", value: "2", sub: "All healthy", color: "#3b82f6", icon: Users },
          { label: "Security Alerts", value: "0", sub: "All clear ✓", color: "#22c55e", icon: Shield },
          { label: "System Load", value: "67%", sub: "Memory usage", color: "#f59e0b", icon: Server },
        ].map((kpi) => (
          <DCard key={kpi.label}>
            <div className="flex items-start justify-between mb-3">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: kpi.color + "18" }}>
                <kpi.icon size={16} style={{ color: kpi.color }} />
              </div>
              <span className="w-2 h-2 rounded-full mt-1" style={{ backgroundColor: kpi.color }} />
            </div>
            <p className="text-2xl font-bold text-white">{kpi.value}</p>
            <Label>{kpi.label}</Label>
            <p className="text-[10px]" style={{ color: "#4a5568" }}>{kpi.sub}</p>
          </DCard>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Admin Management */}
        <DCard>
          <div className="flex items-center justify-between mb-4">
            <div><Label>Access Control</Label><p className="text-white font-semibold">Admin Accounts</p></div>
            <button className="text-xs px-3 py-1.5 rounded-xl font-semibold" style={{ background: "#22c55e18", color: "#22c55e", border: "1px solid #22c55e30" }}>
              + Add Admin
            </button>
          </div>
          <div className="space-y-3">
            {ADMINS.map((admin) => (
              <div key={admin.id} className="p-4 rounded-xl flex items-center gap-4" style={{ background: "#111827", border: "1px solid #1a2236" }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-bold shrink-0" style={{ background: "linear-gradient(135deg, #1d4ed8, #7c3aed)" }}>
                  {admin.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white">{admin.name}</p>
                  <p className="text-[10px]" style={{ color: "#4a5568" }}>{admin.email}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[10px]" style={{ color: "#22c55e" }}>● Active</span>
                    <span className="text-[10px]" style={{ color: "#4a5568" }}>{admin.permissions} permissions</span>
                    <span className="text-[10px]" style={{ color: "#4a5568" }}>Last login: {admin.lastLogin}</span>
                  </div>
                </div>
                <div className="flex gap-1.5">
                  <button className="w-7 h-7 rounded-lg flex items-center justify-center transition-all" style={{ background: "#1e2a3d" }}>
                    <Eye size={12} style={{ color: "#60a5fa" }} />
                  </button>
                  <button className="w-7 h-7 rounded-lg flex items-center justify-center transition-all" style={{ background: "#ef444418" }}>
                    <UserX size={12} style={{ color: "#ef4444" }} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 p-3 rounded-xl flex items-center gap-3" style={{ background: "#7c3aed10", border: "1px dashed #7c3aed40" }}>
            <AlertOctagon size={14} style={{ color: "#a78bfa" }} />
            <p className="text-[10px]" style={{ color: "#8b5cf6" }}>Super admin has unrestricted access to all platform features. Handle with care.</p>
          </div>
        </DCard>

        {/* System Health */}
        <DCard>
          <div className="flex items-center justify-between mb-4">
            <div><Label>Infrastructure</Label><p className="text-white font-semibold">System Health</p></div>
            <div className="flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-full" style={{ background: "#22c55e18", color: "#22c55e" }}>
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              All systems go
            </div>
          </div>
          <div className="space-y-3">
            {SYSTEM_HEALTH.map((metric) => (
              <div key={metric.label} className="flex items-center gap-3 p-2.5 rounded-xl" style={{ background: "#111827" }}>
                <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: metric.status === "good" ? "#22c55e" : "#f59e0b" }} />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs" style={{ color: "#94a3b8" }}>{metric.label}</span>
                    <span className="text-xs font-bold" style={{ color: metric.status === "good" ? "#22c55e" : "#f59e0b" }}>{metric.value}</span>
                  </div>
                  <span className="text-[9px]" style={{ color: "#4a5568" }}>Target: {metric.target}</span>
                </div>
              </div>
            ))}
          </div>
        </DCard>
      </div>

      {/* Audit Log */}
      <DCard>
        <div className="flex items-center justify-between mb-4">
          <div><Label>Security</Label><p className="text-white font-semibold">Recent Audit Log</p></div>
          <Link href="/superadmin/logs" className="text-[10px] font-semibold" style={{ color: "#a78bfa" }}>View full log →</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid #1e2a3d" }}>
                {["Admin","Action","Resource","Time","Severity"].map((h) => (
                  <th key={h} className="text-left pb-3 text-[9px] font-bold uppercase tracking-wider" style={{ color: "#4a5568" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {AUDIT.map((log, i) => {
                const sev = SEV_STYLES[log.severity];
                return (
                  <tr key={i} style={{ borderBottom: "1px solid #111827" }}>
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-lg flex items-center justify-center text-[9px] font-bold text-white shrink-0" style={{ background: "linear-gradient(135deg, #1d4ed8, #7c3aed)" }}>
                          {log.admin.charAt(0)}
                        </div>
                        <span className="text-xs text-white">{log.admin}</span>
                      </div>
                    </td>
                    <td className="py-3 pr-4">
                      <span className="text-[10px] font-mono font-semibold" style={{ color: "#60a5fa" }}>{log.action}</span>
                    </td>
                    <td className="py-3 pr-4">
                      <span className="text-[10px] font-mono" style={{ color: "#4a5568" }}>{log.resource}</span>
                    </td>
                    <td className="py-3 pr-4">
                      <span className="text-[10px]" style={{ color: "#4a5568" }}>{log.time}</span>
                    </td>
                    <td className="py-3">
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded-full" style={{ background: sev.bg, color: sev.color }}>
                        {sev.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </DCard>

      {/* Danger Zone */}
      <DCard>
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle size={16} style={{ color: "#ef4444" }} />
          <div><Label>Irreversible Operations</Label><p className="text-white font-semibold">Danger Zone</p></div>
        </div>
        <div className="grid sm:grid-cols-3 gap-3">
          {[
            { label: "Maintenance Mode", desc: "Temporarily disable public access", action: "Enable", color: "#f59e0b" },
            { label: "Purge Cache", desc: "Clear all cached data and sessions", action: "Purge", color: "#3b82f6" },
            { label: "Export All Data", desc: "Full platform data export (GDPR)", action: "Export", color: "#22c55e" },
          ].map((item) => (
            <div key={item.label} className="p-4 rounded-xl" style={{ background: "#111827", border: "1px solid #1a2236" }}>
              <p className="text-sm font-semibold text-white mb-1">{item.label}</p>
              <p className="text-[10px] mb-3" style={{ color: "#4a5568" }}>{item.desc}</p>
              <button className="text-xs px-3 py-1.5 rounded-lg font-semibold transition-all hover:opacity-80" style={{ background: item.color + "20", color: item.color, border: `1px solid ${item.color}40` }}>
                {item.action}
              </button>
            </div>
          ))}
        </div>
      </DCard>
    </div>
  );
}
