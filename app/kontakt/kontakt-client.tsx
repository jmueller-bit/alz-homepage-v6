'use client'

import { useState } from 'react'
import { Mail, MapPin, Phone, Clock, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'

const contactInfo = [
  {
    icon: MapPin,
    title: 'Adresse',
    content: 'Mariahilfer Straße 123\n1060 Wien',
  },
  {
    icon: Phone,
    title: 'Telefon',
    content: '+43 1 234 5678',
  },
  {
    icon: Mail,
    title: 'E-Mail',
    content: 'info@astrid-lindgren-zentrum.at',
  },
  {
    icon: Clock,
    title: 'Öffnungszeiten',
    content: 'Mo-Fr: 07:30 - 17:00 Uhr',
  },
]

export default function KontaktClient() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    betreff: '',
    nachricht: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <>
      <section className="bg-primary py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-sans text-4xl font-extrabold text-cream sm:text-5xl">
            Kontakt
          </h1>
          <p className="mt-4 font-serif text-xl text-cream/80 max-w-2xl">
            Wir freuen uns auf Ihre Nachricht
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-sans text-2xl font-bold text-charcoal">
                Kontaktinformationen
              </h2>
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                {contactInfo.map((item) => (
                  <Card key={item.title} className="border-0 shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                          <item.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-sans font-semibold text-charcoal">
                            {item.title}
                          </h3>
                          <p className="mt-1 font-serif text-sm text-charcoal/70 whitespace-pre-line">
                            {item.content}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-12">
                <h2 className="font-sans text-2xl font-bold text-charcoal">
                  Anmeldung
                </h2>
                <p className="mt-4 font-serif text-charcoal/70">
                  Für die Anmeldung Ihres Kindes kontaktieren Sie uns bitte telefonisch 
                  oder per E-Mail. Wir vereinbaren dann einen persönlichen Termin 
                  für ein Kennenlerngespräch.
                </p>
                <p className="mt-4 font-serif text-charcoal/70">
                  Die Anmeldung für das nächste Schuljahr beginnt jeweils im Jänner.
                </p>
              </div>
            </div>

            <div>
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <h2 className="font-sans text-xl font-bold text-charcoal">
                    Nachricht senden
                  </h2>
                  
                  {isSubmitted ? (
                    <div className="mt-6 rounded-lg bg-green-50 p-6 text-center">
                      <p className="font-sans font-semibold text-green-800">
                        Vielen Dank!
                      </p>
                      <p className="mt-2 font-serif text-sm text-green-700">
                        Wir werden uns in Kürze bei Ihnen melden.
                      </p>
                      <Button
                        variant="outline"
                        className="mt-4"
                        onClick={() => setIsSubmitted(false)}
                      >
                        Neue Nachricht senden
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                      <div>
                        <Label htmlFor="name">Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Ihr Name"
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">E-Mail *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="ihre@email.at"
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="betreff">Betreff</Label>
                        <Input
                          id="betreff"
                          name="betreff"
                          value={formData.betreff}
                          onChange={handleChange}
                          placeholder="Anmeldung / Frage / ..."
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="nachricht">Nachricht *</Label>
                        <Textarea
                          id="nachricht"
                          name="nachricht"
                          value={formData.nachricht}
                          onChange={handleChange}
                          placeholder="Ihre Nachricht an uns..."
                          required
                          className="mt-1 min-h-[150px]"
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          'Wird gesendet...'
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            Nachricht senden
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="font-sans text-2xl font-bold text-charcoal">
              So finden Sie uns
            </h2>
            <div className="mt-6 aspect-[16/9] w-full overflow-hidden rounded-xl bg-gray-100">
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=16.35%2C48.18%2C16.37%2C48.20&amp;layer=mapnik"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                title="Standortkarte"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
