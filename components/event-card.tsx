"use client"

import Link from "next/link"
import { Calendar, MapPin, CalendarPlus, ArrowUpRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Event } from "@/sanity/lib/types"
import { urlFor } from "@/sanity/lib/image"
import Image from "next/image"
import { getGoogleCalendarUrl } from "@/lib/calendar"

interface EventCardProps {
  event: Event
}

export function EventCard({ event }: EventCardProps) {
  const startDate = new Date(event.startDateTime)
  const imageUrl = event.coverImage ? urlFor(event.coverImage).width(600).height(400).url() : null

  return (
    <Link href={`/events/${event.slug.current}`} className="h-full block">
      <Card className="group relative h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary/50 active:scale-[0.98]">
        {imageUrl && (
          <div className="p-4 pb-0">
            <div className="relative aspect-video overflow-hidden rounded-xl bg-muted">
              <Image
                src={imageUrl || "/placeholder.svg"}
                alt={event.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>
        )}
        <CardHeader>
          <div className="flex items-start justify-between gap-2 pr-6">
            <div className="space-y-1">
              <h3 className="font-serif text-xl font-semibold leading-tight group-hover:text-primary transition-colors">
                {event.title}
              </h3>
            </div>
            <Badge variant="default" className="shrink-0">
              {event.category}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 flex-1">
          <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
            <Calendar className="h-4 w-4 shrink-0 text-primary/70" />
            <span>
              {startDate.toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
              {!event.allDay && (
                <>
                  {" at "}
                  {startDate.toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </>
              )}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
            <MapPin className="h-4 w-4 shrink-0 text-primary/70" />
            <span>{event.location}</span>
          </div>
          {event.shortDescription && (
            <p className="line-clamp-3 text-sm text-muted-foreground pt-2 group-hover:text-foreground/80 transition-colors">
              {event.shortDescription}
            </p>
          )}
        </CardContent>

        {/* Hover Arrow Icon - Visible on mobile/touch, faded in on desktop hover */}
        <div className="absolute top-4 right-4 p-1.5 bg-background/80 backdrop-blur-sm rounded-full shadow-sm text-primary transition-all duration-300 opacity-100 lg:opacity-0 lg:group-hover:opacity-100">
          <ArrowUpRight className="h-4 w-4" />
        </div>

        {event.enableGoogleCalendar && (
          <CardFooter className="pt-2 pb-4 mt-auto">
            <Button
              variant="outline"
              size="sm"
              className="w-full h-8 text-xs gap-1.5 bg-muted/80 border-muted-foreground/30 hover:bg-muted hover:border-muted-foreground/50 hover:text-primary transition-colors"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation() // Prevent triggering the card click
                window.open(getGoogleCalendarUrl({
                  title: event.title,
                  location: event.location,
                  startDateTime: event.startDateTime,
                  endDateTime: event.endDateTime,
                  description: event.shortDescription,
                  allDay: event.allDay
                }), '_blank')
              }}
            >
              <CalendarPlus className="h-3.5 w-3.5" />
              Add to Calendar
            </Button>
          </CardFooter>
        )}
      </Card>
    </Link>
  )
}
