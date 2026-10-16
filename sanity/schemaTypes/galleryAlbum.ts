import { defineType, defineField, defineArrayMember } from "sanity"
import { ImagesIcon } from "@sanity/icons"

export const galleryAlbum = defineType({
  name: "galleryAlbum",
  title: "Gallery Album",
  type: "document",
  icon: ImagesIcon,
  fields: [
    defineField({
      name: "title",
      title: "Album Title",
      type: "string",
      validation: (rule) => rule.required(),
      description: "Shown as the album heading and filter on the Gallery page (e.g., 'Spring Banquet 2025').",
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      description: "Optional. Shown on the album and used to sort albums (newest first). Undated albums are sorted by when they were created.",
    }),
    defineField({
      name: "event",
      title: "Related Event",
      type: "reference",
      to: [{ type: "event" }],
      description: "Optional. Links the album to its event page.",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
      description: "Optional short blurb shown under the album title.",
    }),
    defineField({
      name: "photos",
      title: "Photos",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
              validation: (rule) => rule.required().warning("Describe the photo for screen readers."),
              description: "Short description of the photo (e.g., 'Members posing at the banquet').",
            }),
            defineField({
              name: "caption",
              title: "Caption",
              type: "string",
              description: "Optional. Shown when the photo is opened.",
            }),
          ],
        }),
      ],
      options: { layout: "grid" },
      validation: (rule) => rule.min(1),
      description: "Drag and drop multiple photos here to upload them all at once. Drag to reorder.",
    }),
    defineField({
      name: "hidden",
      title: "Hide from Gallery",
      type: "boolean",
      initialValue: false,
      description: "If enabled, this album won't appear on the website.",
    }),
  ],
  preview: {
    select: {
      title: "title",
      date: "date",
      photos: "photos",
      media: "photos.0",
      hidden: "hidden",
    },
    prepare({ title, date, photos, media, hidden }) {
      const count = photos?.length || 0
      return {
        title,
        subtitle: [date, `${count} photo${count !== 1 ? "s" : ""}`, hidden && "Hidden"].filter(Boolean).join(" • "),
        media,
      }
    },
  },
  orderings: [
    {
      title: "Date (Newest First)",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
})
