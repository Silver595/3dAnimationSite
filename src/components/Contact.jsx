
import AnimatedTitle from "./AnimatedTitle";
import { FiGithub, FiTwitter, FiLinkedin, FiMail } from "react-icons/fi";

const Contact = () => {
  return (
    <div id="contact" className="my-20 min-h-96 w-screen px-4 md:px-10">
      <div className="relative rounded-sm bg-[#0f0f0f] border border-white/5 py-24 text-white overflow-hidden">

        {/* Subtle Grid Background */}
        <div className="absolute inset-0 bg-[url('/img/grid.svg')] opacity-5 bg-center" />

        <div className="relative z-10 flex flex-col items-center text-center">
          <p className="mb-10 font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-600">
            {">"} Initiate Communication
          </p>

          <AnimatedTitle
            title="Let's b<b>u</b>ild <br /> s<b>o</b>mething <br /> sec<b>u</b>re."
            className="special-font !md:text-[6rem] w-full font-zentry !text-5xl !font-black !leading-[.9] text-white opacity-90"
          />

          <a
            href="mailto:hello@silver.dev"
            className="mt-16 px-12 py-4 bg-white text-black rounded-sm font-mono text-xs hover:bg-zinc-200 transition-colors tracking-widest uppercase border border-white"
          >
            hello@silver.dev
          </a>

          <div className="mt-16 flex gap-12">
            <a href="#" className="text-zinc-600 hover:text-white transition-colors group">
              <FiGithub size={24} />
              <span className="sr-only">GitHub</span>
            </a>
            <a href="#" className="text-zinc-600 hover:text-white transition-colors group">
              <FiTwitter size={24} />
              <span className="sr-only">Twitter</span>
            </a>
            <a href="#" className="text-zinc-600 hover:text-white transition-colors group">
              <FiLinkedin size={24} />
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;