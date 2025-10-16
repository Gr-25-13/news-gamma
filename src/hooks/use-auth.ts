import { createAuthClient } from "better-auth/react";

const authClient = createAuthClient({
  baseURL: process.env.NEXTPUBLIC_APP_URL || "http://localhost:3000/api/auth",
});

export default authClient;
export const { useSession, signIn, signOut, signUp } = authClient;
