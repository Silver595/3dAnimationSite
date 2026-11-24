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
        <nav className="flex size-full items-center justify-between p-2 md:p-4 md:px-6">
          <div className="flex items-center gap-7">
            <span className="font-zentry text-lg font-black text-white uppercase tracking-widest">
              AP<span className="text-zinc-600">.</span>
            </span>
          </div>

          <div className="flex h-full items-center">
            <div className="flex items-center gap-2 md:gap-0">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="nav-hover-btn text-[10px] md:text-xs font-mono md:tracking-widest text-[#888] hover:text-white uppercase"
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
              aria-pressed={isIndicatorActive}
              className="ml-2 flex min-h-8 min-w-7 items-center justify-center space-x-0.5 md:ml-10 md:mr-4"
            >
              {[1, 2, 3, 4].map((bar) => (
                <div
                  key={bar}
                  className={isIndicatorActive ? "indicator-line active" : "indicator-line"}
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
