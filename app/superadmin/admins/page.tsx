// app/superadmin/admins/page.tsx
import type { Metadata } from "next";
import { Users, Plus, Eye, UserX, Edit2, Shield, CheckCircle2, Clock } from "lucide-react";

export const metadata: Metadata = { title: "Manage Admins | Super Admin" };

const ADMINS = [
  { id: "admin_001", name: "Sarah Chen", email: "admin@pmpath.app", role: "admin", permissions: ["manage_courses","manage_events","manage_community","manage_jobs","view_analytics","moderate_content"], lastLogin: "2h ago", isActive: true, createdAt: "Jan 1, 2024" },
  { id: "admin_002", name: "James Okafor", email: "content@pmpath.app", role: "admin", permissions: ["manage_courses","manage_events","moderate_content"], lastLogin: "14h ago", isActive: true, createdAt: "Mar 15, 2024" },
];

const ALL_PERMISSIONS = ["manage_courses","manage_events","manage_community","manage_jobs","view_analytics","moderate_content","manage_users","billing_access"];

function DCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-2xl p-5 ${className}`} style={{ background: "#0d1424", border: "1px solid #1e2a3d" }}>{children}</div>;
}

export default function ManageAdminsPage() {
  return (
    <div className="p-6 space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: "#4a5568" }}>Access Control</p>
          <h1 className="text-2xl font-display font-bold text-white">Manage Admins</h1>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold" style={{ background: "#22c55e", color: "white" }}>
          <Plus size={14} /> Add Admin
        </button>
      </div>

      {/* Warning */}
      <div className="p-4 rounded-2xl flex items-start gap-3" style={{ background: "#7c3aed10", border: "1px solid #7c3aed30" }}>
        <Shield size={16} style={{ color: "#a78bfa" }} className="shrink-0 mt-0.5" />
        <p className="text-sm" style={{ color: "#a78bfa" }}>Admin accounts have elevated platform access. Only grant the minimum permissions required. All admin actions are logged in the audit trail.</p>
      </div>

      {/* Admin cards */}
      <div className="space-y-4">
        {ADMINS.map((admin) => (
          <DCard key={admin.id}>
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white text-lg font-bold shrink-0" style={{ background: "linear-gradient(135deg, #1d4ed8, #7c3aed)" }}>
                {admin.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3 mb-1">
                  <div>
                    <p className="font-semibold text-white">{admin.name}</p>
                    <p className="text-xs" style={{ color: "#4a6080" }}>{admin.email}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "#22c55e18", color: "#22c55e" }}>● Active</span>
                    <div className="flex gap-1.5">
                      <button className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "#3b82f618" }}><Eye size={12} style={{ color: "#60a5fa" }} /></button>
                      <button className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "#22c55e18" }}><Edit2 size={12} style={{ color: "#22c55e" }} /></button>
                      <button className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "#ef444418" }}><UserX size={12} style={{ color: "#ef4444" }} /></button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  {admin.permissions.map((p) => (
                    <span key={p} className="text-[9px] font-bold px-2 py-0.5 rounded-full font-mono" style={{ background: "#1e2a3d", color: "#60a5fa" }}>
                      {p}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 text-[10px]" style={{ color: "#4a6080" }}>
                  <span className="flex items-center gap-1"><Clock size={10} />Last login: {admin.lastLogin}</span>
                  <span>Created: {admin.createdAt}</span>
                  <span>{admin.permissions.length} of {ALL_PERMISSIONS.length} permissions</span>
                </div>
              </div>
            </div>
          </DCard>
        ))}
      </div>

      {/* Permissions reference */}
      <DCard>
        <p className="text-[10px] font-bold uppercase tracking-wider mb-3" style={{ color: "#4a5568" }}>All Available Permissions</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {ALL_PERMISSIONS.map((perm) => {
            const assignedTo = ADMINS.filter(a => a.permissions.includes(perm)).map(a => a.name);
            return (
              <div key={perm} className="p-3 rounded-xl" style={{ background: "#111827" }}>
                <p className="text-[10px] font-mono font-bold" style={{ color: "#60a5fa" }}>{perm}</p>
                <p className="text-[9px] mt-1" style={{ color: "#4a5568" }}>
                  {assignedTo.length > 0 ? `Assigned to ${assignedTo.join(", ")}` : "Not yet assigned"}
                </p>
              </div>
            );
          })}
        </div>
      </DCard>
    </div>
  );
}
