import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "Jotion",
    category: "Web Application",
    description: "A Notion-inspired note-taking workspace with rich text editing, tree-structured notes, and real-time cloud sync.",
    src: "/img/san-francisco.webp",
    tags: ["Next.js", "ConvexDB", "Prisma"],
    link: "https://personal-diary-psi.vercel.app/",
  },
  {
    id: 2,
    title: "ShadowBox",
    category: "Local AI Tool",
    description: "A privacy-first, offline image search engine powered by AI. Search your local photo library using natural language.",
    src: "/img/lofoten.webp",
    tags: ["Python", "ChromaDB", "OpenAI CLIP"],
    link: "https://github.com/Silver595/ShadowBox",
  },
  {
    id: 3,
    title: "Cloud-Native 3-Tier",
    category: "AWS / Kubernetes",
    description: "Production-style 3-tier system running on AWS EKS with automated CI/CD, security scanning, and hardened deployments.",
    src: "/img/new-york.webp",
    tags: ["AWS EKS", "Kubernetes", "Terraform"],
    link: "https://github.com/Silver595/user_management_platform",
  },
  {
    id: 4,
    title: "TechMock",
    category: "Full-Stack Platform",
    description: "Full-stack technical interview platform with real-time video/audio, screen sharing, and integrated collaborative editor.",
    src: "/img/italy.webp",
    tags: ["WebRTC", "Node.js", "Socket.io"],
    link: "https://techmock.vercel.app/",
  },
  {
    id: 5,
    title: "Time Travel",
    category: "Chrome Extension",
    description: "Split-screen temporal web comparison engine leveraging the Wayback Machine archive against live sites.",
    src: "/img/coast.jpg",
    tags: ["JavaScript", "Browser API", "CSS"],
    link: "https://chromewebstore.google.com/detail/ogckpcboinbcohhilmofkalobpkolkib",
  },
];

const Projects = () => {
  const [activeProject, setActiveProject] = useState(projects[0]);

  const containerRef = useRef(null);
  const listRef = useRef(null);
  const floatingModalRef = useRef(null);
  const modalImgRef = useRef(null);

  // Smooth cursor follower physics (GSAP quickTo for 60fps)
  const xTo = useRef(null);
  const yTo = useRef(null);
  const rotateTo = useRef(null);
  const lastX = useRef(0);

  useEffect(() => {
    if (!floatingModalRef.current) return;

    xTo.current = gsap.quickTo(floatingModalRef.current, "x", {
      duration: 0.5,
      ease: "power3.out",
    });
    yTo.current = gsap.quickTo(floatingModalRef.current, "y", {
      duration: 0.5,
      ease: "power3.out",
    });
    rotateTo.current = gsap.quickTo(floatingModalRef.current, "rotation", {
      duration: 0.5,
      ease: "power3.out",
    });

    const ctx = gsap.context(() => {
      // Soft staggered reveal of rows
      gsap.from(".project-item", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          once: true,
        },
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
        clearProps: "transform,opacity",
      });

      // Ambient parallax on the background watermark
      gsap.to(".project-watermark", {
        y: -120,
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

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    xTo.current?.(x);
    yTo.current?.(y);

    const deltaX = e.clientX - lastX.current;
    lastX.current = e.clientX;
    const tilt = gsap.utils.clamp(-8, 8, deltaX * 0.3);
    rotateTo.current?.(tilt);
  };

  const handleMouseEnterRow = (project) => {
    setActiveProject(project);

    if (floatingModalRef.current) {
      gsap.to(floatingModalRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: "power3.out",
        overwrite: "auto",
      });
    }

    // Gentle image settle on hover change
    if (modalImgRef.current) {
      gsap.fromTo(
        modalImgRef.current,
        { scale: 1.08, opacity: 0.6 },
        { scale: 1, opacity: 1, duration: 0.6, ease: "power2.out", overwrite: "auto" }
      );
    }
  };

  const handleMouseLeaveList = () => {
    if (floatingModalRef.current) {
      gsap.to(floatingModalRef.current, {
        scale: 0.85,
        opacity: 0,
        duration: 0.35,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  };

  return (
    <section
      ref={containerRef}
      id="projects"
      onMouseMove={handleMouseMove}
      className="relative min-h-screen md:h-screen w-full bg-[#0a0a0a] px-6 sm:px-10 md:px-16 py-10 overflow-hidden z-10 select-none flex flex-col"
    >
      {/* Background Watermark Parallax */}
      <div className="project-watermark pointer-events-none absolute right-4 top-1/3 -translate-y-1/2 opacity-[0.03] select-none text-[20vw] font-zentry uppercase tracking-tighter text-white leading-none">
        WORKS
      </div>

      {/* Floating Cursor Preview (Desktop only) */}
      <div
        ref={floatingModalRef}
        className="pointer-events-none absolute left-0 top-0 z-50 hidden md:block -translate-x-1/2 -translate-y-1/2 opacity-0 scale-75 will-change-transform"
        style={{ width: "360px", height: "230px" }}
      >
        <div className="relative size-full overflow-hidden rounded-xl bg-[#121212] shadow-2xl shadow-black/60">
          <img
            ref={modalImgRef}
            src={activeProject.src}
            alt={activeProject.title}
            className="size-full object-cover grayscale contrast-115 will-change-transform"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-widest text-white/90">
              {activeProject.category}
            </span>
            <span className="font-mono text-[10px] uppercase text-zinc-400">
              View ↗
            </span>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex h-full w-full flex-1 flex-col">
        {/* Section Header */}
        <div className="mb-6 flex flex-col items-start pb-4">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-500 mb-2">
            Selected Works
          </p>
          <h2 className="font-zentry text-4xl sm:text-6xl md:text-7xl text-white uppercase leading-[0.9] tracking-tight">
            Featured Works
          </h2>
        </div>

        {/* Project List: rows share the window height; others dim when one is hovered */}
        <div
          ref={listRef}
          onMouseLeave={handleMouseLeaveList}
          className="group/list flex min-h-0 flex-1 flex-col"
        >
          {projects.map((project, index) => (
            <a
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => handleMouseEnterRow(project)}
              className="project-item group relative flex w-full flex-1 cursor-pointer flex-col md:flex-row items-start md:items-center justify-between py-6 md:py-0 px-3 sm:px-6 transition-opacity duration-500 ease-out group-hover/list:opacity-30 hover:!opacity-100"
            >
              {/* Left side: Index + Title + Description */}
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-3 sm:gap-8 transition-transform duration-500 ease-out group-hover:translate-x-3">
                <span className="font-mono text-xs md:text-sm text-zinc-600 group-hover:text-zinc-300 transition-colors duration-500">
                  0{index + 1}
                </span>

                <div className="max-w-2xl">
                  <div className="flex items-center gap-3">
                    <h3 className="font-zentry text-3xl sm:text-4xl md:text-5xl uppercase text-zinc-300 transition-colors duration-500 group-hover:text-white">
                      {project.title}
                    </h3>
                    <span className="text-sm font-mono text-zinc-600 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1">
                      ↗
                    </span>
                  </div>

                  <p className="mt-2 font-general text-xs sm:text-sm text-zinc-500 leading-relaxed max-w-xl transition-colors duration-500 group-hover:text-zinc-300">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Right side: Category & Tags (plain text, no boxes) */}
              <div className="mt-4 md:mt-0 flex flex-row md:flex-col items-start md:items-end gap-3 md:gap-2 text-left md:text-right">
                <span className="font-mono text-xs uppercase tracking-widest text-zinc-400 transition-colors duration-500 group-hover:text-white">
                  {project.category}
                </span>

                <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-wider">
                  {project.tags.join(" · ")}
                </span>
              </div>

              {/* Mobile Preview Thumbnail (Touch devices) */}
              <div className="mt-4 w-full md:hidden rounded-lg overflow-hidden h-36">
                <img
                  src={project.src}
                  alt={project.title}
                  className="size-full object-cover grayscale"
                />
              </div>
            </a>
          ))}
        </div>

        {/* Archives Link */}
        <div className="mt-4 flex justify-center">
          <a
            href="https://github.com/Silver595"
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-3 text-zinc-500 hover:text-white transition-colors duration-500 cursor-pointer py-2 px-6"
          >
            <span className="font-mono text-xs uppercase tracking-widest">
              View all on GitHub
            </span>
            <span className="font-mono text-lg transition-transform duration-500 group-hover:translate-x-2">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
