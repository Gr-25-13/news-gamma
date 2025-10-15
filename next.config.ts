import { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Befintlig konfiguration...

  // Lägg till Turbopack root
  experimental: {
    turbo: {
      root: process.cwd(), // Använd aktuell projekt-katalog som root
    },
  },
};

export default nextConfig;
