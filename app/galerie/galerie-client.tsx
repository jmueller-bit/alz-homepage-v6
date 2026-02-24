'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, ZoomIn, ImageOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { GalleryImage } from '@/lib/contentful'

interface GalerieClientProps {
  initialImages: GalleryImage[]
}

// Fallback images wenn Contentful keine Bilder liefert
const fallbackImages = [
  {
    id: '1',
    src: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop',
    alt: 'Kinder beim Lernen',
    category: 'Unterricht',
    title: 'Kinder beim Lernen',
    order: 1,
  },
  {
    id: '2',
    src: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&h=600&fit=crop',
    alt: 'Schulhof',
    category: 'Schule',
    title: 'Schulhof',
    order: 2,
  },
  {
    id: '3',
    src: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&h=600&fit=crop',
    alt: 'Kinder beim Spielen',
    category: 'Aktivitäten',
    title: 'Kinder beim Spielen',
    order: 3,
  },
  {
    id: '4',
    src: 'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=800&h=600&fit=crop',
    alt: 'Musikunterricht',
    category: 'Kunst',
    title: 'Musikunterricht',
    order: 4,
  },
  {
    id: '5',
    src: 'https://images.unsplash.com/photo-1566251037378-5e04e3bec343?w=800&h=600&fit=crop',
    alt: 'Gartenprojekt',
    category: 'Natur',
    title: 'Gartenprojekt',
    order: 5,
  },
  {
    id: '6',
    src: 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=800&h=600&fit=crop',
    alt: 'Sport',
    category: 'Sport',
    title: 'Sport',
    order: 6,
  },
]

export default function GalerieClient({ initialImages }: GalerieClientProps) {
  const galleryImages = initialImages.length > 0 ? initialImages : fallbackImages
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const openLightbox = (index: number) => {
    setSelectedImage(index)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const showPrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? galleryImages.length - 1 : selectedImage - 1)
    }
  }

  const showNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === galleryImages.length - 1 ? 0 : selectedImage + 1)
    }
  }

  return (
    <>
      <section className="bg-primary py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-sans text-4xl font-extrabold text-cream sm:text-5xl">
            Galerie
          </h1>
          <p className="mt-4 font-serif text-xl text-cream/80 max-w-2xl">
            Ein Blick in unseren Schulalltag
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {galleryImages.length === 0 ? (
            <div className="text-center py-12">
              <ImageOff className="mx-auto h-12 w-12 text-charcoal/30" />
              <p className="mt-4 font-sans text-lg text-charcoal">
                Derzeit sind keine Bilder in der Galerie verfügbar.
              </p>
              <p className="mt-2 font-serif text-charcoal/70">
                Sobald neue Bilder hinzugefügt werden, erscheinen sie hier automatisch.
              </p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {galleryImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group relative aspect-square cursor-pointer overflow-hidden rounded-lg bg-gray-100"
                  onClick={() => openLightbox(index)}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/30" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                    <ZoomIn className="h-10 w-10 text-white" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                    <p className="font-sans text-sm font-medium text-white">
                      {image.title}
                    </p>
                    <p className="font-serif text-xs text-white/80">
                      {image.category}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
            onClick={closeLightbox}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
              onClick={showPrev}
              aria-label="Vorheriges Bild"
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>

            <motion.div
              key={selectedImage}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-h-[90vh] max-w-[90vw]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={galleryImages[selectedImage].src}
                alt={galleryImages[selectedImage].alt}
                width={1200}
                height={800}
                className="max-h-[90vh] w-auto object-contain"
              />
              <div className="absolute -bottom-16 left-0 right-0 text-center">
                <p className="font-sans font-medium text-white">
                  {galleryImages[selectedImage].title}
                </p>
                <p className="font-serif text-sm text-white/70">
                  {galleryImages[selectedImage].category}
                </p>
              </div>
            </motion.div>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
              onClick={showNext}
              aria-label="Nächstes Bild"
            >
              <ChevronRight className="h-8 w-8" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4 text-white hover:bg-white/20"
              onClick={closeLightbox}
              aria-label="Schließen"
            >
              <X className="h-8 w-8" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
