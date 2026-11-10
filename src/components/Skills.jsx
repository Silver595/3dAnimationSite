import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import PropTypes from "prop-types";
gsap.registerPlugin(ScrollTrigger);

const SkillCategory = ({ title, skills, index, icon }) => {
  return (
    <div className="skill-category group border-l border-white/10 pl-8 relative">
      <div className="absolute -left-[1px] top-0 h-0 w-[1px] bg-white transition-all duration-700 group-hover:h-full" />

      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-zinc-600">{index + 1}</span>
          <h3 className="font-zentry text-3xl uppercase text-zinc-400 transition-colors group-hover:text-white">
            {title}
          </h3>
        </div>
        {icon && (
          <img
            src={icon}
            alt=""
            aria-hidden="true"
            className="size-8 object-contain opacity-40 group-hover:opacity-80 transition-opacity"
          />
        )}
      </div>

      <div className="flex flex-wrap gap-x-8 gap-y-4">
        {skills.map((skill) => (
          <div key={skill.name} className="flex flex-col">
            <span className="font-general text-sm text-zinc-300 font-medium">
              {skill.name}
            </span>
            <span className="font-mono text-[12px] text-zinc-600 uppercase tracking-widest mt-1">
              {skill.desc}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

SkillCategory.propTypes = {
  title: PropTypes.string.isRequired,
  skills: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      desc: PropTypes.string.isRequired,
    }),
  ).isRequired,
  index: PropTypes.number.isRequired,
  icon: PropTypes.string,
};
const Skills = () => {
  const containerRef = useRef(null);

  useEffect(() => {
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

      gsap.to(".skills-statue", {
        y: -80,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

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
      className="min-h-screen bg-[#0a0a0a] py-32 px-4 md:px-10 relative z-10 border-t border-white/5 overflow-hidden"
    >
      <img
        src="/img/laocoon.png"
        alt=""
        aria-hidden="true"
        className="skills-statue pointer-events-none absolute right-4 md:right-16 bottom-8 h-[55%] object-contain opacity-[0.035] select-none filter invert grayscale will-change-transform"
      />

      <div className="mb-20 flex flex-col items-start border-b border-white/10 pb-8">

        <h2 className="font-zentry text-6xl text-white uppercase md:text-8xl opacity-90">
          Technical Stack
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-12">
        {skillSets.map((set, i) => (
          <SkillCategory
            key={set.title}
            title={set.title}
            icon={set.icon}
            skills={set.skills}
            index={i}
          />
        ))}
      </div>


      <div className="absolute inset-0 z-[-1] opacity-5 pointer-events-none bg-[url('/img/intricate_minimal.svg')] bg-center" />
    </section>
  );
};

export default Skills;
