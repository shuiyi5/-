"use client";

import { useRef, useEffect } from "react";

export function HeroGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const raf = useRef<number>(0);

  useEffect(() => {
    function onMouseMove(e: MouseEvent) {
      mouse.current = { x: e.clientX, y: e.clientY };
    }

    function animate() {
      // Lerp for smooth following
      current.current.x += (mouse.current.x - current.current.x) * 0.08;
      current.current.y += (mouse.current.y - current.current.y) * 0.08;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${current.current.x - 300}px, ${current.current.y - 300}px)`;
      }

      raf.current = requestAnimationFrame(animate);
    }

    window.addEventListener("mousemove", onMouseMove);
    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-0 w-[600px] h-[600px] rounded-full opacity-20 dark:opacity-15 will-change-transform"
      style={{
        background:
          "radial-gradient(circle, rgba(99,102,241,0.25) 0%, rgba(99,102,241,0.08) 40%, transparent 70%)",
        filter: "blur(60px)",
      }}
    />
  );
}
