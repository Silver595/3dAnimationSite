const projects = [
    {
        num: "01",
        title: "Security Scanner",
        description: "Automated vulnerability detection for web apps",
        tech: "Python, Flask",
        year: "2024",
    },
    {
        num: "02",
        title: "Portfolio v2",
        description: "Minimal portfolio with smooth animations",
        tech: "React, GSAP",
        year: "2024",
    },
    {
        num: "03",
        title: "API Gateway",
        description: "Secure gateway with rate limiting",
        tech: "Node.js, Redis",
        year: "2023",
    },
    {
        num: "04",
        title: "Bug Tracker",
        description: "Platform for tracking vulnerabilities",
        tech: "Next.js, PostgreSQL",
        year: "2023",
    },
];

const Projects = () => {
    return (
        <section id="projects" className="py-32 section-padding border-t border-[#1a1a1a]">
            <div className="max-w-5xl">
                {/* Section label */}
                <p className="text-xs tracking-[0.3em] uppercase text-[#555] mb-12">
                    Selected Work
                </p>

                {/* Project list */}
                <div className="space-y-0">
                    {projects.map((project) => (
                        <div
                            key={project.num}
                            className="group py-8 border-b border-[#1a1a1a] flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:pl-4 transition-all duration-300"
                        >
                            {/* Left side */}
                            <div className="flex items-start md:items-center gap-6">
                                <span className="text-xs text-[#444] font-mono">{project.num}</span>
                                <div>
                                    <h3 className="text-xl md:text-2xl font-medium group-hover:text-white transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-sm text-[#666] mt-1">{project.description}</p>
                                </div>
                            </div>

                            {/* Right side */}
                            <div className="flex items-center gap-8 md:gap-12">
                                <span className="text-xs text-[#555]">{project.tech}</span>
                                <span className="text-xs text-[#444]">{project.year}</span>
                                <span className="text-sm text-[#555] group-hover:text-white group-hover:translate-x-1 transition-all">
                                    →
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* More link */}
                <div className="mt-12">
                    <a
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[#666] hover:text-white transition-colors"
                    >
                        View all on GitHub →
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Projects;
