import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

import { baseModel } from "../abstract/baseModel";
import { usersTable } from "../users";
import { organizationsTable } from "./organizations";
import { relations } from "drizzle-orm";
import { length } from "zod";

export const organizationMembersTable = pgTable("organization_member", {
  ...baseModel,
  organizationId: uuid("organization_id")
    .references(() => organizationsTable.id)
    .notNull(),
  userId: uuid("user_id")
    .references(() => usersTable.id)
    .notNull(),
  role: varchar("role", { length: 255 }),
});

export const organizationMemberRelations = relations(
  organizationMembersTable,
  ({ one }) => ({
    organization: one(organizationsTable, {
      fields: [organizationMembersTable.organizationId],
      references: [organizationsTable.id],
    }),
    user: one(usersTable, {
      fields: [organizationMembersTable.userId],
      references: [usersTable.id],
    }),
  })
);
