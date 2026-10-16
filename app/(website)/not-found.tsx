import Link from "next/link"
import { ArrowLeft, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import { NOT_FOUND_PAGE_QUERY } from "@/sanity/lib/queries"
import { NotFoundPhoto, type NotFoundPhotoOption } from "@/components/not-found-photo"

export const metadata = {
  title: "Page Not Found",
}

type NotFoundContent = {
  images?: { _key: string; asset: { _ref: string }; alt?: string; hotspot?: unknown; crop?: unknown }[] | null
  caption?: string
  title?: string
  message?: string
}

const DEFAULT_MESSAGE =
  "We couldn't find the page you were looking for. It may have moved, or the link might be broken, but at least someone's having a good time."

export default async function NotFound() {
  // Editable in Sanity under Site Settings → 404 Page; anything left blank falls back to the defaults
  const content = await client
    .fetch<NotFoundContent | null>(NOT_FOUND_PAGE_QUERY, {}, { next: { revalidate: 60 } })
    .catch(() => null)

  // Photos uploaded in Sanity (one is picked at random per visit), or the built-in default
  const uploaded: NotFoundPhotoOption[] = (content?.images ?? []).map((image) => ({
    src: urlFor(image).width(800).height(1067).fit("crop").auto("format").url(),
    alt: image.alt || "Photo from an ABC event",
    unoptimized: true,
  }))
  const photos = uploaded.length
    ? uploaded
    : [{ src: "/images/not-found.jpg", alt: "Someone at an ABC event laughing", unoptimized: false }]

  return (
    <section className="flex min-h-[calc(100svh-4rem)] items-center py-12 sm:py-16 md:min-h-[calc(100svh-4.5rem)]">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-8 sm:px-6 md:grid-cols-2 lg:gap-20 lg:px-8">
        {/* Polaroid-style photo */}
        <div className="order-first flex justify-center md:order-last">
          <figure className="w-64 -rotate-3 rounded-sm bg-white p-3 pb-4 shadow-xl ring-1 ring-black/5 transition-transform duration-500 hover:rotate-0 sm:w-72 lg:w-80">
            <NotFoundPhoto photos={photos} />
            <figcaption className="pt-3 text-center font-serif text-lg italic text-slate-700">
              {content?.caption || "404: page not found"}
            </figcaption>
          </figure>
        </div>

        <div className="text-center md:text-left">
          <span className="inline-block rounded-full bg-brand-muted px-3 py-1 text-sm font-semibold text-brand-strong">
            Error 404
          </span>
          <h1 className="mt-6 font-serif text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {content?.title || "Well, this is awkward."}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{content?.message || DEFAULT_MESSAGE}</p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row md:justify-start">
            <Button asChild size="lg">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to home
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/events">
                <Calendar className="mr-2 h-4 w-4" />
                See upcoming events
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
