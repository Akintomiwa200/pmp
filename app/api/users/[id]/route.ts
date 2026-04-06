import { NextRequest, NextResponse } from "next/server";
import { getUserById } from "@/lib/db";
import { UsersStore } from "@/lib/dataStore";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await getUserById(id);
    if (!user)
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });

    const { password, ...safeUser } = user as unknown as { password?: string };
    return NextResponse.json({ success: true, data: safeUser });
  } catch (err) {
    console.error("GET user error:", err);
    return NextResponse.json({ success: false, error: "Failed to fetch user" }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { password: _pw, ...safeUpdates } = body;

    const updated = UsersStore.update(id, safeUpdates);
    if (!updated)
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });

    const { password: _p, ...safeUser } = updated as unknown as { password?: string };
    return NextResponse.json({ success: true, data: safeUser });
  } catch (err) {
    console.error("PATCH user error:", err);
    return NextResponse.json({ success: false, error: "Failed to update user" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const deleted = UsersStore.delete(id);
    if (!deleted)
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });

    return NextResponse.json({ success: true, message: "User deleted successfully" });
  } catch (err) {
    console.error("DELETE user error:", err);
    return NextResponse.json({ success: false, error: "Failed to delete user" }, { status: 500 });
  }
}