import IntroSection from "@/components/sections/home/IntroSection";
import LoginSection from "@/components/sections/home/LoginSection";
import QuizSection from "@/components/sections/home/QuizSection";
import ResultSection from "@/components/sections/home/ResultSection";
import { useStorage } from "@/contexts/StorageContext";
import { memo, useEffect, useMemo, useState, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { IconVolumeOff, IconVolumeOn } from "@/components/common/Icons";
import Image from "next/image";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";

function Mobile({ ...props }) {
  const { quizStep } = useStorage();
  const [isMuted, setIsMuted] = useState(true); // Start muted to allow autoplay
  const backgroundMusicRef = useRef<HTMLAudioElement | null>(null);
  const hasStartedRef = useRef(false);

  // Initialize background music
  useEffect(() => {
    backgroundMusicRef.current = new Audio("/sounds/background.mp3");
    backgroundMusicRef.current.loop = true;
    backgroundMusicRef.current.volume = 0.5; // Set volume to 50%
    backgroundMusicRef.current.muted = true; // Start muted to bypass autoplay restrictions

    // Fallback: Start audio on first user interaction
    const startAudioOnInteraction = () => {
      if (backgroundMusicRef.current && !hasStartedRef.current) {
        const playPromise = backgroundMusicRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              if (backgroundMusicRef.current) {
                backgroundMusicRef.current.muted = false;
                setIsMuted(false);
                hasStartedRef.current = true;
                // Remove listeners after first interaction
                document.removeEventListener("click", startAudioOnInteraction);
                document.removeEventListener("touchstart", startAudioOnInteraction);
              }
            })
            .catch(() => {
              // Ignore errors
            });
        }
      }
    };

    // Add event listeners for user interaction
    document.addEventListener("click", startAudioOnInteraction, { once: true });
    document.addEventListener("touchstart", startAudioOnInteraction, { once: true });

    return () => {
      backgroundMusicRef.current?.pause();
      backgroundMusicRef.current = null;
      document.removeEventListener("click", startAudioOnInteraction);
      document.removeEventListener("touchstart", startAudioOnInteraction);
    };
  }, []);

  // Handle mute/unmute
  useEffect(() => {
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const toggleMute = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);

    // If unmuting, ensure audio is playing
    if (!newMutedState && backgroundMusicRef.current) {
      if (backgroundMusicRef.current.paused) {
        const playPromise = backgroundMusicRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Ignore errors
          });
        }
      }
    }
  };

  const content = useMemo(() => {
    switch (quizStep) {
      // case 1:
      //   return <IntroSection />;
      case 1:
        return <LoginSection />;
      case 2:
        return <QuizSection />;
      case 3:
        return <ResultSection />;
      default:
        return <LoginSection />;
    }
  }, [quizStep]);
  return (
    <>
      <div id="Mobile" className={`relative size-full max-h-[1000px] max-w-[500px]`}>
        <Image
          id="logo"
          src="/images/logo.png"
          alt="Manulife Logo"
          className={`absolute top-5 left-5 z-2 w-[30%] object-cover`}
          width={0}
          height={0}
          sizes="100vw"
        />
        {/* <LanguageSwitcher className="absolute top-4 right-16 z-50" /> */}
        <button
          onClick={toggleMute}
          className="flexCenter absolute top-4 right-4 z-50 h-10 w-10 rounded-full border border-white/30 bg-white/20 backdrop-blur-sm transition-all duration-300 hover:bg-white/30"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <IconVolumeOff className="cursor-pointer text-xl text-white" />
          ) : (
            <IconVolumeOn className="cursor-pointer text-xl text-white" />
          )}
        </button>
        <AnimatePresence>{content}</AnimatePresence>
      </div>
    </>
  );
}

export default memo(Mobile);
