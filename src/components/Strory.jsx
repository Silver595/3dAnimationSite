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

    const rotateX = ((yPos - centerY) / centerY) * -5; // Sharper motion
    const rotateY = ((xPos - centerX) / centerX) * 5;

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
    <div id="experience" className="min-h-dvh w-screen bg-[#0a0a0a] text-white relative z-10 border-t border-white/5">
      <div className="flex size-full flex-col items-center py-20 pb-32">
        <p className="font-general text-[10px] uppercase md:text-[10px] tracking-[0.3em] text-zinc-600 mb-4">
          Timeline
        </p>

        <div className="relative size-full">
          <AnimatedTitle
            title="Overview of <br /> my j<b>o</b>urney"
            containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10 text-white"
          />

          <div className="story-img-container mt-10">
            <div className="story-img-mask rounded-sm"> {/* Sharper mask */}
              <div className="story-img-content">
                <img
                  ref={frameRef}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  onMouseUp={handleMouseLeave}
                  onMouseEnter={handleMouseLeave}
                  src="/img/entrance.webp"
                  alt="entrance.webp"
                  className="object-contain opacity-60 grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="-mt-80 flex w-full justify-center md:-mt-64 md:me-44 md:justify-end relative z-20">
          <div className="flex h-full w-fit flex-col items-center md:items-start bg-[#141414]/90 backdrop-blur-md p-10 rounded-sm border border-white/10 shadow-none hover:shadow-2xl hover:border-white/20 transition-all duration-500">
            <p className="mt-3 max-w-sm text-center font-mono text-xs text-zinc-400 md:text-start leading-relaxed tracking-wide">
              {">"} INITIALIZING CAREER SEQUENCE...<br />
              {">"} LOADED: OFFENSIVE SECURITY<br />
              {">"} LOADED: FULL STACK ARCHITECTURE<br />
              <span className="text-zinc-600 block mt-2">// Building the future of secure web.</span>
            </p>

            <div className="mt-8 flex gap-8 items-center border-t border-white/10 pt-6 w-full">
              <div className="flex flex-col">
                <span className="text-4xl font-zentry text-white">2024</span>
                <span className="text-[9px] text-zinc-600 uppercase tracking-widest mt-1 font-mono">Present Day</span>
              </div>
              <div className="flex flex-col">
                <span className="text-white font-medium text-sm font-mono">Bug Bounty Hunter</span>
                <span className="text-zinc-600 text-[9px] uppercase tracking-widest">Independent</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingImage;