"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import { IconMapper } from "../dashboard/IconMapper";   // ← Make sure path is correct

export type SidebarNavItem = {
  href: string;
  label: string;
  icon: string | LucideIcon;     // Supports both string and Lucide component
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
    <div className={className}>
      {header && <div className="flex-shrink-0">{header}</div>}

      <div className="flex-1 overflow-y-auto">
        <nav className="space-y-1 p-3">
          {nav.map((item) => {
            const Icon = item.icon;   // This can be string or LucideIcon

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${linkClassName} ${
                  isActive(item.href)
                    ? activeLinkClassName
                    : "text-slate-500 hover:bg-slate-50 hover:text-ink"
                }`}
              >
                {/* Improved Icon Rendering */}
                <div className="flex h-5 w-5 items-center justify-center">
                  {typeof Icon === "string" ? (
                    <IconMapper name={Icon} size={16} />
                  ) : (
                    <Icon size={16} strokeWidth={2.5} />
                  )}
                </div>

                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {footer && <div className="flex-shrink-0">{footer}</div>}
    </div>
  );
}