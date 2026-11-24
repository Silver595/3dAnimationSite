import { lazy, Suspense, useEffect, useRef, useState } from "react";
import useReducedMotion from "../useReducedMotion";
import { FiGithub, FiTwitter, FiLinkedin, FiArrowUp } from "react-icons/fi";

const GradientASCII = lazy(() => import("./footer-background.jsx"));

const Footer = ({ colorful, ready }) => {
  const reduced = useReducedMotion();
  const footerRef = useRef(null);
  const [palette, setPalette] = useState(null);
  const animateBackground = ready && !reduced;

  useEffect(() => {
    if (!animateBackground || palette) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      const styles = getComputedStyle(entry.target);
      const stops = colorful
        ? ["--ink", "--risco"]
        : ["--ink", "--risco", "--risco", "--muted", "--paper"];
      setPalette(stops.map(token => `rgb(${styles.getPropertyValue(token).trim()})`));
      observer.disconnect();
    }, { rootMargin: "160px" });
    observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, [animateBackground, colorful, palette]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  };

  const socialLinks = [
    {
      name: "GitHub",
      icon: <FiGithub />,
      href: "https://github.com/silver595",
    },
    {
      name: "Twitter",
      icon: <FiTwitter />,
      href: "https://x.com/akashpurjalkar",
    },
    {
      name: "LinkedIn",
      icon: <FiLinkedin />,
      href: "https://www.linkedin.com/in/akash-purjalkar/",
    },
  ];

  return (
    <footer ref={footerRef} className="relative isolate grid min-h-[580px] w-full grid-rows-[1fr_auto] text-paper md:min-h-[670px]">
      <div aria-hidden="true" className="footer-background pointer-events-none absolute inset-x-0 bottom-0">
        {animateBackground && palette && (
          <Suspense fallback={null}>
            <GradientASCII
              colors={palette}
              cellSize={14}
              lightMode={colorful}
              gradientOpacity={colorful ? 0 : 0.9}
              glyphOpacity={colorful ? 0.55 : 0.85}
              grain={colorful ? 0.025 : 0.08}
              intro={false}
              dpr={1}
            />
          </Suspense>
        )}
      </div>
      <nav aria-label="Social links" className="footer-socials relative grid grid-cols-3 grid-rows-3 place-items-center gap-3 px-6 md:px-16">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-11 flex-col items-center justify-center gap-2 font-general text-sm text-paper underline-offset-4 hover:underline focus-visible:underline"
          >
            <span aria-hidden="true" className="text-3xl md:text-4xl">{link.icon}</span>
            {link.name}
          </a>
        ))}
      </nav>

      <div className="relative grid min-h-[60px] items-center gap-1 px-6 py-2 font-mono text-[10px] uppercase tracking-wider sm:flex sm:justify-between sm:gap-5 md:px-16">
        <span>© {new Date().getFullYear()} Akash Purjalkar. All Rights Reserved.</span>
        <div className="flex items-center justify-self-end gap-5 whitespace-nowrap">
          <a
            href="https://www.instagram.com/madebykhua/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-8 items-center underline decoration-paper/60 underline-offset-4 hover:decoration-paper"
          >
            Video Credit
          </a>
          <button
            type="button"
            onClick={scrollToTop}
            className="group flex min-h-8 items-center gap-2 uppercase underline-offset-4 hover:underline focus-visible:underline"
          >
            Return to Top
            <FiArrowUp aria-hidden="true" className="size-4 motion-safe:transition-transform motion-safe:group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
