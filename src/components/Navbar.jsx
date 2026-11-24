import gsap from "gsap";
import { useEffect, useRef } from "react";

const navItems = ["Projects", "Skills", "About", "Contact"];

const NavBar = ({ colorful, audioEnabled, onToggleAudio }) => {

  const navContainerRef = useRef(null);

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
      } else if (currentY > lastY && currentY > 50 && !nav.contains(document.activeElement)) {
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
      onFocusCapture={() => gsap.to(navContainerRef.current, { y: 0, opacity: 1, duration: 0.2, overwrite: "auto" })}
      className="fixed inset-x-0 top-4 z-50 h-16 rounded-lg border-none bg-transparent [text-shadow:0_1px_2px_rgb(var(--ink)),0_0_6px_rgb(var(--ink)),0_0_10px_rgb(var(--ink))] transition-all duration-700 sm:inset-x-6"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav aria-label="Main navigation" className="flex size-full items-center justify-between p-2 md:p-4 md:px-6">
          <div className="flex shrink-0 items-center gap-7">
            <span className="font-zentry text-lg font-black leading-none tracking-widest text-paper">
              AP<span className={colorful ? "text-accent" : "text-muted"}>.</span>
            </span>
          </div>

          <div className="flex min-w-0 items-center">
            <div className="flex items-center gap-2 max-[359px]:gap-1 md:gap-0">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="nav-hover-btn inline-flex min-h-6 items-center py-1 text-[10px] max-[359px]:text-[9px] md:text-xs"
                >
                  {item}
                </a>
              ))}
            </div>

            <button
              type="button"
              onClick={onToggleAudio}
              data-audio-toggle
              aria-label={colorful ? "Toggle music and sound effects" : "Sound is off in Colorless"}
              disabled={!colorful}
              aria-pressed={audioEnabled}
              className="ml-2 flex min-h-8 min-w-7 shrink-0 items-center justify-center space-x-0.5 drop-shadow-[0_1px_2px_#102024] focus-visible:outline-paper max-[359px]:ml-1 md:ml-10 md:mr-4"
            >
              {[1, 2, 3, 4].map((bar) => (
                <span
                  key={bar}
                  className={audioEnabled ? "indicator-line active" : "indicator-line"}
                  style={{ animationDelay: `${bar * 0.1}s` }}
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
