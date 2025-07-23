"use client";

import React, { useRef } from "react";
import BlogEditor, { BlogEditorHandle } from "./blog-editor";
import { Button } from "@repo/ui/components/shadcn/button";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/shadcn/form";
import { Input } from "@repo/ui/components/shadcn/input";
import { Textarea } from "@repo/ui/components/shadcn/textarea";

import slugify from "slugify";
import { nanoid } from "platejs";

const BlogFormSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  slug: z
    .string()
    .min(1, { message: "Slug is required" })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: "Slug may only contain lowercase letters, numbers, and hyphens",
    }),
  meta: z.object({
    name: z.string(),
    description: z.string(),
  }),
  tags: z.string().array(),
  status: z.string(),
  visibility: z.string(),
});

type BlogFormValue = z.infer<typeof BlogFormSchema>;

export default function BlogEditorForm() {
  const form = useForm<BlogFormValue>({
    resolver: zodResolver(BlogFormSchema),
    defaultValues: {
      title: "",
      slug: "",
    },
  });

  const randomId = nanoid(12);

  const titleValue = form.watch("title");

  React.useEffect(() => {
    const newSlug = slugify(titleValue || "", {
      lower: true,
      strict: true, // strip special chars
      remove: /[*+~.()'"!:@]/g,
    });
    form.setValue("slug", newSlug, {
      shouldValidate: !!newSlug,
    });
  }, [titleValue, form]);

  const editorRef = useRef<BlogEditorHandle>(null);

  const handleExport = async () => {
    if (!editorRef.current) return;
    const html = await editorRef.current.exportToHtml();
    console.log(html);
  };

  return (
    <div className="grid md:grid-cols-12 gap-4 p-4">
      <div className="md:col-span-8">
        <BlogEditor ref={editorRef} />
      </div>
      <div className="md:col-span-4">
        <Form {...form}>
          <form action="" className="grid gap-4">
            <div className="border rounded p-4 grid gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="title"
                        {...field}
                        className="shadow-none border-muted"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="slug"
                        {...field}
                        className="shadow-none border-muted"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="border rounded p-4 grid gap-4">
              <p>Meta</p>
              <FormField
                control={form.control}
                name="meta.name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="name"
                        {...field}
                        className="shadow-none border-muted"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="meta.description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="description"
                        {...field}
                        className="shadow-none border-muted"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
