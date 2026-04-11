"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

/**
 * Public marketing-style pages: same chrome as the home page (floating nav + footer)
 * and CSS variable background/text for light/dark theme.
 */
export default function MarketingShell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <>
      <Navbar />
      <div
        className={`min-h-screen bg-[var(--bg)] text-[var(--text)] pt-28 sm:pt-32 ${className}`.trim()}
      >
        {children}
      </div>
      <Footer />
    </>
  );
}
