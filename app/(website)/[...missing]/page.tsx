import { notFound } from "next/navigation"

// Matches the 404 page so the browser tab keeps this title after the page loads
export const metadata = {
  title: "Page Not Found",
}

// Any URL that doesn't match a real page lands here, so the site's own 404 page
// (with the navbar and footer) is shown instead of Next.js's bare default.
export default function MissingPage() {
  notFound()
}
