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
    email,
    enableDarkMode
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
    foundingContent,
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

const GALLERY_ALBUM_FIELDS = groq`
  _id,
  title,
  date,
  description,
  "event": event->{ title, slug },
  // Skip photo slots whose upload never finished
  photos[defined(asset)] {
    _key,
    alt,
    caption,
    asset,
    hotspot,
    crop,
    "dimensions": asset->metadata.dimensions { width, height },
    "color": asset->metadata.palette.dominant.background
  }
`

export const GALLERY_ALBUMS_QUERY = groq`
  *[_type == "galleryAlbum" && hidden != true && count(photos[defined(asset)]) > 0] | order(coalesce(date, _createdAt) desc) {
    ${GALLERY_ALBUM_FIELDS}
  }
`

export const GALLERY_RECENT_ALBUMS_QUERY = groq`
  *[_type == "galleryAlbum" && hidden != true && count(photos[defined(asset)]) > 0] | order(coalesce(date, _createdAt) desc) [0...3] {
    ${GALLERY_ALBUM_FIELDS}
  }
`

export const EVENT_ALBUMS_QUERY = groq`
  *[_type == "galleryAlbum" && hidden != true && count(photos[defined(asset)]) > 0 && event._ref == $eventId] | order(coalesce(date, _createdAt) desc) {
    ${GALLERY_ALBUM_FIELDS}
  }
`

export const NOT_FOUND_PAGE_QUERY = groq`
  *[_type == "settings"][0].notFoundPage {
    "images": images[defined(asset)],
    caption,
    title,
    message
  }
`
