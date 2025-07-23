"use client";

import * as React from "react";

import type { Alignment } from "@platejs/basic-styles";
import type { DropdownMenuProps } from "@radix-ui/react-dropdown-menu";

import { TextAlignPlugin } from "@platejs/basic-styles/react";
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  IndentIcon,
  OutdentIcon,
} from "lucide-react";
import { useEditorPlugin, useSelectionFragmentProp } from "platejs/react";

import {
  MenubarItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarSeparator,
} from "../../shadcn/menubar";
import { MenubarSubProps } from "@radix-ui/react-menubar";
import { useIndentButton, useOutdentButton } from "@platejs/indent/react";

const items = [
  {
    icon: AlignLeftIcon,
    value: "left",
  },
  {
    icon: AlignCenterIcon,
    value: "center",
  },
  {
    icon: AlignRightIcon,
    value: "right",
  },
  {
    icon: AlignJustifyIcon,
    value: "justify",
  },
];

export function AlignMenubarButton(props: MenubarSubProps) {
  const { editor, tf } = useEditorPlugin(TextAlignPlugin);
  const value =
    useSelectionFragmentProp({
      defaultValue: "start",
      getProp: (node) => node.align,
    }) ?? "left";

  const {
    props: { onMouseDown: onOutdentMouseDown, ...outdentProps },
  } = useOutdentButton();
  const {
    props: { onMouseDown: onIndentMouseDown, ...indentProps },
  } = useIndentButton();

  return (
    <MenubarSub {...props}>
      <MenubarSubTrigger className="p-0">
        <MenubarItem>Align & Indent</MenubarItem>
      </MenubarSubTrigger>
      <MenubarSubContent>
        <MenubarRadioGroup
          value={value}
          onValueChange={(value) => {
            tf.textAlign.setNodes(value as Alignment);
            editor.tf.focus();
          }}
        >
          {items.map(({ icon: Icon, value: itemValue }) => (
            <MenubarRadioItem
              key={itemValue}
              className="pl-2 data-[state=checked]:bg-accent *:first:[span]:hidden"
              value={itemValue}
            >
              <Icon />
              {itemValue[0]?.toUpperCase() + itemValue.slice(1)}
            </MenubarRadioItem>
          ))}
        </MenubarRadioGroup>
        <MenubarSeparator />
        <MenubarItem {...indentProps}>
          <IndentIcon />
          Increase Indent
        </MenubarItem>
        <MenubarItem {...outdentProps}>
          <OutdentIcon />
          Decrease Indent
        </MenubarItem>
      </MenubarSubContent>
    </MenubarSub>
  );
}
