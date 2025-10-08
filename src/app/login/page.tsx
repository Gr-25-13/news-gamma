"use client";

import React from "react";
import { useRouter } from "next/navigation";
import LoginForm from "@/components/Forms/LoginForm";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Aside } from "@/components/layout/aside";

export default function LoginPage(): React.ReactElement {
  const router = useRouter();

  function handleLogin() {
    // Mock login: set session in-memory or localStorage if desired
    // For now, redirect to /account
    router.push('/account');
  }

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-8">
              <section className="bg-card p-6 rounded-xl shadow border border-border">
                <h1 className="text-3xl font-extrabold text-foreground mb-2">Logga in</h1>
                <p className="text-muted-foreground mb-6">Logga in för att hantera din prenumeration och dina inställningar.</p>

                <LoginForm onSubmit={handleLogin} onCancel={() => router.push('/')} />

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
