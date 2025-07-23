"use client";

import * as React from "react";

import { KeyboardIcon, SubscriptIcon, SuperscriptIcon } from "lucide-react";
import { KEYS } from "platejs";
import { useEditorRef } from "platejs/react";
import { MenubarItem } from "../../shadcn/menubar";

export function MoreMenubarButton() {
  const editor = useEditorRef();

  return (
    <>
      <MenubarItem
        onSelect={() => {
          editor.tf.toggleMark(KEYS.kbd);
          editor.tf.collapse({ edge: "end" });
          editor.tf.focus();
        }}
      >
        <KeyboardIcon />
        Keyboard Input
      </MenubarItem>
      <MenubarItem
        onSelect={() => {
          editor.tf.toggleMark(KEYS.sup, {
            remove: KEYS.sub,
          });
          editor.tf.focus();
        }}
      >
        <SuperscriptIcon />
        Superscript
      </MenubarItem>
      <MenubarItem
        onSelect={() => {
          editor.tf.toggleMark(KEYS.sub, {
            remove: KEYS.sup,
          });
          editor.tf.focus();
        }}
      >
        <SubscriptIcon />
        Subscript
      </MenubarItem>
    </>
  );
}
