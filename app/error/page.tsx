import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Frown, AlertTriangle, Ghost, Coffee, Rocket } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Ups! Etwas ist schiefgelaufen',
  description: 'Die angeforderte Seite konnte nicht geladen werden.',
}

const funnyMessages = [
  {
    icon: Ghost,
    title: 'Huch, die Seite ist spurlos verschwunden!',
    message: 'Unsere Geisterjäger sind bereits auf der Suche. Bis dahin können Sie zurück zur Startseite fliegen.',
  },
  {
    icon: Coffee,
    title: 'Die Seite macht gerade Kaffeepause',
    message: 'Selbst Webseiten brauchen mal eine Pause. Wie wäre es mit einem echten Kaffee, während wir die Seite wiederbeleben?',
  },
  {
    icon: Rocket,
    title: 'Houston, wir haben ein Problem!',
    message: 'Diese Seite scheint im Weltraum verloren gegangen zu sein. Wir senden ein Rettungsteam.',
  },
  {
    icon: AlertTriangle,
    title: 'Oops! Da ist etwas schiefgelaufen',
    message: 'Unsere Hamster sind aus dem Rad gesprungen. Wir fangen sie gerade wieder ein.',
  },
]

export default function ErrorPage() {
  // Zufällige Nachricht auswählen
  const randomMessage = funnyMessages[Math.floor(Math.random() * funnyMessages.length)]
  const Icon = randomMessage.icon

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-primary/10 rounded-full mb-6">
            <Icon className="w-12 h-12 text-primary" />
          </div>
          
          <h1 className="font-sans text-4xl md:text-5xl font-bold text-charcoal mb-4">
            {randomMessage.title}
          </h1>
          
          <p className="font-serif text-xl text-charcoal/70 mb-8">
            {randomMessage.message}
          </p>
          
          <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-charcoal/10 mb-8">
            <p className="font-mono text-sm text-charcoal/60 mb-2">Fehler-Code:</p>
            <code className="bg-charcoal text-cream px-3 py-1 rounded text-sm font-mono">
              404_NOT_FOUND 🦄
            </code>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="font-sans">
            <Link href="/">
              Zurück zur Startseite
            </Link>
          </Button>
          
          <Button asChild variant="outline" size="lg" className="font-sans">
            <Link href="/kontakt">
              Kontakt aufnehmen
            </Link>
          </Button>
        </div>

        <div className="mt-12 pt-8 border-t border-charcoal/10">
          <p className="font-serif text-sm text-charcoal/50">
            Technischer Support: Unsere IT-Elfen arbeiten bereits daran! 🧝‍♂️✨
          </p>
        </div>
      </div>
    </div>
  )
}
