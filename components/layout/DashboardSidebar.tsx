"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";

export type SidebarNavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  active?: boolean;
};

type DashboardSidebarProps = {
  nav: SidebarNavItem[];
  header?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  linkClassName?: string;
  activeLinkClassName?: string;
};

export function DashboardSidebar({
  nav,
  header,
  footer,
  className = "",
  linkClassName = "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
  activeLinkClassName = "bg-brand-600 text-white shadow-sm",
}: DashboardSidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <aside className={className}>
      {header}
      <nav className="flex-1 overflow-y-auto space-y-1 px-3 py-2">
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`${linkClassName} ${isActive(item.href) ? activeLinkClassName : "text-slate-500 hover:bg-slate-50 hover:text-ink"}`}
          >
            <item.icon size={16} />
            {item.label}
          </Link>
        ))}
      </nav>
      {footer}
    </aside>
  );
}
