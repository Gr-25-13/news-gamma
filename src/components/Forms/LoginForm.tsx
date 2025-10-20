"use client";

import * as React from "react";
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

type FormData = {
  email: string;
  password: string;
};

interface LoginFormProps {
  onSubmit: (data: FormData) => void;
  onCancel?: () => void;
}

export default function LoginForm({ onSubmit, onCancel }: LoginFormProps) {
  const form = useForm<FormData>({
    defaultValues: { email: "", password: "" },
    mode: "onTouched",
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
          name="password"
          rules={{ required: "Lösenord krävs" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lösenord</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-between gap-2 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={form.formState.isSubmitting}
          >
            Avbryt
          </Button>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Loggar in..." : "Logga in"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
