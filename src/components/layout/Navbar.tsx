'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu } from 'lucide-react'; 
import { Button } from '@/components/ui/button'; 
import LinkButton from '../Buttons/LinkButton';
import { ModeToggle } from '../Buttons/toggle-theme-button';

const navigation = [
  { name: 'Senaste', href: '#' },
  { name: 'Inrikes', href: '#' },
  { name: 'Världen', href: '#' },
  { name: 'Ekonomi', href: '#' },
  { name: 'Sport', href: '#' },
  { name: 'Väder', href: '#' },
];

export default function Navbar(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

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
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <LinkButton href="#" variant="login">
              Logga in
            </LinkButton>
            <LinkButton href="#" variant="primary" className="ml-4">
              Prenumerera
            </LinkButton>
          </div>
   {/* THEME BUTTON */}
          <ModeToggle />
          {/* Mobil menyknapp */}
          <div className="md:hidden">
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="bg-muted p-2 text-muted-foreground hover:bg-muted/50"
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
              <Link key={item.name} href={item.href} className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-muted">
                {item.name}
              </Link>
            ))}
            <div className="pt-2 border-t border-border space-y-2">
              <LinkButton href="#" variant="login" className="block w-full text-left !mr-0">
                Logga in
              </LinkButton>
              <LinkButton href="#" variant="primary" className="block w-full text-center">
                Prenumerera
              </LinkButton>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};