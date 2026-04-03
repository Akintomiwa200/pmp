// app/api/alerts/route.ts
import { NextRequest, NextResponse } from "next/server";
import { generateId } from "@/lib/utils";
import { createStore } from "@/lib/dataStore";

interface Alert {
  _id: string;
  email: string;
  type: "job" | "event" | "course";
  filters: Record<string, string>;
  isActive: boolean;
  createdAt: string;
}

const AlertsStore = createStore<Alert>("users/alerts.json");

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, type = "job", filters = {} } = body;

    if (!email) {
      return NextResponse.json({ success: false, error: "Email is required" }, { status: 400 });
    }

    // Check for existing alert
    const existing = AlertsStore.findOne(a => a.email === email && a.type === type);
    if (existing) {
      return NextResponse.json({ success: true, message: "You're already subscribed to these alerts.", data: existing });
    }

    const alert: Alert = {
      _id: generateId("alert"),
      email, type, filters,
      isActive: true,
      createdAt: new Date().toISOString(),
    };

    AlertsStore.create(alert);
    return NextResponse.json({ success: true, message: `${type} alerts activated for ${email}`, data: alert }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to create alert" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const type = searchParams.get("type") || "job";
    if (!email) return NextResponse.json({ success: false, error: "Email required" }, { status: 400 });
    const alert = AlertsStore.findOne(a => a.email === email && a.type === type);
    if (alert) AlertsStore.delete(alert._id);
    return NextResponse.json({ success: true, message: "Unsubscribed successfully" });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to unsubscribe" }, { status: 500 });
  }
}
