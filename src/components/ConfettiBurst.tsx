"use client";

import confetti from "canvas-confetti";
import { useCallback } from "react";

export default function useConfetti() {
  return useCallback(() => {
    const end = Date.now() + 800;
    const colors = [
      getComputedStyle(document.documentElement)
        .getPropertyValue("--ill-rose")
        .trim() || "#ff7aa2",
      getComputedStyle(document.documentElement)
        .getPropertyValue("--ill-peach")
        .trim() || "#ffb37a",
      getComputedStyle(document.documentElement)
        .getPropertyValue("--ill-gold")
        .trim() || "#ffd36e",
      getComputedStyle(document.documentElement)
        .getPropertyValue("--ill-violet")
        .trim() || "#a38bff",
    ];

    const frame = () => {
      // Left side confetti shooting rightward
      confetti({
        particleCount: 25,
        startVelocity: 50,
        spread: 90,
        scalar: 0.9,
        origin: { x: 0, y: 0.6 },
        angle: 90,
        colors,
        ticks: 200,
      });

      // Right side confetti shooting leftward
      confetti({
        particleCount: 25,
        startVelocity: 50,
        spread: 90,
        scalar: 0.9,
        origin: { x: 1, y: 0.6 },
        angle: 90,
        colors,
        ticks: 200,
      });

      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }, []);
}
