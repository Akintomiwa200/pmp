// app/api/users/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getUsers } from "@/lib/db";
import { UsersStore } from "@/lib/dataStore";
import { generateId } from "@/lib/utils";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    const users = await getUsers();
    // Never return passwords
    const safe = users.map(({ password: _pw, ...u }) => u);
    return NextResponse.json({ success: true, data: safe });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to fetch users" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password, level = "beginner", goals = [] } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ success: false, error: "Name, email, and password are required" }, { status: 400 });
    }

    // Check if user exists
    const existing = UsersStore.findOne((u) => u.email === email);
    if (existing) {
      return NextResponse.json({ success: false, error: "Email already registered" }, { status: 409 });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = {
      _id: generateId("usr"),
      name, email,
      password: hashed,
      avatar: undefined,
      level,
      goals,
      badges: ["first_login"],
      streak: 0,
      totalPoints: 0,
      joinedAt: new Date().toISOString(),
      lastActiveAt: new Date().toISOString(),
      completedModules: [],
      enrolledCourses: [],
      mentorId: null,
      isMentor: false,
      subscription: "free" as const,
    };

    UsersStore.create(user);
    const { password: _pw, ...safeUser } = user;
    return NextResponse.json({ success: true, data: safeUser }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to create user" }, { status: 500 });
  }
}
