"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import CookieConsent from "./cookie-consent";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
      <CookieConsent variant="small" onAcceptCallback={() => console.log('Accepted')} onDeclineCallback={() => console.log('Declined')} />

    </NextThemesProvider>
  );
}
