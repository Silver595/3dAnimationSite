import { FiGithub, FiTwitter, FiLinkedin, FiArrowUp } from "react-icons/fi";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const socialLinks = [
    {
      name: "Github",
      icon: <FiGithub />,
      href: "https://github.com/silver595",
    },
    {
      name: "Twitter",
      icon: <FiTwitter />,
      href: "https://x.com/silver227j",
    },
    {
      name: "LinkedIn",
      icon: <FiLinkedin />,
      href: "https://www.linkedin.com/in/akash-purjalkar/",
    },
  ];

  return (
    <footer className="relative w-full overflow-hidden bg-black text-white border-t border-white/10 ">
      <div className="relative w-full bg-[#0a0a0a]">


        <div
          className="
            group
            relative
            flex
            min-h-[110px]
            items-center
            border-b
            border-none
            px-8
            md:px-16
          "
        >
          {/* Left micro marker */}

          <div className="absolute left-0 top-0 h-3 w-3 border-l border-t border-white/20 transition-all duration-500 group-hover:h-5 group-hover:w-5" />

          <div className="flex items-center gap-5">
            <span className="h-px w-8 bg-zinc-700 transition-all duration-500 group-hover:w-14 group-hover:bg-white" />

            <span
              className="
                font-mono
                text-xs
                uppercase
                tracking-[0.3em]
                text-zinc-500
                transition-colors
                duration-300
                group-hover:text-white
              "
            >
              Contact
            </span>
          </div>


          <span
            className="
              absolute
              right-8
              font-mono
              text-[9px]
              uppercase
              tracking-[0.25em]
              text-zinc-700
              md:right-16
            "
          >
            AVAILABLE
          </span>
        </div>        <div
          className="
            group
            relative
            flex
            min-h-[110px]
            items-center
            border-b
            border-none
            px-8
            md:px-16
          "
        >
          <div className="flex w-full flex-col gap-7 md:flex-row md:items-center">
            {/* Label */}

            <div className="flex min-w-[150px] items-center gap-5">
              <span className="h-px w-8 bg-zinc-700 transition-all duration-500 group-hover:w-14 group-hover:bg-white" />

              <span
                className="
                  font-mono
                  text-xs
                  uppercase
                  tracking-[0.3em]
                  text-zinc-500
                  transition-colors
                  duration-300
                  group-hover:text-white
                "
              >
                Connect
              </span>
            </div>

            {/* Social links */}

            <div className="flex flex-wrap items-center gap-x-10 gap-y-5">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    group/link
                    relative
                    flex
                    items-center
                    gap-3
                    text-zinc-400
                    transition-colors
                    duration-300
                    hover:text-white
                  "
                >
                  <span
                    className="
                      text-lg
                      transition-transform
                      duration-300
                      group-hover/link:-translate-y-1
                    "
                  >
                    {link.icon}
                  </span>

                  <span className="font-general text-sm">{link.name}</span>

                  <span
                    className="
                      font-mono
                      text-[9px]
                      text-zinc-700
                      transition-all
                      duration-300
                      group-hover/link:translate-x-1
                      group-hover/link:text-zinc-300
                    "
                  >
                    ↗
                  </span>

                  {/* Hover underline */}

                  <span
                    className="
                      absolute
                      -bottom-2
                      left-0
                      h-px
                      w-0
                      bg-white
                      transition-all
                      duration-300
                      group-hover/link:w-full
                    "
                  />
                </a>
              ))}
            </div>
          </div>
        </div>


        <div className="relative h-[300px] md:h-[390px]">
          {/* Horizontal measurement line */}

          <div
            className="
              absolute
              left-8
              right-8
              top-1/2
              hidden
              border-t
              border-dashed
              border-white/5
              md:block
            "
          />


          {/* <div className="absolute left-8 top-1/2 hidden -translate-y-1/2 md:block">
            <div className="h-2 w-2 border border-white/20" />

            <span className="absolute left-5 top-[-7px] whitespace-nowrap font-mono text-[8px] tracking-[0.2em] text-zinc-700">
              00 / 01
            </span>
          </div>*/}
{/*

          <div className="absolute bottom-8 left-8 md:bottom-12 md:left-16">
            <div className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />

              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-zinc-600">
                Available for opportunities
              </span>
            </div>

            <p className="mt-3 font-mono text-[8px] uppercase tracking-[0.25em] text-zinc-700">
              Est. 2025 / Pune, India
            </p>
          </div>*/}


          <button
            onClick={scrollToTop}
            aria-label="Return to top"
            className="
              group/top
              absolute
              bottom-0
              right-0
              flex
              h-[135px]
              w-[280px]
              flex-col
              items-center
              justify-center
              overflow-hidden
              bg-black
              text-zinc-400
              transition-all
              duration-500
              [clip-path:polygon(30%_0,100%_0,100%_100%,0_100%)]
              hover:bg-white
              hover:text-black
              md:h-[155px]
              md:w-[340px]
            "
          >

            <span
              className="
                pointer-events-none
                absolute
                left-0
                top-0
                h-px
                w-[42%]
                origin-left
                -rotate-[29deg]
                bg-white/10
                transition-colors
                duration-500
                group-hover/top:bg-black/20
              "
            />

            <span
              className="
                absolute
                right-6
                top-5
                font-mono
                text-[8px]
                tracking-[0.25em]
                text-zinc-600
                transition-colors
                duration-500
                group-hover/top:text-zinc-500
              "
            >

            </span>



            <FiArrowUp
              className="
                mb-4
                text-4xl
                transition-all
                duration-500
                group-hover/top:-translate-y-2
                group-hover/top:scale-110
              "
            />



            <span
              className="
                text-[9px]
                uppercase
                tracking-[0.35em]
                transition-all
                duration-500
                group-hover/top:tracking-[0.45em]
              "
            >
              Return to Top
            </span>


            <span
              className="
                absolute
                bottom-5
                h-px
                w-8
                bg-zinc-700
                transition-all
                duration-500
                group-hover/top:w-16
                group-hover/top:bg-black
              "
            />
          </button>
        </div>



        <div
          className="
            flex
            min-h-[60px]
            w-full
            items-center
            justify-between
            border-t
            border-white/10
            px-8
            md:px-16
          "
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-600">
            © {new Date().getFullYear()} Akash Purjalkar. All Rights Reserved.
          </span>

          <div className="flex gap-8">
            <a
              href="#"
              className="
                font-mono
                text-[9px]
                uppercase
                tracking-[0.2em]
                text-zinc-600
                transition-colors
                hover:text-white
              "
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="
                font-mono
                text-[9px]
                uppercase
                tracking-[0.2em]
                text-zinc-600
                transition-colors
                hover:text-white
              "
            >
              Terms of Use
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
