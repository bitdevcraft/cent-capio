
import { H2AnimateOnScroll } from "./animations/h2-animate-on-scroll";
import { TextScrambleOnScroll } from "./animations/text-scramble-on-scroll";

const skills = [
  {
    title: "Languages",
    items: [
      "C",
      "C++",
      "Assembly",
      "Typescript",
      "Javascript",
      "C#",
      "Java",
      "SQL",
    ],
  },
  {
    title: "Frameworks & Libraries",
    items: [
      "React.js",
      "Nextjs",
      "Astro",
      "Angular",
      "TailwindCSS",
      ".Net Core",
      ".Net Framework",
      "Django",
      "Node.js",
      "Express",
      "Stripe",
      "GSAP",
      "Framer Motion",
    ],
  },
  {
    title: "Database & Tools",
    items: [
      "PostgresSQL",
      "SQL Server",
      "MySQL",
      "MongoDB",
      "Docker",
      "Git",
      "Azure",
      "AWS",
      "Figma",
    ],
  },
];

export function PortfolioSkills() {
  return (
    <section className="max-w-7xl mx-auto relative">
      <div className="space-y-8 flex gap-8 flex-col md:flex-row">
        <div>
          <H2AnimateOnScroll>Developer</H2AnimateOnScroll>
          <H2AnimateOnScroll>Engineer</H2AnimateOnScroll>
          <H2AnimateOnScroll>Designer/Creator</H2AnimateOnScroll>
        </div>
        <div className="flex gap-4">
          {skills.map((el) => (
            <div key={el.title}>
              <p className="hidden md:flex text-xl font-semibold mb-4">
                {el.title}
              </p>
              <ul>
                {el.items.map((item) => (
                  <li
                    key={item}
                    className="group relative block h-fit overflow-hidden font-medium select-none"
                  >
                    <div className="font-mono block w-full transition-transform duration-[0.4s] ease-[cubic-bezier(.51,.92,.24,1.15)] translate-y-0 group-hover:-translate-y-full">
                      <TextScrambleOnScroll text={item} className="" />
                    </div>
                    <p className="font-mono absolute top-0 left-0 w-full block transition-transform duration-[0.4s] ease-[cubic-bezier(.51,.92,.24,1.15)] translate-y-full group-hover:translate-y-0">
                      {item}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
