import { uuid } from "drizzle-orm/pg-core";

import { organizationsTable } from "../organizations";
import { baseModel } from "./baseModel";

export const baseModelWithWorkspace = {
  ...baseModel,
  organizationId: uuid("organization_id")
    .references(() => organizationsTable.id)
    .notNull(),
};
