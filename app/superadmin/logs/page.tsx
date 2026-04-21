// app/superadmin/logs/page.tsx
import type { Metadata } from "next";
import { Activity, Search, Download, Filter } from "lucide-react";

export const metadata: Metadata = { title: "Audit Logs | Super Admin" };

const LOGS = [
  { id: "log_001", adminName: "Sarah Chen", action: "UPDATE_COURSE", resource: "courses", resourceId: "crs_001", details: "Updated course title and description", ip: "192.168.1.1", createdAt: "Mar 28, 2025 · 10:00", severity: "info" },
  { id: "log_002", adminName: "Sarah Chen", action: "BAN_USER", resource: "users", resourceId: "usr_xxx", details: "User banned for spamming community forum", ip: "192.168.1.1", createdAt: "Mar 27, 2025 · 15:30", severity: "warning" },
  { id: "log_003", adminName: "Super Admin", action: "CREATE_ADMIN", resource: "admins", resourceId: "admin_002", details: "Created new admin account for James Okafor", ip: "10.0.0.1", createdAt: "Mar 15, 2025 · 09:00", severity: "info" },
  { id: "log_004", adminName: "James Okafor", action: "DELETE_POST", resource: "community", resourceId: "post_xxx", details: "Deleted post violating community guidelines — spam link", ip: "192.168.2.5", createdAt: "Mar 14, 2025 · 12:00", severity: "warning" },
  { id: "log_005", adminName: "Super Admin", action: "SYSTEM_CONFIG_CHANGE", resource: "system", resourceId: "config", details: "Updated maintenance mode settings — disabled maintenance window", ip: "10.0.0.1", createdAt: "Mar 10, 2025 · 08:00", severity: "critical" },
  { id: "log_006", adminName: "Sarah Chen", action: "APPROVE_EVENT", resource: "events", resourceId: "evt_003", details: "Approved user-submitted event: PMP Study Group", ip: "192.168.1.1", createdAt: "Mar 8, 2025 · 14:20", severity: "info" },
  { id: "log_007", adminName: "Sarah Chen", action: "UPDATE_JOB", resource: "jobs", resourceId: "job_002", details: "Updated job listing expiry date", ip: "192.168.1.1", createdAt: "Mar 7, 2025 · 11:00", severity: "info" },
  { id: "log_008", adminName: "Super Admin", action: "ROTATE_SECRET", resource: "system", resourceId: "jwt", details: "Rotated JWT signing secret — all sessions invalidated", ip: "10.0.0.1", createdAt: "Mar 1, 2025 · 00:01", severity: "critical" },
];

const SEV: Record<string, { bg: string; color: string; label: string }> = {
  info: { bg: "#3b82f618", color: "#60a5fa", label: "INFO" },
  warning: { bg: "#f59e0b18", color: "#fbbf24", label: "WARN" },
  critical: { bg: "#ef444418", color: "#f87171", label: "CRIT" },
};

export default function AuditLogsPage() {
  return (
    <div className="p-6 space-y-6 ">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: "#4a5568" }}>Security</p>
          <h1 className="text-2xl font-display font-bold text-white flex items-center gap-2">
            <Activity size={20} style={{ color: "#a78bfa" }} /> Audit Logs
          </h1>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold" style={{ background: "#1a2236", color: "#94a3b8", border: "1px solid #1e2a3d" }}>
          <Download size={13} /> Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#4a6080" }} />
          <input placeholder="Search logs..." className="pl-9 pr-4 py-2 text-xs rounded-xl w-56 focus:outline-none" style={{ background: "#0d1424", border: "1px solid #1e2a3d", color: "#94a3b8" }} />
        </div>
        {["All","Info","Warning","Critical"].map((f, i) => (
          <button key={f} className="px-3 py-1.5 rounded-xl text-xs font-medium" style={{
            background: i === 0 ? "#a78bfa" : "#0d1424",
            color: i === 0 ? "white" : "#6b8aad",
            border: "1px solid " + (i === 0 ? "#a78bfa" : "#1e2a3d")
          }}>{f}</button>
        ))}
      </div>

      {/* Log table */}
      <div className="rounded-2xl overflow-hidden" style={{ background: "#0d1424", border: "1px solid #1e2a3d" }}>
        <table className="w-full">
          <thead>
            <tr style={{ background: "#111827", borderBottom: "1px solid #1e2a3d" }}>
              {["Time","Admin","Action","Resource","Details","IP","Sev"].map(h => (
                <th key={h} className="text-left px-4 py-3 text-[9px] font-bold uppercase tracking-wider" style={{ color: "#4a5568" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {LOGS.map((log) => {
              const s = SEV[log.severity];
              return (
                <tr
                  key={log.id}
                  className="transition-colors hover:bg-[#111827]"
                  style={{ borderBottom: "1px solid #111827" }}
                >
                  <td className="px-4 py-3 text-[10px]" style={{ color: "#4a6080" }}>{log.createdAt}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-lg flex items-center justify-center text-white text-[9px] font-bold shrink-0" style={{ background: "linear-gradient(135deg,#1d4ed8,#7c3aed)" }}>
                        {log.adminName.charAt(0)}
                      </div>
                      <span className="text-xs text-white">{log.adminName}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3"><span className="text-[10px] font-mono font-semibold" style={{ color: "#60a5fa" }}>{log.action}</span></td>
                  <td className="px-4 py-3"><span className="text-[10px] font-mono" style={{ color: "#4a6080" }}>{log.resource}/{log.resourceId}</span></td>
                  <td className="px-4 py-3 max-w-[200px]"><p className="text-[10px] text-white line-clamp-1">{log.details}</p></td>
                  <td className="px-4 py-3"><span className="text-[10px] font-mono" style={{ color: "#4a6080" }}>{log.ip}</span></td>
                  <td className="px-4 py-3"><span className="text-[9px] font-bold px-2 py-0.5 rounded-full" style={{ background: s.bg, color: s.color }}>{s.label}</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="px-4 py-3 flex items-center justify-between" style={{ borderTop: "1px solid #1e2a3d" }}>
          <p className="text-[10px]" style={{ color: "#4a5568" }}>Showing 8 of 2,847 log entries</p>
          <div className="flex gap-2">
            {["Prev","1","2","3","...","Next"].map((p, i) => (
              <button key={p} className="px-2.5 py-1 text-[10px] rounded-lg font-medium" style={{ background: i === 1 ? "#a78bfa" : "#151f30", color: i === 1 ? "white" : "#6b8aad", border: "1px solid #1e2a3d" }}>{p}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
