"use client";

import dynamic from "next/dynamic";

// Dynamically import the actual dashboard page (your Recharts-heavy page)
// with SSR completely disabled
const DashboardPage = dynamic(
  () => import("./page"),
  { ssr: false }
);

export default function ClientDashboardContent() {
  return <DashboardPage />;
}