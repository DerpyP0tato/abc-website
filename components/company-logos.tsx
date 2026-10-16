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

type Slot = { top: string; left: string }

// Balanced "Ring" distribution that looks good with few or many logos.
// Order is strictly "Opposite & Across" to paint the canvas evenly, so the first
// (biggest) logos land on the corner anchors.
const DESKTOP_SLOTS: Slot[] = [
    // --- PRIMARY ANCHORS (The Corners) ---
    { top: "20%", left: "15%" }, // Top-Left
    { top: "80%", left: "85%" }, // Bottom-Right
    { top: "20%", left: "85%" }, // Top-Right
    { top: "80%", left: "15%" }, // Bottom-Left

    // --- SECONDARY ANCHORS (The Mids) ---
    { top: "50%", left: "8%" }, // Mid-Left (Wide)
    { top: "50%", left: "92%" }, // Mid-Right (Wide)
    { top: "12%", left: "50%" }, // Top-Mid
    { top: "88%", left: "50%" }, // Bottom-Mid

    // --- TERTIARY FILLERS (Connecting the dots) ---
    { top: "24%", left: "30%" }, // Top-Left/Mid Connection
    { top: "76%", left: "70%" }, // Bottom-Right/Mid Connection
    { top: "24%", left: "70%" }, // Top-Right/Mid Connection
    { top: "76%", left: "30%" }, // Bottom-Left/Mid Connection
    { top: "33%", left: "4%" }, // Mid-Left Up
    { top: "67%", left: "96%" }, // Mid-Right Down
    { top: "33%", left: "96%" }, // Mid-Right Up
    { top: "67%", left: "4%" }, // Mid-Left Down
    { top: "16%", left: "39%" }, // Inner Top
    { top: "84%", left: "61%" }, // Inner Bottom
    { top: "84%", left: "39%" }, // Inner Bottom-Left
    { top: "16%", left: "61%" }, // Inner Top-Right
]

const MAX_LOGOS = DESKTOP_SLOTS.length

// Bubble diameters (px), largest first. Logos earlier in the Sanity list get bigger bubbles.
const DESKTOP_SIZES = [88, 74, 62, 50]
// Phones & tablets use one uniform size so the scrolling rows look even
const MOBILE_SIZE = 64
// Index where each size tier ends: first 4 logos (the corners) are largest, then the 4 mids, etc.
const TIER_ENDS = [4, 8, 14]

type Company = CompanyLogosProps["companies"][number]

function sizeFor(rank: number, sizes: number[]) {
    const tier = TIER_ENDS.findIndex((end) => rank < end)
    return sizes[tier === -1 ? sizes.length - 1 : tier]
}

function LogoBubble({
    company,
    size,
    decorative = false,
    className,
    style,
}: {
    company: Company
    size: number
    decorative?: boolean
    className?: string
    style?: React.CSSProperties
}) {
    return (
        <div
            className={`flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-sm shadow-black/5 ring-1 ring-black/5 transition-transform hover:scale-110 ${className ?? ""}`}
            style={{ width: `${size}px`, height: `${size}px`, ...style }}
        >
            <div className="relative h-[65%] w-[65%]">
                <Image
                    src={urlFor(company).width(200).url()}
                    alt={decorative ? "" : company.alt || "Company logo"}
                    fill
                    sizes="100px"
                    className="object-contain opacity-90"
                />
            </div>
        </div>
    )
}

// Phones & tablets: a slow, endless row of bubbles. The list is rendered twice so the loop is seamless;
// reduced-motion users get a single, swipeable copy instead.
function LogoMarquee({ logos, reverse = false }: { logos: { company: Company; rank: number }[]; reverse?: boolean }) {
    const copy = (decorative: boolean) => (
        <div className={`flex items-center gap-4 pr-4 ${decorative ? "motion-reduce:hidden" : ""}`} aria-hidden={decorative || undefined}>
            {logos.map(({ company, rank }) => (
                <LogoBubble key={rank} company={company} size={MOBILE_SIZE} decorative={decorative} />
            ))}
        </div>
    )

    return (
        <div className="overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] motion-reduce:overflow-x-auto">
            <div
                className="flex w-max motion-safe:animate-marquee"
                style={{ animationDuration: `${logos.length * 4}s`, animationDirection: reverse ? "reverse" : "normal" }}
            >
                {copy(false)}
                {copy(true)}
            </div>
        </div>
    )
}

export function CompanyLogos({ title, description, companies }: CompanyLogosProps) {
    // Skip logo slots whose upload never finished
    const uploaded = (companies ?? []).filter((company) => company?.asset)
    if (uploaded.length === 0) return null

    const logos = uploaded.slice(0, MAX_LOGOS).map((company, rank) => ({ company, rank }))

    return (
        <section className="relative overflow-hidden py-16 sm:py-20 lg:py-64 mb-8 sm:mb-12">
            <div className="container relative z-10 mx-auto px-4 text-center">
                <div className="mx-auto max-w-2xl px-6">
                    <h2 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl">{title}</h2>
                    <p className="mt-6 text-lg text-muted-foreground leading-relaxed">{description}</p>
                </div>
            </div>

            {/* Desktop: bubbles floating in a ring around the text */}
            <div className="pointer-events-none absolute inset-0 mx-auto hidden max-w-7xl lg:block [&>*]:pointer-events-auto">
                {logos.map(({ company, rank }) => {
                    const size = sizeFor(rank, DESKTOP_SIZES)
                    const slot = DESKTOP_SLOTS[rank]
                    return (
                        <LogoBubble
                            key={rank}
                            company={company}
                            size={size}
                            className="absolute motion-safe:animate-logo-float"
                            style={{
                                top: slot.top,
                                left: slot.left,
                                marginLeft: `-${size / 2}px`,
                                marginTop: `-${size / 2}px`,
                                animationDelay: `${(rank * 0.5) % 5}s`,
                            }}
                        />
                    )
                })}
            </div>

            {/* Phones & tablets: two rows drifting in opposite directions */}
            <div className="mt-10 space-y-3 sm:mt-12 lg:hidden">
                <LogoMarquee logos={logos.filter(({ rank }) => rank % 2 === 0)} />
                <LogoMarquee logos={logos.filter(({ rank }) => rank % 2 === 1)} reverse />
            </div>
        </section>
    )
}
