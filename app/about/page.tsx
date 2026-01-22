import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { client } from "@/sanity/lib/client"
import { SETTINGS_QUERY } from "@/sanity/lib/queries"

export const metadata = {
  title: "About | Asian Business Collective",
  description: "Learn about the Asian Business Collective and our mission at Binghamton University.",
}

export const revalidate = 60

export default async function AboutPage() {
  const settings = await client.fetch(SETTINGS_QUERY).catch(() => null)

  const offerings = [
    "Professional workshops and skill-building sessions",
    "Networking events with industry professionals",
    "Case competitions to sharpen analytical thinking",
    "Mentorship from experienced alumni and corporate partners",
    "Career development resources and guidance",
    "Community of driven, like-minded students",
  ]

  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-b from-muted/50 to-background py-20 sm:py-32">
        <div className="mx-auto max-w-4xl px-8 sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl">About ABC</h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            The Asian Business Collective at Binghamton University is dedicated to empowering students with the skills,
            connections, and opportunities needed to succeed in business and technology careers.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-8 sm:px-6 lg:px-8">
          <div className="space-y-12">
            <div>
              <h2 className="font-serif text-3xl font-semibold">Our Mission</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                We exist to bridge the gap between academic learning and professional success. By fostering a supportive
                community and providing hands-on opportunities, we prepare students to confidently enter and excel in
                the business world.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-3xl font-semibold">Why ABC?</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Many students feel disconnected from the professional world and uncertain about how to build meaningful
                careers. ABC fills this gap by creating a space where students can learn from real experiences, connect
                with mentors, and develop practical skills that employers value.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-3xl font-semibold">What We Offer</h2>
              <ul className="mt-6 space-y-3">
                {offerings.map((offering) => (
                  <li key={offering} className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span className="text-muted-foreground">{offering}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-3xl font-semibold">Who We're For</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                ABC welcomes all students at Binghamton University who are passionate about business, technology, and
                professional growth. Whether you're exploring career options, building your network, or sharpening
                specific skills, you'll find a home here.
              </p>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg">
              <a href={settings?.joinLink || "https://forms.gle/"} target="_blank" rel="noopener noreferrer">
                Join Our Community
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
