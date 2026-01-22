import { defineType, defineField } from "sanity"
import { CalendarIcon } from "@sanity/icons"

export const event = defineType({
  name: "event",
  title: "Event",
  type: "document",
  icon: CalendarIcon,
  fields: [
    defineField({
      name: "title",
      title: "Event Title",
      type: "string",
      validation: (rule) => rule.required(),
      description: "Event title shown on the Events page and the event page header.",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
      description: "Auto-generated URL slug (e.g., /events/case-interview-workshop).",
    }),
    defineField({
      name: "startDateTime",
      title: "Start Date & Time",
      type: "datetime",
      validation: (rule) => rule.required(),
      description: "Start date/time used to sort upcoming/past events.",
    }),
    defineField({
      name: "endDateTime",
      title: "End Date & Time",
      type: "datetime",
      description: "Optional end time.",
    }),
    defineField({
      name: "allDay",
      title: "All Day Event",
      type: "boolean",
      initialValue: false,
      description: "If enabled, time will be hidden and calendar event will be set to all-day.",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      validation: (rule) => rule.required(),
      description: "Building/room or virtual link label (e.g., 'CW 120' or 'Zoom').",
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: {
        hotspot: true,
      },
      description: "Optional banner/flyer image for the event page.",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading 2", value: "h2" },
            { title: "Heading 3", value: "h3" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                  },
                ],
              },
            ],
          },
        },
      ],
      validation: (rule) => rule.required(),
      description: "Main event description (agenda, speakers, what to expect).",
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      rows: 3,
      description: "Brief summary shown on the event card (e.g. 'Learn about strategy consulting...').",
    }),
    defineField({
      name: "signupUrl",
      title: "Signup URL",
      type: "url",
      description: "Optional Google Forms link. If provided, a Sign Up button will appear on the event page.",
    }),
    defineField({
      name: "signupButtonText",
      title: "Signup Button Text",
      type: "string",
      initialValue: "Sign Up",
      description: "Optional custom CTA text (defaults to 'Sign Up').",
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
      description: "If true, this event can be highlighted on the Home page.",
    }),
    defineField({
      name: "enableGoogleCalendar",
      title: "Enable 'Add to Google Calendar'",
      type: "boolean",
      initialValue: false,
      description: "If enabled, an 'Add to Calendar' button will appear on the event card.",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Workshop", value: "workshop" },
          { title: "Panel", value: "panel" },
          { title: "Networking", value: "networking" },
          { title: "Social", value: "social" },
          { title: "Case Competition", value: "caseCompetition" },
          { title: "Other", value: "other" },
        ],
        layout: "dropdown",
      },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      date: "startDateTime",
      media: "coverImage",
      featured: "featured",
      shortDescription: "shortDescription",
    },
    prepare(selection) {
      const { title, date, featured } = selection
      const dateStr = date ? new Date(date).toLocaleDateString() : "No date"
      return {
        title: title,
        subtitle: `${dateStr}${featured ? " • Featured" : ""}`,
        media: selection.media,
      }
    },
  },
  orderings: [
    {
      title: "Start Date (Newest First)",
      name: "startDateDesc",
      by: [{ field: "startDateTime", direction: "desc" }],
    },
    {
      title: "Start Date (Oldest First)",
      name: "startDateAsc",
      by: [{ field: "startDateTime", direction: "asc" }],
    },
  ],
})
