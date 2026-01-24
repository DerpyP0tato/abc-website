import { client } from "@/sanity/lib/client"
import { TEAM_MEMBER_BY_SLUG_QUERY } from "@/sanity/lib/queries"
import { urlFor } from "@/sanity/lib/image"
import type { TeamMember } from "@/sanity/lib/types"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { notFound } from "next/navigation"

export const revalidate = 60

interface PageProps {
    params: Promise<{
        slug: string
    }>
}

async function getTeamMember(slug: string) {
    try {
        const member = await client.fetch<TeamMember>(TEAM_MEMBER_BY_SLUG_QUERY, { slug })
        return member
    } catch (error) {
        console.error("Error fetching team member:", error)
        return null
    }
}

export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params
    const member = await getTeamMember(slug)
    if (!member) {
        return {
            title: "Team Member Not Found | Asian Business Collective",
        }
    }

    return {
        title: `${member.name} | Asian Business Collective`,
        description: `Meet ${member.name}, ${member.role} at Asian Business Collective.`,
    }
}

export default async function TeamMemberPage({ params }: PageProps) {
    const { slug } = await params
    const member = await getTeamMember(slug)

    if (!member) {
        notFound()
    }

    const imageUrl = member.headshot ? urlFor(member.headshot).width(800).height(800).url() : null

    return (
        <div className="min-h-[80vh] flex flex-col justify-center">
            <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
                <Button asChild variant="ghost" className="mb-8 pl-0 hover:bg-transparent hover:text-primary">
                    <Link href="/team" className="flex items-center gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Team
                    </Link>
                </Button>

                <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
                    {/* Left Column: Image */}
                    <div className="lg:col-span-6">
                        <div className="relative aspect-square w-full overflow-hidden rounded-full shadow-2xl ring-1 ring-border/10">
                            <Image
                                src={imageUrl || "/placeholder-user.jpg"}
                                alt={member.name}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>

                    {/* Right Column: Details */}
                    <div className="flex flex-col justify-center space-y-6 lg:col-span-6">
                        <div className="space-y-2">
                            <h1 className="font-serif text-4xl font-bold tracking-tight text-blue-900 sm:text-5xl">
                                {member.name}
                            </h1>
                            <p className="text-xl font-medium text-muted-foreground">{member.role}</p>
                        </div>

                        <div className="space-y-3 text-base">
                            {member.majorYear && (
                                <div>
                                    <h3 className="font-semibold text-foreground">Major & Year</h3>
                                    <p className="text-muted-foreground">{member.majorYear}</p>
                                </div>
                            )}

                            {member.hometown && (
                                <div>
                                    <h3 className="font-semibold text-foreground">Hometown</h3>
                                    <p className="text-muted-foreground">{member.hometown}</p>
                                </div>
                            )}

                            {member.campusInvolvements && (
                                <div>
                                    <h3 className="font-semibold text-foreground">Campus Involvements</h3>
                                    <p className="text-muted-foreground">{member.campusInvolvements}</p>
                                </div>
                            )}

                            {member.professionalExperience && (
                                <div>
                                    <h3 className="font-semibold text-foreground">Professional Experience</h3>
                                    <p className="text-muted-foreground">{member.professionalExperience}</p>
                                </div>
                            )}

                            {member.interests && (
                                <div>
                                    <h3 className="font-semibold text-foreground">Interests</h3>
                                    <p className="text-muted-foreground">{member.interests}</p>
                                </div>
                            )}

                            <div className="pt-4">
                                {member.email && (
                                    <p className="mb-4 font-medium">
                                        Reach out at{" "}
                                        <a href={`mailto:${member.email}`} className="text-foreground hover:underline">
                                            {member.email}
                                        </a>
                                    </p>
                                )}

                                {member.linkedinUrl && (
                                    <Button asChild variant="outline" className="gap-2">
                                        <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer">
                                            <Linkedin className="h-4 w-4" />
                                            Connect on LinkedIn
                                        </a>
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
