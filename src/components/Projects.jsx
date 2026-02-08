import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        id: 1,
        title: "Security Core",
        category: "System Architecture",
        description: "Enterprise vulnerability detection engine with real-time reporting.",
        src: "/img/gallery-1.webp", // Switched to WebP images for performance
        tags: ["Python", "Redis", "Docker"]
    },
    {
        id: 2,
        title: "Bug Trac",
        category: "SaaS Platform",
        description: "Collaborative vulnerability management for security teams.",
        src: "/img/gallery-2.webp",
        tags: ["Next.js", "PostgreSQL", "Prisma"]
    },
    {
        id: 3,
        title: "Net Guard",
        category: "Network Security",
        description: "High-performance API Gateway with distributed rate limiting.",
        src: "/img/gallery-3.webp",
        tags: ["Go", "gRPC", "Redis"]
    },
    {
        id: 4,
        title: "Portfolio v2",
        category: "Interactive WebGL",
        description: "Award-winning personal site with heavy GSAP integrations.",
        src: "/img/gallery-4.webp",
        tags: ["React", "Three.js", "GSAP"]
    },
    {
        id: 5,
        title: "Cipher Chat",
        category: "Cryptography",
        description: "End-to-end encrypted messaging protocol implementation.",
        src: "/img/gallery-5.webp",
        tags: ["Rust", "WASM", "Socket.io"]
    }
];

const ProjectRow = ({ project, setHoveredProject, index }) => {
    return (
        <div
            onMouseEnter={() => setHoveredProject(project)}
            className="group relative flex w-full cursor-pointer items-center justify-between border-b border-white/10 py-12 transition-all duration-300 hover:bg-white/[0.02] px-4 md:px-10"
        >
            <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:gap-12">
                <span className="font-mono text-xs text-zinc-600 md:text-sm">0{index + 1} //</span>
                <h3 className="font-zentry text-4xl uppercase text-zinc-400 transition-colors duration-300 group-hover:text-white md:text-6xl">
                    {project.title}
                </h3>
            </div>

            <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 hidden md:block">
                <div className="flex flex-col items-end gap-2 text-right">
                    <span className="font-mono text-xs text-white uppercase tracking-widest bg-white/10 px-2 py-1 rounded-sm">
                        {project.category}
                    </span>
                    <p className="max-w-xs font-general text-xs text-zinc-500">
                        {project.description}
                    </p>
                </div>
            </div>

            {/* Mobile only description */}
            <p className="mt-4 max-w-[200px] text-right font-general text-xs text-zinc-500 md:hidden">
                {project.category}
            </p>
        </div>
    );
};

const Projects = () => {
    const [hoveredProject, setHoveredProject] = useState(projects[0]);
    const previewRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        // Parallax effect for the preview image container
        const ctx = gsap.context(() => {
            gsap.to(previewRef.current, {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                },
                y: 100,
                ease: "none"
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} id="projects" className="relative min-h-screen bg-[#0a0a0a] py-32 overflow-hidden z-10">

            {/* Background Preview Image - Changes on Hover */}
            <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-20 mix-blend-screen transition-opacity duration-500">
                <div ref={previewRef} className="relative h-[60vh] w-[80vw] md:h-[80vh] md:w-[60vw]">
                    <img
                        key={hoveredProject.src} // Key change triggers fade if we add css animation, but keeping it simple for perf
                        src={hoveredProject.src}
                        alt="Project Preview"
                        className="h-full w-full object-cover grayscale opacity-50 blur-sm transition-all duration-700 ease-in-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
                </div>
            </div>

            <div className="container relative z-10 mx-auto px-4">
                <div className="mb-20 flex flex-col items-start border-b border-white/10 pb-8">
                    <h2 className="font-general text-xs uppercase tracking-[0.3em] text-zinc-500 mb-2">
                        System Log
                    </h2>
                    <h2 className="font-zentry text-6xl text-white uppercase md:text-8xl">
                        Selected Works
                    </h2>
                </div>

                <div className="flex flex-col">
                    {projects.map((project, index) => (
                        <ProjectRow
                            key={project.id}
                            project={project}
                            index={index}
                            setHoveredProject={setHoveredProject}
                        />
                    ))}
                </div>

                <div className="mt-20 flex justify-center">
                    <a href="https://github.com" target="_blank" rel="noreferrer" className="group flex items-center gap-4 text-zinc-500 hover:text-white transition-colors cursor-pointer">
                        <span className="font-mono text-xs uppercase tracking-widest">[ View All Archives ]</span>
                        <span className="font-mono text-lg group-hover:translate-x-2 transition-transform">→</span>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Projects;
