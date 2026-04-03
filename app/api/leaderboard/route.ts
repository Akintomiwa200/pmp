// app/api/leaderboard/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getUsers } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") || "10");
    const level = searchParams.get("level");

    let users = await getUsers();

    if (level && level !== "all") {
      users = users.filter((u) => u.level === level);
    }

    const leaderboard = users
      .sort((a, b) => b.totalPoints - a.totalPoints)
      .slice(0, limit)
      .map((u, i) => ({
        rank: i + 1,
        userId: u._id,
        name: u.name,
        avatar: u.avatar,
        level: u.level,
        totalPoints: u.totalPoints,
        streak: u.streak,
        badges: u.badges?.length ?? 0,
        subscription: u.subscription,
      }));

    return NextResponse.json({
      success: true,
      data: leaderboard,
      total: users.length,
    });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to fetch leaderboard" }, { status: 500 });
  }
}
