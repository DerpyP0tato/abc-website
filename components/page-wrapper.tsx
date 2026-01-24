"use client"

import { usePathname } from "next/navigation"

export function PageWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const isHomePage = pathname === "/"

    return (
        <div className={isHomePage ? "" : "pt-16 md:pt-24"}>
            {children}
        </div>
    )
}
