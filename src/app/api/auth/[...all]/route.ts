import { auth } from "@/lib/better-auth.config";

// Exportera GET och POST som Better Auth handler
export const GET = auth.handler;

export const POST = async (req: Request) => {
  console.log("Auth POST request:", req.url);
  return auth.handler(req);
};
