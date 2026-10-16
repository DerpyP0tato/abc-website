"use client"

import Image from "next/image"
import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PhotoLightbox, preloadPhoto } from "@/components/photo-lightbox"
import { sanityImageLoader } from "@/sanity/lib/image"
import { cn } from "@/lib/utils"
import type { GalleryPhoto } from "@/sanity/lib/types"

interface PhotoGalleryProps {
  photos: GalleryPhoto[]
  title: string
}

interface TileProps {
  photo: GalleryPhoto
  title: string
  onOpen: () => void
  className?: string
  sizes: string
  // "cover" fills a fixed-shape cell (cropped around the Sanity hotspot); "natural" keeps the photo's own shape
  fit: "cover" | "natural"
}

function PhotoTile({ photo, title, onOpen, className, sizes, fit }: TileProps) {
  const alt = photo.alt || photo.albumTitle || title
  const objectPosition = photo.hotspot ? `${photo.hotspot.x * 100}% ${photo.hotspot.y * 100}%` : "center"

  return (
    <button
      type="button"
      onClick={onOpen}
      onPointerEnter={() => preloadPhoto(photo)}
      onFocus={() => preloadPhoto(photo)}
      className={cn(
        "group relative block overflow-hidden rounded-2xl bg-muted shadow-sm ring-1 ring-border/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        className,
      )}
      aria-label={`Open photo: ${alt}`}
    >
      {fit === "cover" ? (
        <Image
          loader={sanityImageLoader(photo)}
          src={photo.asset._ref}
          alt={alt}
          fill
          sizes={sizes}
          style={{ objectPosition, backgroundColor: photo.color }}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <Image
          loader={sanityImageLoader(photo)}
          src={photo.asset._ref}
          alt={alt}
          width={photo.dimensions?.width || 1200}
          height={photo.dimensions?.height || 800}
          sizes={sizes}
          style={{ backgroundColor: photo.color }}
          className="h-auto w-full transition-transform duration-500 group-hover:scale-105"
        />
      )}
      {photo.caption && (
        <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 pb-3 pt-10 text-left text-sm text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
          {photo.caption}
        </span>
      )}
    </button>
  )
}

// Big albums show this many photos until "Show all" is pressed, keeping the page light
const INITIAL_VISIBLE = 12

export function PhotoGallery({ photos, title }: PhotoGalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [showAll, setShowAll] = useState(false)
  const count = photos.length
  const visibleCount = showAll ? count : Math.min(count, INITIAL_VISIBLE)

  const tile = (index: number, props: Omit<TileProps, "photo" | "title" | "onOpen">) => (
    <PhotoTile key={photos[index]._key} photo={photos[index]} title={title} onOpen={() => setOpenIndex(index)} {...props} />
  )

  let layout: React.ReactNode
  if (count === 1) {
    // One photo: show it large and centered at its natural shape
    layout = (
      <div className="mx-auto max-w-4xl">
        {tile(0, { fit: "natural", sizes: "(max-width: 896px) 100vw, 896px" })}
      </div>
    )
  } else if (count === 2) {
    layout = (
      <div className="grid gap-4 sm:grid-cols-2">
        {[0, 1].map((i) => tile(i, { fit: "cover", className: "aspect-[4/3]", sizes: "(max-width: 640px) 100vw, 50vw" }))}
      </div>
    )
  } else if (count === 3) {
    // One feature photo with two stacked beside it
    layout = (
      <div className="grid grid-cols-2 gap-4 sm:h-[30rem] sm:grid-cols-3 sm:grid-rows-2 lg:h-[36rem]">
        {tile(0, { fit: "cover", className: "col-span-2 aspect-[4/3] sm:row-span-2 sm:aspect-auto", sizes: "(max-width: 640px) 100vw, 66vw" })}
        {[1, 2].map((i) => tile(i, { fit: "cover", className: "aspect-square sm:aspect-auto", sizes: "(max-width: 640px) 50vw, 33vw" }))}
      </div>
    )
  } else if (count === 4) {
    // Bento: the first photo is featured; of the rest, the most landscape one takes the wide
    // slot and the others (e.g. portraits) take the squarer ones so they aren't cropped hard
    const aspect = (i: number) => (photos[i].dimensions ? photos[i].dimensions.width / photos[i].dimensions.height : 1.5)
    const [wide, ...small] = [1, 2, 3].sort((a, b) => aspect(b) - aspect(a))
    layout = (
      <div className="grid grid-cols-2 gap-4 sm:h-[30rem] sm:grid-cols-4 sm:grid-rows-2 lg:h-[36rem]">
        {tile(0, { fit: "cover", className: "col-span-2 aspect-[4/3] sm:row-span-2 sm:aspect-auto", sizes: "(max-width: 640px) 100vw, 50vw" })}
        {tile(wide, { fit: "cover", className: "col-span-2 aspect-[2/1] sm:aspect-auto", sizes: "(max-width: 640px) 100vw, 50vw" })}
        {small.map((i) => tile(i, { fit: "cover", className: "aspect-square sm:aspect-auto", sizes: "(max-width: 640px) 50vw, 25vw" }))}
      </div>
    )
  } else {
    // Masonry; smaller albums get fewer columns so they don't look sparse
    layout = (
      <div className={cn("columns-2 gap-4 md:columns-3", count > 6 && "lg:columns-4")}>
        {photos.slice(0, visibleCount).map((_, i) =>
          tile(i, {
            fit: "natural",
            className: "mb-4 w-full break-inside-avoid",
            sizes: count > 6 ? "(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw" : "(max-width: 768px) 50vw, 33vw",
          }),
        )}
      </div>
    )
  }

  return (
    <>
      {layout}
      {visibleCount < count && (
        <div className="mt-6 flex justify-center">
          <Button variant="outline" onClick={() => setShowAll(true)}>
            Show all {count} photos
            <ChevronDown className="ml-1 h-4 w-4" />
          </Button>
        </div>
      )}
      <PhotoLightbox photos={photos} title={title} index={openIndex} onIndexChange={setOpenIndex} />
    </>
  )
}
