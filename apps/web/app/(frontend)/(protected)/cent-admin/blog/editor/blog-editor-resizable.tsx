import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@repo/ui/components/shadcn/resizable";
import BlogEditor, { BlogEditorHandle, BlogEditorProps } from "./blog-editor";

const BlogEditorResizable = React.forwardRef<BlogEditorHandle, BlogEditorProps>(
  (_, ref) => {
    return (
      <div className="h-[70vh] relative">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel>
            <BlogEditor ref={ref} />
          </ResizablePanel>
          <ResizableHandle className="w-2 h-8 bg-black rounded-full top-1/2 -translate-y-[50%] active:h-16 active:bg-muted-foreground hover:h-16 hover:bg-muted-foreground duration-250 ease-in-out" />
          <ResizablePanel defaultSize={0} minSize={0} />
        </ResizablePanelGroup>
      </div>
    );
  }
);

BlogEditorResizable.displayName = "BlogEditorResizable";

export default BlogEditorResizable;
