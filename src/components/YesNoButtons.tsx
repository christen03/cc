"use client";

import { motion, useMotionValue, useReducedMotion } from "framer-motion";
import { useCallback, useEffect } from "react";

export default function YesNoButtons({ onYes }: { onYes: () => void }) {
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // playful "no" dodge
  const dodge = useCallback(() => {
    if (reduced) return; // be kind to reduced-motion folks
    const r = 80 + Math.random() * 80;
    const angle = Math.random() * Math.PI * 2;
    x.set(Math.cos(angle) * r);
    y.set(Math.sin(angle) * r);
  }, [reduced, x, y]);

  useEffect(() => {
    const handleResize = () => {
      x.set(0);
      y.set(0);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [x, y]);

  return (
    <div className="mt-8 flex items-center justify-center gap-4">
      <button
        onClick={onYes}
        className="rounded-full text-white px-6 py-3 text-lg font-medium shadow-md active:scale-95 transition glow-ring"
        style={{ background: "var(--btn-grad)" }}
      >
        Yes! 💖
      </button>

      <motion.button
        onMouseEnter={dodge}
        onTouchStart={dodge}
        style={{ x, y }}
        className="rounded-full soft-card text-white/90 px-6 py-3 text-lg font-medium active:scale-95"
      >
        no…
      </motion.button>
    </div>
  );
}
