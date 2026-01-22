import { EventCard } from "@/components/event-card"
import { PastEventsList } from "@/components/past-events-list"
import { client } from "@/sanity/lib/client"
import { EVENTS_UPCOMING_QUERY, EVENTS_PAST_QUERY } from "@/sanity/lib/queries"
import type { Event } from "@/sanity/lib/types"

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
      <section className="bg-gradient-to-b from-muted/50 to-background py-10 sm:py-14 w-full">
        <div className="mx-auto max-w-4xl px-8 text-center sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl">Events</h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Join us for workshops, networking events, case competitions, and more.
          </p>
        </div>
      </section>

      {upcomingEvents.length > 0 && (
        <section className="py-6 sm:py-10">
          <div className="mx-auto max-w-7xl px-8 sm:px-6 lg:px-8">
            <div className="mb-12 text-center md:text-left">
              <h2 className="font-serif text-3xl font-semibold">Upcoming Events</h2>
              <p className="mt-2 text-muted-foreground">Don't miss these exciting opportunities</p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {upcomingEvents.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          </div>
        </section>
      )}

      {pastEvents.length > 0 && (
        <section className="bg-muted/50 py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-8 sm:px-6 lg:px-8">
            <div className="mb-12 text-center md:text-left">
              <h2 className="font-serif text-3xl font-semibold">Past Events</h2>
              <p className="mt-2 text-muted-foreground">Take a look at what we've accomplished</p>
            </div>

            <PastEventsList events={pastEvents} />
          </div>
        </section>
      )}
    </div>
  )
}
