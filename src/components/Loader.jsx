import { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/*  SILVER595 — Loader                                                 */
/*  Usage: <Loader onComplete={() => setLoading(false)} />             */
/* ------------------------------------------------------------------ */

const STEPS = [7, 13, 21, 34, 47, 59, 72, 81, 93, 100];
const EXIT_MS = 900;
const EASE = "cubic-bezier(0.76, 0, 0.24, 1)";
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

/* ---------------------------- small marks ---------------------------- */

const TopMark = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1">
    <circle cx="7" cy="7" r="5.5" />
    <path d="M7 1v4M7 9v4M1 7h4M9 7h4" />
  </svg>
);

const BottomGlyphs = () => (
  <div className="flex items-center gap-4 text-white/25 sm:gap-6">
    <svg width="9" height="9" viewBox="0 0 9 9" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M4.5 0v9M0 4.5h9" />
    </svg>
    <svg width="9" height="9" viewBox="0 0 9 9" fill="none" stroke="currentColor" strokeWidth="1">
      <rect x="1" y="1" width="7" height="7" />
    </svg>
    <svg width="9" height="9" viewBox="0 0 9 9" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M4.5 1L8 8H1z" />
    </svg>
    <svg className="hidden sm:block" width="9" height="9" viewBox="0 0 9 9" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M1 1l7 7M8 1L1 8" />
    </svg>
    <svg className="hidden sm:block" width="9" height="9" viewBox="0 0 9 9" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M0 4.5h9" />
    </svg>
  </div>
);

/* ------------------------------ one layer ---------------------------- */
/* Rendered twice (left + right panel) so the center splits cleanly.    */

function Layer({ pct, phase, side, glitch }) {
  const label = `${String(pct).padStart(2, "0")}%`;
  const expanded = phase === "glitch" || phase === "split";

  return (
    <div className="relative h-full w-full select-none font-mono text-[#d4d4d4]">
      {/* scanlines */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.028) 0px, rgba(255,255,255,0.028) 1px, transparent 1px, transparent 3px)",
        }}
      />
      {/* faint vertical grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
          backgroundSize: "120px 100%",
          backgroundPosition: "center",
        }}
      />
      {/* grain */}
      <div
        className="sv-grain pointer-events-none absolute -inset-[10%] opacity-[0.05]"
        style={{ backgroundImage: NOISE }}
      />
      {/* vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* top mark */}
      <div className="absolute left-1/2 top-6 -translate-x-1/2 text-white/40 sm:top-10">
        <TopMark />
      </div>

      {/* side info */}
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[8px] leading-[1.9] tracking-[0.25em] text-white/35 sm:left-8 sm:text-[10px]">
        {side.l.map((s, i) => (
          <div key={i} className={i === 2 ? "hidden sm:block" : ""}>
            {s}
          </div>
        ))}
      </div>
      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-right text-[8px] leading-[1.9] tracking-[0.25em] text-white/35 sm:right-8 sm:text-[10px]">
        {side.r.map((s, i) => (
          <div key={i} className={i === 2 ? "hidden sm:block" : ""}>
            {s}
          </div>
        ))}
      </div>

      {/* center */}
      <div className="absolute left-0 top-1/2 flex w-full -translate-y-1/2 items-center justify-center">
        {/* progress line (behind the number) */}
        <div
          className="absolute left-0 top-1/2 w-full -translate-y-1/2"
          style={{
            height: expanded ? 2 : 1,
            transition: "height 200ms linear",
          }}
        >
          <div className="absolute inset-0 bg-white/10" />
          <div
            className="absolute inset-0 origin-left bg-[#cfcfcf]"
            style={{
              transform: `scaleX(${pct / 100})`,
              transition: "transform 140ms linear",
              boxShadow: expanded ? "0 0 12px rgba(255,255,255,0.35)" : "none",
            }}
          />
        </div>

        {/* percentage */}
        <div className="relative z-10 px-4">
          <span
            className="block text-[clamp(4rem,15vw,11rem)] font-extralight leading-none tracking-tighter text-[#ededed] tabular-nums"
            style={{
              transform: glitch ? `translateX(${glitch.dx * 0.35}px)` : "none",
              textShadow: `0 0 28px ${BG}, 0 0 8px ${BG}`,
              opacity: glitch && glitch.flick ? 0.55 : 1,
            }}
          >
            {label}
          </span>

          {glitch && (
            <>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 flex items-center justify-center text-[clamp(4rem,15vw,11rem)] font-extralight leading-none tracking-tighter text-[#9a9a9a] tabular-nums"
                style={{
                  transform: `translateX(${glitch.dx}px)`,
                  clipPath: `inset(${glitch.y1}% 0 ${100 - glitch.y1 - glitch.h1}% 0)`,
                }}
              >
                {label}
              </span>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 flex items-center justify-center text-[clamp(4rem,15vw,11rem)] font-extralight leading-none tracking-tighter text-white/70 tabular-nums"
                style={{
                  transform: `translateX(${-glitch.dx * 0.8}px)`,
                  clipPath: `inset(${glitch.y2}% 0 ${100 - glitch.y2 - glitch.h2}% 0)`,
                }}
              >
                {label}
              </span>
            </>
          )}
        </div>
      </div>

      {/* bottom glyphs */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 sm:bottom-10">
        <BottomGlyphs />
      </div>
    </div>
  );
}

/* -------------------------------- Loader ------------------------------ */

export default function Loader({ onComplete }) {
  const [pct, setPct] = useState(0);
  const [phase, setPhase] = useState("loading"); // loading | hold | glitch | split | done
  const [side, setSide] = useState(makeSide);
  const [glitch, setGlitch] = useState(null);
  const [reduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );

  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const exiting = phase === "split" || phase === "done";

  /* progress + phase sequence */
  useEffect(() => {
    const timers = [];
    const at = (fn, ms) => timers.push(setTimeout(fn, ms));

    setPct(0);
    setPhase("loading");

    if (reduced) {
      at(() => setPct(100), 80);
      at(() => setPhase("split"), 300);
      at(() => setPhase("done"), 700);
      return () => timers.forEach(clearTimeout);
    }

    let t = 120;
    STEPS.forEach((v, i) => {
      t += 40 + rand(80) + (i > 5 && i < 9 ? 30 : 0);
      at(() => setPct(v), t);
    });
    at(() => setPhase("hold"), t + 40);
    at(() => setPhase("glitch"), t + 200);
    at(() => setPhase("split"), t + 480);
    at(() => setPhase("done"), t + 480 + EXIT_MS + 40);

    return () => timers.forEach(clearTimeout);
  }, [reduced]);

  /* decorative side values + glitch ticker */
  useEffect(() => {
    if (exiting) {
      setGlitch(null);
      return;
    }
    const chance = phase === "glitch" ? 0.9 : phase === "hold" ? 0.35 : 0.1;
    const id = setInterval(() => {
      setSide(makeSide());
      if (reduced) return;
      if (Math.random() < chance) {
        const big = phase === "glitch";
        setGlitch({
          dx: (Math.random() < 0.5 ? -1 : 1) * (2 + rand(big ? 14 : 7)),
          y1: rand(70),
          h1: 6 + rand(big ? 24 : 14),
          y2: rand(70),
          h2: 4 + rand(big ? 20 : 10),
          flick: Math.random() < (big ? 0.5 : 0.2),
        });
      } else {
        setGlitch(null);
      }
    }, 85);
    return () => clearInterval(id);
  }, [phase, exiting, reduced]);

  /* lock scroll only while loader blocks the page */
  useEffect(() => {
    if (exiting) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [exiting]);

  /* completion */
  useEffect(() => {
    if (phase === "done") onCompleteRef.current?.();
  }, [phase]);

  if (phase === "done") return null;

  const split = phase === "split";
  const panelBase = {
    background: BG,
    willChange: "transform",
    transition: split && !reduced ? `transform ${EXIT_MS}ms ${EASE}` : "none",
  };
  const layerProps = { pct, phase, side, glitch };

  return (
    <div
      role="status"
      className="fixed inset-0 z-[9999]"
      style={{
        height: "100dvh",
        pointerEvents: split ? "none" : "auto",
        opacity: split && reduced ? 0 : 1,
        transition: reduced ? "opacity 300ms linear" : "none",
      }}
    >
      <span className="sr-only">Loading</span>

      <style>{`
        @keyframes sv-grain {
          0%   { transform: translate(0,0); }
          20%  { transform: translate(-3%,2%); }
          40%  { transform: translate(2%,-3%); }
          60%  { transform: translate(-2%,-1%); }
          80%  { transform: translate(3%,3%); }
          100% { transform: translate(0,0); }
        }
        .sv-grain { animation: sv-grain 0.6s steps(6) infinite; }
        @media (prefers-reduced-motion: reduce) { .sv-grain { animation: none; } }
      `}</style>

      {/* left panel */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-0 h-full w-1/2 overflow-hidden"
        style={{
          ...panelBase,
          transform: split && !reduced ? "translate3d(-100%,0,0)" : "translate3d(0,0,0)",
        }}
      >
        <div className="absolute left-0 top-0 h-full" style={{ width: "200%" }}>
          <Layer {...layerProps} />
        </div>
      </div>

      {/* right panel */}
      <div
        aria-hidden="true"
        className="absolute right-0 top-0 h-full w-1/2 overflow-hidden"
        style={{
          ...panelBase,
          transform: split && !reduced ? "translate3d(100%,0,0)" : "translate3d(0,0,0)",
        }}
      >
        <div className="absolute top-0 h-full" style={{ width: "200%", left: "-100%" }}>
          <Layer {...layerProps} />
        </div>
      </div>
    </div>
  );
}
