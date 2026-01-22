import type { PortableTextBlock } from "sanity"

export interface Event {
  _id: string
  title: string
  slug: {
    current: string
  }
  startDateTime: string
  endDateTime?: string
  location: string
  category: string
  coverImage?: {
    asset: {
      _ref: string
      _type: "reference"
    }
  }
  description?: PortableTextBlock[]
  shortDescription?: string
  signupUrl?: string
  signupButtonText?: string
  featured?: boolean
  enableGoogleCalendar?: boolean
  allDay?: boolean
}

export interface TeamMember {
  _id: string
  name: string
  slug: {
    current: string
  }
  role: string
  linkedinUrl: string
  headshot: {
    asset: {
      _ref: string
      _type: "reference"
    }
  }
  email?: string
  majorYear?: string
  hometown?: string
  campusInvolvements?: string
  professionalExperience?: string
  interests?: string
  displayOrder: number
}
