import useReducedMotion from "../useReducedMotion";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

const cipherCharacters = "0123456789#%+";
const revealSteps = 6;

function SkillLabel({ text }) {
  const reduced = useReducedMotion();
  const timer = useRef();
  const [frame, setFrame] = useState(null);

  useEffect(() => () => window.clearInterval(timer.current), []);

  const animate = (event, entering) => {
    if (reduced || event.pointerType !== "mouse") return;

    window.clearInterval(timer.current);
    let step = 0;
    setFrame({ step, entering });
    timer.current = window.setInterval(() => {
      step += 1;
      if (step >= revealSteps) {
        window.clearInterval(timer.current);
        setFrame(null);
      } else {
        setFrame({ step, entering });
      }
    }, 40);
  };

  const activeFrame = reduced ? null : frame;
  const scrambled = activeFrame && Array.from(text, (character, index) => {
    const distance = activeFrame.entering ? index : text.length - 1 - index;
    const revealed = distance < (activeFrame.step / revealSteps) * text.length;
    return revealed || character === " "
      ? character
      : cipherCharacters[(index * 3 + activeFrame.step * 5) % cipherCharacters.length];
  }).join("");

  return (
    <span
      className="skill-label"
      data-scrambling={activeFrame ? "" : undefined}
      style={activeFrame ? { "--pixel-step": activeFrame.step } : undefined}
      onPointerEnter={(event) => animate(event, true)}
      onPointerLeave={(event) => animate(event, false)}
    >
      <span className="skill-label-text">{text}</span>
      {activeFrame && <span className="skill-label-cipher" aria-hidden="true">{scrambled}</span>}
    </span>
  );
}

const SkillCategory = ({ title, skills, icon }) => {
  return (
    <div className="skill-category">
      <div className="mb-6 flex items-center justify-between gap-3">
        <h3 className="font-zentry text-3xl uppercase text-paper">
          <SkillLabel text={title} />
        </h3>
        {icon && (
          <img
            src={icon}
            loading="lazy"
            decoding="async"
            alt=""
            aria-hidden="true"
            className="size-8 object-contain opacity-40"
          />
        )}
      </div>

      <div className="flex flex-wrap gap-x-8 gap-y-4">
        {skills.map((skill) => (
          <div key={skill.name} className="flex flex-col">
            <span className="font-general text-sm text-paper font-medium">
              <SkillLabel text={skill.name} />
            </span>
            <span className="font-mono text-[12px] text-paper uppercase tracking-widest mt-1">
              {skill.desc}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const Skills = () => {
  const reduced = useReducedMotion();
  const containerRef = useRef(null);

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.from(".skill-category", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, [reduced]);

  const skillSets = [
    {
      title: "Full Stack Web",
      icon: "/img/torus.gif",
      skills: [
        { name: "React & Next.js", desc: "UI Architecture" },
        { name: "Tailwind & GSAP", desc: "WebGL Interaction" },
        { name: "Node.js", desc: "Runtime Environment" },
        { name: "JavaScript & TypeScript", desc: "Type Safety" },
        { name: "PostgreSQL", desc: "Relational DB" },
        { name: "MongoDB", desc: "NoSQL DB" },
        { name: "Redis", desc: "Cache Layer" },
        { name: "Python", desc: "Scripting / Backend" },
      ],
    },
    {
      title: "Cloud & DevOps",
      icon: "/img/earth.gif",
      skills: [
        { name: "AWS", desc: "Cloud Infrastructure" },
        { name: "Docker", desc: "Containerization" },
        { name: "Kubernetes", desc: "Orchestration" },
        { name: "CI/CD & Jenkins", desc: "Automation" },
        { name: "Terraform", desc: "IaC" },
        { name: "Linux", desc: "System Admin" },
      ],
    },
  ];

  return (
    <section
      ref={containerRef}
      id="skills"
      className="skills-surface relative z-10 min-h-screen overflow-hidden px-4 py-32 md:px-10"
    >
      <div aria-hidden="true" className="skills-blend" />
      <img
        src="/img/skills-architecture-cutout.png"
        alt=""
        loading="lazy"
        decoding="async"
        className="skills-architecture pointer-events-none absolute inset-y-0 right-0 h-full w-[85%] max-w-3xl object-contain object-right [image-rendering:pixelated]"
      />

      <h2 className="relative mb-20 font-zentry text-6xl uppercase text-paper md:text-8xl">
        <SkillLabel text="Technical Stack" />
      </h2>

      <div className="relative grid w-full grid-cols-1 gap-20 lg:grid-cols-2 lg:gap-12">
        {skillSets.map((set) => (
          <SkillCategory
            key={set.title}
            title={set.title}
            icon={set.icon}
            skills={set.skills}
          />
        ))}
      </div>
    </section>
  );
};

export default Skills;
