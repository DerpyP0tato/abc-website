import type React from "react"
import type { Metadata } from "next"
import Script from "next/script"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PageWrapper } from "@/components/page-wrapper"
import { BackgroundBlobs } from "@/components/background-blobs"
import { ScrollToTop } from "@/components/scroll-to-top"
import { Preloader } from "@/components/preloader"
import { ThemeProvider } from "@/components/theme-provider"
import { client } from "@/sanity/lib/client"
import { SETTINGS_QUERY } from "@/sanity/lib/queries"
import "../globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL('https://asianbusinesscollective.org'),
  title: {
    default: "Asian Business Collective | Binghamton University",
    template: "%s | Asian Business Collective"
  },
  description:
    "Asian Business Collective is the premier Asian student organization at Binghamton University. Join our Asian club for networking, mentorship, and career development opportunities.",
  keywords: [
    "Asian Business Collective",
    "Binghamton University",
    "asian binghamton university",
    "asian binghamton",
    "asian organization binghamton",
    "asian club binghamton",
    "asian student organization",
    "business club",
    "networking",
    "mentorship",
    "career development",
    "student organization",
    "professional development",
    "case competitions",
    "workshops",
    "AAPI student group",
    "Binghamton student clubs"
  ],
  authors: [{ name: "Asian Business Collective" }],
  creator: "Asian Business Collective",
  publisher: "Asian Business Collective",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://asianbusinesscollective.org",
    siteName: "Asian Business Collective",
    title: "Asian Business Collective | Binghamton University",
    description:
      "The premier Asian student organization at Binghamton University. Join our Asian club for networking, mentorship, and professional development.",
    images: [
      {
        url: "/images/abc-logo.png",
        width: 1200,
        height: 630,
        alt: "Asian Business Collective Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Asian Business Collective | Binghamton University",
    description:
      "The premier Asian student organization at Binghamton University. Join our Asian club for networking and career development.",
    images: ["/images/abc-logo.png"],
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default async function WebsiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const settings = await client.fetch(SETTINGS_QUERY, {}, { next: { revalidate: 0 } }).catch(() => null)
  const enableDarkMode = settings?.enableDarkMode !== false // Default to true if undefined

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      enableDarkMode={enableDarkMode}
    >
      <div className={`${_geist.className} font-sans antialiased min-h-screen w-full flex flex-col overflow-x-hidden text-foreground`}>
        <Preloader>
          <ScrollToTop />
          <BackgroundBlobs />
          <Navbar enableDarkMode={enableDarkMode} />
          <main className="flex-1 w-full">
            <PageWrapper>
              {children}
            </PageWrapper>
          </main>
          <Footer />
        </Preloader>
        <Analytics />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>
      </div>
    </ThemeProvider>
  )
}
