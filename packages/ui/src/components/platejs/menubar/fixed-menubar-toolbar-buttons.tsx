"use client";

import * as React from "react";

import {
  ArrowUpToLineIcon,
  BaselineIcon,
  BoldIcon,
  Code2Icon,
  HighlighterIcon,
  ItalicIcon,
  PaintBucketIcon,
  StrikethroughIcon,
  UnderlineIcon,
  WandSparklesIcon,
} from "lucide-react";
import { KEYS } from "platejs";
import { useEditorReadOnly } from "platejs/react";
import { AIToolbarButton } from "../ui/ai-toolbar-button";
import { AlignToolbarButton } from "../ui/align-toolbar-button";
import { CommentToolbarButton } from "../ui/comment-toolbar-button";
import { EmojiToolbarButton } from "../ui/emoji-toolbar-button";
import { ExportToolbarButton } from "../ui/export-toolbar-button";
import { FontColorToolbarButton } from "../ui/font-color-toolbar-button";
import { FontSizeToolbarButton } from "../ui/font-size-toolbar-button";
import {
  UndoToolbarButton,
  RedoToolbarButton,
} from "../ui/history-toolbar-button";
import { ImportToolbarButton } from "../ui/import-toolbar-button";
import {
  OutdentToolbarButton,
  IndentToolbarButton,
} from "../ui/indent-toolbar-button";
import { InsertToolbarButton } from "../ui/insert-toolbar-button";
import { LineHeightToolbarButton } from "../ui/line-height-toolbar-button";
import { LinkToolbarButton } from "../ui/link-toolbar-button";
import {
  NumberedListToolbarButton,
  BulletedListToolbarButton,
  TodoListToolbarButton,
} from "../ui/list-toolbar-button";
import { MarkToolbarButton } from "../ui/mark-toolbar-button";
import { MediaToolbarButton } from "../ui/media-toolbar-button";
import { ModeToolbarButton } from "../ui/mode-toolbar-button";
import { MoreToolbarButton } from "../ui/more-toolbar-button";
import { TableToolbarButton } from "../ui/table-toolbar-button";
import { ToggleToolbarButton } from "../ui/toggle-toolbar-button";
import { ToolbarGroup } from "../ui/toolbar";
import { TurnIntoToolbarButton } from "../ui/turn-into-toolbar-button";

export function FixedMenubarToolbarButtons() {
  const readOnly = useEditorReadOnly();

  return (
    <div className="flex justify-between">
      {!readOnly && (
        <>
          <ToolbarGroup>
            <UndoToolbarButton />
            <RedoToolbarButton />
          </ToolbarGroup>

          <ToolbarGroup>
            <AIToolbarButton tooltip="AI commands">
              <WandSparklesIcon />
            </AIToolbarButton>
          </ToolbarGroup>

          <ToolbarGroup>
            <InsertToolbarButton />
            <TurnIntoToolbarButton />
            <FontSizeToolbarButton />
          </ToolbarGroup>

          <ToolbarGroup>
            <MarkToolbarButton nodeType={KEYS.bold} tooltip="Bold (⌘+B)">
              <BoldIcon />
            </MarkToolbarButton>

            <MarkToolbarButton nodeType={KEYS.italic} tooltip="Italic (⌘+I)">
              <ItalicIcon />
            </MarkToolbarButton>

            <MarkToolbarButton
              nodeType={KEYS.underline}
              tooltip="Underline (⌘+U)"
            >
              <UnderlineIcon />
            </MarkToolbarButton>

            <FontColorToolbarButton nodeType={KEYS.color} tooltip="Text color">
              <div
                style={{
                  borderBottom: "4px solid currentColor",
                  padding: "0px",
                  width: "16px",
                }}
              >
                <span className="text-foreground leading-none text-center">
                  A
                </span>
              </div>
            </FontColorToolbarButton>

            <FontColorToolbarButton
              nodeType={KEYS.backgroundColor}
              tooltip="Background color"
            >
              <PaintBucketIcon />
            </FontColorToolbarButton>

            <MarkToolbarButton nodeType={KEYS.highlight} tooltip="Highlight">
              <HighlighterIcon />
            </MarkToolbarButton>
          </ToolbarGroup>

          <ToolbarGroup>
            <AlignToolbarButton />
            <NumberedListToolbarButton />
            <BulletedListToolbarButton />
          </ToolbarGroup>

          <ToolbarGroup>
            <LineHeightToolbarButton />
            <OutdentToolbarButton />
            <IndentToolbarButton />
          </ToolbarGroup>
        </>
      )}

      <div className="grow" />

      <ToolbarGroup>
        <CommentToolbarButton />
      </ToolbarGroup>

      <ToolbarGroup className="w-[125px]">
        <ModeToolbarButton />
      </ToolbarGroup>
    </div>
  );
}
