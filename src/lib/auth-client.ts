import { createAuthClient } from "better-auth/react";

const { authClient, SessionProvider } = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
});

// Behåll ENDAST denna namngivna export:
export { authClient, SessionProvider };
// Om du behöver hela authClient någonstans, exportera den separat:
