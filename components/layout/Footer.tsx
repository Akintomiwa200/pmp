"use client";

import Link from "next/link";
import { useState } from "react";
import { Mail, Phone, Facebook, Instagram } from "lucide-react";

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
};

export default function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const APP_NAME = "Project Management ";

  return (
    <footer className="relative bg-cyan-800 text-gray-300 overflow-hidden">
      {/* Background Large Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-[10rem] font-bold text-white/5 select-none tracking-wider whitespace-nowrap">
          {APP_NAME}
        </span>
      </div>

      <div className="relative container mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600">
                <span className="text-white font-bold text-sm">PM</span>
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">
                PM<span className="text-emerald-500">Path</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              Your guided journey from aspiring professional to certified Project Manager.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <a
                  href="mailto:support@pmpath.com"
                  className="text-sm text-gray-300 hover:text-emerald-500 transition-colors"
                >
                  support@pmpath.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <a
                  href="tel:+1234567890"
                  className="text-sm text-gray-300 hover:text-emerald-500 transition-colors"
                >
                  +1 234 567 890
                </a>
              </div>
            </div>
          </div>

          {/* Learn Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Learn</h3>
            <ul className="space-y-3">
              {links.Learn.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-emerald-500 transition-colors text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community & Tools Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Community & Tools</h3>
            <ul className="space-y-3">
              {[...links.Community, ...links.Tools].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-emerald-500 transition-colors text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Socials */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Subscribe to Newsletter</h3>
            <p className="text-sm text-gray-400 mb-6">
              Get updates on new courses, events & tools
            </p>
            <div className="flex gap-3 mb-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-emerald-600 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-emerald-600 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
             
            </div>

            <form
              className="flex"
              onSubmit={async (e) => {
                e.preventDefault();
                setLoading(true);
                setMessage("");

                const res = await fetch("/api/newsletter", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ email }),
                });

                const data = await res.json();
                setMessage(data.message);
                setLoading(false);
                setEmail("");
              }}
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="flex-1 px-6 py-4 rounded-l-full bg-white text-gray-900 text-sm md:text-base focus:outline-none"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-gray-800 hover:bg-emerald-700 rounded-r-full transition-colors flex items-center justify-center disabled:opacity-50"
              >
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </form>
            {message && <p className="text-sm mt-3 text-green-400">{message}</p>}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} PMPath. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}