"use client";

import * as React from "react";

import { useMarkToolbarButton, useMarkToolbarButtonState } from "platejs/react";
import { MenubarItem } from "../../shadcn/menubar";

export function MarkMenubarButton({
  clear,
  nodeType,
  ...props
}: React.ComponentProps<typeof MenubarItem> & {
  nodeType: string;
  clear?: string[] | string;
}) {
  const state = useMarkToolbarButtonState({ clear, nodeType });
  const {
    props: { onMouseDown, ...buttonProps },
  } = useMarkToolbarButton(state);

  return <MenubarItem {...props} {...buttonProps} data-plate-focus />;
}
