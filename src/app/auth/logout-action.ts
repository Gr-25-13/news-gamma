// src/app/auth/logout-action.ts
"use server";

import { authClient } from "@/hooks/use-auth";
import { redirect } from "next/navigation";

export async function logoutAction() {
  await authClient.signOut();
  redirect("/");
}
