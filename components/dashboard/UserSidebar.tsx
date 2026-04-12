"use client";

import Link from "next/link";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { dashboardNav } from "./nav";

type UserSidebarProps = {
  userName?: string;
  userRoleLabel?: string;
};

export function UserSidebar({ userName = "Learner", userRoleLabel = "Beginner" }: UserSidebarProps) {
  const initials = userName.charAt(0).toUpperCase();

  return (
    <DashboardSidebar
      nav={dashboardNav}
      className="hidden lg:flex w-56 shrink-0 flex-col rounded-3xl border border-slate-200/70 bg-white shadow-sm overflow-hidden"
      linkClassName="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all text-slate-500"
      activeLinkClassName="bg-brand-600 text-white shadow-sm"
      header={
        <div className="p-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-brand-400 to-brand-700 flex items-center justify-center text-white font-bold text-sm shadow-sm">
              {initials}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-ink truncate">{userName}</p>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                <span className="text-[10px] text-ink-subtle">{userRoleLabel}</span>
              </div>
            </div>
          </div>
        </div>
      }
      footer={
        <div className="p-3 space-y-1 border-t border-slate-100">
          <Link
            href="/settings"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:bg-slate-50"
          >
            <span className="text-brand-500">⚙️</span>
            <span>Settings</span>
          </Link>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors">
            <span>🔓</span>
            Logout
          </button>
        </div>
      }
    />
  );
}
