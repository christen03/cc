"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function StoryPage() {
  const router = useRouter();
  const { scrollYProgress } = useScroll();
  const [activeText, setActiveText] = useState(0);
  const [showFinalQuestion, setShowFinalQuestion] = useState(false);
  const [didTapNo, setDidTapNo] = useState(false);
  const [didTapYes, setDidTapYes] = useState(false);

  // Text content to display
  const textBlocks = [
    {
      id: 1,
      image: "/photos/awake.jpg",
      lines: [
        "It's like you're diving into my heart",
        "I'm floating off the ground",
        "When you pull me into your arms",
        "I go into a free fall",
      ],
    },
    {
      id: 2,
      image: "/photos/fallen_embers.jpg",
      lines: [
        "If the world is goin' sideways",
        "I know my place is here with you",
        "When all our good nights turn to dark days",
        "I know I'll stay next to you",
      ],
    },
    {
      id: 3,
      image: "/photos/ascend.jpeg",
      lines: [
        "Let me disarm you",
        "Let me love the lonely out of you, out of you",
        "I'll hold you in my arms",
      ],
    },
    {
      id: 4,
      image: "/photos/nightlight.jpg",
      lines: [
        "Will you be my something I can hold onto",
        "something who'll be there for me",
        "And when i fall apart (promise in the dark lol)",

        "will you be my nightlight",
      ],
    },
  ];

  // Auto-advance through text blocks (stop at 4th block)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveText((prev) => {
        if (prev < textBlocks.length - 1) {
          return prev + 1;
        }
        return prev; // Stay on last block
      });
    }, 4000); // Change every 4 seconds

    // After reaching the 4th block, wait 1 second then show final question
    const finalTimer = setTimeout(() => {
      if (activeText === textBlocks.length - 1) {
        setShowFinalQuestion(true);
      }
    }, 5000); // 4s interval + 1s delay

    return () => {
      clearInterval(interval);
      clearTimeout(finalTimer);
    };
  }, [activeText, textBlocks.length]);

  const handleNo = () => {
    if (didTapNo) {
      (window as any).playCelebrationSong?.();
      setDidTapYes(true);
      setTimeout(() => {
        router.push("/yes");
      }, 13800);
    } else {
      setDidTapNo(true);
    }
  };

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--fg)] flex flex-col items-center justify-center p-8 relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeText}
          className="max-w-2xl mx-auto text-center backdrop-blur-md bg-white/80 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 1.1, y: -20 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Square background image */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-60 opacity-20"
            style={{ width: "320px", height: "240px", borderRadius: "10px" }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.2, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <Image
              src={textBlocks[activeText].image}
              alt={`Background ${activeText + 1}`}
              fill
              className="object-contain rounded-lg"
              style={{
                objectFit: "contain",
                borderRadius: "10px",
              }}
              sizes="320px"
            />
          </motion.div>

          {/* Text content */}
          <div className="relative z-10">
            {textBlocks[activeText].lines.map((line, index) => (
              <motion.p
                key={index}
                className="text-xl font-[var(--font-caveat)] leading-relaxed mb-2"
                style={{ fontSize: "1.3rem" }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.4, duration: 0.7 }}
              >
                {line}
              </motion.p>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Final question appears on top of the 4th block */}
      {showFinalQuestion && (
        <motion.div
          className="absolute top-[80%] left-1/2 transform -translate-x-1/2 w-[90%] max-w-xl text-center backdrop-blur-md bg-white/90 rounded-3xl p-8 shadow-2xl z-10"
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <motion.p
            className="text-3xl font-[var(--font-caveat)] font-bold leading-relaxed mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            style={{ fontSize: "1.5rem" }}
          >
            will you be my girlfriend? 💕
          </motion.p>

          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            style={{ gap: "16px" }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <motion.button
              className="px-8 py-3 text-white rounded-full text-lg font-medium shadow-lg font-[var(--font-caveat)] transition-colors"
              style={{
                fontFamily: "var(--font-caveat)",
                fontWeight: "700",
                fontSize: "1.3rem",
                background: "linear-gradient(135deg, #ff6b9d, #ff8cc8)",
                boxShadow: "0 4px 15px rgba(255, 107, 157, 0.4)",
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 6px 20px rgba(255, 107, 157, 0.6)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                (window as any).playCelebrationSong?.();
                setDidTapYes(true);
                // Wait 5 seconds before routing
                setTimeout(() => {
                  router.push("/yes");
                }, 13800);
              }}
              disabled={didTapYes}
            >
              Yes! 💕
            </motion.button>

            <motion.button
              className="px-8 py-3 text-white rounded-full text-lg font-medium shadow-lg font-[var(--font-caveat)] transition-colors"
              style={{
                fontFamily: "var(--font-caveat)",
                fontWeight: "700",
                background: "linear-gradient(135deg, #ffb3ba, #ffc3a8)",
                fontSize: "1.3rem",
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 6px 20px rgba(255, 179, 186, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNo}
              disabled={didTapYes}
            >
              {didTapNo ? "sike u thought, yes!!" : "maybe later"}
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </main>
  );
}
