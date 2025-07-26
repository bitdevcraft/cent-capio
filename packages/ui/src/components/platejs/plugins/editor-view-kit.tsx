"use client";

import { type Value, TrailingBlockPlugin } from "platejs";
import { type TPlateEditor, useEditorRef } from "platejs/react";

import { AIKit } from "./ai-kit";
import { AlignKit } from "./align-kit";
import { AutoformatKit } from "./autoformat-kit";
import { BasicBlocksKit } from "./basic-blocks-kit";
import { BasicMarksKit } from "./basic-marks-kit";
import { BlockMenuKit } from "./block-menu-kit";
import { BlockPlaceholderKit } from "./block-placeholder-kit";
import { CalloutKit } from "./callout-kit";
import { CodeBlockKit } from "./code-block-kit";
import { ColumnKit } from "./column-kit";
import { CommentKit } from "./comment-kit";
import { CopilotKit } from "./copilot-kit";
import { CursorOverlayKit } from "./cursor-overlay-kit";
import { DateKit } from "./date-kit";
import { DiscussionKit } from "./discussion-kit";
import { DndKit } from "./dnd-kit";
import { DocxKit } from "./docx-kit";
import { EmojiKit } from "./emoji-kit";
import { ExitBreakKit } from "./exit-break-kit";
import { FixedToolbarKit } from "./fixed-toolbar-kit";
import { FloatingToolbarKit } from "./floating-toolbar-kit";
import { FontKit } from "./font-kit";
import { LineHeightKit } from "./line-height-kit";
import { LinkKit } from "./link-kit";
import { ListKit } from "./list-kit";
import { MarkdownKit } from "./markdown-kit";
import { MathKit } from "./math-kit";
import { MediaKit } from "./media-kit";
import { MentionKit } from "./mention-kit";
import { SlashKit } from "./slash-kit";
import { SuggestionKit } from "./suggestion-kit";
import { TableKit } from "./table-kit";
import { TocKit } from "./toc-kit";
import { ToggleKit } from "./toggle-kit";
import { FixedMenubarKit } from "./fixed-menubar-kit";
import { BaseMediaKit } from "./media-base-kit";
import { BaseAlignKit } from "./align-base-kit";
import { BaseBasicBlocksKit } from "./basic-blocks-base-kit";
import { BaseBasicMarksKit } from "./basic-marks-base-kit";
import { BaseCalloutKit } from "./callout-base-kit";
import { BaseCodeBlockKit } from "./code-block-base-kit";
import { BaseColumnKit } from "./column-base-kit";
import { BaseCommentKit } from "./comment-base-kit";
import { BaseDateKit } from "./date-base-kit";
import { BaseFontKit } from "./font-base-kit";
import { BaseLineHeightKit } from "./line-height-base-kit";
import { BaseLinkKit } from "./link-base-kit";
import { BaseListKit } from "./list-base-kit";
import { BaseMathKit } from "./math-base-kit";
import { BaseMentionKit } from "./mention-base-kit";
import { BaseSuggestionKit } from "./suggestion-base-kit";
import { BaseTableKit } from "./table-base-kit";
import { BaseTocKit } from "./toc-base-kit";
import { BaseToggleKit } from "./toggle-base-kit";

export const EditorViewKit = [
  ...BaseBasicBlocksKit,
  ...CodeBlockKit,
  ...BaseTableKit,
  ...ToggleKit,
  ...TocKit,
  ...BaseMediaKit,
  ...BaseCalloutKit,
  ...BaseColumnKit,
  ...BaseMathKit,
  ...BaseDateKit,
  ...BaseLinkKit,
  ...BaseMentionKit,
  ...BaseBasicMarksKit,
  ...BaseFontKit,
  ...BaseListKit,
  ...BaseAlignKit,
  ...BaseLineHeightKit,
  ...BaseCommentKit,
  ...BaseSuggestionKit,
  ...MarkdownKit,
];

export type MyEditorView = TPlateEditor<Value, (typeof EditorViewKit)[number]>;

// @ts-nocheck
export const useEditorView: any = () => useEditorRef<MyEditorView>();
