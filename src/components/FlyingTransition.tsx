"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import FallingObjects2D from "./FallingObjects2D";

type Trigger = (opts: { to: string; onBeforeNavigate?: () => void }) => void;

declare global {
  interface Window {
    flyPhoenixTo?: Trigger;
  }
}

export default function FlyingTransition() {
  const router = useRouter();
  const [active, setActive] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);
  const nextHrefRef = useRef<string | null>(null);

  useEffect(() => {
    window.flyPhoenixTo = ({ to, onBeforeNavigate }) => {
      nextHrefRef.current = to;
      if (onBeforeNavigate) onBeforeNavigate();
      setActive(true);
    };
    return () => {
      if (window.flyPhoenixTo) delete window.flyPhoenixTo;
    };
  }, []);

  const handleComplete = useCallback(() => {
    const href = nextHrefRef.current;
    nextHrefRef.current = null;

    // Start fade out
    setFadingOut(true);

    setTimeout(() => {
      setActive(false);
      setFadingOut(false);
      if (href) {
        router.push(href);
      }
    }, 300); // Fade out duration
  }, [router]);

  // Auto-complete after 3.5 seconds of animation
  useEffect(() => {
    if (active) {
      const timer = setTimeout(() => {
        handleComplete();
      }, 6500);
      return () => clearTimeout(timer);
    }
  }, [active, handleComplete]);

  return (
    <>
      {active && (
        <div
          className={`fixed inset-0 z-[1000] pointer-events-none transition-opacity duration-300 ${
            fadingOut ? "opacity-0" : "opacity-100"
          }`}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 100,
          }}
        >
          {/* 2D Falling Objects */}
          <FallingObjects2D active={active} />
        </div>
      )}
    </>
  );
}
