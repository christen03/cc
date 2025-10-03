"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [needsUserInteraction, setNeedsUserInteraction] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowControls(false);
    }, 3000);

    // Try to auto-play music when component mounts
    const autoPlay = () => {
      if (audioRef.current) {
        audioRef.current.play();
      }
    };

    autoPlay();

    return () => clearTimeout(timer);
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(console.error);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <>
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onLoadedData={() => {
          if (audioRef.current) {
            audioRef.current.volume = 0.3; // Set volume to 30%
            // Try to play when audio is loaded
            audioRef.current
              .play()
              .then(() => {
                setNeedsUserInteraction(false);
              })
              .catch(() => {
                // Autoplay blocked, will need user interaction
                setNeedsUserInteraction(true);
              });
          }
        }}
      >
        {/* You'll need to add your music file to the public folder */}
        <source src="/music/forever.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Music controls */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-4 right-4 z-50"
          >
            <div className="flex items-center gap-2 rounded-full bg-black/20 backdrop-blur-sm px-3 py-2">
              <button
                onClick={togglePlay}
                className="rounded-full p-1 text-white hover:bg-white/20 transition-colors"
                aria-label={isPlaying ? "Pause music" : "Play music"}
              >
                {isPlaying ? "⏸️" : "▶️"}
              </button>
              <button
                onClick={toggleMute}
                className="rounded-full p-1 text-white hover:bg-white/20 transition-colors"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? "🔇" : "🔊"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating music note indicator */}
      <motion.div
        className="fixed top-4 right-4 z-40 cursor-pointer"
        onClick={() => {
          setShowControls(true);
          if (needsUserInteraction && audioRef.current) {
            audioRef.current
              .play()
              .then(() => {
                setNeedsUserInteraction(false);
              })
              .catch(console.error);
          }
        }}
        animate={{
          scale: isPlaying
            ? [1, 1.1, 1]
            : needsUserInteraction
            ? [1, 1.2, 1]
            : 1,
          rotate: isPlaying ? [0, 5, -5, 0] : 0,
        }}
        transition={{
          duration: 2,
          repeat: isPlaying || needsUserInteraction ? Infinity : 0,
          ease: "easeInOut",
        }}
      >
        <div className="rounded-full bg-black/20 backdrop-blur-sm p-2 text-white">
          {needsUserInteraction ? "▶️" : isPlaying ? "🎵" : "🎶"}
        </div>
      </motion.div>
    </>
  );
}
