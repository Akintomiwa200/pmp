import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { dashboardNav } from "@/components/dashboard/nav";
import { UserSidebar } from "@/components/dashboard/UserSidebar";
import { auth } from "@/lib/auth";
import dynamic from "next/dynamic";

// Dynamically import the children (dashboard page content) with SSR disabled
// This prevents Recharts from running on the server during build
const DynamicDashboardContent = dynamic(
  () => import("./page"), // Adjust the path if your page file is named differently
  { ssr: false }
);

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
      {/* Replace {children} with the dynamic wrapper */}
      <DynamicDashboardContent />
    </DashboardShell>
  );
}