// components/features-grid.tsx
export default function FeaturesGrid() {
  return (
    <section
      id="features"
      data-features
      className="bg-white py-24 md:py-32"
      aria-label="Feature highlights"
    >
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">
            Production-ready building blocks
          </h2>
          <p className="mt-4 text-base md:text-lg text-gray-600">
            Smart defaults with tasteful motion—easy to customize, easy to
            maintain.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "SSR hygiene",
              body: "Only one client entry; everything else stays server components.",
            },
            {
              title: "Scroll-linked",
              body: "GSAP + ScrollTrigger drive scrubbed timelines and pins.",
            },
            {
              title: "Reduced motion",
              body: "Honors user settings with instant, static fallbacks.",
            },
            {
              title: "No layout shift",
              body: "Pre-hide with Tailwind and reveal under strict control.",
            },
            {
              title: "Micro-interactions",
              body: "Subtle hover states and optional magnetic CTAs.",
            },
            {
              title: "Tailwind-first",
              body: "Utility classes only—no CSS Modules or inline styles.",
            },
          ].map((item, i) => (
            <article
              key={i}
              data-features-card
              className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm opacity-0 translate-y-6 will-change-transform motion-reduce:opacity-100 motion-reduce:transform-none"
            >
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
