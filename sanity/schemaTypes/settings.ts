import { defineArrayMember, defineField, defineType } from "sanity"
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
        defineField({
            name: "enableDarkMode",
            title: "Enable Dark Mode",
            type: "boolean",
            description: "If disabled, the site will be forced to Light Mode and the toggle will be hidden.",
            initialValue: true,
        }),
        defineField({
            name: "notFoundPage",
            title: "404 Page",
            type: "object",
            description: "What visitors see when they open a link that doesn't exist. Leave anything blank to keep the default.",
            options: { collapsible: true, collapsed: true },
            fields: [
                defineField({
                    name: "images",
                    title: "Photos",
                    type: "array",
                    of: [
                        defineArrayMember({
                            type: "image",
                            options: { hotspot: true },
                            fields: [
                                defineField({
                                    name: "alt",
                                    title: "Alt Text",
                                    type: "string",
                                    description: "Short description of the photo for screen readers.",
                                }),
                            ],
                        }),
                    ],
                    options: { layout: "grid" },
                    description:
                        "Add one or more photos; a random one is shown on each visit. Each is cropped to a 3:4 portrait in a tilted Polaroid, so drag the hotspot onto faces.",
                }),
                defineField({
                    name: "caption",
                    title: "Photo Caption",
                    type: "string",
                    description: "Handwritten-style caption under the photo (default: '404: page not found').",
                }),
                defineField({
                    name: "title",
                    title: "Headline",
                    type: "string",
                    description: "Default: 'Well, this is awkward.'",
                }),
                defineField({
                    name: "message",
                    title: "Message",
                    type: "text",
                    rows: 3,
                    description: "Text under the headline.",
                }),
            ],
        }),
    ],
})
