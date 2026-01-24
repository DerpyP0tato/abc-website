import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Calendar, MapPin, ArrowLeft, ExternalLink, CalendarPlus, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { client } from "@/sanity/lib/client"
import { EVENT_BY_SLUG_QUERY } from "@/sanity/lib/queries"
import type { Event } from "@/sanity/lib/types"
import { urlFor } from "@/sanity/lib/image"
import { PortableTextRenderer } from "@/components/portable-text"
import { groq } from "next-sanity"
import { getGoogleCalendarUrl } from "@/lib/calendar"

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
  const event = await getEvent(slug)

  if (!event) {
    notFound()
  }

  const startDate = new Date(event.startDateTime)
  const endDate = event.endDateTime ? new Date(event.endDateTime) : null
  const imageUrl = event.coverImage ? urlFor(event.coverImage).width(800).height(800).url() : null

  // Ensure 'signupUrl' is absolute for External Link
  const formattedSignupUrl = event.signupUrl
    ? (event.signupUrl.startsWith('http') || event.signupUrl.startsWith('mailto:') ? event.signupUrl : `https://${event.signupUrl}`)
    : null;

  return (
    <div className="flex flex-col min-h-screen bg-muted/10">
      {/* Breadcrumb / Top Nav */}
      <div className="border-b bg-background/50 backdrop-blur-sm sticky top-16 z-10 hidden sm:block">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Events
          </Link>
        </div>
      </div>

      <main className="flex-1 py-8 sm:py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-12 lg:items-start">

            {/* LEFT COLUMN: Main Content (7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              {/* Mobile Back Link */}
              <Link
                href="/events"
                className="inline-flex sm:hidden items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Events
              </Link>

              {/* Header Info */}
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <Badge variant="secondary" className="text-sm font-medium px-3 py-1">
                    {event.category}
                  </Badge>
                  {event.featured && <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">Featured</Badge>}
                </div>

                <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
                  {event.title}
                </h1>

                {/* Date & Location Row (Desktop) */}
                <div className="mt-8 flex flex-col sm:flex-row gap-6 text-base text-muted-foreground border-y py-6">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/5 text-primary">
                      <Calendar className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">
                        {startDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
                      </p>
                      <p className="text-sm">
                        {startDate.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
                        {!event.allDay && endDate && ` - ${endDate.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}`}
                        {event.allDay && " (All Day)"}
                      </p>
                    </div>
                  </div>

                  <div className="hidden sm:block w-px bg-border h-auto mx-2" />

                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/5 text-primary">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Location</p>
                      <p className="text-sm">{event.location}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description Content */}
              <div className="prose prose-slate prose-lg max-w-none text-muted-foreground leading-relaxed">
                {event.description ? (
                  <PortableTextRenderer value={event.description} />
                ) : (
                  <p className="italic">No description provided.</p>
                )}
              </div>
            </div>

            {/* RIGHT COLUMN: Sidebar (Sticky) (5 cols) */}
            <div className="mt-12 lg:mt-0 lg:col-span-5 lg:sticky lg:top-24 space-y-8">

              {/* 1. The Image (Hero for this column) */}
              {imageUrl && (
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border shadow-sm bg-muted">
                  <Image
                    src={imageUrl}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    priority
                  />
                </div>
              )}

              {/* 2. Registration / Action Card */}
              <Card className="border-border/60 shadow-md">
                <CardContent className="p-6 sm:p-8 space-y-6">
                  <h3 className="font-serif text-2xl font-semibold">Join this Event</h3>

                  {formattedSignupUrl ? (
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        Ready to learn more about strategy? Reserve your spot now.
                      </p>
                      <Button asChild size="lg" className="w-full text-lg h-12">
                        <a href={formattedSignupUrl} target="_blank" rel="noopener noreferrer">
                          {event.signupButtonText || "Register Now"}
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  ) : (
                    <div className="p-4 rounded-lg bg-muted text-center">
                      <p className="text-muted-foreground">Registration not required or closed.</p>
                    </div>
                  )}

                  {event.enableGoogleCalendar && (
                    <Button variant="outline" size="lg" asChild className="w-full bg-muted/80 border-muted-foreground/40 hover:bg-muted hover:border-muted-foreground/60 hover:text-primary">
                      <a
                        href={getGoogleCalendarUrl({
                          title: event.title,
                          description: event.shortDescription,
                          location: event.location,
                          startDateTime: event.startDateTime,
                          endDateTime: event.endDateTime,
                          allDay: event.allDay
                        })}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <CalendarPlus className="mr-2 h-4 w-4" />
                        Add to Calendar
                      </a>
                    </Button>
                  )}


                </CardContent>
              </Card>

            </div>

          </div>
        </div>
      </main>
    </div>
  )
}
