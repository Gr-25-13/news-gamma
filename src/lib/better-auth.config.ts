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

const mockUsers = [
  {
    id: "test-user-1",
    email: "test@example.com",
    emailVerified: false,
    name: "Test User",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const mockAdapter = {
  // @ts-expect-error Implicit any type för data parameter i mock
  async create(data) {
    return { id: "new-id", ...data };
  },
  // @ts-expect-error Implicit any type för where parameter i mock
  async findOne(where) {
    if (where?.email === "test@example.com") {
      return mockUsers[0];
    }
    return null;
  },
  async findMany() {
    return mockUsers;
  },
  // @ts-expect-error Implicit any type för id och data parameters i mock
  async update(id, data) {
    return { id, ...data };
  },
  async delete(_id: string) {
    return true;
  },
};

export const auth = betterAuth({
  // @ts-expect-error Mock adapter matchar inte Better Auth's adapter-typ
  database: mockAdapter,
  emailAndPassword: {
    enabled: true,
    async verifyPassword(password: string) {
      // Hårdkodat lösenord för test
      return password === "test123";
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },
  secret:
    process.env.BETTER_AUTH_SECRET ||
    "test-secret-key-minimum-32-characters-long",
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
});
