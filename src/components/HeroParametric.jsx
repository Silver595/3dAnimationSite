/**
 * HeroParametric.jsx — Zaha Hadid-Inspired Parametric Architecture Hero
 *
 * Design Philosophy:
 * This component channels the language of parametric architecture — sweeping continuous
 * curves, structural ribs that flow like aerodynamic fins, and a grand archway that
 * frames the video like looking through a Hadid museum entrance. Every element curves;
 * nothing is perpendicular. The layout is deliberately asymmetric, with the title
 * "Akash" placed monumentally across the arch. On scroll, the arch expands to consume
 * the viewport — a transition from intimate portal to immersive environment.
 *
 * Color Palette: Deep charcoal (#0a0a0a) with warm ivory/cream (#f5f0e8) accents.
 * Typography: Monumental, letter-spaced title using special-font hero-heading classes.
 */

import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

/* ─── SVG Path Definitions ────────────────────────────────────────────────────
 * Architectural archway and structural rib curves, all using cubic beziers
 * for that fluid parametric feel. Viewbox is 1440x900 for a wide canvas.
 * ──────────────────────────────────────────────────────────────────────────── */

// Grand archway — a tall parabolic-Gothic arch with parametric flare
const ARCH_PATH =
  "M0,900 L0,320 C0,320 120,20 360,10 C500,4 620,80 720,80 C820,80 940,4 1080,10 C1320,20 1440,320 1440,320 L1440,900 Z";

// Structural rib curves — sweeping lines that evoke Hadid's structural language
const RIB_PATHS = [
  // Primary sweeping rib — left to right, dramatic arc
  "M-40,800 C200,700 400,150 720,120 C1040,90 1240,600 1480,750",
  // Secondary rib — tighter curve, slightly offset
  "M-40,850 C180,740 380,200 700,170 C1020,140 1260,650 1480,800",
  // Counter-curve — flows the opposite direction for tension
  "M-40,200 C250,300 500,750 750,780 C1000,810 1200,400 1480,250",
  // High thin rib — almost flat, elegant horizon line
  "M-40,150 C300,100 600,60 720,55 C840,50 1140,90 1480,140",
  // Low sweeping rib — grounds the composition
  "M-40,700 C200,650 450,400 720,380 C990,360 1240,600 1480,680",
  // Delicate accent rib
  "M-40,500 C300,450 550,250 720,230 C890,210 1140,400 1480,480",
];

// Navigation waypoint positions along the primary rib curve
const WAYPOINTS = [
  { cx: 200, cy: 720 },
  { cx: 440, cy: 300 },
  { cx: 720, cy: 120 },
  { cx: 1000, cy: 280 },
  { cx: 1260, cy: 660 },
];

const Hero = () => {
  const containerRef = useRef(null);
  const archRef = useRef(null);
  const ribsRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const quoteRef = useRef(null);
  const buttonsRef = useRef(null);
  const videoRef = useRef(null);
  const waypointsRef = useRef(null);
  const glowRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      /* ── Phase 1: Arch Draws Itself ──────────────────────────────────────
       * The archway outline traces in via strokeDashoffset animation,
       * revealing the architectural form like a blueprint coming to life.
       */
      const archOutline = containerRef.current?.querySelector(".arch-outline");
      if (archOutline) {
        const pathLength = archOutline.getTotalLength?.() || 3200;
        gsap.set(archOutline, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
        });
        tl.to(
          archOutline,
          {
            strokeDashoffset: 0,
            duration: 2.2,
            ease: "power2.inOut",
          },
          0
        );
      }

      /* ── Phase 1b: Warm Glow Fade In ─────────────────────────────────── */
      if (glowRef.current) {
        tl.from(
          glowRef.current,
          { opacity: 0, scale: 0.8, duration: 2, ease: "power2.out" },
          0.4
        );
      }

      /* ── Phase 2: Arch Fill Reveals Video ────────────────────────────── */
      const archFill = containerRef.current?.querySelector(".arch-fill");
      if (archFill) {
        tl.from(
          archFill,
          { opacity: 0, duration: 1.4, ease: "power2.inOut" },
          1.0
        );
      }

      /* ── Phase 3: Structural Ribs Sweep In ───────────────────────────── */
      const ribs = ribsRef.current?.querySelectorAll(".structural-rib");
      if (ribs?.length) {
        ribs.forEach((rib) => {
          const len = rib.getTotalLength?.() || 2000;
          gsap.set(rib, {
            strokeDasharray: len,
            strokeDashoffset: len,
          });
        });
        tl.to(
          ribs,
          {
            strokeDashoffset: 0,
            duration: 1.8,
            stagger: 0.12,
            ease: "power2.inOut",
          },
          1.2
        );
      }

      /* ── Phase 4: Monumental Title ───────────────────────────────────── */
      if (titleRef.current) {
        tl.from(
          titleRef.current,
          {
            opacity: 0,
            scale: 0.8,
            y: 40,
            duration: 1.6,
            ease: "elastic.out(1, 0.6)",
          },
          1.8
        );
      }

      /* ── Phase 5: Subtitle & Quote Sequenced ─────────────────────────── */
      if (subtitleRef.current) {
        tl.from(
          subtitleRef.current,
          { opacity: 0, y: 20, duration: 1, ease: "power2.out" },
          2.4
        );
      }
      if (quoteRef.current) {
        tl.from(
          quoteRef.current,
          { opacity: 0, y: 15, duration: 1, ease: "power2.out" },
          2.7
        );
      }

      /* ── Phase 6: Buttons Appear ─────────────────────────────────────── */
      if (buttonsRef.current) {
        tl.from(
          buttonsRef.current.children,
          { opacity: 0, y: 15, stagger: 0.15, duration: 0.8 },
          3.0
        );
      }

      /* ── Phase 7: Waypoint Dots Pulse In ─────────────────────────────── */
      const dots = waypointsRef.current?.querySelectorAll(".waypoint-dot");
      if (dots?.length) {
        tl.from(
          dots,
          {
            scale: 0,
            opacity: 0,
            stagger: 0.1,
            duration: 0.6,
            ease: "back.out(3)",
          },
          2.0
        );
      }

      /* ── ScrollTrigger: Arch Expansion ───────────────────────────────────
       * On scroll the archway clip-path expands from its elegant narrow form
       * to fill the entire viewport. This uses a CSS clip-path transition
       * driven by GSAP ScrollTrigger with scrub for buttery smooth feel.
       */
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        // Expand the archway container via scale + clip-path morph
        const archContainer =
          containerRef.current?.querySelector(".arch-viewport");
        if (archContainer) {
          gsap.to(archContainer, {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 1.5,
            },
          });
        }

        // Parallax depth on structural rib layers
        const ribLayers =
          ribsRef.current?.querySelectorAll(".structural-rib");
        if (ribLayers?.length) {
          ribLayers.forEach((rib, i) => {
            const direction = i % 2 === 0 ? -1 : 1;
            const intensity = 30 + i * 15;
            gsap.to(rib, {
              y: direction * intensity,
              ease: "none",
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true,
              },
            });
          });
        }

        // Title parallax — moves slower for depth
        if (titleRef.current) {
          gsap.to(titleRef.current, {
            y: -60,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
        }
      });

      // Mobile adjustments
      mm.add("(max-width: 767px)", () => {
        const archContainer =
          containerRef.current?.querySelector(".arch-viewport");
        if (archContainer) {
          gsap.to(archContainer, {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: "50% top",
              scrub: 1,
            },
          });
        }
      });

      /* ── Video Pause/Play on Visibility ──────────────────────────────── */
      if (videoRef.current) {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          onLeave: () => videoRef.current?.pause(),
          onEnterBack: () => videoRef.current?.play(),
        });
      }
    },
    { scope: containerRef }
  );

  /* ── Waypoint Pulse Animation (CSS-driven, always running) ─────────── */
  useEffect(() => {
    const dots = waypointsRef.current?.querySelectorAll(".waypoint-ring");
    if (!dots?.length) return;
    // Gentle infinite pulse using GSAP
    const pulse = gsap.to(dots, {
      scale: 1.8,
      opacity: 0,
      duration: 2,
      stagger: { each: 0.3, repeat: -1 },
      ease: "power1.out",
    });
    return () => pulse.kill();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-dvh w-screen overflow-x-hidden bg-[#0a0a0a]"
    >
      {/* ━━━ Warm Gradient Glow Behind Arch ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
       * A soft radial gradient creates the illusion of warm light
       * emanating from behind the archway — like golden hour through stone.
       */}
      <div
        ref={glowRef}
        className="absolute inset-0 z-0 flex items-center justify-center"
      >
        <div
          className="h-[80vh] w-[60vw] rounded-full blur-[120px] opacity-30"
          style={{
            background:
              "radial-gradient(ellipse at center, #f5f0e8 0%, #c4a97d 30%, #0a0a0a 70%)",
          }}
        />
      </div>

      {/* ━━━ Structural Rib Lines (SVG Layer) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
       * Thin sweeping curves that overlay the entire viewport,
       * creating the skeleton of a parametric building.
       * Multiple layers at different opacities for depth.
       */}
      <svg
        ref={ribsRef}
        className="absolute inset-0 z-10 h-full w-full pointer-events-none"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        {RIB_PATHS.map((d, i) => (
          <path
            key={`rib-${i}`}
            d={d}
            className="structural-rib"
            stroke="#f5f0e8"
            strokeWidth={i === 0 || i === 2 ? 1.5 : 0.8}
            strokeOpacity={i < 2 ? 0.2 : 0.08 + i * 0.02}
            fill="none"
            style={{ willChange: "transform" }}
          />
        ))}
      </svg>

      {/* ━━━ Floating Navigation Waypoints ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
       * Small pulsing dots along the primary rib curve,
       * like structural nodes in an architectural diagram.
       */}
      <svg
        ref={waypointsRef}
        className="absolute inset-0 z-20 h-full w-full pointer-events-none hidden md:block"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        {WAYPOINTS.map((wp, i) => (
          <g key={`wp-${i}`} className="waypoint-dot">
            {/* Pulse ring */}
            <circle
              className="waypoint-ring"
              cx={wp.cx}
              cy={wp.cy}
              r={4}
              fill="none"
              stroke="#f5f0e8"
              strokeWidth={0.8}
              opacity={0.4}
            />
            {/* Solid core */}
            <circle
              cx={wp.cx}
              cy={wp.cy}
              r={2.5}
              fill="#f5f0e8"
              opacity={0.6}
            />
          </g>
        ))}
      </svg>

      {/* ━━━ Architectural Archway — Video Viewport ━━━━━━━━━━━━━━━━━━━━━━
       * The grand parametric arch that frames the video. Uses an inline
       * SVG clipPath with cubic bezier curves for that fluid tunnel feel.
       * On scroll, the clip-path expands from arch to fullscreen.
       */}
      <div className="absolute inset-0 z-30">
        {/* SVG Clip Path Definition */}
        <svg className="absolute" width="0" height="0" aria-hidden="true">
          <defs>
            <clipPath id="arch-clip" clipPathUnits="objectBoundingBox">
              {/* Normalized arch path (0-1 range) for use as CSS clip-path */}
              <path
                d="M0,1 L0,0.356 C0,0.356 0.083,0.022 0.25,0.011
                   C0.347,0.004 0.431,0.089 0.5,0.089
                   C0.569,0.089 0.653,0.004 0.75,0.011
                   C0.917,0.022 1,0.356 1,0.356 L1,1 Z"
              />
            </clipPath>
          </defs>
        </svg>

        {/* Arch Viewport — clips the video into the archway shape */}
        <div
          className="arch-viewport absolute inset-0 overflow-hidden"
          style={{
            clipPath: "url(#arch-clip)",
            transition: "clip-path 0.1s linear",
          }}
        >
          {/* Video Background */}
          <video
            ref={videoRef}
            src="/videos/hero-1.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 h-full w-full object-cover object-center opacity-25 grayscale contrast-125 will-change-transform"
          />

          {/* Gradient overlay inside the arch */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/60 to-[#0a0a0a]/90" />

          {/* Inner vignette for depth */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 50% 30%, transparent 30%, #0a0a0a 80%)",
            }}
          />
        </div>

        {/* Arch Outline — the drawn SVG stroke that traces the archway form */}
        <svg
          ref={archRef}
          className="absolute inset-0 h-full w-full pointer-events-none"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
        >
          <path
            className="arch-outline"
            d={ARCH_PATH}
            stroke="#f5f0e8"
            strokeWidth={1.2}
            strokeOpacity={0.35}
            fill="none"
          />
          {/* Secondary inner arch line for depth */}
          <path
            d="M30,900 L30,340 C30,340 145,45 370,35 C505,29 618,100 720,100 C822,100 935,29 1070,35 C1295,45 1410,340 1410,340 L1410,900"
            stroke="#f5f0e8"
            strokeWidth={0.6}
            strokeOpacity={0.12}
            fill="none"
          />
        </svg>
      </div>

      {/* ━━━ Content Layer ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
       * Asymmetric layout: the title sits dramatically large near the
       * center-top (spanning the arch), with supporting text positioned
       * lower-left in an offset composition.
       */}
      <div className="absolute inset-0 z-40 flex flex-col items-center justify-center pointer-events-none">
        {/* ── Monumental Title ──────────────────────────────────────────── */}
        <h1
          ref={titleRef}
          className="special-font hero-heading text-[#f5f0e8] opacity-90 tracking-[0.15em] md:tracking-[0.25em] text-center select-none"
          style={{
            mixBlendMode: "difference",
            textShadow: "0 0 80px rgba(245, 240, 232, 0.08)",
          }}
        >
          Akash
        </h1>

        {/* ── Subtitle & Quote Block — Offset Below ────────────────────── */}
        <div className="mt-6 md:mt-8 flex flex-col items-center gap-4 md:gap-5 max-w-lg px-6">
          <p
            ref={subtitleRef}
            className="font-general text-lg md:text-xl text-[#f5f0e8]/70 font-light tracking-[0.3em] uppercase text-center"
          >
            Developer{" "}
            <span className="text-[#f5f0e8]/25 mx-2">&#9752;</span> Human
          </p>

          <p
            ref={quoteRef}
            className="text-[#f5f0e8]/30 text-xs md:text-sm leading-relaxed text-center max-w-sm italic"
          >
            Somewhere, my Vinland still waits. I&apos;m still searching for
            the road that leads there.
          </p>

          {/* ── CTA Buttons ────────────────────────────────────────────── */}
          <div
            ref={buttonsRef}
            className="pt-4 md:pt-6 flex gap-4 pointer-events-auto"
          >
            <a
              href="#projects"
              className="group relative px-7 py-3 text-sm tracking-widest uppercase overflow-hidden border border-[#f5f0e8]/20 text-[#f5f0e8] transition-all duration-500 hover:border-[#f5f0e8]/50"
              style={{ borderRadius: "2px" }}
            >
              {/* Hover fill sweep */}
              <span className="absolute inset-0 bg-[#f5f0e8] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
              <span className="relative z-10 group-hover:text-[#0a0a0a] transition-colors duration-500">
                Projects
              </span>
            </a>
            <a
              href="#contact"
              className="group relative px-7 py-3 text-sm tracking-widest uppercase overflow-hidden border border-[#f5f0e8]/10 text-[#f5f0e8]/60 transition-all duration-500 hover:border-[#f5f0e8]/30 hover:text-[#f5f0e8]"
              style={{ borderRadius: "2px" }}
            >
              <span className="absolute inset-0 bg-[#f5f0e8]/5 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
              <span className="relative z-10 transition-colors duration-500">
                Contact
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* ━━━ Decorative Corner Marks ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
       * Small architectural reference marks in corners — like construction
       * drawing registration marks. Adds technical precision to the organic curves.
       */}
      <div className="absolute top-6 left-6 z-50 hidden md:block">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M0,12 L0,0 L12,0" stroke="#f5f0e8" strokeWidth="0.5" strokeOpacity="0.2" />
        </svg>
      </div>
      <div className="absolute top-6 right-6 z-50 hidden md:block">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M24,12 L24,0 L12,0" stroke="#f5f0e8" strokeWidth="0.5" strokeOpacity="0.2" />
        </svg>
      </div>
      <div className="absolute bottom-6 left-6 z-50 hidden md:block">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M0,12 L0,24 L12,24" stroke="#f5f0e8" strokeWidth="0.5" strokeOpacity="0.2" />
        </svg>
      </div>
      <div className="absolute bottom-6 right-6 z-50 hidden md:block">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M24,12 L24,24 L12,24" stroke="#f5f0e8" strokeWidth="0.5" strokeOpacity="0.2" />
        </svg>
      </div>

      {/* ━━━ Scroll Indicator ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
       * A minimal downward indicator at the bottom center,
       * styled as an architectural datum line.
       */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 opacity-30">
        <span className="text-[#f5f0e8] text-[9px] tracking-[0.4em] uppercase font-light">
          Scroll
        </span>
        <svg width="1" height="32" viewBox="0 0 1 32">
          <line
            x1="0.5"
            y1="0"
            x2="0.5"
            y2="32"
            stroke="#f5f0e8"
            strokeWidth="1"
            className="animate-pulse"
          />
        </svg>
      </div>
    </div>
  );
};

export default Hero;
