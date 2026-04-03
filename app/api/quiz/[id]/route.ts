// app/api/quiz/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getQuizById } from "@/lib/db";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const quiz = await getQuizById(params.id);
    if (!quiz) {
      return NextResponse.json({ success: false, error: "Quiz not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: quiz });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to fetch quiz" }, { status: 500 });
  }
}
