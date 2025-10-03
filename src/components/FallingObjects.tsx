"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Physics, useBox, usePlane, useSphere } from "@react-three/cannon";
import { Text } from "@react-three/drei";

// Physics-based falling object
function FallingIcon({
  position,
  type,
}: {
  position: [number, number, number];
  type: string;
}) {
  const [ref, api] = useSphere(() => ({
    mass: 1,
    position,
    args: [0.5],
    material: { friction: 0.3, restitution: 0.3 },
  }));

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.5, 32, 32]} />

      {/* Icon text/material based on type */}
      <meshBasicMaterial
        color={
          type === "heart"
            ? "#ff6b6b"
            : type === "star"
            ? "#ffcf5c"
            : type === "sparkle"
            ? "#ff9a5a"
            : type === "fire"
            ? "#ffa500"
            : "#ff69b4"
        }
      />

      {/* Text icon overlay */}
      <Text
        position={[0, 0, 0.6]}
        fontSize={0.4}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {type === "heart"
          ? "❤️"
          : type === "star"
          ? "⭐"
          : type === "sparkle"
          ? "✨"
          : type === "fire"
          ? "🔥"
          : "💖"}
      </Text>
    </mesh>
  );
}

// Ground plane
function Ground() {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -10, 0],
    type: "Static",
    material: { friction: 1, restitution: 0.1 },
  }));

  return (
    <mesh ref={ref}>
      <planeGeometry args={[50, 50]} />
      <meshBasicMaterial color="#ffecf0" transparent opacity={0.8} />
    </mesh>
  );
}

// Container walls
function Walls() {
  // Left wall
  const [leftRef] = useBox(() => ({
    position: [-8, 0, 0],
    args: [0.5, 20, 20],
    type: "Static",
  }));

  // Right wall
  const [rightRef] = useBox(() => ({
    position: [8, 0, 0],
    args: [0.5, 20, 20],
    type: "Static",
  }));

  return (
    <>
      <mesh ref={leftRef}>
        <boxGeometry args={[0.5, 20, 20]} />
        <meshBasicMaterial color="transparent" />
      </mesh>
      <mesh ref={rightRef}>
        <boxGeometry args={[0.5, 20, 20]} />
        <meshBasicMaterial color="transparent" />
      </mesh>
    </>
  );
}

export default function FallingObjects({ active }: { active: boolean }) {
  const [objects, setObjects] = useState<
    Array<{ id: number; type: string; position: [number, number, number] }>
  >([]);
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (active && objects.length < 50) {
      // Max 50 objects
      intervalRef.current = setInterval(() => {
        const types = ["heart", "star", "sparkle", "fire"];
        const randomType = types[Math.floor(Math.random() * types.length)];
        const randomX = (Math.random() - 0.5) * 14; // Spread across screen
        const randomZ = (Math.random() - 0.5) * 8;

        setObjects((prev) => [
          ...prev,
          {
            id: Date.now() + Math.random(),
            type: randomType,
            position: [randomX, 10, randomZ] as [number, number, number],
          },
        ]);
      }, 500); // Spawn every 500ms
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [active, objects.length]);

  return (
    <Canvas
      camera={{ position: [0, 5, 10], fov: 60 }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "transparent",
      }}
    >
      <ambientLight intensity={0.7} />
      <pointLight position={[10, 10, 10]} />

      <Physics gravity={[0, -9.8, 0]} broadphase="NaiveBroadphase">
        <Ground />
        <Walls />

        {objects.map((obj) => (
          <FallingIcon key={obj.id} position={obj.position} type={obj.type} />
        ))}
      </Physics>
    </Canvas>
  );
}
