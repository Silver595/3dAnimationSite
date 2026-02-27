
import Hero from "./components/Hero";
import About from "./components/About";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
//import Terminal from "./components/Terminal"; // New Component
import { useEffect } from "react";
import Lenis from "lenis";

const App = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      orientation: "vertical",
      gestureOrientation: "vertical",
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden bg-[#0a0a0a]">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      {/* <Terminal /> Terminal hidden per user request */}
      <Contact />
      <Footer />
    </main>
  );
};

export default App;
