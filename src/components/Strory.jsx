import gsap from "gsap";
import { useRef } from "react";
import AnimatedTitle from "./AnimatedTitle";

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
    <div id="experience" className="min-h-dvh w-screen bg-[#121212] text-white relative z-10">
      <div className="flex size-full flex-col items-center py-10 pb-24">
        <p className="font-general text-[12px] uppercase md:text-[10px] tracking-widest text-zinc-500">
          Career Timeline
        </p>

        <div className="relative size-full">
          <AnimatedTitle
            title="Overview of <br /> my j<b>o</b>urney"
            containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10 text-white"
          />

          <div className="story-img-container">
            <div className="story-img-mask rounded-xl"> {/* Tighter corner radius */}
              <div className="story-img-content">
                <img
                  ref={frameRef}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  onMouseUp={handleMouseLeave}
                  onMouseEnter={handleMouseLeave}
                  src="/img/entrance.webp"
                  alt="entrance.webp"
                  className="object-contain opacity-80"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="-mt-80 flex w-full justify-center md:-mt-64 md:me-44 md:justify-end relative z-20">
          <div className="flex h-full w-fit flex-col items-center md:items-start bg-[#1c1c1f]/80 backdrop-blur-md p-8 rounded-xl border border-white/5 shadow-2xl">
            <p className="mt-3 max-w-sm text-center font-circular-web text-zinc-400 md:text-start leading-relaxed">
              Navigating the intersection of offensive security and modern web development.
              Building tools that secure the future of the internet.
            </p>

            <div className="mt-8 flex gap-6 items-center">
              <div className="flex flex-col">
                <span className="text-3xl font-zentry text-white">2024</span>
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">Present</span>
              </div>
              <div className="w-px bg-white/10 h-12" />
              <div className="flex flex-col">
                <span className="text-white font-medium text-lg">Bug Bounty Hunter</span>
                <span className="text-zinc-500 text-sm">Independent</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingImage;