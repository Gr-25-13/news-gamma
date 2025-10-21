// src/lib/prisma.ts
import { Pool } from "pg";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg"; // Importerar Prisma-adapter för PostgreSQL

// Använder globalThis för att undvika att skapa flera PrismaClient-instanser under hot-reloading i utveckling.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

// Skapar en enda instans av PrismaClient.
// Om en instans redan finns på globalThis (i utveckling), återanvänds den.
// Annars skapas en ny instans.
export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
