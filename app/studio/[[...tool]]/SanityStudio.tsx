'use client'

import { NextStudio } from "next-sanity/studio"
import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { visionTool } from "@sanity/vision"
import { schema } from "@/sanity/schemaTypes"
import { structure } from "@/sanity/structure"

const config = defineConfig({
    name: "default",
    title: "Asian Business Collective",
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
    basePath: "/studio",
    plugins: [structureTool({ structure }), visionTool()],
    schema,
})

export function SanityStudio() {
    return <NextStudio config={config} basePath="/studio" />
}
