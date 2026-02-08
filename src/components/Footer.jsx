import { FiGithub, FiTwitter, FiLinkedin } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="w-screen bg-[#121212] py-8 border-t border-white/5 relative z-10">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <div className="text-center md:text-left">
          <span className="font-zentry text-lg font-black text-white">
            S<span className="text-violet-500">.</span>
          </span>
          <p className="text-zinc-500 text-xs mt-1">
            © 2024 Silver. All rights reserved
          </p>
        </div>

        <div className="flex justify-center gap-6 md:justify-start">
          <a href="#" className="text-zinc-500 hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="text-zinc-500 hover:text-white transition-colors">Terms of Service</a>
        </div>

        <div className="flex justify-center gap-4 md:justify-start">
          <a href="#" className="text-zinc-500 hover:text-white transition-colors"><FiGithub /></a>
          <a href="#" className="text-zinc-500 hover:text-white transition-colors"><FiTwitter /></a>
          <a href="#" className="text-zinc-500 hover:text-white transition-colors"><FiLinkedin /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;