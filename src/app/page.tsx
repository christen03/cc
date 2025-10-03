"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const reduced = useReducedMotion();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleStart = () => {
    const fly = (window as any).flyPhoenixTo as
      | ((opts: { to: string; onBeforeNavigate?: () => void }) => void)
      | undefined;
    if (fly) {
      fly({
        to: "/photos",
        onBeforeNavigate: () => {
          if ((window as any).startGlobalMusic)
            (window as any).startGlobalMusic();
        },
      });

      // Wait for 7.5 seconds (same as animation duration) then fade out
      setTimeout(() => {
        setIsTransitioning(true);
      }, 6500);
    } else {
      if ((window as any).startGlobalMusic) (window as any).startGlobalMusic();
      router.push("/photos");
    }
  };

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--fg)] flex flex-col items-center justify-center text-center px-4 relative">
      <AnimatePresence>
        {!isTransitioning && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-md mx-auto relative z-10"
          >
            <motion.h1
              className="text-6xl mb-4"
              style={{ fontFamily: "var(--font-caveat)", fontWeight: "700" }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              hi claire ✨
            </motion.h1>

            <motion.button
              onClick={handleStart}
              className="rounded-full text-white text-lg font-medium shadow-lg glow-ring font-[var(--font-caveat)]"
              style={{
                background: "var(--btn-grad)",
                fontFamily: "var(--font-caveat)",
                padding: "8px 50px",
                width: "200px",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {reduced ? "tap here :)" : "tap here :)"}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle background glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(600px 400px at 50% 50%, rgba(255, 107, 107, 0.15), transparent 60%)",
            filter: "blur(40px)",
          }}
        />
      </div>
    </main>
  );
}
