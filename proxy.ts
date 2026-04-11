// proxy.ts
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { UserRole } from "@/types";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET,
  });
  const isLoggedIn = !!token;
  const role = token?.role as UserRole | undefined;

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
      const from = encodeURIComponent(pathname);
      return NextResponse.redirect(
        new URL(`/auth/login?from=${from}`, req.url)
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
