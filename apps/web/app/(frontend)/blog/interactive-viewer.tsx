"use client";

import { BaseEditorKit } from "@repo/ui/components/platejs/plugins/editor-base-kit";
import { usePlateViewEditor, PlateView } from "platejs/react";
import { Value as EditorValue } from "platejs";

export function InteractiveViewer({ value }: { value: EditorValue }) {
  const editor = usePlateViewEditor({
    plugins: BaseEditorKit,
    value,
  });

  return <PlateView editor={editor} />;
}
