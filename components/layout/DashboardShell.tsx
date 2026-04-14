"use client";

import { useState } from "react";
import { Bell, Flame, Search, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DashboardSidebar, type SidebarNavItem } from "./DashboardSidebar";

type DashboardShellProps = {
  children: React.ReactNode;
  nav?: SidebarNavItem[];
  sidebar?: React.ReactNode;
  title?: string;
  subtitle?: string;
  badgeLabel?: string;
  userName?: string;
  userRoleLabel?: string;
  mobileNavLabel?: string;
  searchPlaceholder?: string;
};

export function DashboardShell({
  children,
  nav,
  sidebar,
  title = "Dashboard",
  subtitle = "Today",
  badgeLabel = "7 days",
  userName = "Your Name",
  userRoleLabel = "Beginner",
  mobileNavLabel = "Explore",
  searchPlaceholder = "Search courses, events...",
}: DashboardShellProps) {
  const navList = nav ?? [];
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const defaultSidebar = (
    <DashboardSidebar
      nav={navList}
      className="flex w-full h-full flex-col rounded-3xl border border-slate-200/70 bg-white shadow-sm overflow-hidden"
      linkClassName="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all text-slate-500"
      activeLinkClassName="bg-brand-600 text-white shadow-sm"
      header={
        <div className="p-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-brand-400 to-brand-700 flex items-center justify-center text-white font-bold text-sm shadow-sm">
              {userName.charAt(0).toUpperCase()}
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
            href="/dashboard/settings"
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

  const sidebarContent = sidebar ?? defaultSidebar;

  return (
    <div className="min-h-screen bg-slate-50 font-body">
      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="relative w-72 h-full flex flex-col bg-white shadow-2xl animate-slide-in-left">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg z-10 bg-slate-100 transition-all"
              aria-label="Close sidebar"
            >
              <X size={16} className="text-slate-500" />
            </button>
            {sidebarContent}
          </aside>
        </div>
      )}

      <div className="mx-auto grid gap-6 px-4 py-6 lg:grid-cols-[220px_minmax(0,1fr)]">
        {/* Desktop sidebar */}
        <div className="hidden lg:block">
          {sidebarContent}
        </div>

        <div className="flex flex-col gap-4">
          <header className="sticky top-4 z-20 rounded-3xl border border-slate-200 bg-white/90 px-4 py-3 shadow-sm backdrop-blur-md lg:top-6">
            <div className="flex flex-wrap items-center gap-3">
              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden p-2 -ml-1 rounded-xl text-slate-500 hover:bg-slate-50 transition-colors"
                aria-label="Open sidebar"
              >
                <Menu size={20} />
              </button>

              <div className="flex-1 min-w-0">
                <h1 className="text-base font-bold text-ink">{title}</h1>
                <p className="text-[11px] text-slate-400">{subtitle}</p>
              </div>
              <div className="relative flex h-auto flex-1 max-w-sm items-center hidden sm:flex">
                <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  placeholder={searchPlaceholder}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-10 py-2 text-xs focus:border-brand-400 focus:bg-white focus:outline-none"
                />
              </div>
              <div className="flex items-center gap-1.5 rounded-full border border-orange-200 bg-orange-50 px-3 py-1.5">
                <Flame size={13} className="text-orange-500" />
                <span className="text-[11px] font-bold text-orange-700">{badgeLabel}</span>
              </div>
              <Link href="/dashboard/notifications" className="relative rounded-xl p-2.5 text-slate-500 transition-colors hover:bg-slate-50">
                <Bell size={17} />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full border-2 border-white bg-red-500" />
              </Link>
            </div>
          </header>

          <nav className="lg:hidden flex gap-2 overflow-x-auto rounded-2xl border border-slate-200 bg-white px-3 py-2 text-[11px] font-semibold text-slate-600 shadow-sm">
            <span className="text-slate-400">{mobileNavLabel}</span>
            {navList.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-xl px-3 py-1.5 transition-colors hover:bg-slate-100 ${
                  pathname === item.href || pathname.startsWith(`${item.href}/`) ? "bg-brand-600 text-white" : "bg-slate-50"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <main className="space-y-5">{children}</main>
        </div>
      </div>
    </div>
  );
}
