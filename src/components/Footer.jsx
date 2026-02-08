import { FiGithub, FiTwitter, FiLinkedin } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="w-screen bg-[#121212] py-8 border-t border-white/5 relative z-10">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <div className="text-center md:text-left pl-4">
          <span className="font-zentry text-lg font-black text-white">
            Silver
          </span>
          <p className="text-zinc-600 text-[10px] mt-1 uppercase tracking-widest">
            © 2024 All rights reserved
          </p>
        </div>

        <div className="flex justify-center gap-8 md:justify-start">
          <a href="#" className="text-xs text-zinc-600 hover:text-zinc-300 transition-colors uppercase tracking-widest">Privacy</a>
          <a href="#" className="text-xs text-zinc-600 hover:text-zinc-300 transition-colors uppercase tracking-widest">Legal</a>
        </div>

        <div className="flex justify-center gap-6 md:justify-start pr-4">
          <a href="#" className="text-zinc-500 hover:text-white transition-colors"><FiGithub /></a>
          <a href="#" className="text-zinc-500 hover:text-white transition-colors"><FiTwitter /></a>
          <a href="#" className="text-zinc-500 hover:text-white transition-colors"><FiLinkedin /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;