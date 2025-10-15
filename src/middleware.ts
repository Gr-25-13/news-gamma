// middleware.ts körs vid varje request för att kolla om användaren är autentiserad.
// Här sker routskydd och sessionvalidering för skyddade sidor.
// Eventuella ändringar i sessionslogik eller cookie-namn måste kommuniceras till hela teamet.
// Viktigt: Om API eller sessionsformat ändras måste även hooks och konfiguration uppdateras.

// src/middleware.ts
// src/middlesware.ts
// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./lib/better-auth.config";

export async function middleware(req: NextRequest) {
  const session = await auth.api.getSession({
    headers: req.headers,
  });

  if (!session) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/user/:path*", "/admin/:path*"],
};
