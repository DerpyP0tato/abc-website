"use client"

import Image from "next/image"
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { urlFor } from "@/sanity/lib/image"
import type { GalleryPhoto } from "@/sanity/lib/types"

interface PhotoGalleryProps {
  photos: GalleryPhoto[]
  title: string
}

export function PhotoGallery({ photos, title }: PhotoGalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const isOpen = openIndex !== null
  const current = isOpen ? photos[openIndex] : null

  const showPrev = () => setOpenIndex((i) => (i === null ? i : (i - 1 + photos.length) % photos.length))
  const showNext = () => setOpenIndex((i) => (i === null ? i : (i + 1) % photos.length))

  return (
    <>
      <div className="columns-2 gap-4 sm:columns-3 lg:columns-4">
        {photos.map((photo, index) => {
          const width = photo.dimensions?.width || 800
          const height = photo.dimensions?.height || 600
          return (
            <button
              key={photo._key}
              type="button"
              onClick={() => setOpenIndex(index)}
              className="group mb-4 block w-full overflow-hidden rounded-xl bg-muted break-inside-avoid focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label={`Open photo: ${photo.alt || photo.albumTitle || title}`}
            >
              <Image
                src={urlFor(photo).width(800).auto("format").url()}
                alt={photo.alt || photo.albumTitle || title}
                width={width}
                height={height}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                placeholder={photo.lqip ? "blur" : "empty"}
                blurDataURL={photo.lqip}
                className="h-auto w-full transition-transform duration-500 group-hover:scale-105"
              />
            </button>
          )
        })}
      </div>

      <Dialog open={isOpen} onOpenChange={(open) => !open && setOpenIndex(null)}>
        <DialogContent
          className="max-w-[calc(100%-1rem)] gap-0 border-none bg-black/95 p-0 text-white sm:max-w-5xl"
          aria-describedby={undefined}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") showPrev()
            if (e.key === "ArrowRight") showNext()
          }}
        >
          <DialogTitle className="sr-only">{current?.albumTitle || title}</DialogTitle>
          {current && (
            <figure className="flex flex-col">
              <div className="relative flex items-center justify-center px-2 pt-12 pb-2 sm:px-14">
                <Image
                  key={current._key}
                  src={urlFor(current).width(1800).fit("max").auto("format").url()}
                  alt={current.alt || current.albumTitle || title}
                  width={current.dimensions?.width || 1200}
                  height={current.dimensions?.height || 800}
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  placeholder={current.lqip ? "blur" : "empty"}
                  blurDataURL={current.lqip}
                  className="h-auto max-h-[75vh] w-auto max-w-full rounded-md object-contain"
                />
                {photos.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={showPrev}
                      className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 transition-colors hover:bg-white/25"
                      aria-label="Previous photo"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      type="button"
                      onClick={showNext}
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 transition-colors hover:bg-white/25"
                      aria-label="Next photo"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  </>
                )}
              </div>
              <figcaption className="flex items-center justify-between gap-4 px-4 pb-4 pt-2 text-sm text-white/80">
                <span>
                  {current.caption}
                  {current.caption && current.albumTitle && " · "}
                  {current.albumTitle && <span className="text-white/60">{current.albumTitle}</span>}
                </span>
                <span className="shrink-0 text-white/60">
                  {(openIndex ?? 0) + 1} / {photos.length}
                </span>
              </figcaption>
            </figure>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
