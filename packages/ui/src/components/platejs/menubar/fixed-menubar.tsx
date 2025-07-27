"use client";

import { KEYS } from "platejs";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "../../shadcn/menubar";
import { EmojiMenubarButton } from "./emoji-menubar-button";
import { RedoMenubarButton, UndoMenubarButton } from "./history-menubar-button";
import { LinkMenubarButton } from "./link-menubar-button";
import { TableMenubarButton } from "./table-menubar-button";
import { MediaMenubarButton } from "./media-menubar-button";
import { AlertDialogProvider } from "./alert-dialog-context";
import { ImportMenubarButton } from "./import-menubar-button";
import { ExportMenubarButton } from "./export-menubar-button";
import { MarkMenubarButton } from "./mark-menubar-button";
import {
  BoldIcon,
  ItalicIcon,
  StrikethroughIcon,
  UnderlineIcon,
} from "lucide-react";
import { MoreMenubarButton } from "./more-menubar-buttons";
import { AlignMenubarButton } from "./align-menubar-button";
import { ListMenubarButton } from "./list-menubar-buttons";

export function FixedMenubar() {
  return (
    <AlertDialogProvider>
      <div className="text-sm">
        <Menubar className="border-none shadow-none">
          <MenubarMenu>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
              <ImportMenubarButton />
              <ExportMenubarButton />
            </MenubarContent>
          </MenubarMenu>

          {/* Edit */}
          <MenubarMenu>
            <MenubarTrigger>Edit</MenubarTrigger>
            <MenubarContent>
              <UndoMenubarButton />
              <RedoMenubarButton />
            </MenubarContent>
          </MenubarMenu>

          {/* Insert */}
          <MenubarMenu>
            <MenubarTrigger>Insert</MenubarTrigger>
            <MenubarContent>
              <LinkMenubarButton />
              <TableMenubarButton />
              <EmojiMenubarButton />
              <MenubarSeparator />
              <MediaMenubarButton nodeType={KEYS.img} />
              <MediaMenubarButton nodeType={KEYS.video} />
              <MediaMenubarButton nodeType={KEYS.audio} />
              <MediaMenubarButton nodeType={KEYS.file} />
            </MenubarContent>
          </MenubarMenu>

          {/* Format */}
          <MenubarMenu>
            <MenubarTrigger>Format</MenubarTrigger>
            <MenubarContent>
              <MenubarSub>
                <MenubarSubTrigger>Text</MenubarSubTrigger>
                <MenubarSubContent>
                  <MarkMenubarButton nodeType={KEYS.bold}>
                    <BoldIcon />
                    Bold
                    <MenubarShortcut>⌘+B</MenubarShortcut>
                  </MarkMenubarButton>

                  <MarkMenubarButton nodeType={KEYS.italic}>
                    <ItalicIcon />
                    Italic
                    <MenubarShortcut>⌘+I</MenubarShortcut>
                  </MarkMenubarButton>

                  <MarkMenubarButton nodeType={KEYS.underline}>
                    <UnderlineIcon />
                    Underline
                    <MenubarShortcut>⌘+U</MenubarShortcut>
                  </MarkMenubarButton>

                  <MarkMenubarButton nodeType={KEYS.strikethrough}>
                    <StrikethroughIcon />
                    Strikethrough
                    <MenubarShortcut>⌘+⇧+M</MenubarShortcut>
                  </MarkMenubarButton>

                  <MenubarSeparator />
                  <MoreMenubarButton />
                </MenubarSubContent>
              </MenubarSub>
              <AlignMenubarButton />
              <ListMenubarButton />
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
    </AlertDialogProvider>
  );
}
