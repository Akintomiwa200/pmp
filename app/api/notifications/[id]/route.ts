// app/api/notifications/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createStore } from "@/lib/dataStore";

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

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const updated = NotifStore.update(params.id, body);
    if (!updated) return NextResponse.json({ success: false, error: "Notification not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: updated });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to update notification" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const deleted = NotifStore.delete(params.id);
    if (!deleted) return NextResponse.json({ success: false, error: "Notification not found" }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to delete notification" }, { status: 500 });
  }
}
