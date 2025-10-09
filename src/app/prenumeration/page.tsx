"use client"

import React from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Aside } from "@/components/layout/aside";
import { Button } from "@/components/ui/button";

type Plan = {
  id: string;
  name: string;
  priceNumber: number;
  priceLabel: string;
  features: string[];
};

const PLANS: Plan[] = [
  { id: "basic", name: "Bas", priceNumber: 49, priceLabel: "49 kr/månad", features: ["Begränsad tillgång", "Ingen reklam"] },
  { id: "plus", name: "Plus", priceNumber: 99, priceLabel: "99 kr/månad", features: ["Full tillgång", "Nyhetsbrev"] },
  { id: "premium", name: "Premium", priceNumber: 199, priceLabel: "199 kr/månad", features: ["Full tillgång + arkiv"] },
];

export default function PrenumerationLanding(): React.ReactElement {
  const router = useRouter();

  function goToCheckout(planId: string) {
    router.push(`/kassa?plan=${encodeURIComponent(planId)}`);
  }

  return (
    <>
      <Navbar />

      <main className="flex-grow pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-8">
              <section className="space-y-6">
                <h1 className="text-2xl font-bold">Prenumeration</h1>
                <p className="text-muted-foreground">Välj en plan nedan för att fortsätta till kassan. Du kan logga in för att hantera befintlig prenumeration.</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {PLANS.map((plan) => (
                    <div key={plan.id} className="p-6 rounded-lg border border-border bg-card shadow">
                      <h3 className="text-lg font-semibold mb-2">{plan.name}</h3>
                      <div className="text-2xl font-extrabold mb-3">{plan.priceLabel}</div>
                      <ul className="text-sm text-muted-foreground mb-4 space-y-1">
                        {plan.features.map((f) => (
                          <li key={f}>• {f}</li>
                        ))}
                      </ul>
                      <div className="flex gap-2">
                        <Button onClick={() => goToCheckout(plan.id)} className="flex-1">Välj</Button>
                        <Button variant="ghost" onClick={() => alert('Detaljer (frontend-only)')}>Detaljer</Button>
                      </div>
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
