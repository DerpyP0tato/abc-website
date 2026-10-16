import { Images } from "lucide-react"
import { GalleryAlbumSection, albumAnchor } from "@/components/gallery-album-section"
import { client } from "@/sanity/lib/client"
import { GALLERY_ALBUMS_QUERY } from "@/sanity/lib/queries"
import type { GalleryAlbum } from "@/sanity/lib/types"

export const metadata = {
  title: "Photo Gallery - Events & Community | Asian Business Collective",
  description: "Photos from Asian Business Collective events, workshops, and community gatherings at Binghamton University.",
}

export const revalidate = 60

async function getAlbums() {
  try {
    const albums = await client.fetch<GalleryAlbum[]>(GALLERY_ALBUMS_QUERY)
    return albums
  } catch (error) {
    console.error("Error fetching gallery albums:", error)
    return []
  }
}

export default async function GalleryPage() {
  const albums = await getAlbums()

  return (
    <div className="flex flex-col">
      <section className="pt-8 pb-14 w-full md:pt-12">
        <div className="mx-auto max-w-4xl px-8 text-center sm:px-6 lg:px-8">
          <h1 className="font-serif text-5xl font-bold tracking-tight sm:text-6xl">Gallery</h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Moments from our events, workshops, and community.
          </p>
        </div>
      </section>

      {albums.length > 1 && (
        <nav aria-label="Albums" className="mx-auto -mt-4 mb-2 w-full max-w-7xl px-8 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:justify-center">
            {albums.map((album) => (
              <a
                key={album._id}
                href={`#${albumAnchor(album)}`}
                className="shrink-0 rounded-full border bg-card px-4 py-1.5 text-sm font-medium text-muted-foreground shadow-sm transition-colors hover:border-primary/50 hover:text-foreground"
              >
                {album.title}
              </a>
            ))}
          </div>
        </nav>
      )}

      {albums.length > 0 ? (
        <div className="divide-y divide-border/60">
          {albums.map((album) => (
            <GalleryAlbumSection key={album._id} album={album} />
          ))}
        </div>
      ) : (
        <section className="py-6 sm:py-10">
          <div className="mx-auto max-w-7xl px-8 sm:px-6 lg:px-8">
            <div className="py-12 px-6 border bg-muted/30 rounded-2xl flex flex-col items-center justify-center text-center">
              <div className="h-12 w-12 rounded-full bg-background flex items-center justify-center mb-4 shadow-sm ring-1 ring-border">
                <Images className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="text-xl font-medium text-foreground mb-2">No Photos Yet</p>
              <p className="text-lg text-muted-foreground">Check back soon for photos from our events!</p>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
