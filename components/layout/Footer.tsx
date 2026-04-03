// components/layout/Footer.tsx
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
    <footer className="bg-ink text-white/70 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-xl bg-brand-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">PM</span>
              </div>
              <span className="font-display font-bold text-xl text-white">
                PM<span className="text-brand-400">Path</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-[220px]">
              Your guided journey from aspiring professional to certified Project Manager.
            </p>
          </div>
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <h3 className="text-white font-semibold text-sm mb-4">{section}</h3>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-sm hover:text-white transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs">© 2025 PMPath. All rights reserved.</p>
          <div className="flex gap-4 text-xs">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
