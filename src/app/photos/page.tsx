"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRouter } from "next/navigation";

const STATIC_TEXT_DELAY = 2;
const STATIC_TEXT_INTERVAL = 0.6;
const PHOTO_DELAY = 3.5 + STATIC_TEXT_DELAY;
const BUTTON_DELAY = PHOTO_DELAY + 4;

// Generate photos using screen dimensions for precise positioning
const generatePhotosWithScreenDimensions = () => {
  // Get screen dimensions
  const screenWidth = typeof window !== "undefined" ? window.innerWidth : 375; // fallback for SSR
  const screenHeight = typeof window !== "undefined" ? window.innerHeight : 812; // fallback for SSR

  // Define preset positions as pixel coordinates with varied spread using more of the screen
  const presetPositions = [
    { x: screenWidth * 0.02, y: screenHeight * 0.05 }, // Far top-left
    { x: screenWidth * 0.53, y: screenHeight * 0.05 }, // Top-right (pulled in)
    { x: screenWidth * 0.03, y: screenHeight * 0.23 }, // Upper-left
    { x: screenWidth * 0.55, y: screenHeight * 0.26 }, // Upper-right (pulled in)
    { x: screenWidth * 0.01, y: screenHeight * 0.42 }, // Far bottom-left
    { x: screenWidth * 0.56, y: screenHeight * 0.46 }, // Bottom-right (pulled in)
    { x: screenWidth * 0.03, y: screenHeight * 0.61 }, // Center-upper
    { x: screenWidth * 0.51, y: screenHeight * 0.65 }, // Center-lower
    { x: screenWidth * 0.02, y: screenHeight * 0.78 }, // Center-upper
    { x: screenWidth * 0.55, y: screenHeight * 0.82 }, // Center-lower
    { x: screenWidth * 0.02, y: screenHeight * 0.92 }, // Bottom-left
  ];

  // Create array of photo IDs 1-8 and shuffle them randomly
  const photoIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const shuffledIds = photoIds.sort(() => Math.random() - 0.5);

  // Cute emoji combinations for each polaroid frame
  const polaroidEmojiCombos = [
    ["💕", "✨", "✨"],
    ["🎀", "🌸", "🦋"],
    ["💫", "🦄", "✨"],
    ["🎨", "🎪", "💕"],
    ["🎭", "🎈", "🌸"],
    ["✨", "💕", "🦋"],
    ["🦄", "🎀", "💫"],
    ["🌸", "🎨", "🎈"],
    ["💕", "🦋", "✨"],
    ["🎪", "🎭", "💫"],
    ["🎈", "🌸", "🎀"],
  ];

  return presetPositions.map((position, i) => {
    const id = shuffledIds[i]; // Use shuffled ID instead of sequential

    // Add some randomization around the preset position
    const randomOffsetX = (Math.random() - 0.5) * 20; // ±30px
    const randomOffsetY = (Math.random() - 0.5) * 40; // ±20px

    const x = position.x + randomOffsetX;
    const y = position.y + randomOffsetY;
    const lowerCase = [4, 6, 9];
    const extension = lowerCase.includes(id) ? "jpg" : "JPG";

    return {
      id,
      src: `/photos/photo${id}.${extension}`,
      alt: `Memory ${id}`,
      emojis: polaroidEmojiCombos[id % polaroidEmojiCombos.length],
      delay: i * 0.2, // Use index for delay instead of id
      x: x, // pixel coordinates
      y: y, // pixel coordinates
      rotation: (Math.random() - 0.5) * 40, // -20 to +20 degrees for subtle tilt
      maxWidth: 206 + Math.random() * 60, // 140-200px
      maxHeight: 275 + Math.random() * 80, // 180-260px
    };
  });
};

const staticText = [
  "sabai🍹, vegas🎰, lost lands🦖, disneyland 🎡",
  "and a LOT of flights 🛫 and calls 📞",
  "with a whole missed flight lolol",
];
export default function PhotosPage() {
  const router = useRouter();

  // Generate photos immediately when component mounts, not in useEffect
  const photos = generatePhotosWithScreenDimensions();

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--fg)] flex-col text-center p-0 m-0 relative overflow-hidden">
      {" "}
      {/* Scattered Photos */}
      <div className="absolute w-full h-full inset-0 pointer-events-none">
        {photos.map((photo) => (
          <motion.div
            key={photo.id}
            layout
            className="absolute"
            style={{
              width: "auto",
              height: "auto",
              maxWidth: `${photo.maxWidth}px`,
              maxHeight: `${photo.maxHeight}px`,
            }}
            initial={{
              scale: 0,
              rotate: photo.rotation + 180,
              opacity: 0,
              y: -100,
            }}
            animate={{
              left: `${photo.x}px`,
              top: `${photo.y}px`,
              scale: 1,
              rotate: photo.rotation,
              opacity: 1,
            }}
            transition={{
              delay: photo.delay + PHOTO_DELAY, // Wait for text first
              duration: 1.5,
              ease: "easeOut",
              type: "spring",
              stiffness: 200,
              damping: 20,
            }}
          >
            {/* Polaroid Frame */}
            <div
              style={{
                background: "white",
                borderRadius: "8px",
                padding: "12px 12px 40px 12px",
                boxShadow:
                  "0 8px 25px rgba(0,0,0,0.15), 0 25px 50px rgba(0,0,0,0.1)",
                border: "1px solid rgba(255,255,255,0.8)",
                backdropFilter: "blur(10px)",
                position: "relative",
                height: "fit-content",
                maxWidth: `${photo.maxWidth}px`,
                maxHeight: `${photo.maxHeight}px`,
              }}
            >
              {/* The actual photo */}
              <img
                src={photo.src}
                alt={photo.alt}
                className="rounded-t-md"
                style={{
                  width: "100%",
                  height: "auto",
                  maxWidth: `${photo.maxWidth - 24}px`,
                  maxHeight: `${photo.maxHeight - 60}px`,
                  borderRadius: "6px 6px 0 0",
                  objectFit: "cover",
                }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = "flex";
                }}
              />

              {/* Photo fallback if image fails to load */}
              <div
                className="w-full bg-gradient-to-br from-pink-200 to-orange-200 flex items-center justify-center text-xs text-gray-600"
                style={{
                  display: "none",
                  height: `${photo.maxHeight - 60}px`,
                  borderRadius: "6px 6px 0 0",
                }}
              >
                📸 Photo missing
              </div>

              {/* Polaroid bottom section with emoji */}
              <div
                style={{
                  padding: "8px 4px 4px 4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "linear-gradient(135deg, #fff 0%, #f8f8f8 100%)",
                  borderRadius: "0 0 6px 6px",
                  borderTop: "1px solid rgba(0,0,0,0.05)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "6px",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {photo.emojis.map((emoji, emojiIndex) => (
                    <span
                      key={emojiIndex}
                      style={{
                        fontSize: emojiIndex === 1 ? "18px" : "14px", // Center emoji slightly bigger
                        background:
                          "linear-gradient(135deg, #ff6b6b, #ff9a5a, #ffcf5c)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        fontWeight: "bold",
                        filter: emojiIndex === 1 ? "none" : "opacity(0.8)", // Highlight center emoji
                        transform: emojiIndex === 1 ? "scale(1.1)" : "scale(1)",
                      }}
                    >
                      {emoji}
                    </span>
                  ))}
                </div>
              </div>

              {/* Subtle shine effect */}
              <div
                style={{
                  position: "absolute",
                  top: "2px",
                  left: "2px",
                  right: "2px",
                  height: "30%",
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.6) 0%, transparent 100%)",
                  borderRadius: "6px 6px 0 0",
                  pointerEvents: "none",
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>
      {/* Top text */}
      <motion.div
        className="relative left-1/2 transform -translate-x-1/2 backdrop-blur-md bg-white/80 rounded-2xl p-6 shadow-2xl z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <motion.h1
          className="text-3xl mb-0 font-[var(--font-caveat)] "
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          the past few months were a lot of fun
        </motion.h1>
      </motion.div>
      <AnimatePresence mode="wait">
        <motion.div
          className="max-w-2xl mx-auto text-center backdrop-blur-md bg-white/80 rounded-3xl p-8 shadow-2xl"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 1.1, y: -20 }}
          transition={{
            duration: 0.8,
            ease: "easeInOut",
            delay: STATIC_TEXT_DELAY,
          }}
        >
          {staticText.map((line, index) => (
            <motion.p
              key={index}
              className="text-xl font-[var(--font-caveat)] leading-relaxed mb-2"
              style={{ fontSize: "1.2rem" }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * STATIC_TEXT_INTERVAL + STATIC_TEXT_DELAY,
                duration: 0.7,
              }}
            >
              {line}
            </motion.p>
          ))}
        </motion.div>
      </AnimatePresence>
      {/* Button overlay - positioned at bottom */}
      <motion.button
        onClick={() => router.push("/story")}
        className="absolute left-1/2 transform -translate-x-1/2 rounded-full text-white text-xl font-medium glow-ring backdrop-blur-sm z-20 w-[75%] h-[30px] font-[var(--font-caveat)]"
        style={{
          background: "var(--btn-grad)",
          bottom: "40px",
          boxShadow:
            "0 8px 32px rgba(255, 107, 107, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.2)",
          fontFamily: "var(--font-caveat)",
          fontSize: "1.3rem",
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: BUTTON_DELAY, duration: 0.8 }}
        whileHover={{
          scale: 1.05,
          boxShadow:
            "0 12px 40px rgba(255, 107, 107, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.3)",
        }}
        whileTap={{ scale: 0.95 }}
      >
        {"and i wanted to ask 💖"}
      </motion.button>
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
