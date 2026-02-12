
import { useState, useRef } from "react";
import { TiLocationArrow } from "react-icons/ti";

export const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 2; // Even subtler tilt for technical feel
    const tiltY = (relativeX - 0.5) * -2;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.99, .99, .99)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

export const BentoCard = ({ src, title, description, isComingSoon, tech }) => {
  return (
    <div className="relative size-full bg-[#111] group">
      {/* Media with darker overlay by default */}
      {src ? (
        <video
          src={src}
          loop
          muted
          autoPlay
          className="absolute left-0 top-0 size-full object-cover object-center opacity-20 grayscale transition-all duration-700 group-hover:opacity-40 group-hover:grayscale-0"
        />
      ) : (
        <div className="absolute left-0 top-0 size-full bg-gradient-to-t from-[#0a0a0a] to-[#141414]" />
      )}

      {/* Content layout - more structured/technical */}
      <div className="relative z-10 flex size-full flex-col justify-between p-6 md:p-8 text-white border border-white/5 transition-all duration-300 group-hover:border-white/10 group-hover:bg-white/[0.02]">

        {/* Top Section */}
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <h1 className="bento-title special-font text-3xl md:text-4xl">{title}</h1>
            {/* Tech tags as minimal text */}
            {tech && (
              <div className="flex gap-3 text-[10px] uppercase tracking-widest text-zinc-500 font-mono">
                {tech.join(" // ")}
              </div>
            )}
          </div>

          {isComingSoon && (
            <TiLocationArrow className="text-zinc-600 group-hover:text-white transition-colors scale-125" />
          )}
        </div>

        {/* Bottom Section */}
        {description && (
          <div className="border-t border-white/10 pt-4 mt-4">
            <p className="max-w-xs text-xs text-zinc-400 font-general uppercase tracking-wide leading-relaxed group-hover:text-zinc-300 transition-colors">
              {description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const Features = () => (
  <section id="projects" className="bg-[#0a0a0a] pb-40 relative z-10">
    <div className="container mx-auto px-4 md:px-10">

      {/* Sharp Header */}
      <div className="py-24 border-b border-white/10 mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <p className="font-general text-xs text-zinc-500 uppercase tracking-[0.3em] mb-2">
            Selected Works
          </p>
          <p className="font-zentry text-5xl md:text-7xl text-white uppercase opacity-90">
            Featured Projects
          </p>
        </div>
        <p className="max-w-xs text-right font-general text-xs text-zinc-600 leading-relaxed uppercase tracking-wide">
          A curated selection of security research <br /> and engineering excellence.
        </p>
      </div>

      <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-lg md:h-[60vh]">
        <BentoCard
          src="videos/feature-1.mp4"
          title={
            <>
              Sec<b>u</b>rity <br /> Core
            </>
          }
          description="Enterprise-grade vulnerability detection engine"
          tech={["Python", "Docker", "Redis"]}
          isComingSoon
        />
      </BentoTilt>

      <div className="grid h-[135vh] w-full grid-cols-2 grid-rows-3 gap-4 md:gap-7">
        <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
          <BentoCard
            src="videos/feature-2.mp4"
            title={
              <>
                Bug <b>T</b>rac
              </>
            }
            description="Collaborative vulnerability management platform"
            tech={["Next.js", "PostgreSQL"]}
            isComingSoon
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 row-span-1 ms-0 md:col-span-1 md:ms-0">
          <BentoCard
            src="videos/feature-3.mp4"
            title={
              <>
                Net <b>G</b>uard
              </>
            }
            description="Secure API Gateway with Rate Limiting"
            tech={["Go", "Redis"]}
            isComingSoon
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 me-0 md:col-span-1 md:me-0">
          <BentoCard
            src="videos/feature-4.mp4"
            title={
              <>
                Port<b>f</b>olio
              </>
            }
            description="Interactive WebGL Experience"
            tech={["React", "Three.js"]}
            isComingSoon
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_2">
          <div className="flex size-full flex-col justify-between bg-[#111] p-8 border border-white/5 hover:border-white/20 transition-colors group">
            <h1 className="bento-title special-font max-w-64 text-white group-hover:translate-x-2 transition-transform">
              G<b>i</b>thub
            </h1>

            <div className="mt-auto">
              <p className="text-zinc-600 text-xs uppercase tracking-widest group-hover:text-white transition-colors">
                Source Code
              </p>
              <TiLocationArrow className="mt-4 scale-[2] text-zinc-500 group-hover:text-white self-start transition-colors" />
            </div>
          </div>
        </BentoTilt>

        <BentoTilt className="bento-tilt_2">
          <video
            src="videos/feature-5.mp4"
            loop
            muted
            autoPlay
            className="size-full object-cover object-center grayscale opacity-20 hover:opacity-40 transition-opacity"
          />
        </BentoTilt>
      </div>
    </div>
  </section>
);

export default Features;