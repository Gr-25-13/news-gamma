import Link from 'next/link';
import { FC } from 'react';
import { Input } from '@/components/ui/input'; // Antar shadcn/ui Input
import { Button } from '@/components/ui/button'; // Antar shadcn/ui Button

interface FooterSectionProps {
  title: string;
  links: { name: string; href: string }[];
  titleClass?: string;
}

const FooterSection: FC<FooterSectionProps> = ({ title, links, titleClass = 'text-primary-foreground' }) => (
  <div>
    <h4 className={`text-lg font-semibold mb-4 ${titleClass}`}>
      {title}
    </h4>
    <ul className="space-y-2 text-sm text-muted-foreground">
      {links.map((link) => (
        <li key={link.name}>
          <Link href={link.href} className="hover:text-white">
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default function Footer(): JSX.Element {
  return (
    <footer className="bg-card-foreground mt-12 py-10"> {/* card-foreground är mörk (som bg-gray-800) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          
          {/*  Om Oss */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-primary">
              Dagens Dos
            </h4>
            <p className="text-sm text-muted-foreground">
              Vår mission är att leverera nyheter så att du kan känna dig minimalt informerad.
            </p>
          </div>

          {/* Sidor */}
          <FooterSection 
            title="Sidor" 
            links={[
              { name: 'Hem', href: '#' },
              { name: 'Registrera', href: '#' },
              { name: 'Min Sida', href: '#' },
              { name: 'Admin', href: '#' },
            ]}
          />

          {/* Juridiskt */}
          <FooterSection 
            title="Juridiskt" 
            links={[
              { name: 'Prenumerationsvillkor', href: '#' },
              { name: 'Integritet & Cookies', href: '#' },
              { name: 'Kontakta Oss', href: '#' },
            ]}
          />

          {/* Nyhetsbrev */}
          <div className="text-left">
            <h4 className="text-lg font-semibold mb-4 text-secondary">
              Håll dig uppdaterad
            </h4>
            <p className="text-sm text-muted-foreground mb-3">
              Få vårt personaliserade nyhetsbrev (endast för betalande kunder).
            </p>
          
            <Input 
              type="email" 
              placeholder="Din e-post" 
              className="w-full p-2 bg-gray-700 text-white border border-gray-600"
            />
           
            <Button 
              className="mt-2 w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2 rounded-md transition duration-150"
            >
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