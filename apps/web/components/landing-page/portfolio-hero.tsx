import { Button } from "@repo/ui/components/shadcn/button";
import { MoveUpRight } from "lucide-react";
import { H1 } from "../typography/typography";

export function PortfolioHero() {
  return (
    <section className="max-w-7xl mx-auto min-h-screen relative">
      <div className="absolute bottom-4 space-y-4">
        <H1 className="uppercase max-w-[32ch]">
          <span>Vincent</span> <span>Capio</span>
        </H1>
        <div className="space-y-4 max-w-[32ch]">
          <p className="font-light text-muted-foreground">
            Whether it&apos;s automating workflows, enhancing system security,
            or developing full-stack applications, I thrive on solving complex
            problems with smart, innovative solutions.
          </p>
          <div>
            <Button className="rounded-full">
              <p className="uppercase text-base">Contact</p>
              <MoveUpRight strokeWidth={3} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
