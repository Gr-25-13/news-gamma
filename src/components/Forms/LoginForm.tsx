"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type FormData = {
  email: string;
  password: string;
};

interface LoginFormProps {
  onSubmit: (data: FormData) => void;
  onCancel?: () => void;
}

export default function LoginForm({ onSubmit, onCancel }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ defaultValues: { email: "", password: "" } });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div>
        <label className="block text-sm text-muted-foreground mb-1">E-post</label>
        <Input
          type="email"
          {...register("email", {
            required: "E-post krävs",
            pattern: { value: /\S+@\S+\.\S+/, message: "Ogiltig e-post" },
          })}
        />
        {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm text-muted-foreground mb-1">Lösenord</label>
        <Input
          type="password"
          {...register("password", { required: "Lösenord krävs", minLength: { value: 6, message: "Minst 6 tecken" } })}
        />
        {errors.password && <p className="text-xs text-destructive mt-1">{errors.password.message}</p>}
      </div>

      <div className="flex items-center justify-between gap-2">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>Avbryt</Button>
        <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Loggar in...' : 'Logga in'}</Button>
      </div>
    </form>
  );
}

