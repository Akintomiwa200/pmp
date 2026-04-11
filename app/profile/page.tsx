// app/profile/page.tsx
import type { Metadata } from "next";
import { User, MapPin, Target, Star, Flame, Edit2, Trophy } from "lucide-react";
import { LinkedInIcon } from "@/components/icons/LinkedInIcon";
import { BADGES } from "@/types";

export const metadata: Metadata = { title: "My Profile" };

const DEMO_USER = {
  name: "Alex Rivera",
  email: "alex@example.com",
  level: "beginner",
  bio: "Career switcher from marketing, passionate about building great teams.",
  location: "New York, USA",
  linkedIn: "https://linkedin.com/in/alexrivera",
  streak: 7,
  totalPoints: 1240,
  joinedAt: "2025-01-15",
  badges: ["first_login", "quiz_ace", "streak_7"],
  goals: ["Get PMP certified in 6 months", "Land a PM role at a tech company"],
  completedModules: 12,
  subscription: "free",
};

export default function ProfilePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left: Profile card */}
        <div className="space-y-5">
          <div className="card p-6 text-center space-y-4">
            <div className="relative inline-block">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-brand-400 to-brand-700 flex items-center justify-center text-white text-3xl font-display font-bold mx-auto">
                {DEMO_USER.name.charAt(0)}
              </div>
              <button className="absolute -bottom-2 -right-2 w-7 h-7 bg-white border border-surface-3 rounded-lg flex items-center justify-center shadow-sm hover:bg-surface-1 transition-colors">
                <Edit2 size={12} className="text-ink-muted" />
              </button>
            </div>
            <div>
              <h1 className="text-xl font-display font-bold text-ink">{DEMO_USER.name}</h1>
              <p className="text-sm text-ink-subtle">{DEMO_USER.email}</p>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className={`badge-${DEMO_USER.level}`}>
                {DEMO_USER.level === "beginner" ? "🌱" : DEMO_USER.level === "intermediate" ? "📈" : "🏆"}{" "}
                {DEMO_USER.level.charAt(0).toUpperCase() + DEMO_USER.level.slice(1)}
              </span>
            </div>
            {DEMO_USER.bio && (
              <p className="text-sm text-ink-muted leading-relaxed">{DEMO_USER.bio}</p>
            )}
            <div className="space-y-2 text-sm text-ink-muted">
              {DEMO_USER.location && (
                <div className="flex items-center justify-center gap-1.5">
                  <MapPin size={13} />
                  {DEMO_USER.location}
                </div>
              )}
              {DEMO_USER.linkedIn && (
                <a href={DEMO_USER.linkedIn} className="flex items-center justify-center gap-1.5 hover:text-blue-600 transition-colors">
                  <LinkedInIcon size={13} />
                  LinkedIn Profile
                </a>
              )}
            </div>
            <div className="flex items-center justify-center gap-1.5 px-3 py-2 bg-orange-50 border border-orange-200 rounded-full">
              <Flame size={14} className="text-orange-500" />
              <span className="text-sm font-bold text-orange-700">{DEMO_USER.streak} day streak</span>
            </div>
          </div>

          {/* Stats */}
          <div className="card p-5">
            <h3 className="font-semibold text-ink mb-4">Stats</h3>
            <div className="space-y-3">
              {[
                { label: "Total Points", value: DEMO_USER.totalPoints.toLocaleString(), icon: Trophy, color: "text-amber-600" },
                { label: "Modules Done", value: DEMO_USER.completedModules, icon: Star, color: "text-brand-600" },
                { label: "Member Since", value: "Jan 2025", icon: User, color: "text-purple-600" },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-ink-muted">
                    <stat.icon size={14} className={stat.color} />
                    {stat.label}
                  </div>
                  <span className="text-sm font-bold text-ink">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Subscription */}
          <div className={`card p-5 ${DEMO_USER.subscription === "premium" ? "bg-purple-50 border-purple-200" : ""}`}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-ink">Plan</h3>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                DEMO_USER.subscription === "premium"
                  ? "bg-purple-100 text-purple-700"
                  : "bg-surface-2 text-ink-muted"
              }`}>
                {DEMO_USER.subscription === "premium" ? "⭐ Premium" : "Free"}
              </span>
            </div>
            {DEMO_USER.subscription === "free" && (
              <button className="btn-primary w-full justify-center text-sm" style={{ background: "#7c3aed" }}>
                Upgrade to Premium
              </button>
            )}
          </div>
        </div>

        {/* Right: Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Goals */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Target size={16} className="text-brand-600" />
                <h2 className="font-semibold text-ink">My Goals</h2>
              </div>
              <button className="btn-ghost text-xs">Edit</button>
            </div>
            <div className="space-y-2">
              {DEMO_USER.goals.map((goal) => (
                <div key={goal} className="flex items-center gap-3 p-3 bg-surface-1 rounded-xl">
                  <div className="w-2 h-2 rounded-full bg-brand-400 shrink-0" />
                  <span className="text-sm text-ink">{goal}</span>
                </div>
              ))}
              <button className="flex items-center gap-2 text-sm text-brand-600 font-medium hover:underline mt-1">
                + Add a goal
              </button>
            </div>
          </div>

          {/* Badges */}
          <div className="card p-6">
            <div className="flex items-center gap-2 mb-5">
              <Star size={16} className="text-amber-500" />
              <h2 className="font-semibold text-ink">Badges Earned</h2>
              <span className="text-xs text-ink-subtle ml-auto">{DEMO_USER.badges.length} / {Object.keys(BADGES).length}</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {Object.values(BADGES).map((badge) => {
                const earned = DEMO_USER.badges.includes(badge.id);
                return (
                  <div
                    key={badge.id}
                    className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                      earned
                        ? "bg-amber-50 border-amber-200"
                        : "bg-surface-1 border-surface-3 opacity-40 grayscale"
                    }`}
                  >
                    <span className="text-2xl">{badge.icon}</span>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-ink truncate">{badge.name}</p>
                      <p className="text-[10px] text-ink-subtle leading-tight">{badge.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Danger zone */}
          <div className="card p-6 border-red-100">
            <h2 className="font-semibold text-ink mb-1">Account</h2>
            <p className="text-sm text-ink-muted mb-4">Manage your account settings</p>
            <div className="flex flex-wrap gap-3">
              <button className="btn-secondary text-sm">Change Password</button>
              <button className="btn-secondary text-sm">Export My Data</button>
              <button className="text-sm text-red-600 hover:underline font-medium">Delete Account</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
