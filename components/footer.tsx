import Link from "next/link"
import { Instagram, Linkedin, Mail } from "lucide-react"
import { client } from "@/sanity/lib/client"
import { SETTINGS_QUERY } from "@/sanity/lib/queries"

export async function Footer() {
  const settings = await client.fetch(SETTINGS_QUERY).catch(() => null)

  return (
    <footer className="border-t bg-muted/50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="font-serif text-lg font-semibold">Asian Business Collective</h3>
            <p className="mt-2 text-sm text-muted-foreground">Binghamton University</p>
          </div>

          <div>
            <h4 className="text-sm font-medium">Quick Links</h4>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">
                  About
                </Link>
              </li>
              <li>
                <Link href="/team" className="text-sm text-muted-foreground hover:text-foreground">
                  Team
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-sm text-muted-foreground hover:text-foreground">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium">Connect With Us</h4>
            <div className="mt-4 flex gap-4">
              {settings?.instagram && (
                <a
                  href={settings.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              )}
              {settings?.linkedin && (
                <a
                  href={settings.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              )}
              {settings?.email && (
                <a
                  href={`mailto:${settings.email}`}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Mail className="h-5 w-5" />
                </a>
              )}
              {!settings?.instagram && !settings?.linkedin && !settings?.email && (
                <p className="text-sm text-muted-foreground">Contact info not set.</p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Asian Business Collective. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
