import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { EventCard } from "@/components/event-card"
import { client } from "@/sanity/lib/client"
import { EVENT_FEATURED_QUERY, SETTINGS_QUERY } from "@/sanity/lib/queries"
import type { Event } from "@/sanity/lib/types"
import { Briefcase, Users, Network, Trophy, ArrowRight, ChevronDown } from "lucide-react"

export const revalidate = 60

async function getData() {
  try {
    const [event, settings] = await Promise.all([
      client.fetch<Event>(EVENT_FEATURED_QUERY),
      client.fetch<{ joinLink?: string }>(SETTINGS_QUERY),
    ])
    return { event, settings }
  } catch (error) {
    console.error("Error fetching data:", error)
    return { event: null, settings: null }
  }
}

export default async function HomePage() {
  const { event: featuredEvent, settings } = await getData()

  const offerings = [
    {
      icon: Briefcase,
      title: "Professional Development",
      description: "Build skills through workshops, case competitions, and corporate speaker events.",
    },
    {
      icon: Users,
      title: "Mentorship",
      description: "Connect with experienced professionals and alumni who guide your career path.",
    },
    {
      icon: Network,
      title: "Networking",
      description: "Build meaningful relationships with peers and industry leaders.",
    },
    {
      icon: Trophy,
      title: "Case Competitions",
      description: "Compete in real-world business challenges and showcase your analytical skills.",
    },
  ]

  return (
    <div className="flex flex-col overflow-x-hidden">
      <section className="relative flex min-h-[calc(100vh-4rem)] flex-col justify-center py-16 sm:py-24 lg:py-32">
        {/* Organic Background Blobs */}
        <div
          className="absolute -top-24 -left-20 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[100px]"
          aria-hidden="true"
        />
        <div
          className="absolute top-20 -right-20 h-[500px] w-[500px] rounded-full bg-indigo-500/10 blur-[100px]"
          aria-hidden="true"
        />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-8 flex justify-center">
              <Image
                src="/images/abc-logo.png"
                alt="ABC Logo"
                width={160}
                height={160}
                className="h-40 w-40"
                priority
              />
            </div>
            <h1 className="font-serif text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Asian Business Collective
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground text-pretty">
              Connecting students to careers in business and technology through mentorship, events, and case
              competitions.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg">
                <a href={settings?.joinLink || "https://forms.gle/"} target="_blank" rel="noopener noreferrer">
                  Join ABC
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/events">View Events</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-8 w-8 text-muted-foreground" />
        </div>
      </section>

      <section className="py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-serif text-3xl font-semibold sm:text-4xl">What We Do</h2>
            <p className="mt-4 text-muted-foreground">Empowering the next generation of business leaders</p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {offerings.map((offering) => {
              const Icon = offering.icon
              return (
                <Card key={offering.title} className="text-center">
                  <CardHeader>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="mt-4 font-serif text-xl">{offering.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">{offering.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {featuredEvent && (
        <section className="bg-muted/50 py-12 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="font-serif text-3xl font-semibold sm:text-4xl">Featured Event</h2>
              <p className="mt-4 text-muted-foreground">Don't miss our upcoming event</p>
            </div>
            <div className="mx-auto mt-12 max-w-2xl">
              <EventCard event={featuredEvent} />
            </div>
          </div>
        </section>
      )}

      <section className="py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-semibold sm:text-4xl">Ready to Get Started?</h2>
          <p className="mt-4 text-muted-foreground">
            Join a community of ambitious students building their future in business.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg">
              <a href={settings?.joinLink || "https://forms.gle/"} target="_blank" rel="noopener noreferrer">
                Join ABC
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
