"use client"

import React from 'react'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { User, Mail, Lock, Phone, MapPin, Settings } from 'lucide-react'

type GeneralValues = {
  firstname: string
  lastname: string
  street: string
  city: string
  phone: string
  zip?: string
}

type EmailValues = {
  email: string
  confirmEmail: string
}

type PasswordValues = {
  password: string
  confirmPassword: string
}

export default function SettingsForm(): React.ReactElement {
  const generalForm = useForm<GeneralValues>({
    defaultValues: {
      firstname: 'Anna',
      lastname: 'Svensson',
      street: 'Storgatan 1',
      city: 'Stockholm',
      phone: '+46 70 123 45 67',
      zip: '12345',
    },
    mode: 'onTouched',
  })

  const emailForm = useForm<EmailValues>({
    defaultValues: {
      email: 'anna@example.com',
      confirmEmail: 'anna@example.com',
    },
    mode: 'onTouched',
  })

  const passwordForm = useForm<PasswordValues>({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    mode: 'onTouched',
  })

  function onSubmitGeneral(data: GeneralValues) {
    console.log('Spara allmän info (frontend-only):', data)
    alert('Allmän info sparad (frontend-only)')
  }

  function onSubmitEmail(data: EmailValues) {
    console.log('Byt e-post (frontend-only):', data)
    alert(`E-post uppdaterad till ${data.email} (frontend-only)`)
    emailForm.reset({ email: data.email, confirmEmail: data.email })
  }

  function onSubmitPassword(data: PasswordValues) {
    console.log('Byt lösenord (frontend-only):', data)
    alert('Lösenord uppdaterat (frontend-only)')
    passwordForm.reset()
  }

  const { register: regGeneral, handleSubmit: handleGeneral, formState: generalState } = generalForm
  const { register: regEmail, handleSubmit: handleEmail, getValues: getEmailValues, formState: emailState } = emailForm
  const { register: regPassword, handleSubmit: handlePassword, getValues: getPasswordValues, formState: passwordState } = passwordForm

  return (
    <div className="space-y-8">
      {/* Allmän information */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2"><User size={18} /> Min profil</h3>
        <form onSubmit={handleGeneral(onSubmitGeneral)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex flex-col">
            <span className="text-sm font-medium text-muted-foreground">Förnamn</span>
            <Input {...regGeneral('firstname', { required: 'Förnamn krävs' })} />
            {generalState.errors.firstname && <p className="text-xs text-destructive mt-1">{String(generalState.errors.firstname?.message)}</p>}
          </label>

          <label className="flex flex-col">
            <span className="text-sm font-medium text-muted-foreground">Efternamn</span>
            <Input {...regGeneral('lastname', { required: 'Efternamn krävs' })} />
            {generalState.errors.lastname && <p className="text-xs text-destructive mt-1">{String(generalState.errors.lastname?.message)}</p>}
          </label>

          <label className="flex flex-col">
            <span className="text-sm font-medium text-muted-foreground flex items-center gap-2"><Phone size={14} /> Telefon</span>
            <Input {...regGeneral('phone')} />
          </label>

          <label className="flex flex-col">
            <span className="text-sm font-medium text-muted-foreground flex items-center gap-2"><MapPin size={14} /> Gatuadress</span>
            <Input {...regGeneral('street')} />
          </label>

          <label className="flex flex-col">
            <span className="text-sm font-medium text-muted-foreground flex items-center gap-2"><Settings size={14} /> Postnummer</span>
            <Input {...regGeneral('zip')} />
          </label>

          <label className="flex flex-col">
            <span className="text-sm font-medium text-muted-foreground flex items-center gap-2"><Settings size={14} /> Stad / Postort</span>
            <Input {...regGeneral('city')} />
          </label>

          <div className="md:col-span-2 flex items-center gap-3">
            <Button type="submit">Spara profil</Button>
            <Button variant="outline" onClick={() => generalForm.reset()}>Återställ</Button>
          </div>
        </form>
      </section>

      {/* Ändra e-post */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2"><Mail size={18} /> Byt e-post</h3>
        <form onSubmit={handleEmail(onSubmitEmail)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex flex-col">
            <span className="text-sm font-medium text-muted-foreground">Ny e-post</span>
            <Input
              {...regEmail('email', {
                required: 'E-post krävs',
                pattern: { value: /^\S+@\S+$/i, message: 'Ogiltig e-post' },
              })}
              type="email"
            />
            {emailState.errors.email && <p className="text-xs text-destructive mt-1">{String(emailState.errors.email.message)}</p>}
          </label>

          <label className="flex flex-col">
            <span className="text-sm font-medium text-muted-foreground">Bekräfta e-post</span>
            <Input
              {...regEmail('confirmEmail', {
                required: 'Bekräfta e-post',
                validate: (value) => value === getEmailValues('email') || 'E-post adresserna matchar inte',
              })}
              type="email"
            />
            {emailState.errors.confirmEmail && <p className="text-xs text-destructive mt-1">{String(emailState.errors.confirmEmail.message)}</p>}
          </label>

          <div className="md:col-span-2 flex items-center gap-3">
            <Button type="submit">Uppdatera e-post</Button>
            <Button variant="outline" onClick={() => emailForm.reset()}>Avbryt</Button>
          </div>
        </form>
      </section>

      {/* Ändra lösenord */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2"><Lock size={18} /> Byt lösenord</h3>
        <form onSubmit={handlePassword(onSubmitPassword)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex flex-col">
            <span className="text-sm font-medium text-muted-foreground">Nytt lösenord</span>
            <Input
              {...regPassword('password', {
                required: 'Lösenord krävs',
                minLength: { value: 8, message: 'Minst 8 tecken' },
              })}
              type="password"
              placeholder="Minst 8 tecken"
            />
            {passwordState.errors.password && <p className="text-xs text-destructive mt-1">{String(passwordState.errors.password.message)}</p>}
          </label>

          <label className="flex flex-col">
            <span className="text-sm font-medium text-muted-foreground">Bekräfta lösenord</span>
            <Input
              {...regPassword('confirmPassword', {
                required: 'Bekräfta lösenord',
                validate: (value) => value === getPasswordValues('password') || 'Lösenorden matchar inte',
              })}
              type="password"
            />
            {passwordState.errors.confirmPassword && <p className="text-xs text-destructive mt-1">{String(passwordState.errors.confirmPassword.message)}</p>}
          </label>

          <div className="md:col-span-2 flex items-center gap-3">
            <Button type="submit">Byt lösenord</Button>
            <Button variant="outline" onClick={() => passwordForm.reset()}>Avbryt</Button>
          </div>
        </form>
      </section>
    </div>
  )
}
