"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { urlFor } from "@/sanity/lib/image"

interface CompanyLogosProps {
    title: string
    description: string
    companies: {
        asset: any
        alt: string
    }[]
}

export function CompanyLogos({ title, description, companies }: CompanyLogosProps) {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!companies || companies.length === 0) return null

    // Balanced "Ring" distribution that looks good with few or many logos.
    // Order is strictly "Opposite & Across" to paint the canvas evenly.
    // Safe margins adjusted to prevent cutoff: ~10% to ~90%
    const slots = [
        // --- PRIMARY ANCHORS (The Corners) ---
        // 1. Top-Left
        { top: '20%', left: '15%' },
        // 2. Bottom-Right
        { top: '80%', left: '85%' },
        // 3. Top-Right
        { top: '20%', left: '85%' },
        // 4. Bottom-Left
        { top: '80%', left: '15%' },

        // --- SECONDARY ANCHORS (The Mids) ---
        // 5. Mid-Left (Wide)
        { top: '50%', left: '8%' },
        // 6. Mid-Right (Wide)
        { top: '50%', left: '92%' },

        // 7. Top-Mid
        { top: '12%', left: '50%' },
        // 8. Bottom-Mid
        { top: '88%', left: '50%' },

        // --- TERTIARY FILLERS (Connecting the dots) ---
        // 9. Top-Left/Mid Connection
        { top: '30%', left: '30%' },
        // 10. Bottom-Right/Mid Connection
        { top: '70%', left: '70%' },

        // 11. Top-Right/Mid Connection
        { top: '30%', left: '70%' },
        // 12. Bottom-Left/Mid Connection
        { top: '70%', left: '30%' },

        // 13. Mid-Left Up
        { top: '35%', left: '5%' },
        // 14. Mid-Right Down
        { top: '65%', left: '95%' },

        // 15. Mid-Right Up
        { top: '35%', left: '95%' },
        // 16. Mid-Left Down
        { top: '65%', left: '5%' },

        // 17. Inner Top
        { top: '25%', left: '42%' },
        // 18. Inner Bottom
        { top: '75%', left: '58%' },

        // 19. Inner Bottom-Left
        { top: '75%', left: '42%' },
        // 20. Inner Top-Right
        { top: '25%', left: '58%' },
    ];

    // Priority Order: Just use sequential
    const activeSlots = slots;

    return (
        <section className="relative overflow-hidden py-32 sm:py-64 mb-8 sm:mb-12">
            <div className="container relative z-10 mx-auto px-4 text-center">
                <div className="mx-auto max-w-2xl px-6">
                    <h2 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl">{title}</h2>
                    <p className="mt-6 text-lg text-muted-foreground leading-relaxed">{description}</p>
                </div>
            </div>

            <div className="pointer-events-none absolute inset-0 mx-auto max-w-7xl overflow-hidden hidden md:block">
                {mounted &&
                    companies.map((company, i) => {
                        // Cycle through slots
                        const slot = activeSlots[i % activeSlots.length];

                        // Varied sizes to match reference (Small, Medium, Large, XL)
                        // This creates depth and visual interest
                        const size = [45, 55, 70, 85][i % 4];

                        // Random delay for organic float feel
                        const delay = (i * 0.5) % 5;

                        return (
                            <div
                                key={i}
                                className="absolute flex items-center justify-center overflow-hidden rounded-full bg-white shadow-sm shadow-black/5 ring-1 ring-black/5 transition-transform hover:scale-110"
                                style={{
                                    top: slot.top,
                                    left: slot.left,
                                    width: `${size}px`,
                                    height: `${size}px`,
                                    marginLeft: `-${size / 2}px`,
                                    marginTop: `-${size / 2}px`,
                                    animation: `float 6s ease-in-out infinite alternate`,
                                    animationDelay: `${delay}s`
                                }}
                            >
                                <div className="relative h-[65%] w-[65%]">
                                    <Image
                                        src={urlFor(company).width(200).url()}
                                        alt={company.alt || "Company logo"}
                                        fill
                                        sizes="100px"
                                        className="object-contain opacity-90"
                                    />
                                </div>
                            </div>
                        )
                    })}
            </div>

            <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0); }
          100% { transform: translateY(-15px); }
        }
      `}</style>
        </section>
    )
}
