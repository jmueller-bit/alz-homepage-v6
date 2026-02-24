import type { Metadata } from 'next'
import Image from 'next/image'
import { Quote } from 'lucide-react'
import { getAboutContent, type AboutContentEntry } from '@/lib/notion'

export const metadata: Metadata = {
  title: 'Über uns',
  description: 'Das Astrid Lindgren Zentrum - Eine Privatschule mit Tradition und Innovation.',
}

export const revalidate = 300

export default async function UeberUnsPage() {
  const contentEntries: AboutContentEntry[] = await getAboutContent()

  // Get entries by name/section
  const heroEntry = contentEntries.find(e => e.name === 'hero')
  const geschichteEntry = contentEntries.find(e => e.name === 'geschichte')
  const konzeptEntries = contentEntries.filter(e => e.name?.startsWith('konzept'))
  const zitatEntry = contentEntries.find(e => e.name === 'zitat')
  const teamEntry = contentEntries.find(e => e.name === 'team')

  return (
    <>
      <section className="bg-primary py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-sans text-4xl font-extrabold text-cream sm:text-5xl">
            {heroEntry?.title || 'Über uns'}
          </h1>
          <p className="mt-4 font-serif text-xl text-cream/80 max-w-2xl">
            {heroEntry?.subtitle || 'Wir gestalten die Zukunft von Kindern durch Bildung, Kreativität und Menschlichkeit.'}
          </p>
        </div>
      </section>

      {geschichteEntry && (
        <section className="py-16 sm:py-24 bg-cream">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
              <div>
                <h2 className="font-sans text-3xl font-bold text-charcoal sm:text-4xl">
                  {geschichteEntry.title}
                </h2>
                <div className="mt-6 space-y-4 font-serif text-lg text-charcoal/70">
                  <div dangerouslySetInnerHTML={{ __html: geschichteEntry.contentHtml || '' }} />
                </div>
              </div>
              {geschichteEntry.image && (
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <Image
                    src={geschichteEntry.image.url}
                    alt={geschichteEntry.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {konzeptEntries.length > 0 && (
        <section className="py-16 sm:py-24 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-sans text-3xl font-bold text-charcoal sm:text-4xl">
              Pädagogisches Konzept
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {konzeptEntries.map((entry) => (
                <div key={entry.id} className="rounded-xl bg-cream p-8">
                  <h3 className="font-sans text-xl font-bold text-primary">
                    {entry.title}
                  </h3>
                  <div className="mt-4 font-serif text-charcoal/70">
                    <div dangerouslySetInnerHTML={{ __html: entry.contentHtml || '' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {zitatEntry && (
        <section className="py-16 sm:py-24 bg-primary/5">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative rounded-2xl bg-white p-8 shadow-xl sm:p-12">
              <Quote className="absolute top-8 left-8 h-12 w-12 text-primary/20" />
              <blockquote className="relative">
                <p className="font-serif text-xl italic text-charcoal sm:text-2xl">
                  {zitatEntry.content}
                </p>
                <footer className="mt-8">
                  <cite className="not-italic font-sans font-bold text-primary">
                    {zitatEntry.title}
                  </cite>
                </footer>
              </blockquote>
            </div>
          </div>
        </section>
      )}

      {teamEntry && (
        <section className="py-16 sm:py-24 bg-cream">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-sans text-3xl font-bold text-charcoal sm:text-4xl">
              {teamEntry.title}
            </h2>
            <p className="mt-4 font-serif text-lg text-charcoal/70">
              {teamEntry.content}
            </p>
            <div className="mt-12 rounded-xl border border-charcoal/10 bg-white p-8 text-center shadow-sm">
              <p className="font-sans text-lg text-charcoal">
                {teamEntry.subtitle || 'Aktuell sind keine Teammitglieder veröffentlicht.'}
              </p>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
