
import AnimatedTitle from "./AnimatedTitle";
import { FiMail, FiGithub, FiTwitter, FiLinkedin } from "react-icons/fi";

const Contact = () => {
  return (
    <div id="contact" className="my-20 min-h-96 w-screen px-4 md:px-10">
      <div className="relative rounded-xl bg-[#1c1c1f] border border-white/5 py-24 text-white overflow-hidden">

        {/* Subtle Luxury Gradient Background */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-50%] left-[20%] w-[60%] h-[60%] bg-white/5 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center">
          <p className="mb-10 font-general text-[12px] uppercase tracking-[0.2em] text-zinc-500">
            Get in Touch
          </p>

          <AnimatedTitle
            title="Let's b<b>u</b>ild <br /> s<b>o</b>mething <br /> sec<b>u</b>re."
            className="special-font !md:text-[6rem] w-full font-zentry !text-5xl !font-black !leading-[.9] text-white"
          />

          <a
            href="mailto:hello@silver.dev"
            className="mt-16 px-12 py-4 bg-white text-black rounded-lg font-medium text-lg hover:bg-zinc-200 transition-colors tracking-wide"
          >
            hello@silver.dev
          </a>

          <div className="mt-16 flex gap-8">
            <a href="#" className="text-zinc-500 hover:text-white transition-colors">
              <FiGithub size={20} />
            </a>
            <a href="#" className="text-zinc-500 hover:text-white transition-colors">
              <FiTwitter size={20} />
            </a>
            <a href="#" className="text-zinc-500 hover:text-white transition-colors">
              <FiLinkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;