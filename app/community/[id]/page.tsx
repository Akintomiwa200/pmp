// app/community/[id]/page.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ThumbsUp, MessageSquare, Flag, Pin, Share2, Award } from "lucide-react";

const DEMO_POST = {
  _id: "post_001",
  title: "How did you choose your first PM certification?",
  content: "Hi everyone! I'm a beginner and overwhelmed by the options — CAPM, PMP, PMI-ACP, PRINCE2... How did you all decide which one to pursue first? Any advice for someone just starting out?\n\nI'm currently in marketing and want to transition into a PM role within 12 months. I have no formal PM experience but I've been managing small internal projects informally.",
  authorName: "Alex Rivera",
  level: "beginner",
  category: "advice",
  tags: ["certification","capm","pmp","beginner"],
  upvotes: 34,
  createdAt: "Mar 20, 2025",
  isPinned: false,
  replies: [
    { _id: "r1", authorName: "Marcus Johnson", isExpert: true, content: "Great question! I started with CAPM because it has fewer prerequisites. Once I had 3 years of PM experience, I went for PMP. Start where you are — CAPM is perfect for someone with no formal PM experience. It validates your foundational knowledge and makes your resume stand out.", upvotes: 12, createdAt: "Mar 20, 2025 · 15:30" },
    { _id: "r2", authorName: "Priya Sharma", isExpert: false, content: "I went PMI-ACP first since my company is Agile-heavy. Really depends on your industry! What sector are you targeting for your PM role? Tech tends to value Agile certs, while construction/government often prefers PRINCE2 or PMP.", upvotes: 8, createdAt: "Mar 20, 2025 · 16:45" },
    { _id: "r3", authorName: "Dr. Amira Hassan", isExpert: true, content: "For someone transitioning from marketing, I'd actually recommend starting with PMI-ACP or even just working through the PMBOK basics before committing to a cert. Understanding what PMs actually do day-to-day will help you choose the right certification path.", upvotes: 15, createdAt: "Mar 21, 2025 · 09:10" },
  ],
};

export default function CommunityPostPage({ params }: { params: { id: string } }) {
  const [reply, setReply] = useState("");
  const [upvoted, setUpvoted] = useState(false);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <Link href="/community" className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-ink mb-6 transition-colors">
        <ChevronLeft size={15} /> Back to Community
      </Link>

      {/* Post */}
      <div className="card p-6 space-y-4 mb-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-brand-400 to-brand-700 flex items-center justify-center text-white font-bold shrink-0">A</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="font-semibold text-ink text-sm">{DEMO_POST.authorName}</span>
              <span className="text-xs text-ink-subtle">{DEMO_POST.createdAt}</span>
              {DEMO_POST.isPinned && <span className="flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded-full"><Pin size={9} />Pinned</span>}
              <span className="badge-beginner">{DEMO_POST.level}</span>
            </div>
            <h1 className="text-xl font-display font-bold text-ink mb-3">{DEMO_POST.title}</h1>
            <div className="text-sm text-ink-muted leading-relaxed whitespace-pre-line">{DEMO_POST.content}</div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {DEMO_POST.tags.map(t => <span key={t} className="text-xs px-2 py-0.5 bg-surface-1 border border-surface-3 rounded-full text-ink-muted">#{t}</span>)}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 pt-2 border-t border-surface-2">
          <button onClick={() => setUpvoted(!upvoted)} className={`flex items-center gap-1.5 text-sm transition-colors ${upvoted ? "text-brand-600 font-semibold" : "text-ink-muted hover:text-brand-600"}`}>
            <ThumbsUp size={15} /> {DEMO_POST.upvotes + (upvoted ? 1 : 0)}
          </button>
          <span className="flex items-center gap-1.5 text-sm text-ink-muted"><MessageSquare size={15} /> {DEMO_POST.replies.length} replies</span>
          <button className="flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink transition-colors ml-auto"><Share2 size={14} /> Share</button>
          <button className="flex items-center gap-1.5 text-sm text-ink-muted hover:text-red-500 transition-colors"><Flag size={14} /> Report</button>
        </div>
      </div>

      {/* Replies */}
      <div className="space-y-4 mb-6">
        <h2 className="font-semibold text-ink">{DEMO_POST.replies.length} Replies</h2>
        {DEMO_POST.replies.map((r) => (
          <div key={r._id} className="card p-5 space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white text-sm font-bold shrink-0">
                {r.authorName.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap mb-2">
                  <span className="font-semibold text-sm text-ink">{r.authorName}</span>
                  {r.isExpert && (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-brand-700 bg-brand-50 border border-brand-200 px-1.5 py-0.5 rounded-full">
                      <Award size={9} /> Expert
                    </span>
                  )}
                  <span className="text-xs text-ink-subtle">{r.createdAt}</span>
                </div>
                <p className="text-sm text-ink-muted leading-relaxed">{r.content}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 pl-12">
              <button className="flex items-center gap-1.5 text-xs text-ink-subtle hover:text-brand-600 transition-colors">
                <ThumbsUp size={12} /> {r.upvotes}
              </button>
              <button className="text-xs text-ink-subtle hover:text-ink transition-colors">Reply</button>
            </div>
          </div>
        ))}
      </div>

      {/* Reply form */}
      <div className="card p-5 space-y-3">
        <h3 className="font-semibold text-ink text-sm">Add Your Reply</h3>
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-400 to-brand-700 flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5">A</div>
          <div className="flex-1">
            <textarea value={reply} onChange={e => setReply(e.target.value)}
              className="input h-24 resize-none text-sm"
              placeholder="Share your experience or advice..." />
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-ink-subtle">{reply.length}/500 characters</span>
              <button disabled={!reply.trim()} className="btn-primary text-sm py-2 px-4">Post Reply</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
