import { FiGithub, FiTwitter, FiLinkedin } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="w-screen bg-[#0a0a0a] py-8 border-t border-white/5 relative z-10">
      <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-4 md:flex-row">
        <div className="text-center md:text-left pl-4">
          <span className="font-zentry text-lg font-black text-white uppercase tracking-widest">
            Silver
          </span>
          <p className="text-zinc-700 text-[9px] mt-2 uppercase tracking-[0.2em] font-mono">
              // © 2024 Secure Infrastructure
          </p>
        </div>

        <div className="flex justify-center gap-8 md:justify-start">
          <a href="#" className="text-[10px] text-zinc-700 hover:text-zinc-400 transition-colors uppercase tracking-[0.2em] font-mono">Privacy_Policy</a>
          <a href="#" className="text-[10px] text-zinc-700 hover:text-zinc-400 transition-colors uppercase tracking-[0.2em] font-mono">Legal_Notice</a>
        </div>

        <div className="flex justify-center gap-6 md:justify-start pr-4 opacity-50">
          <a href="#" className="text-zinc-500 hover:text-white transition-colors"><FiGithub /></a>
          <a href="#" className="text-zinc-500 hover:text-white transition-colors"><FiTwitter /></a>
          <a href="#" className="text-zinc-500 hover:text-white transition-colors"><FiLinkedin /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;