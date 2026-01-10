import Link from "next/link"
import { Calendar, MapPin } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Event } from "@/sanity/lib/types"
import { urlFor } from "@/sanity/lib/image"
import Image from "next/image"

interface EventCardProps {
  event: Event
}

export function EventCard({ event }: EventCardProps) {
  const startDate = new Date(event.startDateTime)
  const imageUrl = event.coverImage ? urlFor(event.coverImage).width(600).height(400).url() : null

  return (
    <Link href={`/events/${event.slug.current}`}>
      <Card className="group overflow-hidden transition-all hover:shadow-lg h-full flex flex-col">
        {imageUrl && (
          <div className="p-4 pb-0">
            <div className="relative aspect-video overflow-hidden rounded-xl">
              <Image
                src={imageUrl || "/placeholder.svg"}
                alt={event.title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
            </div>
          </div>
        )}
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-serif text-xl font-semibold leading-tight group-hover:text-primary">{event.title}</h3>
            <Badge variant="secondary" className="shrink-0">
              {event.category}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>
              {startDate.toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
              {" at "}
              {startDate.toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
              })}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{event.location}</span>
          </div>
          {event.shortDescription && (
            <p className="line-clamp-3 text-sm text-muted-foreground pt-2">
              {event.shortDescription}
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}
