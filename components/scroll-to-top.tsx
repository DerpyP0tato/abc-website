"use client"

import { useEffect, useLayoutEffect } from "react"
import { usePathname } from "next/navigation"

// Use useLayoutEffect on client, useEffect on server (for SSR safety)
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect

export function ScrollToTop() {
    const pathname = usePathname()

    // Disable browser's automatic scroll restoration
    useEffect(() => {
        if ("scrollRestoration" in history) {
            history.scrollRestoration = "manual"
        }

        return () => {
            if ("scrollRestoration" in history) {
                history.scrollRestoration = "auto"
            }
        }
    }, [])

    // Force scroll to top on initial mount - runs before paint
    useIsomorphicLayoutEffect(() => {
        window.scrollTo(0, 0)

        // Also try after a micro-task (helps with mobile)
        requestAnimationFrame(() => {
            window.scrollTo(0, 0)
        })

        // Fallback with small delay for stubborn mobile browsers
        const timeoutId = setTimeout(() => {
            window.scrollTo(0, 0)
        }, 50)

        return () => clearTimeout(timeoutId)
    }, [])

    // Scroll to top on route changes
    useIsomorphicLayoutEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])

    return null
}
