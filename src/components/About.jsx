import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const layout = gsap.matchMedia(sectionRef);
      layout.add("(min-height: 521px) and (prefers-reduced-motion: no-preference)", () => {
        const panels = gsap.utils.toArray(".about-panel");
        const count = panels.length;

        // Master timeline drives the pin, horizontal slide, and parallax when the viewport is tall enough
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
              inertia: false,
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
      });
      return () => layout.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      className="about-section relative w-full overflow-hidden bg-surface"
    >
      <div
        ref={containerRef}
        className="about-track"
      >
        {/* PANEL 1: INTRO */}
        <div className="about-panel relative flex items-center justify-center p-6 sm:p-12 md:p-16 overflow-hidden">
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            {/* Ambient Radial Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vh] bg-[radial-gradient(circle,rgb(var(--accent)/0.16)_0%,transparent_70%)] rounded-full opacity-30" />
            {/* Subtle classical silhouette backdrop with parallax */}
            <img
              src="/img/david.png"
              loading="lazy"
              decoding="async"
              alt=""
              aria-hidden="true"
              className="about-statue-1 pointer-events-none absolute right-8 md:right-28 bottom-0 h-[65%] object-contain opacity-[0.06] select-none grayscale will-change-transform"
            />
          </div>

          <div className="relative z-10 text-center w-full max-w-5xl mx-auto px-4">
            <h2 className="animated-title mt-2 text-center text-content">
              <span className="flex-center flex-wrap gap-x-4 md:gap-x-6">
                <span className="special-font">We<b>b</b></span> <span>Designer</span>
              </span>{" "}
              <span className="flex-center flex-wrap gap-x-4 md:gap-x-6">
                <span>&amp;</span> <span className="special-font"><b>D</b>eveloper</span>
              </span>
            </h2>
            <div className="mt-12 flex flex-col items-center gap-6">
              <p className="font-general text-lg sm:text-xl text-content max-w-2xl leading-relaxed">
                I am a DevOps Engineer and Full Stack Developer dedicated to
                building resilient systems.
              </p>
              <div className="flex items-center justify-center gap-3">
                <img
                  src="/img/compass.gif"
                  loading="lazy"
                  decoding="async"
                  alt=""
                  aria-hidden="true"
                  className="size-4 shrink-0 opacity-50"
                />
                <p className="text-xs text-muted tracking-widest max-w-md font-mono text-center">
                  Happiness lies in Vinland, <br />
                  and I&apos;m far away from it.
                </p>
                <img
                  src="/img/compass.gif"
                  loading="lazy"
                  decoding="async"
                  alt=""
                  aria-hidden="true"
                  className="size-4 shrink-0 opacity-50"
                />
              </div>
            </div>
          </div>
        </div>

        {/* PANEL 2: PHILOSOPHY */}
        <div className="about-panel relative flex items-center justify-between gap-6 px-6 py-8 sm:px-12 sm:py-16 md:gap-12 md:px-16 lg:px-28 overflow-hidden">
          <div className="flex flex-col flex-1 min-w-0 items-start z-10 max-w-xl">
            <h3 className="font-zentry text-5xl sm:text-6xl md:text-6xl lg:text-7xl xl:text-8xl text-content mb-8 tracking-tight uppercase leading-[0.95] break-words">
              Simple <br /> Everyday <br /> Things
            </h3>
            <p className="font-general text-content text-base md:text-lg leading-relaxed mb-8">
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
                    loading="lazy"
                    decoding="async"
                    alt=""
                    aria-hidden="true"
                    className="size-6 object-contain opacity-70"
                  />
                </span>
                <span className="font-mono text-xs text-content uppercase tracking-widest">
                  Mercedes
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="flex w-8 shrink-0 items-center justify-center">
                  <img
                    src="/img/cradle.gif"
                    loading="lazy"
                    decoding="async"
                    alt=""
                    aria-hidden="true"
                    className="size-6 object-contain opacity-70"
                  />
                </span>
                <span className="font-mono text-xs text-content uppercase tracking-widest">
                  Health
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="flex w-8 shrink-0 items-center justify-center">
                  <img
                    src="/img/wave.gif"
                    loading="lazy"
                    decoding="async"
                    alt=""
                    aria-hidden="true"
                    className="h-4 w-8 object-contain opacity-70"
                  />
                </span>
                <span className="font-mono text-xs text-content uppercase tracking-widest">
                  Happiness
                </span>
              </div>
            </div>
          </div>

          <div className="relative hidden h-[65vh] w-[30vw] max-w-[460px] shrink-0 md:block rounded-lg overflow-hidden">
            {/* GSAP drives this wrapper; hover effects live on the img so they never fight */}
            <div className="about-img-stretch absolute inset-0 will-change-transform">
              <img
                src="/img/philosophy.webp"
                loading="lazy"
                decoding="async"
                alt="Philosophy"
                className="h-full w-full object-cover opacity-70 grayscale hover:grayscale-0 hover:opacity-90 transition-all duration-700"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>

        {/* PANEL 3: LEARNING IN PROGRESS */}
        <div className="about-panel about-learning relative flex items-center justify-center p-6 sm:p-12 md:p-16 overflow-hidden">
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <img
              src="/img/aurelius.png"
              loading="lazy"
              decoding="async"
              alt=""
              aria-hidden="true"
              className="about-statue-2 pointer-events-none absolute right-8 md:right-20 bottom-0 h-[50%] object-contain opacity-[0.04] select-none grayscale will-change-transform"
            />
          </div>

          <div className="about-learning-layout relative z-10 w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-24 items-center">
            <div className="min-w-0">
              <h3 className="font-zentry text-5xl md:text-6xl lg:text-7xl text-content mb-6 tracking-tight uppercase leading-[0.9] break-words">
                IN <br /> PROGRESS
              </h3>
              <p className="font-general text-content max-w-md mb-8">
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
                  className="about-learning-row group flex items-center justify-between gap-4 rounded-lg px-4 py-5 hover:bg-accent/10 transition-colors duration-500"
                >
                  <div className="flex min-w-0 items-center gap-5">
                    <img
                      src={cert.icon}
                      loading="lazy"
                      decoding="async"
                      alt=""
                      aria-hidden="true"
                      className="size-8 shrink-0 object-contain opacity-35 group-hover:opacity-80 transition-opacity duration-500"
                    />
                    <div className="min-w-0">
                      <h4 className="font-mono text-xl text-content mb-1 group-hover:text-muted transition-colors duration-500">
                        {cert.title}
                      </h4>
                      <p className="font-mono text-xs text-muted uppercase tracking-widest">
                        {cert.org}
                      </p>
                    </div>
                  </div>
                  <span className="shrink-0 whitespace-nowrap font-mono text-sm text-muted">
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
