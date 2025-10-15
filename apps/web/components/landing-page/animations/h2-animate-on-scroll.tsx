"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import React from "react";

import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { H2 } from "@/components/typography/typography";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

export function H2AnimateOnScroll({ ...props }: React.ComponentProps<"h2">) {
  const scopeRef = React.useRef<HTMLDivElement | null>(null);
  const h1Ref = React.useRef<HTMLHeadingElement | null>(null);

  useGSAP(
    () => {
      const split = SplitText.create(h1Ref.current!, {
        type: "words,chars",
        linesClass: "split-line",
      });
      gsap.set(split.chars, { opacity: 0, yPercent: 100 });

      gsap
        .timeline({
          defaults: { ease: "circ.out", duration: 0.5 },
          scrollTrigger: {
            trigger: h1Ref.current,
            start: "top 90%%",
          },
        })
        .to(split.chars, {
          duration: 0.6,
          opacity: 1,
          yPercent: 0,
          stagger: 0.02,
          clearProps: "transform,opacity",
        });
    },
    { scope: scopeRef }
  );

  return (
    <div ref={scopeRef}>
      <H2
        {...props}
        ref={h1Ref}
        className="tracking-tight motion-reduce:opacity-100 motion-reduce:transform-none"
      />
    </div>
  );
}
