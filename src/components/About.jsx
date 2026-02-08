import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/all"
import AnimatedTitle from "./AnimatedTitle"

gsap.registerPlugin(ScrollTrigger)

const About = () => {
    useGSAP(() => {
        const clipAnimation = gsap.timeline({
            scrollTrigger: {
                trigger: '#clip',
                start: 'center center',
                end: '+=800 center',
                scrub: 0.5,
                pin: true,
                pinSpacing: true
            }
        })
        clipAnimation.to('.mask-clip-path', {
            width: '100vw',
            height: '100vh',
            borderRadius: 0
        })
    })

    return (
        <div id="about" className="min-h-screen w-screen relative z-20">
            <div className="relative mb-8 mt-36 flex flex-col items-center gap-5 px-6 text-center">
                <p className="font-general text-sm uppercase text-zinc-500 tracking-[0.2em]">
                    About Me
                </p>

                <AnimatedTitle
                    title="Se<b>c</b>uring the <br /> digital f<b>u</b>ture"
                    containerClass="mt-5 !text-white"
                />

                <div className="about-subtext mt-10">
                    <p className="text-xl md:text-2xl text-zinc-300 font-medium">
                        Building robust systems with a hacker's mindset.
                    </p>
                    <p className="text-zinc-500 mt-4 leading-relaxed max-w-lg mx-auto">
                        I specialize in identifying vulnerabilities and architecting secure solutions,
                        blending offensive security knowledge with modern full-stack development.
                    </p>
                </div>
            </div>

            <div className="h-dvh w-screen" id="clip">
                <div className="mask-clip-path about-image bg-[#1a1a1a]">
                    {/* Using a gradient or abstract video instead of 'nature' if preferred, but keeping nature for now as placeholder */}
                    <video
                        src="./nature.mp4"
                        autoPlay
                        muted
                        loop
                        className="absolute left-0 top-0 size-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-violet-900/20 mix-blend-overlay" />
                </div>
            </div>
        </div>
    )
}

export default About