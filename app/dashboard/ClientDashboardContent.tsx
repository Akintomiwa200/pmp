"use client";

import dynamic from "next/dynamic";

// Force the entire dashboard page (with Recharts) to load ONLY on the client
const DashboardPage = dynamic(
  () => import("./page"),
  { 
    ssr: false,
    loading: () => <div className="p-8 text-center">Loading dashboard...</div> // optional nice loading state
  }
);

export default function ClientDashboardContent() {
  return <DashboardPage />;
}