import type { Metadata } from 'next'
import GalerieClient from './galerie-client'
import { getGalleryImages } from '@/lib/contentful'

export const metadata: Metadata = {
  title: 'Galerie',
  description: 'Bildergalerie des Astrid Lindgren Zentrums - Ein Blick in unseren Schulalltag.',
}

export const dynamic = 'force-dynamic'
export const revalidate = 300

export default async function GaleriePage() {
  const galleryImages = await getGalleryImages()
  
  return <GalerieClient initialImages={galleryImages} />
}
