import { lazy, Suspense, useEffect, useRef, useState } from "react";
import useReducedMotion from "../useReducedMotion";
import { FiGithub, FiTwitter, FiLinkedin, FiArrowUp } from "react-icons/fi";

const AeroShards = lazy(() => import("./footer-background"));

const Footer = ({ colorful, ready }) => {
  const reduced = useReducedMotion();
  const footerRef = useRef(null);
  const [nearFooter, setNearFooter] = useState(false);
  const [shardsStatus, setShardsStatus] = useState("loading");
  const useShards = ready && !reduced && shardsStatus !== "failed" && "gpu" in navigator;

  useEffect(() => {
    if (!useShards || nearFooter) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setNearFooter(true);
      observer.disconnect();
    }, { rootMargin: "160px" });
    observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, [useShards, nearFooter]);

  useEffect(() => {
    if (reduced) setShardsStatus(status => status === "live" ? "loading" : status);
  }, [reduced]);

  const showShards = useShards && nearFooter;
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  };

  const socialLinks = [
    {
      name: "Github",
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
    <footer ref={footerRef} className="relative isolate w-full overflow-hidden border-t border-paper/10 bg-ink text-paper">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {/* Still frame rendered from Aero Shards for reduced motion and GPU fallback. */}
        {(!showShards || shardsStatus !== "live") && (
          <img
            src="/img/aero-shards-still.webp"
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 size-full object-cover object-right opacity-40"
          />
        )}
        {showShards && (
          <Suspense fallback={null}>
            <AeroShards
              shardColor={colorful ? "#F8DBC1" : "#999999"}
              accentColor={colorful ? "#EA4F88" : "#D4D4D4"}
              placement="full"
              material="chrome"
              className="opacity-75"
              count={420}
              dpr={0.85}
              speed={0.55}
              glow={0.2}
              grain={0}
              intro={false}
              pulseOnClick={false}
              holdToGather={false}
              onReady={() => setShardsStatus("live")}
              onError={() => setShardsStatus("failed")}
            />
          </Suspense>
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/55 to-ink/15" />
      </div>
      <div className="relative w-full">

        <div
          className="
            group
            relative
            flex
            min-h-[110px]
            items-center
            border-b
            border-none
            px-8
            md:px-16
          "
        >
          {/* Left micro marker */}

          <div className="absolute left-0 top-0 h-3 w-3 border-l border-t border-paper/20 transition-all duration-500 group-hover:h-5 group-hover:w-5" />

          <div className="flex items-center gap-5">
            <span className="h-px w-8 bg-accent transition-all duration-500 group-hover:w-14" />

            <span
              className="
                font-mono
                text-xs
                uppercase
                tracking-[0.3em]
                text-paper
                transition-colors
                duration-300
                group-hover:text-paper
              "
            >
              Contact
            </span>
          </div>

          <span
            className="
              absolute
              right-8
              font-mono
              text-[9px]
              uppercase
              tracking-[0.25em]
              text-paper
              md:right-16
            "
          >
            AVAILABLE
          </span>
        </div>

        <div
          className="
            group
            relative
            flex
            min-h-[110px]
            items-center
            border-b
            border-none
            px-8
            md:px-16
          "
        >
          <div className="flex w-full flex-col gap-7 md:flex-row md:items-center">
            {/* Label */}

            <div className="flex min-w-[150px] items-center gap-5">
              <span className="h-px w-8 bg-accent transition-all duration-500 group-hover:w-14" />

              <span
                className="
                  font-mono
                  text-xs
                  uppercase
                  tracking-[0.3em]
                  text-paper
                  transition-colors
                  duration-300
                  group-hover:text-paper
                "
              >
                Connect
              </span>
            </div>

            {/* Social links */}

            <div className="flex flex-wrap items-center gap-x-10 gap-y-5">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    group/link
                    relative
                    flex
                    items-center
                    gap-3
                    text-paper
                    transition-colors
                    duration-300
                    hover:text-paper
                  "
                >
                  <span
                    className="
                      text-lg
                      transition-transform
                      duration-300
                      group-hover/link:-translate-y-1
                    "
                  >
                    {link.icon}
                  </span>

                  <span className="font-general text-sm">{link.name}</span>

                  <span
                    className="
                      font-mono
                      text-[9px]
                      text-paper
                      transition-all
                      duration-300
                      group-hover/link:translate-x-1
                      group-hover/link:text-paper
                    "
                  >
                    ↗
                  </span>

                  {/* Hover underline */}

                  <span
                    className="
                      absolute
                      -bottom-2
                      left-0
                      h-px
                      w-0
                      bg-accent
                      transition-all
                      duration-300
                      group-hover/link:w-full
                    "
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="relative h-[300px] md:h-[390px]">
          {/* Horizontal measurement line */}

          <div
            className="
              absolute
              left-8
              right-8
              top-1/2
              hidden
              border-t
              border-dashed
              border-paper/5
              md:block
            "
          />

          <button
            onClick={scrollToTop}
            aria-label="Return to top"
            className="
              group/top
              absolute
              bottom-0
              right-0
              flex
              h-[135px]
              w-[min(280px,100%)]
              flex-col
              items-center
              justify-center
              overflow-hidden
              bg-ink
              text-paper
              transition-all
              duration-500
              [clip-path:polygon(30%_0,100%_0,100%_100%,0_100%)]
              hover:bg-accent
              hover:text-ink
              md:h-[155px]
              md:w-[340px]
            "
          >

            <span
              className="
                pointer-events-none
                absolute
                left-0
                top-0
                h-px
                w-[42%]
                origin-left
                -rotate-[29deg]
                bg-paper/25
                transition-colors
                duration-500
                group-hover/top:bg-ink/20
              "
            />

            <FiArrowUp
              className="
                mb-4
                text-4xl
                transition-all
                duration-500
                group-hover/top:-translate-y-2
                group-hover/top:scale-110
              "
            />

            <span
              className="
                text-[9px]
                uppercase
                tracking-[0.35em]
                transition-all
                duration-500
                group-hover/top:tracking-[0.45em]
              "
            >
              Return to Top
            </span>

            <span
              className="
                absolute
                bottom-5
                h-px
                w-8
                bg-accent
                transition-all
                duration-500
                group-hover/top:w-16
                group-hover/top:bg-ink
              "
            />
          </button>
        </div>

        <div
          className="
            flex
            min-h-[60px]
            w-full
            items-center
            justify-between
            border-t
            border-paper/10
            px-8
            md:px-16
          "
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-paper">
            © {new Date().getFullYear()} Akash Purjalkar. All Rights Reserved.
          </span>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
