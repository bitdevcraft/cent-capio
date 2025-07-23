// BlogEditor.tsx
"use client";

import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { Toaster } from "@repo/ui/components/shadcn/sonner";
import { Plate, usePlateEditor } from "platejs/react";
import { EditorKit } from "@repo/ui/components/platejs/plugins/editor-kit";
import { SettingsDialog } from "@repo/ui/components/platejs/editor/settings-dialog";
import { EditorContainer, Editor } from "@repo/ui/components/platejs/ui/editor";
import { BaseEditorKit } from "@repo/ui/components/platejs/plugins/editor-base-kit";
import { EditorStatic } from "@repo/ui/components/platejs/ui/editor-static";
import { createSlateEditor, serializeHtml } from "platejs";

import { TocKit } from "@repo/ui/components/platejs/plugins/toc-kit";

const siteUrl = "https://platejs.org";

// 1. Define the methods you want to expose
export interface BlogEditorHandle {
  exportToHtml: () => Promise<string>;
}

// 2. Props for the component (none in this case)
export interface BlogEditorProps {}

// 3. forwardRef with types <HandleType, PropsType>
const BlogEditor = forwardRef<BlogEditorHandle, BlogEditorProps>((_, ref) => {
  const editor = usePlateEditor({
    plugins: [...EditorKit, ...TocKit],
  });

  // Function we’ll expose
  const exportToHtml = async (): Promise<string> => {
    const editorStatic = createSlateEditor({
      plugins: BaseEditorKit,
      value: editor.children,
    });

    const editorHtml = await serializeHtml(editorStatic, {
      editorComponent: EditorStatic,
      props: { style: { padding: "0 calc(50% - 350px)" } },
    });

    const tailwindCss = `<link rel="stylesheet" href="${siteUrl}/tailwind.css">`;
    const katexCss = `
<link rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/katex@0.16.18/dist/katex.css"
      integrity="sha384-9PvLvaiSKCPkFKB1ZsEoTjgnJn+O3KvEwtsz37/XrkYft3DTk2gHdYvd9oWgW3tV"
      crossorigin="anonymous">`;

    const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="color-scheme" content="light dark" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400..700&family=JetBrains+Mono:wght@400..700&display=swap"
      rel="stylesheet"
    />
    ${tailwindCss}
    ${katexCss}
    <style>
      :root {
        --font-sans: 'Inter', 'Inter Fallback';
        --font-mono: 'JetBrains Mono', 'JetBrains Mono Fallback';
      }
    </style>
  </head>
  <body>
    ${editorHtml}
  </body>
</html>`;

    return html;
  };

  // 4. Expose exportToHtml via the ref
  useImperativeHandle(
    ref,
    () => ({
      exportToHtml,
    }),
    [editor.children]
  );

  return (
    <div className="">
      <Plate editor={editor}>
        <EditorContainer className="border rounded">
          <Editor variant="default" className="h-[70vh] mt-20" />
        </EditorContainer>
        <SettingsDialog />
      </Plate>
      <Toaster />
    </div>
  );
});

BlogEditor.displayName = "BlogEditor";

export default BlogEditor;
