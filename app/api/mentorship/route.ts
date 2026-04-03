// app/api/mentorship/route.ts
import { NextResponse } from "next/server";
import { getMentors } from "@/lib/db";

export async function GET() {
  try {
    const mentors = await getMentors();
    return NextResponse.json({ success: true, data: mentors });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to fetch mentors" }, { status: 500 });
  }
}
