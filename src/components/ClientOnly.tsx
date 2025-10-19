"use client"

import { useEffect, useState } from 'react'
// Den är komponent som säkerställer att dess barn endast renderas på klientsidan
export default function ClientOnly({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null
  return <>{children}</>
}

// ClientOnly behövs i headern när den innehåller UI som bara kan/bör 
// renderas i webbläsaren (t.ex. använder window/document, localStorage, 
//   cookies, klient‑hooks som useEffect eller better‑auth:s klient‑hooks). 
//   Den förhindrar SSR/hydrations‑mismatch och att serverrenderad HTML skiljer sig från klientens initiala render.

// Exempel användning: använd ClientOnly runt en knapp eller session‑info i din header
/* <ClientOnly>
  <UserMenu />  // komponent som använder useSession, localStorage etc.
</ClientOnly> */

// Rekommendation:
// Håll komponenter som kan vara server‑renderade som 
// serverkomponenter för bättre prestanda. 
// Wrapa endast de bitar som behöver browser‑API med ClientOnly. 
// Detta minimerar client‑bundle och undviker onödigt clientjobb