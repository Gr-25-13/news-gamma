"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type FormData = {
  name: string;
  email: string;
  message: string;
};

export default function ContactForm(): React.ReactElement {
  const form = useForm<FormData>({ mode: "onTouched" });

  function onSubmit(data: FormData) {
    // Frontend demo only — normally we'd send this to an API
    console.log("Contact form submitted:", data);
    alert("Tack! Vi har mottagit ditt meddelande (simulerat).");
    form.reset({ name: "", email: "", message: "" });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          rules={{ required: "Namn krävs" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Namn</FormLabel>
              <FormControl>
                <Input placeholder="Ditt namn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          rules={{
            required: "E-post krävs",
            pattern: { value: /\S+@\S+\.\S+/, message: "Ogiltig e-post" },
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-post</FormLabel>
              <FormControl>
                <Input type="email" placeholder="din@epost.se" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          rules={{ required: "Meddelande krävs" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meddelande</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Skriv ditt meddelande här..."
                  className="resize-y"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="pt-2">
          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            Skicka
          </Button>
        </div>
      </form>
    </Form>
  );
}
