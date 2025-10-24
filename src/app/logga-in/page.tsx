"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { authClient } from "@/lib/auth-client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Mail, AlertCircle, CheckCircle2 } from "lucide-react";

const messages = {
  "check-email":
    "Konto skapat! Kontrollera din e-post för verifieringslänk innan du loggar in.",
  "invalid-password": "Ogiltigt lösenord.",
  "user-not-found": "Användare hittades inte.",
  "email-verified": "E-post verifierad! Du kan nu logga in.",
  "requires-verification":
    "Du måste verifiera din e-post innan du kan logga in.",
  "verification-sent": "En ny verifieringslänk har skickats till din e-post.",
};

export default function LoginPage(): React.JSX.Element {
  const router = useRouter();
  const searchParams = useSearchParams();
  const messageKey = searchParams?.get("message");
  const message = messageKey
    ? messages[messageKey as keyof typeof messages]
    : "";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showResendButton, setShowResendButton] = useState(false);

  async function resendVerification() {
    if (!email) return;

    setLoading(true);
    try {
      const result = await fetch("/api/auth/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (result.ok) {
        setError(null);
        router.push("/logga-in?message=verification-sent");
      } else {
        setError("Kunde inte skicka ny verifieringslänk");
      }
    } catch (err) {
      console.error("Resend verification error:", err);
      setError("Ett fel uppstod när verifieringslänken skulle skickas");
    } finally {
      setLoading(false);
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setShowResendButton(false);
    setLoading(true);

    try {
      const result = await authClient.signIn.email({ email, password });
      console.log("[Login] Response:", result);

      if (result.error) {
        if (
          result.error.code === "requires-verification" ||
          result.error.message?.toLowerCase().includes("verify")
        ) {
          setError(
            "Du måste verifiera din e-post innan du kan logga in. Kontrollera din inkorg och klicka på verifieringslänken."
          );
          setShowResendButton(true);
          return;
        }
        setError(
          result.error.message ??
            "Inloggningen misslyckades. Kontrollera dina uppgifter."
        );
        return;
      }

      router.push("/"); // <-- ÄNDRA DENNA RAD från "/mina-sidor" till "/"
    } catch (err) {
      console.error("Login error:", err);
      setError("Ett fel uppstod. Försök igen.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-muted/30">
      <Navbar />
      <main className="flex-grow flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-lg space-y-6">
          {/* Success Message */}
          {message && (
            <Alert className="bg-green-50 border-2 border-green-200 dark:bg-green-950 dark:border-green-800 shadow-lg">
              <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
              <AlertTitle className="text-green-900 dark:text-green-100 font-semibold text-lg">
                Framgång!
              </AlertTitle>
              <AlertDescription className="text-green-800 dark:text-green-200 text-base mt-2">
                {message}
              </AlertDescription>
            </Alert>
          )}

          {/* Error Message */}
          {error && (
            <Alert variant="destructive" className="border-2 shadow-lg">
              <AlertCircle className="h-5 w-5" />
              <AlertTitle className="font-semibold text-lg">
                {showResendButton
                  ? "E-postverifiering krävs"
                  : "Inloggning misslyckades"}
              </AlertTitle>
              <AlertDescription className="text-base mt-2">
                {error}
              </AlertDescription>
              {showResendButton && (
                <div className="mt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={resendVerification}
                    disabled={loading}
                    className="w-full bg-white dark:bg-slate-950"
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Skicka ny verifieringslänk
                  </Button>
                </div>
              )}
            </Alert>
          )}

          {/* Login Card */}
          <Card className="border-2 border-white dark:border-slate-800 shadow-2xl rounded-2xl overflow-hidden">
            <CardHeader className="space-y-2 bg-gradient-to-r from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 pb-8">
              <CardTitle className="text-3xl font-bold text-center">
                Logga in
              </CardTitle>
              <CardDescription className="text-center text-base">
                Ange dina uppgifter för att komma åt ditt konto
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-8 pb-8 px-8">
              <form onSubmit={onSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-base font-medium">
                    E-postadress
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="din@email.se"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                    className="h-12 text-base border-2 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-base font-medium">
                    Lösenord
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                    className="h-12 text-base border-2 rounded-xl"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 text-base font-semibold rounded-xl"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Loggar in...
                    </>
                  ) : (
                    "Logga in"
                  )}
                </Button>

                <div className="text-center text-base pt-4">
                  <span className="text-muted-foreground">
                    Har du inget konto?{" "}
                  </span>
                  <a
                    href="/registrera"
                    className="text-primary hover:underline font-semibold"
                  >
                    Registrera dig här
                  </a>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
