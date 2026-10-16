"use client"

import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { urlFor } from "@/sanity/lib/image"
import type { GalleryPhoto } from "@/sanity/lib/types"

// One fixed size for the viewer so the same URL can be preloaded ahead of time
const fullUrl = (photo: GalleryPhoto) => urlFor(photo).width(1600).fit("max").quality(80).format("webp").url()
const previewUrl = (photo: GalleryPhoto) => urlFor(photo).width(48).fit("max").quality(40).format("webp").url()

const preloaded = new Set<string>()
// Starts downloading a photo's viewer image (e.g. on hover, or for the next/previous photo)
export function preloadPhoto(photo: GalleryPhoto | undefined) {
  if (!photo?.asset || typeof window === "undefined") return
  const url = fullUrl(photo)
  if (preloaded.has(url)) return
  preloaded.add(url)
  const img = new window.Image()
  img.decoding = "async"
  img.src = url
}

interface PhotoLightboxProps {
  photos: GalleryPhoto[]
  title: string
  index: number | null
  onIndexChange: (index: number | null) => void
}

export function PhotoLightbox({ photos, title, index, onIndexChange }: PhotoLightboxProps) {
  const current = index !== null ? photos[index] : null
  const [loadedKey, setLoadedKey] = useState<string | null>(null)
  const loaded = current !== null && loadedKey === current._key

  // Warm up the neighbors so stepping through photos is instant
  useEffect(() => {
    if (index === null || photos.length < 2) return
    preloadPhoto(photos[(index + 1) % photos.length])
    preloadPhoto(photos[(index - 1 + photos.length) % photos.length])
  }, [index, photos])

  const width = current?.dimensions?.width || 3
  const height = current?.dimensions?.height || 2

  const showPrev = () => index !== null && onIndexChange((index - 1 + photos.length) % photos.length)
  const showNext = () => index !== null && onIndexChange((index + 1) % photos.length)

  return (
    <Dialog open={index !== null} onOpenChange={(open) => !open && onIndexChange(null)}>
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
              {/* Box is sized from the photo's proportions so it never collapses while loading */}
              <div
                className="relative mx-auto overflow-hidden rounded-md"
                style={{
                  aspectRatio: `${width} / ${height}`,
                  width: `min(100%, calc(75vh * ${width / height}))`,
                  backgroundColor: current.color,
                }}
              >
                {/* Tiny blurred preview shows instantly while the full photo loads */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  key={`preview-${current._key}`}
                  src={previewUrl(current)}
                  alt=""
                  aria-hidden
                  className="absolute inset-0 h-full w-full scale-110 object-cover blur-xl"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  key={current._key}
                  ref={(img) => {
                    if (img?.complete && img.naturalWidth > 0) setLoadedKey(current._key)
                  }}
                  src={fullUrl(current)}
                  alt={current.alt || current.albumTitle || title}
                  fetchPriority="high"
                  decoding="async"
                  onLoad={() => setLoadedKey(current._key)}
                  className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
                />
                {!loaded && (
                  <Loader2 className="absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 animate-spin text-white/70" aria-label="Loading photo" />
                )}
              </div>
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
                {(index ?? 0) + 1} / {photos.length}
              </span>
            </figcaption>
          </figure>
        )}
      </DialogContent>
    </Dialog>
  )
}
