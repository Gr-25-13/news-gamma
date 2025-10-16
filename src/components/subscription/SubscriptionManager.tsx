"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { RefreshCw, CreditCard } from 'lucide-react'

type Plan = {
  id: string
  name: string
  price: string
  features: string[]
}

const PREMIUM_PLAN: Plan = { id: 'premium', name: 'Premium', price: '199 kr/månad', features: ['Alla Artiklar + Arkiv'] }

export default function SubscriptionManager(): React.ReactElement {
  const [currentPlan, setCurrentPlan] = React.useState<Plan>(PREMIUM_PLAN)
  const [loading, setLoading] = React.useState(false)

  function reactivateSubscription() {
    setLoading(true)
    setTimeout(() => {
      setCurrentPlan(PREMIUM_PLAN)
      setLoading(false)
      alert('Prenumeration återaktiverad (frontend-only)')
    }, 700)
  }

  function cancelSubscription() {
    if (!confirm('Vill du verkligen säga upp din prenumeration? (frontend-only)')) return
    setLoading(true)
    setTimeout(() => {
      setCurrentPlan({ id: 'none', name: 'Ingen', price: '0 kr', features: [] })
      setLoading(false)
      alert('Prenumeration uppsagd (frontend-only)')
    }, 700)
  }

  return (
    <div className="space-y-6">
      <section className="bg-card p-6 rounded-lg shadow border border-border">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold">Din plan</h2>
            <p className="text-muted-foreground">Aktuell plan: <strong>{currentPlan.name}</strong></p>
            <p className="text-muted-foreground">Pris: <strong>{currentPlan.price}</strong></p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={() => alert('Visa fakturor (frontend-only)')}><CreditCard size={16} /></Button>
            {currentPlan.id === 'none' ? (
              <Button variant="outline" onClick={reactivateSubscription} disabled={loading}>
                {loading ? <RefreshCw size={16} className="animate-spin" /> : 'Återaktivera'}
              </Button>
            ) : (
              <Button variant="destructive" onClick={cancelSubscription} disabled={loading}>
                {loading ? <RefreshCw size={16} className="animate-spin" /> : 'Säg upp'}
              </Button>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
