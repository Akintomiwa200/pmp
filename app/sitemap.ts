// app/sitemap.ts
import type { MetadataRoute } from "next";

const BASE = process.env.NEXT_PUBLIC_APP_URL ?? "https://pmpath.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const staticPages = [
    { url: BASE, priority: 1.0, changeFrequency: "weekly" as const },
    { url: `${BASE}/about`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${BASE}/pricing`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${BASE}/contact`, priority: 0.6, changeFrequency: "monthly" as const },
    { url: `${BASE}/learn/beginner`, priority: 0.9, changeFrequency: "weekly" as const },
    { url: `${BASE}/learn/intermediate`, priority: 0.9, changeFrequency: "weekly" as const },
    { url: `${BASE}/learn/advanced`, priority: 0.9, changeFrequency: "weekly" as const },
    { url: `${BASE}/learn/beginner/simulation`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${BASE}/learn/intermediate/kanban`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${BASE}/learn/intermediate/peerreview`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${BASE}/learn/intermediate/resources`, priority: 0.7, changeFrequency: "weekly" as const },
    { url: `${BASE}/learn/advanced/flashcards`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${BASE}/learn/advanced/mockexam`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${BASE}/learn/advanced/studygroups`, priority: 0.7, changeFrequency: "weekly" as const },
    { url: `${BASE}/learn/advanced/analytics`, priority: 0.7, changeFrequency: "weekly" as const },
    { url: `${BASE}/events`, priority: 0.8, changeFrequency: "daily" as const },
    { url: `${BASE}/events/submit`, priority: 0.5, changeFrequency: "monthly" as const },
    { url: `${BASE}/community`, priority: 0.8, changeFrequency: "daily" as const },
    { url: `${BASE}/community/network`, priority: 0.7, changeFrequency: "daily" as const },
    { url: `${BASE}/mentorship`, priority: 0.8, changeFrequency: "weekly" as const },
    { url: `${BASE}/mentorship/match`, priority: 0.8, changeFrequency: "weekly" as const },
    { url: `${BASE}/jobs`, priority: 0.8, changeFrequency: "daily" as const },
    { url: `${BASE}/resources`, priority: 0.7, changeFrequency: "weekly" as const },
    { url: `${BASE}/glossary`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${BASE}/quiz`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${BASE}/roadmap`, priority: 0.7, changeFrequency: "weekly" as const },
    { url: `${BASE}/leaderboard`, priority: 0.6, changeFrequency: "daily" as const },
    { url: `${BASE}/onboarding`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${BASE}/auth/signup`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${BASE}/terms`, priority: 0.3, changeFrequency: "yearly" as const },
    { url: `${BASE}/privacy`, priority: 0.3, changeFrequency: "yearly" as const },
  ];

  return staticPages.map((page) => ({
    ...page,
    lastModified: now,
  }));
}
