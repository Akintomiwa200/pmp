// components/ui/JobAlertForm.tsx
"use client";
import { useState } from "react";
import { Bell, CheckCircle2 } from "lucide-react";

export default function JobAlertForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await fetch("/api/alerts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, type: "job", filters: {} }),
      });
      setDone(true);
    } catch {
      setDone(true);
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="flex items-center gap-2 text-sm text-brand-700 dark:text-brand-400 font-semibold">
        <CheckCircle2 size={16} className="text-brand-500" />
        Job alerts activated! Check your inbox.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="input flex-1 text-sm py-2"
        required
      />
      <button type="submit" disabled={loading || !email}
        className="btn-primary text-sm py-2 px-4 whitespace-nowrap disabled:opacity-60">
        <Bell size={14} />
        {loading ? "..." : "Alert Me"}
      </button>
    </form>
  );
}
