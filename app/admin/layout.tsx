"use client";

import { useState } from "react";
import { Bell, Search, Menu } from "lucide-react";
import { AdminSidebar } from "@/components/dashboard/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "#0a0f1e" }}>
      {/* ── Sidebar (desktop + mobile drawer) ──────────────────── */}
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* ── Main area ─────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Top bar */}
        <div
          className="shrink-0 px-4 sm:px-6 py-3.5 flex items-center gap-4 border-b"
          style={{ background: "#0d1424", borderColor: "#1e2a3d" }}
        >
          {/* Mobile hamburger */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-xl transition-all"
            style={{ background: "#151f30" }}
            aria-label="Open sidebar"
          >
            <Menu size={18} style={{ color: "#6b8aad" }} />
          </button>

          <div className="flex-1 relative hidden sm:block">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#4a6080" }} />
            <input
              placeholder="Search users, courses, events..."
              className="w-full max-w-xs pl-9 pr-4 py-2 text-xs rounded-xl border text-white placeholder-opacity-50 focus:outline-none transition-all"
              style={{ background: "#151f30", borderColor: "#1e2a3d", color: "#94a3b8" }}
            />
          </div>
          <div className="flex items-center gap-3 ml-auto">
            <button className="relative p-2 rounded-xl transition-all" style={{ background: "#151f30" }}>
              <Bell size={16} style={{ color: "#6b8aad" }} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 border" style={{ borderColor: "#0d1424" }} />
            </button>
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: "#151f30" }}>
              <div className="w-6 h-6 rounded-lg flex items-center justify-center text-white text-[10px] font-bold" style={{ background: "linear-gradient(135deg, #1d4ed8, #7c3aed)" }}>S</div>
              <span className="text-xs font-medium hidden sm:inline" style={{ color: "#94a3b8" }}>Sarah Chen</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto" style={{ background: "#0a0f1e" }}>
          {children}
        </div>
      </div>
    </div>
  );
}
