import { CalendarIcon, UsersIcon } from "@sanity/icons"
import type { StructureBuilder } from "sanity/structure"

export const structure = (S: StructureBuilder) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site Settings")
        .child(S.document().schemaType("settings").documentId("settings")),
      S.divider(),
      S.listItem()
        .title("Home Page")
        .child(S.document().schemaType("homePage").documentId("homePage")),
      S.listItem()
        .title("Events")
        .icon(CalendarIcon)
        .child(
          S.list()
            .title("Events")
            .items([
              S.listItem()
                .title("Upcoming Events")
                .icon(CalendarIcon)
                .child(
                  S.documentList()
                    .title("Upcoming Events")
                    .filter('_type == "event" && startDateTime >= now()')
                    .defaultOrdering([{ field: "startDateTime", direction: "asc" }]),
                ),
              S.listItem()
                .title("Past Events")
                .icon(CalendarIcon)
                .child(
                  S.documentList()
                    .title("Past Events")
                    .filter('_type == "event" && startDateTime < now()')
                    .defaultOrdering([{ field: "startDateTime", direction: "desc" }]),
                ),
              S.listItem()
                .title("Featured Events")
                .icon(CalendarIcon)
                .child(
                  S.documentList()
                    .title("Featured Events")
                    .filter('_type == "event" && featured == true')
                    .defaultOrdering([{ field: "startDateTime", direction: "asc" }]),
                ),
              S.divider(),
              S.listItem()
                .title("All Events")
                .icon(CalendarIcon)
                .child(
                  S.documentTypeList("event")
                    .title("All Events")
                    .defaultOrdering([{ field: "startDateTime", direction: "desc" }]),
                ),
            ]),
        ),
      S.divider(),
      S.listItem()
        .title("Team Members")
        .icon(UsersIcon)
        .child(
          S.documentTypeList("teamMember")
            .title("Team Members")
            .defaultOrdering([{ field: "displayOrder", direction: "asc" }]),
        ),
      S.divider(),
      S.listItem()
        .title("Placement Section")
        .child(S.document().schemaType("teamPage").documentId("teamPage")),
    ])
