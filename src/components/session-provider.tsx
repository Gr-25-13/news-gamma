"use client";

import { SessionProvider as BetterAuthSessionProvider } from "@/lib/auth-client";

export default function SessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <BetterAuthSessionProvider>{children}</BetterAuthSessionProvider>;
}
