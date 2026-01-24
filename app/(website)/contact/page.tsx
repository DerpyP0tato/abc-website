import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Instagram, Linkedin } from "lucide-react"
import { ContactForm } from "@/components/contact-form"
import { client } from "@/sanity/lib/client"
import { SETTINGS_QUERY } from "@/sanity/lib/queries"

export const revalidate = 60

export const metadata = {
  title: "Contact Us - Get in Touch | Asian Business Collective",
  description: "Contact Asian Business Collective at Binghamton University. Reach out for membership inquiries, partnerships, or questions about our events and programs.",
}

export default async function ContactPage() {
  const settings = await client.fetch(SETTINGS_QUERY).catch(() => null)

  return (
    <div className="flex flex-col">
      <section className="pt-8 pb-14 w-full md:pt-12">
        <div className="mx-auto max-w-4xl px-8 text-center sm:px-6 lg:px-8">
          <h1 className="font-serif text-5xl font-bold tracking-tight sm:text-6xl">Get in Touch</h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Have questions? Want to get involved? We'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="py-8 sm:py-12">
        <div className="mx-auto max-w-5xl px-8 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-1">
              <div className="text-center lg:text-left">
                <h2 className="font-serif text-2xl font-semibold">Contact Information</h2>
                <p className="mt-2 text-muted-foreground">Reach out through any of these channels.</p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Email</CardTitle>
                </CardHeader>
                <CardContent>
                  {settings?.email ? (
                    <a
                      href={`mailto:${settings.email}`}
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                    >
                      <Mail className="h-4 w-4" />
                      {settings.email}
                    </a>
                  ) : (
                    <p className="text-sm text-muted-foreground">Not set</p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Social Media</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {settings?.instagram && (
                    <a
                      href={settings.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                    >
                      <Instagram className="h-4 w-4" />
                      Instagram
                    </a>
                  )}
                  {settings?.linkedin && (
                    <a
                      href={settings.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                    >
                      <Linkedin className="h-4 w-4" />
                      LinkedIn
                    </a>
                  )}
                  {!settings?.instagram && !settings?.linkedin && (
                    <p className="text-sm text-muted-foreground">Not set</p>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
