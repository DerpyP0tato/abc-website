import { defineField, defineType } from "sanity"
import { HomeIcon } from "@sanity/icons"

export const homePage = defineType({
    name: "homePage",
    title: "Home Page",
    type: "document",
    icon: HomeIcon,
    fields: [
        defineField({
            name: "featureTitle",
            title: "Feature Section Title",
            type: "string",
            initialValue: "What We Do",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "featureSubtitle",
            title: "Feature Section Subtitle",
            type: "string",
            initialValue: "Empowering the next generation of business leaders",
        }),
        defineField({
            name: "features",
            title: "Features",
            type: "array",
            of: [
                {
                    name: "featureItem",
                    type: "object",
                    title: "Feature",
                    fields: [
                        defineField({
                            name: "title",
                            title: "Title",
                            type: "string",
                            validation: (rule) => rule.required(),
                        }),
                        defineField({
                            name: "description",
                            title: "Description",
                            type: "text",
                            rows: 3,
                            validation: (rule) => rule.required(),
                        }),
                        defineField({
                            name: "icon",
                            title: "Icon",
                            type: "image",
                            description: "Upload an SVG or PNG icon.",
                            options: {
                                hotspot: true,
                            },
                            validation: (rule) => rule.required(),
                        }),
                    ],
                },
            ],
            validation: (rule) => rule.max(4),
        }),
    ],
})
