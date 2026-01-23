import { config } from "dotenv"
import { createClient } from "@sanity/client"

// Load .env.local
config({ path: ".env.local" })

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
    token: process.env.SANITY_API_TOKEN,
    apiVersion: "2024-01-01",
    useCdn: false,
})

async function seedAboutPage() {
    const aboutPageData = {
        _id: "aboutPage",
        _type: "aboutPage",
        heroPill: "About Us",
        heroTitle: "Empowering the Next Generation",
        heroDescription:
            "The Asian Business Collective at Binghamton University is dedicated to bridging the gap between ambition and achievement for students in business and technology.",
        missionTitle: "Our Mission",
        missionContent:
            "We exist to separate potential from opportunity. By fostering a supportive community and providing hands-on professional development, we prepare students to confidently enter and excel in competitive industries. We believe representation matters, and we strive to elevate Asian voices in business leadership.",
        whyTitle: "Why ABC?",
        whyContent:
            "Many students feel disconnected from the professional world and uncertain about how to build meaningful careers. ABC fills this gap by creating a space where students can learn from real experiences, connect with active mentors, and develop practical skills that employers actually value.",
        whoTitle: "Who We're For",
        whoContent:
            "We welcome all students at Binghamton University who are curious, driven, and ready to grow. Whether you're a freshman exploring options or a senior refining your pitch, there is a place for you here.",
        foundingYear: "Est. 2025",
        foundingTitle: "Founding Story",
        foundingParagraphs: [
            "The Asian Business Collective wasn't born in a boardroom. It began in 2025 over a hotpot dinner with Maxwell Chan (SOM '28), Genesis Li (SOM '28), and Ellie Park (SOM '28)—a group of friends sharing a meal and a common realization: there was a significant gap in active Asian representation within the business world.",
            'We saw talented peers being boxed in by the "model minority" myth—expected to be quiet workers rather than vocal leaders. We knew we had to change that narrative.',
            "What started as a conversation over dinner has grown into a movement to empower the next generation of leaders to break ceilings, speak up, and take their place at the table.",
        ],
        offeringsTitle: "What We Offer",
        offeringsDescription:
            "A comprehensive suite of resources designed to accelerate your professional journey.",
        offerings: [
            {
                _key: "1",
                title: "Professional Workshops",
                icon: "Briefcase",
                description:
                    "Skill-building sessions on resume crafting, interviews, and technical tools.",
            },
            {
                _key: "2",
                title: "Networking Events",
                icon: "Users",
                description:
                    "Connect with alumni and professionals from top firms in finance, tech, and consulting.",
            },
            {
                _key: "3",
                title: "Case Competitions",
                icon: "LineChart",
                description:
                    "Sharpen your analytical and presentation skills through rigorous team-based challenges.",
            },
            {
                _key: "4",
                title: "Mentorship",
                icon: "GraduationCap",
                description:
                    "One-on-one guidance from experienced upperclassmen and successful alumni.",
            },
            {
                _key: "5",
                title: "Social Impact",
                icon: "Heart",
                description:
                    "Give back to the community through organized service events and charitable initiatives.",
            },
            {
                _key: "6",
                title: "Community",
                icon: "Mic",
                description:
                    "Social events and a supportive family atmosphere to help you thrive on campus.",
            },
        ],
        ctaTitle: "Ready to launch your career?",
        ctaDescription:
            "Join a community of high-achievers and future leaders. Your journey starts with a single step.",
    }

    try {
        const result = await client.createOrReplace(aboutPageData)
        console.log("✅ About page seeded successfully:", result._id)
    } catch (error) {
        console.error("❌ Error seeding about page:", error)
    }
}

seedAboutPage()
