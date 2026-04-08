// app/api/users/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getUserById } from "@/lib/db";
import { UsersStore } from "@/lib/dataStore";

type RouteParams = Promise<{ id: string }>;

type SafeUser = Record<string, unknown> & {
  password?: string;
};

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

    const { password: _pw, ...safeUser } = user as SafeUser;

    return NextResponse.json({
      success: true,
      data: safeUser,
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
    const body = (await req.json()) as Partial<SafeUser>;

    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json(
        { success: false, error: "No update data provided" },
        { status: 400 }
      );
    }

    // Prevent password updates here
    const { password: _pw, ...safeUpdates } = body;

    const updated = UsersStore.update(id, safeUpdates);

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    const { password: _p, ...safeUser } = updated as SafeUser;

    return NextResponse.json({
      success: true,
      data: safeUser,
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