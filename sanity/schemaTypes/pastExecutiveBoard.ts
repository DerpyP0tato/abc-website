import { defineType, defineField, defineArrayMember } from "sanity"
import { CalendarIcon } from "@sanity/icons"

export const pastExecutiveBoard = defineType({
    name: "pastExecutiveBoard",
    title: "Past Executive Board",
    type: "document",
    icon: CalendarIcon,
    fields: [
        defineField({
            name: "year",
            title: "Academic Year",
            type: "string",
            validation: (rule) => rule.required(),
            description: "e.g., '2023-2024'",
        }),
        defineField({
            name: "members",
            title: "Board Members",
            type: "array",
            of: [
                defineArrayMember({
                    type: "object",
                    name: "boardMember",
                    fields: [
                        defineField({
                            name: "name",
                            title: "Name",
                            type: "string",
                            validation: (rule) => rule.required(),
                            description: "e.g., 'Frank Russo (President)'",
                        }),
                        defineField({
                            name: "linkedinUrl",
                            title: "LinkedIn URL",
                            type: "url",
                            description: "Optional. If provided, name will be clickable.",
                        }),
                    ],
                    preview: {
                        select: { title: "name" },
                    },
                }),
            ],
            description: "Add each member with their role and optional LinkedIn URL.",
        }),
    ],
    preview: {
        select: {
            title: "year",
            members: "members",
        },
        prepare({ title, members }) {
            const count = members?.length || 0
            return {
                title,
                subtitle: `${count} member${count !== 1 ? "s" : ""}`,
            }
        },
    },
    orderings: [
        {
            title: "Year (Newest First)",
            name: "yearDesc",
            by: [{ field: "year", direction: "desc" }],
        },
    ],
})
