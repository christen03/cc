"use client";

import { motion, useReducedMotion } from "framer-motion";
import Screen from "../components/Screen";
import AnimatedHeart from "../components/AnimatedHeart";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const reduced = useReducedMotion();
  const router = useRouter();

  useEffect(() => {
    // Redirect to welcome page on first visit
    router.replace("/welcome");
  }, [router]);

  return (
    <Screen>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <AnimatedHeart size={96} className="mx-auto text-[var(--ill-rose)]" />

        <motion.h1
          className="mt-4 font-display text-4xl leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          hi 👋 I made you a tiny site
        </motion.h1>

        <motion.p
          className="mt-2 text-base opacity-80"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          a short story… and a question at the end.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <Link
            href="/story"
            className="inline-block mt-8 rounded-full px-6 py-3 text-white shadow-md glow-ring"
            style={{ background: "var(--btn-grad)" }}
          >
            {reduced ? "Begin" : "Tap to begin ✨"}
          </Link>
        </motion.div>
      </motion.div>
    </Screen>
  );
}
