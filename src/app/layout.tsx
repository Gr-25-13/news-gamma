import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css"; 
import { Providers } from "@/components/theme-provider";

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
      <head>
        <script
          // Sätter html.dark tidigt för att undvika hydration-mismatch
          dangerouslySetInnerHTML={{
            __html: `(function(){
  try {
    var t = localStorage.getItem('theme');
    if(!t){
      t = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    if(t === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }catch(e){}
})();`,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-gray-50 text-gray-800 antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}