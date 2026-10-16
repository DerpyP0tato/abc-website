"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel"
import { PhotoLightbox, preloadPhoto } from "@/components/photo-lightbox"
import { sanityImageLoader } from "@/sanity/lib/image"
import type { GalleryPhoto } from "@/sanity/lib/types"

const AUTOPLAY_MS = 3500

interface PhotoCarouselProps {
  photos: GalleryPhoto[]
  title: string
}

export function PhotoCarousel({ photos, title }: PhotoCarouselProps) {
  const [api, setApi] = useState<CarouselApi>()
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [paused, setPaused] = useState(false)

  // Auto-advance, pausing while hovered/focused, while a photo is open, or for reduced-motion users
  useEffect(() => {
    if (!api || paused || openIndex !== null) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const timer = setInterval(() => {
      if (!document.hidden) api.scrollNext()
    }, AUTOPLAY_MS)
    return () => clearInterval(timer)
  }, [api, paused, openIndex])

  return (
    <>
      <Carousel
        setApi={setApi}
        opts={{ loop: true, align: "start" }}
        className="group/carousel"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
        aria-label={`${title} slideshow`}
      >
        <CarouselContent>
          {photos.map((photo, index) => (
            <CarouselItem key={photo._key} className="basis-[85%] sm:basis-1/2 lg:basis-1/3">
              <button
                type="button"
                onClick={() => setOpenIndex(index)}
                onPointerEnter={() => preloadPhoto(photo)}
                onFocus={() => preloadPhoto(photo)}
                className="group block w-full overflow-hidden rounded-xl bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label={`Open photo: ${photo.alt || photo.albumTitle || title}`}
              >
                <Image
                  loader={sanityImageLoader(photo, 4 / 3)}
                  src={photo.asset._ref}
                  alt={photo.alt || photo.albumTitle || title}
                  width={900}
                  height={675}
                  sizes="(max-width: 640px) 85vw, (max-width: 1024px) 50vw, 33vw"
                  style={{ backgroundColor: photo.color }}
                  className="aspect-[4/3] h-auto w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-3 size-10 border-none bg-background/80 shadow-md backdrop-blur-sm lg:opacity-0 lg:transition-opacity lg:group-hover/carousel:opacity-100 lg:focus-visible:opacity-100" />
        <CarouselNext className="right-3 size-10 border-none bg-background/80 shadow-md backdrop-blur-sm lg:opacity-0 lg:transition-opacity lg:group-hover/carousel:opacity-100 lg:focus-visible:opacity-100" />
      </Carousel>

      <PhotoLightbox photos={photos} title={title} index={openIndex} onIndexChange={setOpenIndex} />
    </>
  )
}
