"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

export type RegisterData = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
};

interface Props {
  onSubmit?: (data: RegisterData) => void;
}

export default function RegisterForm({ onSubmit }: Props) {
  const form = useForm<RegisterData>({ defaultValues: { firstName: "", lastName: "", email: "", phone: "" } });

  function handle(data: RegisterData) {
    if (onSubmit) onSubmit(data);
    else {
      console.log("Register:", data);
      alert("Registrering skickad (frontend-only)");
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
            <FormItem>
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
            <FormItem>
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
          rules={{ required: "E-postadress är obligatorisk", pattern: { value: /\S+@\S+/, message: "Ogiltig e-postadress" } }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-postadress</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Ange din e-postadress" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefonnummer (valfri)</FormLabel>
              <FormControl>
                <Input placeholder="Ange ditt telefonnummer" {...field} />
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
