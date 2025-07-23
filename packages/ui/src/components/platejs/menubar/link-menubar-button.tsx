"use client";

import * as React from "react";

import {
  useLinkToolbarButton,
  useLinkToolbarButtonState,
} from "@platejs/link/react";
import { Link } from "lucide-react";
import { MenubarItem, MenubarShortcut } from "../../shadcn/menubar";
import { ToolbarButton } from "../ui/toolbar";

export function LinkMenubarButton(
  props: React.ComponentProps<typeof MenubarItem>
) {
  const state = useLinkToolbarButtonState();
  const {
    props: { onMouseDown, ...buttonProps },
  } = useLinkToolbarButton(state);

  return (
    <MenubarItem {...props} {...buttonProps} data-plate-focus>
      <Link /> Link
      <MenubarShortcut>⌘+K</MenubarShortcut>
    </MenubarItem>
  );
}
