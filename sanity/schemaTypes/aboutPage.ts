import { defineType, defineField, defineArrayMember } from "sanity"
import { DocumentIcon } from "@sanity/icons"

export const aboutPage = defineType({
    name: "aboutPage",
    title: "About Page",
    type: "document",
    icon: DocumentIcon,
    fields: [
        // Hero Section
        defineField({
            name: "heroPill",
            title: "Hero Pill Text",
            type: "string",
            description: "Text in the small pill above the title (e.g., 'About Us')",
            initialValue: "About Us",
        }),
        defineField({
            name: "heroTitle",
            title: "Hero Title",
            type: "string",
            description: "Main heading of the About page",
            initialValue: "Empowering the Next Generation",
        }),
        defineField({
            name: "heroDescription",
            title: "Hero Description",
            type: "text",
            rows: 3,
            description: "Subheading text below the title",
        }),

        // Mission Section
        defineField({
            name: "missionTitle",
            title: "Mission Title",
            type: "string",
            initialValue: "Our Mission",
        }),
        defineField({
            name: "missionContent",
            title: "Mission Content",
            type: "text",
            rows: 4,
        }),

        // Why ABC Section
        defineField({
            name: "whyTitle",
            title: "Why ABC Title",
            type: "string",
            initialValue: "Why ABC?",
        }),
        defineField({
            name: "whyContent",
            title: "Why ABC Content",
            type: "text",
            rows: 4,
        }),

        // Who We're For Section
        defineField({
            name: "whoTitle",
            title: "Who We're For Title",
            type: "string",
            initialValue: "Who We're For",
        }),
        defineField({
            name: "whoContent",
            title: "Who We're For Content",
            type: "text",
            rows: 3,
        }),

        // Founding Story Section
        defineField({
            name: "foundingYear",
            title: "Founding Year",
            type: "string",
            description: "e.g., 'Est. 2025'",
            initialValue: "Est. 2025",
        }),
        defineField({
            name: "foundingTitle",
            title: "Founding Story Title",
            type: "string",
            initialValue: "Founding Story",
        }),
        defineField({
            name: "foundingParagraphs",
            title: "Founding Story Paragraphs",
            type: "array",
            of: [{ type: "text" }],
            description: "Each item is a separate paragraph in the founding story.",
        }),
        defineField({
            name: "foundingImage",
            title: "Founding Team Image",
            type: "image",
            options: { hotspot: true },
        }),

        // Offerings Section
        defineField({
            name: "offeringsTitle",
            title: "Offerings Section Title",
            type: "string",
            initialValue: "What We Offer",
        }),
        defineField({
            name: "offeringsDescription",
            title: "Offerings Section Description",
            type: "text",
            rows: 2,
        }),
        defineField({
            name: "offerings",
            title: "Offerings",
            type: "array",
            of: [
                defineArrayMember({
                    type: "object",
                    name: "offering",
                    fields: [
                        defineField({
                            name: "title",
                            title: "Title",
                            type: "string",
                        }),
                        defineField({
                            name: "description",
                            title: "Description",
                            type: "text",
                            rows: 2,
                        }),
                        defineField({
                            name: "icon",
                            title: "Icon",
                            type: "string",
                            description: "Icon name: Briefcase, Users, LineChart, GraduationCap, Heart, Mic",
                            options: {
                                list: [
                                    { title: "Briefcase", value: "Briefcase" },
                                    { title: "Users", value: "Users" },
                                    { title: "Chart", value: "LineChart" },
                                    { title: "Graduation Cap", value: "GraduationCap" },
                                    { title: "Heart", value: "Heart" },
                                    { title: "Microphone", value: "Mic" },
                                ],
                            },
                        }),
                    ],
                    preview: {
                        select: { title: "title" },
                    },
                }),
            ],
        }),

        // CTA Section
        defineField({
            name: "ctaTitle",
            title: "CTA Title",
            type: "string",
            initialValue: "Ready to launch your career?",
        }),
        defineField({
            name: "ctaDescription",
            title: "CTA Description",
            type: "text",
            rows: 2,
        }),
    ],
    preview: {
        prepare() {
            return { title: "About Page" }
        },
    },
})
