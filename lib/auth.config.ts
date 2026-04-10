// lib/auth.config.ts
import type { NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import type { Level, SubscriptionTier, UserRole } from "@/types";

export const authConfig = {
  secret: process.env.AUTH_SECRET,

  pages: {
    signIn: "/auth/login",
    signOut: "/",
    error: "/auth/login",
    newUser: "/onboarding",
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.level = user.level;
        token.subscription = user.subscription;
        token.role = user.role ?? "user";
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.level = token.level as Level;
        session.user.subscription = token.subscription as SubscriptionTier;
        session.user.role = token.role as UserRole;
      }
      return session;
    },

  },

  providers: [
    ...(process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET
      ? [
          Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
          }),
        ]
      : []),

    ...(process.env.AUTH_GITHUB_ID && process.env.AUTH_GITHUB_SECRET
      ? [
          GitHub({
            clientId: process.env.AUTH_GITHUB_ID,
            clientSecret: process.env.AUTH_GITHUB_SECRET,
          }),
        ]
      : []),
  ],
} satisfies NextAuthConfig;