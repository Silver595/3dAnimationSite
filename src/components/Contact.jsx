import useReducedMotion from "../useReducedMotion";
import AnimatedTitle from "./AnimatedTitle";
import { useState, useRef } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";


const Contact = ({ onSent }) => {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState("");

  const containerRef = useRef(null);
  const reduced = useReducedMotion();

  const handleChange = (e) => {
    setIsSent(false);
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.message.trim()) {
      setError("Enter a name and a message.");
      return;
    }
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch('/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      const result = await response.json();
      if (response.ok && result?.data?.id && !result.error) {
        setIsSent(true);
        onSent();
        setFormState({ name: "", email: "", message: "" });
      } else {
        throw new Error('Server reported an error');
      }
    } catch (error) {
      console.error("FAILED...", error);
      setError("Transmission Failed. Retry?");
    } finally {
      setIsSubmitting(false);
    }
  };

  useGSAP(() => {
    if (reduced) return;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        end: "bottom bottom",
        toggleActions: "play none none reverse"
      }
    });

    tl.fromTo(".contact-clip-path",
      { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" },
      { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", duration: 1, ease: "power4.inOut" }
    )
      .from(".contact-field", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out"
      }, "-=0.5");

    gsap.to(".contact-katana", {
      y: -80,
      rotation: -30,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

  }, { scope: containerRef, dependencies: [reduced], revertOnUpdate: true });

  return (
    <div id="contact" ref={containerRef} className="relative min-h-screen w-full bg-surface pt-24 pb-10 overflow-hidden">

      {/* Background Texture & Silhouette */}
      <div className="absolute inset-0 bg-[url('/img/intricate_minimal.svg')] bg-center opacity-5 pointer-events-none" />
      <img
        src="/img/katana.png"
        loading="lazy"
        decoding="async"
        alt=""
        aria-hidden="true"
        className="contact-katana pointer-events-none absolute right-4 md:right-16 top-1/2 -translate-y-1/2 max-h-[420px] object-contain opacity-[0.05] -rotate-45 select-none grayscale will-change-transform"
      />

      <div className="relative z-10 px-6 md:px-10">
        <div className="mb-20">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted mb-6">
          </p>
          <AnimatedTitle
            title="Init<b>i</b>ate <br /> C<b>o</b>nnection"
            containerClass="special-font !text-6xl md:!text-9xl !font-black !leading-[0.85] text-content"
          />
        </div>

        <div className="contact-clip-path pt-10 md:pt-20 flex flex-col md:flex-row gap-20">

          {/* Left: Contact Details */}
          <div className="min-w-0 w-full md:w-1/3 flex flex-col justify-between">
            <div className="space-y-12 contact-field">
              <div>
                <h4 className="font-mono text-xs text-muted uppercase tracking-widest mb-4">Contact directly</h4>
                <a href="mailto:akashpurjalkar66@gmail.com" className="text-2xl md:text-xl [overflow-wrap:anywhere] font-general text-content hover:text-muted transition-colors block">
                  akashpurjalkar66@gmail.com
                </a>
              </div>
              <div>
                <h4 className="font-mono text-xs text-muted uppercase tracking-widest mb-4">current place of work</h4>
                <div className="flex items-center gap-4">
                  <img
                    src="/img/wave.gif"
                    loading="lazy"
                    decoding="async"
                    alt=""
                    aria-hidden="true"
                    className="size-8 object-contain opacity-70"
                  />
                  <div>
                    <p className="text-xl font-general text-content">
                      Pune, Maharashtra
                    </p>

                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="min-w-0 w-full md:w-2/3">
            <form onSubmit={handleSubmit} className="space-y-12">
              <div className="contact-field group relative">
                <label htmlFor="contact-name" className="block font-mono text-xs text-muted uppercase tracking-widest mb-2 group-focus-within:text-content transition-colors">Identify Yourself</label>
                <input
                  type="text"
                  autoComplete="name"
                  id="contact-name"
                  name="name"
                  maxLength={100}
                  disabled={isSubmitting}
                  value={formState.name}
                  onChange={handleChange}
                  required
                  placeholder="ENTER NAME_"
                  className="w-full bg-transparent border-b border-muted py-4 text-3xl md:text-5xl text-content placeholder-muted focus:border-content outline-none transition-all uppercase"
                />
              </div>

              <div className="contact-field group relative">
                <label htmlFor="contact-email" className="block font-mono text-xs text-muted uppercase tracking-widest mb-2 group-focus-within:text-content transition-colors">Email address</label>
                <input
                  type="email"
                  autoComplete="email"
                  id="contact-email"
                  name="email"
                  maxLength={150}
                  disabled={isSubmitting}
                  value={formState.email}
                  onChange={handleChange}
                  required
                  placeholder="ENTER EMAIL_"
                  className="w-full bg-transparent border-b border-muted py-4 text-3xl md:text-5xl text-content placeholder-muted focus:border-content outline-none transition-all"
                />
              </div>

              <div className="contact-field group relative">
                <label htmlFor="contact-message" className="block font-mono text-xs text-muted uppercase tracking-widest mb-2 group-focus-within:text-content transition-colors">Transmission Data</label>
                <textarea
                  id="contact-message"
                  name="message"
                  maxLength={5000}
                  disabled={isSubmitting}
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows="2"
                  placeholder="ENTER MESSAGE_"
                  className="w-full bg-transparent border-b border-muted py-4 text-3xl md:text-5xl  text-content placeholder-muted focus:border-content outline-none transition-all resize-none  leading-tight"
                />
              </div>

              <div className="contact-field pt-10 flex flex-wrap justify-end items-center gap-6">
                {error && <p role="alert" className="font-mono text-xs bg-accent/25 px-2 py-1 text-content uppercase tracking-widest animate-pulse">{error}</p>}
                <span role="status" className="sr-only">{isSent ? "Message sent." : ""}</span>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative max-w-full px-10 py-5 bg-accent text-ink font-general font-bold uppercase tracking-widest overflow-hidden hover:bg-content hover:text-surface transition-all clip-path-slant"
                  style={{ clipPath: "polygon(10% 0, 100% 0, 100% 100%, 0 100%, 0 20%)" }}
                >
                  <div className="relative z-10 flex items-center gap-4">
                    <span>{isSubmitting ? "TRANSMITTING..." : isSent ? "DATA UPLOADED" : "SEND TRANSMISSION"}</span>
                    {!isSent && <FiArrowUpRight className="text-xl group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                  </div>
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>

      {/* Decorative Footer Line */}
      <div className="w-full h-px bg-muted/25 mt-20" />
    </div>
  );
};

export default Contact;
