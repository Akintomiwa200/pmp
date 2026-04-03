// app/api/quiz/submit/route.ts
import { NextRequest, NextResponse } from "next/server";
import { UsersStore, ProgressStore } from "@/lib/dataStore";
import { generateId } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, quizId, moduleId, courseId, answers, score, totalQuestions, timeTaken } = body;

    if (!userId || !quizId || score === undefined) {
      return NextResponse.json({ success: false, error: "userId, quizId, and score are required" }, { status: 400 });
    }

    const percentage = Math.round((score / totalQuestions) * 100);
    const passed = percentage >= 70;

    // Award points
    const pointsEarned = passed
      ? percentage === 100 ? 200 : 100
      : 20; // participation points

    // Update user progress
    if (courseId && moduleId) {
      const progress = ProgressStore.findOne(
        (p) => p.userId === userId && p.courseId === courseId
      );

      if (progress) {
        const updatedScores = {
          ...progress.quizScores,
          [quizId]: {
            score: percentage,
            attempts: (progress.quizScores[quizId]?.attempts ?? 0) + 1,
            passed,
            timeTaken,
            completedAt: new Date().toISOString(),
          },
        };

        const completedModules = progress.completedModules.includes(moduleId)
          ? progress.completedModules
          : [...progress.completedModules, moduleId];

        const newPct = Math.round((completedModules.length / progress.totalModules) * 100);

        ProgressStore.update(progress._id, {
          quizScores: updatedScores,
          completedModules,
          percentComplete: newPct,
          lastAccessedAt: new Date().toISOString(),
          ...(newPct >= 100 ? { certificateEarned: true, certificateEarnedAt: new Date().toISOString() } : {}),
        });
      }
    }

    // Update user points and streak
    const user = UsersStore.findById(userId);
    if (user) {
      UsersStore.update(userId, {
        totalPoints: (user.totalPoints ?? 0) + pointsEarned,
        lastActiveAt: new Date().toISOString(),
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        quizId,
        userId,
        percentage,
        passed,
        pointsEarned,
        timeTaken,
        message: passed
          ? `Quiz passed! You earned ${pointsEarned} points.`
          : `Score: ${percentage}%. Need 70%+ to pass. You earned ${pointsEarned} participation points.`,
        badges: percentage === 100 ? ["quiz_ace"] : [],
      },
    });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to submit quiz" }, { status: 500 });
  }
}
