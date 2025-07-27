import z from "zod";

export const BlogFormSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),

  meta: z.object({
    name: z.string(),
    description: z.string(),
  }),

  // tags: z.string().array(),
  // status: z.string(),
  // visibility: z.string(),
});

export const BlogFormWithContentSchema = BlogFormSchema.extend({
  content: z.any(),
});

export type BlogFormValue = z.infer<typeof BlogFormSchema>;
