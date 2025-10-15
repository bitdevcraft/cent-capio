"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { H3, H5 } from "../typography/typography";
import { H2AnimateOnScroll } from "./animations/h2-animate-on-scroll";
import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

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
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const cardsRef = React.useRef<HTMLDivElement[]>([]);

  // Helper to set refs in a map
  const setCardRef = (el: HTMLDivElement | null, i: number) => {
    if (el) cardsRef.current[i] = el;
  };

  useGSAP(() => {
    const cards = cardsRef.current.filter(Boolean);

    const services = gsap.utils.toArray("#portfolio-service-list .content");

    // if (services.length === 0) return;

    // gsap.to(services, {
    //   scale: 0.8,
    //   ease: "none",
    //   scrollTrigger: {
    //     trigger: "#portfolio-service-list",
    //     start: "top top",
    //     scrub: 0.8,
    //     markers: true,
    //   },
    // });

    // services.forEach((service, i) => {
    //   const next = services[i + 1];
    //   if (!next) return;

    //   gsap.to(service, {
    //     scaleY: 0.98,
    //     ease: "none",
    //     scrollTrigger: {
    //       trigger: "#portfolio-service-list-end",
    //       start: "top top",
    //       scrub: 0.8,
    //       markers: true,
    //     },
    //   });
    // });

    // cards.forEach((card) => {
    //   gsap.set(card, { scale: 1 });
    // });

    cards.forEach((card, i) => {
      const next = cards[i + 1];
      if (!next) return; // last one has no "next" trigger

      cards.forEach((previous, j) => {
        if (j > i) return;

        gsap.to(previous, {
          scale: (100 - (cards.length - (i + j))) / 100,
          filter: "blur(0px)",
          ease: "none",
          scrollTrigger: {
            trigger: card,
            // Tweak these to taste:
            // When next card's top hits 85% of viewport → start anim,
            // and by 40% → prev card is fully "active"
            start: "top 85%",
            end: "top 40%",
            scrub: true,
            // Optional: toggle a class if you want CSS-driven styling
            // toggleClass: { targets: card, className: "is-active" },
          },
        });
      });
    });
  }, {});

  return (
    <section
      ref={rootRef}
      className="max-w-7xl mx-auto relative"
      id="portfolio-service-section"
    >
      <div className="space-y-8">
        <H2AnimateOnScroll>What I Do /</H2AnimateOnScroll>
        <p>
          My expertise spans backend development, cloud-based solutions, data
          management, and security—helping businesses optimize their operations
          and stay ahead in the tech-driven world.
        </p>
        <div className="grid" id="portfolio-service-list">
          {whatIDo.map((el, i) => {
            const gap = isMobile ? 4 : 5;

            const marginBottom = (whatIDo.length - i - 1) * gap;

            const top = i * gap;

            return (
              <div
                key={i}
                ref={(node) => setCardRef(node, i)}
                className="content border-t-2 h-104 sticky pt-4 space-y-8 rounded-2xl border border-white/20 bg-black/10 backdrop-blur-xl backdrop-brightness-110 shadow-xl p-6"
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
                <div className="relative grid">
                  <div className="grid grid-cols-12 relative z-20">
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
              </div>
            );
          })}
          <div id="portfolio-service-list-end"></div>
        </div>
      </div>
    </section>
  );
}
