import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { dashboardNav } from "@/components/dashboard/nav";
import { UserSidebar } from "@/components/dashboard/UserSidebar";
import { auth } from "@/lib/auth";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login?from=%2Fdashboard");
  }

  return (
    <DashboardShell
      nav={dashboardNav}
      sidebar={
        <UserSidebar
          userName={session.user.name ?? "User"}
          userRoleLabel={session.user.level ?? "Member"}
        />
      }
      title="Dashboard"
      subtitle="March 28, THU"
      userName={session.user.name ?? "User"}
      userRoleLabel={session.user.level ?? "Member"}
      badgeLabel="7 days"
    >
      <DashboardClient />
    </DashboardShell>
  );
}
