"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { Check, X, RefreshCw, CreditCard } from 'lucide-react'

type Plan = {
  id: string
  name: string
  price: string
  features: string[]
}

const AVAILABLE_PLANS: Plan[] = [
  { id: 'basic', name: 'Bas', price: '49 kr/månad', features: ['Begränsad tillgång', 'Ingen reklam'] },
  { id: 'plus', name: 'Plus', price: '99 kr/månad', features: ['Full tillgång', 'Nyhetsbrev'] },
  { id: 'premium', name: 'Premium', price: '199 kr/månad', features: ['Allt i Plus + arkiv'] },
]

export default function SubscriptionManager(): React.ReactElement {
  const [currentPlan, setCurrentPlan] = React.useState<Plan>(AVAILABLE_PLANS[1])
  const [loading, setLoading] = React.useState(false)

  function switchPlan(planId: string) {
    setLoading(true)
    setTimeout(() => {
      const p = AVAILABLE_PLANS.find((pl) => pl.id === planId) || AVAILABLE_PLANS[0]
      setCurrentPlan(p)
      setLoading(false)
      alert(`Bytte till plan: ${p.name} (frontend-only)`)
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
            <Button variant="outline" onClick={() => switchPlan('plus')}>Byt plan</Button>
            <Button variant="destructive" onClick={cancelSubscription}>Säg upp</Button>
          </div>
        </div>
      </section>

      <section className="bg-card p-6 rounded-lg shadow border border-border">
        <h3 className="text-lg font-semibold mb-3">Byt plan</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {AVAILABLE_PLANS.map((plan) => (
            <div key={plan.id} className={`p-4 rounded-lg border ${plan.id === currentPlan.id ? 'border-primary bg-primary/5' : 'border-border'} `}>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">{plan.name}</h4>
                  <p className="text-sm text-muted-foreground">{plan.price}</p>
                </div>
                <div>
                  {plan.id === currentPlan.id ? <Check size={18} className="text-primary" /> : <X size={18} className="text-muted-foreground" />}
                </div>
              </div>
              <ul className="mt-3 text-sm text-muted-foreground space-y-1 mb-3">
                {plan.features.map((f) => <li key={f}>• {f}</li>)}
              </ul>
              <div className="flex gap-2">
                <Button variant={plan.id === currentPlan.id ? 'secondary' : 'default'} onClick={() => switchPlan(plan.id)} disabled={loading}>
                  {plan.id === currentPlan.id ? 'Aktuell plan' : 'Välj'}
                </Button>
                <Button variant="ghost" onClick={() => alert('Visa detaljer (frontend-only)')}>Detaljer</Button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
