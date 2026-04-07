"use client";

import Link from "next/link";

const links = {
  Learn: [
    { label: "Beginner Path", href: "/learn/beginner" },
    { label: "Intermediate", href: "/learn/intermediate" },
    { label: "Advanced & PMP", href: "/learn/advanced" },
    { label: "Resources", href: "/resources" },
    { label: "External MOOCs", href: "/learn/intermediate/resources" },
  ],
  Community: [
    { label: "Forum", href: "/community" },
    { label: "Mentorship", href: "/mentorship" },
    { label: "Events", href: "/events" },
    { label: "Job Board", href: "/jobs" },
    { label: "Leaderboard", href: "/leaderboard" },
  ],
  Tools: [
    { label: "My Roadmap", href: "/roadmap" },
    { label: "Flashcards", href: "/learn/advanced/flashcards" },
    { label: "Mock PMP Exam", href: "/learn/advanced/mockexam" },
    { label: "Kanban Builder", href: "/learn/intermediate/kanban" },
    { label: "Study Groups", href: "/learn/advanced/studygroups" },
  ],
  Account: [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Profile", href: "/profile" },
    { label: "Certificates", href: "/certificates" },
    { label: "Pricing", href: "/pricing" },
    { label: "Sign Up", href: "/auth/signup" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-16 pb-10">
        {/* Top Section */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5">
          
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600">
                <span className="text-white text-sm font-bold">PM</span>
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                PM<span className="text-emerald-500">Path</span>
              </span>
            </div>

            <p className="text-sm leading-relaxed max-w-xs">
              Your guided journey from aspiring professional to certified
              Project Manager.
            </p>
          </div>

          {/* Link Sections */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <h3 className="text-sm font-semibold text-white mb-4 tracking-wide">
                {section}
              </h3>

              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm transition-colors hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-12 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 text-center sm:text-left">
            © {new Date().getFullYear()} PMPath. All rights reserved.
          </p>

          <div className="flex items-center gap-5 text-xs">
            <Link
              href="/privacy"
              className="transition-colors hover:text-white"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="transition-colors hover:text-white"
            >
              Terms
            </Link>
            <Link
              href="/contact"
              className="transition-colors hover:text-white"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}