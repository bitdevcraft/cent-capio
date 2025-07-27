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
import {
  createSlateEditor,
  PlateStatic,
  serializeHtml,
  SlateEditor,
} from "platejs";

import { TocKit } from "@repo/ui/components/platejs/plugins/toc-kit";
import { Button } from "@repo/ui/components/shadcn/button";
import { createHtmlDocument } from "@repo/ui/lib/create-html-document";
import { demovalue } from "../../blog/data";

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
    plugins: EditorKit,
    value: demovalue,
  });

  const [previewEditor, setPreviewEditor] = React.useState<SlateEditor>();

  const loadPreview = () => {
    console.log(JSON.stringify(editor.children));
    setPreviewEditor(
      createSlateEditor({
        plugins: BaseEditorKit,
        value: editor.children,
      })
    );
  };

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
    const katexCDN = `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.18/dist/katex.css" integrity="sha384-9PvLvaiSKCPkFKB1ZsEoTjgnJn+O3KvEwtsz37/XrkYft3DTk2gHdYvd9oWgW3tV" crossorigin="anonymous">`;

    const html = createHtmlDocument({ editorHtml, tailwindCss, katexCDN });

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
      <Button onClick={loadPreview}></Button>
      {previewEditor && <PlateStatic editor={previewEditor} />}
    </div>
  );
});

BlogEditor.displayName = "BlogEditor";

export default BlogEditor;
