// app/api/streak/route.ts
import { NextRequest, NextResponse } from "next/server";
import { UsersStore } from "@/lib/dataStore";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json({ success: false, error: "userId required" }, { status: 400 });
    }

    const user = UsersStore.findById(userId);
    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    const now = new Date();
    const lastActive = user.lastActiveAt ? new Date(user.lastActiveAt) : null;

    let newStreak = user.streak ?? 0;
    let pointsEarned = 10; // daily login points
    const badges: string[] = [];
    const streakBroken = lastActive
      ? (now.getTime() - lastActive.getTime()) > 48 * 60 * 60 * 1000
      : false;

    if (streakBroken) {
      newStreak = 1; // reset
    } else if (!lastActive || (now.getTime() - lastActive.getTime()) > 20 * 60 * 60 * 1000) {
      newStreak += 1;
    }

    // Streak milestone bonuses
    if (newStreak === 7) { pointsEarned += 100; badges.push("streak_7"); }
    if (newStreak === 30) { pointsEarned += 300; badges.push("streak_30"); }
    if (newStreak === 90) { pointsEarned += 1000; badges.push("streak_90"); }

    const updatedBadges = [...new Set([...(user.badges ?? []), ...badges])];

    UsersStore.update(userId, {
      streak: newStreak,
      totalPoints: (user.totalPoints ?? 0) + pointsEarned,
      lastActiveAt: now.toISOString(),
      badges: updatedBadges,
    });

    return NextResponse.json({
      success: true,
      data: {
        streak: newStreak,
        pointsEarned,
        totalPoints: (user.totalPoints ?? 0) + pointsEarned,
        badges,
        streakBroken,
        message: streakBroken
          ? "Streak reset — start a new one today!"
          : newStreak % 7 === 0
          ? `🔥 ${newStreak}-day streak! Bonus points earned!`
          : `Streak: ${newStreak} days`,
      },
    });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to update streak" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    if (!userId) return NextResponse.json({ success: false, error: "userId required" }, { status: 400 });

    const user = UsersStore.findById(userId);
    if (!user) return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });

    return NextResponse.json({
      success: true,
      data: {
        streak: user.streak ?? 0,
        totalPoints: user.totalPoints ?? 0,
        lastActiveAt: user.lastActiveAt,
      },
    });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to get streak" }, { status: 500 });
  }
}
