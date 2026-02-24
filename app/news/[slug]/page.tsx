import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { getNewsBySlug, type NewsEntry } from '@/lib/notion'
import { formatDate } from '@/lib/utils'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const news: NewsEntry | null = await getNewsBySlug(params.slug)
  
  if (!news) {
    return {
      title: 'News nicht gefunden',
    }
  }
  
  return {
    title: news.title,
    description: news.excerpt,
  }
}

export const dynamic = 'force-dynamic'
export const revalidate = 120

export default async function NewsDetailPage({ params }: Props) {
  const news: NewsEntry | null = await getNewsBySlug(params.slug)

  if (!news) {
    return notFound()
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
          {news.image && (
            <div className="relative aspect-[2/1] overflow-hidden rounded-xl mb-8">
              <Image
                src={news.image.url}
                alt={news.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 900px"
              />
            </div>
          )}

          <div className="flex items-center gap-4 text-sm text-charcoal/60 mb-4">
            <time>{formatDate(news.date)}</time>
            {news.category && (
              <>
                <span>•</span>
                <span className="font-sans text-xs uppercase tracking-wide text-primary">{news.category}</span>
              </>
            )}
          </div>

          <h1 className="font-sans text-3xl font-bold text-charcoal sm:text-4xl">
            {news.title}
          </h1>

          <div 
            className="mt-8 prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ 
              __html: news.contentHtml || '<p>Der Inhalt dieses Artikels folgt in Kürze.</p>' 
            }}
          />

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
