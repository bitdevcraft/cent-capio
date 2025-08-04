import { H1, H2, H3, H4 } from "../typography/typography";
import { Timeline } from "@repo/ui/components/aceternity/timeline";

const experiences = [
  {
    title: "2023 - Present",
    content: (
      <div className="space-y-4">
        <H4>Full-stack Developer</H4>
        <p className="text-sm md:text-normal">
          Works at{" "}
          <span className="font-medium">
            Ingenious Digital Marketing Management
          </span>
          &nbsp;-&nbsp;
          <span>Dubai, UAE</span>
        </p>
        <p className="pl-4 text-muted-foreground">
          Builds customer-engagement and CRM solutions for a leading
          digital-marketing firm.
        </p>
        <ul className="pl-8 text-muted-foreground space-y-2 font-light list-disc">
          <li>
            Engineered multi-tenant WhatsApp marketing platform (Next.js +
            PostgreSQL) with AI automation and subscription billing.
          </li>
          <li>
            Enhanced in-house InfyCRM dashboards; led Meta Tech-Provider
            accreditation process.
          </li>
        </ul>
      </div>
    ),
  },
  {
    title: "2022 - 2023",
    content: (
      <div className="space-y-4">
        <H4>Embedded Software Engineer</H4>
        <p className="text-sm md:text-normal">
          Works at <span className="font-medium">Thales</span>
          &nbsp;-&nbsp;
          <span>Makati, PH</span>
        </p>
        <p className="pl-4 text-muted-foreground">
          Developed security features for SIM-card operating systems in the R&D
          division
        </p>
        <ul className="pl-8 text-muted-foreground space-y-2 font-light list-disc">
          <li>
            Implemented Java Card and assembly updates for global GPOS rollouts.
          </li>
          <li>
            Coordinated end-to-end testing with China Telecom, ensuring flawless
            personalization flow.
          </li>
        </ul>
      </div>
    ),
  },
  {
    title: "2019 - 2022",
    content: (
      <div className="space-y-4">
        <H4>Senior Software Engineer</H4>
        <p className="text-sm md:text-normal">
          Works at <span className="font-medium">B@BE</span>
          &nbsp;-&nbsp;
          <span>Makati, PH</span>
        </p>
        <p className="text-xs">
          Within a year I got promoted to Senior Software Engineer
        </p>
        <p className="pl-4 text-muted-foreground">
          Delivered supply-chain automation and mentored a cross-functional dev
          team.
        </p>
        <ul className="pl-8 text-muted-foreground space-y-2 font-light list-disc">
          <li>
            Led B2B EDI integrations, boosting data accuracy and partner
            onboarding speed.
          </li>
          <li>
            Devised OCR-assisted tool to auto-convert legacy EDI formats,
            accelerating client migrations.
          </li>
        </ul>
      </div>
    ),
  },
];

export function PortfolioExperience() {
  return (
    <section className="max-w-7xl mx-auto min-h-screen relative">
      <div className="space-y-8">
        <H1>Experience</H1>
        <p>
          Drawing on extensive engineering experience to build refined,
          functional web applications
        </p>
        <Timeline data={experiences} />
      </div>
    </section>
  );
}
