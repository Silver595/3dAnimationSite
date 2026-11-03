/**
 * HeroFluid.jsx — Liquid / Fluid Organic Hero Component
 *
 * Design philosophy: An underwater bioluminescent world with molten-metal
 * aesthetics. Everything is soft, organic, and breathing — no sharp edges.
 * Morphing blob shapes serve as both decoration and video mask, while
 * floating particle dots add a sense of living atmosphere.
 *
 * Key techniques:
 *  - CSS border-radius morphing for organic blob shapes
 *  - SVG wave divider with multiple animated layers
 *  - GSAP elastic easing for bouncy, physical text entrance
 *  - Continuous GSAP timelines for blob morphing & particle drift
 *  - Radial glow/bloom via layered box-shadows
 *  - Clip-path blob mask on the hero video
 */

import { useRef, useEffect, useMemo } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

/* ──────────────────────────────────────────────
   Constants & helpers
   ────────────────────────────────────────────── */

// Organic border-radius keyframes for blob morphing
const BLOB_SHAPES = [
  "30% 70% 70% 30% / 30% 30% 70% 70%",
  "50% 50% 30% 70% / 60% 40% 60% 40%",
  "70% 30% 50% 50% / 40% 70% 30% 60%",
  "40% 60% 60% 40% / 50% 50% 50% 50%",
  "60% 40% 30% 70% / 70% 30% 60% 40%",
  "30% 70% 70% 30% / 30% 30% 70% 70%",
];

// Generate random floating particles
const generateParticles = (count) =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    opacity: Math.random() * 0.4 + 0.1,
    delay: Math.random() * 6,
  }));

/* ──────────────────────────────────────────────
   Animated SVG Wave Divider
   Multi-layered undulating wave at the section bottom
   ────────────────────────────────────────────── */
const WaveDivider = () => (
  <div className="absolute bottom-0 left-0 w-full overflow-hidden z-30 pointer-events-none">
    {/* Layer 1 — deepest, slowest */}
    <svg
      className="wave-layer wave-layer-1 relative block w-full"
      style={{ height: "120px", marginBottom: "-2px" }}
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
    >
      <path
        d="M0,80 C240,120 480,40 720,80 C960,120 1200,40 1440,80 L1440,120 L0,120 Z"
        fill="rgba(10,5,20,0.4)"
      />
    </svg>
    {/* Layer 2 — mid depth */}
    <svg
      className="wave-layer wave-layer-2 absolute bottom-0 left-0 w-full"
      style={{ height: "100px" }}
      viewBox="0 0 1440 100"
      preserveAspectRatio="none"
    >
      <path
        d="M0,60 C360,100 720,20 1080,60 C1260,80 1380,40 1440,60 L1440,100 L0,100 Z"
        fill="rgba(8,3,18,0.6)"
      />
    </svg>
    {/* Layer 3 — front, most opaque */}
    <svg
      className="wave-layer wave-layer-3 absolute bottom-0 left-0 w-full"
      style={{ height: "80px" }}
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
    >
      <path
        d="M0,40 C480,80 960,0 1440,40 L1440,80 L0,80 Z"
        fill="#050510"
      />
    </svg>
  </div>
);

/* ──────────────────────────────────────────────
   Main Hero Component
   ────────────────────────────────────────────── */
const Hero = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const quoteRef = useRef(null);
  const buttonsRef = useRef(null);
  const blobRefs = useRef([]);
  const particleRefs = useRef([]);
  const videoRef = useRef(null);
  const videoBlobRef = useRef(null);

  // Memoize particles so they don't regenerate on re-render
  const particles = useMemo(() => generateParticles(18), []);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        /* ── Blob entrance: scale up from 0 with elastic ease ── */
        const blobs = blobRefs.current.filter(Boolean);
        gsap.fromTo(
          blobs,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 2,
            ease: "elastic.out(1, 0.4)",
            stagger: 0.25,
            delay: 0.3,
          }
        );

        /* ── Video blob mask entrance ── */
        if (videoBlobRef.current) {
          gsap.fromTo(
            videoBlobRef.current,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 2.2,
              ease: "elastic.out(1, 0.35)",
              delay: 0.5,
            }
          );
        }

        /* ── Title: elastic bounce-in ── */
        if (titleRef.current) {
          gsap.fromTo(
            titleRef.current,
            { scale: 1.3, opacity: 0, y: 40 },
            {
              scale: 1,
              opacity: 1,
              y: 0,
              duration: 1.8,
              ease: "elastic.out(1, 0.3)",
              delay: 0.6,
            }
          );
        }

        /* ── Subtitle: soft fade up ── */
        if (subtitleRef.current) {
          gsap.fromTo(
            subtitleRef.current,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 1.2,
              ease: "power3.out",
              delay: 1.0,
            }
          );
        }

        /* ── Quote: soft fade up ── */
        if (quoteRef.current) {
          gsap.fromTo(
            quoteRef.current,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 1.2,
              ease: "power3.out",
              delay: 1.3,
            }
          );
        }

        /* ── Buttons: fade in ── */
        if (buttonsRef.current) {
          gsap.fromTo(
            buttonsRef.current,
            { opacity: 0, y: 16 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
              delay: 1.6,
            }
          );
        }

        /* ── Continuous blob morphing ── */
        blobs.forEach((blob, i) => {
          const tl = gsap.timeline({ repeat: -1, yoyo: true });
          BLOB_SHAPES.forEach((shape, si) => {
            tl.to(blob, {
              borderRadius: shape,
              duration: 4 + i * 0.5,
              ease: "sine.inOut",
            });
          });
          // Slow rotation for organic feel
          gsap.to(blob, {
            rotation: i % 2 === 0 ? 360 : -360,
            duration: 60 + i * 15,
            repeat: -1,
            ease: "none",
          });
        });

        /* ── Video blob morphing (its own cycle) ── */
        if (videoBlobRef.current) {
          const vtl = gsap.timeline({ repeat: -1, yoyo: true });
          BLOB_SHAPES.forEach((shape) => {
            vtl.to(videoBlobRef.current, {
              borderRadius: shape,
              duration: 5,
              ease: "sine.inOut",
            });
          });
          gsap.to(videoBlobRef.current, {
            rotation: -360,
            duration: 90,
            repeat: -1,
            ease: "none",
          });
        }

        /* ── Floating particles: continuous lazy drift ── */
        const particleEls = particleRefs.current.filter(Boolean);
        particleEls.forEach((p) => {
          gsap.to(p, {
            x: () => gsap.utils.random(-80, 80),
            y: () => gsap.utils.random(-80, 80),
            duration: () => gsap.utils.random(8, 16),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: () => gsap.utils.random(0, 6),
          });
          // Pulse opacity
          gsap.to(p, {
            opacity: () => gsap.utils.random(0.08, 0.5),
            duration: () => gsap.utils.random(3, 7),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        });

        /* ── Wave animation: gentle vertical sway ── */
        gsap.utils.toArray(".wave-layer").forEach((wave, i) => {
          gsap.to(wave, {
            y: i % 2 === 0 ? -6 : 6,
            duration: 3 + i * 0.8,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        });

        /* ── ScrollTrigger: blobs drift apart, content parallax ── */
        const mm = gsap.matchMedia();
        mm.add("(min-width: 1px)", () => {
          // Blobs drift outward on scroll
          blobs.forEach((blob, i) => {
            const directions = [
              { x: -120, y: -80 },
              { x: 140, y: 60 },
              { x: -60, y: 120 },
            ];
            const dir = directions[i % directions.length];
            gsap.to(blob, {
              x: dir.x,
              y: dir.y,
              opacity: 0.2,
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom top",
                scrub: 1.5,
              },
            });
          });

          // Video blob drifts down
          if (videoBlobRef.current) {
            gsap.to(videoBlobRef.current, {
              y: 100,
              opacity: 0.15,
              scale: 0.85,
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom top",
                scrub: 1.5,
              },
            });
          }

          // Title parallax
          if (titleRef.current) {
            gsap.to(titleRef.current, {
              y: -60,
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom top",
                scrub: 1,
              },
            });
          }

          // Wave intensifies on scroll
          gsap.utils.toArray(".wave-layer").forEach((wave) => {
            gsap.to(wave, {
              scaleY: 1.6,
              scrollTrigger: {
                trigger: containerRef.current,
                start: "60% top",
                end: "bottom top",
                scrub: 1,
              },
            });
          });
        });

        /* ── Pause/Resume video on scroll visibility ── */
        if (videoRef.current) {
          ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            onLeave: () => videoRef.current?.pause(),
            onEnterBack: () => videoRef.current?.play(),
          });
        }
      }, containerRef);

      return () => ctx.revert();
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="relative h-dvh w-screen overflow-hidden"
      style={{ background: "#050510" }}
    >
      {/* ═══════════════════════════════════════════
          Ambient gradient underlays
          ═══════════════════════════════════════════ */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, rgba(26,5,51,0.4) 0%, transparent 60%), " +
            "radial-gradient(ellipse at 80% 30%, rgba(10,42,60,0.3) 0%, transparent 50%), " +
            "radial-gradient(ellipse at 50% 80%, rgba(26,10,46,0.25) 0%, transparent 55%)",
        }}
      />

      {/* ═══════════════════════════════════════════
          Floating Particle Dots
          Small circles that drift lazily for organic life
          ═══════════════════════════════════════════ */}
      <div className="absolute inset-0 z-[5] pointer-events-none">
        {particles.map((p, i) => (
          <div
            key={p.id}
            ref={(el) => (particleRefs.current[i] = el)}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
              background:
                p.id % 3 === 0
                  ? "radial-gradient(circle, rgba(140,120,220,0.8), rgba(140,120,220,0))"
                  : p.id % 3 === 1
                  ? "radial-gradient(circle, rgba(80,180,200,0.7), rgba(80,180,200,0))"
                  : "radial-gradient(circle, rgba(200,180,255,0.6), rgba(200,180,255,0))",
              boxShadow:
                p.id % 2 === 0
                  ? "0 0 8px 2px rgba(140,120,220,0.3)"
                  : "0 0 6px 2px rgba(80,180,200,0.25)",
            }}
          />
        ))}
      </div>

      {/* ═══════════════════════════════════════════
          Morphing Blob Background Shapes
          Soft gradient fills with glow/bloom
          ═══════════════════════════════════════════ */}

      {/* Blob 1 — Upper left, violet-to-navy */}
      <div
        ref={(el) => (blobRefs.current[0] = el)}
        className="absolute z-[2] will-change-transform"
        style={{
          width: "55vw",
          height: "55vw",
          maxWidth: "700px",
          maxHeight: "700px",
          top: "-10%",
          left: "-12%",
          borderRadius: BLOB_SHAPES[0],
          background:
            "linear-gradient(135deg, #1a0533 0%, #0d1b3e 50%, #0a1530 100%)",
          opacity: 0,
          boxShadow:
            "0 0 80px 30px rgba(26,5,51,0.4), " +
            "0 0 160px 80px rgba(13,27,62,0.2), " +
            "inset 0 0 60px rgba(26,5,51,0.3)",
          filter: "blur(2px)",
          mixBlendMode: "screen",
        }}
      />

      {/* Blob 2 — Right center, dark teal to deep blue */}
      <div
        ref={(el) => (blobRefs.current[1] = el)}
        className="absolute z-[2] will-change-transform"
        style={{
          width: "45vw",
          height: "45vw",
          maxWidth: "580px",
          maxHeight: "580px",
          top: "15%",
          right: "-8%",
          borderRadius: BLOB_SHAPES[2],
          background:
            "linear-gradient(200deg, #0a2a3c 0%, #061a2e 60%, #040e1e 100%)",
          opacity: 0,
          boxShadow:
            "0 0 100px 40px rgba(10,42,60,0.35), " +
            "0 0 200px 100px rgba(6,26,46,0.15), " +
            "inset 0 0 50px rgba(10,42,60,0.25)",
          filter: "blur(3px)",
          mixBlendMode: "screen",
        }}
      />

      {/* Blob 3 — Bottom left, purple-to-indigo */}
      <div
        ref={(el) => (blobRefs.current[2] = el)}
        className="absolute z-[2] will-change-transform"
        style={{
          width: "40vw",
          height: "40vw",
          maxWidth: "500px",
          maxHeight: "500px",
          bottom: "5%",
          left: "10%",
          borderRadius: BLOB_SHAPES[4],
          background:
            "linear-gradient(310deg, #1a0a2e 0%, #0f0a28 55%, #0a0820 100%)",
          opacity: 0,
          boxShadow:
            "0 0 90px 35px rgba(26,10,46,0.35), " +
            "0 0 180px 90px rgba(15,10,40,0.15), " +
            "inset 0 0 40px rgba(26,10,46,0.2)",
          filter: "blur(2px)",
          mixBlendMode: "screen",
        }}
      />

      {/* ═══════════════════════════════════════════
          Video Blob Mask
          Video visible through an organic morphing blob shape
          ═══════════════════════════════════════════ */}
      <div
        ref={videoBlobRef}
        className="absolute z-[8] overflow-hidden will-change-transform
                   hidden md:block"
        style={{
          width: "38vw",
          height: "38vw",
          maxWidth: "520px",
          maxHeight: "520px",
          top: "12%",
          right: "6%",
          borderRadius: BLOB_SHAPES[1],
          opacity: 0,
          boxShadow:
            "0 0 60px 20px rgba(26,5,51,0.3), " +
            "0 0 120px 60px rgba(10,42,60,0.15), " +
            "inset 0 0 80px rgba(0,0,0,0.6)",
        }}
      >
        <video
          ref={videoRef}
          src="/videos/hero-1.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover object-center
                     opacity-50 saturate-[0.6] contrast-110"
        />
        {/* Inner glow overlay on video */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 40%, rgba(5,5,16,0.7) 100%)",
          }}
        />
        {/* Subtle gradient tint */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(26,5,51,0.25) 0%, rgba(10,42,60,0.2) 100%)",
            mixBlendMode: "overlay",
          }}
        />
      </div>

      {/* Mobile video (simpler, full-width soft blob) */}
      <div
        className="absolute z-[8] overflow-hidden md:hidden"
        style={{
          width: "75vw",
          height: "40vw",
          top: "8%",
          right: "5%",
          borderRadius: "50% 50% 50% 50% / 50% 50% 50% 50%",
          opacity: 0.3,
          boxShadow: "0 0 40px 15px rgba(26,5,51,0.25)",
        }}
      >
        <video
          src="/videos/hero-1.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover object-center
                     opacity-40 saturate-50 contrast-110"
        />
      </div>

      {/* ═══════════════════════════════════════════
          Main Content — Centered-left layout
          ═══════════════════════════════════════════ */}
      <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 sm:px-10 md:px-16 lg:px-24">
        <div className="max-w-2xl">
          {/* Title — elastic entrance */}
          <h1
            ref={titleRef}
            className="special-font hero-heading will-change-transform"
            style={{
              color: "#e8e8f0",
              opacity: 0,
              textShadow:
                "0 0 40px rgba(140,120,220,0.15), 0 0 80px rgba(80,180,200,0.08)",
            }}
          >
            Akash
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="font-general text-xl md:text-2xl font-light tracking-widest uppercase mt-5"
            style={{
              color: "#a0a0c0",
              opacity: 0,
            }}
          >
            Developer{" "}
            <span
              style={{ color: "rgba(100,180,200,0.5)" }}
              className="mx-2"
            >
              &#9752;
            </span>{" "}
            Human
          </p>

          {/* Quote */}
          <p
            ref={quoteRef}
            className="text-sm md:text-base leading-relaxed max-w-md mt-6"
            style={{
              color: "rgba(160,160,192,0.6)",
              opacity: 0,
            }}
          >
            Somewhere, my Vinland still waits. I'm still searching for the road
            that leads there.
          </p>

          {/* Pill-shaped buttons */}
          <div
            ref={buttonsRef}
            className="flex flex-wrap gap-4 mt-10"
            style={{ opacity: 0 }}
          >
            <a
              href="#projects"
              className="rounded-full px-8 py-3 text-sm font-medium tracking-wide
                         transition-all duration-300 will-change-transform
                         hover:scale-105 active:scale-95"
              style={{
                background:
                  "linear-gradient(135deg, rgba(140,120,220,0.2) 0%, rgba(80,180,200,0.15) 100%)",
                color: "#e8e8f0",
                border: "1px solid rgba(140,120,220,0.2)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                boxShadow:
                  "0 0 20px rgba(140,120,220,0.1), inset 0 0 20px rgba(140,120,220,0.05)",
              }}
            >
              Projects
            </a>
            <a
              href="#contact"
              className="rounded-full px-8 py-3 text-sm font-medium tracking-wide
                         transition-all duration-300 will-change-transform
                         hover:scale-105 active:scale-95"
              style={{
                background: "rgba(255,255,255,0.03)",
                color: "#a0a0c0",
                border: "1px solid rgba(160,160,192,0.12)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                boxShadow: "0 0 15px rgba(80,180,200,0.06)",
              }}
            >
              Contact
            </a>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          Vignette overlay — soft edges
          ═══════════════════════════════════════════ */}
      <div
        className="absolute inset-0 z-[15] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(5,5,16,0.6) 100%)",
        }}
      />

      {/* ═══════════════════════════════════════════
          Animated SVG Wave Divider at the bottom
          ═══════════════════════════════════════════ */}
      <WaveDivider />

      {/* ═══════════════════════════════════════════
          Inline styles for additional CSS animations
          (blob breathing pulse, used as fallback / enhancement)
          ═══════════════════════════════════════════ */}
      <style>{`
        @keyframes blobPulse {
          0%, 100% { filter: blur(2px) brightness(1); }
          50% { filter: blur(4px) brightness(1.15); }
        }
      `}</style>
    </div>
  );
};

export default Hero;
