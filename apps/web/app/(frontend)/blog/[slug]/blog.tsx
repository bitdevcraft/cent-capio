import { BaseEditorKit } from "@repo/ui/components/platejs/plugins/editor-base-kit";
import { getHeadingList } from "@repo/ui/components/platejs/ui/toc-node-static";
import { Button } from "@repo/ui/components/shadcn/button";
import { Card, CardContent, CardHeader } from "@repo/ui/components/shadcn/card";
import { cn } from "@repo/ui/lib/utils";
import { cva } from "class-variance-authority";
import { createStaticEditor, PlateStatic, SlateEditor, Value } from "platejs";

interface Props {
  content: Value;
  title: string;
}

export function Blog({ content, title }: Props) {
  const editor = createStaticEditor({
    plugins: BaseEditorKit,
    value: content,
    options: {},
  });

  return (
    <>
      <script src="/accordionScript.js" />
      <script src="/buttonScrollToScript.js" />
      <script src="/codeBlockScript.js" />
      <section className="mx-auto max-w-5xl grid grid-cols-12 gap-8">
        <div className="col-span-12 md:col-span-10">
          <h1>{title}</h1>
        </div>
        <div className="col-span-2 hidden md:grid relative"></div>
        <div className="col-span-12 md:col-span-10">
          <PlateStatic editor={editor} />
        </div>
        <div className="col-span-2 hidden md:grid relative">
          <div className="sticky top-0">
            <Toc editor={editor} />
          </div>
        </div>
      </section>
    </>
  );
}

function Toc({ editor }: { editor: SlateEditor }) {
  const headingList = getHeadingList(editor);

  return (
    <Card className="sticky top-0 gap-0 mt-14 border-none shadow-none">
      <CardHeader className="uppercase text-sm">On this page</CardHeader>
      <CardContent>
        {headingList.length > 0 ? (
          headingList.map((item) => (
            <Button
              key={item.title}
              variant="ghost"
              className={cn(
                "text-sm font-light",
                headingItemVariants({
                  depth: item.depth as 1 | 2 | 3,
                })
              )}
              data-scroll-to={item.id}
            >
              {item.title}
            </Button>
          ))
        ) : (
          <div className="text-sm text-gray-500">
            Create a heading to display the table of contents.
          </div>
        )}
      </CardContent>
      {/* {props.children} */}
    </Card>
  );
}

const headingItemVariants = cva(
  "block h-auto w-full cursor-pointer truncate rounded-none px-0.5 py-1.5 text-left text-muted-foreground decoration-[0.5px] underline-offset-4 hover:bg-accent hover:text-brand",
  {
    variants: {
      depth: {
        1: "pl-0.5",
        2: "pl-[20px]",
        3: "pl-[40px]",
      },
    },
  }
);
