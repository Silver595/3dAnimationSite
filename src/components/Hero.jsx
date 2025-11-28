import { useEffect, useRef, useState, useCallback, memo } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
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
  const [isPaused, setIsPaused] = useState(false);
  
  const totalVideos = 4;
  const nextVideoRef = useRef(null);
  const currentVideoRef = useRef(null);
  const miniVideoRef = useRef(null);
  const videoFrameRef = useRef(null);
  const timelineRef = useRef(null);

  // Memoized video source function
  const getVideosSrc = useCallback((index) => `/videos/hero-${index}.mp4`, []);

  // Calculate upcoming video index
  const upcomingVideoIndex = (currentIndex % totalVideos) + 1;

  // Handle video loading with error handling
  const handleVideoLoaded = useCallback(() => {
    setLoadedVideos((prev) => prev + 1);
  }, []);

  // Handle video errors
  const handleVideoError = useCallback((e) => {
    console.error("Video loading error:", e);
    setVideoError(true);
    setIsLoading(false);
  }, []);

  // Toggle play/pause functionality
  const togglePlayPause = useCallback(() => {
    if (currentVideoRef.current) {
      if (isPaused) {
        currentVideoRef.current.play();
      } else {
        currentVideoRef.current.pause();
      }
      setIsPaused(!isPaused);
    }
  }, [isPaused]);

  // Handle mini video player click with smooth transition
  const handleMiniVideoPlayer = useCallback(() => {
    if (hasClicked) return; // Prevent multiple clicks during animation
    
    setHasClicked(true);
    setCurrentIndex(upcomingVideoIndex);
  }, [hasClicked, upcomingVideoIndex]);

  // Check if all videos are loaded
  useEffect(() => {
    if (loadedVideos === totalVideos - 1) {
      setIsLoading(false);
    }
  }, [loadedVideos]);

  // Main video transition animation with cleanup
  useGSAP(() => {
    if (hasClicked) {
      // Kill existing timeline if any
      if (timelineRef.current) {
        timelineRef.current.kill();
      }

      // Create new timeline for smooth sequencing
      const tl = gsap.timeline({
        onStart: () => {
          if (nextVideoRef.current) {
            nextVideoRef.current.play().catch(err => console.error("Play error:", err));
          }
        },
        onComplete: () => {
          setHasClicked(false);
        }
      });

      // Animate next video expanding
      tl.set("#next-video", { visibility: 'visible' })
        .to('#next-video', {
          transformOrigin: 'center center',
          scale: 1,
          width: '100%',
          height: '100%',
          duration: 1,
          ease: 'power1.inOut',
        })
        .from('#current-video', {
          transformOrigin: 'center center',
          scale: 0,
          duration: 1.5,
          ease: 'power1.inOut'
        }, "<");

      timelineRef.current = tl;
    }
  }, { dependencies: [currentIndex], revertOnUpdate: true });

  // Scroll-triggered clip-path animation with proper cleanup
  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.set('#video-frame', {
        clipPath: 'polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)',
        borderRadius: '0 0 40% 10%'
      });

      gsap.from('#video-frame', {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        borderRadius: '0 0 0 0',
        ease: 'power1.inOut',
        scrollTrigger: {
          trigger: '#video-frame',
          start: 'center center',
          end: 'bottom center',
          scrub: 1.5,
          // markers: true, // Uncomment for debugging
        }
      });
    }, videoFrameRef);

    return () => ctx.revert(); // Cleanup ScrollTrigger
  }, []);

  // Preload next video
  useEffect(() => {
    const nextIndex = (currentIndex % totalVideos) + 1;
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "video";
    link.href = getVideosSrc(nextIndex);
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, [currentIndex, getVideosSrc]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      {/* Enhanced Loading Screen */}
      {isLoading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
          <div className="flex flex-col items-center gap-4">
            <div className="three-body">
              <div className="three-body__dot" />
              <div className="three-body__dot" />
              <div className="three-body__dot" />
            </div>
            <p className="text-sm text-violet-500 font-robert-regular">
              Loading Experience... {Math.round((loadedVideos / (totalVideos - 1)) * 100)}%
            </p>
          </div>
        </div>
      )}

      {/* Error Fallback */}
      {videoError && (
        <div className="absolute z-[100] h-dvh w-screen flex-center bg-violet-50">
          <div className="text-center">
            <p className="text-xl font-robert-medium text-red-600 mb-4">
              Unable to load video content
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-yellow-300 rounded-full font-robert-medium hover:bg-yellow-400 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      <div
        ref={videoFrameRef}
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
        role="region"
        aria-label="Hero video showcase"
      >
        {/* Mini Video Preview Player */}
        <div>
          <div 
            className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg"
            role="button"
            aria-label="Play next video"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleMiniVideoPlayer()}
          >
            <VideoPreview>
              <div
                onClick={handleMiniVideoPlayer}
                className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
              >
                <video
                  ref={miniVideoRef}
                  src={getVideosSrc(upcomingVideoIndex)}
                  loop
                  muted
                  playsInline
                  id="current-video"
                  className="size-64 origin-center scale-150 object-cover object-center"
                  onLoadedData={handleVideoLoaded}
                  onError={handleVideoError}
                  preload="metadata"
                  aria-hidden="true"
                />
              </div>
            </VideoPreview>
          </div>

          {/* Next Video (Expanding Animation) */}
          <video
            ref={nextVideoRef}
            src={getVideosSrc(currentIndex)}
            loop
            muted
            playsInline
            id="next-video"
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
            onLoadedData={handleVideoLoaded}
            onError={handleVideoError}
            preload="auto"
            aria-hidden="true"
          />

          {/* Main Background Video */}
          <video
            ref={currentVideoRef}
            src={getVideosSrc(currentIndex === totalVideos - 1 ? 1 : currentIndex)}
            autoPlay
            loop
            muted
            playsInline
            className="absolute left-0 top-0 size-full object-cover object-center"
            onLoadedData={handleVideoLoaded}
            onError={handleVideoError}
            preload="auto"
            aria-label="Background showcase video"
          />
        </div>

        {/* Animated Text Overlay - Bottom Right */}
        <h1 
          className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75 drop-shadow-lg"
          aria-label="Project number 595"
        >
          5<b>9</b>5
        </h1>

        {/* Hero Content - Top Left */}
        <div className="absolute left-0 top-0 z-40 size-full pointer-events-none">
          <div className="mt-20 px-5 sm:px-10 pointer-events-auto">
            <h1 className="special-font hero-heading text-blue-100 drop-shadow-2xl">
              Sil<b>ve</b>r
            </h1>
            <p className="mb-5 max-w-64 font-robert-regular text-blue-100 drop-shadow-lg leading-relaxed">
              Bug Bounty Hunter & Full Stack Developer.
              <br />
              Passionate about cybersecurity and history.
            </p>
            <div className="flex gap-3 items-center">
              <Button
                id="watch-trailer"
                title="Watch Trailer"
                leftIcon={<TiLocationArrow />}
                containerClass="!bg-yellow-300 flex-center gap-1 hover:!bg-yellow-400 transition-all"
              />
              <button
                onClick={togglePlayPause}
                className="px-4 py-2 bg-blue-100/20 backdrop-blur-sm rounded-lg font-robert-medium text-blue-100 hover:bg-blue-100/30 transition-all"
                aria-label={isPaused ? "Resume video" : "Pause video"}
              >
                {isPaused ? "Resume" : "Pause"}
              </button>
            </div>

            {/* Video Counter */}
            <div className="mt-4 flex gap-2 items-center">
              {Array.from({ length: totalVideos }).map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    idx === currentIndex - 1 
                      ? 'w-8 bg-yellow-300' 
                      : 'w-4 bg-blue-100/30'
                  }`}
                  aria-label={`Video ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Static Text - Bottom Right (Outside Frame) */}
      <h1 
        className="special-font hero-heading absolute bottom-5 right-5 text-black"
        aria-hidden="true"
      >
        5<b>9</b>5
      </h1>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 animate-bounce">
        <div className="w-6 h-10 border-2 border-blue-100/50 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-blue-100/50 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default memo(Hero);
  