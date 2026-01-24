import { EventCard } from "@/components/event-card"
import { PastEventsList } from "@/components/past-events-list"
import { client } from "@/sanity/lib/client"
import { EVENTS_UPCOMING_QUERY, EVENTS_PAST_QUERY } from "@/sanity/lib/queries"
import type { Event } from "@/sanity/lib/types"
import { Calendar } from "lucide-react"
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyMedia } from "@/components/ui/empty"

export const metadata = {
  title: "Events | Asian Business Collective",
  description: "Explore upcoming and past events from the Asian Business Collective at Binghamton University.",
}

export const revalidate = 60

async function getEvents() {
  try {
    const [upcomingEvents, pastEvents] = await Promise.all([
      client.fetch<Event[]>(EVENTS_UPCOMING_QUERY),
      client.fetch<Event[]>(EVENTS_PAST_QUERY),
    ])
    return { upcomingEvents, pastEvents }
  } catch (error) {
    console.error("Error fetching events:", error)
    return { upcomingEvents: [], pastEvents: [] }
  }
}

export default async function EventsPage() {
  const { upcomingEvents, pastEvents } = await getEvents()

  return (
    <div className="flex flex-col">
      <section className="pt-8 pb-14 w-full md:pt-12">
        <div className="mx-auto max-w-4xl px-8 text-center sm:px-6 lg:px-8">
          <h1 className="font-serif text-5xl font-bold tracking-tight sm:text-6xl">Events</h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Join us for workshops, networking events, case competitions, and more.
          </p>
        </div>
      </section>

      <section className="py-6 sm:py-10">
        <div className="mx-auto max-w-7xl px-8 sm:px-6 lg:px-8">
          <div className="mb-12 text-center md:text-left">
            <h2 className="font-serif text-2xl font-semibold sm:text-3xl">Upcoming Events</h2>
            <p className="mt-2 text-muted-foreground">Don't miss these exciting opportunities</p>
          </div>

          {upcomingEvents.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {upcomingEvents.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          ) : (
            <div className="mt-8 py-12 px-6 border bg-muted/30 rounded-2xl flex flex-col items-center justify-center text-center">
              <div className="h-12 w-12 rounded-full bg-background flex items-center justify-center mb-4 shadow-sm ring-1 ring-border">
                <Calendar className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="text-xl font-medium text-foreground mb-2">No Upcoming Events</p>
              <p className="text-lg text-muted-foreground">Stay tuned for future events!</p>
            </div>
          )}
        </div>
      </section>

      {pastEvents.length > 0 && (
        <section className="bg-muted/50 py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-8 sm:px-6 lg:px-8">
            <div className="mb-12 text-center md:text-left">
              <h2 className="font-serif text-2xl font-semibold sm:text-3xl">Past Events</h2>
              <p className="mt-2 text-muted-foreground">Take a look at what we've accomplished</p>
            </div>

            <PastEventsList events={pastEvents} />
          </div>
        </section>
      )}
    </div>
  )
}
