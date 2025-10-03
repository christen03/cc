"use client";

import { useRef, useEffect, useState } from "react";
import { useFrame, useThree, useLoader } from "@react-three/fiber";
import { Mesh, Group } from "three";
import * as THREE from "three";

type PhoenixProps = {
  flyAcross?: boolean;
  durationSec?: number;
  onComplete?: () => void;
  size?: number;
};

function PhoenixModel({
  flyAcross = false,
  durationSec = 1.2,
  onComplete,
  size = 1,
}: PhoenixProps) {
  const groupRef = useRef<Group>(null);
  const phoenixRef = useRef<Mesh>(null);
  const { viewport } = useThree();

  // Flight animation state
  const startTime = useRef<number>(0);
  const isFlying = useRef(false);

  // Load GIF texture for animated phoenix
  const phoenixTexture = useLoader(THREE.TextureLoader, "/photos/phoenix.gif");

  const phoenixMaterial = new THREE.MeshBasicMaterial({
    map: phoenixTexture,
    transparent: true,
    alphaTest: 0.1,
    side: THREE.DoubleSide,
  });

  useEffect(() => {
    if (flyAcross) {
      isFlying.current = true;
      startTime.current = Date.now();

      if (groupRef.current) {
        groupRef.current.position.set(-viewport.width / 2 - 2, 0, 0);
      }
    }
  }, [flyAcross, viewport.width]);

  useFrame(() => {
    if (!flyAcross || !groupRef.current) return;

    const elapsed = (Date.now() - startTime.current) / 1000;
    const progress = Math.min(elapsed / durationSec, 1);

    if (progress >= 1 && isFlying.current) {
      isFlying.current = false;
      if (onComplete) onComplete();
      return;
    }

    // Animate flight path
    const startX = -viewport.width / 2 - 2;
    const endX = viewport.width / 2 + 2;
    groupRef.current.position.x = startX + (endX - startX) * progress;

    // Gentle flight bob
    groupRef.current.position.y = Math.sin(elapsed * 8) * 0.2;

    // Slight rotation during flight (phoenix banking)
    groupRef.current.rotation.z = Math.sin(elapsed * 6) * 0.15;

    // Phoenix sprite animation (subtle scaling/swaying)
    if (phoenixRef.current) {
      const scaleVariation = 1 + Math.sin(elapsed * 12) * 0.05;
      phoenixRef.current.scale.setScalar(scaleVariation);

      // Gentle rotation for flying effect
      phoenixRef.current.rotation.z = Math.sin(elapsed * 8) * 0.1;
    }
  });

  return (
    <group ref={groupRef} scale={[size, size, size]}>
      {/* Animated Phoenix GIF Sprite */}
      <mesh ref={phoenixRef} position={[0, 0, 0.1]}>
        <planeGeometry args={[2, 2]} />
        <primitive object={phoenixMaterial} attach="material" />
      </mesh>

      {/* Optional: Add particle trail effect for extra magic */}
      {flyAcross && (
        <mesh position={[-0.8, 0, 0]}>
          <planeGeometry args={[1, 0.5]} />
          <meshBasicMaterial color={0xffcf5c} transparent opacity={0.3} />
        </mesh>
      )}
    </group>
  );
}

export default function Phoenix3D({
  flyAcross = false,
  durationSec = 1.2,
  onComplete,
  size = 1,
}: PhoenixProps) {
  // Render the PhoenixModel directly without wrapper
  return (
    <PhoenixModel
      flyAcross={flyAcross}
      durationSec={durationSec}
      onComplete={onComplete}
      size={size}
    />
  );
}
