import { flushSync } from "react-dom";
import useReducedMotion from "./useReducedMotion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

import Loader from "./components/Loader";
import SoundChoice from "./components/SoundChoice";
import SoundEffects from "./components/SoundEffects";
import NotFound from "./components/NotFound";
import Hero from "./components/Hero.jsx";
import About from "./components/About";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

// Only the home route exists (sections use #hash anchors, which don't change pathname).
const isHomePath = () => {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  return path === "/" || path === "/index.html";
};

const clickable = "a[href], button:not(:disabled)";
const textField = "input:not(:disabled), textarea:not(:disabled)";

const App = () => {
  const reduced = useReducedMotion();
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [choice, setChoice] = useState(null);
  const colorful = choice === "colorful";
  const audioRef = useRef(null);
  const heroMediaRef = useRef(null);
  const heroSectionRef = useRef(null);
  const effectsRef = useRef(null);
  const mainRef = useRef(null);
  const audioEnabledRef = useRef(false);
  const lastTypingCue = useRef(-Infinity);

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = colorful ? "colorful" : "colorless";
    document.querySelector('meta[name="theme-color"]').content = colorful ? "#1D646C" : "#0A0A0A";
    document.getElementById("site-icon").href = colorful ? "/ap-colorful.svg" : "/vite.svg";
  }, [colorful]);

  const setAudio = (enabled) => {
    audioEnabledRef.current = enabled;
    setAudioEnabled(enabled);
  };

  const chooseExperience = (colorfulChoice) => {
    // Commit the selected player before the user's audio activation expires.
    flushSync(() => {
      setChoice(colorfulChoice ? "colorful" : "colorless");
      setAudio(colorfulChoice);
    });
    if (colorfulChoice) effectsRef.current?.enable();
    syncPlayback();
    mainRef.current.focus({ preventScroll: true });
  };

  const updateAudio = (enabled) => {
    setAudio(enabled);
    syncPlayback();
  };

  const playEffect = (id) => {
    effectsRef.current?.play(id);
  };

  const playClick = (event) => {
    const control = event.target.closest(clickable);
    if (control && !control.matches("button[type=submit]")) {
      playEffect("click");
    }
  };

  const playHover = (event) => {
    if (event.pointerType !== "mouse" || event.buttons) return;
    const control = event.target.closest(`${clickable}, ${textField}`);
    if (control && !control.contains(event.relatedTarget)) playEffect("hover");
  };

  const playFieldFocus = (event) => {
    if (event.target.matches(textField)) playEffect("focus");
  };

  const playTyping = (event) => {
    if (!colorful || !event.target.matches(textField)) return;
    const now = performance.now();
    if (now - lastTypingCue.current < 45) return;
    lastTypingCue.current = now;
    playEffect("typing");
  };

  const [notFound, setNotFound] = useState(() => !isHomePath());
  useEffect(() => {
    if (!notFound) return;
    audioEnabledRef.current = false;
    setAudioEnabled(false);
  }, [notFound]);

  const [loading, setLoading] = useState(() => isHomePath());
  const [heroReady, setHeroReady] = useState(() => !isHomePath());

  // Keep the view in sync with browser back/forward.
  useEffect(() => {
    const onPop = () => setNotFound(!isHomePath());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  // Return button: client-side navigation (no reload -> loader never replays).
  const goHome = () => {
    window.history.pushState({}, "", "/");
    setLoading(false);
    setHeroReady(true);
    setNotFound(false);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (notFound || loading || !choice || reduced) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      orientation: "vertical",
      gestureOrientation: "vertical",
      touchMultiplier: 2,
      infinite: false,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, [loading, choice, notFound, reduced]);

  function syncPlayback() {
    const section = heroSectionRef.current;
    if (!section) return;

    const media = heroMediaRef.current;
    const music = audioRef.current;
    const { top, bottom } = section.getBoundingClientRect();
    const inHero = bottom > 0 && top < window.innerHeight;
    const foreground = document.visibilityState === "visible";
    const audible = audioEnabledRef.current && foreground;
    const playHero = inHero && foreground && (media?.tagName === "VIDEO" || audible);
    const playLoop = !inHero && audible;

    // Stop the outgoing track before starting the other one.
    if (!playLoop) music?.pause();
    if (media) {
      media.volume = 0.32;
      media.muted = !inHero || !audible;
      if (!playHero) media.pause();
      else if (media.paused) media.play().catch(() => {});
    }
    if (playLoop && music?.paused) {
      music.volume = 0.3;
      music.play().catch(() => {});
    }
  }

  useEffect(() => {
    if (!choice || notFound) return;
    const selectedMedia = heroMediaRef.current;
    const music = audioRef.current;
    const observer = new IntersectionObserver(syncPlayback);
    observer.observe(heroSectionRef.current);
    document.addEventListener("visibilitychange", syncPlayback);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncPlayback);
      selectedMedia?.pause();
      music?.pause();
    };
  }, [choice, notFound, reduced]);

  if (notFound) {
    return <NotFound onHome={goHome} />;
  }

  return (
    <>
      {loading && (
        <Loader
          onExitStart={() => setHeroReady(true)}
          onComplete={() => setLoading(false)}
        />
      )}

      {!loading && !choice && <SoundChoice onChoose={chooseExperience} />}
      {colorful && (
        <>
          <SoundEffects ref={effectsRef} />
          <audio ref={audioRef} src="/audio/loop.mp3" preload="none" loop />
        </>
      )}

      <main
        ref={mainRef}
        tabIndex={-1}
        onClickCapture={playClick}
        onPointerOver={playHover}
        onFocus={playFieldFocus}
        onInput={playTyping}
        onSubmitCapture={() => playEffect("submit")}
        className="relative min-h-screen w-full overflow-x-hidden bg-surface"
      >
        <Navbar
          colorful={colorful}
          audioEnabled={audioEnabled}
          onToggleAudio={() => updateAudio(!audioEnabledRef.current)}
        />
        <Hero
          isReady={heroReady}
          choice={choice}
          sectionRef={heroSectionRef}
          mediaRef={heroMediaRef}
        />
        <About />
        <Projects />
        <Skills />
        <Contact onSent={() => playEffect("sent")} />
        <Footer colorful={colorful} ready={Boolean(choice)} />
      </main>
    </>
  );
};

export default App;
