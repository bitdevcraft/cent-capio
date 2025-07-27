import { BlogEditor } from "./blog-editor";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@repo/ui/components/shadcn/resizable";

export default function Page() {
  return (
    <div className="h-[70vh] relative">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel>
          <BlogEditor />
        </ResizablePanel>
        <ResizableHandle className="w-2 h-8 bg-black rounded-full top-1/2 -translate-y-[50%] active:h-16 duration-500 ease-in-out" />
        <ResizablePanel defaultSize={0} minSize={0} />
      </ResizablePanelGroup>
    </div>
  );
}
