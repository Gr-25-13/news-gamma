import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(req: NextRequest) {
  // Kontrollera om en sessions-cookie finns utan att validera den mot databasen.
  // Detta är en snabb, ytlig kontroll som fungerar i Edge Runtime.
  const sessionCookie = getSessionCookie(req);

  // Om ingen cookie finns, omdirigera till inloggningssidan.
  if (!sessionCookie) {
    const loginUrl = new URL("/logga-in", req.url);
    loginUrl.searchParams.set(
      "message",
      "Du måste logga in för att se den här sidan."
    );
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Om en cookie finns, låt förfrågan fortsätta.
  // Den faktiska, säkra valideringen av sessionen sker sedan på sidan/API-rutten.
  return NextResponse.next();
}

export const config = {
  matcher: ["/installningar/:path*", "/hantera-prenumeration/:path*"],
};
