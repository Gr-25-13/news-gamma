import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import React from 'react';

// Async funktion för server-side datafetch (Server Component)
export default async function HomePage(): Promise<JSX.Element> {
  // const data = await fetch(...);
  return (
    <>
      <Navbar />
      {/* Innehåll här */}
      <Footer />
    </>
  );
}