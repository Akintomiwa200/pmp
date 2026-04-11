import { NextRequest, NextResponse } from "next/server";
import { getUserByEmail, updateUserById } from "@/lib/db";
import { sendPasswordResetEmail } from "@/lib/email";
import crypto from "crypto";

const TOKEN_EXPIRATION_MS = 60 * 60 * 1000; // 1 hour

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
    if (!email) {
      return NextResponse.json({ success: false, error: "Email is required" }, { status: 400 });
    }

    const user = await getUserByEmail(email);
    if (!user) {
      // Never leak whether an email exists
      return NextResponse.json({
        success: true,
        message: "If that email is on file, you'll receive a reset link shortly.",
      });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + TOKEN_EXPIRATION_MS).toISOString();

    await updateUserById(user._id, {
      passwordResetToken: token,
      passwordResetExpires: expires,
    });

    await sendPasswordResetEmail(user.email, user.name ?? "PMPath user", token);

    return NextResponse.json({
      success: true,
      message: "If that email is on file, you'll receive a reset link shortly.",
    });
  } catch (error) {
    console.error("[ForgotPassword]", error);
    return NextResponse.json(
      { success: false, error: "Unable to send reset link right now." },
      { status: 500 }
    );
  }
}
