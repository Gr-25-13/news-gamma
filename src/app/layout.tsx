import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css"; 

// GOOGLE FONT ROBOTO - Lättläst
const roboto = Roboto({
  weight: ["300", "400", "700", "900"], 
  subsets: ["latin"],
  variable: '--font-roboto', 
});

export const metadata: Metadata = {
  title: "Dagens Dos - Sanningen gör ont, här får du en bedövning.",
  description: "Next.js och Tailwind CSS sida för Dagens Dos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv" className={roboto.className}>
      <body className="min-h-screen flex flex-col bg-gray-50 text-gray-800 antialiased">
        {children}
      </body>
    </html>
  );
}