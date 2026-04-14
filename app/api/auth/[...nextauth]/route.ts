// app/api/auth/[...nextauth]/route.ts
// Re-export the GET and POST handlers from the centralised auth config.
import { handlers } from "@/lib/auth";

export const { GET, POST } = handlers;