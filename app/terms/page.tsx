// app/terms/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import MarketingShell from "@/components/layout/MarketingShell";

export const metadata: Metadata = { title: "Terms of Service | PMPath" };

const SECTIONS = [
  { id: "acceptance", title: "1. Acceptance of Terms", content: "By accessing or using PMPath ('the Platform'), you agree to be bound by these Terms of Service ('Terms'). If you do not agree to these Terms, please do not use the Platform. PMPath reserves the right to update these Terms at any time. Continued use of the Platform after changes constitutes acceptance of the updated Terms." },
  { id: "accounts", title: "2. User Accounts", content: "You must be at least 18 years old to create an account. You are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account. You must provide accurate, current, and complete information during registration. You may not use another person's account without permission. PMPath reserves the right to terminate accounts that violate these Terms." },
  { id: "content", title: "3. Content and Intellectual Property", content: "All content on PMPath — including courses, quizzes, articles, templates, and design elements — is owned by PMPath or its content partners and is protected by copyright. You may not reproduce, distribute, or create derivative works from our content without explicit written permission. User-generated content (forum posts, submitted projects) remains your property, but you grant PMPath a licence to display and use this content on the Platform." },
  { id: "conduct", title: "4. Community Conduct", content: "Users of the PMPath community agree to: be respectful and constructive in all interactions; not post spam, promotional content, or misleading information; not harass, bully, or discriminate against other users; not share copyrighted material without authorisation; report violations using the built-in flagging system. PMPath moderators may remove content or suspend accounts that violate these guidelines." },
  { id: "subscription", title: "5. Subscription and Payments", content: "Free accounts provide access to core learning content at no charge. Premium subscriptions are billed monthly or annually as stated at the time of purchase. All payments are processed securely via Stripe. Subscriptions auto-renew unless cancelled before the renewal date. Refunds may be requested within 7 days of initial purchase or annual renewal. PMPath reserves the right to change pricing with 30 days' notice to existing subscribers." },
  { id: "data", title: "6. Data and Privacy", content: "Your use of PMPath is also governed by our Privacy Policy, which is incorporated into these Terms by reference. We collect and process personal data as described in our Privacy Policy. You may request export or deletion of your personal data at any time via your account Settings page or by contacting hello@pmpath.app." },
  { id: "disclaimer", title: "7. Disclaimers and Limitations", content: "PMPath provides educational content for informational purposes only. We do not guarantee employment outcomes, certification exam results, or career advancement. Course content is maintained to the best of our ability but may not always reflect the latest industry standards. PMPath is not liable for any direct, indirect, incidental, or consequential damages arising from your use of the Platform. Our total liability is limited to the amount paid for the subscription in the 12 months preceding any claim." },
  { id: "termination", title: "8. Termination", content: "You may close your account at any time via the Settings page. PMPath may suspend or terminate your account if you violate these Terms. Upon termination, your access to Premium features ceases. Your data will be retained per our Privacy Policy retention schedule unless you request deletion." },
  { id: "governing", title: "9. Governing Law", content: "These Terms are governed by the laws of the jurisdiction in which PMPath is registered. Any disputes will be resolved through binding arbitration rather than litigation, except where prohibited by applicable law." },
  { id: "contact", title: "10. Contact Us", content: "If you have questions about these Terms, please contact us at legal@pmpath.app or through the Contact page on our website." },
];

export default function TermsPage() {
  return (
    <MarketingShell>
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-20">
      <div className="mb-10">
        <p className="text-xs font-bold uppercase tracking-widest text-ink-subtle mb-3">Legal</p>
        <h1 className="text-4xl font-display font-bold text-ink mb-3">Terms of Service</h1>
        <p className="text-ink-muted">Last updated: March 28, 2025</p>
        <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-2xl">
          <p className="text-sm text-amber-800">
            <strong>Summary:</strong> Use PMPath fairly and respectfully. Don't copy our content without permission.
            Premium subscriptions auto-renew and can be cancelled anytime. Your data is yours.
          </p>
        </div>
      </div>

      {/* Quick nav */}
      <nav className="card p-4 mb-8">
        <p className="text-xs font-semibold text-ink-subtle mb-2 uppercase tracking-wide">Jump to Section</p>
        <div className="flex flex-wrap gap-2">
          {SECTIONS.map(s => (
            <a key={s.id} href={`#${s.id}`} className="text-xs px-2.5 py-1 rounded-lg bg-surface-1 border border-surface-3 text-ink-muted hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-300 dark:hover:border-cyan-700 transition-all">
              {s.title.split(". ")[1]}
            </a>
          ))}
        </div>
      </nav>

      <div className="space-y-8">
        {SECTIONS.map(section => (
          <section key={section.id} id={section.id}>
            <h2 className="text-xl font-display font-bold text-ink mb-3">{section.title}</h2>
            <p className="text-ink-muted leading-relaxed text-sm">{section.content}</p>
          </section>
        ))}
      </div>

      <div className="mt-12 pt-8 border-t border-surface-3 flex flex-wrap gap-4 justify-between items-center">
        <p className="text-sm text-ink-subtle">© 2025 PMPath. All rights reserved.</p>
        <div className="flex gap-4">
          <Link href="/privacy" className="text-sm text-cyan-600 dark:text-cyan-400 hover:underline">Privacy Policy</Link>
          <Link href="/contact" className="text-sm text-cyan-600 dark:text-cyan-400 hover:underline">Contact Us</Link>
        </div>
      </div>
    </div>
    </MarketingShell>
  );
}
