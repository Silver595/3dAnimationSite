
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
          y: 50,
          duration: 1.5,
          ease: "power2.out",
          delay: 0.2,
        });
      }

      // Subtitle Animation
      const lines = textRef.current?.querySelectorAll('p');
      if (lines) {
        gsap.from(lines, {
          opacity: 0,
          y: 20,
          stagger: 0.1,
          duration: 1,
          ease: "power2.out",
          delay: 0.6,
        });
      }

      // Video Frame Scroll Animation
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        gsap.set("#video-frame", {
          // Less aggressive clip path for a "luxury" structured look, more rectangular
          clipPath: "polygon(5% 0%, 95% 0%, 100% 90%, 0% 100%)",
          borderRadius: "0 0 1rem 1rem",
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
        className="relative z-10 h-dvh w-screen overflow-hidden bg-[#121212]"
      >
        {/* Abstract Background Video - Luxury Grey Tone */}
        <video
          src="/videos/hero-1.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute left-0 top-0 size-full object-cover object-center opacity-40 grayscale"
        />

        {/* Luxury Grey Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#121212]/60 to-[#121212]" />

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
              <p className="font-general text-xl md:text-2xl text-zinc-300 font-light tracking-wide">
                CYBERSECURITY & DEVELOPMENT
              </p>
              <p className="font-general text-zinc-400 text-lg leading-relaxed max-w-md">
                Precision engineering for the digital age.
                Securing infrastructure while building elegant user experiences.
              </p>

              <div className="pt-8 flex gap-4">
                <a href="#projects" className="soft-button">
                  View Projects
                </a>
                <a href="#contact" className="soft-button-outline">
                  Contact
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Clean Scroll Indicator */}
        <div className="absolute bottom-12 left-12 z-40">
          <div className="flex items-center gap-3 text-zinc-500">
            <div className="h-[1px] w-12 bg-zinc-700">
              <div className="h-full w-1/3 bg-white animate-pulse" />
            </div>
            <span className="text-[10px] uppercase tracking-[0.2em] font-general">Scroll</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
