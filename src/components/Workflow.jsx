
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import AnimatedTitle from "./AnimatedTitle";
import { FiTarget, FiCpu, FiShield } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const Workflow = () => {
    const containerRef = useRef(null);

    useGSAP(() => {
        // Reveal Cards
        gsap.from(".workflow-card", {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 70%",
            },
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
        });

        // Connect Lines Animation
        gsap.from(".connect-line", {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 70%",
            },
            scaleX: 0,
            duration: 1.5,
            ease: "power2.inOut",
            transformOrigin: "left",
            delay: 0.5,
        });
    }, { scope: containerRef });

    const steps = [
        {
            icon: <FiTarget size={32} />,
            title: "Reconnaissance",
            subtitle: "Identify & Analyze",
            desc: "Deep systematic scanning of target infrastructure to map attack surfaces and identify potential entry points."
        },
        {
            icon: <FiCpu size={32} />,
            title: "Exploitation",
            subtitle: "Test & Breach",
            desc: "Controlled execution of attack vectors to validate vulnerabilities, simulating real-world threat actors."
        },
        {
            icon: <FiShield size={32} />,
            title: "Fortification",
            subtitle: "Patch & Secure",
            desc: "Implementing architectural hardening and security controls to eliminate risks and ensure resilience."
        }
    ];

    return (
        <section id="workflow" ref={containerRef} className="min-h-screen bg-[#0a0a0a] py-32 px-4 md:px-10 relative z-10 border-t border-white/5">
            <div className="mb-24 flex flex-col items-center text-center">
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-500 mb-2">
                    Operational Protocol
                </p>
                <AnimatedTitle
                    title="The <b>S</b>ecurity <br /> Work<b>f</b>low"
                    containerClass="!text-white !text-5xl md:!text-7xl"
                />
            </div>

            <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Connecting Line (Desktop) */}
                <div className="hidden md:block absolute top-[20%] left-[16%] right-[16%] h-[1px] bg-gradient-to-r from-white/5 via-white/20 to-white/5 connect-line z-0" />

                {steps.map((step, i) => (
                    <div key={i} className="workflow-card relative z-10 group">
                        <div className="p-8 rounded-2xl bg-[#111] border border-white/10 hover:border-white/30 transition-all duration-500 min-h-[300px] flex flex-col items-center text-center group-hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]">

                            {/* Icon Container */}
                            <div className="mb-6 p-4 rounded-full bg-white/5 text-white border border-white/10 group-hover:bg-white group-hover:text-black transition-colors duration-500">
                                {step.icon}
                            </div>

                            <h3 className="font-zentry text-2xl uppercase text-white mb-1 group-hover:text-zinc-200">{step.title}</h3>
                            <p className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest mb-6">{step.subtitle}</p>

                            <p className="font-general text-sm text-zinc-400 leading-relaxed max-w-xs mx-auto">
                                {step.desc}
                            </p>

                            {/* Number Bg */}
                            <span className="absolute bottom-4 right-6 font-zentry text-8xl text-white/[0.03] pointer-events-none select-none">
                                0{i + 1}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Global Grid Bg */}
            <div className="absolute inset-0 z-[-1] opacity-5 pointer-events-none bg-[url('/img/grid.svg')] bg-center" />
        </section>
    );
};

export default Workflow;
