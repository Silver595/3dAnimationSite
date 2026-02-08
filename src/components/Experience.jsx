import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const [activeRole, setActiveRole] = useState(0);
  const containerRef = useRef(null);
  const detailsRef = useRef(null);

  const roles = [
    {
      title: "Security Researcher",
      company: "Bug Bounty (HackerOne/Integrity)",
      period: "2024 - Present",
      location: "Remote",
      tasks: [
        "Identified critical IDOR and XSS vulnerabilities in enterprise applications.",
        "Automated reconnaissance workflows using custom Python scripts.",
        "Collaborated with security teams to validate and patch reported issues."
      ],
      tech: ["Burp Suite", "Python", "Bash"]
    },
    {
      title: "Full Stack Developer",
      company: "Freelance / Open Source",
      period: "2023 - Present",
      location: "Remote",
      tasks: [
        "Architected secure web applications using Next.js and Go.",
        "Implemented JWT-based authentication with refresh token rotation.",
        "Optimized database queries reducing latency by 40%."
      ],
      tech: ["React", "Node.js", "PostgreSQL"]
    },
    {
      title: "DevOps Engineer",
      company: "Personal Lab",
      period: "2023 - 2024",
      location: "Home Lab",
      tasks: [
        "Deployed K8s cluster on bare metal for hosting microservices.",
        "Configured CI/CD pipelines with GitHub Actions and Docker Hub.",
        "Hardened Linux servers using CIS benchmarks."
      ],
      tech: ["Docker", "Kubernetes", "Linux"]
    }
  ];

  useEffect(() => {
    // Animate detail view on change
    if (detailsRef.current) {
      gsap.fromTo(detailsRef.current,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [activeRole]);

  return (
    <section id="experience" ref={containerRef} className="min-h-screen bg-[#0a0a0a] py-32 px-4 md:px-10 relative z-10 border-t border-white/5">

      {/* Header */}
      <div className="mb-20 flex flex-col items-start border-b border-white/10 pb-8">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-500 mb-2">
          {">"} Career History
        </p>
        <AnimatedTitle
          title="Profe<b>s</b>sional <br /> Exp<b>e</b>rience"
          containerClass="!text-white !text-5xl md:!text-7xl"
        />
      </div>

      <div className="flex flex-col md:flex-row gap-12 md:gap-20 max-w-7xl mx-auto">

        {/* Left: Role Selector (Server List) */}
        <div className="flex flex-col gap-2 w-full md:w-1/3">
          {roles.map((role, index) => (
            <button
              key={index}
              onClick={() => setActiveRole(index)}
              className={`group relative flex items-center justify-between p-6 text-left transition-all duration-300 border-l-2 
                            ${activeRole === index
                  ? "bg-white/[0.03] border-white text-white"
                  : "border-white/10 text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.01]"
                }`}
            >
              <div>
                <h4 className="font-zentry text-xl uppercase tracking-wider">{role.company}</h4>
                <p className="font-mono text-[10px] mt-1">{role.period}</p>
              </div>

              {/* Active Indicator */}
              <div className={`h-2 w-2 rounded-full shadow-[0_0_10px_currentColor] 
                                ${activeRole === index ? "bg-white" : "bg-zinc-800"}`}
              />
            </button>
          ))}
        </div>

        {/* Right: Detailed View (Terminal) */}
        <div className="w-full md:w-2/3 relative min-h-[400px]">
          <div ref={detailsRef} className="bg-[#111] border border-white/10 p-8 md:p-12 rounded-lg shadow-2xl relative overflow-hidden group">

            {/* Terminal Header */}
            <div className="flex items-center justify-between border-b border-white/5 pb-6 mb-6">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-zinc-700" />
                <div className="w-3 h-3 rounded-full bg-zinc-700" />
                <div className="w-3 h-3 rounded-full bg-zinc-700" />
              </div>
              <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest">
                user: root // mode: secure
              </span>
            </div>

            {/* Content */}
            <h3 className="font-general text-3xl md:text-4xl text-white mb-2">
              {roles[activeRole].title}
            </h3>
            <p className="font-mono text-sm text-zinc-400 mb-8 uppercase tracking-widest">
              @ {roles[activeRole].company} // {roles[activeRole].location}
            </p>

            <div className="space-y-4 mb-8">
              {roles[activeRole].tasks.map((task, i) => (
                <div key={i} className="flex gap-4 group/item">
                  <span className="font-mono text-zinc-600 group-hover/item:text-white transition-colors">{">"}</span>
                  <p className="font-general text-zinc-300 text-sm md:text-base leading-relaxed group-hover/item:text-white transition-colors">
                    {task}
                  </p>
                </div>
              ))}
            </div>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5">
              {roles[activeRole].tech.map((item, i) => (
                <span key={i} className="px-3 py-1 bg-white/5 border border-white/5 rounded text-[10px] uppercase tracking-widest text-zinc-400 font-mono hover:bg-white/10 transition-colors">
                  {item}
                </span>
              ))}
            </div>

            {/* Background Effect */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Grid BG */}
      <div className="absolute inset-0 z-[-1] opacity-5 pointer-events-none bg-[url('/img/grid.svg')] bg-center" />
    </section>
  );
};

export default Experience;