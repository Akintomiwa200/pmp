// app/admin/users/page.tsx
import type { Metadata } from "next";
import { Search, Filter, Download, UserCheck, UserX, Eye, MoreHorizontal, Shield } from "lucide-react";

export const metadata: Metadata = { title: "Manage Users | Admin" };

const USERS = [
  { id: "usr_001", name: "Alex Rivera", email: "alex@example.com", level: "beginner", status: "active", joinedAt: "Jan 15, 2025", lastActive: "2h ago", subscription: "free", modules: 12, streak: 7 },
  { id: "usr_002", name: "Priya Sharma", email: "priya@example.com", level: "intermediate", status: "active", joinedAt: "Aug 20, 2024", lastActive: "30m ago", subscription: "premium", modules: 42, streak: 30 },
  { id: "usr_003", name: "Marcus Johnson", email: "marcus@example.com", level: "advanced", status: "active", joinedAt: "Feb 10, 2024", lastActive: "1h ago", subscription: "premium", modules: 87, streak: 90 },
  { id: "usr_004", name: "Jordan Lee", email: "jordan@example.com", level: "beginner", status: "pending", joinedAt: "Mar 28, 2025", lastActive: "Just now", subscription: "free", modules: 0, streak: 0 },
  { id: "usr_005", name: "Emma Wilson", email: "emma@example.com", level: "intermediate", status: "active", joinedAt: "Dec 5, 2024", lastActive: "1d ago", subscription: "free", modules: 28, streak: 14 },
  { id: "usr_006", name: "Liam Davis", email: "liam@example.com", level: "beginner", status: "banned", joinedAt: "Mar 1, 2025", lastActive: "5d ago", subscription: "free", modules: 2, streak: 0 },
];

const STATUS_STYLES = {
  active: "bg-brand-50 text-brand-700 border-brand-200",
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  banned: "bg-red-50 text-red-700 border-red-200",
};

export default function AdminUsersPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-ink">Users</h1>
          <p className="text-sm text-ink-muted">12,847 total users</p>
        </div>
        <div className="flex gap-3">
          <button className="btn-secondary text-sm"><Download size={14} /> Export CSV</button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-subtle" />
          <input className="input pl-9 text-sm" placeholder="Search by name or email..." />
        </div>
        <select className="input w-36 text-sm">
          <option>All Levels</option>
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>
        <select className="input w-36 text-sm">
          <option>All Status</option>
          <option>Active</option>
          <option>Pending</option>
          <option>Banned</option>
        </select>
        <select className="input w-36 text-sm">
          <option>All Plans</option>
          <option>Free</option>
          <option>Premium</option>
        </select>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-surface-3 bg-surface-1">
              <th className="text-left px-4 py-3 text-xs font-semibold text-ink-subtle uppercase tracking-wider">User</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-ink-subtle uppercase tracking-wider hidden md:table-cell">Level</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-ink-subtle uppercase tracking-wider hidden lg:table-cell">Plan</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-ink-subtle uppercase tracking-wider hidden lg:table-cell">Modules</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-ink-subtle uppercase tracking-wider hidden xl:table-cell">Last Active</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-ink-subtle uppercase tracking-wider">Status</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-ink-subtle uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {USERS.map((user, i) => (
              <tr key={user.id} className={`border-b border-surface-2 last:border-0 hover:bg-surface-1/60 transition-colors ${i % 2 === 0 ? "" : "bg-surface-1/30"}`}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                      {user.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-ink truncate">{user.name}</p>
                      <p className="text-xs text-ink-subtle truncate">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${user.level === "beginner" ? "badge-beginner" : user.level === "intermediate" ? "badge-intermediate" : "badge-advanced"}`}>
                    {user.level}
                  </span>
                </td>
                <td className="px-4 py-3 hidden lg:table-cell">
                  <span className={`text-xs font-medium ${user.subscription === "premium" ? "text-purple-700" : "text-ink-subtle"}`}>
                    {user.subscription}
                  </span>
                </td>
                <td className="px-4 py-3 hidden lg:table-cell">
                  <span className="text-sm text-ink">{user.modules}</span>
                </td>
                <td className="px-4 py-3 hidden xl:table-cell">
                  <span className="text-xs text-ink-subtle">{user.lastActive}</span>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border capitalize ${STATUS_STYLES[user.status as keyof typeof STATUS_STYLES]}`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1 justify-end">
                    <button className="p-1.5 rounded-lg hover:bg-surface-2 transition-colors" title="View">
                      <Eye size={14} className="text-ink-muted" />
                    </button>
                    {user.status !== "banned" ? (
                      <button className="p-1.5 rounded-lg hover:bg-red-50 transition-colors" title="Ban">
                        <UserX size={14} className="text-red-500" />
                      </button>
                    ) : (
                      <button className="p-1.5 rounded-lg hover:bg-brand-50 transition-colors" title="Unban">
                        <UserCheck size={14} className="text-brand-600" />
                      </button>
                    )}
                    <button className="p-1.5 rounded-lg hover:bg-surface-2 transition-colors">
                      <MoreHorizontal size={14} className="text-ink-muted" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="px-4 py-3 border-t border-surface-2 flex items-center justify-between">
          <p className="text-xs text-ink-subtle">Showing 6 of 12,847 users</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-xs rounded-lg border border-surface-3 text-ink-muted hover:bg-surface-1">Prev</button>
            <button className="px-3 py-1 text-xs rounded-lg bg-brand-600 text-white">1</button>
            <button className="px-3 py-1 text-xs rounded-lg border border-surface-3 text-ink-muted hover:bg-surface-1">2</button>
            <button className="px-3 py-1 text-xs rounded-lg border border-surface-3 text-ink-muted hover:bg-surface-1">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
