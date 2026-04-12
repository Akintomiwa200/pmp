"use client";

import { AlertOctagon } from "lucide-react";
import { SuperAdminSidebar } from "@/components/dashboard/SuperAdminSidebar";

export default function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-[calc(100vh-64px)]" style={{ background: "#06080f" }}>
      <SuperAdminSidebar />

      {/* Main */}
      <div className="flex-1 overflow-y-auto" style={{ background: "#06080f" }}>
        {/* SA top bar */}
        <div
          className="sticky top-0 z-20 px-6 py-3 flex items-center gap-3 border-b"
          style={{ background: "#090d18aa", backdropFilter: "blur(12px)", borderColor: "#1a2236" }}
        >
          <div className="flex items-center gap-2 flex-1">
            <AlertOctagon size={14} style={{ color: "#a78bfa" }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#a78bfa" }}>
              Super Admin Zone
            </span>
          </div>
          <div
            className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-full"
            style={{ background: "#7c3aed18", color: "#a78bfa", border: "1px solid #7c3aed40" }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            System operational
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
