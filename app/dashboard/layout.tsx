"use client";

import { DashboardShell } from "@/components/layout/DashboardShell";
import { dashboardNav } from "@/components/dashboard/nav";
import { UserSidebar } from "@/components/dashboard/UserSidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardShell
      nav={dashboardNav}
      sidebar={<UserSidebar userName="Alex Rivera" userRoleLabel="Beginner" />}
      title="Dashboard"
      subtitle="March 28, THU"
      userName="Alex Rivera"
      userRoleLabel="Beginner"
      badgeLabel="7 days"
    >
      {children}
    </DashboardShell>
  );
}
