import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

// Exportera GET och POST som Better Auth handler
export const { POST, GET } = toNextJsHandler(auth);
