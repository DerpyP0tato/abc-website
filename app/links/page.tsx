import { client } from "@/sanity/lib/client"
import { LINK_TREE_QUERY, SETTINGS_QUERY, EVENTS_UPCOMING_QUERY } from "@/sanity/lib/queries"
import { urlFor } from "@/sanity/lib/image"
import Link from "next/link"
import Image from "next/image"
import { Instagram, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

export const revalidate = 60

export default async function LinksPage() {
    const [data, settings, events] = await Promise.all([
        client.fetch(LINK_TREE_QUERY),
        client.fetch(SETTINGS_QUERY).catch(() => null),
        client.fetch(EVENTS_UPCOMING_QUERY).catch(() => []),
    ])

    // If no data is found, show a basic fallback or loading state could be better,
    // but for now we'll just render what we have.
    const title = data?.title || "Asian Business Collective"
    // Default to ABC logo if no profile image is set, assuming we have one in public/images
    // or just handle empty state carefully.

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-4 pt-8 pb-12 md:pt-12 flex flex-col items-center">
            {/* Profile Section */}
            <div className="mb-8 flex flex-col items-center text-center">
                {data?.profileImage ? (
                    <Image
                        src={urlFor(data.profileImage).width(200).height(200).url()}
                        alt={title}
                        width={96}
                        height={96}
                        className="h-24 w-24 rounded-full object-cover shadow-md"
                    />
                ) : (
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-slate-200">
                        <span className="text-2xl font-bold text-slate-500">ABC</span>
                    </div>
                )}

                <h1 className="mt-4 font-serif text-2xl font-bold tracking-tight text-slate-900">{title}</h1>
                {data?.description && (
                    <p className="mt-2 max-w-sm text-center text-sm text-slate-600">{data.description}</p>
                )}

                {/* Social Icons */}
                <div className="mt-4 flex gap-4">
                    {settings?.instagram && (
                        <a
                            href={settings.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-600 hover:text-slate-900 transition-colors"
                            aria-label="Instagram"
                        >
                            <Instagram className="h-6 w-6" />
                        </a>
                    )}
                    {settings?.linkedin && (
                        <a
                            href={settings.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-600 hover:text-slate-900 transition-colors"
                            aria-label="LinkedIn"
                        >
                            <Linkedin className="h-6 w-6" />
                        </a>
                    )}
                    {settings?.email && (
                        <a
                            href={`mailto:${settings.email}`}
                            className="text-slate-600 hover:text-slate-900 transition-colors"
                            aria-label="Email"
                        >
                            <Mail className="h-6 w-6" />
                        </a>
                    )}
                </div>
            </div>

            {/* Sections & Links */}
            <div className="w-full max-w-md space-y-8">
                {data?.sections?.map((section: any, idx: number) => (
                    <div key={idx} className="space-y-4">
                        {section.sectionTitle && (
                            <h2 className="text-center text-lg font-semibold text-slate-700">{section.sectionTitle}</h2>
                        )}

                        <div className="space-y-3">
                            {section.links?.filter((l: any) => !l.archived).map((link: any, linkIdx: number) => (
                                <a
                                    key={linkIdx}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex w-full items-center rounded-xl border border-slate-200 bg-white p-1 pr-4 transition-all hover:scale-[1.02] hover:border-slate-300 hover:shadow-md"
                                >
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-slate-50">
                                        {link.image ? (
                                            <Image
                                                src={urlFor(link.image).width(64).height(64).url()}
                                                alt=""
                                                width={24}
                                                height={24}
                                                className="h-8 w-8 object-contain"
                                            />
                                        ) : (
                                            <LinkIcon className="h-5 w-5 text-slate-400" />
                                        )}
                                    </div>
                                    <span className="flex-1 text-center font-medium text-slate-700">{link.title}</span>
                                    {/* Placeholder for balancing visually, or an icon like standard linktree */}
                                    <div className="w-10" />
                                </a>
                            ))}
                        </div>
                    </div>
                ))}

                {/* Upcoming Events Section */}
                {events?.length > 0 && (
                    <div className="space-y-4">
                        <h2 className="text-center text-lg font-semibold text-slate-700">Upcoming Events</h2>
                        <div className="space-y-3">
                            {events.map((event: any) => {
                                const startDate = new Date(event.startDateTime)
                                const dateStr = startDate.toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                })
                                return (
                                    <Link
                                        key={event._id}
                                        href={`/events/${event.slug.current}`}
                                        className="group flex w-full items-center rounded-xl border border-slate-200 bg-white p-1 pr-4 transition-all hover:scale-[1.02] hover:border-slate-300 hover:shadow-md"
                                    >
                                        <div className="flex h-12 w-16 shrink-0 flex-col items-center justify-center rounded-lg bg-slate-50 text-xs font-medium text-slate-500">
                                            <span>{dateStr.split(" ")[0]}</span>
                                            <span className="text-slate-900 font-bold text-sm">{dateStr.split(" ")[1]}</span>
                                        </div>
                                        <span className="flex-1 text-center font-medium text-slate-700">{event.title}</span>
                                        <div className="w-16" />
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                )}

                {/* Fallback if no sections exist yet */}
                {!data?.sections && (
                    <div className="text-center text-slate-500">
                        <p>No links configured yet.</p>
                    </div>
                )}
            </div>

            <div className="mt-12">
                <Link href="/" className="text-sm font-medium text-slate-400 hover:text-slate-600">
                    Asian Business Collective
                </Link>
            </div>
        </div>
    )
}

function LinkIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
    )
}
