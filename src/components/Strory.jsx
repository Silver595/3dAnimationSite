import gsap from "gsap";
import { useRef } from "react";
import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";

const FloatingImage = () => {
  const frameRef = useRef(null);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const element = frameRef.current;

    if (!element) return;

    const rect = element.getBoundingClientRect();
    const xPos = clientX - rect.left;
    const yPos = clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((yPos - centerY) / centerY) * -10;
    const rotateY = ((xPos - centerX) / centerX) * 10;

    gsap.to(element, {
      duration: 0.3,
      rotateX,
      rotateY,
      transformPerspective: 500,
      ease: "power1.inOut",
    });
  };

  const handleMouseLeave = () => {
    const element = frameRef.current;

    if (element) {
      gsap.to(element, {
        duration: 0.3,
        rotateX: 0,
        rotateY: 0,
        ease: "power1.inOut",
      });
    }
  };

  return (
    <div id="experience" className="min-h-dvh w-screen bg-[#0f0f12] text-blue-50 relative z-10">
      <div className="flex size-full flex-col items-center py-10 pb-24">
        <p className="font-general text-sm uppercase md:text-[10px] tracking-widest text-zinc-500">
          Career Timeline
        </p>

        <div className="relative size-full">
          <AnimatedTitle
            title="My j<b>o</b>urney <br /> so f<b>a</b>r"
            containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10"
          />

          <div className="story-img-container">
            <div className="story-img-mask rounded-[3rem]">
              <div className="story-img-content">
                <img
                  ref={frameRef}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  onMouseUp={handleMouseLeave}
                  onMouseEnter={handleMouseLeave}
                  src="/img/entrance.webp"
                  alt="entrance.webp"
                  className="object-contain"
                />
              </div>
            </div>

            {/* SVG Filter for that liquid effect */}
            <svg
              className="invisible absolute size-0"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <filter id="flt_tag">
                  <feGaussianBlur
                    in="SourceGraphic"
                    stdDeviation="8"
                    result="blur"
                  />
                  <feColorMatrix
                    in="blur"
                    mode="matrix"
                    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                    result="flt_tag"
                  />
                  <feComposite
                    in="SourceGraphic"
                    in2="flt_tag"
                    operator="atop"
                  />
                </filter>
              </defs>
            </svg>
          </div>
        </div>

        <div className="-mt-80 flex w-full justify-center md:-mt-64 md:me-44 md:justify-end relative z-20">
          <div className="flex h-full w-fit flex-col items-center md:items-start bg-black/40 backdrop-blur-xl p-8 rounded-[2rem] border border-white/10">
            <p className="mt-3 max-w-sm text-center font-circular-web text-zinc-300 md:text-start leading-relaxed">
              From self-taught enthusiast to professional Bug Bounty Hunter.
              Navigating the complexities of web security and full-stack architecture
              to build cleaner, safer internet for everyone.
            </p>

            <div className="mt-6 flex gap-4">
              <div className="flex flex-col">
                <span className="text-2xl font-zentry text-white">2024</span>
                <span className="text-xs text-zinc-500 uppercase">Present</span>
              </div>
              <div className="w-px bg-white/20 h-10" />
              <div className="flex flex-col">
                <span className="text-violet-400 font-bold">Bug Bounty Hunter</span>
                <span className="text-zinc-400 text-sm">Independent Researcher</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingImage;