"use client";

import { DashboardShell } from "@/components/layout/DashboardShell";
import { dashboardNav } from "@/components/dashboard/nav";
import { UserSidebar } from "@/components/dashboard/UserSidebar";

export default function LearnLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardShell
      nav={dashboardNav}
      sidebar={<UserSidebar userName="Alex Rivera" userRoleLabel="Track Learner" />}
      title="Learn"
      subtitle="Structured tracks and focused playlists"
      userName="Alex Rivera"
      userRoleLabel="Track Learner"
      badgeLabel="Learning"
    >
      {children}
    </DashboardShell>
  );
}
