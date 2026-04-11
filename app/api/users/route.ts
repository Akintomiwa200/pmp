// app/api/users/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createUser, getUserByEmail, getUsers } from "@/lib/db";
import { generateId } from "@/lib/utils";
import bcrypt from "bcryptjs";
import type { Level, UserRole } from "@/types";

const ADMIN_SIGNUP_CODE = process.env.ADMIN_SIGNUP_CODE?.trim();
const SUPERADMIN_SIGNUP_CODE = process.env.SUPERADMIN_SIGNUP_CODE?.trim();

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
    const { name, email, password, level = "beginner", goals = [], role, accessCode } = body;
    const requestedRole = typeof role === "string" ? role : "user";
    const normalizedRole: UserRole =
      requestedRole === "admin" || requestedRole === "superadmin"
        ? (requestedRole as UserRole)
        : "user";
    const trimmedAccessCode = typeof accessCode === "string" ? accessCode.trim() : "";

    if (normalizedRole === "admin") {
      if (!ADMIN_SIGNUP_CODE) {
        return NextResponse.json(
          { success: false, error: "Admin signup is not configured" },
          { status: 403 }
        );
      }

      if (trimmedAccessCode !== ADMIN_SIGNUP_CODE) {
        return NextResponse.json(
          { success: false, error: "Invalid admin access code" },
          { status: 403 }
        );
      }
    }

    if (normalizedRole === "superadmin") {
      if (!SUPERADMIN_SIGNUP_CODE) {
        return NextResponse.json(
          { success: false, error: "Superadmin signup is not configured" },
          { status: 403 }
        );
      }

      if (trimmedAccessCode !== SUPERADMIN_SIGNUP_CODE) {
        return NextResponse.json(
          { success: false, error: "Invalid superadmin access code" },
          { status: 403 }
        );
      }
    }

    if (!name || !email || !password) {
      return NextResponse.json({ success: false, error: "Name, email, and password are required" }, { status: 400 });
    }

    // Check if user exists (same source auth login uses)
    const existing = await getUserByEmail(email);
    if (existing) {
      return NextResponse.json({ success: false, error: "Email already registered" }, { status: 409 });
    }

    const parsedLevel: Level =
      level === "beginner" || level === "intermediate" || level === "advanced"
        ? level
        : "beginner";

    const hashed = await bcrypt.hash(password, 10);
    const user = {
      _id: generateId("usr"),
      name, email,
      password: hashed,
      avatar: undefined,
      role: normalizedRole,
      level: parsedLevel,
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

    await createUser(user);
    const { password: _pw, ...safeUser } = user;
    return NextResponse.json({ success: true, data: safeUser }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to create user" }, { status: 500 });
  }
}
