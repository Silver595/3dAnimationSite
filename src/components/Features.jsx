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

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
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
    <div className="relative size-full">
      {/* Video or Gradient Background */}
      {src ? (
        <video
          src={src}
          loop
          muted
          autoPlay
          className="absolute left-0 top-0 size-full object-cover object-center opacity-60 transition-opacity duration-500 group-hover:opacity-80"
        />
      ) : (
        <div className="absolute left-0 top-0 size-full bg-gradient-to-br from-violet-900/20 to-zinc-900" />
      )}

      <div className="relative z-10 flex size-full flex-col justify-between p-8 text-white">
        <div>
          <h1 className="bento-title special-font">{title}</h1>
          {description && (
            <p className="mt-4 max-w-64 text-sm text-zinc-300 md:text-base font-general leading-relaxed">{description}</p>
          )}
          {tech && (
            <div className="mt-4 flex flex-wrap gap-2">
              {tech.map((t, i) => (
                <span key={i} className="px-2 py-1 text-[10px] uppercase tracking-wider bg-white/10 rounded-md backdrop-blur-md border border-white/5">
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>

        {isComingSoon && (
          <div className="flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-md rounded-full w-fit border border-white/10">
            <TiLocationArrow className="text-violet-400" />
            <p className="text-xs uppercase tracking-widest text-zinc-400">View Project</p>
          </div>
        )}
      </div>
    </div>
  );
};

const Features = () => (
  <section id="projects" className="bg-[#0f0f12] pb-52 relative z-10">
    <div className="container mx-auto px-3 md:px-10">
      <div className="px-5 py-32">
        <p className="font-circular-web text-lg text-violet-400">
          Selected Projects
        </p>
        <p className="max-w-md font-circular-web text-lg text-zinc-400 opacity-80 mt-2">
          A showcase of vulnerability research, security tools, and full-stack applications.
        </p>
      </div>

      <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-[2.5rem] md:h-[65vh] shadow-2xl shadow-violet-900/10">
        <BentoCard
          src="videos/feature-1.mp4"
          title={
            <>
              Sec<b>u</b>rity <br /> Scanner
            </>
          }
          description="Automated vulnerability detection engine enabling developers to find flaws early in the CI/CD pipeline."
          tech={["Python", "Docker", "Redis", "React"]}
          isComingSoon
        />
      </BentoTilt>

      <div className="grid h-[135vh] w-full grid-cols-2 grid-rows-3 gap-7">
        <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2 shadow-2xl shadow-violet-900/10">
          <BentoCard
            src="videos/feature-2.mp4"
            title={
              <>
                Bug <b>T</b>racker
              </>
            }
            description="Collaborative platform for security researchers to report and triage vulnerabilities."
            tech={["Next.js", "PostgreSQL", "Prisma"]}
            isComingSoon
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0 shadow-2xl shadow-violet-900/10">
          <BentoCard
            src="videos/feature-3.mp4"
            title={
              <>
                API <b>G</b>ateway
              </>
            }
            description="High-performance secure gateway with rate limiting and JWT validation."
            tech={["Go", "Redis", "gRPC"]}
            isComingSoon
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0 shadow-2xl shadow-violet-900/10">
          <BentoCard
            src="videos/feature-4.mp4"
            title={
              <>
                Port<b>f</b>olio
              </>
            }
            description="Interactive portfolio featuring GSAP animations and 3D elements."
            tech={["React", "Three.js", "Tailwind"]}
            isComingSoon
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_2 shadow-2xl shadow-violet-900/10">
          <div className="flex size-full flex-col justify-between bg-violet-600 p-8 rounded-[2rem]">
            <h1 className="bento-title special-font max-w-64 text-white">
              G<b>i</b>thub
            </h1>

            <div className="mt-auto">
              <p className="text-white/80 text-sm">Explore more code</p>
              <TiLocationArrow className="mt-4 scale-[2] text-white self-start" />
            </div>
          </div>
        </BentoTilt>

        <BentoTilt className="bento-tilt_2 shadow-2xl shadow-violet-900/10">
          <video
            src="videos/feature-5.mp4"
            loop
            muted
            autoPlay
            className="size-full object-cover object-center rounded-[2rem] opacity-80"
          />
        </BentoTilt>
      </div>
    </div>
  </section>
);

export default Features;