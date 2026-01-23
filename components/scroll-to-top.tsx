"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export function ScrollToTop() {
    const pathname = usePathname()

    useEffect(() => {
        // Force scroll to top on initial mount
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        // Scroll to top on route changes
        window.scrollTo(0, 0)
    }, [pathname])

    return null
}
