"use client";

import { motion } from "framer-motion";
import Screen from "../../components/Screen";
import useConfetti from "../../components/ConfettiBurst";
import { useEffect } from "react";
import Link from "next/link";

export default function YesPage() {
  const burst = useConfetti();

  useEffect(() => {
    burst();
  }, [burst]);

  return (
    <Screen>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 15,
          duration: 0.8,
        }}
        className="flex flex-col items-center"
      >
        <motion.div
          className="mx-auto"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: 1,
            opacity: 1,
            y: [0, -8, 0],
          }}
          transition={{
            scale: {
              type: "spring",
              stiffness: 120,
              damping: 12,
              duration: 0.8,
            },
            opacity: {
              duration: 0.8,
            },
            y: {
              repeat: Infinity,
              duration: 2.5,
              ease: "easeInOut",
            },
          }}
          style={{ fontSize: "100px" }}
        >
          💖
        </motion.div>

        <motion.h2
          className="mt-4 font-display text-4xl"
          initial={{ opacity: 0, y: 30, scale: 0.5 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            delay: 0.4,
            type: "spring",
            stiffness: 150,
            damping: 8,
          }}
        >
          yay 😄
        </motion.h2>

        <motion.p
          className="mt-2 opacity-80"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          i promise to make us proud :)
        </motion.p>

        <motion.div
          className="flex flex-col gap-4 items-center"
          style={{ gap: "16px" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <Link
            href="https://apps.apple.com/app/your-app-name"
            className="text-lg font-[var(--font-caveat)] text-white/90 underline decoration-white/60 hover:decoration-white/90 transition-all"
            target="_blank"
            rel="noopener noreferrer"
          >
            now download this app i made for our journey 📱
          </Link>
          <Link
            href="/"
            className="mt-8 rounded-full px-6 py-3 text-white shadow-md glow-ring font-[var(--font-caveat)] font-bold"
            style={{ background: "var(--btn-grad)" }}
          >
            replay ↻
          </Link>
        </motion.div>
      </motion.div>
    </Screen>
  );
}
