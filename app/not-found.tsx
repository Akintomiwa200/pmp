// app/not-found.tsx
import Link from "next/link";
import { Home, Search, BookOpen, Users } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="text-center space-y-8 max-w-lg">
        {/* Illustration */}
        <div className="relative">
          <div className="text-[120px] font-display font-bold text-surface-2 leading-none select-none">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-brand-400 to-brand-700 flex items-center justify-center text-5xl shadow-lg animate-float">
              🗺️
            </div>
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-display font-bold text-ink mb-3">
            Looks Like You're Off the Map
          </h1>
          <p className="text-ink-muted leading-relaxed">
            The page you're looking for doesn't exist. Maybe it was moved, deleted,
            or you took a wrong turn on your PM journey.
          </p>
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { href: "/", icon: Home, label: "Back to Home" },
            { href: "/search", icon: Search, label: "Search PMPath" },
            { href: "/learn/beginner", icon: BookOpen, label: "Browse Courses" },
            { href: "/community", icon: Users, label: "Community" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="card-hover p-4 flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-xl bg-brand-50 flex items-center justify-center shrink-0">
                <link.icon size={16} className="text-brand-600" />
              </div>
              <span className="text-sm font-medium text-ink">{link.label}</span>
            </Link>
          ))}
        </div>

        <Link href="/" className="btn-primary mx-auto">
          <Home size={16} /> Go Home
        </Link>
      </div>
    </div>
  );
}
