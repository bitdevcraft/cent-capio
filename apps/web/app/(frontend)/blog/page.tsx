import { BaseEditorKit } from "@repo/ui/components/platejs/plugins/editor-base-kit";
import { createSlateEditor, createStaticEditor, PlateStatic } from "platejs";
import { InteractiveViewer } from "./interactive-viewer";
import React from "react";
import Script from "next/script";
import { demovalue } from "./data";

const editor = createStaticEditor({
  plugins: BaseEditorKit,
  value: demovalue,
  options: {},
});

// Render statically
export default async function Home() {
  return (
    <>
      <script src="/accordionScript.js" />
      <script src="/buttonScrollToScript.js" />
      <script src="/codeBlockScript.js" />
      <div className="grid grid-cols-2 gap-4">
        {/* Pure static rendering - no interactivity */}
        <div>
          <h2>Static View (Server Rendered)</h2>
          <PlateStatic editor={editor} />
        </div>
        {/* Interactive view - rendered on client */}
        <div>
          <h2>Interactive View</h2>
          <InteractiveViewer value={editor.children} />
        </div>
      </div>
    </>
  );
}
