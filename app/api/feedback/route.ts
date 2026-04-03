// app/api/feedback/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createStore } from "@/lib/dataStore";
import { generateId } from "@/lib/utils";

interface FeedbackEntry {
  _id: string;
  type: "nps" | "module_feedback" | "general";
  userId?: string;
  score?: number;
  comment?: string;
  category?: string;
  ratings?: Record<string, number>;
  moduleId?: string;
  source: string;
  createdAt: string;
}

const FeedbackStore = createStore<FeedbackEntry>("users/feedback.json");

export async function GET() {
  try {
    const all = FeedbackStore.findAll();
    const npsScores = all.filter(f => f.type === "nps" && f.score !== undefined).map(f => f.score as number);
    const avgNPS = npsScores.length
      ? Math.round((npsScores.reduce((a, b) => a + b, 0) / npsScores.length) * 10) / 10
      : 0;
    return NextResponse.json({ success: true, data: all, avgNPS, count: all.length });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to fetch feedback" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, userId, score, comment, category, ratings, moduleId, source } = body;

    if (!type || !source) {
      return NextResponse.json({ success: false, error: "type and source are required" }, { status: 400 });
    }

    const entry: FeedbackEntry = {
      _id: generateId("survey"),
      type, userId, score, comment, category, ratings, moduleId,
      source,
      createdAt: new Date().toISOString(),
    };

    FeedbackStore.create(entry);
    return NextResponse.json({ success: true, data: entry }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to submit feedback" }, { status: 500 });
  }
}
