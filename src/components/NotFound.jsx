import { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/*  SILVER595 — ErrorPage ("signal lost")                              */
/*  Usage:                                                             */
/*    <ErrorPage />                                                    */
/*    <ErrorPage code="500" title="SYSTEM FAULT" onHome={() => nav("/")} /> */
/* ------------------------------------------------------------------ */

const BG = "#0a0a0a";
const rand = (n) => Math.floor(Math.random() * n);
const pick = (chars, len) =>
  Array.from({ length: len }, () => chars[rand(chars.length)]).join("");

const makeSide = () => ({
  l: [pick("T72S5-1", 5), pick("T72S5-1", 5), pick("T72S5-1", 5)],
  r: [pick("0123456789", 5), pick("0123456789", 5), pick("0123456789", 5)],
});

const NOISE =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

const DIGIT = "text-[clamp(4.5rem,17vw,13rem)] font-extralight leading-none tracking-tighter tabular-nums";

/* ------------------------------ marks -------------------------------- */

const TopMark = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1">
    <circle cx="7" cy="7" r="5.5" />
    <path d="M7 1v4M7 9v4M1 7h4M9 7h4" />
  </svg>
);

const BottomGlyphs = () => (
  <div className="flex items-center gap-4 text-white/25 sm:gap-6">
    <svg width="9" height="9" viewBox="0 0 9 9" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M1 1l7 7M8 1L1 8" />
    </svg>
    <svg width="9" height="9" viewBox="0 0 9 9" fill="none" stroke="currentColor" strokeWidth="1">
      <rect x="1" y="1" width="7" height="7" />
    </svg>
    <svg width="9" height="9" viewBox="0 0 9 9" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M4.5 1L8 8H1z" />
    </svg>
    <svg className="hidden sm:block" width="9" height="9" viewBox="0 0 9 9" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M0 4.5h3M6 4.5h3" />
    </svg>
  </div>
);

/* --------------------------- glitchable digits ------------------------ */

function Code({ code, glitch }) {
  const chars = String(code).split("");
  return (
    <div className="relative z-10 flex items-center px-3 text-[#ededed] sm:px-6" style={{ textShadow: `0 0 28px ${BG}, 0 0 8px ${BG}` }}>
      <span
        className="relative flex items-center"
        style={{
          transform: glitch ? `translateX(${glitch.dx * 0.35}px)` : "none",
          opacity: glitch?.flick ? 0.55 : 1,
        }}
      >
        {chars.map((c, i) => (
          <span key={i} className={`relative ${DIGIT}`}>
            {c}
            {/* slashed-null on the middle character */}
            {i === 1 && c === "0" && (
              <span
                aria-hidden="true"
                className="sv-slash absolute left-1/2 top-1/2 h-[1px] w-[115%] origin-center bg-[#cfcfcf]"
                style={{ transform: "translate(-50%,-50%) rotate(-62deg)" }}
              />
            )}
          </span>
        ))}
      </span>

      {glitch && (
        <>
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 flex items-center justify-center px-3 text-[#9a9a9a] sm:px-6 ${DIGIT}`}
            style={{
              transform: `translateX(${glitch.dx}px)`,
              clipPath: `inset(${glitch.y1}% 0 ${100 - glitch.y1 - glitch.h1}% 0)`,
            }}
          >
            {code}
          </span>
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 flex items-center justify-center px-3 text-white/70 sm:px-6 ${DIGIT}`}
            style={{
              transform: `translateX(${-glitch.dx * 0.8}px)`,
              clipPath: `inset(${glitch.y2}% 0 ${100 - glitch.y2 - glitch.h2}% 0)`,
            }}
          >
            {code}
          </span>
        </>
      )}
    </div>
  );
}

/* -------------------------------- Page -------------------------------- */

export default function ErrorPage({
  code = "404",
  title = "SIGNAL LOST",
  message = "ROUTE NOT FOUND",
  homeHref = "/",
  homeLabel = "RETURN TO ORIGIN",
  onHome,
}) {
  const rootRef = useRef(null);
  const [side, setSide] = useState(makeSide);
  const [glitch, setGlitch] = useState(null);
  const [path, setPath] = useState("");
  const [reduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    setPath(window.location.pathname + window.location.search);
  }, []);

  /* decorative values + occasional glitch */
  useEffect(() => {
    const id = setInterval(() => {
      setSide(makeSide());
      if (reduced) return;
      if (Math.random() < 0.09) {
        setGlitch({
          dx: (Math.random() < 0.5 ? -1 : 1) * (2 + rand(9)),
          y1: rand(70),
          h1: 6 + rand(16),
          y2: rand(70),
          h2: 4 + rand(12),
          flick: Math.random() < 0.3,
        });
      } else {
        setGlitch(null);
      }
    }, 110);
    return () => clearInterval(id);
  }, [reduced]);

  /* gentle pointer parallax (no re-render) */
  const handleMove = (e) => {
    if (reduced || !rootRef.current) return;
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    rootRef.current.style.setProperty("--px", x.toFixed(3));
    rootRef.current.style.setProperty("--py", y.toFixed(3));
  };

  const handleHome = (e) => {
    if (onHome) {
      e.preventDefault();
      onHome();
    }
  };

  return (
    <main
      ref={rootRef}
      onMouseMove={handleMove}
      role="alert"
      className="relative w-full select-none overflow-hidden font-mono text-[#d4d4d4]"
      style={{ minHeight: "100dvh", background: BG, "--px": 0, "--py": 0 }}
    >
      <style>{`
        @keyframes sv-grain {
          0%{transform:translate(0,0)} 20%{transform:translate(-3%,2%)}
          40%{transform:translate(2%,-3%)} 60%{transform:translate(-2%,-1%)}
          80%{transform:translate(3%,3%)} 100%{transform:translate(0,0)}
        }
        @keyframes sv-in { from{opacity:0} to{opacity:1} }
        @keyframes sv-draw-l { from{transform:scaleX(0)} to{transform:scaleX(1)} }
        @keyframes sv-draw-r { from{transform:scaleX(0)} to{transform:scaleX(1)} }
        @keyframes sv-seek {
          0%{left:0;opacity:0} 8%{opacity:1} 70%{left:calc(100% - 3px);opacity:1}
          78%{left:calc(100% - 3px);opacity:0} 100%{left:calc(100% - 3px);opacity:0}
        }
        @keyframes sv-blink { 0%,60%{opacity:1} 61%,100%{opacity:.25} }
        .sv-grain{animation:sv-grain .6s steps(6) infinite}
        .sv-in{opacity:0;animation:sv-in .7s ease forwards}
        .sv-l{transform-origin:left;animation:sv-draw-l 1s cubic-bezier(.76,0,.24,1) both}
        .sv-r{transform-origin:right;animation:sv-draw-r 1s cubic-bezier(.76,0,.24,1) .15s both}
        .sv-seek{animation:sv-seek 2.6s cubic-bezier(.5,0,.3,1) 1s infinite}
        .sv-blink{animation:sv-blink 1.2s steps(1) infinite}
        @media (prefers-reduced-motion: reduce){
          .sv-grain,.sv-seek,.sv-blink{animation:none}
          .sv-in,.sv-l,.sv-r{animation:none;opacity:1;transform:none}
        }
      `}</style>

      {/* texture */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.028) 0px, rgba(255,255,255,0.028) 1px, transparent 1px, transparent 3px)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
          backgroundSize: "120px 100%",
          backgroundPosition: "center",
        }}
      />
      <div className="sv-grain pointer-events-none absolute -inset-[10%] opacity-[0.05]" style={{ backgroundImage: NOISE }} />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.55) 100%)" }}
      />

      {/* top mark */}
      <div className="sv-in absolute left-1/2 top-6 -translate-x-1/2 text-white/40 sm:top-10" style={{ animationDelay: "0.2s" }}>
        <TopMark />
      </div>

      {/* side info */}
      <div className="sv-in absolute left-3 top-1/2 -translate-y-1/2 text-[8px] leading-[1.9] tracking-[0.25em] text-white/35 sm:left-8 sm:text-[10px]" style={{ animationDelay: "0.5s" }}>
        <div className="text-white/60">E{code}</div>
        {side.l.slice(0, 2).map((s, i) => (
          <div key={i} className={i === 1 ? "hidden sm:block" : ""}>{s}</div>
        ))}
      </div>
      <div className="sv-in absolute right-3 top-1/2 -translate-y-1/2 text-right text-[8px] leading-[1.9] tracking-[0.25em] text-white/35 sm:right-8 sm:text-[10px]" style={{ animationDelay: "0.5s" }}>
        {side.r.map((s, i) => (
          <div key={i} className={i === 2 ? "hidden sm:block" : ""}>{s}</div>
        ))}
      </div>

      {/* center: broken line + code */}
      <div className="absolute left-0 top-[46%] flex w-full -translate-y-1/2 items-center">
        {/* connected segment (left) */}
        <div
          className="relative h-px flex-1"
          style={{ transform: "translateX(calc(var(--px) * -5px))", transition: "transform 300ms ease-out" }}
        >
          <div className="sv-l absolute inset-0 bg-[#cfcfcf]/70" />
          <span className="sv-seek absolute -top-[1px] h-[3px] w-[3px] rounded-full bg-white" />
        </div>

        <div style={{ transform: "translate(calc(var(--px) * 6px), calc(var(--py) * 3px))", transition: "transform 300ms ease-out" }}>
          <Code code={code} glitch={glitch} />
        </div>

        {/* dead segment (right) */}
        <div
          className="relative h-px flex-1"
          style={{ transform: "translateX(calc(var(--px) * 5px))", transition: "transform 300ms ease-out" }}
        >
          <div
            className="sv-r absolute inset-0"
            style={{
              backgroundImage: "repeating-linear-gradient(90deg, rgba(255,255,255,0.28) 0 6px, transparent 6px 12px)",
              WebkitMaskImage: "linear-gradient(90deg, #000, transparent)",
              maskImage: "linear-gradient(90deg, #000, transparent)",
            }}
          />
        </div>
      </div>

      {/* status + action */}
      <div
        className="sv-in absolute left-1/2 top-[46%] flex w-full max-w-[90vw] -translate-x-1/2 flex-col items-center gap-5 px-4 text-center"
        style={{ marginTop: "clamp(4.5rem, 12vw, 9rem)", animationDelay: "0.9s" }}
      >
        <div className="flex items-center gap-3 text-[9px] tracking-[0.35em] text-white/60 sm:text-[11px]">
          <span className="sv-blink inline-block h-[5px] w-[5px] bg-white/80" />
          <span>{title}</span>
        </div>

        <div className="max-w-full text-[8px] tracking-[0.3em] text-white/30 sm:text-[10px]">
          <div>{message}</div>
          {path && <div className="mt-1 truncate text-white/20">{path}</div>}
        </div>

        <a
          href={homeHref}
          onClick={handleHome}
          className="group relative mt-2 inline-flex items-center gap-3 border border-white/15 px-5 py-2.5 text-[9px] tracking-[0.35em] text-[#d4d4d4] transition-colors duration-300 hover:border-white/50 hover:text-white focus-visible:border-white/60 focus-visible:outline-none sm:text-[10px]"
        >
          <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
          <span>{homeLabel}</span>
          <span className="absolute -bottom-px left-0 h-px w-0 bg-white transition-all duration-500 group-hover:w-full" />
        </a>
      </div>

      {/* bottom glyphs */}
      <div className="sv-in absolute bottom-6 left-1/2 -translate-x-1/2 sm:bottom-10" style={{ animationDelay: "0.7s" }}>
        <BottomGlyphs />
      </div>
    </main>
  );
}
