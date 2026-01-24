import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ChevronDown, Calendar, MapPin, Briefcase, Users, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { client } from "@/sanity/lib/client"
import { HOME_PAGE_QUERY, EVENTS_UPCOMING_QUERY } from "@/sanity/lib/queries"
import { urlFor } from "@/sanity/lib/image"
import { EventCard } from "@/components/event-card"
import { CompanyLogos } from "@/components/company-logos"
import { BentoGrid } from "@/components/home-about"
import type { Event } from "@/sanity/lib/types"
import { FeatureCard } from "@/components/feature-card"

export const revalidate = 60

export default async function HomePage() {
  const [homePageData, upcomingEvents] = await Promise.all([
    client.fetch(HOME_PAGE_QUERY),
    client.fetch<Event[]>(EVENTS_UPCOMING_QUERY)
  ])

  // Default offerings fallback
  const defaultOfferings = [
    {
      title: "Networking",
      description: "Connect with industry professionals and alumni from top firms.",
      icon: Users,
    },
    {
      title: "Workshops",
      description: "Develop essential skills through hands-on sessions and case studies.",
      icon: Briefcase,
    },
    {
      title: "Mentorship",
      description: "Get guidance from experienced peers to navigate your career path.",
      icon: CheckCircle2,
    },
  ]

  const hasEvents = upcomingEvents && upcomingEvents.length > 0;

  return (
    <div className="flex flex-col min-h-screen relative overflow-x-hidden">
      {/* Global Background Glow is now handled by layout.tsx */}

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-screen text-center overflow-hidden">
        {/* Background Elements moved to global container */}

        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center space-y-8 text-center">

            {/* Logo Cube */}
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 mb-2">
              <Image
                src="/images/abc-logo.png"
                alt="ABC Logo"
                width={160}
                height={160}
                className="w-full h-full object-contain"
                priority
              />
            </div>

            <div className="space-y-4 max-w-3xl">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-foreground font-serif">
                {homePageData?.heroTitle || "Asian Business Collective"}
              </h1>
              <p className="mx-auto text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                Connecting students to careers in business and technology through mentorship, events, and case competitions.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button asChild size="lg" className="h-12 px-8 text-base">
                <Link href="/contact">
                  Join ABC
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base">
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

      {/* About Section */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
            {/* Main About Content - Spans 2 cols on lg */}
            <div className="flex flex-col justify-center rounded-3xl bg-card border p-8 shadow-md lg:col-span-2 lg:p-12">
              <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                About ABC
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                The Asian Business Collective at Binghamton University is dedicated to empowering students with the
                skills, connections, and opportunities needed to succeed in business and technology careers.
              </p>
              <div className="mt-8">
                <Button asChild variant="link" className="px-0 text-lg">
                  <Link href="/about">Learn More &rarr;</Link>
                </Button>
              </div>
            </div>

            {/* Visual Stats / Values Grid - 1 col on lg (stacked) */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-3xl bg-blue-50/50 border border-blue-100 p-8 shadow-sm dark:bg-blue-500/10 dark:border-blue-500/20 transition-colors hover:shadow-md">
                <Briefcase className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                <h3 className="mt-4 font-serif text-xl font-semibold">Growth</h3>
                <p className="mt-2 text-muted-foreground">Professional workshops & skill-building.</p>
              </div>
              <div className="rounded-3xl bg-indigo-50/50 border border-indigo-100 p-8 shadow-sm dark:bg-indigo-500/10 dark:border-indigo-500/20 transition-colors hover:shadow-md">
                <Users className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                <h3 className="mt-4 font-serif text-xl font-semibold">Community</h3>
                <p className="mt-2 text-muted-foreground">A network of ambitious peers & alumni.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features / Offerings Section */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-serif text-3xl font-semibold sm:text-4xl">
              {homePageData?.featureTitle || "What We Do"}
            </h2>
            <p className="mt-4 text-muted-foreground">
              {homePageData?.featureSubtitle || "Empowering the next generation of business leaders"}
            </p>
          </div>


          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {homePageData?.features?.length > 0
              ? homePageData.features.map((feature: any) => (
                <FeatureCard
                  key={feature.title}
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                  isSanityIcon={true}
                />
              ))
              : defaultOfferings.map((offering) => {
                const Icon = offering.icon
                return (
                  <FeatureCard
                    key={offering.title}
                    title={offering.title}
                    description={offering.description}
                    icon={<Icon className="h-7 w-7 text-blue-600 dark:text-blue-400" />}
                    isSanityIcon={false}
                  />
                )
              })}
          </div>
        </div>
      </section>

      <div className="relative overflow-hidden">
        {/* Shared Background Blobs */}
        <div
          className="absolute right-0 top-1/4 h-[600px] w-[600px] rounded-full bg-blue-500/5 blur-[140px]"
          aria-hidden="true"
        />
        <div
          className="absolute left-0 bottom-0 h-[500px] w-[500px] rounded-full bg-indigo-500/5 blur-[130px]"
          aria-hidden="true"
        />

        {/* Upcoming Events Section - Conditional Layout */}
        <section className="py-12 sm:py-16">
          <div className="relative z-10 mx-auto max-w-7xl px-8 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-8">
              {/* Left Column: Heading & CTA */}
              <div className="text-center lg:text-left">
                <h2 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                  Upcoming Events
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-muted-foreground max-w-md mx-auto lg:mx-0">
                  Discover your next opportunity to connect, learn, and grow with us.
                </p>
                <div className="mt-8 flex justify-center lg:justify-start">
                  <Button asChild size="lg" className="font-medium">
                    <Link href="/events">
                      View All Events
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Right Column: Events List or Text Empty State */}
              <div className="flex flex-col items-center justify-center lg:items-center">
                {hasEvents ? (
                  <div className={`w-full grid gap-6 ${upcomingEvents.length === 1 ? 'place-items-center' : 'sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2'}`}>
                    {upcomingEvents.slice(0, 2).map((event) => (
                      <div key={event._id} className={upcomingEvents.length === 1 ? "w-full max-w-md" : "w-full"}>
                        <EventCard event={event} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center text-muted-foreground">
                    <p className="text-lg">No upcoming events. Check back soon!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Event (Optional) */}
        {/* {featuredEvent && ...} */}

        {/* Ready to Get Started */}
        <section className="pt-12 pb-24 sm:pt-16 sm:pb-24">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="font-serif text-3xl font-semibold sm:text-4xl">Ready to Get Started?</h2>
            <p className="mt-4 text-muted-foreground">
              Join the Asian Business Collective today and start your journey.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/contact">Join ABC</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/team">Meet the Team</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Member Offers / Placements */}
        <CompanyLogos
          title={homePageData?.placementTitle || "Member Offers"}
          description={homePageData?.placementDescription || "Our students have earned internships and full time opportunities with top companies in industries ranging from consulting, finance, accounting, law, and much more."}
          companies={homePageData?.companies || []}
        />
      </div>
    </div>
  )
}
