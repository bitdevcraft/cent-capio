import { PortfolioServices } from "@/components/landing-page/portfolio-services";
import { PortfolioHero } from "@/components/landing-page/portfolio-hero";
import { PortfolioExperience } from "@/components/landing-page/portfolio-experience";
import { PortfolioSkills } from "@/components/landing-page/portfolio-skills";

export default async function Page() {
  return (
    <main className="px-6 gap-8 space-y-12 min-w-[375px]">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div>
          <div className="pointer-events-none fixed inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
            <div className="absolute right-0 top-0 h-[500px] w-[500px] bg-blue-500/10 blur-[100px]" />
            <div className="absolute bottom-0 left-0 h-[500px] w-[500px] bg-purple-500/10 blur-[100px]" />
          </div>
        </div>
        <div className="relative z-10 space-y-16">
          <PortfolioHero />
          <PortfolioServices />
          <PortfolioExperience />
          <PortfolioSkills />
          <section className="min-h-screen" />
        </div>
      </div>
    </main>
  );
}
