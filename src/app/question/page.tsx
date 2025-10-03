"use client";

import { motion } from "framer-motion";
import Screen from "../../components/Screen";
import AnimatedHeart from "../../components/AnimatedHeart";
import YesNoButtons from "../../components/YesNoButtons";
import { useRouter } from "next/navigation";

export default function QuestionPage() {
  const router = useRouter();

  return (
    <Screen>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <AnimatedHeart
          size={96}
          className="mx-auto text-[var(--ill-rose)] animate-pulseSoft"
        />
        <h2 className="mt-4 font-display text-4xl leading-tight">
          will you be my girlfriend?
        </h2>
        <p className="mt-2 opacity-80">
          I promise to bring snacks and playlists.
        </p>

        <YesNoButtons onYes={() => router.push("/yes")} />
      </motion.div>
    </Screen>
  );
}
