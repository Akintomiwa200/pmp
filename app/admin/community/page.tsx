// app/admin/community/page.tsx
import type { Metadata } from "next";
import { MessageSquare, Search, CheckCircle2, Trash2, Eye, Flag, Pin, ThumbsUp } from "lucide-react";

export const metadata: Metadata = { title: "Community | Admin" };

const POSTS = [
  { id: "post_001", title: "How did you choose your first PM certification?", author: "Alex Rivera", level: "beginner", upvotes: 34, replies: 2, flags: 0, status: "active", createdAt: "Mar 20, 2025" },
  { id: "post_002", title: "Resources for learning Earned Value Management?", author: "Priya Sharma", level: "advanced", upvotes: 28, replies: 1, flags: 0, status: "pinned", createdAt: "Mar 22, 2025" },
  { id: "post_003", title: "Successfully transitioned to PM from Marketing!", author: "Alex Rivera", level: "beginner", upvotes: 87, replies: 0, flags: 0, status: "pinned", createdAt: "Mar 25, 2025" },
  { id: "post_flagged", title: "🚨 Misleading PMP shortcuts that will make you pass", author: "user_xxx", level: "advanced", upvotes: 2, replies: 0, flags: 3, status: "flagged", createdAt: "Mar 27, 2025" },
  { id: "post_spam", title: "BUY BEST PMP DUMPS GUARANTEED PASS", author: "user_spam", level: "beginner", upvotes: 0, replies: 0, flags: 8, status: "flagged", createdAt: "Mar 28, 2025" },
];

const STATUS_STYLES: Record<string, { bg: string; color: string }> = {
  active: { bg: "#22c55e18", color: "#22c55e" },
  pinned: { bg: "#3b82f618", color: "#60a5fa" },
  flagged: { bg: "#ef444418", color: "#ef4444" },
};
const LEVEL_COLOR: Record<string, string> = { beginner: "#22c55e", intermediate: "#3b82f6", advanced: "#a855f7" };

export default function AdminCommunityPage() {
  return (
    <div className="p-6 space-y-6 max-w-6xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-white">Community</h1>
          <p className="text-sm" style={{ color: "#4a6080" }}>1,847 posts · 5 flagged</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Posts", value: "1,847", color: "#22c55e" },
          { label: "Active Today", value: "34", color: "#3b82f6" },
          { label: "Flagged", value: "5", color: "#ef4444" },
          { label: "Resolved", value: "218", color: "#a855f7" },
        ].map((s) => (
          <div key={s.label} className="p-4 rounded-2xl" style={{ background: "#0d1424", border: "1px solid #1e2a3d" }}>
            <p className="text-xl font-bold text-white">{s.value}</p>
            <p className="text-[10px] font-bold uppercase tracking-wider mt-0.5" style={{ color: "#4a5568" }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#4a6080" }} />
          <input placeholder="Search posts..." className="pl-9 pr-4 py-2 text-xs rounded-xl w-56 focus:outline-none" style={{ background: "#0d1424", border: "1px solid #1e2a3d", color: "#94a3b8" }} />
        </div>
        {["All", "Flagged", "Pinned", "Beginner", "Intermediate", "Advanced"].map((f, i) => (
          <button key={f} className="px-3 py-1.5 rounded-xl text-xs font-medium" style={{
            background: i === 0 ? "#22c55e" : i === 1 ? "#ef444418" : "#0d1424",
            color: i === 0 ? "white" : i === 1 ? "#ef4444" : "#6b8aad",
            border: "1px solid " + (i === 0 ? "#22c55e" : i === 1 ? "#ef444440" : "#1e2a3d")
          }}>{f}</button>
        ))}
      </div>

      {/* Posts table */}
      <div className="rounded-2xl overflow-hidden" style={{ background: "#0d1424", border: "1px solid #1e2a3d" }}>
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: "1px solid #1e2a3d", background: "#111827" }}>
              {["Post","Author","Level","Stats","Status","Actions"].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-[9px] font-bold uppercase tracking-wider" style={{ color: "#4a5568" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {POSTS.map((post) => {
              const ss = STATUS_STYLES[post.status];
              return (
                <tr key={post.id} style={{ borderBottom: "1px solid #111827" }}
                  className={post.status === "flagged" ? "" : ""}
                >
                  <td className="px-4 py-3 max-w-[240px]">
                    <p className="text-sm font-medium text-white line-clamp-1">{post.title}</p>
                    <p className="text-[10px] mt-0.5" style={{ color: "#4a5568" }}>{post.createdAt}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-xs text-white">{post.author}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-[10px] font-bold capitalize" style={{ color: LEVEL_COLOR[post.level] }}>{post.level}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3 text-[10px]" style={{ color: "#4a5568" }}>
                      <span className="flex items-center gap-1"><ThumbsUp size={10} />{post.upvotes}</span>
                      <span className="flex items-center gap-1"><MessageSquare size={10} />{post.replies}</span>
                      {post.flags > 0 && <span className="flex items-center gap-1" style={{ color: "#ef4444" }}><Flag size={10} />{post.flags}</span>}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full capitalize" style={{ background: ss.bg, color: ss.color }}>
                      {post.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <button className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: "#3b82f618" }}><Eye size={11} style={{ color: "#60a5fa" }} /></button>
                      <button className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: "#3b82f618" }}><Pin size={11} style={{ color: "#60a5fa" }} /></button>
                      <button className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: "#22c55e18" }}><CheckCircle2 size={11} style={{ color: "#22c55e" }} /></button>
                      <button className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: "#ef444418" }}><Trash2 size={11} style={{ color: "#ef4444" }} /></button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="px-4 py-3 flex items-center justify-between" style={{ borderTop: "1px solid #1e2a3d" }}>
          <p className="text-xs" style={{ color: "#4a5568" }}>Showing 5 of 1,847 posts</p>
          <div className="flex gap-2">
            {["Prev","1","2","3","Next"].map((p, i) => (
              <button key={p} className="px-2.5 py-1 text-xs rounded-lg font-medium" style={{ background: i === 1 ? "#22c55e" : "#151f30", color: i === 1 ? "white" : "#6b8aad", border: "1px solid #1e2a3d" }}>{p}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
