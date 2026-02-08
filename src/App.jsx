
import Hero from "./components/Hero";
import About from "./components/About";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Story from "./components/Strory";

const App = () => {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden bg-[#0a0a0a]">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Story />
      <Contact />
      <Footer />
    </main>
  );
};

export default App;