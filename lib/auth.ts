// lib/auth.ts
// NextAuth v4 - Production-ready configuration with proper TypeScript types

import NextAuth, { type NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/lib/db";
import type { Level, SubscriptionTier, UserRole } from "@/types";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },

  session: {
    strategy: "jwt" as const,        // ← This fixes the TypeScript error
    maxAge: 30 * 24 * 60 * 60,       // 30 days
  },

  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const parsed = credentialsSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const user = await getUserByEmail(parsed.data.email.toLowerCase());
        if (!user || !user.password) return null;

        const isPasswordValid = await bcrypt.compare(
          parsed.data.password,
          user.password
        );

        if (!isPasswordValid) return null;

        return {
          id: String(user._id),
          name: user.name,
          email: user.email,
          image: user.avatar ?? null,
          level: user.level,
          subscription: user.subscription,
          role: user.role ?? "user",
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.level = (user as any).level as Level;
        token.subscription = (user as any).subscription as SubscriptionTier;
        token.role = (user as any).role as UserRole;
      }
      return token;
    },

    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id as string;
        (session.user as any).level = token.level;
        (session.user as any).subscription = token.subscription;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
};

// Export for use in Server Components / API routes
export const { auth, signIn, signOut } = NextAuth(authOptions);