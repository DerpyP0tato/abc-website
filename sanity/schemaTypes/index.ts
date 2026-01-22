import type { SchemaTypeDefinition } from "sanity"
import { event } from "./event"
import { teamMember } from "./teamMember"
import { teamPage } from "./teamPage"
import { settings } from "./settings"
import { homePage } from "./homePage"
import { linkTree } from "./linkTree"

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [event, teamMember, teamPage, settings, homePage, linkTree],
}
