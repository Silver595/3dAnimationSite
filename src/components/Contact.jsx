
import AnimatedTitle from "./AnimatedTitle";
import { useState, useRef } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState("");

  const containerRef = useRef(null);
  const formRef = useRef(null);

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const serviceId = import.meta.env.VITE_APP_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY;

    console.log("EmailJS Config Check:", {
      serviceId: serviceId ? "Present" : "Missing",
      templateId: templateId ? "Present" : "Missing",
      publicKey: publicKey ? "Present" : "Missing"
    });

    if (!serviceId || !templateId || !publicKey) {
      console.error("EmailJS keys are missing! Check .env file.");
      setError("Config Error: Missing Keys");
      setIsSubmitting(false);
      return;
    }

    try {
      await emailjs.sendForm(
        serviceId,
        templateId,
        formRef.current,
        publicKey
      );
      setIsSent(true);
      setFormState({ name: "", email: "", message: "" });
      setTimeout(() => setIsSent(false), 4000);
    } catch (error) {
      console.error("FAILED...", error);
      setError("Transmission Failed. Retry?");
    } finally {
      setIsSubmitting(false);
    }
  };

  useGSAP(() => {
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

  }, { scope: containerRef });

  return (
    <div id="contact" ref={containerRef} className="relative min-h-screen w-full bg-[#0a0a0a] pt-24 pb-10 overflow-hidden">

      {/* Background Texture */}
      <div className="absolute inset-0 bg-[url('/img/grid.svg')] bg-center opacity-5 pointer-events-none" />

      <div className="relative z-10 px-6 md:px-10">
        <div className="mb-20">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-500 mb-6">
                        // System Uplink
          </p>
          <AnimatedTitle
            title="Init<b>i</b>ate <br /> C<b>o</b>nnection"
            containerClass="special-font !text-6xl md:!text-9xl !font-black !leading-[0.85] text-white"
          />
        </div>

        <div className="contact-clip-path border-t border-white/20 pt-10 md:pt-20 flex flex-col md:flex-row gap-20">

          {/* Left: Contact Details */}
          <div className="w-full md:w-1/3 flex flex-col justify-between">
            <div className="space-y-12 contact-field">
              <div>
                <h4 className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-4">Frequency</h4>
                <a href="mailto:hello@silver.dev" className="text-2xl md:text-3xl font-general text-white hover:text-zinc-400 transition-colors block">
                  hello@silver.dev
                </a>
              </div>
              <div>
                <h4 className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-4">Coordinates</h4>
                <p className="text-xl font-general text-zinc-300">
                  San Francisco, CA<br />
                  Earth, Sol System
                </p>
              </div>
              <div>
                <h4 className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-4">Socials</h4>
                <div className="flex flex-col gap-2">
                  <a href="#" className="group flex items-center gap-3 text-zinc-400 hover:text-white transition-colors">
                    <span className="font-mono text-sm">[GitHub]</span>
                    <FiArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                  <a href="#" className="group flex items-center gap-3 text-zinc-400 hover:text-white transition-colors">
                    <span className="font-mono text-sm">[Twitter]</span>
                    <FiArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                  <a href="#" className="group flex items-center gap-3 text-zinc-400 hover:text-white transition-colors">
                    <span className="font-mono text-sm">[LinkedIn]</span>
                    <FiArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="w-full md:w-2/3">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-12">
              <div className="contact-field group relative">
                <label className="block font-mono text-xs text-zinc-500 uppercase tracking-widest mb-2 group-focus-within:text-white transition-colors">Identify Yourself</label>
                <input
                  type="text"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  placeholder="ENTER NAME_"
                  className="w-full bg-transparent border-b border-white/20 py-4 text-3xl md:text-5xl font-zentry text-white placeholder-zinc-800 focus:border-white outline-none transition-all uppercase"
                />
              </div>

              <div className="contact-field group relative">
                <label className="block font-mono text-xs text-zinc-500 uppercase tracking-widest mb-2 group-focus-within:text-white transition-colors">Comms Channel</label>
                <input
                  type="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  placeholder="ENTER EMAIL_"
                  className="w-full bg-transparent border-b border-white/20 py-4 text-3xl md:text-5xl font-zentry text-white placeholder-zinc-800 focus:border-white outline-none transition-all uppercase"
                />
              </div>

              <div className="contact-field group relative">
                <label className="block font-mono text-xs text-zinc-500 uppercase tracking-widest mb-2 group-focus-within:text-white transition-colors">Transmission Data</label>
                <textarea
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows="2"
                  placeholder="ENTER MESSAGE_"
                  className="w-full bg-transparent border-b border-white/20 py-4 text-3xl md:text-5xl font-zentry text-white placeholder-zinc-800 focus:border-white outline-none transition-all resize-none uppercase leading-tight"
                />
              </div>

              <div className="contact-field pt-10 flex justify-end items-center gap-6">
                {error && <p className="font-mono text-xs text-red-500 uppercase tracking-widest animate-pulse">{error}</p>}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative px-10 py-5 bg-white text-black font-general font-bold uppercase tracking-widest overflow-hidden hover:bg-zinc-200 transition-all clip-path-slant"
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
      <div className="w-full h-px bg-white/10 mt-20" />
    </div>
  );
};

export default Contact;