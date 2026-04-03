// app/api/community/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getPosts } from "@/lib/db";
import { PostsStore } from "@/lib/dataStore";
import { generateId } from "@/lib/utils";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const level = searchParams.get("level") || undefined;
    const posts = await getPosts(level);
    return NextResponse.json({ success: true, data: posts });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to fetch posts" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, content, level, category, tags, authorId, authorName } = body;
    if (!title || !content || !authorName) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }
    const post = {
      _id: generateId("post"),
      title, content, level: level || "all",
      category: category || "general", tags: tags || [],
      authorId: authorId || "anonymous", authorName,
      authorAvatar: undefined, upvotes: 0, upvotedBy: [], replies: [],
      createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
      isPinned: false, isResolved: false,
    };
    PostsStore.create(post);
    return NextResponse.json({ success: true, data: post }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to create post" }, { status: 500 });
  }
}
