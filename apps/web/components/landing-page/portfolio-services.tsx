"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { H1, H2, H3, H4, H5 } from "../typography/typography";

const whatIDo = [
  {
    title: "Full-stack Development",
    description:
      "From frontend interactions to backend APIs, I build complete web solutions. I work with modern stacks to deliver apps that are scalable, maintainable, and ready for real-world users.",
    items: [
      "NextJs, .Net Core, Express.js",
      "REST APIs, GraphQL, Docker",
      "Git, Azure, Cloudflare",
    ],
    className: "",
  },
  {
    title: "UI/UX & Frontend",
    description:
      "Design is more than looks — it's about clarity and connection. I design and develop clean, responsive interfaces that feel intuitive across devices. My focus is on clarity, accessibility, and seamless user experiences.",
    items: [
      "NextJs, TailwindCSS, GSAP",
      "Figma to Code, Photoshop",
      "HTML, CSS, Javascript",
    ],
    className: "",
  },
  {
    title: "Embedded",
    description: `Beyond handling data, I'm driven by the challenge of turning complex raw inputs into reliable, usable systems. I enjoy designing pipelines that power insights and apply core CS principles to build for scale, speed, and stability.`,
    items: ["Raspberry Pi, Arduino, Microbit", "Keil, RTOS"],
    className: "",
  },
  {
    title: "Optimization",
    description: `Beyond handling data, I'm driven by the challenge of turning complex raw inputs into reliable, usable systems. I enjoy designing pipelines that power insights and apply core CS principles to build for scale, speed, and stability.`,
    items: [
      "Data Structures & Algorithms",
      "DBMS, OOP, OS Fundamentals",
      "Data Pipelines, ETL, and Scalability",
    ],
    className: "",
  },
];

export function PortfolioServices() {
  const isMobile = useIsMobile();

  return (
    <section className="max-w-7xl mx-auto relative">
      <div className="space-y-8">
        <H2>What I Do /</H2>
        <p>
          My expertise spans backend development, cloud-based solutions, data
          management, and security—helping businesses optimize their operations
          and stay ahead in the tech-driven world.
        </p>
        <div className="grid">
          {whatIDo.map((el, i) => {
            const gap = isMobile ? 4 : 5;

            const marginBottom = (whatIDo.length - i - 1) * gap;

            const top = i * gap;

            return (
              <div
                key={i}
                className="border-t-2 min-h-96 sticky pt-4 bg-background space-y-8"
                style={{
                  top: `calc(20vh + ${top}em)`,
                  marginBottom: `calc(20vh + ${marginBottom}em)`,
                }}
              >
                <div className="grid grid-cols-12">
                  <div className="col-span-2 md:col-span-4">
                    <H5>(0{i + 1})</H5>
                  </div>
                  <div className="col-span-10 md:col-span-8">
                    <H3>{el.title}</H3>
                  </div>
                </div>
                <div className="grid grid-cols-12">
                  <div className="col-span-2 md:col-span-4 hidden md:flex"></div>
                  <div className="col-span-10 md:col-span-8 space-y-8">
                    <p className="font-light text-muted-foreground md:max-w-[40ch] text-base sm:text-lg md:text-xl">
                      {el.description}
                    </p>

                    <ul className="space-y-4">
                      {el.items.map((el) => (
                        <li key={el} className="">
                          {el}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
