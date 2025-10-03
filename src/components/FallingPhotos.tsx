"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { useState, useEffect } from "react";

// Generate random positions for photos to spread across the screen with collision detection
const generateRandomPhoto = (id: number, existingPhotos: any[] = []) => {
  const minDistance = 15; // Minimum distance between photos (in %)
  const maxAttempts = 50;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const x = Math.random() * 85 + 7.5; // 7.5-92.5% across screen (avoid edges)
    const y = Math.random() * 80 + 10; // 10-90% down screen (avoid edges)

    // Check if this position is far enough from existing photos
    const tooClose = existingPhotos.some((existing) => {
      const distance = Math.sqrt(
        Math.pow(x - existing.x, 2) + Math.pow(y - existing.y, 2)
      );
      return distance < minDistance;
    });

    if (!tooClose) {
      return {
        id,
        src: `/photos/photo${id}.jpg`,
        alt: `Memory ${id}`,
        delay: Math.random() * 2, // Random delay 0-2 seconds
        x,
        y,
        rotation: (Math.random() - 0.5) * 60, // -30 to +30 degrees
        scale: 0.8 + Math.random() * 0.4, // Random scale 0.8-1.2
      };
    }
  }

  // Fallback if we can't find a good position
  return {
    id,
    src: `/photos/photo${id}.jpg`,
    alt: `Memory ${id}`,
    delay: Math.random() * 2,
    x: Math.random() * 85 + 7.5,
    y: Math.random() * 80 + 10,
    rotation: (Math.random() - 0.5) * 60,
    scale: 0.8 + Math.random() * 0.4,
  };
};

export default function FallingPhotos() {
  const reduced = useReducedMotion();
  const [shouldFall, setShouldFall] = useState(false);
  const [photos, setPhotos] = useState<
    ReturnType<typeof generateRandomPhoto>[]
  >([]);

  useEffect(() => {
    // Listen for the global start function call
    const checkForStart = () => {
      if ((window as any).startGlobalMusic) {
        setShouldFall(true);
        // Generate random photos when animation starts with collision detection
        const generatedPhotos = [];
        for (let i = 0; i < 8; i++) {
          generatedPhotos.push(generateRandomPhoto(i + 1, generatedPhotos));
        }
        setPhotos(generatedPhotos);
      }
    };

    // Check periodically if music has started
    const interval = setInterval(checkForStart, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  if (reduced || !shouldFall) {
    return null;
  }

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {photos.map((photo) => (
        <motion.div
          key={photo.id}
          layout
          style={{ left: `${photo.x}%`, top: `${photo.y}%` }}
          initial={{
            scale: 0,
            rotate: photo.rotation + 180,
            opacity: 0,
            y: -50,
          }}
          animate={{
            scale: photo.scale,
            rotate: photo.rotation,
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: photo.delay,
            duration: 1.5,
            ease: "easeOut",
            type: "spring",
            stiffness: 100,
            damping: 15,
          }}
        >
          {/* Placeholder for photo - you can replace with actual images */}
        </motion.div>
      ))}

      {/* Additional scattered photos */}
      {photos.length > 0 &&
        [9, 10, 11, 12].map((id) => {
          const randomX = Math.random() * 100;
          const randomY = Math.random() * 100;
          const randomRotation = (Math.random() - 0.5) * 60;
          const randomScale = 0.6 + Math.random() * 0.4;
          const randomDelay = Math.random() * 2;
          return (
            <motion.div
              key={id}
              className="absolute w-20 h-28 rounded-lg shadow-lg border-2 border-white/20"
              style={{
                position: "absolute",
                left: `${randomX}%`,
                top: `${randomY}%`,
              }}
              initial={{
                scale: 0,
                rotate: randomRotation + 180,
                opacity: 0,
                y: -30,
              }}
              animate={{
                scale: randomScale,
                rotate: randomRotation,
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: randomDelay,
                duration: 1.2,
                ease: "easeOut",
                type: "spring",
                stiffness: 80,
                damping: 12,
              }}
            >
              <div className="w-full h-full bg-gradient-to-br from-yellow-200 to-red-200 rounded-lg flex items-center justify-center text-xs text-gray-600">
                💕
              </div>
            </motion.div>
          );
        })}
    </div>
  );
}
