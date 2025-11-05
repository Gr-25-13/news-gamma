# News Gamma

En modern nyhetsapplikation byggd med Next.js (App Router) och TypeScript. Projektet är utvecklat som ett grupparbete av Josefine, Johan, Magui och Ahmed på Lexicon i Linköping.

## Innehållsförteckning

- [Översikt](#översikt)
- [Teknikstack](#teknikstack)
- [Förutsättningar](#förutsättningar)
- [Installation](#installation)
- [Miljövariabler](#miljövariabler)
- [Utveckling](#utveckling)
- [Projektstruktur](#projektstruktur)
- [E-posthantering](#e-posthantering)
- [Arkitektur](#arkitektur)
- [Felsökning](#felsökning)
- [Distribution](#distribution)
- [Bidra](#bidra)
- [Licens](#licens)
- [Kontakt](#kontakt)

## Översikt

News Gamma är en responsiv nyhetssajt med fokus på prestanda, typesäkerhet och skalbarhet. Applikationen erbjuder användarautentisering, prenumerationssystem och ett administrationsgränssnitt för innehållshantering.

### Huvudfunktioner

- Responsiv design med modern användargränssnitt
- Säker autentisering och användarhantering
- Prenumerationssystem med Stripe-integration
- Administrationsgränssnitt för innehållshantering
- E-postfunktionalitet via Nodemailer

## Teknikstack

### Frontend

- **Next.js** (App Router) - Server-rendering, routing och API-routes
- **React 19** - UI-bibliotek med TypeScript
- **Tailwind CSS** - Utility-first CSS-ramverk

### Backend

- **Prisma** - Modern ORM för databashantering
- **PostgreSQL** - Relationsdatabas
- **Better Auth** - Autentisering och sessionshantering med Prisma-adapter
- **Stripe** - Betalningar och prenumerationshantering

### Komponenter och verktyg

- Radix UI - Tillgängliga UI-komponenter
- Sonner - Toast-notifikationer
- Recharts - Datavisualisering
- Nodemailer - E-posthantering

Se `package.json` för fullständig lista över beroenden.

## Förutsättningar

- **Node.js** 18 eller senare
- **npm** eller annan Node-pakethanterare
- **PostgreSQL** databas (lokalt eller i molnet)

## Installation

### 1. Klona repository

```bash
git clone <repository-url>
cd news-gamma
```

### 2. Installera beroenden

```bash
npm install
```

### 3. Konfigurera miljövariabler

Skapa en `.env`-fil i projektets rot. Se [Miljövariabler](#miljövariabler) för detaljer.

### 4. Generera Prisma Client

```bash
npx prisma generate
```

### 5. Kör databasmigrationer

```bash
npx prisma migrate dev --name init
```

### 6. Starta utvecklingsserver

```bash
npm run dev
```

Applikationen är nu tillgänglig på `http://localhost:3000`

## Miljövariabler

Skapa en `.env`-fil i projektets rot. Inkludera aldrig denna fil i versionshantering.

### Nödvändiga variabler

```env
# Databas
DATABASE_URL="postgresql://postgres:password@localhost:5432/news-gamma"

# Autentisering
BETTER_AUTH_SECRET="en-lång-slumpmässig-och-hemlig-sträng"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
```

### Valfria variabler för e-post

```env
# SMTP-inställningar
SMTP_HOST="smtp.example.com"
SMTP_PORT="587"
SMTP_SECURE="false"
SMTP_USER="smtp-user@example.com"
SMTP_PASS="smtp-password"
EMAIL_FROM="Dagens Dos <no-reply@example.com>"
```

**Obs:** För produktion, använd plattformens secure environment variable storage.

## Utveckling

### Tillgängliga skript

```bash
npm run dev      # Starta utvecklingsserver
npm run build    # Bygg för produktion
npm start        # Starta produktionsserver
npm run lint     # Kör ESLint
```

### Snabbtest

- Besök `http://localhost:3000/` för startsidan
- Registrera en användare via `/registrera`
- Logga in via `/logga-in`
- Kontrollera databastabell efter migrationer
- Verifiera prenumerationsflödet i Stripe testläge

## Projektstruktur

```
news-gamma/
├── src/
│   ├── app/                    # Next.js app-rutter och sidor
│   ├── components/             # Återanvändbara UI-komponenter
│   └── lib/                    # Klient- och serverlogik
│       ├── auth.ts             # Better Auth serverconfig
│       ├── auth-client.ts      # Better Auth klientconfig
│       ├── prisma.ts           # Prisma Client-instans
│       ├── server-auth.ts      # Serverhjälpare för autentisering
│       └── mail.ts             # E-posthantering (valfritt)
├── prisma/
│   └── schema.prisma           # Databasschema och modeller
├── public/                     # Statiska tillgångar
└── .env                        # Miljövariabler (ej i git)
```

### Viktiga filer

- `prisma/schema.prisma` - Prisma schema med PostgreSQL provider
- `src/lib/prisma.ts` - Prisma Client-instans
- `src/lib/auth.ts` - Better Auth-konfiguration med Prisma-adapter
- `src/app/api/auth/[...all]/route.ts` - Better Auth endpoints via toNextJsHandler
- `src/lib/auth-client.ts` - Better Auth client för React-komponenter
- `src/lib/server-auth.ts` - Serverhjälpare för session och behörigheter

## E-posthantering

Projektet använder Nodemailer för e-postfunktionalitet. Implementera i serverkod för att skydda SMTP-uppgifter.

### Exempel: mail.ts

```typescript
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendMail({
  to,
  subject,
  text,
  html,
}: {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}) {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject,
    text,
    html,
  });
}
```

### Testa lokalt

- **Ethereal Email** (https://ethereal.email/) - Gratis testkonto för utveckling
- **Gmail** - Använd app-lösenord eller OAuth

**Tips:** Placera e-postfunktionalitet i Next.js API routes eller `src/lib/` för att skydda känsliga uppgifter.

## Arkitektur

### Autentisering

- **Klient:** `src/lib/auth-client.ts` - Better Auth client för React
- **Server:** `src/lib/auth.ts` - Better Auth konfiguration
- **Hjälpare:** `src/lib/server-auth.ts` - Session och behörighetshantering

### Databas

- **Schema:** `prisma/schema.prisma` - Datamodeller och relationer
- **Client:** `src/lib/prisma.ts` - Prisma Client singleton

### Prenumerationer

- Stripe-integration via `better-auth/stripe`
- Hanterar betalningar och prenumerationsuppgraderingar

## Felsökning

### Vanliga problem

**Typfel efter schemaändringar**

```bash
npx prisma generate
```

**Autentiseringsfel**

- Kontrollera att `BETTER_AUTH_SECRET` är korrekt angiven i `.env`
- Verifiera att Stripe-nycklar matchar rätt miljö (test/production)

**Lint-varningar**

```bash
npm run lint
```

**Databasanslutning**

- Verifiera `DATABASE_URL` i `.env`
- Kontrollera att PostgreSQL-servern kör
- Testa anslutningen med `npx prisma db pull`

## Distribution

Projektet är kompatibelt med plattformar som:

- **Vercel** - Rekommenderad för Next.js
- **Railway**
- **Render**
- Andra plattformar med Next.js-stöd

### Deployment-checklista

1. Konfigurera miljövariabler i målmiljön
2. Säkerställ att `BETTER_AUTH_SECRET` är unik och säker
3. Använd produktions-URL:er för Stripe
4. Kör databasmigrationer i produktionsmiljön
5. Testa autentisering och prenumerationsflöden

## Bidra

Bidrag välkomnas! Följ dessa steg:

1. Forka repository
2. Skapa en feature branch (`git checkout -b feature/amazing-feature`)
3. Commit dina ändringar (`git commit -m 'Add amazing feature'`)
4. Push till branchen (`git push origin feature/amazing-feature`)
5. Öppna en Pull Request

### Riktlinjer

- Kör `npm run lint` innan commit
- Testa alla ändringar lokalt
- Beskriv tydligt vad som ändrats i PR-beskrivningen
- Kontakta projektägare för större förändringar

## Licens

Ingen licensfil ingår i detta repository. Lägg till en `LICENSE`-fil om projektet ska publiceras under en öppen licens (t.ex. MIT).

## Kontakt

För frågor, samarbeten eller support, kontakta utvecklarna:

- Josefine
- Johan
- Magui
- Ahmed

**Lexicon i Linköping**

---

Tack för att du använder och bidrar till News Ga
