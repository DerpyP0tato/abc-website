export function getGoogleCalendarUrl(event: {
    title: string
    description?: string
    location?: string
    startDateTime: string
    endDateTime?: string
    allDay?: boolean
}) {
    const startDate = new Date(event.startDateTime)
    const endDate = event.endDateTime
        ? new Date(event.endDateTime)
        : new Date(startDate.getTime() + 60 * 60 * 1000)

    // Format YYYYMMDDTHHmmssZ
    const formatDateTime = (date: Date) => date.toISOString().replace(/-|:|\.\d\d\d/g, "")

    // Format YYYYMMDD
    const formatDateOnly = (date: Date) => {
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, "0")
        const day = String(date.getDate()).padStart(2, "0")
        return `${year}${month}${day}`
    }

    let dates = `${formatDateTime(startDate)}/${formatDateTime(endDate)}`

    if (event.allDay) {
        // For all-day events: YYYYMMDD/YYYYMMDD(+1)
        // Note: The end date is exclusive, so +1 day covers the single day.
        const nextDay = new Date(startDate)
        nextDay.setDate(nextDay.getDate() + 1)
        dates = `${formatDateOnly(startDate)}/${formatDateOnly(nextDay)}`
    }

    const params = new URLSearchParams({
        action: "TEMPLATE",
        text: event.title,
        dates: dates,
        details: event.description || "",
        location: event.location || "",
    })

    return `https://calendar.google.com/calendar/render?${params.toString()}`
}
