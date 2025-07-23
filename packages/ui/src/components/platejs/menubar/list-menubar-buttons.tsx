"use client";

import { ListStyleType, toggleList } from "@platejs/list";
import { useEditorRef } from "platejs/react";
import {
  MenubarItem,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
} from "../../shadcn/menubar";
import {
  useIndentTodoToolBarButtonState,
  useIndentTodoToolBarButton,
} from "@platejs/list/react";
import {
  Circle,
  CircleSmallIcon,
  ListCollapseIcon,
  ListTodoIcon,
  Square,
} from "lucide-react";
import {
  useToggleToolbarButtonState,
  useToggleToolbarButton,
} from "@platejs/toggle/react";

export function ListMenubarButton() {
  const editor = useEditorRef();

  const stateTodo = useIndentTodoToolBarButtonState({ nodeType: "todo" });
  const {
    props: { onMouseDown: onTodoMouseDown, ...buttonTodoProps },
  } = useIndentTodoToolBarButton(stateTodo);

  const stateToggle = useToggleToolbarButtonState();
  const {
    props: { onMouseDown: onToggleMouseDown, ...buttonToggleProps },
  } = useToggleToolbarButton(stateToggle);

  return (
    <MenubarSub>
      <MenubarSubTrigger>Bullet &amp; Numbering</MenubarSubTrigger>
      <MenubarSubContent>
        <MenubarItem
          onClick={() =>
            toggleList(editor, {
              listStyleType: ListStyleType.Disc,
            })
          }
        >
          <CircleSmallIcon fill="currentColor" />
          Default
        </MenubarItem>
        <MenubarItem
          onClick={() =>
            toggleList(editor, {
              listStyleType: ListStyleType.Circle,
            })
          }
        >
          <CircleSmallIcon />
          Circle
        </MenubarItem>
        <MenubarItem
          onClick={() =>
            toggleList(editor, {
              listStyleType: ListStyleType.Square,
            })
          }
        >
          <div className="size-4 flex justify-center items-center">
            <Square fill="currentColor" className="size-2" />
          </div>
          Square
        </MenubarItem>
        <MenubarSeparator />
        <MenubarItem
          onSelect={() =>
            toggleList(editor, {
              listStyleType: ListStyleType.Decimal,
            })
          }
        >
          <div className="size-4" />
          Decimal (1, 2, 3)
        </MenubarItem>
        <MenubarItem
          onSelect={() =>
            toggleList(editor, {
              listStyleType: ListStyleType.LowerAlpha,
            })
          }
        >
          <div className="size-4" />
          Lower Alpha (a, b, c)
        </MenubarItem>
        <MenubarItem
          onSelect={() =>
            toggleList(editor, {
              listStyleType: ListStyleType.UpperAlpha,
            })
          }
        >
          <div className="size-4" />
          Upper Alpha (A, B, C)
        </MenubarItem>
        <MenubarItem
          onSelect={() =>
            toggleList(editor, {
              listStyleType: ListStyleType.LowerRoman,
            })
          }
        >
          <div className="size-4" />
          Lower Roman (i, ii, iii)
        </MenubarItem>
        <MenubarItem
          onSelect={() =>
            toggleList(editor, {
              listStyleType: ListStyleType.UpperRoman,
            })
          }
        >
          <div className="size-4" />
          Upper Roman (I, II, III)
        </MenubarItem>
        <MenubarSeparator />
        <MenubarItem {...buttonTodoProps}>
          <ListTodoIcon />
          Todo-List
        </MenubarItem>
        <MenubarSeparator />
        <MenubarItem {...buttonToggleProps}>
          <ListCollapseIcon />
          Toggle
        </MenubarItem>
      </MenubarSubContent>
    </MenubarSub>
  );
}
