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
    coverImage
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
    description
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
    description,
    signupUrl,
    signupButtonText
  }
`

export const TEAM_MEMBERS_QUERY = groq`
  *[_type == "teamMember"] | order(displayOrder asc) {
    _id,
    name,
    role,
    linkedinUrl,
    headshot,
    displayOrder
  }
`
