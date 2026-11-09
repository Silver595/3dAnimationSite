/**
 * HeroPrismatic.jsx
 * ─────────────────────────────────────────────────────────────
 * A prismatic refraction & advanced glassmorphism hero inspired
 * by Apple VisionOS, Linear, and Raycast aesthetics.
 *
 * Design pillars:
 *   1. Frosted acrylic panels at multiple depths
 *   2. Chromatic aberration (RGB split) on the title
 *   3. Caustic rainbow light spots drifting across the scene
 *   4. Layered overlapping glass panels with perspective tilt
 *   5. Animated spectral border gradient on the main card
 *   6. Soft floating light orbs behind the glass stack
 *   7. GSAP entrance choreography + scroll‑driven reveal
 * ─────────────────────────────────────────────────────────────
 */

import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

/* ── Utility: spectral colours for orbs & caustics ────────── */
const ORBS = [
  { color: "#ff6b9d", x: "15%", y: "20%", size: "40vmax" },
  { color: "#00d4ff", x: "70%", y: "15%", size: "35vmax" },
  { color: "#ffd700", x: "55%", y: "70%", size: "30vmax" },
  { color: "#8b5cf6", x: "25%", y: "75%", size: "38vmax" },
];

const CAUSTICS = [
  { color: "rgba(255,107,157,0.25)", x: "30%", y: "40%", size: 320 },
  { color: "rgba(0,212,255,0.2)", x: "65%", y: "25%", size: 260 },
  { color: "rgba(255,215,0,0.18)", x: "50%", y: "65%", size: 280 },
  { color: "rgba(139,92,246,0.2)", x: "20%", y: "55%", size: 240 },
  { color: "rgba(52,211,153,0.15)", x: "75%", y: "70%", size: 200 },
];

const Hero = () => {
  const containerRef = useRef(null);
  const glassCardRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const quoteRef = useRef(null);
  const buttonsRef = useRef(null);
  const orbsRef = useRef([]);
  const causticsRef = useRef([]);
  const panelsRef = useRef([]);
  const [isHovered, setIsHovered] = useState(false);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      /* ── 1. Entrance: Light orbs fade in & begin floating ── */
      orbsRef.current.forEach((orb, i) => {
        if (!orb) return;
        gsap.set(orb, { opacity: 0, scale: 0.6 });
        tl.to(
          orb,
          { opacity: 1, scale: 1, duration: 1.8, ease: "power2.out" },
          i * 0.15
        );

        // Gentle infinite float for each orb (circular drift)
        gsap.to(orb, {
          x: () => gsap.utils.random(-60, 60),
          y: () => gsap.utils.random(-40, 40),
          duration: gsap.utils.random(6, 10),
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: i * 0.5,
        });
      });

      /* ── 2. Caustic light spots drift in ────────────────── */
      causticsRef.current.forEach((c, i) => {
        if (!c) return;
        gsap.set(c, { opacity: 0, scale: 0.5 });
        tl.to(
          c,
          { opacity: 1, scale: 1, duration: 1.4 },
          0.6 + i * 0.12
        );

        // Slow wandering animation
        gsap.to(c, {
          x: () => gsap.utils.random(-100, 100),
          y: () => gsap.utils.random(-80, 80),
          rotation: gsap.utils.random(-20, 20),
          duration: gsap.utils.random(8, 14),
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: i * 0.8,
        });
      });

      /* ── 3. Layered glass panels slide in with rotation ─── */
      panelsRef.current.forEach((panel, i) => {
        if (!panel) return;
        const directions = [
          { x: -200, rotateY: -30 },
          { x: 200, rotateY: 25 },
          { x: -150, rotateY: -20 },
        ];
        const dir = directions[i % directions.length];
        gsap.set(panel, {
          opacity: 0,
          x: dir.x,
          rotateY: dir.rotateY,
          scale: 0.8,
        });
        tl.to(
          panel,
          {
            opacity: 1,
            x: 0,
            rotateY: 0,
            scale: 1,
            duration: 1.2,
            ease: "power2.out",
          },
          0.3 + i * 0.2
        );
      });

      /* ── 4. Main glass card entrance ───────────────────── */
      gsap.set(glassCardRef.current, {
        opacity: 0,
        y: 80,
        scale: 0.92,
        rotateX: 8,
      });
      tl.to(
        glassCardRef.current,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: 1.4,
          ease: "power3.out",
        },
        0.4
      );

      /* ── 5. Title with chromatic aberration pulse ───────── */
      gsap.set(titleRef.current, { opacity: 0, y: 40 });
      tl.to(
        titleRef.current,
        { opacity: 1, y: 0, duration: 1.2 },
        0.7
      );

      // Subtle repeating chromatic pulse on the title
      gsap.to(titleRef.current, {
        "--chroma-offset": "3px",
        duration: 2.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 2,
      });

      /* ── 6. Subtitle lines blur in ────────────────────── */
      const subLines = subtitleRef.current?.querySelectorAll("span");
      if (subLines) {
        gsap.set(subLines, { opacity: 0, filter: "blur(10px)", y: 15 });
        tl.to(
          subLines,
          {
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
            stagger: 0.12,
            duration: 0.9,
          },
          1.0
        );
      }

      /* ── 7. Quote blur-in ──────────────────────────────── */
      gsap.set(quoteRef.current, {
        opacity: 0,
        filter: "blur(8px)",
        y: 20,
      });
      tl.to(
        quoteRef.current,
        { opacity: 1, filter: "blur(0px)", y: 0, duration: 1 },
        1.3
      );

      /* ── 8. Buttons ────────────────────────────────────── */
      gsap.set(buttonsRef.current, { opacity: 0, y: 25 });
      tl.to(
        buttonsRef.current,
        { opacity: 1, y: 0, duration: 0.9 },
        1.5
      );

      /* ── 9. ScrollTrigger: panels spread & tilt, reveal vid */
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        // Glass panels spread apart on scroll
        panelsRef.current.forEach((panel, i) => {
          if (!panel) return;
          const spreadX = ["-120%", "130%", "-90%"][i % 3];
          const tiltY = [-35, 30, -25][i % 3];

          gsap.to(panel, {
            x: spreadX,
            rotateY: tiltY,
            opacity: 0.3,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 1.5,
            },
          });
        });

        // Main card lifts and fades slightly
        gsap.to(glassCardRef.current, {
          y: -60,
          opacity: 0.6,
          scale: 0.95,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "30% top",
            end: "bottom top",
            scrub: 1,
          },
        });

        // Orbs drift outward
        orbsRef.current.forEach((orb, i) => {
          if (!orb) return;
          gsap.to(orb, {
            scale: 1.3,
            opacity: 0.4,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "20% top",
              end: "80% top",
              scrub: 1,
            },
          });
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="relative h-dvh w-screen overflow-hidden"
      style={{ background: "#070714", perspective: "1200px" }}
    >
      {/* ═══════════ VIDEO BACKGROUND (frosted base) ═══════════ */}
      <div className="absolute inset-0 z-0">
        <video
          ref={(el) => {
            if (el) {
              ScrollTrigger.create({
                trigger: containerRef.current,
                start: "top top",
                end: "bottom top",
                onLeave: () => el.pause(),
                onEnterBack: () => el.play(),
              });
            }
          }}
          src="/videos/hero-1.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 size-full object-cover object-center"
          style={{
            opacity: 0.2,
            filter: "blur(2px) saturate(1.4) contrast(1.1)",
          }}
        />
        {/* Deep overlay to push video far back */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 40% 40%, rgba(7,7,20,0.6) 0%, rgba(7,7,20,0.92) 70%, #070714 100%)",
          }}
        />
      </div>

      {/* ═══════════ LIGHT ORBS (behind glass) ═══════════════ */}
      <div className="absolute inset-0 z-[1] overflow-hidden">
        {ORBS.map((orb, i) => (
          <div
            key={`orb-${i}`}
            ref={(el) => (orbsRef.current[i] = el)}
            className="absolute rounded-full will-change-transform"
            style={{
              left: orb.x,
              top: orb.y,
              width: orb.size,
              height: orb.size,
              background: `radial-gradient(circle, ${orb.color}25 0%, ${orb.color}08 50%, transparent 70%)`,
              transform: "translate(-50%, -50%)",
              mixBlendMode: "screen",
              filter: "blur(40px)",
            }}
          />
        ))}
      </div>

      {/* ═══════════ CAUSTIC LIGHT RAYS ══════════════════════ */}
      <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none">
        {CAUSTICS.map((c, i) => (
          <div
            key={`caustic-${i}`}
            ref={(el) => (causticsRef.current[i] = el)}
            className="absolute rounded-full will-change-transform"
            style={{
              left: c.x,
              top: c.y,
              width: c.size,
              height: c.size,
              background: `radial-gradient(circle, ${c.color} 0%, transparent 70%)`,
              transform: "translate(-50%, -50%)",
              mixBlendMode: "screen",
              filter: "blur(50px)",
            }}
          />
        ))}
      </div>

      {/* ═══════════ DECORATIVE GLASS PANELS (depth layers) ═══ */}
      <div
        className="absolute inset-0 z-[3] overflow-hidden pointer-events-none"
        style={{ perspective: "1000px" }}
      >
        {/* Panel 1 — tall, left side, subtle tilt */}
        <div
          ref={(el) => (panelsRef.current[0] = el)}
          className="absolute will-change-transform"
          style={{
            left: "5%",
            top: "10%",
            width: "180px",
            height: "55%",
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "24px",
            transform: "perspective(800px) rotateY(12deg) rotateX(-3deg)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.05), 0 20px 60px rgba(0,0,0,0.3)",
          }}
        />

        {/* Panel 2 — wide rectangle, right side */}
        <div
          ref={(el) => (panelsRef.current[1] = el)}
          className="absolute will-change-transform hidden md:block"
          style={{
            right: "8%",
            top: "18%",
            width: "220px",
            height: "45%",
            background:
              "linear-gradient(225deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.05)",
            borderRadius: "20px",
            transform: "perspective(800px) rotateY(-10deg) rotateX(2deg)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.04), 0 15px 50px rgba(0,0,0,0.25)",
          }}
        />

        {/* Panel 3 — circular lens element */}
        <div
          ref={(el) => (panelsRef.current[2] = el)}
          className="absolute will-change-transform hidden lg:block"
          style={{
            right: "18%",
            bottom: "12%",
            width: "160px",
            height: "160px",
            background:
              "radial-gradient(circle, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 70%)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "50%",
            transform: "perspective(600px) rotateX(8deg)",
            boxShadow:
              "inset 0 0 30px rgba(255,255,255,0.03), 0 10px 40px rgba(0,0,0,0.2)",
          }}
        />
      </div>

      {/* ═══════════ MAIN FROSTED GLASS CARD ═════════════════ */}
      <div className="absolute inset-0 z-[5] flex items-center justify-center md:justify-start md:pl-[10%] lg:pl-[12%]">
        {/* Prismatic animated border wrapper
            Uses a conic-gradient on a slightly larger pseudo‑element
            behind the card, masked by the card shape */}
        <div className="relative" style={{ perspective: "1000px" }}>
          {/* Spectral border glow (animated via CSS) */}
          <div
            className="absolute -inset-[1px] rounded-3xl opacity-60 animate-prismatic-border"
            style={{
              background:
                "conic-gradient(from var(--border-angle, 0deg), #ff6b9d, #ffd700, #34d399, #00d4ff, #8b5cf6, #ff6b9d)",
              filter: "blur(1px)",
              // CSS custom property animated via keyframes below
            }}
          />

          {/* The glass card itself */}
          <div
            ref={glassCardRef}
            className="relative rounded-3xl px-8 py-10 md:px-14 md:py-14 lg:px-16 lg:py-16 max-w-xl lg:max-w-2xl"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)",
              backdropFilter: "blur(40px) saturate(1.5)",
              WebkitBackdropFilter: "blur(40px) saturate(1.5)",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: `
                inset 0 1px 0 rgba(255,255,255,0.08),
                inset 0 -1px 0 rgba(255,255,255,0.02),
                0 30px 80px rgba(0,0,0,0.5),
                0 0 120px rgba(139,92,246,0.06)
              `,
            }}
          >
            {/* Inner light refraction accent */}
            <div
              className="absolute top-0 left-0 right-0 h-px rounded-t-3xl"
              style={{
                background:
                  "linear-gradient(90deg, transparent 10%, rgba(255,255,255,0.15) 30%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0.15) 70%, transparent 90%)",
              }}
            />

            {/* ── Title: Chromatic Aberration ── */}
            <h1
              ref={titleRef}
              className="special-font hero-heading relative select-none"
              style={{
                "--chroma-offset": "2px",
                color: "rgba(255,255,255,0.92)",
                textShadow: `
                  var(--chroma-offset) 0px 0px rgba(255,80,100,0.5),
                  calc(var(--chroma-offset) * -1) 0px 0px rgba(80,160,255,0.5),
                  0px var(--chroma-offset) 0px rgba(80,255,140,0.3)
                `,
                transition: "text-shadow 0.3s ease",
                cursor: "default",
              }}
              onMouseEnter={() => {
                gsap.to(titleRef.current, {
                  "--chroma-offset": "5px",
                  duration: 0.4,
                  ease: "power2.out",
                });
              }}
              onMouseLeave={() => {
                gsap.to(titleRef.current, {
                  "--chroma-offset": "2px",
                  duration: 0.6,
                  ease: "power2.inOut",
                });
              }}
            >
              Akash
            </h1>

            {/* ── Subtitle ── */}
            <div ref={subtitleRef} className="mt-6 md:mt-8">
              <p className="font-general text-lg md:text-xl tracking-widest uppercase flex items-center gap-2 flex-wrap">
                <span style={{ color: "#b0b0c8" }}>Developer</span>
                <span
                  style={{ color: "rgba(139,92,246,0.5)" }}
                  className="text-base"
                >
                  &#9752;
                </span>
                <span style={{ color: "#b0b0c8" }}>Human</span>
              </p>
            </div>

            {/* ── Quote ── */}
            <p
              ref={quoteRef}
              className="mt-6 md:mt-8 text-sm md:text-base leading-relaxed max-w-md italic"
              style={{ color: "rgba(176,176,200,0.7)" }}
            >
              &ldquo;Somewhere, my Vinland still waits. I&rsquo;m still
              searching for the road that leads there.&rdquo;
            </p>

            {/* ── Action Buttons (Frosted Pills) ── */}
            <div ref={buttonsRef} className="mt-8 md:mt-10 flex gap-4 flex-wrap">
              <a
                href="#projects"
                className="group relative inline-flex items-center justify-center px-7 py-3 rounded-full text-sm font-medium tracking-wide transition-all duration-300 overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.05) 100%)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "rgba(255,255,255,0.9)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                }}
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, {
                    boxShadow:
                      "0 4px 30px rgba(139,92,246,0.2), 0 0 0 1px rgba(139,92,246,0.3)",
                    scale: 1.04,
                    duration: 0.3,
                  });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, {
                    boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                    scale: 1,
                    duration: 0.3,
                  });
                }}
              >
                {/* Spectral shimmer on hover */}
                <span
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(255,107,157,0.1), rgba(0,212,255,0.1), rgba(139,92,246,0.1))",
                  }}
                />
                <span className="relative z-10">Projects</span>
              </a>

              <a
                href="#contact"
                className="group relative inline-flex items-center justify-center px-7 py-3 rounded-full text-sm font-medium tracking-wide transition-all duration-300 overflow-hidden"
                style={{
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.7)",
                }}
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, {
                    borderColor: "rgba(255,255,255,0.25)",
                    color: "rgba(255,255,255,0.95)",
                    boxShadow: "0 0 25px rgba(0,212,255,0.1)",
                    scale: 1.04,
                    duration: 0.3,
                  });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, {
                    borderColor: "rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.7)",
                    boxShadow: "none",
                    scale: 1,
                    duration: 0.3,
                  });
                }}
              >
                <span className="relative z-10">Contact</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════ CSS KEYFRAMES (injected via style tag) ══ */}
      <style>{`
        /* Animate the conic-gradient border rotation */
        @property --border-angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }

        .animate-prismatic-border {
          animation: prismatic-spin 6s linear infinite;
        }

        @keyframes prismatic-spin {
          to {
            --border-angle: 360deg;
          }
        }

        /* The conic-gradient uses the custom property */
        .animate-prismatic-border {
          background: conic-gradient(
            from var(--border-angle),
            #ff6b9d,
            #ffd700,
            #34d399,
            #00d4ff,
            #8b5cf6,
            #ff6b9d
          );
        }

        /* Subtle noise texture overlay for glass realism */
        .glass-noise::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          pointer-events: none;
        }
      `}</style>
    </div>
  );
};

export default Hero;
