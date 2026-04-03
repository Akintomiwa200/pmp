// app/community/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { Users, MessageSquare, ThumbsUp, Pin, Award, Plus, Search, TrendingUp, Zap } from "lucide-react";
import { getPosts } from "@/lib/db";
import { timeAgo, getLevelColor, truncate } from "@/lib/utils";
import type { Post } from "@/types";

export const metadata: Metadata = { title: "Community Forum" };

function PostCard({ post }: { post: Post }) {
  const lc = getLevelColor(post.level);
  return (
    <Link href={`/community/${post._id}`} className="card-hover p-5 space-y-3 block">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white text-sm font-bold shrink-0">
          {post.authorName.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-0.5">
            <span className="text-sm font-semibold text-ink">{post.authorName}</span>
            <span className="text-xs text-ink-subtle">{timeAgo(post.createdAt)}</span>
            {post.isPinned && (
              <span className="flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded-full">
                <Pin size={9} />Pinned
              </span>
            )}
          </div>
          <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${lc.bg} ${lc.text} ${lc.border}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${lc.dot}`} />
            {post.level}
          </span>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-ink mb-1 leading-snug hover:text-brand-700 transition-colors">{post.title}</h3>
        <p className="text-sm text-ink-muted">{truncate(post.content, 140)}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {post.tags.slice(0, 4).map(tag => (
          <span key={tag} className="text-[11px] px-2 py-0.5 bg-surface-1 border border-surface-3 rounded-full text-ink-muted">#{tag}</span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-1 border-t border-surface-2">
        <div className="flex items-center gap-4 text-xs text-ink-muted">
          <span className="flex items-center gap-1.5"><ThumbsUp size={12} />{post.upvotes}</span>
          <span className="flex items-center gap-1.5"><MessageSquare size={12} />{post.replies.length} replies</span>
        </div>
        <span className="text-xs text-brand-600 font-medium">Read thread →</span>
      </div>
    </Link>
  );
}

export default async function CommunityPage() {
  const posts = await getPosts();
  const categories = [
    { label: "All", count: posts.length },
    { label: "Advice", count: posts.filter(p => p.category === "advice").length },
    { label: "Resources", count: posts.filter(p => p.category === "resources").length },
    { label: "Success Stories", count: posts.filter(p => p.category === "success_story").length },
  ];

  const topContributors = [
    { name: "Marcus Johnson", points: 12800, badge: "👑", role: "Mentor", level: "advanced" },
    { name: "Priya Sharma", points: 4560, badge: "⭐", role: "Active Member", level: "intermediate" },
    { name: "Alex Rivera", points: 1240, badge: "🌱", role: "Rising Star", level: "beginner" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* Header */}
      <div className="mb-10">
        <p className="section-tag mb-3"><Users size={12} />Community</p>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-display font-bold text-ink mb-2">PM Community Forum</h1>
            <p className="text-ink-muted max-w-xl">
              Ask questions, share resources, celebrate wins. 12,000+ PMs helping each other grow.
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            <Link href="/community/network" className="btn-secondary text-sm flex items-center gap-1.5">
              <Users size={14} />Network
            </Link>
            <Link href="/leaderboard" className="btn-secondary text-sm flex items-center gap-1.5">
              <TrendingUp size={14} />Leaderboard
            </Link>
            <Link href="/community/network" className="btn-primary text-sm flex items-center gap-1.5">
              <Plus size={14} />New Post
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Posts", value: "1,847", icon: MessageSquare, color: "text-brand-600 bg-brand-50" },
          { label: "Active Members", value: "3,240", icon: Users, color: "text-blue-600 bg-blue-50" },
          { label: "Posts Today", value: "34", icon: Zap, color: "text-amber-600 bg-amber-50" },
          { label: "Mentors Active", value: "12", icon: Award, color: "text-purple-600 bg-purple-50" },
        ].map(s => (
          <div key={s.label} className="card p-4">
            <div className={`w-8 h-8 rounded-xl ${s.color} flex items-center justify-center mb-2`}>
              <s.icon size={16} />
            </div>
            <p className="text-xl font-display font-bold text-ink">{s.value}</p>
            <p className="text-xs text-ink-subtle">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-subtle" />
        <input type="text" placeholder="Search discussions..." className="input pl-10 max-w-xl" />
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat, i) => (
          <button key={cat.label}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors ${i === 0 ? "bg-ink text-white" : "bg-white border border-surface-3 text-ink-muted hover:border-ink/30"}`}>
            {cat.label}
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${i === 0 ? "bg-white/20 text-white" : "bg-surface-2 text-ink-subtle"}`}>
              {cat.count}
            </span>
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">

        {/* Posts */}
        <div className="lg:col-span-2 space-y-4">
          {posts.map(post => <PostCard key={post._id} post={post} />)}
          <button className="btn-secondary w-full justify-center">Load More Posts</button>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">

          {/* Level filter */}
          <div className="card p-5">
            <h3 className="font-semibold text-ink mb-3">Browse by Level</h3>
            <div className="space-y-1">
              {[
                { label: "🌱 Beginner Q&A", href: "/community?level=beginner", count: posts.filter(p => p.level === "beginner").length },
                { label: "📈 Intermediate", href: "/community?level=intermediate", count: posts.filter(p => p.level === "intermediate").length },
                { label: "🏆 Advanced / PMP", href: "/community?level=advanced", count: posts.filter(p => p.level === "advanced").length },
              ].map(item => (
                <Link key={item.href} href={item.href}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-surface-1 text-sm text-ink-muted hover:text-ink transition-colors">
                  {item.label}
                  <span className="text-xs bg-surface-2 text-ink-subtle px-2 py-0.5 rounded-full">{item.count}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Top contributors */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Award size={15} className="text-amber-500" />
                <h3 className="font-semibold text-ink">Top Contributors</h3>
              </div>
              <Link href="/leaderboard" className="text-xs text-brand-600 hover:underline">See all</Link>
            </div>
            <div className="space-y-3">
              {topContributors.map((c, i) => (
                <div key={c.name} className="flex items-center gap-3">
                  <span className="text-xs font-mono text-ink-subtle w-4">#{i + 1}</span>
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white text-xs font-bold">
                    {c.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-ink truncate">{c.name}</p>
                    <p className="text-[10px] text-ink-subtle capitalize">{c.level} · {c.role}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-ink">{c.points.toLocaleString()}</p>
                    <p className="text-[9px] text-ink-subtle">pts</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Networking callout */}
          <div className="card p-5 bg-teal-50 border-teal-100">
            <h3 className="font-semibold text-ink mb-2 text-sm">🤝 Connect with PMs</h3>
            <p className="text-xs text-ink-muted mb-3">Find and connect with PM professionals who share your goals and interests.</p>
            <Link href="/community/network" className="btn-primary w-full justify-center text-sm" style={{ background: "#0d9488" }}>
              Browse Network
            </Link>
          </div>

          {/* Mentorship */}
          <div className="card p-5 bg-purple-50 border-purple-100">
            <h3 className="font-semibold text-ink mb-2 text-sm">🎯 Find a Mentor</h3>
            <p className="text-xs text-ink-muted mb-3">Get matched with an experienced PM who can guide your specific career goals.</p>
            <Link href="/mentorship/match" className="btn-primary w-full justify-center text-sm" style={{ background: "#7c3aed" }}>
              AI Mentor Match
            </Link>
          </div>

          {/* Guidelines */}
          <div className="p-4 bg-surface-1 border border-surface-3 rounded-2xl">
            <p className="text-sm font-semibold text-ink mb-2">Community Guidelines</p>
            <ul className="text-xs text-ink-subtle space-y-1">
              <li>✓ Be kind and constructive</li>
              <li>✓ Share real experience</li>
              <li>✓ No spam or self-promotion</li>
              <li>✓ Cite your sources</li>
              <li>✓ Flag inappropriate content</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
