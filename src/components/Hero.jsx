
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

      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        gsap.set("#video-frame", {
          clipPath: "polygon(4% 0%, 96% 0%, 100% 90%, 0% 100%)",
          borderRadius: "0 0 0.5rem 0.5rem",
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
        className="relative z-10 h-dvh w-screen overflow-hidden bg-[#0a0a0a] will-change-transform"
      >
        {/* Abstract Background Video - Deep Dark */}
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
          className="absolute left-0 top-0 size-full object-cover object-center opacity-30 grayscale contrast-125 will-change-transform"
        />

        {/* Technical Grid Overlay */}
        <div className="absolute inset-0 bg-[url('/img/grid.svg')] opacity-10 bg-center" />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/80 to-[#0a0a0a]" />

        {/* Content */}
        <div className="absolute inset-0 z-40 flex flex-col justify-center px-6 md:px-20">
          <div className="max-w-4xl border-l-2 border-white/20 pl-8 md:pl-12">
            <h1
              ref={titleRef}
              className="special-font hero-heading text-white opacity-90"
            >
              Akash
            </h1>

            <div ref={textRef} className="mt-8 space-y-6 max-w-lg">
              <p className="font-general text-xl md:text-2xl text-zinc-300 font-light tracking-wide uppercase">
                Cybersecurity <span className="text-zinc-600 mx-2">//</span> Development
              </p>
              <p className="font-general text-zinc-500 text-sm md:text-base leading-relaxed max-w-md font-mono">
                [SYSTEM STATUS: ONLINE]<br />
                Engineering secure digital infrastructure.
              </p>

              <div className="pt-8 flex gap-4">
                <a href="#projects" className="soft-button !rounded-sm !bg-white !text-black hover:!bg-zinc-200">
                  Projects
                </a>
                <a href="#contact" className="soft-button-outline !rounded-sm !border-white/10 hover:!bg-white/5">
                  Contact
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Footer Data */}
        <div className="absolute bottom-12 left-12 z-40 hidden md:block">
          <div className="flex items-center gap-8 text-zinc-600 font-mono text-[10px]">
            <span>LOC: 127.0.0.1</span>
            <span>UPTIME: 99.9%</span>
            <span>SEC: ENCRYPTED</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
