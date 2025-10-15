// better-auth.config.ts innehåller konfiguration för autentisering och prenumerationer.
// Viktigt: Alla ändringar här påverkar hur sessions och cookies hanteras i hela projektet.
// Se till att meddela teamet om ni ändrar inställningar som exempelvis cookie-namn eller sessionstider.
// src/lib/better-auth.config.ts
// src/lib/better-auth.config.ts
// src/lib/better-auth.config.ts
/*import { betterAuth } from "better-auth";
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
  secret: process.env.BETTER_AUTH_SECRET!,
});
*/

// src/lib/better-auth.config.ts
// src/lib/better-auth.config.ts
// src/lib/better-auth.config.ts
// src/lib/better-auth.config.ts
// src/lib/better-auth.config.ts
// src/lib/better-auth.config.ts
// src/lib/better-auth.config.ts
// src/lib/better-auth.config.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";

// Lägg till optionell databaskontroll
const prisma = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
});
