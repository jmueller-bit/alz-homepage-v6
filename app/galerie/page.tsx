import type { Metadata } from 'next'
import GalerieClient from './galerie-client'

export const metadata: Metadata = {
  title: 'Galerie',
  description: 'Bildergalerie des Astrid Lindgren Zentrums - Ein Blick in unseren Schulalltag.',
}

export default function GaleriePage() {
  return <GalerieClient />
}
