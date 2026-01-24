import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { Users, Mic, Briefcase, GraduationCap, LineChart, Heart } from "lucide-react"
import { client } from "@/sanity/lib/client"
import { SETTINGS_QUERY, ABOUT_PAGE_QUERY } from "@/sanity/lib/queries"
import { urlFor } from "@/sanity/lib/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { AboutPageData } from "@/sanity/lib/types"

import { PortableTextRenderer } from "@/components/portable-text"

export const metadata = {
    title: "About | Asian Business Collective",
    description: "Learn about the Asian Business Collective and our mission at Binghamton University.",
}

// Helper to convert string to Portable Text block
const toBlock = (text: string) => [{ _type: 'block', children: [{ _type: 'span', text }] }]

export const revalidate = 60

// Icon mapping for offerings
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Briefcase,
    Users,
    LineChart,
    GraduationCap,
    Heart,
    Mic,
}

// Default content (fallback if CMS is empty)
const defaults = {
    heroPill: "About Us",
    heroTitle: "Empowering the Next Generation",
    heroDescription: "The Asian Business Collective at Binghamton University is dedicated to bridging the gap between ambition and achievement for students in business and technology.",
    missionTitle: "Our Mission",
    missionContent: toBlock("We exist to separate potential from opportunity. By fostering a supportive community and providing hands-on professional development, we prepare students to confidently enter and excel in competitive industries. We believe representation matters, and we strive to elevate Asian voices in business leadership."),
    whyTitle: "Why ABC?",
    whyContent: toBlock("Many students feel disconnected from the professional world and uncertain about how to build meaningful careers. ABC fills this gap by creating a space where students can learn from real experiences, connect with active mentors, and develop practical skills that employers actually value."),
    whoTitle: "Who We're For",
    whoContent: toBlock("We welcome all students at Binghamton University who are curious, driven, and ready to grow. Whether you're a freshman exploring options or a senior refining your pitch, there is a place for you here."),
    foundingYear: "Est. 2025",
    foundingTitle: "Founding Story",
    foundingContent: [
        ...toBlock("The Asian Business Collective wasn't born in a boardroom. It began in 2025 over a hotpot dinner with Maxwell Chan (SOM '28), Genesis Li (SOM '28), and Ellie Park (SOM '28)—a group of friends sharing a meal and a common realization: there was a significant gap in active Asian representation within the business world."),
        ...toBlock("We saw talented peers being boxed in by the \"model minority\" myth—expected to be quiet workers rather than vocal leaders. We knew we had to change that narrative."),
        ...toBlock("What started as a conversation over dinner has grown into a movement to empower the next generation of leaders to break ceilings, speak up, and take their place at the table.")
    ],
    offeringsTitle: "What We Offer",
    offeringsDescription: "A comprehensive suite of resources designed to accelerate your professional journey.",
    offerings: [
        { title: "Professional Workshops", icon: "Briefcase", description: "Skill-building sessions on resume crafting, interviews, and technical tools." },
        { title: "Networking Events", icon: "Users", description: "Connect with alumni and professionals from top firms in finance, tech, and consulting." },
        { title: "Case Competitions", icon: "LineChart", description: "Sharpen your analytical and presentation skills through rigorous team-based challenges." },
        { title: "Mentorship", icon: "GraduationCap", description: "One-on-one guidance from experienced upperclassmen and successful alumni." },
        { title: "Social Impact", icon: "Heart", description: "Give back to the community through organized service events and charitable initiatives." },
        { title: "Community", icon: "Mic", description: "Social events and a supportive family atmosphere to help you thrive on campus." },
    ],
    ctaTitle: "Ready to launch your career?",
    ctaDescription: "Join a community of high-achievers and future leaders. Your journey starts with a single step.",
}

export default async function AboutPage() {
    const [settings, aboutData] = await Promise.all([
        client.fetch(SETTINGS_QUERY).catch(() => null),
        client.fetch<AboutPageData>(ABOUT_PAGE_QUERY).catch(() => null),
    ])

    // Merge CMS data with defaults
    const content = {
        heroPill: aboutData?.heroPill || defaults.heroPill,
        heroTitle: aboutData?.heroTitle || defaults.heroTitle,
        heroDescription: aboutData?.heroDescription || defaults.heroDescription,
        missionTitle: aboutData?.missionTitle || defaults.missionTitle,
        missionContent: Array.isArray(aboutData?.missionContent) ? aboutData.missionContent : defaults.missionContent,
        whyTitle: aboutData?.whyTitle || defaults.whyTitle,
        whyContent: Array.isArray(aboutData?.whyContent) ? aboutData.whyContent : defaults.whyContent,
        whoTitle: aboutData?.whoTitle || defaults.whoTitle,
        whoContent: Array.isArray(aboutData?.whoContent) ? aboutData.whoContent : defaults.whoContent,
        foundingYear: aboutData?.foundingYear || defaults.foundingYear,
        foundingTitle: aboutData?.foundingTitle || defaults.foundingTitle,
        foundingContent: Array.isArray(aboutData?.foundingContent) ? aboutData.foundingContent : defaults.foundingContent,
        foundingImage: aboutData?.foundingImage,
        offeringsTitle: aboutData?.offeringsTitle || defaults.offeringsTitle,
        offeringsDescription: aboutData?.offeringsDescription || defaults.offeringsDescription,
        offerings: aboutData?.offerings || defaults.offerings,
        ctaTitle: aboutData?.ctaTitle || defaults.ctaTitle,
        ctaDescription: aboutData?.ctaDescription || defaults.ctaDescription,
    }

    // Get founding image URL
    const foundingImageUrl = content.foundingImage
        ? urlFor(content.foundingImage).width(800).height(800).url()
        : "/images/founding-team.jpg"

    return (
        <div className="flex flex-col">
            {/* Global Background Glow */}
            <div className="fixed inset-0 -z-10 bg-background pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] animate-blob" />
                <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] animate-blob animation-delay-2000" />
                <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[100px] animate-blob animation-delay-4000" />
            </div>

            {/* Hero Section */}
            <section className="relative pt-8 pb-10 sm:pb-16 md:pt-12 overflow-hidden">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 h-96 w-96 rounded-full bg-blue-100/50 blur-3xl opacity-50" />
                <div className="mx-auto max-w-4xl px-8 relative z-10 text-center sm:px-6 lg:px-8">
                    <span className="inline-block rounded-full bg-blue-100 dark:bg-blue-900/30 px-3 py-1 text-sm font-semibold text-blue-700 dark:text-blue-300 mb-6">
                        {content.heroPill}
                    </span>
                    <h1 className="font-serif text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
                        {content.heroTitle}
                    </h1>
                    <p className="mt-6 text-xl leading-relaxed text-muted-foreground max-w-2xl mx-auto">
                        {content.heroDescription}
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="pt-6 pb-20 sm:pt-12 sm:pb-24">
                <div className="mx-auto max-w-7xl px-8 sm:px-6 lg:px-8">

                    {/* Mission & Vision Split */}
                    <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-stretch mb-24">
                        <div className="bg-card rounded-3xl p-8 sm:p-12 border shadow-sm flex flex-col justify-center">
                            <h2 className="font-serif text-2xl font-bold text-foreground mb-4 sm:text-3xl">{content.missionTitle}</h2>
                            <div className="text-lg leading-relaxed text-muted-foreground">
                                <PortableTextRenderer value={content.missionContent} />
                            </div>
                        </div>
                        <div className="space-y-8">
                            <div>
                                <h2 className="font-serif text-2xl font-bold text-foreground mb-4 sm:text-3xl">{content.whyTitle}</h2>
                                <div className="text-lg leading-relaxed text-muted-foreground">
                                    <PortableTextRenderer value={content.whyContent} />
                                </div>
                            </div>
                            <div>
                                <h2 className="font-serif text-2xl font-bold text-foreground mb-4 sm:text-3xl">{content.whoTitle}</h2>
                                <div className="text-lg leading-relaxed text-muted-foreground">
                                    <PortableTextRenderer value={content.whoContent} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Founding Story */}
                    <div className="mb-24 rounded-3xl bg-card p-8 sm:p-12 border shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-blue-50/50 dark:bg-blue-500/10 blur-3xl opacity-60" />

                        <div className="relative z-10 grid gap-10 lg:grid-cols-2 lg:gap-12 items-center">
                            <div>
                                <span className="inline-flex items-center rounded-full bg-blue-50 dark:bg-blue-900/30 px-3 py-1 text-xs font-medium text-blue-700 dark:text-blue-300 mb-6">
                                    {content.foundingYear}
                                </span>
                                <h2 className="font-serif text-2xl font-bold text-foreground mb-6 sm:text-3xl">{content.foundingTitle}</h2>
                                <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                                    <PortableTextRenderer value={content.foundingContent} />
                                </div>
                            </div>

                            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg">
                                <Image
                                    src={foundingImageUrl}
                                    alt="ABC Founding Team"
                                    fill
                                    className="object-cover object-[center_35%]"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Offerings Grid */}
                    <div className="mb-24">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 className="font-serif text-2xl font-bold text-foreground sm:text-3xl">{content.offeringsTitle}</h2>
                            <p className="mt-4 text-lg text-muted-foreground">
                                {content.offeringsDescription}
                            </p>
                        </div>

                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {content.offerings.map((offering) => {
                                const IconComponent = iconMap[offering.icon] || Briefcase
                                return (
                                    <Card key={offering.title} className="bg-card transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group">
                                        <CardHeader>
                                            <div className="h-12 w-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                                <IconComponent className="h-6 w-6" />
                                            </div>
                                            <CardTitle className="font-bold text-xl">{offering.title}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-muted-foreground leading-relaxed">
                                                {offering.description}
                                            </p>
                                        </CardContent>
                                    </Card>
                                )
                            })}
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="rounded-[2.5rem] bg-blue-50 dark:bg-blue-950/20 px-6 py-16 sm:px-12 sm:py-24 text-center relative overflow-hidden border border-blue-100 dark:border-blue-900/50">
                        <div className="absolute inset-0 bg-white/40 dark:bg-transparent blur-[100px] rounded-full mix-blend-overlay" />
                        <div className="relative z-10 max-w-2xl mx-auto">
                            <h2 className="font-serif text-2xl font-bold text-blue-900 dark:text-blue-100 sm:text-3xl">{content.ctaTitle}</h2>
                            <p className="mt-6 text-lg text-blue-700/80 dark:text-blue-300/80 mb-10">
                                {content.ctaDescription}
                            </p>
                            <div className="flex flex-col gap-4 sm:flex-row justify-center">
                                <Button asChild size="lg" className="bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20">
                                    <a href={settings?.joinLink || "https://forms.gle/"} target="_blank" rel="noopener noreferrer">
                                        Join Our Community
                                    </a>
                                </Button>
                                <Button asChild variant="outline" size="lg" className="border-blue-200 text-blue-700 hover:bg-blue-100 hover:text-blue-800 bg-transparent">
                                    <Link href="/contact">Get in Touch</Link>
                                </Button>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    )
}
