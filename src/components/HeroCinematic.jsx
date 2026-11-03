/**
 * HeroCinematic.jsx
 * 
 * DESIGN: Hybrid Parametric Archway + Cinematic Dark Film Noir
 * 
 * Inspired by Christopher Nolan's visual language — grand architectural portals,
 * volumetric lighting, film grain, and theatrical staging. The hero video is
 * revealed through a gothic/elliptical archway SVG mask, surrounded by deep
 * darkness, atmospheric fog, and cinematic letterboxing that retracts on load.
 * 
 * Key visual layers (back to front):
 *  1. True black background
 *  2. Video visible ONLY through the arch (SVG clipPath mask)
 *  3. Volumetric spotlight (radial gradient, warm amber)
 *  4. Fog/smoke wisps drifting across the lower viewport
 *  5. Dramatic vignette overlay
 *  6. Film grain noise overlay (continuous CSS animation)
 *  7. Decorative bronze arch trace lines (animated strokeDashoffset)
 *  8. Monumental typography centered inside the arch
 *  9. Cinematic letterbox bars (retract on entrance)
 */

import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────── SVG Arch Path ─────────────────────────── */
// A grand gothic/elliptical arch — tall, symmetrical, with a pointed apex.
// Defined in a 1000x1000 viewBox; used both as a clip-path and decorative stroke.
const ARCH_PATH =
  "M 500 50 " +
  "C 200 50, 80 300, 80 550 " +   // left curve sweeping down
  "C 80 750, 200 950, 500 950 " +  // left base curving to center-bottom
  "C 800 950, 920 750, 920 550 " + // right base curving up
  "C 920 300, 800 50, 500 50 Z";   // right curve back to apex

// Inner decorative line — slightly inset from the main arch
const ARCH_INNER_PATH =
  "M 500 80 " +
  "C 220 80, 110 320, 110 555 " +
  "C 110 740, 220 920, 500 920 " +
  "C 780 920, 890 740, 890 555 " +
  "C 890 320, 780 80, 500 80 Z";

// Second inner decorative line — even more inset
const ARCH_INNER_PATH_2 =
  "M 500 110 " +
  "C 240 110, 140 340, 140 560 " +
  "C 140 730, 240 890, 500 890 " +
  "C 760 890, 860 730, 860 560 " +
  "C 860 340, 760 110, 500 110 Z";

const Hero = () => {
  const containerRef = useRef(null);
  const archGroupRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const quoteRef = useRef(null);
  const buttonsRef = useRef(null);
  const letterboxTopRef = useRef(null);
  const letterboxBottomRef = useRef(null);
  const spotlightRef = useRef(null);
  const fogRef = useRef(null);
  const decorLine1Ref = useRef(null);
  const decorLine2Ref = useRef(null);
  const videoRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });

      /* ── Phase 1: Cinematic Letterbox Retraction ── */
      // Bars start at 15vh and shrink to 0, revealing the full viewport
      tl.to(
        [letterboxTopRef.current, letterboxBottomRef.current],
        {
          height: 0,
          duration: 1.8,
          ease: "power2.inOut",
        },
        0.3
      );

      /* ── Phase 2: Arch Portal Fade-In ── */
      tl.fromTo(
        archGroupRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 1.6, ease: "power2.out" },
        1.0
      );

      /* ── Phase 3: Decorative Bronze Lines Trace In ── */
      // Simulate drawSVG by animating strokeDashoffset
      [decorLine1Ref.current, decorLine2Ref.current].forEach((line) => {
        if (!line) return;
        const length = line.getTotalLength();
        gsap.set(line, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
        tl.to(
          line,
          {
            strokeDashoffset: 0,
            duration: 2.4,
            ease: "power1.inOut",
          },
          1.8
        );
      });

      /* ── Phase 4: Title Rise ── */
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 60, scale: 0.92 },
        { opacity: 1, y: 0, scale: 1, duration: 1.4, ease: "power2.out" },
        2.4
      );

      /* ── Phase 5: Subtitle + Quote + Buttons (cinematic timing — slow, deliberate) ── */
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" },
        3.2
      );
      tl.fromTo(
        quoteRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" },
        3.6
      );
      tl.fromTo(
        buttonsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.0, ease: "power2.out" },
        4.0
      );

      /* ── Continuous: Spotlight Breathing ── */
      gsap.to(spotlightRef.current, {
        opacity: 0.18,
        duration: 4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      /* ── Continuous: Fog Wisps Drift ── */
      const fogWisps = fogRef.current?.querySelectorAll(".fog-wisp");
      fogWisps?.forEach((wisp, i) => {
        // Stagger initial positions
        gsap.set(wisp, { x: i % 2 === 0 ? "-30%" : "110%" });
        gsap.to(wisp, {
          x: i % 2 === 0 ? "110%" : "-30%",
          duration: 25 + i * 8,
          ease: "none",
          repeat: -1,
        });
        // Gentle vertical oscillation
        gsap.to(wisp, {
          y: "+=20",
          duration: 4 + i * 1.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      });

      /* ── ScrollTrigger: Fly-Through Portal Effect ── */
      // On scroll, the arch scales up creating the illusion of flying through the portal
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.5,
        onUpdate: (self) => {
          const progress = self.progress;
          const scale = 1 + progress * 0.8; // scale 1 → 1.8
          const opacity = 1 - progress * 1.2; // fade out

          gsap.set(archGroupRef.current, {
            scale: scale,
            opacity: Math.max(0, opacity),
          });

          // Subtle spotlight intensity shift on scroll
          gsap.set(spotlightRef.current, {
            scale: 1 + progress * 0.3,
          });
        },
      });

      /* ── Video pause/play on viewport leave/enter ── */
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

  return (
    <div
      ref={containerRef}
      className="relative h-dvh w-screen overflow-hidden"
      style={{ background: "#000000" }}
    >
      {/* ═══════════════════ LAYER 1: Video + Arch Mask ═══════════════════ */}
      {/* SVG definitions — clipPath for the archway mask */}
      <svg className="absolute" width="0" height="0" aria-hidden="true">
        <defs>
          <clipPath id="arch-clip" clipPathUnits="objectBoundingBox">
            {/* Normalized to 0-1 range from 0-1000 viewBox */}
            <path
              d={
                "M 0.5 0.05 " +
                "C 0.2 0.05, 0.08 0.3, 0.08 0.55 " +
                "C 0.08 0.75, 0.2 0.95, 0.5 0.95 " +
                "C 0.8 0.95, 0.92 0.75, 0.92 0.55 " +
                "C 0.92 0.3, 0.8 0.05, 0.5 0.05 Z"
              }
            />
          </clipPath>
        </defs>
      </svg>

      {/* Arch group — everything that scales on scroll for the fly-through */}
      <div
        ref={archGroupRef}
        className="absolute inset-0 flex items-center justify-center"
        style={{ opacity: 0, willChange: "transform, opacity" }}
      >
        {/* Video container masked by the arch */}
        <div
          className="relative w-[85vmin] h-[85vmin] md:w-[55vmin] md:h-[75vmin] lg:w-[50vmin] lg:h-[80vmin]"
          style={{ clipPath: "url(#arch-clip)" }}
        >
          {/* Warm dark base behind video */}
          <div
            className="absolute inset-0"
            style={{ background: "#1a1510" }}
          />

          {/* Video — desaturated, slightly warm */}
          <video
            ref={videoRef}
            src="/videos/hero-1.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              filter: "saturate(0.4) contrast(1.2) brightness(0.7) sepia(0.15)",
              mixBlendMode: "lighten",
            }}
          />

          {/* Inner vignette within the arch */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 45%, transparent 30%, rgba(0,0,0,0.7) 100%)",
            }}
          />
        </div>

        {/* ═══════════ Decorative Bronze Arch Lines (SVG strokes) ═══════════ */}
        <svg
          className="absolute w-[85vmin] h-[85vmin] md:w-[55vmin] md:h-[75vmin] lg:w-[50vmin] lg:h-[80vmin]"
          viewBox="0 0 1000 1000"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ pointerEvents: "none" }}
        >
          {/* Outer decorative line */}
          <path
            ref={decorLine1Ref}
            d={ARCH_INNER_PATH}
            stroke="#c8a97e"
            strokeWidth="1.5"
            fill="none"
            opacity="0.6"
          />
          {/* Inner decorative line */}
          <path
            ref={decorLine2Ref}
            d={ARCH_INNER_PATH_2}
            stroke="#c8a97e"
            strokeWidth="0.8"
            fill="none"
            opacity="0.35"
          />
        </svg>

        {/* ═══════════ Content Inside the Arch ═══════════ */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
          {/* Monumental Title */}
          <h1
            ref={titleRef}
            className="special-font hero-heading text-center pointer-events-auto"
            style={{
              color: "#f0e8d8",
              letterSpacing: "0.15em",
              textShadow:
                "0 0 60px rgba(200,169,126,0.3), 0 0 120px rgba(200,169,126,0.15), 0 4px 20px rgba(0,0,0,0.8)",
              opacity: 0,
            }}
          >
            Akash
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="font-general text-base md:text-xl tracking-[0.3em] uppercase mt-4 md:mt-6"
            style={{ color: "#8a8070", opacity: 0 }}
          >
            Developer <span className="mx-2 opacity-50">☘</span> Human
          </p>

          {/* Quote */}
          <p
            ref={quoteRef}
            className="text-xs md:text-sm mt-6 md:mt-8 max-w-[280px] md:max-w-sm text-center leading-relaxed italic"
            style={{ color: "#6a6055", opacity: 0 }}
          >
            &ldquo;Somewhere, my Vinland still waits.
            <br />
            I&rsquo;m still searching for the road that leads there.&rdquo;
          </p>

          {/* Action Buttons */}
          <div
            ref={buttonsRef}
            className="mt-8 md:mt-10 flex gap-4 pointer-events-auto"
            style={{ opacity: 0 }}
          >
            <a
              href="#projects"
              className="group relative px-6 py-2.5 text-sm tracking-widest uppercase transition-all duration-500"
              style={{
                color: "#f0e8d8",
                border: "1px solid #c8a97e55",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(200,169,126,0.1)";
                e.currentTarget.style.borderColor = "#c8a97e";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.borderColor = "#c8a97e55";
              }}
            >
              Projects
            </a>
            <a
              href="#contact"
              className="group relative px-6 py-2.5 text-sm tracking-widest uppercase transition-all duration-500"
              style={{
                color: "#8a8070",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                e.currentTarget.style.color = "#f0e8d8";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                e.currentTarget.style.color = "#8a8070";
              }}
            >
              Contact
            </a>
          </div>
        </div>
      </div>

      {/* ═══════════════════ LAYER 2: Volumetric Spotlight ═══════════════════ */}
      {/* Warm amber cone of light from above — creates a theatrical spotlight feel */}
      <div
        ref={spotlightRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 40% 60% at 50% 30%, rgba(255,212,160,0.12) 0%, transparent 70%)",
          opacity: 0.1,
          willChange: "opacity",
        }}
      />

      {/* ═══════════════════ LAYER 3: Fog/Smoke Wisps ═══════════════════ */}
      <div
        ref={fogRef}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        {/* Wisp 1 — wide, low */}
        <div
          className="fog-wisp absolute bottom-[15%] w-[60%] h-[8%]"
          style={{
            background:
              "radial-gradient(ellipse 100% 100% at 50% 50%, rgba(42,37,32,0.08) 0%, transparent 70%)",
            filter: "blur(30px)",
          }}
        />
        {/* Wisp 2 — mid-height, narrower */}
        <div
          className="fog-wisp absolute bottom-[25%] w-[40%] h-[6%]"
          style={{
            background:
              "radial-gradient(ellipse 100% 100% at 50% 50%, rgba(42,37,32,0.06) 0%, transparent 70%)",
            filter: "blur(25px)",
          }}
        />
        {/* Wisp 3 — high, very subtle */}
        <div
          className="fog-wisp absolute bottom-[35%] w-[50%] h-[5%]"
          style={{
            background:
              "radial-gradient(ellipse 100% 100% at 50% 50%, rgba(42,37,32,0.04) 0%, transparent 70%)",
            filter: "blur(35px)",
          }}
        />
      </div>

      {/* ═══════════════════ LAYER 4: Dramatic Vignette ═══════════════════ */}
      {/* Heavy edge darkening — focuses attention on the central arch */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 50% 50%, transparent 20%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.95) 100%)",
        }}
      />

      {/* ═══════════════════ LAYER 5: Film Grain Overlay ═══════════════════ */}
      {/* Animated noise texture — subtle monochrome grain for cinematic feel */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
          animation: "grain 0.5s steps(6) infinite",
        }}
      />

      {/* Film grain keyframes injected via style tag */}
      <style>{`
        @keyframes grain {
          0%, 100% { background-position: 0 0; }
          10% { background-position: -5% -10%; }
          20% { background-position: -15% 5%; }
          30% { background-position: 7% -25%; }
          40% { background-position: -5% 25%; }
          50% { background-position: -15% 10%; }
          60% { background-position: 15% 0%; }
          70% { background-position: 0% 15%; }
          80% { background-position: 3% 25%; }
          90% { background-position: -10% 10%; }
        }
      `}</style>

      {/* ═══════════════════ LAYER 6: Cinematic Letterbox Bars ═══════════════════ */}
      {/* Top and bottom black bars — classic cinema aspect ratio opening effect */}
      <div
        ref={letterboxTopRef}
        className="absolute top-0 left-0 w-full z-50"
        style={{
          height: "15vh",
          background: "#000000",
        }}
      />
      <div
        ref={letterboxBottomRef}
        className="absolute bottom-0 left-0 w-full z-50"
        style={{
          height: "15vh",
          background: "#000000",
        }}
      />

      {/* ═══════════════ LAYER 7: Subtle Corner Frame Marks ═══════════════ */}
      {/* Small registration-mark-style corners for a professional cinematic touch */}
      <div className="absolute top-8 left-8 w-6 h-6 border-t border-l border-white/10 z-40 hidden md:block" />
      <div className="absolute top-8 right-8 w-6 h-6 border-t border-r border-white/10 z-40 hidden md:block" />
      <div className="absolute bottom-8 left-8 w-6 h-6 border-b border-l border-white/10 z-40 hidden md:block" />
      <div className="absolute bottom-8 right-8 w-6 h-6 border-b border-r border-white/10 z-40 hidden md:block" />
    </div>
  );
};

export default Hero;
