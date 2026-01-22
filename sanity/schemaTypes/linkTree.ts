import { defineField, defineType } from "sanity"
import { LinkIcon } from "@sanity/icons"

export const linkTree = defineType({
    name: "linkTree",
    title: "Link Tree",
    type: "document",
    icon: LinkIcon,
    fields: [
        defineField({
            name: "title",
            title: "Page Title",
            type: "string",
            initialValue: "Asian Business Collective",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "text",
            rows: 3,
        }),
        defineField({
            name: "profileImage",
            title: "Profile Image",
            type: "image",
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: "sections",
            title: "Sections",
            type: "array",
            of: [
                {
                    type: "object",
                    title: "Section",
                    fields: [
                        defineField({
                            name: "sectionTitle",
                            title: "Section Title",
                            type: "string",
                        }),
                        defineField({
                            name: "links",
                            title: "Links",
                            type: "array",
                            of: [
                                {
                                    type: "object",
                                    title: "Link",
                                    fields: [
                                        defineField({
                                            name: "title",
                                            title: "Title",
                                            type: "string",
                                            validation: (rule) => rule.required(),
                                        }),
                                        defineField({
                                            name: "url",
                                            title: "URL",
                                            type: "url",
                                            validation: (rule) => rule.required().uri({ scheme: ["http", "https", "mailto", "tel"] }),
                                        }),
                                        defineField({
                                            name: "archived",
                                            title: "Archive Link",
                                            type: "boolean",
                                            description: "Hide this link from the public page without deleting it.",
                                            initialValue: false,
                                        }),
                                        defineField({
                                            name: "image",
                                            title: "Icon/Image",
                                            type: "image",
                                            options: {
                                                hotspot: true,
                                            },
                                        }),
                                    ],
                                    preview: {
                                        select: {
                                            title: "title",
                                            subtitle: "url",
                                            media: "image",
                                        },
                                    },
                                },
                            ],
                        }),
                    ],
                },
            ],
        }),
    ],
})
