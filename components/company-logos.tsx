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

    // Circular/Elliptical distribution slots
    // Calculated to form a rough circle around the center text
    const slots = [
        // 1. Cardinal Directions (Top, Bottom, Left, Right)
        { top: '12%', left: '50%' },   // Top (12 o'clock) - moved down
        { top: '88%', left: '50%' },   // Bottom (6 o'clock) - moved up
        { top: '50%', left: '6%' },    // Left (9 o'clock) - moved in
        { top: '50%', left: '94%' },   // Right (3 o'clock) - moved in

        // 2. Diagonals (The "Corners" of the circle)
        { top: '22%', left: '22%' },   // Top-Left - moved in
        { top: '78%', left: '78%' },   // Bottom-Right - moved in
        { top: '22%', left: '78%' },   // Top-Right - moved in
        { top: '78%', left: '22%' },   // Bottom-Left - moved in

        // 3. Intermediate positions 
        { top: '15%', left: '35%' },
        { top: '15%', left: '65%' },

        { top: '85%', left: '35%' },
        { top: '85%', left: '65%' },

        { top: '35%', left: '10%' },
        { top: '65%', left: '10%' },

        { top: '35%', left: '90%' },
        { top: '65%', left: '90%' },
    ];

    // Priority Order: 
    // We want to fill the "corners" (diagonals) and edges in a balanced way.
    // Order: TL, BR, TR, BL (Diagonals), then L, R (Sides), then T, B (Verticals)
    // This emphasizes the "circle" shape best by hitting the curve points first.
    const prioritizedSlots = [
        slots[4], // TL
        slots[5], // BR
        slots[6], // TR
        slots[7], // BL
        slots[2], // L
        slots[3], // R
        slots[0], // T
        slots[1], // B
        // Then fills
        slots[8], slots[9], slots[10], slots[11], slots[12], slots[13], slots[14], slots[15]
    ];

    // Use slots purely in order to guarantee the "best" slots are used first
    const activeSlots = prioritizedSlots;

    return (
        <section className="relative overflow-hidden py-24 sm:py-32 mb-12 sm:mb-20">
            <div className="container relative z-10 mx-auto px-4 text-center">
                <div className="mx-auto max-w-2xl">
                    <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
                    <p className="mt-4 text-lg text-muted-foreground">{description}</p>
                </div>
            </div>

            <div className="pointer-events-none absolute inset-0 mx-auto max-w-7xl overflow-hidden hidden md:block">
                {mounted &&
                    companies.map((company, i) => {
                        // Cycle through prioritized slots
                        const slot = activeSlots[i % activeSlots.length];

                        // Pseudo-random values for size and animation
                        const randomOffset = (seed: number) => ((seed * 9301 + 49297) % 233280) / 233280;
                        const r1 = randomOffset(i);
                        const r2 = randomOffset(i * 13);

                        // Smaller size: 50px to 80px
                        const size = 50 + r1 * 30;

                        return (
                            <div
                                key={i}
                                className="absolute flex items-center justify-center overflow-hidden rounded-full bg-white shadow-sm shadow-black/5 ring-1 ring-black/5 transition-transform hover:scale-110"
                                style={{
                                    top: slot.top,
                                    left: slot.left,
                                    width: `${size}px`,
                                    height: `${size}px`,
                                    marginLeft: `-${size / 2}px`, // Center the bubble on the coordinate
                                    marginTop: `-${size / 2}px`,  // Center the bubble on the coordinate
                                    animation: `float ${3 + r2 * 4}s ease-in-out infinite alternate`,
                                    animationDelay: `${r1 * 2}s`
                                }}
                            >
                                <div className="relative h-[70%] w-[70%]">
                                    <Image
                                        src={urlFor(company).url()}
                                        alt={company.alt || "Company logo"}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                        )
                    })}
            </div>

            <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0); }
          100% { transform: translateY(-10px); }
        }
      `}</style>
        </section>
    )
}
