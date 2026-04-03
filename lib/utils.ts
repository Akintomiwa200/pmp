// lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatDateShort(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function formatTime(dateStr: string): string {
  return new Date(dateStr).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  });
}

export function timeAgo(dateStr: string): string {
  const now = Date.now();
  const diff = now - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

export function getLevelColor(level: string) {
  switch (level) {
    case "beginner": return { bg: "bg-beginner-light", text: "text-beginner-dark", border: "border-beginner", dot: "bg-beginner" };
    case "intermediate": return { bg: "bg-intermediate-light", text: "text-intermediate-dark", border: "border-intermediate", dot: "bg-intermediate" };
    case "advanced": return { bg: "bg-advanced-light", text: "text-advanced-dark", border: "border-advanced", dot: "bg-advanced" };
    default: return { bg: "bg-surface-2", text: "text-ink-muted", border: "border-surface-3", dot: "bg-ink-subtle" };
  }
}

export function getLevelLabel(level: string): string {
  return level.charAt(0).toUpperCase() + level.slice(1);
}

export function formatCurrency(amount: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: 0 }).format(amount);
}

export function slugify(text: string): string {
  return text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "…";
}

export function generateId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

export const levelRoadmap = {
  beginner: [
    { milestone: "PM Fundamentals", done: true },
    { milestone: "Agile & Scrum Basics", done: false },
    { milestone: "First Project Simulation", done: false },
    { milestone: "CAPM Prep", done: false },
  ],
  intermediate: [
    { milestone: "Risk Management", done: false },
    { milestone: "Stakeholder Communication", done: false },
    { milestone: "Resource Allocation", done: false },
    { milestone: "Advanced Agile", done: false },
  ],
  advanced: [
    { milestone: "PMBOK 7 Mastery", done: false },
    { milestone: "PMP Mock Exams", done: false },
    { milestone: "Leadership & Strategy", done: false },
    { milestone: "PMP Certification", done: false },
  ],
};
