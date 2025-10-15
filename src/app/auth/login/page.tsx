// login/page.tsx är inloggningssidan. Den använder login-action och visar fel om inloggning misslyckas.
// Viktigt: Om login-flödet eller sessionformat ändras, måste denna sida och relaterade actions uppdateras.
"use client";
"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    console.log("Försöker logga in med:", email);

    try {
      const response = await fetch("/api/auth/sign-in/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      console.log("Response status:", response.status);
      const data = await response.json();
      console.log("Response data:", data);

      if (!response.ok) {
        setError("Inloggning misslyckades");
        setLoading(false);
        return;
      }

      alert("Inloggning lyckades!");
      window.location.href = "/user/dashboard";
    } catch (err) {
      console.error("Login error:", err);
      setError("Ett fel uppstod");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-4 rounded-lg bg-white p-8 shadow"
      >
        <h1 className="text-2xl font-bold">Logga in</h1>

        {error && (
          <p className="rounded bg-red-100 p-2 text-red-700">{error}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded border p-3"
          required
          disabled={loading}
        />

        <input
          type="password"
          placeholder="Lösenord"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded border p-3"
          required
          disabled={loading}
        />

        <button
          type="submit"
          className="w-full rounded bg-blue-600 p-3 text-white hover:bg-blue-700 disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? "Loggar in..." : "Logga in"}
        </button>

        <div className="rounded bg-blue-50 p-3 text-sm">
          <p className="font-semibold">Testinloggning:</p>
          <p>Email: test@example.com</p>
          <p>Password: test123</p>
        </div>
      </form>
    </div>
  );
}
