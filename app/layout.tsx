import type React from "react"
import type { Metadata } from "next"
import Script from "next/script"
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
      <body className={`${_geist.className} ${_geistMono.variable} font-sans antialiased min-h-screen w-full flex flex-col overflow-x-hidden`} suppressHydrationWarning>
        <Navbar />
        <main className="flex-1 w-full">
          {children}
        </main>
        <Footer />
        <Analytics />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-LD19L3XTKP"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-LD19L3XTKP');
          `}
        </Script>
      </body>
    </html>
  )
}
