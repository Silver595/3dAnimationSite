import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";
import { FiMail, FiGithub, FiTwitter, FiLinkedin } from "react-icons/fi";

const Contact = () => {
  return (
    <div id="contact" className="my-20 min-h-96 w-screen px-4 md:px-10">
      <div className="relative rounded-[3rem] bg-[#121212] border border-white/5 py-24 text-blue-50 overflow-hidden shadow-2xl shadow-violet-900/10">

        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-violet-600/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center">
          <p className="mb-10 font-general text-[10px] uppercase tracking-widest text-zinc-500">
            Get in Touch
          </p>

          <AnimatedTitle
            title="Let's b<b>u</b>ild <br /> s<b>o</b>mething <br /> sec<b>u</b>re t<b>o</b>gether."
            className="special-font !md:text-[6.2rem] w-full font-zentry !text-5xl !font-black !leading-[.9]"
          />

          <a
            href="mailto:hello@silver.dev"
            className="mt-12 px-10 py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-violet-200 transition-colors shadow-lg shadow-white/10"
          >
            hello@silver.dev
          </a>

          <div className="mt-12 flex gap-6">
            <a href="#" className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white">
              <FiGithub size={24} />
            </a>
            <a href="#" className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white">
              <FiTwitter size={24} />
            </a>
            <a href="#" className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white">
              <FiLinkedin size={24} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;