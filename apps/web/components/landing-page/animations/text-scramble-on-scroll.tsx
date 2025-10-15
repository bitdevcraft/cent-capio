"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import React from "react";

import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { cn } from "@repo/ui/lib/utils";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, ScrambleTextPlugin);

export function TextScrambleOnScroll({
  text,
  ...props
}: Omit<React.ComponentProps<"p">, "children"> & { text: string }) {
  const scopeRef = React.useRef<HTMLDivElement | null>(null);
  const pRef = React.useRef<HTMLParagraphElement | null>(null);

  const upperAndLowerCase =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const getRandomLetter = () =>
    upperAndLowerCase[Math.round(upperAndLowerCase.length * Math.random())];

  const initial = React.useMemo(
    () =>
      Array.from({ length: text.length })
        .map(() => getRandomLetter())
        .join(""),
    [getRandomLetter, text.length]
  );

  useGSAP(
    () => {
      gsap
        .timeline({
          defaults: { ease: "circ.out", duration: 0.5 },
          scrollTrigger: {
            trigger: pRef.current,
            start: "top 80%",
            markers: true,
          },
        })
        .to(pRef.current!, {
          overwrite: true,
          duration: 3,
          scrambleText: {
            text: text,
            chars: "upperAndLowerCase",
            speed: 0.8,
          },
        });
    },
    { scope: scopeRef }
  );

  return (
    <div ref={scopeRef}>
      <p
        {...props}
        ref={pRef}
        className={cn(
          "tracking-tight motion-reduce:opacity-100 motion-reduce:transform-none",
          props.className
        )}
      >
        {initial}
      </p>
    </div>
  );
}
