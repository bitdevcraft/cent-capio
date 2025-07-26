import { pgTable } from "drizzle-orm/pg-core";

import { baseModelWithWorkspace } from "../abstract/baseModelWithWorkSpace";

export const organizationInvitationsTable = pgTable(
  "organization_invitations",
  {
    ...baseModelWithWorkspace,
  }
);
