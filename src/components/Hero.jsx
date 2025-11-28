import { useEffect, useRef, useState, useCallback, memo } from "react";
import { useGSAP } from '@gsap/react';
import gsap from "gsap";
import VideoPreview from "./videoPreview";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  // State management
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);
  const [videoError, setVideoError] = useState(false);
  
  const totalVideos = 4;
  
  // Refs
  const nextVideoRef = useRef(null);
  const currentVideoRef = useRef(null);
  const containerRef = useRef(null);

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

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100">
              Sil<b>ve</b>r
            </h1>
            <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
              Bug Bounty Hunter & Full Stack Developer
              <br />
              Passionate about cybersecurity and history
            </p>
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
