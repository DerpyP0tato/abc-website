"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function Preloader({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Check session storage
        const hasShown = sessionStorage.getItem("preloaderShown")
        if (hasShown) {
            setIsLoading(false)
            return
        }

        // Lock body scroll
        document.body.style.overflow = "hidden"

        // Set a fixed time for the loader (2.5 seconds)
        const timer = setTimeout(() => {
            setIsLoading(false)
            document.body.style.overflow = ""
            sessionStorage.setItem("preloaderShown", "true")
        }, 2500)

        return () => {
            clearTimeout(timer)
            document.body.style.overflow = ""
        }
    }, [])

    return (
        <>
            <AnimatePresence mode="wait">
                {isLoading && (
                    <motion.div
                        key="preloader"
                        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 0.5 } }}
                    >
                        <div className="flex flex-col items-center gap-8">
                            {/* Spinning Logo */}
                            {/* Spinning Logo */}
                            <div className="perspective-[1000px]">
                                <motion.div
                                    className="w-24 h-24 md:w-32 md:h-32 relative"
                                    animate={{ rotateY: 360 }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                >
                                    <img
                                        src="/images/abc-logo.png"
                                        alt="ABC Logo"
                                        className="w-full h-full object-contain"
                                    />
                                </motion.div>
                            </div>

                            {/* Loading Bar */}
                            <div className="w-48 h-1 bg-muted rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-primary"
                                    initial={{ width: "0%" }}
                                    animate={{
                                        width: "100%",
                                        transition: { duration: 2.5, ease: "easeInOut" }
                                    }}
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {children}
        </>
    )
}
