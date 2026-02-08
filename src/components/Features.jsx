
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

    const tiltX = (relativeY - 0.5) * 3; // Reduced tilt for more stability/luxury feel
    const tiltY = (relativeX - 0.5) * -3;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.98, .98, .98)`;
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
    <div className="relative size-full bg-[#1c1c1f]"> {/* Card BG Color */}
      {/* Subtle Video/Image */}
      {src ? (
        <video
          src={src}
          loop
          muted
          autoPlay
          className="absolute left-0 top-0 size-full object-cover object-center opacity-30 grayscale transition-opacity duration-500 group-hover:opacity-50"
        />
      ) : (
        <div className="absolute left-0 top-0 size-full bg-[#1c1c1f]" />
      )}

      <div className="relative z-10 flex size-full flex-col justify-between p-8 text-white">
        <div>
          <h1 className="bento-title special-font text-white">{title}</h1>
          {description && (
            <p className="mt-4 max-w-64 text-sm text-zinc-400 md:text-base font-general leading-relaxed">{description}</p>
          )}
          {tech && (
            <div className="mt-6 flex flex-wrap gap-2">
              {tech.map((t, i) => (
                <span key={i} className="px-3 py-1 text-[10px] uppercase tracking-wider bg-white/5 text-zinc-300 rounded-md border border-white/5">
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>

        {isComingSoon && (
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 transition-colors backdrop-blur-md rounded-lg w-fit border border-white/5 cursor-pointer">
            <TiLocationArrow className="text-white" />
            <p className="text-xs uppercase tracking-widest text-zinc-300">View Project</p>
          </div>
        )}
      </div>
    </div>
  );
};

const Features = () => (
  <section id="projects" className="bg-[#121212] pb-52 relative z-10">
    <div className="container mx-auto px-3 md:px-10">
      <div className="px-5 py-32 border-b border-white/5 mb-16">
        <p className="font-general text-lg text-white uppercase tracking-widest">
          Selected Projects
        </p>
        <p className="max-w-md font-circular-web text-lg text-zinc-500 mt-4">
          A directed selection of work demonstrating security research and full-stack engineering.
        </p>
      </div>

      <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-xl md:h-[65vh]">
        <BentoCard
          src="videos/feature-1.mp4"
          title={
            <>
              Sec<b>u</b>rity <br /> Scanner
            </>
          }
          description="Automated vulnerability detection engine enabling developers to find flaws early."
          tech={["Python", "Docker", "Redis"]}
          isComingSoon
        />
      </BentoTilt>

      <div className="grid h-[135vh] w-full grid-cols-2 grid-rows-3 gap-7">
        <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
          <BentoCard
            src="videos/feature-2.mp4"
            title={
              <>
                Bug <b>T</b>racker
              </>
            }
            description="Collaborative platform for security researchers."
            tech={["Next.js", "PostgreSQL"]}
            isComingSoon
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0">
          <BentoCard
            src="videos/feature-3.mp4"
            title={
              <>
                API <b>G</b>ateway
              </>
            }
            description="High-performance secure gateway."
            tech={["Go", "Redis"]}
            isComingSoon
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
          <BentoCard
            src="videos/feature-4.mp4"
            title={
              <>
                Port<b>f</b>olio
              </>
            }
            description="Interactive GSAP portfolio."
            tech={["React", "GSAP"]}
            isComingSoon
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_2">
          <div className="flex size-full flex-col justify-between bg-[#1c1c1f] p-8">
            <h1 className="bento-title special-font max-w-64 text-white">
              G<b>i</b>thub
            </h1>

            <div className="mt-auto">
              <p className="text-zinc-500 text-sm">Explore source code</p>
              <TiLocationArrow className="mt-4 scale-[2] text-white self-start" />
            </div>
          </div>
        </BentoTilt>

        <BentoTilt className="bento-tilt_2">
          <video
            src="videos/feature-5.mp4"
            loop
            muted
            autoPlay
            className="size-full object-cover object-center grayscale opacity-40"
          />
        </BentoTilt>
      </div>
    </div>
  </section>
);

export default Features;