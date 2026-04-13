"use client";

import { useState } from "react";
import { AlertOctagon, Menu } from "lucide-react";
import { SuperAdminSidebar } from "@/components/dashboard/SuperAdminSidebar";

export default function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "#06080f" }}>
      <SuperAdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* SA top bar */}
        <div
          className="sticky top-0 z-20 shrink-0 px-4 sm:px-6 py-3 flex items-center gap-3 border-b"
          style={{ background: "#090d18ee", backdropFilter: "blur(12px)", borderColor: "#1a2236" }}
        >
          {/* Mobile hamburger */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-xl transition-all"
            style={{ background: "#111827" }}
            aria-label="Open sidebar"
          >
            <Menu size={18} style={{ color: "#a78bfa" }} />
          </button>

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
            <span className="hidden sm:inline">System operational</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto" style={{ background: "#06080f" }}>
          {children}
        </div>
      </div>
    </div>
  );
}
