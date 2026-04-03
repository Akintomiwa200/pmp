// app/profile/edit/page.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Save, Upload, User, Target, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";

const GOALS = [
  "Get PMP certified",
  "Land my first PM role",
  "Switch from another field",
  "Improve current PM skills",
  "Prepare for CAPM",
  "Build & lead a team",
  "Understand Agile",
  "Start freelance PM work",
];

export default function ProfileEditPage() {
  const [form, setForm] = useState({
    name: "Alex Rivera",
    email: "alex@example.com",
    bio: "Career switcher from marketing, passionate about building great teams.",
    location: "New York, USA",
    linkedIn: "https://linkedin.com/in/alexrivera",
    level: "beginner",
    timezone: "EST",
    goals: ["Get PMP certified", "Land my first PM role"],
  });
  const [saving, setSaving] = useState(false);

  const toggleGoal = (goal: string) => {
    setForm((f) => ({
      ...f,
      goals: f.goals.includes(goal) ? f.goals.filter((g) => g !== goal) : [...f.goals, goal],
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    setSaving(false);
    toast.success("Profile updated successfully!");
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      <Link href="/profile" className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-ink mb-6 transition-colors">
        <ChevronLeft size={15} /> Back to Profile
      </Link>

      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-2xl bg-brand-50 flex items-center justify-center">
          <User size={20} className="text-brand-600" />
        </div>
        <div>
          <h1 className="text-2xl font-display font-bold text-ink">Edit Profile</h1>
          <p className="text-sm text-ink-muted">Update your personal information and goals</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Avatar */}
        <div className="card p-6">
          <h2 className="font-semibold text-ink mb-4">Profile Photo</h2>
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-400 to-brand-700 flex items-center justify-center text-white text-3xl font-bold">
              {form.name.charAt(0)}
            </div>
            <div className="space-y-2">
              <button className="btn-secondary text-sm flex items-center gap-2">
                <Upload size={14} /> Upload Photo
              </button>
              <p className="text-xs text-ink-subtle">JPG, PNG up to 5MB</p>
            </div>
          </div>
        </div>

        {/* Basic info */}
        <div className="card p-6 space-y-4">
          <h2 className="font-semibold text-ink">Basic Information</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-ink mb-1.5">Full Name</label>
              <input className="input" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-1.5">Email</label>
              <input className="input" type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-ink mb-1.5">Bio</label>
              <textarea className="input h-24 resize-none" value={form.bio} onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))} maxLength={280} />
              <p className="text-xs text-ink-subtle mt-1 text-right">{form.bio.length}/280</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-1.5">Location</label>
              <input className="input" placeholder="City, Country" value={form.location} onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))} />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-1.5">LinkedIn URL</label>
              <input className="input" type="url" placeholder="https://linkedin.com/in/..." value={form.linkedIn} onChange={(e) => setForm((f) => ({ ...f, linkedIn: e.target.value }))} />
            </div>
          </div>
        </div>

        {/* Learning preferences */}
        <div className="card p-6 space-y-4">
          <h2 className="font-semibold text-ink">Learning Preferences</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-ink mb-1.5">PM Level</label>
              <select className="input" value={form.level} onChange={(e) => setForm((f) => ({ ...f, level: e.target.value }))}>
                <option value="beginner">🌱 Beginner</option>
                <option value="intermediate">📈 Intermediate</option>
                <option value="advanced">🏆 Advanced</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-1.5">Timezone</label>
              <select className="input" value={form.timezone} onChange={(e) => setForm((f) => ({ ...f, timezone: e.target.value }))}>
                <option>EST (UTC-5)</option>
                <option>PST (UTC-8)</option>
                <option>GMT (UTC+0)</option>
                <option>CET (UTC+1)</option>
                <option>IST (UTC+5:30)</option>
                <option>AEST (UTC+10)</option>
                <option>WAT (UTC+1)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Goals */}
        <div className="card p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Target size={16} className="text-brand-600" />
            <h2 className="font-semibold text-ink">Learning Goals</h2>
          </div>
          <p className="text-sm text-ink-muted">Select all that apply</p>
          <div className="grid grid-cols-2 gap-2">
            {GOALS.map((goal) => {
              const selected = form.goals.includes(goal);
              return (
                <button key={goal} onClick={() => toggleGoal(goal)}
                  className={`flex items-center gap-2.5 p-3 rounded-xl border-2 text-left text-sm font-medium transition-all ${selected ? "border-brand-500 bg-brand-50 text-brand-800" : "border-surface-3 hover:border-brand-300 text-ink-muted"}`}>
                  <div className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-all ${selected ? "bg-brand-500 border-brand-500" : "border-surface-3"}`}>
                    {selected && <CheckCircle2 size={10} className="text-white" />}
                  </div>
                  {goal}
                </button>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button onClick={handleSave} disabled={saving} className="btn-primary flex-1 justify-center">
            <Save size={15} /> {saving ? "Saving..." : "Save Changes"}
          </button>
          <Link href="/profile" className="btn-secondary px-6 justify-center">Cancel</Link>
        </div>
      </div>
    </div>
  );
}
