import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

interface Props {
  params: { slug: string }
}

export const metadata: Metadata = {
  title: 'News',
  description: 'Aktuelle Neuigkeiten und Termine vom Astrid Lindgren Zentrum.',
}

const newsItems: Record<string, {
  title: string
  excerpt: string
  content: string
  date: string
  image: string
  author?: string
}> = {
  'tag-der-offenen-tuer': {
    title: 'Tag der offenen Tür am 15. März',
    excerpt: 'Besuchen Sie uns und lernen Sie unser pädagogisches Konzept kennen. Wir freuen uns auf Sie und Ihre Familie!',
    content: `Wir laden Sie herzlich zu unserem Tag der offenen Tür ein. Lernen Sie unsere Räume kennen, sprechen Sie mit unseren Lehrern und erleben Sie unseren Schulalltag.

An diesem Tag haben Sie die Möglichkeit:
- Unsere Klassenräume zu besichtigen
- Mit unseren Lehrern zu sprechen
- Mehr über unser pädagogisches Konzept zu erfahren
- Sich über unsere Nachmittagsangebote zu informieren

Für das leibliche Wohl ist gesorgt. Wir freuen uns auf Sie und Ihre Familie!

Datum: 15. März 2026
Uhrzeit: 10:00 - 16:00 Uhr
Ort: Astrid Lindgren Zentrum, Mariahilfer Straße 123, 1060 Wien`,
    date: '15. Februar 2026',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&h=600&fit=crop',
  },
  'theaterprojekt': {
    title: 'Neues Theaterprojekt startet',
    excerpt: 'Unsere Schülerinnen und Schüler zeigen im Juni ihr Können in einer eindrucksvollen Aufführung.',
    content: `Das neue Theaterprojekt steht unter dem Motto "Träume werden wahr". Alle Schüler sind eingeladen, mitzumachen.

In den kommenden Monaten werden wir gemeinsam ein Theaterstück erarbeiten, das Tradition und Moderne verbindet. Die Kinder können Rollen übernehmen, Bühnenbilder gestalten oder bei Technik und Organisation mitarbeiten.

Wir freuen uns auf eine tolle Aufführung im Juni!`,
    date: '10. Februar 2026',
    image: 'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=1200&h=600&fit=crop',
  },
  'umweltprojekt-auszeichnung': {
    title: 'Auszeichnung für Umweltprojekt',
    excerpt: 'Unsere Schule erhält das ÖkoKids-Zertifikat für nachhaltiges Handeln und Umweltbewusstsein.',
    content: `Wir sind stolz darauf, das ÖkoKids-Zertifikat erhalten zu haben. Unser Umweltprojekt mit Garten und Kompostierung wurde ausgezeichnet.

Das Projekt umfasst:
- Schulgarten mit Gemüse und Kräutern
- Kompostierung von Essensresten
- Regenwassersammlung
- Umweltbildungsprojekte

Die Kinder lernen so von klein auf, verantwortungsvoll mit der Natur umzugehen.`,
    date: '5. Februar 2026',
    image: 'https://images.unsplash.com/photo-1566251037378-5e04e3bec343?w=1200&h=600&fit=crop',
  },
}

export default function NewsDetailPage({ params }: Props) {
  const news = newsItems[params.slug]

  if (!news) {
    notFound()
  }

  return (
    <>
      <section className="bg-primary py-8">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Button variant="ghost" asChild className="text-cream hover:text-cream hover:bg-primary/20 -ml-3">
            <Link href="/news">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Zurück zu den News
            </Link>
          </Button>
        </div>
      </section>

      <article className="py-16 sm:py-24 bg-cream">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="relative aspect-[2/1] overflow-hidden rounded-xl mb-8">
            <Image
              src={news.image}
              alt={news.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="flex items-center gap-4 text-sm text-charcoal/60 mb-4">
            <time>{news.date}</time>
            {news.author && (
              <>
                <span>•</span>
                <span>{news.author}</span>
              </>
            )}
          </div>

          <h1 className="font-sans text-3xl font-bold text-charcoal sm:text-4xl">
            {news.title}
          </h1>

          <div className="mt-8 font-serif text-lg text-charcoal/80 whitespace-pre-line">
            {news.content}
          </div>

          <div className="mt-12 pt-8 border-t border-charcoal/10">
            <Button asChild>
              <Link href="/news">← Alle News anzeigen</Link>
            </Button>
          </div>
        </div>
      </article>
    </>
  )
}
