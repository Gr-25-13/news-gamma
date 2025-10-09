import Link from "next/link";
import { Button } from "@/components/ui/button";
import * as React from "react";

interface PopularItem {
  title: string;
  href?: string;
}

interface WeatherData {
  tempC: number;
  location: string;
  condition: string;
}

interface AsideProps {
  popular?: PopularItem[];
  weather?: WeatherData;
  onSubscribeClick?: () => void;
}

// HÅRDKODAT TILLS VIDARE
export function Aside({
  popular = [
    { title: "Den genomsnittliga livslängden på ett Twitter‑utbrott." },
    { title: "Hur man ignorerar notiser och ändå får ångest." },
    { title: "Politikern som sa det du ville höra (och gjorde tvärtom)." },
  ],
  weather = { tempC: 14, location: "Linköping", condition: "Molnigt, som vanligt." },
  onSubscribeClick,
}: AsideProps): React.ReactElement {
  return (
    <aside className="space-y-8">
      {/* Mest Populärt */}
      <section className="rounded-xl border bg-card text-card-foreground p-6 shadow">
        <h3 className="text-xl font-bold mb-4 border-b pb-2">Mest Populärt</h3>
        <ul className="space-y-4">
          {popular.map((item, i) => {
            const numberColor =
              i === 0 ? "text-primary" : "text-muted-foreground";
            const borderColor =
              i === 0 ? "border-primary/60" : "border-muted";
            const content = (
              <>
                <span className={`font-bold mr-2 ${numberColor}`}>
                  {i + 1}.
                </span>
                {item.title}
              </>
            );
            return (
              <li
                key={item.title}
                className={`text-sm md:text-base leading-snug cursor-pointer border-l-4 ${borderColor} pl-3 hover:text-primary transition-colors`}
              >
                {item.href ? (
                  <Link href={item.href} className="block">
                    {content}
                  </Link>
                ) : (
                  content
                )}
              </li>
            );
          })}
        </ul>
      </section>

      {/* Prenumeration */}
      <section className="rounded-xl p-6 shadow bg-primary text-primary-foreground text-center">
        <h3 className="text-2xl font-bold mb-3">
          Vill du ha mer än en Dos?
        </h3>
        <p className="mb-4 text-sm md:text-base opacity-90">
          Lås upp de riktigt deprimerande nyheterna med premium.
        </p>
        <Button
          variant="secondary"
          onClick={onSubscribeClick}
          asChild={!onSubscribeClick}
          className="font-medium"
        >
          {onSubscribeClick ? (
            <span>Prenumerera Nu →</span>
          ) : (
            <Link href="/subscribe">Prenumerera Nu →</Link>
          )}
        </Button>
      </section>

      {/* Väder */}
      <section className="rounded-xl border bg-card text-card-foreground p-6 shadow">
        <h3 className="text-xl font-bold mb-4 border-b pb-2">
          Lokalt Väder (API)
        </h3>
        <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-4xl font-extrabold text-primary">
                {weather.tempC}°C
              </p>
              <p className="text-sm text-muted-foreground">{weather.location}</p>
            </div>
            <p className="text-sm md:text-base font-medium text-muted-foreground flex-1">
              {weather.condition}
            </p>
        </div>
      </section>

      {/* Annons / Elpriser */}
      <section className="rounded-xl p-6 text-center shadow bg-muted">
        <h3 className="text-lg font-bold mb-2 text-foreground">Annons</h3>
        <p className="text-sm text-muted-foreground">
          Få dina elpriser direkt i inboxen. Som om det hjälpte.
        </p>
        <Link
          href="#"
          className="text-sm font-medium text-primary hover:underline mt-2 inline-block"
        >
          Visa Elpriser (API)
        </Link>
      </section>
    </aside>
  );
}