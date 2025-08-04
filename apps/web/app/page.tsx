import { PortfolioServices } from "@/components/landing-page/portfolio-services";
import { PortfolioHero } from "@/components/landing-page/portfolio-hero";
import { PortfolioExperience } from "@/components/landing-page/portfolio-experience";

export default async function Page() {
  return (
    <main className="px-6 gap-8 space-y-12 min-w-[375px]">
      <PortfolioHero />
      <PortfolioServices />
      <PortfolioExperience />
      <section className="min-h-screen" />
    </main>
  );
}
