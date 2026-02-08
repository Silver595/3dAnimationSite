
import Hero from "./components/Hero";
import About from "./components/About";
import Navbar from "./components/Navbar";
import Features from "./components/Features";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Story from "./components/Strory";

const App = () => {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden bg-[#0f0f12]">
      <Navbar />
      <Hero />
      <About />
      <Features />
      <Story />
      <Contact />
      <Footer />
    </main>
  );
};

export default App;