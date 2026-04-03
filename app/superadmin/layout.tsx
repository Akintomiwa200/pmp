// app/superadmin/layout.tsx
import Link from "next/link";
import { LayoutDashboard, Users, Shield, Settings, Activity, AlertOctagon, Database, Zap, LogOut, ChevronRight } from "lucide-react";

const saNav = [
  { href: "/superadmin/dashboard", label: "SA Dashboard", icon: LayoutDashboard },
  { href: "/superadmin/admins", label: "Manage Admins", icon: Users },
  { href: "/superadmin/security", label: "Security Center", icon: Shield },
  { href: "/superadmin/logs", label: "Audit Logs", icon: Activity },
  { href: "/superadmin/system", label: "System Config", icon: Database },
  { href: "/superadmin/settings", label: "SA Settings", icon: Settings },
];

export default function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-[calc(100vh-64px)]" style={{ background: "#06080f" }}>
      {/* Sidebar */}
      <aside className="hidden lg:flex w-60 shrink-0 flex-col border-r" style={{ background: "#090d18", borderColor: "#1a2236" }}>
        <div className="p-5 border-b" style={{ borderColor: "#1a2236" }}>
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: "linear-gradient(135deg, #7c3aed20, #1d4ed820)", border: "1px solid #7c3aed40" }}>
            <AlertOctagon size={16} style={{ color: "#a78bfa" }} />
            <div>
              <p className="text-xs font-bold" style={{ color: "#a78bfa" }}>SUPER ADMIN</p>
              <p className="text-[9px]" style={{ color: "#6b4fa0" }}>Elevated Access</p>
            </div>
          </div>
        </div>

        <div className="px-4 py-3 border-b" style={{ borderColor: "#1a2236" }}>
          <div className="flex items-center gap-3 p-2 rounded-xl" style={{ background: "#111827" }}>
            <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-bold" style={{ background: "linear-gradient(135deg, #7c3aed, #1d4ed8)" }}>SA</div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white">Super Admin</p>
              <p className="text-[10px]" style={{ color: "#a78bfa" }}>● Full access</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-0.5">
          {saNav.map((item) => (
            <Link key={item.href} href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
              style={{ color: "#6b7faa" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#1a2236"; (e.currentTarget as HTMLElement).style.color = "#e2e8f0"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = ""; (e.currentTarget as HTMLElement).style.color = "#6b7faa"; }}
            >
              <item.icon size={16} />{item.label}
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t space-y-1" style={{ borderColor: "#1a2236" }}>
          <Link href="/admin/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all" style={{ color: "#22c55e" }}
            onMouseEnter={e => (e.currentTarget.style.background = "#22c55e10")}
            onMouseLeave={e => (e.currentTarget.style.background = "")}
          >
            <Zap size={16} /><span className="flex-1">Admin Panel</span><ChevronRight size={12} />
          </Link>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all" style={{ color: "#ef4444" }}
            onMouseEnter={e => (e.currentTarget.style.background = "#ef444410")}
            onMouseLeave={e => (e.currentTarget.style.background = "")}
          >
            <LogOut size={16} />Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 overflow-y-auto" style={{ background: "#06080f" }}>
        {/* SA top bar */}
        <div className="sticky top-0 z-20 px-6 py-3 flex items-center gap-3 border-b" style={{ background: "#090d18aa", backdropFilter: "blur(12px)", borderColor: "#1a2236" }}>
          <div className="flex items-center gap-2 flex-1">
            <AlertOctagon size={14} style={{ color: "#a78bfa" }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#a78bfa" }}>Super Admin Zone</span>
          </div>
          <div className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-full" style={{ background: "#7c3aed18", color: "#a78bfa", border: "1px solid #7c3aed40" }}>
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            System operational
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
