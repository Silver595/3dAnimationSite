import { useEffect, useRef, useState, useCallback, memo } from "react";
import { useGSAP } from '@gsap/react';
import gsap from "gsap";
import VideoPreview from "./videoPreview";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {

  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);
  const [videoError, setVideoError] = useState(false);
  
  const totalVideos = 4;
  
  const nextVideoRef = useRef(null);
  const currentVideoRef = useRef(null);
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const titleRef = useRef(null);

  const upcomingVideoIndex = (currentIndex % totalVideos) + 1;
  
  const handleVideoLoaded = useCallback(() => {
    setLoadedVideos((prev) => prev + 1);
  }, []);

  const handleVideoError = useCallback(() => {
    console.error("Video failed to load");
    setVideoError(true);
    setIsLoading(false);
  }, []);

  const handleMiniVideoPlayer = useCallback(() => {
    if (hasClicked) return;
    setHasClicked(true);
    setCurrentIndex(upcomingVideoIndex);
  }, [hasClicked, upcomingVideoIndex]);

  useEffect(() => {
    if (loadedVideos >= totalVideos - 1) {
      setIsLoading(false);
    }
  }, [loadedVideos, totalVideos]);

  useGSAP(
    () => {
      if (!isLoading) {
                const titleText = titleRef.current;
        if (titleText) {
          gsap.from(titleText, {
            opacity: 0,
            y: 30,
            duration: 1,
            ease: "power3.out",
            delay: 0.2,
          });
        }
        const line1 = textRef.current?.querySelector('.text-line-1');
        const line2 = textRef.current?.querySelector('.text-line-2');
        
        if (line1) {
          gsap.from(line1, {
            opacity: 0,
            x: -30,
            duration: 0.8,
            ease: "power2.out",
            delay: 0.6,
          });
        }
        
        if (line2) {
          gsap.from(line2, {
            opacity: 0,
            x: -30,
            duration: 0.8,
            ease: "power2.out",
            delay: 0.9,
          });
        }
        gsap.to('.particle-orbit-1', {
          motionPath: {
            path: [
              { x: 0, y: -48 },
              { x: 48, y: 0 },
              { x: 0, y: 48 },
              { x: -48, y: 0 },
              { x: 0, y: -48 }
            ],
            curviness: 1.5,
          },
          duration: 6,
          repeat: -1,
          ease: "none",
        });

        gsap.to('.particle-orbit-2', {
          motionPath: {
            path: [
              { x: 0, y: 48 },
              { x: -48, y: 0 },
              { x: 0, y: -48 },
              { x: 48, y: 0 },
              { x: 0, y: 48 }
            ],
            curviness: 1.5,
          },
          duration: 7,
          repeat: -1,
          ease: "none",
        });

        gsap.to('.particle-orbit-3', {
          motionPath: {
            path: [
              { x: -48, y: 0 },
              { x: 0, y: 48 },
              { x: 48, y: 0 },
              { x: 0, y: -48 },
              { x: -48, y: 0 }
            ],
            curviness: 1.5,
          },
          duration: 5,
          repeat: -1,
          ease: "none",
        });
        gsap.from('.deco-circle', {
          scale: 0,
          opacity: 0,
          duration: 1,
          stagger: 0.15,
          ease: "back.out(1.5)",
          delay: 1.2,
        });

        // Subtle floating
        gsap.to('.deco-circle', {
          y: -10,
          duration: 2.5,
          stagger: 0.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 1.8,
        });
      }
    },
    { scope: containerRef, dependencies: [isLoading] }
  );

  useGSAP(
    () => {
      if (hasClicked) {
        const tl = gsap.timeline({
          onComplete: () => setHasClicked(false),
        });

        tl.set("#next-video", { visibility: "visible" })
          .to("#next-video", {
            transformOrigin: "center center",
            scale: 1,
            width: "100%",
            height: "100%",
            duration: 1,
            ease: "power1.inOut",
            onStart: () => {
              if (nextVideoRef.current) {
                nextVideoRef.current.play().catch(err => 
                  console.error("Video playback failed:", err)
                );
              }
            },
          })
          .to(
            "#current-video",
            {
              transformOrigin: "center center",
              scale: 0,
              duration: 1.5,
              ease: "power1.inOut",
            },
            "<"
          );
      }
    },
    { dependencies: [currentIndex, hasClicked], revertOnUpdate: true, scope: containerRef }
  );

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        gsap.set("#video-frame", {
          clipPath: "polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)",
          borderRadius: "0 0 40% 10%",
        });

        gsap.from("#video-frame", {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          borderRadius: "0 0 0 0",
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: "#video-frame",
            start: "center center",
            end: "bottom center",
            scrub: true,
          },
        });
      });

      mm.add("(max-width: 767px)", () => {
        gsap.set("#video-frame", {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          borderRadius: "0 0 20% 10%",
        });
      });

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  const getVideosSrc = useCallback((index) => `/videos/hero-${index}.mp4`, []);

  const getBackgroundVideoIndex = () => {
    return currentIndex === totalVideos - 1 ? 1 : currentIndex;
  };

  return (
    <div ref={containerRef} className="relative h-dvh w-screen overflow-x-hidden">
      {isLoading && (
        <div 
          className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50"
          role="status"
          aria-live="polite"
          aria-label="Loading portfolio"
        >
          <div className="three-body">
            <div className="three-body__dot" />
            <div className="three-body__dot" />
            <div className="three-body__dot" />
          </div>
        </div>
      )}

      {videoError && (
        <div className="absolute z-[100] flex h-dvh w-screen items-center justify-center bg-red-50">
          <div className="text-center">
            <p className="text-lg font-semibold text-red-600">
              Failed to load videos
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 rounded-lg bg-red-600 px-6 py-2 text-white hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        <div>
          <div 
            className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg"
            role="button"
            aria-label={`Switch to video ${upcomingVideoIndex}`}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleMiniVideoPlayer();
              }
            }}
          >
            <VideoPreview>
              <div
                onClick={handleMiniVideoPlayer}
                className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
              >
                <video
                  ref={currentVideoRef}
                  src={getVideosSrc(upcomingVideoIndex)}
                  loop
                  muted
                  playsInline
                  preload="auto"
                  id="current-video"
                  className="size-64 origin-center scale-150 object-cover object-center"
                  onLoadedData={handleVideoLoaded}
                  onError={handleVideoError}
                  aria-label={`Preview of video ${upcomingVideoIndex}`}
                />
              </div>
            </VideoPreview>
          </div>

          <video
            ref={nextVideoRef}
            src={getVideosSrc(currentIndex)}
            loop
            muted
            playsInline
            preload="auto"
            id="next-video"
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
            onLoadedData={handleVideoLoaded}
            onError={handleVideoError}
            aria-hidden="true"
          />

          <video
            src={getVideosSrc(getBackgroundVideoIndex())}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute left-0 top-0 size-full object-cover object-center"
            onLoadedData={handleVideoLoaded}
            onError={handleVideoError}
            aria-label="Background portfolio video"
          />
        </div>

        <h1 
          className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75"
          aria-hidden="true"
        >
          5<b>9</b>5
        </h1>

        {/* Main Content Overlay */}
        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 
              ref={titleRef}
              className="special-font hero-heading text-blue-100"
            >
              Silver
            </h1>
            
            <div ref={textRef} className="mb-5 max-w-md font-robert-regular text-blue-100">
              <p className="text-line-1">
                Bug Bounty Hunter & Full Stack Developer
              </p>
              <p className="text-line-2 mt-2">
                Passionate about cybersecurity and history
              </p>
            </div>
          </div>
        </div>

        {/* Toned Down Decorative Objects - Bottom Left */}
        <div className="absolute bottom-10 left-10 z-40 flex items-center gap-5">
          {/* Energy Core - Reduced brightness */}
          <div className="deco-circle relative h-20 w-20">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-300/20 to-orange-500/10 blur-xl" />
            <div className="absolute inset-2 rounded-full bg-gradient-to-br from-yellow-200/60 to-yellow-400/40 shadow-lg shadow-yellow-300/30" />
            <div className="absolute inset-4 rounded-full bg-gradient-to-br from-yellow-100/80 to-white/60" />
            <div className="absolute inset-0 rounded-full border border-yellow-300/20" />
            
            {/* Orbiting particles */}
            <div className="particle-orbit-1 absolute left-1/2 top-2 h-2 w-2 -translate-x-1/2 rounded-full bg-yellow-400/70 shadow-md shadow-yellow-300/40" />
            <div className="particle-orbit-2 absolute bottom-2 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-orange-400/70 shadow-md shadow-orange-300/40" />
            <div className="particle-orbit-3 absolute left-2 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-yellow-300/70 shadow-md shadow-yellow-300/40" />
          </div>
          
          {/* Plasma Orb - Softer */}
          <div className="deco-circle relative h-18 w-18">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/25 via-blue-500/20 to-purple-600/15 blur-md" />
            <div className="absolute inset-2 rounded-full bg-gradient-to-br from-cyan-300/40 via-blue-400/30 to-purple-500/25 shadow-lg shadow-cyan-400/20" />
            <div className="absolute left-3 top-3 h-4 w-4 rounded-full bg-white/40 blur-sm" />
          </div>
          
          {/* Neon Ring - Subtle */}
          <div className="deco-circle relative h-16 w-16">
            <div className="absolute inset-0 rounded-full bg-pink-500/15 blur-lg" />
            <div className="absolute inset-2 rounded-full border-3 border-pink-400/50 shadow-lg shadow-pink-400/30" />
            <div className="absolute inset-4 rounded-full border border-pink-300/30" />
            <div className="absolute inset-5 rounded-full bg-pink-300/10" />
          </div>
          
          {/* Electric Arc - Dimmed */}
          <div className="deco-circle relative h-14 w-14">
            <svg viewBox="0 0 100 100" className="h-full w-full">
              <path d="M 20,50 Q 35,25 50,50 T 80,50"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    className="text-cyan-400/60"
                    style={{ filter: 'drop-shadow(0 0 6px rgba(34,211,238,0.4))' }} />
              <circle cx="20" cy="50" r="3" fill="currentColor" className="text-cyan-300/70" />
              <circle cx="80" cy="50" r="3" fill="currentColor" className="text-cyan-300/70" />
            </svg>
          </div>
          
          {/* Quantum Network - Simplified */}
          <div className="deco-circle relative h-18 w-18">
            <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-300/70 shadow-md shadow-yellow-300/40" />
            <div className="absolute left-1/4 top-1/4 h-2 w-2 rounded-full bg-blue-400/60 shadow-sm shadow-blue-400/30" />
            <div className="absolute right-1/4 top-1/4 h-2 w-2 rounded-full bg-pink-400/60 shadow-sm shadow-pink-400/30" />
            <div className="absolute left-1/4 bottom-1/4 h-2 w-2 rounded-full bg-green-400/60 shadow-sm shadow-green-400/30" />
            <div className="absolute right-1/4 bottom-1/4 h-2 w-2 rounded-full bg-purple-400/60 shadow-sm shadow-purple-400/30" />
            
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100">
              <line x1="25" y1="25" x2="50" y2="50" stroke="currentColor" strokeWidth="0.5" className="text-white/20" />
              <line x1="75" y1="25" x2="50" y2="50" stroke="currentColor" strokeWidth="0.5" className="text-white/20" />
              <line x1="25" y1="75" x2="50" y2="50" stroke="currentColor" strokeWidth="0.5" className="text-white/20" />
              <line x1="75" y1="75" x2="50" y2="50" stroke="currentColor" strokeWidth="0.5" className="text-white/20" />
            </svg>
            
            <div className="absolute inset-0 rounded-full border border-yellow-300/15" />
          </div>
        </div>
      </div>

      <h1 
        className="special-font hero-heading absolute bottom-5 right-5 text-black"
        aria-hidden="true"
      >
        5<b>9</b>5
      </h1>
    </div>
  );
};

export default memo(Hero);
