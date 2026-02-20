import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'News',
  description: 'Aktuelle Neuigkeiten und Termine vom Astrid Lindgren Zentrum.',
}

const newsItems = [
  {
    id: '1',
    title: 'Tag der offenen Tür am 15. März',
    excerpt: 'Besuchen Sie uns und lernen Sie unser pädagogisches Konzept kennen. Wir freuen uns auf Sie und Ihre Familie!',
    content: 'Wir laden Sie herzlich zu unserem Tag der offenen Tür ein. Lernen Sie unsere Räume kennen, sprechen Sie mit unseren Lehrern und erleben Sie unseren Schulalltag.',
    date: '15. Februar 2026',
    slug: 'tag-der-offenen-tuer',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop',
  },
  {
    id: '2',
    title: 'Neues Theaterprojekt startet',
    excerpt: 'Unsere Schülerinnen und Schüler zeigen im Juni ihr Können in einer eindrucksvollen Aufführung.',
    content: 'Das neue Theaterprojekt steht unter dem Motto "Träume werden wahr". Alle Schüler sind eingeladen, mitzumachen.',
    date: '10. Februar 2026',
    slug: 'theaterprojekt',
    image: 'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=600&h=400&fit=crop',
  },
  {
    id: '3',
    title: 'Auszeichnung für Umweltprojekt',
    excerpt: 'Unsere Schule erhält das ÖkoKids-Zertifikat für nachhaltiges Handeln und Umweltbewusstsein.',
    content: 'Wir sind stolz darauf, das ÖkoKids-Zertifikat erhalten zu haben. Unser Umweltprojekt mit Garten und Kompostierung wurde ausgezeichnet.',
    date: '5. Februar 2026',
    slug: 'umweltprojekt-auszeichnung',
    image: 'https://images.unsplash.com/photo-1566251037378-5e04e3bec343?w=600&h=400&fit=crop',
  },
  {
    id: '4',
    title: 'Winterfest 2026',
    excerpt: 'Das jährliche Winterfest war ein großer Erfolg mit vielen kreativen Beiträgen der Kinder.',
    content: 'Bei unserem Winterfest gab es Musik, Theater, Kunstausstellungen und viele festliche Aktivitäten. Danke an alle Teilnehmer!',
    date: '20. Dezember 2025',
    slug: 'winterfest-2026',
    image: 'https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=600&h=400&fit=crop',
  },
  {
    id: '5',
    title: 'Sportwoche im Frühling',
    excerpt: 'Eine Woche voller Sport und Bewegung steht im März auf dem Programm.',
    content: 'Die Sportwoche bietet den Kindern die Möglichkeit, verschiedene Sportarten auszuprobieren und Teamgeist zu entwickeln.',
    date: '1. Dezember 2025',
    slug: 'sportwoche-fruehling',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&h=400&fit=crop',
  },
]

export default function NewsPage() {
  return (
    <>
      <section className="bg-primary py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-sans text-4xl font-extrabold text-cream sm:text-5xl">
            Neuigkeiten
          </h1>
          <p className="mt-4 font-serif text-xl text-cream/80 max-w-2xl">
            Aktuelle Informationen aus unserem Schulalltag
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {newsItems.map((news) => (
              <Link key={news.id} href={`/news/${news.slug}`}>
                <Card className="h-full overflow-hidden border-0 shadow-md transition-shadow hover:shadow-lg">
                  <div className="relative aspect-[3/2] overflow-hidden">
                    <Image
                      src={news.image}
                      alt={news.title}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-6">
                    <time className="font-sans text-sm text-primary">
                      {news.date}
                    </time>
                    <h2 className="mt-2 font-sans text-xl font-bold text-charcoal hover:text-primary transition-colors">
                      {news.title}
                    </h2>
                    <p className="mt-2 font-serif text-charcoal/70 line-clamp-3">
                      {news.excerpt}
                    </p>
                    <Button variant="link" className="mt-4 h-auto p-0 text-primary">
                      Weiterlesen →
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
