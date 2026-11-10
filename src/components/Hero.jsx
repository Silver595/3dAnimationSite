import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        videoRef.current,
        { scale: 1.1 },
        { scale: 1, duration: 3, ease: "power1.out" },
        0
      )

        .from(".hero-title-inner", { yPercent: 110, duration: 1.4 }, 0.3)

        .from(
          ".hero-fade",
          { opacity: 0, y: 18, duration: 1.1, stagger: 0.15, ease: "power2.out" },
          0.9
        );

      gsap.to(".hero-content", {
        y: -60,
        opacity: 0.4,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      const video = videoRef.current;
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        onLeave: () => video?.pause(),
        onEnterBack: () => video?.play().catch(() => {}),
      });

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
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden bg-[#0a0a0a] will-change-transform"
      >
        <video
          ref={videoRef}
          src="/videos/mixkit-4.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute left-0 top-0 size-full object-cover object-center opacity-30 grayscale contrast-125 will-change-transform"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/80 to-[#0a0a0a]" />

        <div className="hero-content absolute inset-0 z-40 flex flex-col justify-end px-6 pb-14 md:px-20 md:pb-20">

          <div className="overflow-hidden pb-2">
            <h1 className="special-font hero-heading hero-title-inner text-white opacity-90">
              Akash
            </h1>
          </div>

          <div className="mt-6 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-md space-y-4">
              <p className="hero-fade font-general text-lg font-light uppercase tracking-wide text-zinc-300 md:text-xl">
                Developer <span className="mx-2 text-zinc-600">&#9752;</span> Human
              </p>
              <p className="hero-fade text-sm leading-relaxed text-zinc-500 md:text-base">
                Somewhere, my Vinland still waits. I&apos;m still searching for the
                road that leads there.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
