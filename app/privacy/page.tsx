// app/privacy/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { Shield, Eye, Database, Trash2, Download, Mail } from "lucide-react";

export const metadata: Metadata = { title: "Privacy Policy | PMPath" };

const RIGHTS = [
  { icon: Eye, title: "Right to Access", desc: "Request a copy of all personal data we hold about you." },
  { icon: Download, title: "Right to Portability", desc: "Export your data in a machine-readable format (JSON) from Settings." },
  { icon: Trash2, title: "Right to Erasure", desc: "Request deletion of your personal data at any time." },
  { icon: Shield, title: "Right to Object", desc: "Object to certain types of data processing, including marketing." },
];

const SECTIONS = [
  { title: "What Data We Collect", content: [
    "Account information: name, email address, password (hashed using bcrypt), and optional profile fields.",
    "Learning data: course progress, quiz scores, module completions, streaks, and badges.",
    "Community data: forum posts, replies, and upvotes.",
    "Usage data: pages visited, features used, and session duration (anonymised and aggregated).",
    "Device information: browser type, operating system, and IP address for security purposes.",
  ]},
  { title: "How We Use Your Data", content: [
    "To provide and improve the PMPath learning platform.",
    "To personalise content recommendations and learning paths.",
    "To send transactional emails (account confirmation, password reset, progress updates).",
    "To send marketing emails only where you have explicitly opted in.",
    "To detect and prevent fraud, abuse, and security threats.",
    "To generate aggregated, anonymised analytics for platform improvement.",
  ]},
  { title: "Data Sharing", content: [
    "We do not sell your personal data to third parties. Ever.",
    "We use Stripe for payment processing. Stripe handles all card data — we never store it.",
    "We use analytics services (aggregated data only, no individual tracking).",
    "We may disclose data if required by law, court order, or to protect the safety of users.",
    "We share mentor match data only with the matched mentor and only with your consent.",
  ]},
  { title: "Data Retention", content: [
    "Account data is retained for as long as your account is active.",
    "After account deletion, personal data is removed within 30 days.",
    "Aggregated, anonymised analytics data may be retained indefinitely.",
    "Backup copies may persist for up to 90 days after deletion requests.",
  ]},
  { title: "Cookies", content: [
    "Authentication cookies: required for you to stay logged in.",
    "Preference cookies: store your settings (dark mode, language).",
    "Analytics cookies: anonymised usage tracking. You can opt out in Settings.",
    "We do not use third-party advertising cookies.",
  ]},
  { title: "Security", content: [
    "All data is transmitted over HTTPS with TLS encryption.",
    "Passwords are hashed using bcrypt — we cannot see your password.",
    "We conduct regular security audits and penetration testing.",
    "Access to user data by PMPath staff is logged and restricted to need.",
    "In the event of a data breach, we will notify affected users within 72 hours per GDPR requirements.",
  ]},
];

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-10">
        <p className="text-xs font-bold uppercase tracking-widest text-ink-subtle mb-3">Legal</p>
        <h1 className="text-4xl font-display font-bold text-ink mb-3">Privacy Policy</h1>
        <p className="text-ink-muted">Last updated: March 28, 2025 · GDPR Compliant</p>
        <div className="mt-4 p-4 bg-brand-50 border border-brand-200 rounded-2xl flex items-start gap-3">
          <Shield size={16} className="text-brand-600 shrink-0 mt-0.5" />
          <p className="text-sm text-brand-800">
            <strong>Plain English Summary:</strong> We collect only what's needed to run PMPath.
            We never sell your data. You can export or delete everything at any time from your Settings page.
          </p>
        </div>
      </div>

      {/* Your Rights prominently */}
      <div className="card p-6 mb-10">
        <h2 className="font-display font-bold text-xl text-ink mb-5">Your Data Rights (GDPR)</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {RIGHTS.map((right) => (
            <div key={right.title} className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-brand-50 flex items-center justify-center shrink-0">
                <right.icon size={16} className="text-brand-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-ink">{right.title}</p>
                <p className="text-xs text-ink-muted mt-0.5">{right.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-5 pt-4 border-t border-surface-2 flex flex-wrap gap-3">
          <Link href="/settings" className="btn-secondary text-sm"><Download size={13} />Export My Data</Link>
          <a href="mailto:privacy@pmpath.app" className="btn-ghost text-sm"><Mail size={13} />Email Privacy Team</a>
        </div>
      </div>

      {/* Policy sections */}
      <div className="space-y-8">
        {SECTIONS.map((section) => (
          <section key={section.title}>
            <h2 className="text-xl font-display font-bold text-ink mb-3">{section.title}</h2>
            <ul className="space-y-2">
              {section.content.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-ink-muted">
                  <span className="text-brand-400 shrink-0 mt-1">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className="mt-12 p-6 bg-surface-1 border border-surface-3 rounded-2xl">
        <h2 className="font-semibold text-ink mb-2">Questions About Privacy?</h2>
        <p className="text-sm text-ink-muted mb-3">Our Data Protection Officer is available to answer any privacy-related questions.</p>
        <a href="mailto:privacy@pmpath.app" className="btn-secondary text-sm"><Mail size={13} />privacy@pmpath.app</a>
      </div>

      <div className="mt-8 pt-6 border-t border-surface-3 flex flex-wrap gap-4 justify-between items-center">
        <p className="text-sm text-ink-subtle">© 2025 PMPath</p>
        <div className="flex gap-4">
          <Link href="/terms" className="text-sm text-brand-600 hover:underline">Terms of Service</Link>
          <Link href="/contact" className="text-sm text-brand-600 hover:underline">Contact Us</Link>
        </div>
      </div>
    </div>
  );
}
