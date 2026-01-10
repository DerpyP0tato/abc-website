import { defineType, defineField } from "sanity"
import { UsersIcon } from "@sanity/icons"

export const teamMember = defineType({
  name: "teamMember",
  title: "Team Member",
  type: "document",
  icon: UsersIcon,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      validation: (rule) => rule.required(),
      description: "Position/title in the organization (e.g., President, Vice President).",
    }),
    defineField({
      name: "linkedinUrl",
      title: "LinkedIn URL",
      type: "url",
      validation: (rule) =>
        rule.required().uri({
          scheme: ["http", "https"],
        }),
      description: "Full LinkedIn profile URL.",
    }),
    defineField({
      name: "headshot",
      title: "Headshot",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
      description: "Headshot should be square (1:1 ratio), at least 600x600 pixels.",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      description: "University or professional email address.",
    }),
    defineField({
      name: "majorYear",
      title: "Major & Year",
      type: "string",
      description: "e.g. 'Food Science and Environment & Sustainability, 2027'",
    }),
    defineField({
      name: "hometown",
      title: "Hometown",
      type: "string",
      description: "e.g. 'Glen Ellyn, Illinois'",
    }),
    defineField({
      name: "campusInvolvements",
      title: "Campus Involvements",
      type: "text",
      rows: 3,
      description: "List of clubs and organizations.",
    }),
    defineField({
      name: "professionalExperience",
      title: "Professional Experience",
      type: "text",
      rows: 3,
      description: "Internships and work experience.",
    }),
    defineField({
      name: "interests",
      title: "Interests",
      type: "string",
      description: "Hobbies and personal interests.",
    }),
    defineField({
      name: "displayOrder",
      title: "Display Order",
      type: "number",
      validation: (rule) => rule.required().min(0),
      description: "Lower numbers appear first. Use multiples of 10 for easy reordering.",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "role",
      media: "headshot",
      order: "displayOrder",
    },
    prepare(selection) {
      const { title, subtitle, order } = selection
      return {
        title: title,
        subtitle: `${subtitle} • Order: ${order}`,
        media: selection.media,
      }
    },
  },
  orderings: [
    {
      title: "Display Order",
      name: "displayOrder",
      by: [{ field: "displayOrder", direction: "asc" }],
    },
  ],
})
