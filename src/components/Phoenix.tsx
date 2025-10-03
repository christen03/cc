"use client";

import { motion, useReducedMotion, useTime, useTransform } from "framer-motion";
import { clsx } from "clsx";

type Props = {
  className?: string;
  size?: number;
  // When true, the phoenix flies left->right across the viewport; otherwise it orbits subtly
  flyAcross?: boolean;
  // Optional control of flight duration (seconds)
  durationSec?: number;
  // Optional callback when the flight completes
  onComplete?: () => void;
};

export default function Phoenix({
  className,
  size = 56,
  flyAcross = false,
  durationSec = 1.2,
  onComplete,
}: Props) {
  const reduced = useReducedMotion();
  const t = useTime();
  const orbit = useTransform(t, (ms) => (ms / 1000) % 12);
  const angle = useTransform(orbit, [0, 12], [0, Math.PI * 2]);
  const x = useTransform(angle, (a) => Math.cos(a) * 160);
  const y = useTransform(angle, (a) => Math.sin(a) * 90);

  return (
    <motion.div
      aria-hidden
      className={clsx("pointer-events-none select-none", className)}
      style={
        reduced
          ? { position: "absolute", top: 40, right: 40 }
          : flyAcross
          ? {
              position: "fixed",
              top: "50%",
              left: 0,
              transform: "translateY(-50%)",
            }
          : {
              position: "absolute",
              left: "50%",
              top: "40%",
              translateX: "-50%",
              translateY: "-50%",
            }
      }
    >
      <motion.div
        style={reduced || !flyAcross ? (reduced ? {} : { x, y }) : undefined}
        initial={
          flyAcross ? { x: "-5vw", y: 0, rotate: -5, opacity: 0 } : undefined
        }
        animate={
          flyAcross ? { x: "105vw", y: 0, rotate: 3, opacity: 1 } : undefined
        }
        transition={
          flyAcross
            ? {
                duration: reduced ? 0.3 : durationSec,
                ease: [0.2, 0.8, 0.2, 1],
              }
            : undefined
        }
        onAnimationComplete={() => {
          if (flyAcross && onComplete) onComplete();
        }}
      >
        <motion.svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          className="drop-shadow"
          initial={{ opacity: 0, scale: 0.9, rotate: -8 }}
          animate={{ opacity: 0.95, scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 16 }}
        >
          {/* cute phoenix body (simplified) */}
          <defs>
            <linearGradient id="phoenixGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--ill-rose)" />
              <stop offset="50%" stopColor="var(--ill-peach)" />
              <stop offset="100%" stopColor="var(--ill-gold)" />
            </linearGradient>
          </defs>
          <g
            fill="none"
            stroke="url(#phoenixGrad)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* head */}
            <path d="M28 18c2-4 8-4 10 0" />
            {/* beak */}
            <path d="M40 20l4 1-4 1" />
            {/* body */}
            <path
              d="M32 22c-4 6-6 10-6 14 0 6 6 10 10 8 4-2 6-8 6-12 0-5-3-8-10-10z"
              fill="url(#phoenixGrad)"
              opacity="0.9"
            />
            {/* wing */}
            <path d="M26 30c-6 2-8 6-6 8 2 2 6 0 10-2" />
            {/* tail flames */}
            <path d="M34 44c2 4 0 8-4 10" />
            <path d="M38 44c3 5 2 9-2 12" />
          </g>
          {/* tiny heart being held */}
          <path
            d="M42 28c1.2-1 3-.6 3.6.7.6-1.3 2.4-1.7 3.6-.7 1.5 1.3.6 3.7-1.3 5.2S45 36 45 36s-1.7-1.6-3.6-3.1-2.8-3.9-1.3-5.2Z"
            fill="currentColor"
            style={{ color: "var(--ill-rose)" }}
          />
        </motion.svg>
      </motion.div>
    </motion.div>
  );
}
