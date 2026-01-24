"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

interface LoadingScreenProps {
    onLoadingComplete?: () => void
}

export function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
    const [isLoading, setIsLoading] = useState(true)
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        // Simulate loading progress
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval)
                    return 100
                }
                // Accelerate towards the end
                const increment = prev < 70 ? 3 : prev < 90 ? 2 : 1
                return Math.min(prev + increment, 100)
            })
        }, 30)

        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        if (progress === 100) {
            // Add a small delay before hiding
            const timeout = setTimeout(() => {
                setIsLoading(false)
                onLoadingComplete?.()
            }, 400)
            return () => clearTimeout(timeout)
        }
    }, [progress, onLoadingComplete])

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                    {/* Spinning Logo */}
                    <motion.div
                        className="relative w-24 h-24 sm:w-32 sm:h-32 mb-8"
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    >
                        <img
                            src="/images/abc-logo.png"
                            alt="ABC Logo"
                            className="w-full h-full object-contain"
                        />
                    </motion.div>

                    {/* Loading Bar Container */}
                    <div className="w-48 sm:w-64 h-1.5 bg-muted rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-primary rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.1, ease: "easeOut" }}
                        />
                    </div>

                    {/* Loading Text */}
                    <motion.p
                        className="mt-4 text-sm text-muted-foreground"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        Loading...
                    </motion.p>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
