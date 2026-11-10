import { useEffect, useRef } from "react";
import gsap from "gsap";

const Loader = ({ onExitStart, onComplete }) => {
  const panelRef = useRef(null);
  const contentRef = useRef(null);
  const countRef = useRef(null);
  const lineRef = useRef(null);

  // Keep latest callbacks without restarting the effect
  const callbacks = useRef({ onExitStart, onComplete });
  callbacks.current = { onExitStart, onComplete };

  useEffect(() => {
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      callbacks.current.onExitStart?.();
      callbacks.current.onComplete?.();
      return;
    }

    const state = { value: 0 };
    let goal = 0;
    let exited = false;

    const render = () => {
      countRef.current.textContent = String(Math.round(state.value)).padStart(2, "0");
      lineRef.current.style.transform = `scaleX(${state.value / 100})`;
    };

    const exit = () => {
      if (exited) return;
      exited = true;

      gsap
        .timeline()
        .to([contentRef.current, lineRef.current], {
          opacity: 0,
          duration: 0.35,
          ease: "power2.out",
        })
        .add(() => callbacks.current.onExitStart?.())
        .to(panelRef.current, {
          yPercent: -100,
          duration: 0.9,
          ease: "power4.inOut",
          onComplete: () => callbacks.current.onComplete?.(),
        });
    };

    // Move the counter toward a higher target (never backwards)
    const advance = (target) => {
      if (exited) return;
      goal = Math.max(goal, target);
      gsap.to(state, {
        value: goal,
        duration: goal === 100 ? 0.6 : 0.8,
        ease: "power2.out",
        overwrite: true,
        onUpdate: render,
        onComplete: () => {
          if (state.value >= 100) exit();
        },
      });
    };

    advance(20);

    // Asset checkpoints
    document.fonts?.ready.then(() => advance(60));

    const onLoad = () => advance(85);
    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad, { once: true });

    const probe = document.createElement("video");
    probe.preload = "auto";
    probe.onloadeddata = () => advance(100);
    probe.src = "/videos/mixkit-4.mp4";

    // Safety net so it never stalls
    const safety = setTimeout(() => advance(100), 2500);

    return () => {
      exited = true;
      clearTimeout(safety);
      window.removeEventListener("load", onLoad);
      probe.onloadeddata = null;
      probe.removeAttribute("src");
      probe.load();
      gsap.killTweensOf(state);
    };
  }, []);

  return (
    <div
      ref={panelRef}
      role="status"
      aria-label="Loading site"
      className="pointer-events-none fixed inset-0 z-[9999] select-none overflow-hidden bg-[#0a0a0a]"
    >
      <div
        ref={contentRef}
        className="absolute inset-0 flex flex-col justify-between p-6 md:p-12 z-20"
      >

        {/* Center 3D Wireframe & Monolithic Counter */}
        <div className="flex flex-col items-center justify-center my-auto">
          <div className="relative mb-6">
            <img
              src="/img/sphere.gif"
              alt="Loading"
              className="size-28 md:size-36 object-contain opacity-85 filter drop-shadow-[0_0_24px_rgba(255,255,255,0.18)]"
            />
            <div className="pointer-events-none absolute inset-0 bg-white/10 rounded-full blur-2xl opacity-30" />
          </div>

          <div className="flex items-baseline gap-1">
            <span
              ref={countRef}
              className="text-7xl md:text-9xl font-extralight tracking-tighter text-white tabular-nums font-mono leading-none"
            >
              00
            </span>
            <span className="font-mono text-xl md:text-2xl text-zinc-600 font-light">
              %
            </span>
          </div>
        </div>


      </div>
      <div
        ref={lineRef}
        className="absolute bottom-0 left-0 h-px w-full origin-left bg-white/60"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
};

export default Loader;
