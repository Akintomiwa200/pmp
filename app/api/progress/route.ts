// app/api/progress/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getUserProgress } from "@/lib/db";
import { ProgressStore } from "@/lib/dataStore";
import { generateId } from "@/lib/utils";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    if (!userId) {
      return NextResponse.json({ success: false, error: "userId is required" }, { status: 400 });
    }
    const progress = await getUserProgress(userId);
    return NextResponse.json({ success: true, data: progress });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to fetch progress" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, courseId, moduleId, quizId, quizScore } = body;

    if (!userId || !courseId) {
      return NextResponse.json({ success: false, error: "userId and courseId are required" }, { status: 400 });
    }

    let prog = ProgressStore.findOne((p) => p.userId === userId && p.courseId === courseId);

    if (!prog) {
      prog = {
        _id: generateId("prog"),
        userId, courseId,
        completedModules: [],
        totalModules: 12,
        percentComplete: 0,
        quizScores: {},
        lastAccessedAt: new Date().toISOString(),
        startedAt: new Date().toISOString(),
        certificateEarned: false,
      };
      ProgressStore.create(prog);
    }

    const updates: Partial<typeof prog> = {
      lastAccessedAt: new Date().toISOString(),
    };

    if (moduleId && !prog.completedModules.includes(moduleId)) {
      const completedModules = [...prog.completedModules, moduleId];
      const percentComplete = Math.round((completedModules.length / prog.totalModules) * 100);
      updates.completedModules = completedModules;
      updates.percentComplete = percentComplete;
      if (percentComplete >= 100) {
        updates.certificateEarned = true;
        updates.certificateEarnedAt = new Date().toISOString();
      }
    }

    if (quizId && quizScore !== undefined) {
      updates.quizScores = {
        ...prog.quizScores,
        [quizId]: {
          score: quizScore,
          attempts: (prog.quizScores[quizId]?.attempts ?? 0) + 1,
          passed: quizScore >= 70,
          completedAt: new Date().toISOString(),
        },
      };
    }

    const updated = ProgressStore.update(prog._id, updates);
    return NextResponse.json({ success: true, data: updated });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to update progress" }, { status: 500 });
  }
}
