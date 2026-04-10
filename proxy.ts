// proxy.ts
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export const proxy = auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth;
  const role = req.auth?.user?.role;

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
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|public|images|icons|fonts|downloads|api/auth).*)",
  ],
};