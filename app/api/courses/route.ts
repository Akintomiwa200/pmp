// app/api/courses/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getCourses } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const level = searchParams.get("level") || undefined;
    const courses = await getCourses(level);
    return NextResponse.json({ success: true, data: courses, count: courses.length });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch courses" }, { status: 500 });
  }
}
