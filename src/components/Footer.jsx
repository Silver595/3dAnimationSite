import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { FiGithub, FiTwitter, FiLinkedin, FiArrowUp } from "react-icons/fi";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { name: "Github", icon: <FiGithub />, href: "https://github.com/silver595" },
    // { name: "Twitter", icon: <FiTwitter />, href: "https://twitter.com/akash" },
    { name: "LinkedIn", icon: <FiLinkedin />, href: "https://www.linkedin.com/in/akash-purjalkar/" }
  ];

  return (
    <footer className="w-full bg-black text-white border-t border-white/10">

      <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10">

        <div className="p-8 md:p-12 flex flex-col justify-between h-auto md:h-64 group hover:bg-white/5 transition-colors">
          <div>
            <h2 className="font-zentry text-4xl font-black tracking-tighter uppercase mb-2">Akash</h2>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">System Online</span>
            </div>
          </div>
          <p className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest mt-10 md:mt-0">
             // Est. 2026 <br /> Secure Infrastructure
          </p>
        </div>


        <div className="p-8 md:p-12 flex flex-col justify-between group hover:bg-white/5 transition-colors">
          <h3 className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-8">Suggestion</h3>
          <div className="flex flex-col gap-4">
            <div className="font-general text-2xl hover:translate-x-2 transition-transform duration-300 inline-block">
              This section is under construction. tell me if you have any suggestions
            </div>
          </div>
        </div>


        <div className="p-8 md:p-12 flex flex-col justify-between group hover:bg-white/5 transition-colors">
          <h3 className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-8">Connect</h3>
          <div className="flex flex-col gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                className="flex items-center gap-3 text-zinc-400 hover:text-white transition-colors group/link"
              >
                <span className="text-xl group-hover/link:scale-110 transition-transform">{link.icon}</span>
                <span className="font-general text-lg">{link.name}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Col 4: Back to Top */}
        <button
          onClick={scrollToTop}
          className="relative p-8 md:p-12 flex md:items-center md:justify-center group overflow-hidden text-left md:text-center hover:bg-white hover:text-black transition-colors duration-500"
        >
          <div className="flex md:flex-col items-center gap-4 relative z-10">
            <FiArrowUp className="text-4xl group-hover:-translate-y-2 transition-transform duration-300" />
            <span className="font-mono text-xs tracking-[0.2em] uppercase">Return to Top</span>
          </div>
        </button>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 px-8 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest">© {new Date().getFullYear()} Akash Portfolio. All Rights Reserved.</span>
        <div className="flex gap-6">
          <a href="#" className="font-mono text-[10px] text-zinc-600 hover:text-white uppercase tracking-widest transition-colors">Privacy Policy</a>
          <a href="#" className="font-mono text-[10px] text-zinc-600 hover:text-white uppercase tracking-widest transition-colors">Terms of Use</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;