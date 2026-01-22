"use client"

import { useState } from "react"
import { EventCard } from "@/components/event-card"
import { Button } from "@/components/ui/button"
import type { Event } from "@/sanity/lib/types"

interface PastEventsListProps {
    events: Event[]
}

export function PastEventsList({ events }: PastEventsListProps) {
    const [showAll, setShowAll] = useState(false)

    const INITIAL_COUNT = 3
    const visibleEvents = showAll ? events : events.slice(0, INITIAL_COUNT)
    const hasMore = events.length > INITIAL_COUNT

    return (
        <>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {visibleEvents.map((event) => (
                    <EventCard key={event._id} event={event} />
                ))}
            </div>

            {hasMore && (
                <div className="mt-12 flex justify-center">
                    <Button
                        variant="outline"
                        size="lg"
                        onClick={() => setShowAll(!showAll)}
                        className="min-w-[200px]"
                    >
                        {showAll ? "Show Less" : "Show More Past Events"}
                    </Button>
                </div>
            )}
        </>
    )
}
