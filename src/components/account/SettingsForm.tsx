"use client";

import React from "react";
import { useForm, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User, Mail, Lock, Phone, MapPin, Settings } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type GeneralValues = {
  firstname: string;
  lastname: string;
  street: string;
  city: string;
  phone: string;
  zip?: string;
};

type EmailValues = {
  email: string;
  confirmEmail: string;
};

type PasswordValues = {
  password: string;
  confirmPassword: string;
};

export default function SettingsForm(): React.ReactElement {
  const generalForm = useForm<GeneralValues>({
    defaultValues: {
      firstname: "Anna",
      lastname: "Svensson",
      street: "Storgatan 1",
      city: "Stockholm",
      phone: "+46 70 123 45 67",
      zip: "12345",
    },
    mode: "onTouched",
  });

  const emailForm = useForm<EmailValues>({
    defaultValues: {
      email: "anna@example.com",
      confirmEmail: "anna@example.com",
    },
    mode: "onTouched",
  });

  const passwordForm = useForm<PasswordValues>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    mode: "onTouched",
  });

  function onSubmitGeneral(data: GeneralValues) {
    console.log("Spara allmän info (frontend-only):", data);
    alert("Allmän info sparad (frontend-only)");
  }

  function onSubmitEmail(data: EmailValues) {
    console.log("Byt e-post (frontend-only):", data);
    alert(`E-post uppdaterad till ${data.email} (frontend-only)`);
    emailForm.reset({ email: data.email, confirmEmail: data.email });
  }

  function onSubmitPassword(data: PasswordValues) {
    console.log("Byt lösenord (frontend-only):", data);
    alert("Lösenord uppdaterat (frontend-only)");
    passwordForm.reset();
  }

  return (
    <div className="space-y-8">
      {/* Allmän information */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <User size={18} /> Min profil
        </h3>
        <Form {...generalForm}>
          <form
            onSubmit={generalForm.handleSubmit(onSubmitGeneral)}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <FormField
              control={generalForm.control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Förnamn</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={generalForm.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Efternamn</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={generalForm.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Phone size={14} /> Telefon
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={generalForm.control}
              name="street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <MapPin size={14} /> Gatuadress
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={generalForm.control}
              name="zip"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Settings size={14} /> Postnummer
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={generalForm.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Settings size={14} /> Stad / Postort
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="md:col-span-2 flex items-center gap-3">
              <Button type="submit">Spara profil</Button>
              <Button
                variant="outline"
                onClick={() => generalForm.reset()}
                disabled={generalForm.formState.isSubmitting}
              >
                Återställ
              </Button>
            </div>
          </form>
        </Form>
      </section>

      {/* Ändra e-post */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Mail size={18} /> Byt e-post
        </h3>
        <Form {...emailForm}>
          <form
            onSubmit={emailForm.handleSubmit(onSubmitEmail)}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <FormField
              control={emailForm.control}
              name="email"
              rules={{
                required: "E-post krävs",
                pattern: { value: /^\S+@\S+$/i, message: "Ogiltig e-post" },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ny e-post</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={emailForm.control}
              name="confirmEmail"
              rules={{
                required: "Bekräfta e-post",
                validate: (
                  value // Corrected to use emailForm.getValues
                ) =>
                  value === emailForm.getValues("email") ||
                  "E-post adresserna matchar inte",
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bekräfta e-post</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="md:col-span-2 flex items-center gap-3">
              <Button type="submit">Uppdatera e-post</Button>
              <Button
                variant="outline"
                onClick={() => emailForm.reset()}
                disabled={emailForm.formState.isSubmitting}
              >
                Avbryt
              </Button>
            </div>
          </form>
        </Form>
      </section>

      {/* Ändra lösenord */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Lock size={18} /> Byt lösenord
        </h3>
        <Form {...passwordForm}>
          <form
            onSubmit={passwordForm.handleSubmit(onSubmitPassword)}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <FormField
              control={passwordForm.control}
              name="password"
              rules={{
                required: "Lösenord krävs",
                minLength: { value: 8, message: "Minst 8 tecken" },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nytt lösenord</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Minst 8 tecken"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={passwordForm.control}
              name="confirmPassword"
              rules={{
                required: "Bekräfta lösenord",
                validate: (
                  value // Corrected to use passwordForm.getValues
                ) =>
                  value === passwordForm.getValues("password") ||
                  "Lösenorden matchar inte",
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bekräfta lösenord</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="md:col-span-2 flex items-center gap-3">
              <Button type="submit">Byt lösenord</Button>
              <Button
                variant="outline"
                onClick={() => passwordForm.reset()}
                disabled={passwordForm.formState.isSubmitting}
              >
                Avbryt
              </Button>
            </div>
          </form>
        </Form>
      </section>
    </div>
  );
}
