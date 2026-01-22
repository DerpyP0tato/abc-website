import { createClient } from "next-sanity"
import dotenv from "dotenv"

dotenv.config({ path: ".env.local" })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const apiVersion = "2024-01-01"

if (!process.env.SANITY_API_TOKEN) {
    console.error("Missing SANITY_API_TOKEN in .env.local")
    process.exit(1)
}

if (!projectId || !dataset) {
    console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET in .env.local")
    process.exit(1)
}

const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
})

const features = [
    {
        title: "Professional Development",
        description: "Build skills through workshops, case competitions, and corporate speaker events.",
        iconUrl: "https://unpkg.com/lucide-static@latest/icons/briefcase.svg",
    },
    {
        title: "Mentorship",
        description: "Connect with experienced professionals and alumni who guide your career path.",
        iconUrl: "https://unpkg.com/lucide-static@latest/icons/users.svg",
    },
    {
        title: "Networking",
        description: "Build meaningful relationships with peers and industry leaders.",
        iconUrl: "https://unpkg.com/lucide-static@latest/icons/network.svg",
    },
    {
        title: "Case Competitions",
        description: "Compete in real-world business challenges and showcase your analytical skills.",
        iconUrl: "https://unpkg.com/lucide-static@latest/icons/trophy.svg",
    },
]

async function seed() {
    console.log("Starting seed...")

    const featureObjects = []

    for (const feature of features) {
        console.log(`Processing ${feature.title}...`)

        // Fetch SVG
        const res = await fetch(feature.iconUrl)
        const buffer = await res.arrayBuffer()

        // Upload Asset
        console.log(`Uploading icon for ${feature.title}...`)
        const asset = await client.assets.upload("image", Buffer.from(buffer), {
            filename: `${feature.title.toLowerCase().replace(/ /g, "-")}.svg`,
            contentType: "image/svg+xml",
        })

        featureObjects.push({
            _key: Math.random().toString(36).substring(7),
            _type: "featureItem",
            title: feature.title,
            description: feature.description,
            icon: {
                _type: "image",
                asset: {
                    _type: "reference",
                    _ref: asset._id,
                },
            },
        })
    }

    const doc = {
        _id: "homePage",
        _type: "homePage",
        featureTitle: "What We Do",
        featureSubtitle: "Empowering the next generation of business leaders",
        features: featureObjects,
    }

    console.log("Checking for conflicting drafts...")
    const draft = await client.getDocument("drafts.homePage")
    if (draft) {
        console.log("Deleting conflicting draft...")
        await client.delete("drafts.homePage")
    }

    console.log("Creating homePage document...")
    await client.createOrReplace(doc)
    console.log("Done!")
}

seed().catch((err) => {
    console.error(err)
    process.exit(1)
})
