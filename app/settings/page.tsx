// app/settings/page.tsx
"use client";
import { useState } from "react";
import { Bell, Shield, Eye, Globe, Moon, CreditCard, Trash2, Save, User, Volume2, Sun, Monitor, Check } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useTTS } from "@/components/providers/TTSProvider";
import Link from "next/link";
import toast from "react-hot-toast";

type Section = "profile" | "notifications" | "privacy" | "appearance" | "billing" | "account";

const NAV: { id: Section; label: string; icon: React.ElementType }[] = [
  { id: "profile",       label: "Profile",           icon: User },
  { id: "notifications", label: "Notifications",     icon: Bell },
  { id: "privacy",       label: "Privacy & Security",icon: Shield },
  { id: "appearance",    label: "Appearance",        icon: Eye },
  { id: "billing",       label: "Billing",           icon: CreditCard },
  { id: "account",       label: "Account",           icon: Globe },
];

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-surface-2 dark:border-slate-700 last:border-0">
      <span className="text-sm text-ink dark:text-slate-200">{label}</span>
      <button onClick={onChange}
        className={`relative w-11 h-6 rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 ${checked ? "bg-brand-600" : "bg-surface-3 dark:bg-slate-600"}`}>
        <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${checked ? "translate-x-5" : ""}`} />
      </button>
    </div>
  );
}

export default function SettingsPage() {
  const [section, setSection] = useState<Section>("profile");
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { isEnabled: ttsEnabled, toggleEnabled: toggleTTS } = useTTS();

  const [notifications, setNotifications] = useState({
    email_progress: true, email_events: true, email_community: false, email_marketing: false,
    push_quiz: true, push_badges: true, push_mentor: true, push_events: true, push_jobs: false,
  });
  const [privacy, setPrivacy] = useState({
    profile_public: true, show_progress: true, show_badges: true,
    analytics_sharing: true, data_export: false,
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 700));
    setSaving(false);
    toast.success("Settings saved successfully!");
  };

  const THEMES = [
    { id: "light" as const,  label: "Light",  icon: Sun },
    { id: "dark" as const,   label: "Dark",   icon: Moon },
    { id: "system" as const, label: "System", icon: Monitor },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-display font-bold text-ink dark:text-slate-100 mb-1">Settings</h1>
        <p className="text-ink-muted">Manage your account, preferences, and privacy.</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <nav className="space-y-0.5">
            {NAV.map(item => (
              <button key={item.id} onClick={() => setSection(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  section === item.id
                    ? "bg-brand-50 dark:bg-brand-950/30 text-brand-700 dark:text-brand-400"
                    : "text-ink-muted dark:text-slate-400 hover:bg-surface-1 dark:hover:bg-slate-800"
                }`}>
                <item.icon size={16} />
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <div className="lg:col-span-3">

          {/* Profile */}
          {section === "profile" && (
            <div className="card dark:bg-slate-800 dark:border-slate-700 p-6 space-y-5">
              <h2 className="font-display font-bold text-xl text-ink dark:text-slate-100">Profile Settings</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-ink dark:text-slate-200 mb-1.5">Full Name</label><input className="input dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100" defaultValue="Alex Rivera" /></div>
                <div><label className="block text-sm font-medium text-ink dark:text-slate-200 mb-1.5">Email</label><input className="input dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100" type="email" defaultValue="alex@example.com" /></div>
                <div className="sm:col-span-2"><label className="block text-sm font-medium text-ink dark:text-slate-200 mb-1.5">Bio</label><textarea className="input h-24 resize-none dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100" defaultValue="Career switcher from marketing, passionate about building great teams." /></div>
                <div><label className="block text-sm font-medium text-ink dark:text-slate-200 mb-1.5">Location</label><input className="input dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100" defaultValue="New York, USA" /></div>
                <div><label className="block text-sm font-medium text-ink dark:text-slate-200 mb-1.5">Timezone</label>
                  <select className="input dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100">
                    {["EST (UTC-5)", "PST (UTC-8)", "GMT (UTC+0)", "CET (UTC+1)", "IST (UTC+5:30)"].map(tz => <option key={tz}>{tz}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={handleSave} disabled={saving} className="btn-primary gap-2">
                  <Save size={15} />{saving ? "Saving..." : "Save Changes"}
                </button>
                <Link href="/profile/edit" className="btn-secondary">Full Profile Edit</Link>
              </div>
            </div>
          )}

          {/* Notifications */}
          {section === "notifications" && (
            <div className="card dark:bg-slate-800 dark:border-slate-700 p-6 space-y-6">
              <h2 className="font-display font-bold text-xl text-ink dark:text-slate-100">Notification Preferences</h2>
              <div>
                <p className="text-xs font-bold text-ink-subtle uppercase tracking-wider mb-3">Email Notifications</p>
                {[
                  { key: "email_progress", label: "Learning progress updates" },
                  { key: "email_events",   label: "Upcoming event reminders" },
                  { key: "email_community",label: "Community replies and mentions" },
                  { key: "email_marketing",label: "Product updates & tips (monthly)" },
                ].map(item => (
                  <Toggle key={item.key} label={item.label}
                    checked={notifications[item.key as keyof typeof notifications]}
                    onChange={() => setNotifications(n => ({ ...n, [item.key]: !n[item.key as keyof typeof n] }))} />
                ))}
              </div>
              <div>
                <p className="text-xs font-bold text-ink-subtle uppercase tracking-wider mb-3">Push Notifications</p>
                {[
                  { key: "push_quiz",   label: "Quiz results and achievements" },
                  { key: "push_badges", label: "New badges and streak milestones" },
                  { key: "push_mentor", label: "Mentor messages and session reminders" },
                  { key: "push_events", label: "Event reminders (24h before)" },
                  { key: "push_jobs",   label: "New job listings matching your level" },
                ].map(item => (
                  <Toggle key={item.key} label={item.label}
                    checked={notifications[item.key as keyof typeof notifications]}
                    onChange={() => setNotifications(n => ({ ...n, [item.key]: !n[item.key as keyof typeof n] }))} />
                ))}
              </div>
              <button onClick={handleSave} disabled={saving} className="btn-primary gap-2">
                <Save size={15} />{saving ? "Saving..." : "Save Preferences"}
              </button>
            </div>
          )}

          {/* Privacy */}
          {section === "privacy" && (
            <div className="card dark:bg-slate-800 dark:border-slate-700 p-6 space-y-6">
              <h2 className="font-display font-bold text-xl text-ink dark:text-slate-100">Privacy & Security</h2>
              <div>
                <p className="text-xs font-bold text-ink-subtle uppercase tracking-wider mb-3">Profile Visibility</p>
                {[
                  { key: "profile_public",  label: "Make profile visible to other members" },
                  { key: "show_progress",   label: "Show learning progress on profile" },
                  { key: "show_badges",     label: "Display earned badges publicly" },
                  { key: "analytics_sharing",label: "Share anonymised usage data to improve PMPath" },
                ].map(item => (
                  <Toggle key={item.key} label={item.label}
                    checked={privacy[item.key as keyof typeof privacy]}
                    onChange={() => setPrivacy(p => ({ ...p, [item.key]: !p[item.key as keyof typeof p] }))} />
                ))}
              </div>
              <div>
                <p className="text-xs font-bold text-ink-subtle uppercase tracking-wider mb-3">Password</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div><label className="block text-xs font-medium text-ink dark:text-slate-200 mb-1">Current Password</label><input type="password" className="input dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100" /></div>
                  <div><label className="block text-xs font-medium text-ink dark:text-slate-200 mb-1">New Password</label><input type="password" className="input dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100" /></div>
                </div>
                <button className="btn-secondary mt-3 text-sm">Update Password</button>
              </div>
              <div>
                <p className="text-xs font-bold text-ink-subtle uppercase tracking-wider mb-3">Your Data (GDPR)</p>
                <div className="flex flex-wrap gap-3">
                  <button className="btn-secondary text-sm gap-2"><Shield size={14} />Export My Data</button>
                  <Link href="/privacy" className="btn-ghost text-sm">Privacy Policy</Link>
                </div>
              </div>
            </div>
          )}

          {/* Appearance — dark mode + TTS */}
          {section === "appearance" && (
            <div className="card dark:bg-slate-800 dark:border-slate-700 p-6 space-y-6">
              <h2 className="font-display font-bold text-xl text-ink dark:text-slate-100">Appearance</h2>

              {/* Theme */}
              <div>
                <p className="text-sm font-semibold text-ink dark:text-slate-200 mb-3">Theme</p>
                <div className="grid grid-cols-3 gap-3">
                  {THEMES.map(t => (
                    <button key={t.id} onClick={() => setTheme(t.id)}
                      className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
                        theme === t.id ? "border-brand-500 bg-brand-50 dark:bg-brand-950/30" : "border-surface-3 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500"
                      }`}>
                      <t.icon size={22} className={theme === t.id ? "text-brand-600 dark:text-brand-400" : "text-ink-muted"} />
                      <span className={`text-sm font-medium ${theme === t.id ? "text-brand-700 dark:text-brand-400" : "text-ink-muted"}`}>{t.label}</span>
                      {theme === t.id && <Check size={13} className="text-brand-600 dark:text-brand-400" />}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-ink-subtle mt-2">
                  Currently: <strong className="text-ink dark:text-slate-300">{resolvedTheme === "dark" ? "Dark" : "Light"} Mode</strong>
                </p>
              </div>

              {/* Text-to-Speech — PRD accessibility requirement */}
              <div className="p-4 bg-surface-1 dark:bg-slate-700 rounded-2xl border border-surface-3 dark:border-slate-600">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Volume2 size={18} className="text-brand-600" />
                    <div>
                      <p className="text-sm font-semibold text-ink dark:text-slate-100">Text-to-Speech</p>
                      <p className="text-xs text-ink-muted">Read course content and quizzes aloud (uses your browser's TTS engine)</p>
                    </div>
                  </div>
                  <button onClick={toggleTTS}
                    className={`relative w-11 h-6 rounded-full transition-colors ${ttsEnabled ? "bg-brand-600" : "bg-surface-3 dark:bg-slate-500"}`}>
                    <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${ttsEnabled ? "translate-x-5" : ""}`} />
                  </button>
                </div>
                {ttsEnabled && (
                  <p className="text-xs text-brand-600 dark:text-brand-400 mt-2 flex items-center gap-1">
                    <Check size={11} />TTS enabled — content will be read aloud on supported pages
                  </p>
                )}
              </div>

              {/* Font size */}
              <div>
                <p className="text-sm font-semibold text-ink dark:text-slate-200 mb-3">Font Size</p>
                <div className="flex gap-2">
                  {["Small", "Default", "Large"].map((size, i) => (
                    <button key={size}
                      className={`flex-1 py-2.5 rounded-xl text-sm border-2 transition-all ${
                        i === 1 ? "border-brand-500 bg-brand-50 dark:bg-brand-950/30 text-brand-700 dark:text-brand-400 font-semibold"
                          : "border-surface-3 dark:border-slate-600 text-ink-muted dark:text-slate-400"
                      }`}>
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Language — PRD §3.3 multilingual placeholder */}
              <div>
                <p className="text-sm font-semibold text-ink dark:text-slate-200 mb-1.5">Language</p>
                <select className="input max-w-xs dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100">
                  <option>English (Default)</option>
                  <option disabled>Español (Coming soon)</option>
                  <option disabled>Français (Coming soon)</option>
                  <option disabled>Deutsch (Coming soon)</option>
                </select>
                <p className="text-xs text-ink-subtle mt-1">More languages coming in Phase 3.</p>
              </div>
            </div>
          )}

          {/* Billing */}
          {section === "billing" && (
            <div className="card dark:bg-slate-800 dark:border-slate-700 p-6 space-y-6">
              <h2 className="font-display font-bold text-xl text-ink dark:text-slate-100">Billing & Subscription</h2>
              <div className="p-4 bg-surface-1 dark:bg-slate-700 rounded-2xl border border-surface-3 dark:border-slate-600">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-ink-subtle mb-1">Current Plan</p>
                    <p className="text-xl font-bold text-ink dark:text-slate-100">Free</p>
                    <p className="text-sm text-ink-muted mt-1">Core learning content, community, and events.</p>
                  </div>
                  <Link href="/pricing" className="btn-primary text-sm gap-2">Upgrade to Premium</Link>
                </div>
              </div>
              <div>
                <p className="text-xs font-bold text-ink-subtle uppercase tracking-wider mb-3">What you get with Premium</p>
                {["All Intermediate & Advanced courses", "PMP mock exams & analytics", "AI mentor matching", "Unlimited flashcard sets", "Downloadable certificates"].map(f => (
                  <div key={f} className="flex items-center gap-2 py-2 border-b border-surface-2 dark:border-slate-700 last:border-0 text-sm text-ink-muted">
                    <Check size={13} className="text-brand-500 shrink-0" />{f}
                  </div>
                ))}
              </div>
              <Link href="/pricing" className="btn-primary gap-2">
                <CreditCard size={15} />View Pricing Plans
              </Link>
            </div>
          )}

          {/* Account */}
          {section === "account" && (
            <div className="card dark:bg-slate-800 dark:border-slate-700 p-6 space-y-6">
              <h2 className="font-display font-bold text-xl text-ink dark:text-slate-100">Account</h2>
              <div>
                <p className="text-sm font-semibold text-ink dark:text-slate-200 mb-1">Account ID</p>
                <p className="text-xs font-mono text-ink-subtle bg-surface-1 dark:bg-slate-700 px-3 py-2 rounded-xl">usr_001</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-ink dark:text-slate-200 mb-1">Member since</p>
                <p className="text-sm text-ink-muted">January 15, 2025</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-ink dark:text-slate-200 mb-3">Linked Accounts</p>
                <div className="flex flex-wrap gap-3">
                  <button className="btn-secondary text-sm gap-2"><span className="text-base">🔗</span>Connect Google</button>
                  <button className="btn-secondary text-sm gap-2"><span className="text-base">🔗</span>Connect GitHub</button>
                </div>
              </div>
              <div className="pt-4 border-t border-surface-3 dark:border-slate-700">
                <p className="text-xs font-bold text-red-600 uppercase tracking-wider mb-3">Danger Zone</p>
                <div className="flex flex-wrap gap-3">
                  <button className="btn-secondary text-sm text-red-600 border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-950/30 gap-2">
                    Log out everywhere
                  </button>
                  <button className="btn-secondary text-sm text-red-600 border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-950/30 gap-2">
                    <Trash2 size={14} />Delete Account
                  </button>
                </div>
                <p className="text-xs text-ink-subtle mt-2">Account deletion removes all your data within 30 days per GDPR.</p>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
