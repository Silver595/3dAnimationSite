
import AnimatedTitle from "./AnimatedTitle";
import { useState, useRef } from "react";
import { FiSend } from "react-icons/fi";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Contact = () => {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const formRef = useRef(null);

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSent(true);
    setFormState({ name: "", email: "", message: "" });
    setTimeout(() => setIsSent(false), 3000);
  };

  useGSAP(() => {
    gsap.fromTo(formRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out", scrollTrigger: { trigger: "#contact", start: "top center" } }
    );
  }, []);

  return (
    <div id="contact" className="relative min-h-screen w-screen flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0a] py-20">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a] to-black pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/img/grid.svg')] bg-center bg-cover opacity-10 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 md:px-10 max-w-2xl text-center">

        <p className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-500 mb-8">
                    // Initiate Communication
        </p>

        <AnimatedTitle
          title="Let's build <br /> the <b>f</b>uture."
          containerClass="special-font !text-5xl md:!text-7xl !font-black text-white mb-12"
        />

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-12 text-left">
          <div className="group relative">
            <input
              type="text"
              name="name"
              value={formState.name}
              onChange={handleChange}
              required
              className="w-full bg-transparent border-b border-white/20 py-4 text-white font-general text-lg focus:border-white outline-none transition-all placeholder-transparent peer"
              placeholder="Name"
              id="name"
            />
            <label
              htmlFor="name"
              className="absolute left-0 top-4 text-zinc-500 font-mono text-sm uppercase tracking-widest transition-all duration-300 peer-focus:-top-6 peer-focus:text-xs peer-focus:text-white peer-valid:-top-6 peer-valid:text-xs peer-valid:text-zinc-400 cursor-text"
            >
              Name
            </label>
          </div>

          <div className="group relative">
            <input
              type="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              required
              className="w-full bg-transparent border-b border-white/20 py-4 text-white font-general text-lg focus:border-white outline-none transition-all placeholder-transparent peer"
              placeholder="Email"
              id="email"
            />
            <label
              htmlFor="email"
              className="absolute left-0 top-4 text-zinc-500 font-mono text-sm uppercase tracking-widest transition-all duration-300 peer-focus:-top-6 peer-focus:text-xs peer-focus:text-white peer-valid:-top-6 peer-valid:text-xs peer-valid:text-zinc-400 cursor-text"
            >
              Email Address
            </label>
          </div>

          <div className="group relative">
            <textarea
              name="message"
              value={formState.message}
              onChange={handleChange}
              required
              rows="1"
              className="w-full bg-transparent border-b border-white/20 py-4 text-white font-general text-lg focus:border-white outline-none transition-all placeholder-transparent peer resize-none"
              placeholder="Message"
              id="message"
              onInput={(e) => {
                e.target.style.height = 'auto';
                e.target.style.height = e.target.scrollHeight + 'px';
              }}
            />
            <label
              htmlFor="message"
              className="absolute left-0 top-4 text-zinc-500 font-mono text-sm uppercase tracking-widest transition-all duration-300 peer-focus:-top-6 peer-focus:text-xs peer-focus:text-white peer-valid:-top-6 peer-valid:text-xs peer-valid:text-zinc-400 cursor-text"
            >
              Enter Message...
            </label>
          </div>

          <div className="flex justify-center mt-12">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`relative px-12 py-4 font-mono text-xs uppercase tracking-widest font-bold transition-all duration-300 border border-white/20 rounded-full overflow-hidden group
                                ${isSent ? "bg-white text-black border-white" : "hover:bg-white hover:text-black hover:border-white text-white"}`}
            >
              <span className="relative z-10 flex items-center gap-4">
                {isSubmitting ? "Sending..." : isSent ? "Transmitted" : "Send Transmission"}
                {!isSubmitting && !isSent && <FiSend className="text-lg group-hover:translate-x-1 transition-transform" />}
              </span>
            </button>
          </div>
        </form>

        <div className="mt-20 border-t border-white/10 pt-10 flex justify-center gap-10">
          <a href="mailto:hello@silver.dev" className="text-zinc-500 hover:text-white font-mono text-xs uppercase tracking-widest transition-colors">
            hello@silver.dev
          </a>
          <a href="https://github.com" className="text-zinc-500 hover:text-white font-mono text-xs uppercase tracking-widest transition-colors">
            GitHub
          </a>
          <a href="https://twitter.com" className="text-zinc-500 hover:text-white font-mono text-xs uppercase tracking-widest transition-colors">
            X (Twitter)
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;