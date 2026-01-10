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
  signupUrl?: string
  signupButtonText?: string
  featured?: boolean
}

export interface TeamMember {
  _id: string
  name: string
  role: string
  linkedinUrl: string
  headshot: {
    asset: {
      _ref: string
      _type: "reference"
    }
  }
  displayOrder: number
}
