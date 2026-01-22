import { defineField, defineType } from "sanity"
import { CogIcon } from "@sanity/icons"

export const settings = defineType({
    name: "settings",
    title: "Site Settings",
    type: "document",
    icon: CogIcon,
    fields: [
        defineField({
            name: "joinLink",
            title: "Join ABC Link",
            type: "url",
            description: "URL for the 'Join ABC' button (e.g., Google Form link)",
        }),
        defineField({
            name: "instagram",
            title: "Instagram URL",
            type: "url",
        }),
        defineField({
            name: "linkedin",
            title: "LinkedIn URL",
            type: "url",
        }),
        defineField({
            name: "email",
            title: "Contact Email",
            type: "string",
            validation: (rule) => rule.email(),
        }),
    ],
})
