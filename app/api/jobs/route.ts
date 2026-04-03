// app/api/jobs/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getJobs } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const level = searchParams.get("level") || undefined;
    const type = searchParams.get("type") || undefined;
    const remote = searchParams.get("remote");
    const isRemote = remote === "true" ? true : remote === "false" ? false : undefined;
    const jobs = await getJobs({ level, type, isRemote });
    return NextResponse.json({ success: true, data: jobs, count: jobs.length });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to fetch jobs" }, { status: 500 });
  }
}
