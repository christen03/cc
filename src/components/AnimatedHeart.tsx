"use client";

import { motion, useReducedMotion } from "framer-motion";
import { clsx } from "clsx";

type Props = {
  size?: number;
  className?: string;
};

export default function AnimatedHeart({ size = 64, className }: Props) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      aria-hidden
      initial={{ scale: 0.8, rotate: -8, opacity: 0 }}
      animate={{ scale: 1, rotate: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 12 }}
      className={clsx("relative", className)}
      style={{ width: size, height: size }}
    >
      <motion.svg
        viewBox="0 0 24 24"
        className="w-full h-full drop-shadow"
        animate={reduced ? {} : { scale: [1, 1.1, 1], y: [0, -4, 0] }}
        transition={reduced ? {} : { repeat: Infinity, duration: 1.8 }}
      >
        <path
          d="M12 21s-7.5-4.8-9.5-8.8C.9 9.3 2.4 6 5.6 6c2.1 0 3.1 1.3 3.9 2.3.8-1 1.8-2.3 3.9-2.3 3.2 0 4.7 3.3 3.1 6.2C19.5 16.2 12 21 12 21Z"
          fill="currentColor"
        />
      </motion.svg>
    </motion.div>
  );
}
