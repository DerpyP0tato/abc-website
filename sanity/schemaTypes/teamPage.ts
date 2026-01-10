import { defineField, defineType } from "sanity"
import { UsersIcon } from "@sanity/icons"

export const teamPage = defineType({
    name: "teamPage",
    title: "Team Page",
    type: "document",
    icon: UsersIcon,
    fields: [
        defineField({
            name: "placementTitle",
            title: "Placement Section Title",
            type: "string",
            initialValue: "Where our graduates have gone",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "placementDescription",
            title: "Placement Section Description",
            type: "text",
            rows: 4,
            initialValue:
                "With portfolio pieces and learnings from our courses, our students have earned internships and full time opportunities with top companies in industries ranging from startups to big tech, trading firms, fintech, venture capital, and more.",
        }),
        defineField({
            name: "companies",
            title: "Company Logos",
            type: "array",
            of: [
                {
                    type: "image",
                    options: {
                        hotspot: true,
                    },
                    fields: [
                        defineField({
                            name: "alt",
                            title: "Alt Text",
                            type: "string",
                            validation: (rule) => rule.required(),
                        }),
                    ],
                },
            ],
            description: "Upload logos of companies where graduates have gone.",
        }),
    ],
})
