"use client";

import * as React from "react";
import { authClient } from "@/lib/auth-client";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
//import authClient from "../../hooks/use-auth";

export type RegisterData = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password: string;
};

export default function RegisterForm() {
  const form = useForm<RegisterData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
    },
  });

  async function handle(data: RegisterData) {
    try {
      await authClient.signUp.email({
        email: data.email,
        password: data.password,
        name: `${data.firstName} ${data.lastName}`,
      });
      alert("Registrering lyckades!");
    } catch (err: any) {
      alert("Fel vid registrering: " + (err.message ?? err));
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handle)} className="space-y-6 p-6">
        <FormField
          control={form.control}
          name="firstName"
          rules={{ required: "Förnamn är obligatoriskt" }}
          render={({ field }) => (
            <FormItem className="grid w-full gap-2">
              <FormLabel>Förnamn</FormLabel>
              <FormControl>
                <Input placeholder="Ange ditt förnamn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          rules={{ required: "Efternamn är obligatoriskt" }}
          render={({ field }) => (
            <FormItem className="grid w-full gap-2">
              <FormLabel>Efternamn</FormLabel>
              <FormControl>
                <Input placeholder="Ange ditt efternamn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          rules={{
            required: "E-postadress är obligatorisk",
            pattern: { value: /\S+@\S+/, message: "Ogiltig e-postadress" },
          }}
          render={({ field }) => (
            <FormItem className="grid w-full gap-2">
              <FormLabel>E-postadress</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Ange din e-postadress"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="grid w-full gap-2">
              <FormLabel>Telefonnummer (valfri)</FormLabel>
              <FormControl>
                <Input placeholder="Ange ditt telefonnummer" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          rules={{ required: "Lösenord är obligatoriskt" }}
          render={({ field }) => (
            <FormItem className="grid w-full gap-2">
              <FormLabel>Lösenord</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Ange ett lösenord"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit">Registrera</Button>
        </div>
      </form>
    </Form>
  );
}
