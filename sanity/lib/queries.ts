import { groq } from "next-sanity"

export const TEAM_PAGE_QUERY = groq`*[_type == "teamPage"][0]{
  placementTitle,
  placementDescription,
  companies
}`

export const EVENTS_UPCOMING_QUERY = groq`
  *[_type == "event" && startDateTime >= now()] | order(startDateTime asc) {
    _id,
    title,
    slug,
    startDateTime,
    endDateTime,
    location,
    category,
    coverImage,
    category,
    coverImage,
    shortDescription,
    featured,
    enableGoogleCalendar,
    allDay
  }
`

export const EVENTS_PAST_QUERY = groq`
  *[_type == "event" && startDateTime < now()] | order(startDateTime desc) {
    _id,
    title,
    slug,
    startDateTime,
    endDateTime,
    location,
    category,
    category,
    coverImage,
    shortDescription,
    enableGoogleCalendar,
    allDay
  }
`

export const EVENT_FEATURED_QUERY = groq`
  *[_type == "event" && featured == true && startDateTime >= now()] | order(startDateTime asc) [0] {
    _id,
    title,
    slug,
    startDateTime,
    endDateTime,
    location,
    category,
    coverImage,
    coverImage,
    description,
    shortDescription,
    enableGoogleCalendar,
    allDay
  }
`

export const EVENT_BY_SLUG_QUERY = groq`
  *[_type == "event" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    startDateTime,
    endDateTime,
    location,
    category,
    coverImage,
    coverImage,
    description,
    shortDescription,
    signupUrl,
    signupButtonText,
    enableGoogleCalendar,
    allDay
  }
`

export const TEAM_MEMBERS_QUERY = groq`
  *[_type == "teamMember"] | order(displayOrder asc) {
    _id,
    name,
    slug,
    role,
    linkedinUrl,
    headshot,
    displayOrder
  }
`

export const TEAM_MEMBER_BY_SLUG_QUERY = groq`
  *[_type == "teamMember" && (slug.current == $slug || _id == $slug)][0] {
    _id,
    name,
    slug,
    role,
    linkedinUrl,
    headshot,
    email,
    majorYear,
    hometown,
    campusInvolvements,
    professionalExperience,
    interests
  }
`

export const PAST_BOARDS_QUERY = groq`
  *[_type == "pastExecutiveBoard"] | order(year desc) {
    _id,
    year,
    members[] {
      name,
      linkedinUrl
    }
  }
`

export const SETTINGS_QUERY = groq`
  *[_type == "settings"][0] {
    joinLink,
    instagram,
    linkedin,
    email
  }
`

export const HOME_PAGE_QUERY = groq`
  * [_type == "homePage"][0] {
    featureTitle,
    featureSubtitle,
    features[] {
      title,
      description,
      icon
    }
  }
`

export const LINK_TREE_QUERY = groq`
  * [_type == "linkTree"][0] {
    title,
    description,
    profileImage,
    sections[] {
      sectionTitle,
      links[] {
        title,
        url,
        image,
        archived
      }
    }
  }
`

export const ABOUT_PAGE_QUERY = groq`
  *[_type == "aboutPage"][0] {
    heroPill,
    heroTitle,
    heroDescription,
    missionTitle,
    missionContent,
    whyTitle,
    whyContent,
    whoTitle,
    whoContent,
    foundingYear,
    foundingTitle,
    foundingParagraphs,
    foundingImage,
    offeringsTitle,
    offeringsDescription,
    offerings[] {
      title,
      description,
      icon
    },
    ctaTitle,
    ctaDescription
  }
`
