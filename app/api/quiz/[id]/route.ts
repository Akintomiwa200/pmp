// app/api/quiz/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getQuizById } from "@/lib/db";

export async function GET(
  _req: NextRequest,
  ctx: RouteContext<"/api/quiz/[id]">
) {
  try {
    const { id } = await ctx.params;

    const quiz = await getQuizById(id);

    if (!quiz) {
      return NextResponse.json(
        { success: false, error: "Quiz not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: quiz,
    });
  } catch (error) {
    console.error("GET quiz error:", error);

    return NextResponse.json(
      { success: false, error: "Failed to fetch quiz" },
      { status: 500 }
    );
  }
}