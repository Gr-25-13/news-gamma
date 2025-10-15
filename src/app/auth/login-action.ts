"use server";

import { BetterAuth } from "better-auth";
import betterAuthConfig from "@/lib/better-auth.config";
import { redirect } from "next/navigation";

export async function loginAction(email: string, password: string) {
  const auth = BetterAuth(betterAuthConfig);
  const session = await auth.signIn("credentials", {
    email,
    password,
  });

  if (!session) {
    return { error: "Invalid credentials" };
  }

  redirect("/user/dashboard");
}
