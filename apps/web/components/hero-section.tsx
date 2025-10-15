// components/hero-section.tsx
import Image from "next/image";

export default function HeroSection() {
  return (
    <section
      data-hero
      className="relative overflow-hidden bg-white"
      aria-label="Hero"
    >
      <div className="container mx-auto grid items-center gap-12 px-6 py-24 md:grid-cols-2 md:py-36 lg:gap-16">
        {/* Copy */}
        <div className="max-w-xl">
          <h1
            data-hero-headline
            className="text-4xl/tight md:text-6xl font-semibold tracking-tight"
          >
            {/* Split lines: wrapper (overflow-hidden) -> line span (animated) */}
            <span className="block overflow-hidden">
              <span className="block will-change-transform translate-y-full motion-reduce:translate-y-0">
                Modern animations,
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className="block will-change-transform translate-y-full motion-reduce:translate-y-0">
                SSR-friendly by design.
              </span>
            </span>
          </h1>

          <p
            data-hero-subhead
            className="mt-5 max-w-prose text-base md:text-lg text-gray-600 opacity-0 translate-y-3 will-change-transform motion-reduce:opacity-100 motion-reduce:transform-none"
          >
            GSAP powered, Tailwind styled, with a single client entrypoint.
            Respecting{" "}
            <span className="font-medium">prefers-reduced-motion</span> and
            avoiding layout shift—because details matter.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              data-hero-cta
              data-magnetic
              href="#features"
              className="group inline-flex items-center justify-center rounded-xl bg-black px-6 py-3 text-white text-sm md:text-base font-medium shadow-sm opacity-0 translate-y-3 will-change-transform motion-reduce:opacity-100 motion-reduce:transform-none focus:outline-none focus-visible:ring-2 focus-visible:ring-black/50 transition-transform motion-safe:duration-200"
            >
              Explore features
              <svg
                className="ml-2 size-4 transition-transform group-hover:translate-x-0.5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12.293 3.293a1 1 0 011.414 0l4 4a.999.999 0 01.083 1.32l-.083.094-4 4a1 1 0 01-1.497-1.32l.083-.094L14.585 9H3a1 1 0 01-.117-1.993L3 7h11.585l-2.292-2.293a1 1 0 010-1.414z" />
              </svg>
            </a>

            <a
              href="#docs"
              className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-white px-6 py-3 text-sm md:text-base font-medium text-gray-900 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 transition-transform motion-safe:hover:scale-[1.02]"
            >
              View docs
            </a>
          </div>
        </div>

        {/* Visual */}
        <div className="relative">
          <div
            data-parallax
            className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl ring-1 ring-black/5"
          >
            <Image
              src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop"
              alt=""
              fill
              sizes="(min-width: 768px) 48rem, 100vw"
              priority
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-white/40 mix-blend-multiply" />
          </div>
          <p className="mt-4 text-sm text-gray-500">
            Subtle parallax on scroll; no layout shift.
          </p>
        </div>
      </div>
    </section>
  );
}
