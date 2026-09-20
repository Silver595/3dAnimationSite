import { useEffect, useState } from "react";
import Lenis from "lenis";

import Loader from "./components/Loader";
import NotFound from "./components/NotFound";
import Hero from "./components/Hero";
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

const App = () => {
  const [notFound, setNotFound] = useState(() => !isHomePath());
  // No loader on the error page, and no loader when returning from it.
  const [loading, setLoading] = useState(() => isHomePath());

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
    setNotFound(false);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (notFound || loading) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      orientation: "vertical",
      gestureOrientation: "vertical",
      touchMultiplier: 2,
      infinite: false,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [loading, notFound]);

  if (notFound) {
    return <NotFound onHome={goHome} />;
  }

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}

      <main className="relative min-h-screen w-screen overflow-x-hidden bg-[#0a0a0a]">
        <Navbar />
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
        <Footer />
      </main>
    </>
  );
};

export default App;
