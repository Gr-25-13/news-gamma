import Link from 'next/link';
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type FooterVariant = 'primary' | 'secondary' | 'muted';

interface FooterSectionProps {
  title: string;
  links: { name: string; href: string }[];
  variant?: FooterVariant;
}

function FooterSection({ title, links, variant = 'primary' }: FooterSectionProps): React.ReactElement {
  const titleClass = `text-lg font-semibold mb-4 ${
    variant === 'primary' ? 'text-primary' : variant === 'secondary' ? 'text-secondary' : 'text-muted-foreground'
  }`;
  return (
    <div>
      <h4 className={titleClass}>{title}</h4>
      <ul className="space-y-2 text-sm text-muted-foreground">
        {links.map((link) => (
          <li key={link.name}>
            <Link href={link.href} className="hover:text-primary">
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

const footerSections = [
  {
    title: 'Sidor',
    variant: 'primary' as FooterVariant,
    links: [
      { name: 'Hem', href: '#' },
      { name: 'Registrera', href: '#' },
      { name: 'Min Sida', href: '#' },
     
    ],
  },
  {
    title: 'Juridiskt',
    variant: 'muted' as FooterVariant,
    links: [
      { name: 'Prenumerationsvillkor', href: '#' },
      { name: 'Integritet & Cookies', href: '#' },
      { name: 'Kontakta Oss', href: '#' },
    ],
  },
];

export function Footer(): React.ReactElement {
  return (
    <footer className="bg-background text-foreground mt-12 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-muted-foreground">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Om Oss */}
          <div>
            <h4 className={`text-lg font-semibold mb-4 text-primary`}>
              Dagens Dos
            </h4>
            <p className="text-sm text-muted-foreground">
              Vår mission är att leverera nyheter så att du kan känna dig minimalt informerad.
            </p>
          </div>

          {/* Dynamiska sektioner */}
          {footerSections.map((section) => (
            <FooterSection
              key={section.title}
              title={section.title}
              links={section.links}
              variant={section.variant}
            />
          ))}

          {/* Nyhetsbrev */}
          <div>
            <h4 className={`text-lg font-semibold mb-4 text-secondary`}>
              Håll dig uppdaterad
            </h4>
            <p className="text-sm text-muted-foreground mb-3">
              Få vårt personaliserade nyhetsbrev (endast för betalande kunder).
            </p>

            <Input type="email" placeholder="Din e-post" className="w-full" />

            <Button variant="default" className="mt-2 w-full">
              Anmäl
            </Button>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 pt-6 border-t border-muted-foreground/30 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; 2025 Dagens Dos. Alla rättigheter reserverade. Utvecklat av Josefine, Johan, Ahamed och Magui och en stor dos sarkasm.
          </p>
        </div>
      </div>
    </footer>
  );
}