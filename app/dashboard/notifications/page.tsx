// app/notifications/page.tsx
"use client";
import { useState } from "react";
import { Bell, CheckCheck, Trophy, MessageSquare, Calendar, Users, BookOpen, Trash2 } from "lucide-react";

const NOTIFICATIONS = [
  { id: "n1", type: "badge_earned", title: "New Badge: Quiz Ace! 🏅", message: "You earned the Quiz Ace badge for scoring 100% on PM Basics Check.", time: "2h ago", read: false, href: "/profile" },
  { id: "n2", type: "quiz_result", title: "Quiz Passed! 🎯", message: "You scored 90% on PM Basics Check. Keep it up!", time: "3h ago", read: false, href: "/learn/beginner" },
  { id: "n3", type: "mentor_match", title: "Mentor Match Found! 🤝", message: "Marcus Johnson has accepted your mentorship request.", time: "1d ago", read: false, href: "/mentorship" },
  { id: "n4", type: "community_reply", title: "Marcus replied to your post", message: "Marcus Johnson replied to 'How did you choose your first PM certification?'", time: "6d ago", read: true, href: "/community" },
  { id: "n5", type: "event_reminder", title: "Event Tomorrow: Agile Webinar 📅", message: "Your registered event 'Agile Fundamentals Webinar' starts tomorrow at 6 PM.", time: "7d ago", read: true, href: "/events" },
  { id: "n6", type: "course_update", title: "Course Updated", message: "PM Fundamentals has been updated with new content in Module 3.", time: "8d ago", read: true, href: "/learn/beginner" },
];

const TYPE_ICONS: Record<string, { icon: React.ElementType; color: string }> = {
  badge_earned: { icon: Trophy, color: "text-amber-600 bg-amber-50" },
  quiz_result: { icon: BookOpen, color: "text-brand-600 bg-brand-50" },
  mentor_match: { icon: Users, color: "text-purple-600 bg-purple-50" },
  community_reply: { icon: MessageSquare, color: "text-blue-600 bg-blue-50" },
  event_reminder: { icon: Calendar, color: "text-teal-600 bg-teal-50" },
  course_update: { icon: BookOpen, color: "text-ink-muted bg-surface-2" },
};

export default function NotificationsPage() {
  const [notifs, setNotifs] = useState(NOTIFICATIONS);
  const unread = notifs.filter((n) => !n.read).length;

  const markAllRead = () => setNotifs(notifs.map((n) => ({ ...n, read: true })));
  const markRead = (id: string) => setNotifs(notifs.map((n) => n.id === id ? { ...n, read: true } : n));
  const deleteNotif = (id: string) => setNotifs(notifs.filter((n) => n.id !== id));

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Bell size={20} className="text-ink" />
            <h1 className="text-2xl font-display font-bold text-ink">Notifications</h1>
            {unread > 0 && (
              <span className="w-6 h-6 rounded-full bg-brand-600 text-white text-xs font-bold flex items-center justify-center">
                {unread}
              </span>
            )}
          </div>
          <p className="text-sm text-ink-subtle">{unread} unread notifications</p>
        </div>
        {unread > 0 && (
          <button onClick={markAllRead} className="btn-ghost text-sm">
            <CheckCheck size={15} /> Mark all read
          </button>
        )}
      </div>

      {/* Filter pills */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1 scrollbar-hide">
        {["All", "Unread", "Badges", "Courses", "Community", "Events"].map((f, i) => (
          <button key={f} className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors border ${i === 0 ? "bg-ink text-white border-ink" : "bg-white text-ink-muted border-surface-3 hover:border-ink/30"}`}>
            {f}
          </button>
        ))}
      </div>

      {/* Notifications list */}
      <div className="space-y-2">
        {notifs.map((notif) => {
          const config = TYPE_ICONS[notif.type] || TYPE_ICONS.course_update;
          const Icon = config.icon;
          return (
            <div
              key={notif.id}
              onClick={() => markRead(notif.id)}
              className={`relative flex gap-4 p-4 rounded-2xl border transition-all cursor-pointer group ${notif.read ? "bg-white border-surface-3 hover:border-surface-3/60" : "bg-brand-50/50 border-brand-100 hover:bg-brand-50"}`}
            >
              {!notif.read && <div className="absolute top-4 left-4 w-2 h-2 rounded-full bg-brand-500" style={{ marginLeft: "-0.75rem" }} />}
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${config.color}`}>
                <Icon size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium ${notif.read ? "text-ink" : "text-ink font-semibold"}`}>{notif.title}</p>
                <p className="text-xs text-ink-muted mt-0.5 leading-relaxed">{notif.message}</p>
                <p className="text-[10px] text-ink-subtle mt-1.5">{notif.time}</p>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); deleteNotif(notif.id); }}
                className="p-1.5 rounded-lg text-ink-subtle hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100 shrink-0 self-start"
              >
                <Trash2 size={14} />
              </button>
            </div>
          );
        })}
      </div>

      {notifs.length === 0 && (
        <div className="text-center py-16">
          <Bell size={40} className="text-surface-3 mx-auto mb-3" />
          <p className="text-ink-muted">No notifications yet</p>
        </div>
      )}
    </div>
  );
}
