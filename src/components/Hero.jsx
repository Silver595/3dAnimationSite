import { useEffect, useState } from "react";

const Hero = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="min-h-screen flex flex-col justify-center section-padding">
      <div className="max-w-4xl">
        {/* Small label */}
        <p
          className={`text-xs tracking-[0.3em] uppercase text-[#555] mb-8 ${loaded ? "fade-in" : "opacity-0"
            }`}
        >
          Developer & Security Researcher
        </p>

        {/* Main heading */}
        <h1
          className={`text-[clamp(2.5rem,8vw,6rem)] font-semibold leading-[0.95] tracking-tight mb-8 ${loaded ? "fade-in-delay-1" : "opacity-0"
            }`}
        >
          I build things<br />
          & break things.
        </h1>

        {/* Description */}
        <p
          className={`text-lg md:text-xl text-[#888] max-w-xl leading-relaxed mb-12 ${loaded ? "fade-in-delay-2" : "opacity-0"
            }`}
        >
          Full stack developer with a passion for security.
          I create modern web experiences and find vulnerabilities.
        </p>

        {/* CTA */}
        <div
          className={`flex items-center gap-8 ${loaded ? "fade-in-delay-3" : "opacity-0"
            }`}
        >
          <a
            href="#projects"
            className="text-sm border-b border-white pb-1 hover:pb-2 transition-all duration-300"
          >
            View work
          </a>
          <a
            href="#contact"
            className="text-sm text-[#888] hover:text-white transition-colors duration-300"
          >
            Get in touch
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-12 left-1/2 -translate-x-1/2 ${loaded ? "fade-in-delay-4" : "opacity-0"
          }`}
      >
        <div className="flex flex-col items-center gap-2 text-[#555]">
          <span className="text-[10px] tracking-widest uppercase">Scroll</span>
          <div className="w-px h-8 bg-[#333]" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
