import clsx from "clsx";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

const navItems = ["Projects", "Skills", "About", "Contact"];

const NavBar = () => {
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);

  const audioElementRef = useRef(null);
  const navContainerRef = useRef(null);

  const toggleAudioIndicator = () => {
    const audio = audioElementRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio
        .play()
        .then(() => {
          setIsIndicatorActive(true);
        })
        .catch((error) => {
          console.log("Audio playback blocked:", error);
        });
    } else {
      audio.pause();
      setIsIndicatorActive(false);
    }
  };

  // Passive scroll direction handler with zero React re-renders
  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const currentY = window.scrollY;
      const nav = navContainerRef.current;
      if (!nav) return;

      if (currentY === 0) {
        nav.classList.remove("floating-nav");
        gsap.to(nav, { y: 0, opacity: 1, duration: 0.25, overwrite: "auto" });
      } else if (currentY > lastY && currentY > 50) {
        nav.classList.add("floating-nav");
        gsap.to(nav, { y: -100, opacity: 0, duration: 0.25, overwrite: "auto" });
      } else if (currentY < lastY) {
        nav.classList.add("floating-nav");
        gsap.to(nav, { y: 0, opacity: 1, duration: 0.25, overwrite: "auto" });
      }
      lastY = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6 rounded-lg"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4 px-6">
          <div className="flex items-center gap-7">
            <span className="font-zentry text-lg font-black text-white uppercase tracking-widest">
              AP<span className="text-zinc-600">.</span>
            </span>
          </div>

          <div className="flex h-full items-center">
            <div className="hidden md:block">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={`#${item.toLowerCase()}`}
                  className="nav-hover-btn text-xs font-mono tracking-widest text-[#888] hover:text-white uppercase"
                >
                  {item}
                </a>
              ))}
            </div>

            <audio
              ref={audioElementRef}
              className="hidden"
              src="/audio/loop.mp3"
              loop
            />

            <button
              onClick={toggleAudioIndicator}
              aria-label="Toggle background audio"
              className="ml-10 flex items-center space-x-0.5 mr-4 focus:outline-none"
            >
              {[1, 2, 3, 4].map((bar) => (
                <div
                  key={bar}
                  className={clsx("indicator-line", {
                    active: isIndicatorActive,
                  })}
                  style={{
                    animationDelay: `${bar * 0.1}s`,
                  }}
                />
              ))}
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default NavBar;
