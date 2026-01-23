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

export type TeamPageData = {
  placementTitle: string
  placementDescription: string
  companies: Array<{
    name: string
    logo: any
  }>
}

export type PastExecutiveBoard = {
  _id: string
  year: string
  members: Array<{
    name: string
    linkedinUrl?: string
  }>
}

export type AboutPageData = {
  heroPill?: string
  heroTitle?: string
  heroDescription?: string
  missionTitle?: string
  missionContent?: string
  whyTitle?: string
  whyContent?: string
  whoTitle?: string
  whoContent?: string
  foundingYear?: string
  foundingTitle?: string
  foundingParagraphs?: string[]
  foundingImage?: {
    asset: {
      _ref: string
      _type: "reference"
    }
  }
  offeringsTitle?: string
  offeringsDescription?: string
  offerings?: Array<{
    title: string
    description: string
    icon: string
  }>
  ctaTitle?: string
  ctaDescription?: string
}
