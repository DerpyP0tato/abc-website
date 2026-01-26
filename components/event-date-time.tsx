"use client"

import { Calendar } from "lucide-react"

interface EventDateTimeProps {
    startDateTime: string
    endDateTime?: string | null
    allDay?: boolean
}

export function EventDateTime({ startDateTime, endDateTime, allDay }: EventDateTimeProps) {
    const startDate = new Date(startDateTime)
    const endDate = endDateTime ? new Date(endDateTime) : null

    return (
        <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-primary/5 text-primary">
                <Calendar className="h-6 w-6" />
            </div>
            <div>
                <p className="font-semibold text-foreground">
                    {startDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
                </p>
                <p className="text-sm">
                    {allDay ? "All Day" : (
                        <>
                            {startDate.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
                            {endDate && ` - ${endDate.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}`}
                        </>
                    )}
                </p>
            </div>
        </div>
    )
}
