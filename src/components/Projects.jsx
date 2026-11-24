import useReducedMotion from "../useReducedMotion";
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
    src: "/img/jotion.webp",
    tags: ["Next.js", "ConvexDB", "Prisma"],
    link: "https://personal-diary-psi.vercel.app/",
  },
  {
    id: 2,
    title: "Secure Production CI/CD Pipeline",
    category: "AWS, DevSecOps",
    description: "An end-to-end production-grade deployment pipeline for Production Level Application, featuring IAC , CVE finder, security policies, and Kubernetes deployment hardening.",
    src: "/img/Real_World_Production_cicd.webp",
    tags: ["AWS EKS", "Kubernetes", "Terraform", "Docker", "Jenkins", "DevSecOps"],
    link: "https://github.com/Silver595/user_management_platform",
  },
  {
    id: 3,
    title: "TechMock",
    category: "Full-Stack Platform",
    description: "Full-stack technical interview platform with real-time video/audio, screen sharing, and integrated real time dynamic collaborative editor.",
    src: "/img/TechMock.webp",
    tags: ["WebRTC", "Node.js", "Socket.io"],
    link: "https://techmock.vercel.app/",
  },
  {
    id: 4,
    title: "Time Travel",
    category: "Chrome Extension",
    description: "Split-screen temporal web comparison engine leveraging the Wayback Machine archive against live sites.",
    src: "/img/Time_Travel.webp",
    tags: ["JavaScript", "Browser API", "CSS"],
    link: "https://chromewebstore.google.com/detail/ogckpcboinbcohhilmofkalobpkolkib",
  },
  {
    id: 5,
    title: "SelfGrowthOS",
    category: "Personal Growth Platform",
    description: "A personal growth and habit-tracking platform designed to help users build consistent habits, track daily progress, reflect through journaling, and take control of their personal development.",
    src: "/img/SelfGrowthOs.webp",
    tags: ["React", "Node.js", "PostgreSQL", "Clerk", "GSAP"],
    link: "https://selfgrowthos.lovable.app/",
  },
];

const previewSize = { width: 360, height: 230 };
const hoverPreview = window.matchMedia("(min-width: 768px) and (any-hover: hover) and (any-pointer: fine)");

const Projects = () => {
  const reduced = useReducedMotion();
  const [activeProject, setActiveProject] = useState(projects[0]);

  const containerRef = useRef(null);
  const floatingModalRef = useRef(null);
  const modalImgRef = useRef(null);

  const xTo = useRef(null);
  const yTo = useRef(null);
  const rotateTo = useRef(null);
  const lastX = useRef(0);

  useEffect(() => {
    if (reduced) return;
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
  }, [reduced]);

  const handleMouseMove = (e) => {
    if (reduced || !hoverPreview.matches || e.pointerType !== "mouse" || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    // Leave room for the rotating corners at the section edges.
    const halfWidth = previewSize.width / 2 + 20;
    const halfHeight = previewSize.height / 2 + 20;
    const x = gsap.utils.clamp(halfWidth, rect.width - halfWidth, e.clientX - rect.left);
    const y = gsap.utils.clamp(halfHeight, rect.height - halfHeight, e.clientY - rect.top);

    xTo.current?.(x);
    yTo.current?.(y);

    const deltaX = e.clientX - lastX.current;
    lastX.current = e.clientX;
    const tilt = gsap.utils.clamp(-8, 8, deltaX * 0.3);
    rotateTo.current?.(tilt);
  };

  const handleMouseEnterRow = (event, project) => {
    if (reduced || !hoverPreview.matches || event.pointerType !== "mouse") return;
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

    if (modalImgRef.current) {
      gsap.fromTo(
        modalImgRef.current,
        { scale: 1.08, opacity: 0.6 },
        { scale: 1, opacity: 1, duration: 0.6, ease: "power2.out", overwrite: "auto" }
      );
    }
  };

  const handleMouseLeaveList = () => {
    if (!reduced && floatingModalRef.current) {
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
      onPointerMove={handleMouseMove}
      className="relative min-h-screen w-full bg-surface px-6 sm:px-10 md:px-16 py-10 overflow-hidden z-10 select-none flex flex-col"
    >
      <div className="project-watermark pointer-events-none absolute right-4 top-1/3 -translate-y-1/2 opacity-[0.03] select-none text-[20vw] font-zentry uppercase tracking-tighter text-content leading-none">
        WORKS
      </div>

      <div
        ref={floatingModalRef}
        className="project-modal pointer-events-none absolute left-0 top-0 z-50 hidden -translate-x-1/2 -translate-y-1/2 opacity-0 scale-75 will-change-transform"
        style={previewSize}
      >
        <div className="relative size-full overflow-hidden rounded-xl bg-ink shadow-2xl shadow-ink/30">
          <img
            ref={modalImgRef}
            src={activeProject.src}
            alt={activeProject.title}
            className="size-full object-cover contrast-115 will-change-transform"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-transparent" />
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-widest text-paper">
              {activeProject.category}
            </span>
            <span className="font-mono text-[10px] uppercase text-paper">
              View ↗
            </span>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex w-full flex-1 flex-col">
        <div className="mb-6 flex flex-col items-start pb-4">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted mb-2">
            Selected
          </p>
          <h2 className="font-zentry text-4xl sm:text-6xl md:text-7xl text-content uppercase leading-[0.9] tracking-tight">
            Featured
          </h2>
        </div>

        <div
          onPointerLeave={handleMouseLeaveList}
          className="flex flex-1 flex-col"
        >
          {projects.map((project) => (
            <a
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              onPointerEnter={(event) => handleMouseEnterRow(event, project)}
              className="project-item group relative flex w-full flex-1 cursor-pointer flex-col items-start justify-between px-3 py-6 sm:px-6 md:py-3 hover:bg-accent/10 focus-visible:bg-accent/10"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-3 sm:gap-8 transition-transform duration-500 ease-out group-hover:translate-x-3">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-3">
                    <h3 className="font-zentry text-3xl sm:text-4xl md:text-5xl uppercase text-content transition-colors duration-500 group-hover:text-content">
                      {project.title}
                    </h3>
                    <span className="text-sm font-mono text-muted opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1">
                      ↗
                    </span>
                  </div>

                  <p className="mt-2 font-general text-xs sm:text-sm text-muted leading-relaxed max-w-xl transition-colors duration-500 group-hover:text-content">
                    {project.description}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex min-w-0 flex-row flex-wrap items-start gap-3 text-left md:mt-0 md:flex-col md:items-end md:gap-2 md:text-right">
                <span className="font-mono text-xs uppercase tracking-widest text-muted transition-colors duration-500 group-hover:text-content">
                  {project.category}
                </span>

                <span className="font-mono text-[10px] text-muted uppercase tracking-wider">
                  {project.tags.join(" · ")}
                </span>
              </div>

              <div className="project-inline-preview mt-4 h-36 w-full overflow-hidden rounded-lg">
                <img
                  loading="lazy"
                  src={project.src}
                  alt={project.title}
                  className="size-full object-cover"
                />
              </div>
            </a>
          ))}
        </div>

        <div className="mt-4 flex justify-center">
          <a
            href="https://github.com/Silver595"
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-3 text-muted hover:text-content transition-colors duration-500 cursor-pointer py-2 px-6"
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
