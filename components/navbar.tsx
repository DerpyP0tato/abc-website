"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const navItems = [
  { name: "About", href: "/about" },
  { name: "Team", href: "/team" },
  { name: "Events", href: "/events" },
  { name: "Contact", href: "/contact" },
]

export function Navbar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full z-50 border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 md:h-24 items-center justify-between">
          {/* Logo on the left */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <Image
              src="/images/abc-logo.png"
              alt="ABC Logo"
              width={50}
              height={50}
              className="h-12 w-12 transition-transform group-hover:scale-105"
            />
            <span className="font-serif font-bold tracking-tight text-xl sm:text-2xl text-foreground leading-tight max-w-[200px] sm:max-w-none">Asian Business Collective</span>
          </Link>

          {/* Desktop Navigation on the right */}
          <div className="hidden items-center gap-10 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-base font-semibold transition-colors hover:text-primary ${pathname === item.href ? "text-primary" : "text-muted-foreground"
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="border-t md:hidden">
          <div className="space-y-1 px-4 pb-3 pt-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block rounded-md px-3 py-2 text-base font-medium transition-colors ${pathname === item.href
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
