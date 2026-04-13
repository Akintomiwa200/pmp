// types/next-auth.d.ts
import type { DefaultSession } from "next-auth";
import type { Level, SubscriptionTier, UserRole } from "@/types";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
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