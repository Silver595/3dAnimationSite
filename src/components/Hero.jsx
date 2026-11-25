
import useReducedMotion from "../useReducedMotion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const Hero = ({ isReady, choice, sectionRef, mediaRef }) => {
  const reduced = useReducedMotion();
  const colorful = choice === "colorful";
  const moving = choice && !reduced;

  const poster = colorful
    ? "/img/madebykhua-still.webp"
    : "/img/hero-still.webp";

  useGSAP(
    () => {
      if (!isReady || reduced) return;

      gsap.from(".hero-title-inner", {
        yPercent: 110,
        duration: 1.4,
        ease: "power3.out",
      });

      gsap.to(".hero-content", {
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
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

      return () => mm.revert();
    },
    {
      scope: sectionRef,
      dependencies: [isReady, reduced],
      revertOnUpdate: true,
    }
  );

  return (
    <div
      ref={sectionRef}
      className="relative h-dvh w-full overflow-x-hidden"
    >
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-full overflow-hidden bg-ink will-change-transform"
      >
        {moving ? (
          <video
            ref={mediaRef}
            src={
              colorful
                ? "/videos/madebykhua1080.mp4"
                : "/videos/mixkit-4.mp4"
            }
            poster={poster}
            loop
            muted
            playsInline
            preload="none"
            className={`absolute inset-0 size-full object-cover ${
              colorful ? "" : "opacity-30 grayscale contrast-125"
            }`}
          />
        ) : (
          <img
            src={poster}
            alt=""
            className={`absolute inset-0 size-full object-cover ${
              colorful ? "" : "opacity-30 grayscale contrast-125"
            }`}
          />
        )}

        {colorful && reduced && (
          <audio
            ref={mediaRef}
            src="/audio/madebykhua.m4a"
            preload="none"
            loop
          />
        )}

        {!colorful && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-ink/80 to-ink"
          />
        )}

        {/* Hero Content */}
        <div className="hero-content absolute inset-0 z-40 flex flex-col justify-end px-6 pb-14 md:px-20 md:pb-20 [text-shadow:0_2px_8px_rgb(var(--ink)),0_1px_2px_rgb(var(--ink))]">

          {/* First Name */}
          <div className="overflow-hidden">
            <h1 className="hero-heading hero-title-inner text-paper">
              AKASH
            </h1>
          </div>

          {/* Bottom Content */}
          <div className="mt-4 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">

            {/* Description */}
            <div className="max-w-md space-y-4">
              <p className="font-general text-lg font-light uppercase tracking-wide text-paper md:text-xl">
                Developer{" "}
                <span className="hero-tone mx-2 text-accent">
                  &#9752;&#65038;
                </span>{" "}
                Human
              </p>

              <p className="text-sm leading-relaxed text-paper md:text-base">
                Somewhere, my Vinland still waits. I&apos;m still searching
                for the road that leads there.
              </p>
            </div>

            {/* Last Name */}
            <div className="overflow-hidden pb-2 text-right">
              <div className="hero-heading hero-title-inner text-paper">
                PURJALKAR
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
