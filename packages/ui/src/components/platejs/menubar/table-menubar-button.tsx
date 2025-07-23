"use client";

import * as React from "react";

import { TablePlugin } from "@platejs/table/react";
import { Table } from "lucide-react";
import { useEditorPlugin } from "platejs/react";

import { cn } from "@repo/ui/lib/utils";

import {
  MenubarItem,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
} from "../../shadcn/menubar";
import { MenubarSubProps } from "@radix-ui/react-menubar";

export function TableMenubarButton(props: MenubarSubProps) {
  return (
    <MenubarSub {...props}>
      <MenubarSubTrigger className="p-0">
        <MenubarItem>
          <Table size={20} /> Table
        </MenubarItem>
      </MenubarSubTrigger>

      <MenubarSubContent>
        <MenubarItem>
          <TablePicker />
        </MenubarItem>
      </MenubarSubContent>
    </MenubarSub>
  );
}

function TablePicker() {
  const { editor, tf } = useEditorPlugin(TablePlugin);

  const [tablePicker, setTablePicker] = React.useState({
    grid: Array.from({ length: 8 }, () => Array.from({ length: 8 }).fill(0)),
    size: { colCount: 0, rowCount: 0 },
  });

  const onCellMove = (rowIndex: number, colIndex: number) => {
    const newGrid = [...tablePicker.grid];

    for (let i = 0; i < newGrid.length; i++) {
      const tmp = newGrid[i];
      if (tmp)
        for (let j = 0; j < tmp.length; j++) {
          tmp[j] = i >= 0 && i <= rowIndex && j >= 0 && j <= colIndex ? 1 : 0;
        }
    }

    setTablePicker({
      grid: newGrid,
      size: { colCount: colIndex + 1, rowCount: rowIndex + 1 },
    });
  };

  return (
    <div
      className="m-0 flex! flex-col p-0"
      onClick={() => {
        tf.insert.table(tablePicker.size, { select: true });
        editor.tf.focus();
      }}
    >
      <div className="grid size-[130px] grid-cols-8 gap-0.5 p-1">
        {tablePicker.grid.map((rows, rowIndex) =>
          rows.map((value, columIndex) => {
            return (
              <div
                key={`(${rowIndex},${columIndex})`}
                className={cn(
                  "col-span-1 size-3 border border-solid bg-secondary",
                  !!value && "border-current"
                )}
                onMouseMove={() => {
                  onCellMove(rowIndex, columIndex);
                }}
              />
            );
          })
        )}
      </div>

      <div className="text-center text-xs text-current">
        {tablePicker.size.rowCount} x {tablePicker.size.colCount}
      </div>
    </div>
  );
}
