// app/contact/page.tsx
"use client";
import { useState } from "react";
import { Mail, MessageSquare, Book, Zap, Send, CheckCircle2 } from "lucide-react";

const TOPICS = ["General Question", "Technical Issue", "Course Content", "Billing & Subscription", "Mentorship", "Report Abuse", "Partner / Press", "Other"];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-display font-bold text-ink mb-3">Get in Touch</h1>
        <p className="text-ink-muted text-lg max-w-xl mx-auto">
          Questions, feedback, or issues? We respond to every message within 24–48 hours.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Contact options */}
        <div className="space-y-4">
          {[
            { icon: Book, title: "Help Center", desc: "Browse FAQs and guides.", href: "/resources", color: "text-brand-600 bg-brand-50" },
            { icon: MessageSquare, title: "Community Forum", desc: "Ask the PMPath community.", href: "/community", color: "text-blue-600 bg-blue-50" },
            { icon: Zap, title: "Feedback", desc: "Rate your PMPath experience.", href: "/feedback", color: "text-amber-600 bg-amber-50" },
            { icon: Mail, title: "Email Us", desc: "hello@pmpath.app", href: "mailto:hello@pmpath.app", color: "text-purple-600 bg-purple-50" },
          ].map((c) => (
            <a key={c.title} href={c.href} className="card-hover p-4 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl ${c.color} flex items-center justify-center shrink-0`}>
                <c.icon size={18} />
              </div>
              <div>
                <p className="font-semibold text-ink text-sm">{c.title}</p>
                <p className="text-xs text-ink-subtle">{c.desc}</p>
              </div>
            </a>
          ))}
        </div>

        {/* Contact form */}
        <div className="lg:col-span-2">
          {submitted ? (
            <div className="card p-10 text-center space-y-4">
              <CheckCircle2 size={40} className="text-brand-500 mx-auto" />
              <h2 className="text-2xl font-display font-bold text-ink">Message Sent!</h2>
              <p className="text-ink-muted">We'll get back to you within 24–48 hours. Check your spam folder if you don't hear from us.</p>
              <button onClick={() => setSubmitted(false)} className="btn-secondary">Send Another Message</button>
            </div>
          ) : (
            <div className="card p-7 space-y-5">
              <h2 className="font-display font-bold text-xl text-ink">Send a Message</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-ink mb-1.5">Name</label>
                  <input className="input" placeholder="Your full name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink mb-1.5">Email</label>
                  <input className="input" type="email" placeholder="you@email.com" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-ink mb-1.5">Topic</label>
                <select className="input" value={topic} onChange={e => setTopic(e.target.value)}>
                  <option value="">Select a topic...</option>
                  {TOPICS.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-ink mb-1.5">Message</label>
                <textarea className="input h-36 resize-none" placeholder="Tell us what's on your mind. The more detail, the better we can help." />
              </div>
              <div>
                <label className="block text-sm font-medium text-ink mb-2">Urgency</label>
                <div className="flex gap-2">
                  {["Low – no rush", "Medium – within a week", "High – ASAP"].map((u, i) => (
                    <button key={u} className={`flex-1 py-2 text-xs rounded-xl border transition-all ${i === 0 ? "bg-brand-50 border-brand-300 text-brand-700 font-semibold" : "border-surface-3 text-ink-muted hover:border-ink/20"}`}>
                      {u}
                    </button>
                  ))}
                </div>
              </div>
              <button onClick={handleSubmit} disabled={loading} className="btn-primary w-full justify-center py-3">
                <Send size={15} /> {loading ? "Sending..." : "Send Message"}
              </button>
              <p className="text-xs text-center text-ink-subtle">
                For urgent issues, email directly: <a href="mailto:hello@pmpath.app" className="text-brand-600 hover:underline">hello@pmpath.app</a>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
