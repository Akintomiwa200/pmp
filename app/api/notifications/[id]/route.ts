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

const notifStore = createStore<Notification>("users/notifications.json");

type RouteParams = Promise<{ id: string }>;

export async function PATCH(
  req: NextRequest,
  { params }: { params: RouteParams }
) {
  try {
    const { id } = await params;
    const body = (await req.json()) as Partial<Notification>;

    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json(
        { success: false, error: "No update data provided" },
        { status: 400 }
      );
    }

    const updated = notifStore.update(id, body);

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Notification not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updated,
      message: "Notification updated successfully",
    });
  } catch (error) {
    console.error("PATCH notification error:", error);

    return NextResponse.json(
      { success: false, error: "Failed to update notification" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: RouteParams }
) {
  try {
    const { id } = await params;

    const deleted = notifStore.delete(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Notification not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Notification deleted successfully",
    });
  } catch (error) {
    console.error("DELETE notification error:", error);

    return NextResponse.json(
      { success: false, error: "Failed to delete notification" },
      { status: 500 }
    );
  }
}