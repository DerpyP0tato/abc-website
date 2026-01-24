import { defineType, defineField } from 'sanity'

export const aboutPage = defineType({
    name: 'aboutPage',
    title: 'About Page',
    type: 'document',
    fields: [
        defineField({
            name: 'heroPill',
            title: 'Hero Pill Text',
            type: 'string',
            description: 'Small badge text above the title (e.g., "About Us")',
        }),
        defineField({
            name: 'heroTitle',
            title: 'Hero Title',
            type: 'string',
            description: 'Main headline on the About page',
        }),
        defineField({
            name: 'heroDescription',
            title: 'Hero Description',
            type: 'text',
            description: 'Subtitle/description below the title',
        }),
        defineField({
            name: 'missionTitle',
            title: 'Mission Title',
            type: 'string',
        }),
        defineField({
            name: 'missionContent',
            title: 'Mission Content',
            type: 'array',
            of: [{ type: 'block' }],
        }),
        defineField({
            name: 'whyTitle',
            title: 'Why ABC Title',
            type: 'string',
        }),
        defineField({
            name: 'whyContent',
            title: 'Why ABC Content',
            type: 'array',
            of: [{ type: 'block' }],
        }),
        defineField({
            name: 'whoTitle',
            title: 'Who We\'re For Title',
            type: 'string',
        }),
        defineField({
            name: 'whoContent',
            title: 'Who We\'re For Content',
            type: 'array',
            of: [{ type: 'block' }],
        }),
        defineField({
            name: 'foundingYear',
            title: 'Founding Year Badge',
            type: 'string',
            description: 'e.g., "Est. 2025"',
        }),
        defineField({
            name: 'foundingTitle',
            title: 'Founding Story Title',
            type: 'string',
        }),
        defineField({
            name: 'foundingContent',
            title: 'Founding Story Content',
            type: 'array',
            of: [{ type: 'block' }],
        }),
        defineField({
            name: 'foundingImage',
            title: 'Founding Team Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'offeringsTitle',
            title: 'Offerings Section Title',
            type: 'string',
        }),
        defineField({
            name: 'offeringsDescription',
            title: 'Offerings Section Description',
            type: 'text',
        }),
        defineField({
            name: 'offerings',
            title: 'Offerings',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({ name: 'title', title: 'Title', type: 'string' }),
                        defineField({ name: 'icon', title: 'Icon Name', type: 'string', description: 'e.g., Briefcase, Users, LineChart, GraduationCap, Heart, Mic' }),
                        defineField({ name: 'description', title: 'Description', type: 'text' }),
                    ],
                },
            ],
        }),
        defineField({
            name: 'ctaTitle',
            title: 'CTA Title',
            type: 'string',
        }),
        defineField({
            name: 'ctaDescription',
            title: 'CTA Description',
            type: 'text',
        }),
    ],
    preview: {
        prepare() {
            return {
                title: 'About Page',
            }
        },
    },
})
