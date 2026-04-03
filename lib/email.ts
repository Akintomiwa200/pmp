// lib/email.ts
// Email service using Resend. Falls back gracefully if not configured.

const FROM = process.env.RESEND_FROM_EMAIL ?? "noreply@pmpath.app";
const FROM_NAME = process.env.RESEND_FROM_NAME ?? "PMPath";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

async function sendEmail(to: string, subject: string, html: string): Promise<boolean> {
  if (!process.env.RESEND_API_KEY) {
    console.log(`[Email] Would send to ${to}: ${subject}`);
    return true; // Graceful fallback
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from: `${FROM_NAME} <${FROM}>`, to, subject, html }),
    });
    return res.ok;
  } catch (err) {
    console.error("[Email] Send failed:", err);
    return false;
  }
}

// ── Welcome email ──────────────────────────────────────────────────────────────
export async function sendWelcomeEmail(to: string, name: string): Promise<boolean> {
  return sendEmail(
    to,
    `Welcome to PMPath, ${name}! 🎉`,
    `
    <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:32px 24px;color:#0f172a">
      <div style="background:linear-gradient(135deg,#16a34a,#0d9488);padding:32px;border-radius:16px;text-align:center;margin-bottom:24px">
        <h1 style="color:white;margin:0;font-size:28px">Welcome to PMPath! 🚀</h1>
        <p style="color:rgba(255,255,255,0.85);margin:8px 0 0">Your PM journey starts today</p>
      </div>
      <p>Hi <strong>${name}</strong>,</p>
      <p>You're in! PMPath is your structured path from aspiring professional to certified Project Manager.</p>
      <p><strong>Your next steps:</strong></p>
      <ol>
        <li>Take the <a href="${APP_URL}/onboarding">5-minute assessment</a> to find your starting level</li>
        <li>Explore your <a href="${APP_URL}/dashboard">personalised dashboard</a></li>
        <li>Start your first <a href="${APP_URL}/learn/beginner">beginner module</a></li>
      </ol>
      <div style="text-align:center;margin:32px 0">
        <a href="${APP_URL}/onboarding" style="background:linear-gradient(135deg,#16a34a,#0d9488);color:white;padding:14px 32px;border-radius:12px;text-decoration:none;font-weight:600;display:inline-block">
          Take the Assessment →
        </a>
      </div>
      <p style="color:#64748b;font-size:13px">If you didn't create this account, you can safely ignore this email.</p>
      <p style="color:#64748b;font-size:13px">© ${new Date().getFullYear()} PMPath · <a href="${APP_URL}/privacy" style="color:#16a34a">Privacy</a> · <a href="${APP_URL}/unsubscribe" style="color:#16a34a">Unsubscribe</a></p>
    </div>
    `
  );
}

// ── Password reset ─────────────────────────────────────────────────────────────
export async function sendPasswordResetEmail(to: string, name: string, token: string): Promise<boolean> {
  const resetUrl = `${APP_URL}/auth/reset-password?token=${token}`;
  return sendEmail(
    to,
    "Reset your PMPath password",
    `
    <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:32px 24px;color:#0f172a">
      <h1 style="font-size:24px;margin-bottom:16px">Reset Your Password</h1>
      <p>Hi <strong>${name}</strong>, we received a request to reset your password.</p>
      <p>Click the button below to set a new password. This link expires in <strong>1 hour</strong>.</p>
      <div style="text-align:center;margin:32px 0">
        <a href="${resetUrl}" style="background:#16a34a;color:white;padding:14px 32px;border-radius:12px;text-decoration:none;font-weight:600;display:inline-block">
          Reset Password
        </a>
      </div>
      <p>Or copy this link: <a href="${resetUrl}">${resetUrl}</a></p>
      <p style="color:#64748b;font-size:13px">If you didn't request this, ignore this email. Your password won't change.</p>
    </div>
    `
  );
}

// ── Mentor match notification ──────────────────────────────────────────────────
export async function sendMentorMatchEmail(to: string, menteeName: string, mentorName: string, mentorHref: string): Promise<boolean> {
  return sendEmail(
    to,
    `You have a new mentorship request from ${menteeName}!`,
    `
    <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:32px 24px;color:#0f172a">
      <h1 style="font-size:24px;margin-bottom:16px">New Mentorship Request 🤝</h1>
      <p>Hi <strong>${mentorName}</strong>,</p>
      <p><strong>${menteeName}</strong> has requested you as their PMPath mentor.</p>
      <div style="text-align:center;margin:32px 0">
        <a href="${APP_URL}${mentorHref}" style="background:#16a34a;color:white;padding:14px 32px;border-radius:12px;text-decoration:none;font-weight:600;display:inline-block">
          View Request →
        </a>
      </div>
    </div>
    `
  );
}

// ── Quiz result ────────────────────────────────────────────────────────────────
export async function sendQuizResultEmail(to: string, name: string, quizTitle: string, score: number, passed: boolean): Promise<boolean> {
  return sendEmail(
    to,
    `${passed ? "✅ Quiz passed" : "📖 Quiz result"}: ${quizTitle}`,
    `
    <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:32px 24px;color:#0f172a">
      <h1 style="font-size:24px;margin-bottom:8px">${passed ? "Quiz Passed! 🎉" : "Good attempt!"}</h1>
      <p>Hi <strong>${name}</strong>, here's your result for <strong>${quizTitle}</strong>:</p>
      <div style="background:${passed ? "#f0fdf4" : "#fef9c3"};border:1px solid ${passed ? "#bbf7d0" : "#fde047"};padding:24px;border-radius:12px;text-align:center;margin:24px 0">
        <p style="font-size:48px;font-weight:bold;margin:0;color:${passed ? "#16a34a" : "#92400e"}">${score}%</p>
        <p style="margin:8px 0 0;color:#64748b">${passed ? "Above 70% passing mark ✓" : "Below 70% — try again!"}</p>
      </div>
      <div style="text-align:center">
        <a href="${APP_URL}/quiz" style="background:#16a34a;color:white;padding:12px 28px;border-radius:12px;text-decoration:none;font-weight:600;display:inline-block">
          ${passed ? "Try Next Level" : "Retry Quiz"}
        </a>
      </div>
    </div>
    `
  );
}

// ── Event reminder ─────────────────────────────────────────────────────────────
export async function sendEventReminderEmail(to: string, name: string, eventTitle: string, eventDate: string, eventUrl: string): Promise<boolean> {
  return sendEmail(
    to,
    `Reminder: "${eventTitle}" is tomorrow 📅`,
    `
    <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:32px 24px;color:#0f172a">
      <h1 style="font-size:24px;margin-bottom:16px">Event Reminder 📅</h1>
      <p>Hi <strong>${name}</strong>,</p>
      <p>Don't forget — <strong>${eventTitle}</strong> is happening tomorrow on <strong>${eventDate}</strong>.</p>
      <div style="text-align:center;margin:32px 0">
        <a href="${eventUrl}" style="background:#2563eb;color:white;padding:14px 32px;border-radius:12px;text-decoration:none;font-weight:600;display:inline-block">
          Join Event →
        </a>
      </div>
    </div>
    `
  );
}

// ── Certificate earned ─────────────────────────────────────────────────────────
export async function sendCertificateEmail(to: string, name: string, courseTitle: string, certId: string): Promise<boolean> {
  return sendEmail(
    to,
    `🎓 Certificate Earned: ${courseTitle}`,
    `
    <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:32px 24px;color:#0f172a">
      <div style="background:linear-gradient(135deg,#7c3aed,#ec4899);padding:32px;border-radius:16px;text-align:center;margin-bottom:24px">
        <p style="font-size:48px;margin:0">🏆</p>
        <h1 style="color:white;margin:8px 0 0;font-size:24px">Certificate Earned!</h1>
      </div>
      <p>Congratulations <strong>${name}</strong>! You've completed <strong>${courseTitle}</strong>.</p>
      <p>Your certificate ID: <code style="background:#f1f5f9;padding:2px 6px;border-radius:4px">${certId}</code></p>
      <div style="text-align:center;margin:32px 0">
        <a href="${APP_URL}/certificates" style="background:#7c3aed;color:white;padding:14px 32px;border-radius:12px;text-decoration:none;font-weight:600;display:inline-block">
          View Certificate →
        </a>
      </div>
    </div>
    `
  );
}
