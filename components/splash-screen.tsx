"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function SplashScreen() {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Ensure we're at the top
        window.scrollTo(0, 0)

        // Disable scrolling during splash
        document.body.style.overflow = "hidden"

        // Show splash for animation duration, then reveal
        const timer = setTimeout(() => {
            setIsLoading(false)
            document.body.style.overflow = ""
            window.scrollTo(0, 0)
        }, 2000)

        return () => {
            clearTimeout(timer)
            document.body.style.overflow = ""
        }
    }, [])

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                    <div className="flex flex-col items-center gap-6">
                        {/* Animated Logo */}
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{
                                duration: 0.6,
                                ease: [0.16, 1, 0.3, 1]
                            }}
                        >
                            <motion.img
                                src="/images/abc-logo.png"
                                alt="ABC Logo"
                                className="w-24 h-24 sm:w-32 sm:h-32"
                                animate={{
                                    rotateY: [0, 360],
                                }}
                                transition={{
                                    duration: 1.2,
                                    ease: "easeInOut",
                                    delay: 0.4
                                }}
                            />
                        </motion.div>

                        {/* Loading Bar */}
                        <div className="w-48 h-1 bg-muted rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-primary rounded-full"
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 1.5, ease: "easeInOut" }}
                            />
                        </div>

                        {/* Animated Text */}
                        <motion.p
                            className="text-muted-foreground text-sm tracking-wider"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            ASIAN BUSINESS COLLECTIVE
                        </motion.p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
