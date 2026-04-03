// app/api/glossary/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createStore } from "@/lib/dataStore";

interface GlossaryTerm {
  _id: string;
  term: string;
  definition: string;
  category: string;
  level: string;
  related: string[];
}

const GlossaryStore = createStore<GlossaryTerm>("courses/glossary.json");

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q");
    const category = searchParams.get("category");
    const level = searchParams.get("level");

    let terms = GlossaryStore.findAll();

    if (q) {
      const lower = q.toLowerCase();
      terms = terms.filter(t =>
        t.term.toLowerCase().includes(lower) ||
        t.definition.toLowerCase().includes(lower)
      );
    }
    if (category && category !== "All") {
      terms = terms.filter(t => t.category === category);
    }
    if (level && level !== "All") {
      terms = terms.filter(t => t.level === level);
    }

    return NextResponse.json({ success: true, data: terms, count: terms.length });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to fetch glossary" }, { status: 500 });
  }
}
