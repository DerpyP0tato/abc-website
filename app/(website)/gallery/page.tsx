import Link from "next/link"
import { Images } from "lucide-react"
import { PhotoGallery } from "@/components/photo-gallery"
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

      {albums.length > 0 ? (
        albums.map((album) => (
          <section key={album._id} className="py-6 sm:py-10">
            <div className="mx-auto max-w-7xl px-8 sm:px-6 lg:px-8">
              <div className="mb-8 text-center md:text-left">
                <h2 className="font-serif text-2xl font-semibold sm:text-3xl">{album.title}</h2>
                <p className="mt-2 text-muted-foreground">
                  {new Date(`${album.date}T00:00:00`).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                  {album.event?.slug?.current && (
                    <>
                      {" · "}
                      <Link href={`/events/${album.event.slug.current}`} className="text-primary hover:underline">
                        View event
                      </Link>
                    </>
                  )}
                </p>
                {album.description && <p className="mt-2 text-muted-foreground">{album.description}</p>}
              </div>
              <PhotoGallery photos={album.photos} title={album.title} />
            </div>
          </section>
        ))
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
