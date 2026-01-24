"use client"

import { usePathname } from "next/navigation"
import { SplashScreen } from "@/components/splash-screen"

export function PageWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const isHomePage = pathname === "/"

    return (
        <>
            {isHomePage && <SplashScreen />}
            <div className={isHomePage ? "" : "pt-16 md:pt-24"}>
                {children}
            </div>
        </>
    )
}
