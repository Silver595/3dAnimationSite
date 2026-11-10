import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedTitle from "./AnimatedTitle";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const panels = gsap.utils.toArray(".about-panel");
      const count = panels.length;

      // Master timeline drives the pin, horizontal slide, and parallax on all devices (phones & desktop)
      const tl = gsap.timeline({
        defaults: { ease: "none", duration: 1 },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () =>
            "+=" +
            Math.max(
              window.innerWidth * (count - 1) * 1.2,
              window.innerHeight * (count - 1)
            ),
          pin: true,
          anticipatePin: 1,
          scrub: 0.8,
          invalidateOnRefresh: true,
          snap: {
            snapTo: 1 / (count - 1),
            duration: { min: 0.2, max: 0.6 },
            delay: 0.05,
            ease: "power1.inOut",
          },
        },
      });

      // Slide the whole track (container is 300% of the section width)
      tl.to(
        containerRef.current,
        { xPercent: -(100 * (count - 1)) / count, force3D: true },
        0
      );

      // Watermark statues move slower than the panels for depth
      tl.fromTo(".about-statue-1", { xPercent: 0 }, { xPercent: 30 }, 0);
      tl.fromTo(".about-statue-2", { xPercent: -30 }, { xPercent: 0 }, 0);

      // Philosophy photo: gentle drift, scaled so edges never show a gap
      tl.fromTo(
        ".about-img-stretch",
        { xPercent: -6, scale: 1.2 },
        { xPercent: 6, scale: 1.2 },
        0
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative h-screen w-full overflow-hidden bg-[#0a0a0a]"
    >
      <div
        ref={containerRef}
        className="flex flex-row h-full w-[300%] will-change-transform"
      >
        {/* PANEL 1: INTRO */}
        <div className="about-panel relative h-full w-1/3 flex-shrink-0 flex items-center justify-center p-6 sm:p-12 md:p-16 overflow-hidden">
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            {/* Ambient Radial Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vh] bg-[radial-gradient(circle,rgba(255,255,255,0.08)_0%,transparent_70%)] rounded-full opacity-30" />
            {/* Subtle classical silhouette backdrop with parallax */}
            <img
              src="/img/david.png"
              alt=""
              aria-hidden="true"
              className="about-statue-1 pointer-events-none absolute right-8 md:right-28 bottom-0 h-[65%] object-contain opacity-[0.06] select-none filter invert grayscale will-change-transform"
            />
          </div>

          <div className="relative z-10 text-center w-full max-w-5xl mx-auto px-4">
            <p className="font-mono text-sm uppercase text-zinc-500 tracking-[0.3em] mb-6">
              About Me
            </p>
            <AnimatedTitle
              title="we<b>b</b> designer <br /> & <b>d</b>eveloper"
              containerClass="mt-2 text-center"
            />
            <div className="mt-12 flex flex-col items-center gap-6">
              <p className="font-general text-lg sm:text-xl text-zinc-300 max-w-2xl leading-relaxed">
                I am a DevOps Engineer and Full Stack Developer dedicated to
                building resilient systems.
              </p>
              <div className="flex items-center justify-center gap-3">
                <img
                  src="/img/compass.gif"
                  alt=""
                  aria-hidden="true"
                  className="size-4 shrink-0 opacity-50"
                />
                <p className="text-xs text-zinc-500 tracking-widest max-w-md font-mono text-center">
                  Happiness lies in Vinland, <br />
                  and I&apos;m far away from it.
                </p>
                <img
                  src="/img/compass.gif"
                  alt=""
                  aria-hidden="true"
                  className="size-4 shrink-0 opacity-50"
                />
              </div>
            </div>
          </div>
        </div>

        {/* PANEL 2: PHILOSOPHY */}
        <div className="about-panel relative h-full w-1/3 flex-shrink-0 flex items-center justify-between gap-6 md:gap-12 px-6 sm:px-12 md:px-16 lg:px-28 py-8 sm:py-16 overflow-hidden">
          <div className="flex flex-col flex-1 min-w-0 items-start z-10 max-w-xl">
            <p className="font-mono text-sm uppercase text-zinc-500 tracking-[0.3em] mb-6">
              Interests
            </p>
            <h3 className="font-zentry text-5xl sm:text-6xl md:text-6xl lg:text-7xl xl:text-8xl text-white mb-8 tracking-tight uppercase leading-[0.95] break-words">
              Simple <br /> Everyday <br /> Things
            </h3>
            <p className="font-general text-zinc-400 text-base md:text-lg leading-relaxed mb-8">
              I like to cook, read and design beyond the world of technical
              things.
              <br />
              Btw Keep scrolling.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="flex w-8 shrink-0 items-center justify-center">
                  <img
                    src="/img/horse.gif"
                    alt=""
                    aria-hidden="true"
                    className="size-6 object-contain opacity-70"
                  />
                </span>
                <span className="font-mono text-xs text-zinc-300 uppercase tracking-widest">
                  Mercedes
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="flex w-8 shrink-0 items-center justify-center">
                  <img
                    src="/img/cradle.gif"
                    alt=""
                    aria-hidden="true"
                    className="size-6 object-contain opacity-70"
                  />
                </span>
                <span className="font-mono text-xs text-zinc-300 uppercase tracking-widest">
                  Health
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="flex w-8 shrink-0 items-center justify-center">
                  <img
                    src="/img/wave.gif"
                    alt=""
                    aria-hidden="true"
                    className="h-4 w-8 object-contain opacity-70"
                  />
                </span>
                <span className="font-mono text-xs text-zinc-300 uppercase tracking-widest">
                  Happiness
                </span>
              </div>
            </div>
          </div>

          <div className="relative hidden md:block h-[65vh] w-[30vw] max-w-[460px] shrink-0 rounded-lg overflow-hidden">
            {/* GSAP drives this wrapper; hover effects live on the img so they never fight */}
            <div className="about-img-stretch absolute inset-0 will-change-transform">
              <img
                src="/img/philosophy.webp"
                alt="Philosophy"
                className="h-full w-full object-cover opacity-70 grayscale hover:grayscale-0 hover:opacity-90 transition-all duration-700"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>

        {/* PANEL 3: LEARNING IN PROGRESS */}
        <div className="about-panel relative h-full w-1/3 flex-shrink-0 flex items-center justify-center p-6 sm:p-12 md:p-16 overflow-hidden">
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <img
              src="/img/aurelius.png"
              alt=""
              aria-hidden="true"
              className="about-statue-2 pointer-events-none absolute right-8 md:right-20 bottom-0 h-[50%] object-contain opacity-[0.04] select-none filter invert grayscale will-change-transform"
            />
          </div>

          <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-24 items-center">
            <div className="min-w-0">
              <p className="font-mono text-sm uppercase text-zinc-500 tracking-[0.3em] mb-6">
                LEARNING
              </p>
              <h3 className="font-zentry text-5xl md:text-6xl lg:text-7xl text-white mb-6 tracking-tight uppercase leading-[0.9] break-words">
                IN <br /> PROGRESS
              </h3>
              <p className="font-general text-zinc-400 max-w-md mb-8">
                Things I’m currently spending time learning and getting better
                at.
              </p>


            </div>

            <div className="grid grid-cols-1 gap-2 min-w-0">
              {[
                {
                  title: "Spanish",
                  date: "Ongoing",
                  org: "Current Progress: yo soy akash",
                  icon: "/img/cube.gif",
                },
                {
                  title: "Find a Job",
                  date: "Searching",
                  org: "Looking for my first step into DevOps",
                  icon: "/img/earth.gif",
                },
                {
                  title: "Get in Shape",
                  date: "Pending",
                  org: "Still Procrastinating",
                  icon: "/img/spring.gif",
                },
              ].map((cert, i) => (
                <div
                  key={i}
                  className="group flex items-center justify-between gap-4 rounded-lg py-5 px-4 hover:bg-white/[0.03] transition-colors duration-500"
                >
                  <div className="flex min-w-0 items-center gap-5">
                    <img
                      src={cert.icon}
                      alt=""
                      aria-hidden="true"
                      className="size-8 shrink-0 object-contain opacity-35 group-hover:opacity-80 transition-opacity duration-500"
                    />
                    <div className="min-w-0">
                      <h4 className="font-mono text-xl text-white mb-1 group-hover:text-zinc-200 transition-colors duration-500">
                        {cert.title}
                      </h4>
                      <p className="font-mono text-xs text-zinc-600 uppercase tracking-widest">
                        {cert.org}
                      </p>
                    </div>
                  </div>
                  <span className="shrink-0 whitespace-nowrap font-mono text-sm text-zinc-500">
                    {cert.date}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
