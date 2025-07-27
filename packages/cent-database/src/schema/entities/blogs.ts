import { jsonb, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import { baseModelWithOwner } from "../abstract/baseModelWithOwner";
import { length } from "zod";

const { id, ...base } = baseModelWithOwner;

export const blogsTable = pgTable("blogs", {
  ...base,
  content: text("content").notNull(),
  jsonContent: jsonb("json_content"),
  meta: jsonb("meta").$type<Record<string, any>>().default({}),
  slug: varchar("slug", { length: 1024 }).unique().primaryKey(), // id
  title: text("title").notNull(),
});

export const blogSelectSchema = createSelectSchema(blogsTable);
export const blogInsertSchema = createInsertSchema(blogsTable);

export type Blog = typeof blogsTable.$inferSelect;
export type NewBlog = typeof blogsTable.$inferInsert;
