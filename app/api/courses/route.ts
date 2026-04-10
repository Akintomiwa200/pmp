// app/api/courses/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getCourses } from "@/lib/db";
import type { Level } from "@/types";

function parseLevel(value: string | null): Level | undefined {
  if (!value) return undefined;
  if (value === "beginner" || value === "intermediate" || value === "advanced" || value === "all") {
    return value;
  }
  return undefined;
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const level = parseLevel(searchParams.get("level"));
    const courses = await getCourses(level);
    return NextResponse.json({ success: true, data: courses, count: courses.length });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch courses" }, { status: 500 });
  }
}
