import { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://abc-website.vercel.app'

    // Fetch all events
    const events = await client.fetch<Array<{ slug: string; _updatedAt: string }>>(
        groq`*[_type == "event" && defined(slug.current)] {
      "slug": slug.current,
      _updatedAt
    }`
    )

    // Fetch all team members
    const teamMembers = await client.fetch<Array<{ slug: string; _updatedAt: string }>>(
        groq`*[_type == "teamMember" && defined(slug.current)] {
      "slug": slug.current,
      _updatedAt
    }`
    )

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/events`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/team`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/links`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        },
    ]

    // Dynamic event pages
    const eventPages: MetadataRoute.Sitemap = events.map((event) => ({
        url: `${baseUrl}/events/${event.slug}`,
        lastModified: new Date(event._updatedAt),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }))

    // Dynamic team member pages
    const teamPages: MetadataRoute.Sitemap = teamMembers.map((member) => ({
        url: `${baseUrl}/team/${member.slug}`,
        lastModified: new Date(member._updatedAt),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }))

    return [...staticPages, ...eventPages, ...teamPages]
}
