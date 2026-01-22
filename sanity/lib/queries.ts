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
    featured
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
    shortDescription
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
    shortDescription
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
    signupButtonText
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

export const SETTINGS_QUERY = groq`
  *[_type == "settings"][0] {
    joinLink,
    instagram,
    linkedin,
    email
  }
`
