"use client";

import { createPlatePlugin } from "platejs/react";
import { FixedToolbar } from "../ui/fixed-toolbar";
import { FixedMenubar } from "../menubar/fixed-menubar";
import { FixedMenubarToolbarButtons } from "../menubar/fixed-menubar-toolbar-buttons";

export const FixedMenubarKit = [
  createPlatePlugin({
    key: "fixed-menubar",
    render: {
      beforeEditable: () => (
        <div className="">
          <FixedMenubar />
          <FixedToolbar>
            <div className="rounded-full w-full border bg-muted px-2 px-1 mb-3">
              <FixedMenubarToolbarButtons />
            </div>
          </FixedToolbar>
        </div>
      ),
    },
  }),
];
