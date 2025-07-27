"use client";

import React, { useRef } from "react";
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

import BlogEditorResizable from "./blog-editor-resizable";
import { BlogEditorHandle } from "./blog-editor";
import { Button } from "@repo/ui/components/shadcn/button";
import {
  BlogFormValue,
  BlogFormSchema,
  BlogFormWithContentSchema,
} from "@/validations/blog-schema";
import axios from "axios";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { Loader } from "lucide-react";

const useCreateBlog = () => {
  return useMutation({
    mutationFn: async (payload: z.infer<typeof BlogFormWithContentSchema>) => {
      const data = await axios.post("/api/blog", payload);
      return data;
    },
  });
};

export default function BlogEditorForm() {
  const form = useForm<BlogFormValue>({
    resolver: zodResolver(BlogFormSchema),
    defaultValues: {
      title: "",
      meta: {
        name: "",
        description: "",
      },
    },
  });

  const editorRef = useRef<BlogEditorHandle>(null);

  const createBlog = useCreateBlog();
  const onSubmit = async (data: BlogFormValue) => {
    if (!editorRef.current) return;
    const content = await editorRef.current.exportValue();

    createBlog.mutate(
      { content, ...data },
      {
        onSuccess: () => {
          toast.success("Created");
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };

  return (
    <div className="grid md:grid-cols-12 gap-4 p-4">
      <div className="md:col-span-8">
        <BlogEditorResizable ref={editorRef} />
      </div>
      <div className="md:col-span-4">
        <Form {...form}>
          <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="border rounded p-4 grid gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="title" {...field} />
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
                      <Input placeholder="name" {...field} />
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
                      <Textarea placeholder="description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={createBlog.isPending}
            >
              {createBlog.isPending ? (
                <>
                  <Loader className="animate-spin" /> Creating
                </>
              ) : (
                "Create"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
