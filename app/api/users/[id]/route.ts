// app/api/users/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getUserById } from "@/lib/db";
import { UsersStore } from "@/lib/dataStore";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getUserById(params.id);
    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }
    const { password: _pw, ...safeUser } = user as Record<string, unknown> & { password?: string };
    return NextResponse.json({ success: true, data: safeUser });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to fetch user" }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    // Don't allow password update through this route
    const { password: _pw, ...safeUpdates } = body;

    const updated = UsersStore.update(params.id, safeUpdates);
    if (!updated) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }
    const { password: _p, ...safeUser } = updated as Record<string, unknown> & { password?: string };
    return NextResponse.json({ success: true, data: safeUser });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to update user" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const deleted = UsersStore.delete(params.id);
    if (!deleted) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "User deleted successfully" });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to delete user" }, { status: 500 });
  }
}
