import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Calendar, MapPin, ArrowLeft, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { client } from "@/sanity/lib/client"
import { EVENT_BY_SLUG_QUERY, EVENTS_UPCOMING_QUERY } from "@/sanity/lib/queries"
import type { Event } from "@/sanity/lib/types"
import { urlFor } from "@/sanity/lib/image"
import { PortableTextRenderer } from "@/components/portable-text"
import { groq } from "next-sanity"

export const revalidate = 60

export async function generateStaticParams() {
  const events = await client.fetch<Event[]>(groq`*[_type == "event" && defined(slug.current)]{ "slug": slug.current }`)
  return events.map((event) => ({
    slug: event.slug,
  }))
}

async function getEvent(slug: string) {
  try {
    const event = await client.fetch<Event>(EVENT_BY_SLUG_QUERY, { slug })
    return event
  } catch (error) {
    console.error("Error fetching event:", error)
    return null
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const event = await getEvent(slug)
  if (!event) {
    return {
      title: "Event Not Found",
    }
  }
  return {
    title: `${event.title} | Asian Business Collective`,
    description: `Join us for ${event.title} at ${event.location}`,
  }
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  console.log("Rendering EventPage for slug:", slug)
  const event = await getEvent(slug)
  console.log("Event found:", event ? "Yes" : "No")

  if (!event) {
    notFound()
  }

  const startDate = new Date(event.startDateTime)
  const endDate = event.endDateTime ? new Date(event.endDateTime) : null
  const imageUrl = event.coverImage ? urlFor(event.coverImage).width(1200).height(600).url() : null

  return (
    <div className="flex flex-col">
      <section className="bg-muted/50 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Events
          </Link>

          <div className="mt-8">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="secondary">{event.category}</Badge>
            </div>
            <h1 className="mt-4 font-serif text-4xl font-bold tracking-tight sm:text-5xl text-balance">
              {event.title}
            </h1>

            <div className="mt-6 space-y-3">
              <div className="flex items-start gap-3 text-muted-foreground">
                <Calendar className="mt-0.5 h-5 w-5 shrink-0" />
                <div>
                  <div>
                    {startDate.toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                  <div>
                    {startDate.toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                    {endDate &&
                      ` - ${endDate.toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                      })}`}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="h-5 w-5 shrink-0" />
                <span>{event.location}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {imageUrl && (
        <section className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="relative aspect-video overflow-hidden rounded-lg">
            <Image src={imageUrl || "/placeholder.svg"} alt={event.title} fill className="object-cover" priority />
          </div>
        </section>
      )}

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-slate max-w-none">
            {event.description && <PortableTextRenderer value={event.description} />}
          </div>

          {event.signupUrl && (
            <div className="mt-12 rounded-lg border bg-muted/50 p-8 text-center">
              <h2 className="font-serif text-2xl font-semibold">Ready to Join?</h2>
              <p className="mt-2 text-muted-foreground">Register now to secure your spot at this event.</p>
              <Button asChild size="lg" className="mt-6">
                <a href={event.signupUrl} target="_blank" rel="noopener noreferrer">
                  {event.signupButtonText || "Sign Up"}
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          )}

          <div className="mt-12">
            <Link
              href="/events"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to all events
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
