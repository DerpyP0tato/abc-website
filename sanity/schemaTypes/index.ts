import type { SchemaTypeDefinition } from "sanity"
import { event } from "./event"
import { teamMember } from "./teamMember"
import { teamPage } from "./teamPage"

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [event, teamMember, teamPage],
}
