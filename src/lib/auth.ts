// src/lib/better-auth.config.ts
// Konfiguration för Better Auth autentisering
// Viktigt: Alla ändringar här påverkar sessions och cookies i hela projektet
// Meddela teamet vid ändringar av cookie-namn eller sessionstider

import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma"; // ← ÄNDRAT: Importera från prisma.ts

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 30, // 30 dagar
    updateAge: 60 * 60 * 24, // uppdatera dagligen
  },
  secret: process.env.BETTER_AUTH_SECRET!,
});
