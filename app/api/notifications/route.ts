// app/api/notifications/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createStore } from "@/lib/dataStore";
import { generateId } from "@/lib/utils";

interface Notification {
  _id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  href: string;
  read: boolean;
  createdAt: string;
}

const NotifStore = createStore<Notification>("users/notifications.json");

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const unreadOnly = searchParams.get("unread") === "true";

    let notifs = userId
      ? NotifStore.findBy((n) => n.userId === userId)
      : NotifStore.findAll();

    if (unreadOnly) notifs = notifs.filter((n) => !n.read);

    const sorted = notifs.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return NextResponse.json({
      success: true,
      data: sorted,
      unreadCount: sorted.filter((n) => !n.read).length,
    });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to fetch notifications" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, type, title, message, href } = body;

    if (!userId || !type || !title || !message) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    const notif: Notification = {
      _id: generateId("notif"),
      userId, type, title, message,
      href: href || "/dashboard",
      read: false,
      createdAt: new Date().toISOString(),
    };

    NotifStore.create(notif);
    return NextResponse.json({ success: true, data: notif }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to create notification" }, { status: 500 });
  }
}
