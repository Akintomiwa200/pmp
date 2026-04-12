"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Flame, Trophy, type LucideIcon } from "lucide-react";
import { EmptyState } from "@/components/dashboard/EmptyState";

const highlightCards = [
  {
    title: "Roadmap sync",
    subtitle: "No plan yet",
    detail: "Connect your learning profile to see live milestones.",
  },
  {
    title: "Study velocity",
    subtitle: "Awaiting activity",
    detail: "Hours tracked and streak data will appear here once you start a session.",
  },
  {
    title: "Credentials",
    subtitle: "No badges earned",
    detail: "Earn badges and certificates to unlock personalized streak insights.",
  },
];

const quickLinks: {
  label: string;
  description: string;
  href: string;
  icon: LucideIcon;
}[] = [
  {
    label: "Beginner playlist",
    description: "4 modules waiting in your queue.",
    href: "/learn/beginner",
    icon: BookOpen,
  },
  {
    label: "Mock PMP exam",
    description: "A guided practice exam is ready to schedule.",
    href: "/learn/advanced/mockexam",
    icon: Trophy,
  },
  {
    label: "Daily fuel",
    description: "Catch up on short insights and streak tips.",
    href: "/dashboard",
    icon: Flame,
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-5">
      <section className="grid gap-4 md:grid-cols-3">
        {highlightCards.map((card) => (
          <article key={card.title} className="space-y-2 rounded-2xl border border-slate-200/70 bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{card.title}</p>
            <p className="text-sm font-semibold text-ink">{card.subtitle}</p>
            <p className="text-[13px] text-slate-500">{card.detail}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_1fr]">
        <div className="space-y-3 rounded-2xl border border-slate-200/70 bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-ink">Quick actions</p>
              <p className="text-xs text-slate-500">Tap into your next step</p>
            </div>
            <Link href="/learn" className="text-xs font-semibold text-brand-600 hover:underline">
              View learn hub
            </Link>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {quickLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="flex items-start gap-3 rounded-2xl border border-slate-100 px-4 py-3 transition hover:border-brand-200"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-50 text-brand-600">
                  <link.icon size={20} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink">{link.label}</p>
                  <p className="text-xs text-slate-500">{link.description}</p>
                </div>
                <ArrowRight size={16} className="text-slate-400" />
              </Link>
            ))}
          </div>
        </div>
        <EmptyState
          title="Live stats are coming soon"
          description="Once you finish an assessment, this panel will show readiness, weak spots, and streaks."
          action={
            <Link
              href="/learn/beginner"
              className="text-xs font-semibold text-brand-600 hover:underline"
            >
              Schedule your first run <ArrowRight size={12} />
            </Link>
          }
        />
      </section>
    </div>
  );
}
