import clsx from "clsx";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";

const navItems = ["Projects", "Skills", "About", "Contact"];

const NavBar = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);

  const audioElementRef = useRef(null);
  const navContainerRef = useRef(null);

  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleAudioIndicator = () => {
    const audio = audioElementRef.current;

    if (!audio) return;

    if (audio.paused) {
      audio
        .play()
        .then(() => {
          setIsAudioPlaying(true);
          setIsIndicatorActive(true);
        })
        .catch((error) => {
          console.log("Audio playback blocked:", error);
        });
    } else {
      audio.pause();
      setIsAudioPlaying(false);
      setIsIndicatorActive(false);
    }
  };

  // Try autoplay first, then start on the first real user interaction
  useEffect(() => {
    const audio = audioElementRef.current;

    if (!audio) return;

    audio.volume = 0.4;

    const startAudio = () => {
      if (!audio.paused) return;

      audio
        .play()
        .then(() => {
          setIsAudioPlaying(true);
          setIsIndicatorActive(true);
          cleanup();
        })
        .catch(() => {
          // Browser blocked autoplay.
          // Wait for another user interaction.
        });
    };

    const cleanup = () => {
      window.removeEventListener("touchstart", startAudio);
      window.removeEventListener("pointerdown", startAudio);
      window.removeEventListener("click", startAudio);
    };

    // Attempt automatic playback on page load
    startAudio();

    // Mobile
    window.addEventListener("touchstart", startAudio, {
      passive: true,
    });

    // Desktop
    window.addEventListener("pointerdown", startAudio, {
      passive: true,
    });

    window.addEventListener("click", startAudio, {
      passive: true,
    });

    return cleanup;
  }, []);

  // Navbar visibility on scroll
  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      navContainerRef.current.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      navContainerRef.current.classList.add("floating-nav");
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  // Navbar animation
  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

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

            <button
              onClick={toggleAudioIndicator}
              className="ml-10 flex items-center space-x-0.5 mr-4"
            >
              <audio
                ref={audioElementRef}
                className="hidden"
                src="/audio/loop.mp3"
                loop
              />

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
