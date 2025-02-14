import gsap from "gsap"
import { useGSAP } from "@gsap/react"

import { ScrollTrigger } from "gsap/all"
import AnimatedTitle from "./AnimatedTitle"
gsap.registerPlugin(ScrollTrigger)
const About = () => {

    useGSAP(()=>{
        const clipAnimation = gsap.timeline({
            scrollTrigger:{
                trigger:'#clip',
                start:'center center',
                end:'+=800 center',
                scrub:0.5,
                pin:true,
                pinSpacing:true
            }
        })
        clipAnimation.to('.mask-clip-path',{
            width:'100vw',
            height:'100vh',
            borderRadius:0
        })
    })

  return (
    <div id="about" className="min-h-screen w-screen">
        <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
            <h2 className="font-general text-sm uppercase md:text-[10px]">
                Welcome to hawai
            </h2>

            <AnimatedTitle
            title="Disc<b>o</b>ver the world <br></br> of created by <b>G</b>od. Explore<b>Y</b>ou F<b>o</b>rm inside your so<b>u</b>l."
            containerClass="mt-5 !text-black text-center"
            />
            
            <div className="about-subtext">
                <p>The future will become like the nature</p>
            <p>
                Beautiful, Danger, Greenery, Happy.
            </p>
            </div>
        </div>
        <div className="h-dvh w-screen" id="clip">
            <div className="mask-clip-path about-image">
                <video
                    src="./nature.mp4"
                    autoPlay
                    muted
                    loop
                    alt="background"
                    className="absolute left-0 top-0 size-full object-cover"
                />
            </div>
        </div>
    </div>
  )
}

export default About