// src/lib/better-auth.config.ts
// Konfiguration för Better Auth autentisering
// Viktigt: Alla ändringar här påverkar sessions och cookies i hela projektet
// Meddela teamet vid ändringar av cookie-namn eller sessionstider

import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  secret: process.env.BETTER_AUTH_SECRET!,

  // Next.js 15 kompatibilitet
  advanced: {
    generateId: () => {
      // Säker ID-generering som fungerar i alla miljöer
      return Math.random().toString(36).substring(2) + Date.now().toString(36);
    },
  },
});

export default auth;
