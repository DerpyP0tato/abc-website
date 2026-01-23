import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle, Users, Mic, Briefcase, GraduationCap, LineChart, Globe, Award, Heart } from "lucide-react"
import { client } from "@/sanity/lib/client"
import { SETTINGS_QUERY } from "@/sanity/lib/queries"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata = {
  title: "About | Asian Business Collective",
  description: "Learn about the Asian Business Collective and our mission at Binghamton University.",
}

export const revalidate = 60

export default async function AboutPage() {
  const settings = await client.fetch(SETTINGS_QUERY).catch(() => null)

  const offerings = [
    { title: "Professional Workshops", icon: Briefcase, desc: "Skill-building sessions on resume crafting, interviews, and technical tools." },
    { title: "Networking Events", icon: Users, desc: "Connect with alumni and professionals from top firms in finance, tech, and consulting." },
    { title: "Case Competitions", icon: LineChart, desc: "Sharpen your analytical and presentation skills through rigorous team-based challenges." },
    { title: "Mentorship", icon: GraduationCap, desc: "One-on-one guidance from experienced upperclassmen and successful alumni." },
    { title: "Social Impact", icon: Heart, desc: "Give back to the community through organized service events and charitable initiatives." },
    { title: "Community", icon: Mic, desc: "Social events and a supportive family atmosphere to help you thrive on campus." },
  ]

  return (
    <div className="flex flex-col">
      {/* Global Background Glow - Fixed to prevent strict section cutoffs */}
      <div className="fixed inset-0 -z-10 bg-background pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] animate-blob" />
        <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[100px] animate-blob animation-delay-4000" />
      </div>
      {/* Hero Section */}
      <section className="relative pt-8 pb-10 sm:pb-16 md:pt-12 overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 h-96 w-96 rounded-full bg-blue-100/50 blur-3xl opacity-50" />
        <div className="mx-auto max-w-4xl px-8 relative z-10 text-center sm:px-6 lg:px-8">
          <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700 mb-6">
            About Us
          </span>
          <h1 className="font-serif text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl">
            Empowering the Next Generation
          </h1>
          <p className="mt-6 text-xl leading-relaxed text-slate-600 max-w-2xl mx-auto">
            The Asian Business Collective at Binghamton University is dedicated to bridging the gap between ambition and achievement for students in business and technology.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="pt-6 pb-20 sm:pt-12 sm:pb-24">
        <div className="mx-auto max-w-7xl px-8 sm:px-6 lg:px-8">

          {/* Mission & Vision Split */}
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-start mb-24">
            <div className="bg-slate-50 rounded-3xl p-8 sm:p-12 border border-slate-100">
              <h2 className="font-serif text-3xl font-bold text-slate-900 mb-4">Our Mission</h2>
              <p className="text-lg leading-relaxed text-slate-600">
                We exist to separate potential from opportunity. By fostering a supportive
                community and providing hands-on professional development, we prepare students to confidently enter and excel in
                competitive industries. We believe representation matters, and we strive to elevate Asian voices in business leadership.
              </p>
            </div>
            <div className="space-y-8">
              <div>
                <h2 className="font-serif text-3xl font-bold text-slate-900 mb-4">Why ABC?</h2>
                <p className="text-lg leading-relaxed text-slate-600">
                  Many students feel disconnected from the professional world and uncertain about how to build meaningful
                  careers. ABC fills this gap by creating a space where students can learn from real experiences, connect
                  with active mentors, and develop practical skills that employers actually value.
                </p>
              </div>
              <div>
                <h2 className="font-serif text-3xl font-bold text-slate-900 mb-4">Who We're For</h2>
                <p className="text-lg leading-relaxed text-slate-600">
                  We welcome <strong>all students</strong> at Binghamton University who are curious, driven, and ready to grow. Whether you're a freshman exploring options or a senior refining your pitch, there is a place for you here.
                </p>
              </div>
            </div>
          </div>

          {/* Offerings Grid */}
          <div className="mb-24">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-serif text-3xl font-bold text-slate-900 sm:text-4xl">What We Offer</h2>
              <p className="mt-4 text-lg text-slate-600">
                A comprehensive suite of resources designed to accelerate your professional journey.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {offerings.map((offering) => (
                <Card key={offering.title} className="bg-white border-slate-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <offering.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="font-bold text-xl">{offering.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 leading-relaxed">
                      {offering.desc}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* OTA Section */}
          <div className="rounded-[2.5rem] bg-blue-50 px-6 py-16 sm:px-12 sm:py-24 text-center relative overflow-hidden border border-blue-100">
            <div className="absolute inset-0 bg-white/40 blur-[100px] rounded-full mix-blend-overlay" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="font-serif text-3xl font-bold text-blue-900 sm:text-4xl">Ready to launch your career?</h2>
              <p className="mt-6 text-lg text-blue-700/80 mb-10">
                Join a community of high-achievers and future leaders. Your journey starts with a single step.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row justify-center">
                <Button asChild size="lg" className="bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20">
                  <a href={settings?.joinLink || "https://forms.gle/"} target="_blank" rel="noopener noreferrer">
                    Join Our Community
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-blue-200 text-blue-700 hover:bg-blue-100 hover:text-blue-800 bg-transparent">
                  <Link href="/contact">Get in Touch</Link>
                </Button>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}
