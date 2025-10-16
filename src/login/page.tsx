"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/auth/sign-in/email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      alert("Inloggad!");
    } else {
      alert("Fel vid inloggning");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-4 border p-8"
      >
        <h1 className="text-2xl font-bold">Logga in</h1>
        <input
          type="email"
          placeholder="E-post"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2"
          required
        />
        <input
          type="password"
          placeholder="Lösenord"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 p-2 text-white hover:bg-blue-600"
        >
          Logga in
        </button>
      </form>
    </div>
  );
}
