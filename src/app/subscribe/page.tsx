import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Aside } from "@/components/layout/aside";
import { Button } from "@/components/ui/button";

export default function SubscribePage(): React.ReactElement {
  const plans = [
    {
      id: "basic",
      name: "Bas",
      price: "49 kr/månad",
      features: ["Begränsad tillgång till artiklar", "Ingen reklam"],
    },
    {
      id: "plus",
      name: "Plus",
      price: "99 kr/månad",
      features: ["Full tillgång", "Nyhetsbrev", "Prioriterad support"],
    },
    {
      id: "premium",
      name: "Premium",
      price: "199 kr/månad",
      features: ["Full tillgång + arkiv", "Personliga rekommendationer", "VIP-evenemang"],
    },
  ];

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-8">
              <section className="bg-card p-6 rounded-xl shadow border border-border">
                <h1 className="text-3xl font-extrabold text-foreground mb-2">Välj prenumeration</h1>
                <p className="text-muted-foreground mb-6">Välj en plan som passar dig. Du kan när som helst uppgradera eller avbryta.</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {plans.map((plan) => (
                    <div key={plan.id} className="p-4 rounded-lg border border-border bg-popover text-popover-foreground">
                      <h3 className="text-xl font-semibold text-foreground mb-2">{plan.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{plan.price}</p>
                      <ul className="mb-4 text-sm text-muted-foreground space-y-1">
                        {plan.features.map((f) => (
                          <li key={f}>• {f}</li>
                        ))}
                      </ul>
                      <Button asChild variant="default" className="w-full">
                        <Link href={`/subscribe/checkout?plan=${plan.id}`}>Välj {plan.name}</Link>
                      </Button>
                    </div>
                  ))}
                </div>

              </section>
            </div>

            <Aside />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
