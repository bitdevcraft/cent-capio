"use client";

import * as React from "react";

import { Redo2Icon, Undo2Icon } from "lucide-react";
import { useEditorRef, useEditorSelector } from "platejs/react";
import { MenubarItem, MenubarShortcut } from "../../shadcn/menubar";

export function RedoMenubarButton(
  props: React.ComponentProps<typeof MenubarItem>
) {
  const editor = useEditorRef();
  const disabled = useEditorSelector(
    (editor) => editor.history.redos.length === 0,
    []
  );

  return (
    <MenubarItem
      {...props}
      disabled={disabled}
      onClick={() => editor.redo()}
      onMouseDown={(e) => e.preventDefault()}
    >
      <Redo2Icon />
      Redo <MenubarShortcut>⌘+Y</MenubarShortcut>
    </MenubarItem>
  );
}

export function UndoMenubarButton(
  props: React.ComponentProps<typeof MenubarItem>
) {
  const editor = useEditorRef();
  const disabled = useEditorSelector(
    (editor) => editor.history.undos.length === 0,
    []
  );

  return (
    <MenubarItem
      {...props}
      disabled={disabled}
      onClick={() => editor.undo()}
      onMouseDown={(e) => e.preventDefault()}
    >
      <Undo2Icon />
      Undo <MenubarShortcut>⌘+Z</MenubarShortcut>
    </MenubarItem>
  );
}
