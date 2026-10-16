import Link from "next/link"
import { ArrowUpRight, Calendar, Images } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PhotoGallery } from "@/components/photo-gallery"
import type { GalleryAlbum } from "@/sanity/lib/types"

export function albumAnchor(album: GalleryAlbum) {
  return `album-${album._id}`
}

export function formatAlbumDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function GalleryAlbumSection({ album }: { album: GalleryAlbum }) {
  const count = album.photos.length

  return (
    <section
      id={albumAnchor(album)}
      // Let the browser skip rendering albums that are off-screen
      className="scroll-mt-20 py-10 [contain-intrinsic-size:auto_900px] [content-visibility:auto] sm:py-14 md:scroll-mt-24"
    >
      <div className="mx-auto max-w-7xl px-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-serif text-2xl font-semibold sm:text-3xl">{album.title}</h2>
            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
              {album.date && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-primary/70" />
                  {formatAlbumDate(album.date)}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Images className="h-4 w-4 text-primary/70" />
                {count} photo{count !== 1 ? "s" : ""}
              </span>
            </div>
            {album.description && (
              <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">{album.description}</p>
            )}
          </div>
          {album.event?.slug?.current && (
            <Button asChild variant="outline" size="sm" className="shrink-0 self-start sm:self-auto">
              <Link href={`/events/${album.event.slug.current}`}>
                View event
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>
        <PhotoGallery photos={album.photos} title={album.title} />
      </div>
    </section>
  )
}
