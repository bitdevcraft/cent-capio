import { db } from "@repo/cent-database";
import * as schema from "@repo/cent-database/schema";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export const database = drizzleAdapter(db, {
  provider: "pg",
  schema: {
    ...schema,
    account: schema.userAccountsTable,
    invitation: schema.organizationInvitationsTable,
    member: schema.organizationMembersTable,
    organization: schema.organizationsTable,
    session: schema.userSessionsTable,
    user: schema.usersTable,
    verification: schema.userVerificationsTable,
  },
});
