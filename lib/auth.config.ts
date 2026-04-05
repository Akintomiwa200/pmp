// lib/auth.config.ts
import type { NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

export const authConfig = {
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/auth/login",
    signOut: "/",
    error: "/auth/login",
    newUser: "/onboarding",
  },
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.level = (user as Record<string, unknown>).level as string;
        token.subscription = (user as Record<string, unknown>).subscription as string;
        token.role = (user as Record<string, unknown>).role as string ?? "user";
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        (session.user as Record<string, unknown>).level = token.level;
        (session.user as Record<string, unknown>).subscription = token.subscription;
        (session.user as Record<string, unknown>).role = token.role;
      }
      return session;
    },
    authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user;
      const { pathname } = request.nextUrl;

      // Protected routes
      const protectedPaths = ["/dashboard", "/profile", "/settings", "/progress", "/certificates", "/notifications"];
      const adminPaths = ["/admin"];
      const superadminPaths = ["/superadmin"];

      if (superadminPaths.some((p) => pathname.startsWith(p))) {
        return (auth?.user as Record<string, unknown>)?.role === "superadmin";
      }
      if (adminPaths.some((p) => pathname.startsWith(p))) {
        const role = (auth?.user as Record<string, unknown>)?.role;
        return role === "admin" || role === "superadmin";
      }
      if (protectedPaths.some((p) => pathname.startsWith(p))) {
        return isLoggedIn;
      }
      return true;
    },
  },
  providers: [
    ...(process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET
      ? [GoogleProvider({ clientId: process.env.AUTH_GOOGLE_ID, clientSecret: process.env.AUTH_GOOGLE_SECRET })]
      : []),
    ...(process.env.AUTH_GITHUB_ID && process.env.AUTH_GITHUB_SECRET
      ? [GitHubProvider({ clientId: process.env.AUTH_GITHUB_ID, clientSecret: process.env.AUTH_GITHUB_SECRET })]
      : []),
  ],
} satisfies NextAuthConfig;
