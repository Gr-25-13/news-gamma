import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";

// Definiera typer för användaren och kontextens värde.
interface User {
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string) => Promise<Response>;
  signOut: () => Promise<Response>;
}

// Skapa en React-kontext för användarstatus.
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/session");
      if (res.ok) {
        const session = await res.json();
        setUser(session?.user || null);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Failed to fetch session:", error);
      setUser(null);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const signIn = useCallback(async (email: string, password: string) => {
    const response = await authClient.signIn(email, password);
    if (response.ok) {
      await fetchUser(); // Refresh session on successful sign-in
    }
    return response;
  }, [fetchUser]);

  const signOut = useCallback(async () => {
    const response = await authClient.signOut();
    if (response.ok) {
      setUser(null);
    }
    return response;
  }, []);

  const value = useMemo(() => ({
    user,
    signIn,
    signOut,
  }), [user, signIn, signOut]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useSession() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
}

export const authClient = {
  signIn: async (email: string, password: string) => {
    return fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
  },
  signOut: async () => {
    return fetch("/api/auth/logout", { method: "POST" });
  },
};
