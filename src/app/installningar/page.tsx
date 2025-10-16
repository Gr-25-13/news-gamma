import React from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import SettingsForm from '@/components/account/SettingsForm'

export default function AccountPage(): React.ReactElement {
  return (
    <>
      <Navbar />

      <main className="flex-grow pt-8 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold mb-6">Mina inställningar</h1>
          <div className="bg-card p-6 rounded-lg shadow border border-border">
            <SettingsForm />
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
