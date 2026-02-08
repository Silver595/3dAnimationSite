import { useRef } from "react";
import { useGSAP } from '@gsap/react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(
    () => {
      // Main Title Animation
      const titleText = titleRef.current;
      if (titleText) {
        gsap.from(titleText, {
          opacity: 0,
          y: 100,
          rotateX: -20,
          duration: 1.5,
          ease: "power4.out",
          delay: 0.2,
        });
      }

      // Subtitle Animation
      const lines = textRef.current?.querySelectorAll('p');
      if (lines) {
        gsap.from(lines, {
          opacity: 0,
          y: 30,
          stagger: 0.2,
          duration: 1,
          ease: "power3.out",
          delay: 0.8,
        });
      }

      // Video Frame Scroll Animation
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        gsap.set("#video-frame", {
          clipPath: "polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)",
          borderRadius: "0 0 2rem 2rem",
        });

        gsap.from("#video-frame", {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          borderRadius: "0 0 0 0",
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: "#video-frame",
            start: "center center",
            end: "bottom center",
            scrub: true,
          },
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="relative h-dvh w-screen overflow-x-hidden">
      {/* Video Background Container */}
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden bg-[#1a1a1a]"
      >
        {/* Abstract Background Video */}
        <video
          src="/videos/hero-1.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute left-0 top-0 size-full object-cover object-center opacity-60 mix-blend-screen"
        />

        {/* Soft Gradient Overlay - Essential for 'Soft Minimal' look */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0f0f12]/50 to-[#0f0f12]" />

        {/* Content */}
        <div className="absolute inset-0 z-40 flex flex-col justify-center px-6 md:px-20">
          <div className="max-w-4xl">
            <h1
              ref={titleRef}
              className="special-font hero-heading text-white mix-blend-overlay opacity-90"
            >
              Silver
            </h1>

            <div ref={textRef} className="mt-8 space-y-4 max-w-lg">
              <p className="font-robert-medium text-2xl md:text-3xl text-white/90">
                Bug Bounty Hunter & <br />
                Full Stack Developer
              </p>
              <p className="font-robert-regular text-zinc-400 text-lg leading-relaxed">
                Crafting secure, beautiful digital experiences.
                Merging the precision of cybersecurity with the art of development.
              </p>

              <div className="pt-8 flex gap-4">
                <a href="#projects" className="soft-button">
                  View Work
                </a>
                <a href="#contact" className="soft-button-outline">
                  Contact Me
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Minimal Scroll Indicator */}
        <div className="absolute bottom-10 left-10 z-40">
          <div className="flex items-center gap-3 text-white/50">
            <div className="h-[2px] w-12 bg-white/20">
              <div className="h-full w-1/3 bg-white animate-pulse" />
            </div>
            <span className="text-xs uppercase tracking-widest font-general">Scroll</span>
          </div>
        </div>

        {/* Decorative corner number */}
        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-white/5 pointer-events-none">
          5<b>9</b>5
        </h1>
      </div>
    </div>
  );
};

export default Hero;
