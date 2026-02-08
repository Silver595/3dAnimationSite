import { useState, useEffect } from "react";

const navItems = ["About", "Projects", "Contact"];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-[#0c0c0c]/90 backdrop-blur-sm" : ""
        }`}
    >
      <div className="section-padding py-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="text-lg font-medium tracking-tight">
          Silver
        </a>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm text-[#888] hover:text-white transition-colors duration-300"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Mobile indicator */}
        <div className="md:hidden text-sm text-[#888]">
          ↓
        </div>
      </div>
    </nav>
  );
};

export default Navbar;