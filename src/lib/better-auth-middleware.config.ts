// src/lib/better-auth-middleware.config.ts
// src/lib/better-auth-middleware.config.ts
import type { BetterAuthOptions } from "better-auth";

export const middlewareAuthConfig: BetterAuthOptions = {
  session: {
    expiresIn: 60 * 60 * 24 * 30, // 30 dagar i sekunder
    updateAge: 60 * 60 * 24, // uppdatera session dagligen (24 timmar)
  },
  secret: process.env.SESSION_COOKIE_SECRET || "supersecretfallbackkey",
};
