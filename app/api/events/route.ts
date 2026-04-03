// app/api/events/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getEvents } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const format = searchParams.get("format") || undefined;
    const level = searchParams.get("level") || undefined;
    const type = searchParams.get("type") || undefined;
    const events = await getEvents({ format, level, type });
    return NextResponse.json({ success: true, data: events, count: events.length });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch events" }, { status: 500 });
  }
}
