"use client";

import Link from "next/link";
import {
  Shield,
  Zap,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { adminNav } from "./nav";

export function AdminSidebar() {
  return (
    <DashboardSidebar
      nav={adminNav}
      className="hidden lg:flex w-60 shrink-0 flex-col border-r bg-[#0d1424]"
      linkClassName="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#6b8aad] transition-all"
      activeLinkClassName="bg-[#1a2840] text-[#e2e8f0]"
      header={
        <>
          <div className="p-5 border-b" style={{ borderColor: "#1e2a3d" }}>
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #16a34a, #0891b2)" }}
              >
                <span className="text-white font-bold text-sm">PM</span>
              </div>
              <div>
                <p className="text-white font-bold text-sm">PMPath</p>
                <p className="text-[10px]" style={{ color: "#4a6080" }}>
                  Admin Panel
                </p>
              </div>
            </div>
          </div>
          <div className="px-4 py-3 border-b" style={{ borderColor: "#1e2a3d" }}>
            <div
              className="flex items-center gap-3 p-2 rounded-xl cursor-pointer"
              style={{ background: "#151f30" }}
            >
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-bold shrink-0"
                style={{ background: "linear-gradient(135deg, #1d4ed8, #7c3aed)" }}
              >
                A
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-white truncate">Sarah Chen</p>
                <p className="text-[10px] truncate" style={{ color: "#22c55e" }}>
                  ● Admin
                </p>
              </div>
              <ChevronDown size={12} style={{ color: "#4a6080" }} />
            </div>
          </div>
        </>
      }
      footer={
        <div className="p-3 space-y-1 border-t" style={{ borderColor: "#1e2a3d" }}>
          <Link
            href="/superadmin/dashboard"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#22c55e] transition-all"
            style={{ background: "linear-gradient(135deg, #7c3aed20, #1d4ed820)", border: "1px solid #7c3aed30" }}
          >
            <Shield size={16} />
            <span className="flex-1">Super Admin</span>
            <Zap size={12} />
          </Link>
          <button
            className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#ef4444] transition-all hover:bg-[#ef444410]"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      }
    />
  );
}
