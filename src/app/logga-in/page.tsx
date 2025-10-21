"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Aside } from "@/components/layout/aside";
import LoginForm from "@/components/Forms/LoginForm";
import { authClient } from "@/lib/auth-client";

export default function LoginPage(): React.ReactElement {
  const router = useRouter();
  const searchParams = useSearchParams();
  const message = searchParams?.get("message");

  type FormData = { email: string; password: string };
  async function onSubmit(data: FormData): Promise<void> {
    const callbackUrl = searchParams?.get("callbackUrl") || "/";

    try {
      const { error } = await authClient.signIn.email(data, {
        onSuccess: () => {
          router.push(callbackUrl);
        },
      });
      if (error) throw error;
    } catch (error: any) {
      console.error("Inloggningsfel:", error);
      alert("Fel vid inloggning: " + (error.message ?? "Okänt fel"));
    }
  }

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-8">
              <section className="bg-card p-6 rounded-xl shadow border border-border">
                <h1 className="text-3xl font-extrabold text-foreground mb-2">
                  Logga in
                </h1>
                {message && (
                  <p className="text-sm text-destructive mb-4">
                    Du måste{" "}
                    <a href="/registrera" className="underline text-primary">
                      registrera dig
                    </a>{" "}
                    och logga in för att komma åt kassan.
                  </p>
                )}
                <p className="text-muted-foreground mb-6">
                  Logga in för att hantera din prenumeration och dina
                  inställningar.
                </p>

                <LoginForm
                  onSubmit={onSubmit}
                  onCancel={() => router.push("/")}
                />
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
