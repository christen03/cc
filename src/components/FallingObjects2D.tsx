"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface FallingObject {
  id: string;
  emoji?: string;
  icon?: string;
  color: string;
  size: number;
  startX: number;
  startDelay: number;
  rotation: number;
  type: "emoji" | "icon";
}

const emojis = [
  "❤️",
  "⭐",
  "✨",
  "🔥",
  "💖",
  "🌸",
  "🦋",
  "💫",
  "🌟",
  "💕",
  "🌺",
  "💎",
  "🎀",
  "🌈",
];
const icons = [
  "/photos/illenium.png",
  "/photos/excision.png",
  "/photos/wooli.png",
];
const colors = [
  "#ff6b6b",
  "#ffcf5c",
  "#ff9a5a",
  "#ffa500",
  "#ff69b4",
  "#ff8fb5",
  "#ffadd6",
  "#ffb6c1",
  "#dda0dd",
];

export default function FallingObjects2D({ active }: { active: boolean }) {
  const [objects, setObjects] = useState<FallingObject[]>([]);

  useEffect(() => {
    if (!active) {
      setObjects([]);
      return;
    }

    console.log("FallingObjects2D: Starting continuous object stream");

    const interval = setInterval(() => {
      const isIcon = Math.random() < 0.4; // 40% chance for icon, 60% for emoji
      const iconPath = isIcon
        ? icons[Math.floor(Math.random() * icons.length)]
        : "";
      const isBigImage =
        iconPath === "/photos/illenium.png" || iconPath === "/photos/wooli.png";

      const newObject: FallingObject = {
        id: `obj-${Date.now()}-${Math.random()}`,
        ...(isIcon
          ? {
              icon: iconPath,
              type: "icon" as const,
            }
          : {
              emoji: emojis[Math.floor(Math.random() * emojis.length)],
              type: "emoji" as const,
            }),
        color: colors[Math.floor(Math.random() * colors.length)],
        size:
          isIcon && isBigImage
            ? 80 + Math.random() * 40 // Illenium and Wooli: 80-120px
            : isIcon
            ? 40 + Math.random() * 20 // Other icons: 40-60px
            : 35 + Math.random() * 15, // Emojis: 35-50px
        startX: Math.random() * 390, // Fixed range: 50-350px from left
        startDelay: Math.random() * 1, // Random delay 0-1s
        rotation: Math.random() * 360, // Random rotation 0-360 degrees
      };

      console.log(
        "FallingObjects2D: Creating",
        newObject.type,
        newObject.icon || newObject.emoji
      );
      setObjects((prev) => [...prev, newObject]);
    }, 100 + Math.random() * 150); // Random interval: 100-250ms for more objects

    // Clean up objects that are off screen every 2 seconds
    const cleanup = setInterval(() => {
      setObjects((prev) => prev.filter((obj) => obj.id !== undefined)); // Keep all for now, framer motion will handle removal
    }, 2000);

    return () => {
      clearInterval(interval);
      clearInterval(cleanup);
    };
  }, [active]);

  const handleObjectComplete = (object: FallingObject) => {
    // Remove object when it completes animation (falls off screen)
    setObjects((prev) => prev.filter((obj) => obj.id !== object.id));
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <AnimatePresence>
        {objects.map((obj) => (
          <motion.div
            key={obj.id}
            className="fixed select-none z-[1001]"
            style={{
              left: `${obj.startX}px`,
              fontSize: `${obj.size}px`,
              width: obj.type === "icon" ? `${obj.size}px` : "auto",
              height: obj.type === "icon" ? `${obj.size}px` : "auto",
              zIndex: 10,
            }}
            initial={{
              top: "-90px",
              opacity: 1,
              rotate: obj.rotation,
            }}
            animate={{
              top: "calc(100vh + 50px)",
              opacity: 1,
              rotate: obj.rotation + (Math.random() * 180 - 90), // Add random spin
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 3 + Math.random() * 2, // 3-5 seconds for variety
              delay: obj.startDelay,
              ease: "easeInOut",
            }}
            onAnimationComplete={() => handleObjectComplete(obj)}
          >
            {obj.type === "emoji" ? (
              obj.emoji
            ) : (
              <Image
                src={obj.icon!}
                alt="falling icon"
                width={obj.size}
                height={obj.size}
                className="object-contain"
                style={{ filter: `drop-shadow(0 0 10px ${obj.color})` }}
              />
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
