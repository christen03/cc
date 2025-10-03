"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";

type PhoenixMotionProps = {
  flyAcross?: boolean;
  durationSec?: number;
  onComplete?: () => void;
  size?: number;
};

export default function PhoenixMotion({
  flyAcross = false,
  durationSec = 2.0,
  onComplete,
  size = 1,
}: PhoenixMotionProps) {
  return (
    <motion.img
      src="/photos/phoenix.gif"
      alt="Animated Phoenix"
      className="absolute pointer-events-none"
      style={{
        width: `${400 * size}px`,
        height: `${400 * size}px`,
        transform: `translateX(-100px) translateY(-100px)`, // Center the image
        zIndex: 1000,
        top: "50%", // Perfect vertical centering
        left: 0, // Start from left edge
      }}
      initial={
        flyAcross
          ? {
              x: "-25vw",
              y: 0,
              rotate: -5,
              opacity: 1,
              scale: 1,
            }
          : {
              opacity: 1,
              scale: 1,
            }
      }
      animate={
        flyAcross
          ? {
              x: "125vw",
              y: 0,
              rotate: 2,
              opacity: 1,
              scale: 1,
            }
          : {
              opacity: 1,
              scale: 1,
            }
      }
      transition={
        flyAcross
          ? {
              duration: durationSec,
              ease: [0.2, 0.8, 0.2, 1],
              onComplete: onComplete,
            }
          : { duration: 0 }
      }
      whileHover={!flyAcross ? { scale: 1.1 } : undefined}
      // Flight bob animation
      variants={{
        flying: {
          y: [-5, 5, -5],
          transition: {
            duration: 0.5,
            repeat: Infinity,
          },
        },
        idle: {
          y: 0,
          scale: 1,
        },
      }}
    />
  );
}
