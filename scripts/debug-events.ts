
import { createClient } from "next-sanity"

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: "2024-01-01",
    useCdn: false,
    token: process.env.SANITY_API_TOKEN, // Optional if dataset is public
})

async function main() {
    console.log("Fetching events...")
    try {
        const events = await client.fetch(`*[_type == "event"]{
      _id,
      title,
      "slug": slug.current,
      startDateTime
    }`)

        console.log("Events found:", events.length)
        events.forEach((event: any) => {
            console.log(`- [${event.title}] Slug: '${event.slug}' (ID: ${event._id})`)
        })
    } catch (error) {
        console.error("Error fetching events:", error)
    }
}

main()
