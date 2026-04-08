// app/api/users/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getUserById } from "@/lib/db";
import { UsersStore } from "@/lib/dataStore";
import type { User } from "@/types";

type RouteParams = Promise<{ id: string }>;

type SafeUser = Omit<User, "password">;
type UserUpdate = Partial<SafeUser>;

export async function GET(
  _req: NextRequest,
  { params }: { params: RouteParams }
) {
  try {
    const { id } = await params;
    const user = await getUserById(id);

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    const { password: _pw, ...safeUser } = user;

    return NextResponse.json({
      success: true,
      data: safeUser satisfies SafeUser,
    });
  } catch (error) {
    console.error("GET user error:", error);

    return NextResponse.json(
      { success: false, error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: RouteParams }
) {
  try {
    const { id } = await params;
    const body = (await req.json()) as UserUpdate & {
      password?: never;
    };

    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json(
        { success: false, error: "No update data provided" },
        { status: 400 }
      );
    }

    const updated = UsersStore.update(id, body);

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    const { password: _pw, ...safeUser } = updated;

    return NextResponse.json({
      success: true,
      data: safeUser satisfies SafeUser,
      message: "User updated successfully",
    });
  } catch (error) {
    console.error("PATCH user error:", error);

    return NextResponse.json(
      { success: false, error: "Failed to update user" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: RouteParams }
) {
  try {
    const { id } = await params;
    const deleted = UsersStore.delete(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("DELETE user error:", error);

    return NextResponse.json(
      { success: false, error: "Failed to delete user" },
      { status: 500 }
    );
  }
}