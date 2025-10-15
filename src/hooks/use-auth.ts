// use-auth.ts är React-hooken som frontenden använder för att läsa inloggningsstatus och auth-data.
// Bygg vidare på denna för att säkerställa korrekt visning beroende på användarroller och inloggningsstatus.
// Viktigt: Om API eller sessionsformat ändras måste hooken uppdateras och övriga team informeras.
// src/hooks/use-auth.ts
// src/hooks/use-auth.ts
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
});

export const { useSession, signIn, signOut, signUp } = authClient;
