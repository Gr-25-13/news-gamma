// src/app/auth/login-action.ts
"use server";

import { auth } from "@/lib/better-auth.config";
import { redirect } from "next/navigation";

export async function loginAction(email: string, password: string) {
  const session = await auth.api.signInEmail({
    body: {
      email,
      password,
    },
  });

  if (!session) {
    return { error: "Invalid credentials" };
  }

  redirect("/user/dashboard");
}
