import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const SkillCategory = ({ title, skills, index }) => {
    return (
        <div className="skill-category group border-l border-white/10 pl-8 relative">
            <div className="absolute -left-[1px] top-0 h-0 w-[1px] bg-white transition-all duration-700 group-hover:h-full" />

            <div className="mb-6 flex items-center gap-3">
                <span className="font-mono text-xs text-zinc-600">0{index + 1}</span>
                <h3 className="font-zentry text-3xl uppercase text-zinc-400 transition-colors group-hover:text-white">
                    {title}
                </h3>
            </div>

            <div className="flex flex-wrap gap-x-8 gap-y-4">
                {skills.map((skill) => (
                    <div key={skill.name} className="flex flex-col">
                        <span className="font-general text-sm text-zinc-300 font-medium">
                            {skill.name}
                        </span>
                        <span className="font-mono text-[9px] text-zinc-600 uppercase tracking-widest mt-1">
                            {skill.desc}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
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
                ease: "power3.out"
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const skillSets = [
        {
            title: "Full Stack Web",
            skills: [
                { name: "React / Next.js", desc: "UI Architecture" },
                { name: "Three.js / GSAP", desc: "WebGL Interaction" },
                { name: "Node.js", desc: "Runtime Environment" },
                { name: "TypeScript", desc: "Type Safety" },
                { name: "PostgreSQL", desc: "Relational DB" },
                { name: "Redis", desc: "Cache Layer" },
                { name: "Python", desc: "Scripting / Backend" }
            ]
        },
        {
            title: "Cloud & DevOps",
            skills: [
                { name: "AWS", desc: "Cloud Infrastructure" },
                { name: "Docker", desc: "Containerization" },
                { name: "Kubernetes", desc: "Orchestration" },
                { name: "CI/CD", desc: "GitHub Actions" },
                { name: "Terraform", desc: "IaC" },
                { name: "Linux", desc: "System Admin" }
            ]
        },
        {
            title: "Security & Net",
            skills: [
                { name: "Vulnerability Assessment", desc: "Offensive Security" },
                { name: "Burp Suite", desc: "Penetration Testing" },
                { name: "Wireshark", desc: "Packet Analysis" },
                { name: "TCP/IP & OSI", desc: "Protocol Stack" },
                { name: "Cryptography", desc: "Data Protection" },
                { name: "OWASP Top 10", desc: "Security Standards" }
            ]
        }
    ];

    return (
        <section ref={containerRef} id="skills" className="min-h-screen bg-[#0a0a0a] py-32 px-4 md:px-10 relative z-10 border-t border-white/5">

            {/* Technical Header */}
            <div className="mb-20 flex flex-col items-start border-b border-white/10 pb-8">
                <h2 className="font-general text-xs uppercase tracking-[0.3em] text-zinc-500 mb-2 font-mono">
                    {">"} System Capabilities
                </h2>
                <h2 className="font-zentry text-6xl text-white uppercase md:text-8xl opacity-90">
                    Technical Stack
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8">
                {skillSets.map((set, i) => (
                    <SkillCategory
                        key={set.title}
                        title={set.title}
                        skills={set.skills}
                        index={i}
                    />
                ))}
            </div>

            {/* Decorative Grid Background */}
            <div className="absolute inset-0 z-[-1] opacity-5 pointer-events-none bg-[url('/img/grid.svg')] bg-center" />
        </section>
    );
};

export default Skills;
