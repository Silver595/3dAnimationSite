import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import AnimatedTitle from "./AnimatedTitle";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const sectionRef = useRef(null);
    const containerRef = useRef(null);

    useGSAP(() => {
        const sections = gsap.utils.toArray(".about-panel");

        gsap.to(sections, {
            xPercent: -100 * (sections.length - 1),
            ease: "none",
            scrollTrigger: {
                trigger: sectionRef.current,
                pin: true,
                scrub: 1,
                end: "+=3000",
                snap: 1 / (sections.length - 1),
            }
        });
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} id="about" className="relative h-screen w-screen overflow-hidden bg-[#0a0a0a]">
            <div ref={containerRef} className="flex h-full w-[300vw]">

                {/* PANEL 1: INTRO */}
                <div className="about-panel relative h-full w-screen flex-shrink-0 flex items-center justify-center p-10 border-r border-white/5">
                    <div className="absolute inset-0 z-0">
                        {/* Abstract BG */}
                        <div className="absolute inset-0 bg-[#0a0a0a]" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] bg-white/5 rounded-full blur-[120px] opacity-20" />
                    </div>

                    <div className="relative z-10 text-center max-w-4xl mx-auto">
                        <p className="font-mono text-sm uppercase text-zinc-500 tracking-[0.3em] mb-6">
                            01 // About Me
                        </p>
                        <AnimatedTitle
                            title="Se<b>c</b>uring <br /> the d<b>i</b>gital realm"
                            containerClass="!text-white !text-6xl md:!text-8xl"
                        />
                        <div className="mt-12 flex flex-col items-center gap-6">
                            <p className="font-general text-xl text-zinc-300 max-w-2xl leading-relaxed">
                                I am a security researcher and full-stack developer dedicated to building resilient systems.
                            </p>
                            <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest max-w-md">
                                [ SYSTEM STATUS: OPERATIONAL ]<br />
                                [ LOCATION: CLASSIFIED ]
                            </p>
                        </div>
                    </div>
                </div>

                {/* PANEL 2: PHILOSOPHY */}
                <div className="about-panel relative h-full w-screen flex-shrink-0 flex items-center justify-between p-10 md:p-32 border-r border-white/5 bg-[#0b0b0b]">
                    <div className="flex flex-col flex-1 items-start z-10 max-w-xl">
                        <p className="font-mono text-sm uppercase text-zinc-500 tracking-[0.3em] mb-6">
                            02 // Philosophy
                        </p>
                        <h3 className="font-zentry text-6xl text-white mb-8">
                            Hacker's <br /> Mindset
                        </h3>
                        <p className="font-general text-zinc-400 text-lg leading-relaxed mb-6">
                            To build secure systems, one must understand how to break them. My approach combines offensive security testing with defensive architectural patterns.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <span className="w-12 h-[1px] bg-zinc-600" />
                                <span className="font-mono text-xs text-zinc-300 uppercase tracking-widest">Proactive Defense</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="w-12 h-[1px] bg-zinc-600" />
                                <span className="font-mono text-xs text-zinc-300 uppercase tracking-widest">Zero Trust Arch</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="w-12 h-[1px] bg-zinc-600" />
                                <span className="font-mono text-xs text-zinc-300 uppercase tracking-widest">Automated Security</span>
                            </div>
                        </div>
                    </div>

                    <div className="relative h-[60vh] w-[30vw] hidden md:block rounded-sm overflow-hidden border border-white/10">
                        <img
                            src="/img/about.webp"
                            alt="Philosophy"
                            className="absolute inset-0 h-full w-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700 hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    </div>
                </div>

                {/* PANEL 3: CREDENTIALS */}
                <div className="about-panel relative h-full w-screen flex-shrink-0 flex items-center justify-center p-10 bg-[#0a0a0a]">
                    <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
                        <div>
                            <p className="font-mono text-sm uppercase text-zinc-500 tracking-[0.3em] mb-6">
                                03 // Credentials
                            </p>
                            <h3 className="font-zentry text-5xl md:text-7xl text-white mb-8">
                                Certi<br />fied
                            </h3>
                            <p className="font-general text-zinc-400 max-w-md">
                                Validated expertise in cloud security, penetration testing, and secure coding practices.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                            {[
                                { title: "OSCP", date: "2023", org: "OffSec" },
                                { title: "AWS Solutions Architect", date: "2024", org: "Amazon" },
                                { title: "CISSP", date: "Pending", org: "ISC2" }
                            ].map((cert, i) => (
                                <div key={i} className="group flex items-center justify-between border-b border-white/10 py-6 hover:bg-white/[0.02] px-4 transition-colors">
                                    <div>
                                        <h4 className="font-mono text-xl text-white mb-1 group-hover:text-zinc-200">{cert.title}</h4>
                                        <p className="font-mono text-xs text-zinc-600 uppercase tracking-widest">{cert.org}</p>
                                    </div>
                                    <span className="font-mono text-sm text-zinc-500">{cert.date}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default About;