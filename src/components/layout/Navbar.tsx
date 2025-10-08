'use client';

import Link from 'next/link';
import Image from 'next/image';
import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LinkButton from '../Buttons/LinkButton';
import { ModeToggle } from '../Buttons/toggle-theme-button';

const navigation: { name: string; href: string }[] = [
  { name: 'Senaste', href: '#' },
  { name: 'Inrikes', href: '#' },
  { name: 'Världen', href: '#' },
  { name: 'Ekonomi', href: '#' },
  { name: 'Sport', href: '#' },
  { name: 'Väder', href: '#' },
];

export function Navbar(): React.ReactElement {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <header className="bg-card shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
          
          {/* Logo och Titel-sektion */}
          <Link href="/" className="flex justify-start lg:w-0 lg:flex-1 items-center space-x-3">
            <div className="relative h-10 w-10">
              <Image
                src="/loggo.jpg"
                alt="Dagens Dos Logga"
                fill
                className="object-contain"
              />
            </div>
            
            <div className="flex flex-col">
              <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
                Dagens Dos
              </h1>
              <p className="text-sm italic text-muted-foreground mt-1">
                Sanningen gör ont, här får du en bedövning.
              </p>
            </div>
          </Link>

   

          {/* Huvudnavigering (Desktop) */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <LinkButton key={item.name} href={item.href} variant="nav">
                {item.name}
              </LinkButton>
            ))}
          </nav>

        

          {/* Autentisering och Prenumeration (Desktop) */}
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0 space-x-3">
            {/* Logga in - outline/ghost */}
            <Button asChild variant="outline" size="default">
              <Link href="#">Logga in</Link>
            </Button>

            {/* Prenumerera - primary */}
            <Button asChild variant="default" size="default">
              <Link href="#">Prenumerera</Link>
            </Button>

            {/* Theme toggle (desktop) */}
            <ModeToggle />
          </div>
          {/* Mobil menyknapp */}
          <div className="md:hidden">
            {/* Använd komponentens variant/size istället för att overridea färger */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Öppna huvudmeny"
            >
              <Menu className="h-6 w-6" aria-hidden="true" />
            </Button>
          </div>
        </div>

        {/* Mobil meny (utvidgad) */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {navigation.map((item) => (
              <LinkButton
                key={item.name}
                href={item.href}
                variant="nav"
                className="block w-full text-left"
              >
                {item.name}
              </LinkButton>
            ))}
            <div className="pt-2 border-t space-y-2">
              <div className="space-y-2 px-2">
                <Button asChild variant="outline" className="w-full">
                  <Link href="#">Logga in</Link>
                </Button>
                <Button asChild variant="default" className="w-full">
                  <Link href="#">Prenumerera</Link>
                </Button>
                <div className="pt-2">
                  <ModeToggle />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
