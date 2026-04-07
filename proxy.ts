// proxy.ts
import { getServerSession } from "next-auth/next";
import { authConfig } from "@/lib/auth.config";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Simple in-memory cache for sessions
const sessionCache = new Map<string, any>();
const CACHE_TTL = 1000 * 30; // 30 seconds

function getCacheKey(req: NextRequest) {
  return req.cookies.get("__Secure-next-auth.session-token")?.value || "";
}

async function getCachedSession(req: NextRequest) {
  const key = getCacheKey(req);
  if (!key) return null;

  const cached = sessionCache.get(key);
  if (cached && Date.now() < cached.expiry) {
    return cached.session;
  }

  const session = await getServerSession(authConfig, req, undefined);
  sessionCache.set(key, { session, expiry: Date.now() + CACHE_TTL });
  return session;
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const session = await getCachedSession(req);
  const user = session?.user;
  const isLoggedIn = !!user;
  const role = user?.role as string | undefined;

  // Maintenance mode
  if (process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true") {
    const isMaintenancePage = pathname === "/maintenance";
    const isApiRoute = pathname.startsWith("/api");
    const isAdminRoute =
      pathname.startsWith("/admin") ||
      pathname.startsWith("/superadmin");

    if (!isMaintenancePage && !isApiRoute && !isAdminRoute) {
      return NextResponse.redirect(new URL("/maintenance", req.url));
    }
  }

  // SuperAdmin routes
  if (pathname.startsWith("/superadmin")) {
    if (!isLoggedIn) {
      return NextResponse.redirect(
        new URL("/auth/login?from=superadmin", req.url)
      );
    }
    if (role !== "superadmin") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next();
  }

  // Admin routes
  if (pathname.startsWith("/admin")) {
    if (!isLoggedIn) {
      return NextResponse.redirect(
        new URL("/auth/login?from=admin", req.url)
      );
    }
    if (role !== "admin" && role !== "superadmin") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next();
  }

  // Protected routes
  const protectedRoutes = [
    "/dashboard",
    "/profile",
    "/settings",
    "/progress",
    "/certificates",
    "/notifications",
    "/mentorship/requests",
  ];

  if (protectedRoutes.some((r) => pathname.startsWith(r))) {
    if (!isLoggedIn) {
      const callbackUrl = encodeURIComponent(pathname);
      return NextResponse.redirect(
        new URL(`/auth/login?callbackUrl=${callbackUrl}`, req.url)
      );
    }
  }

  // Logged in users shouldn't visit auth pages
  if (
    isLoggedIn &&
    (pathname.startsWith("/auth/login") ||
      pathname.startsWith("/auth/signup"))
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|public|images|icons|fonts|downloads|api/auth).*)",
  ],
};