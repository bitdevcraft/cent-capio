"use client";

import * as React from "react";

import type { DropdownMenuProps } from "@radix-ui/react-dropdown-menu";

import { PlaceholderPlugin } from "@platejs/media/react";
import {
  AudioLinesIcon,
  FileUpIcon,
  FilmIcon,
  ImageIcon,
  LinkIcon,
} from "lucide-react";
import { isUrl, KEYS } from "platejs";
import { useEditorRef } from "platejs/react";
import { toast } from "sonner";
import { useFilePicker } from "use-file-picker";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@repo/ui/components/shadcn/alert-dialog";

import { Input } from "@repo/ui/components/shadcn/input";

import { MenubarSubProps } from "@radix-ui/react-menubar";
import {
  MenubarItem,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
} from "../../shadcn/menubar";
import { useAlertDialog } from "./alert-dialog-context";

const MEDIA_CONFIG: Record<
  string,
  {
    accept: string[];
    icon: React.ReactNode;
    title: string;
    tooltip: string;
  }
> = {
  [KEYS.audio]: {
    accept: ["audio/*"],
    icon: <AudioLinesIcon className="size-4" />,
    title: "Insert Audio",
    tooltip: "Audio",
  },
  [KEYS.file]: {
    accept: ["*"],
    icon: <FileUpIcon className="size-4" />,
    title: "Insert File",
    tooltip: "File",
  },
  [KEYS.img]: {
    accept: ["image/*"],
    icon: <ImageIcon className="size-4" />,
    title: "Insert Image",
    tooltip: "Image",
  },
  [KEYS.video]: {
    accept: ["video/*"],
    icon: <FilmIcon className="size-4" />,
    title: "Insert Video",
    tooltip: "Video",
  },
};

export function MediaMenubarButton({
  nodeType,
  ...props
}: MenubarSubProps & { nodeType: string }) {
  const currentConfig = MEDIA_CONFIG[nodeType];

  const { open, close } = useAlertDialog();

  const editor = useEditorRef();
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const { openFilePicker } = useFilePicker({
    accept: currentConfig?.accept,
    multiple: true,
    onFilesSelected: ({ plainFiles: updatedFiles }) => {
      editor.getTransforms(PlaceholderPlugin).insert.media(updatedFiles);
    },
  });

  return (
    <>
      <MenubarSub {...props}>
        <MenubarSubTrigger className="p-0">
          <MenubarItem>
            {currentConfig?.icon} {currentConfig?.tooltip}
          </MenubarItem>
        </MenubarSubTrigger>
        <MenubarSubContent>
          <MenubarItem onClick={() => openFilePicker()}>
            Upload from Computer
          </MenubarItem>
          <MenubarItem
            onClick={() => {
              setDialogOpen(true);
              open({
                content: (
                  <>
                    {currentConfig && (
                      <MediaUrlDialogContent
                        currentConfig={currentConfig}
                        nodeType={nodeType}
                        setOpen={(v) => !v && close()}
                      />
                    )}
                  </>
                ),
              });
            }}
          >
            Insert via URL
          </MenubarItem>
        </MenubarSubContent>
      </MenubarSub>
    </>
  );
}

export function MediaUrlDialogContent({
  currentConfig,
  nodeType,
  setOpen,
}: {
  currentConfig: (typeof MEDIA_CONFIG)[string];
  nodeType: string;
  setOpen: (value: boolean) => void;
}) {
  const editor = useEditorRef();
  const [url, setUrl] = React.useState("");

  const embedMedia = React.useCallback(() => {
    if (!isUrl(url)) return toast.error("Invalid URL");

    setOpen(false);
    editor.tf.insertNodes({
      children: [{ text: "" }],
      name: nodeType === KEYS.file ? url.split("/").pop() : undefined,
      type: nodeType,
      url,
    });
  }, [url, editor, nodeType, setOpen]);

  return (
    <>
      <AlertDialogHeader>
        <AlertDialogTitle>{currentConfig.title}</AlertDialogTitle>
      </AlertDialogHeader>

      <AlertDialogDescription className="group relative w-full">
        <label
          className="absolute top-1/2 block -translate-y-1/2 cursor-text px-1 text-sm text-muted-foreground/70 transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium group-focus-within:text-foreground has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-medium has-[+input:not(:placeholder-shown)]:text-foreground"
          htmlFor="url"
        >
          <span className="inline-flex bg-background px-2">URL</span>
        </label>
        <Input
          id="url"
          className="w-full"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") embedMedia();
          }}
          placeholder=""
          type="url"
          autoFocus
        />
      </AlertDialogDescription>

      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction
          onClick={(e) => {
            e.preventDefault();
            embedMedia();
          }}
        >
          Accept
        </AlertDialogAction>
      </AlertDialogFooter>
    </>
  );
}
