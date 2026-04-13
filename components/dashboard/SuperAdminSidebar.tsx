"use client";

import Link from "next/link";
import { AlertOctagon, Zap, LogOut, ChevronRight, X } from "lucide-react";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { superAdminNav } from "./nav";

type SuperAdminSidebarProps = {
  open?: boolean;
  onClose?: () => void;
};

function SidebarContent() {
  return (
    <DashboardSidebar
      nav={superAdminNav}
      className="flex w-full h-full flex-col bg-[#090d18]"
      linkClassName="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#6b7faa] transition-all"
      activeLinkClassName="bg-[#1a2236] text-[#e2e8f0]"
      header={
        <>
          <div className="p-5 border-b" style={{ borderColor: "#1a2236" }}>
            <div
              className="flex items-center gap-2 px-3 py-2 rounded-xl"
              style={{ background: "linear-gradient(135deg, #7c3aed20, #1d4ed820)", border: "1px solid #7c3aed40" }}
            >
              <AlertOctagon size={16} style={{ color: "#a78bfa" }} />
              <div>
                <p className="text-xs font-bold" style={{ color: "#a78bfa" }}>
                  SUPER ADMIN
                </p>
                <p className="text-[9px]" style={{ color: "#6b4fa0" }}>
                  Elevated Access
                </p>
              </div>
            </div>
          </div>
          <div className="px-4 py-3 border-b" style={{ borderColor: "#1a2236" }}>
            <div className="flex items-center gap-3 p-2 rounded-xl" style={{ background: "#111827" }}>
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-bold"
                style={{ background: "linear-gradient(135deg, #7c3aed, #1d4ed8)" }}
              >
                SA
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-white">Super Admin</p>
                <p className="text-[10px]" style={{ color: "#a78bfa" }}>
                  ● Full access
                </p>
              </div>
            </div>
          </div>
        </>
      }
      footer={
        <div className="p-3 border-t space-y-1" style={{ borderColor: "#1a2236" }}>
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#22c55e] transition-all hover:bg-[#22c55e10]"
          >
            <Zap size={16} />
            <span className="flex-1">Admin Panel</span>
            <ChevronRight size={12} />
          </Link>
          <button
            className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#ef4444] transition-all hover:bg-[#ef444410]"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      }
    />
  );
}

export function SuperAdminSidebar({ open = false, onClose }: SuperAdminSidebarProps) {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-60 shrink-0 flex-col border-r bg-[#090d18]" style={{ borderColor: "#1a2236" }}>
        <SidebarContent />
      </aside>

      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          {/* Drawer */}
          <aside className="relative w-72 h-full flex flex-col bg-[#090d18] shadow-2xl animate-slide-in-left">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-lg z-10 transition-all"
              style={{ background: "#111827" }}
              aria-label="Close sidebar"
            >
              <X size={16} style={{ color: "#a78bfa" }} />
            </button>
            <SidebarContent />
          </aside>
        </div>
      )}
    </>
  );
}
