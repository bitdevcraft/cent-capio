"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { H1, H2, H3, H4 } from "../typography/typography";

const whatIDo = [
  {
    title: "Full-stack Development",
    description:
      "From frontend interactions to backend APIs, I build complete web solutions. I work with modern stacks to deliver apps that are scalable, maintainable, and ready for real-world users.",
    items: [""],
    className: "",
  },
  {
    title: "UI/UX & Frontend",
    description:
      "Design is more than looks — it's about clarity and connection. I design and develop clean, responsive interfaces that feel intuitive across devices. My focus is on clarity, accessibility, and seamless user experiences.",
    items: [""],
    className: "",
  },
  {
    title: "Embedded",
    description: `Beyond handling data, I'm driven by the challenge of turning complex raw inputs into reliable, usable systems. I enjoy designing pipelines that power insights and apply core CS principles to build for scale, speed, and stability.`,
    items: [""],
    className: "",
  },
  {
    title: "Optimization",
    description: `Beyond handling data, I'm driven by the challenge of turning complex raw inputs into reliable, usable systems. I enjoy designing pipelines that power insights and apply core CS principles to build for scale, speed, and stability.`,
    items: [""],
    className: "",
  },
];

export function PortfolioServices() {
  const isMobile = useIsMobile();

  return (
    <section className="max-w-7xl mx-auto relative">
      <div className="space-y-8">
        <H1>What I Do /</H1>
        <p>
          My expertise spans backend development, cloud-based solutions, data
          management, and security—helping businesses optimize their operations
          and stay ahead in the tech-driven world.
        </p>
        <div className="grid">
          {whatIDo.map((el, i) => {
            const gap = isMobile ? 4 : 6;

            const marginBottom =
              (whatIDo.length - 1 - i) * (isMobile ? 4 : 6) +
              (isMobile && i === 0 ? 2 : 0);

            const top = i * gap + (isMobile && i > 0 ? 2 : 0);

            return (
              <div
                key={i}
                className="border-t-2 min-h-64 sticky pt-4 bg-background space-y-8"
                style={{
                  top: `calc(20vh + ${top}em)`,
                  marginBottom: `calc(20vh + ${marginBottom}em)`,
                }}
              >
                <div className="grid grid-cols-12">
                  <div className="col-span-2">(0{i + 1})</div>
                  <div className="col-span-10">
                    <H2>{el.title}</H2>
                  </div>
                </div>
                <p className="font-light text-muted-foreground">
                  {el.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
