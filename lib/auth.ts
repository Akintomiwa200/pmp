// lib/auth.ts
import NextAuth, { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/lib/db";
import type { JWT } from "next-auth/jwt";
import type { User as NextAuthUser } from "next-auth";

// Import your custom types
import type { Level, SubscriptionTier, UserRole } from "@/types";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

// Extend types (this should already be in your types/next-auth.d.ts)
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      level: Level;
      subscription: SubscriptionTier;
      role: UserRole;
    };
  }

  interface User {
    id: string;
    level: Level;
    subscription: SubscriptionTier;
    role: UserRole;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    level: Level;
    subscription: SubscriptionTier;
    role: UserRole;
  }
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),
    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        const parsed = credentialsSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const user = await getUserByEmail(parsed.data.email);
        if (!user?.password) return null;

        const passwordMatch = await bcrypt.compare(
          parsed.data.password,
          user.password
        );

        if (!passwordMatch) return null;

        return {
          id: String(user._id),
          name: user.name,
          email: user.email,
          image: user.avatar ?? null,
          level: user.level,
          subscription: user.subscription,
          role: user.role ?? "user",
        } as NextAuthUser;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: NextAuthUser }) {
      if (user) {
        token.id = user.id;
        token.level = user.level;
        token.subscription = user.subscription;
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }: { session: any; token: JWT }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.level = token.level;
        session.user.subscription = token.subscription;
        session.user.role = token.role;
      }
      return session;
    },
  },
};

// For App Router with v4
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };