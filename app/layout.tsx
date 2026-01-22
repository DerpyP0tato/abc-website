import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Asian Business Collective | Binghamton University",
  description:
    "Connecting students to careers in business and technology through mentorship, events, and case competitions.",
  generator: "v0.app",
  icons: {
    icon: "/images/abc-logo.png",
    apple: "/images/abc-logo.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased min-h-screen w-full flex flex-col overflow-x-hidden`} suppressHydrationWarning>
        <Navbar />
        <main className="flex-1 w-full">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
