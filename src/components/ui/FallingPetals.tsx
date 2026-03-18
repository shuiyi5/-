"use client";

import { useEffect, useRef } from "react";

interface Petal {
  x: number;
  y: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  speedY: number;
  speedX: number;
  swayAmplitude: number;
  swaySpeed: number;
  swayOffset: number;
  opacity: number;
  color: string;
}

const PETAL_COLORS = [
  "rgba(255, 183, 197, ALPHA)", // light pink
  "rgba(255, 154, 172, ALPHA)", // medium pink
  "rgba(255, 200, 210, ALPHA)", // pale pink
  "rgba(255, 130, 160, ALPHA)", // deeper pink
  "rgba(255, 220, 230, ALPHA)", // very pale pink
];

export function FallingPetals({ count = 45 }: { count?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let petals: Petal[] = [];

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }

    function createPetal(startFromTop = false): Petal {
      const w = canvas!.width;
      const h = canvas!.height;
      return {
        x: Math.random() * w,
        y: startFromTop ? -Math.random() * h * 0.3 : Math.random() * h,
        size: 14 + Math.random() * 18,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.03,
        speedY: 0.5 + Math.random() * 1.0,
        speedX: (Math.random() - 0.5) * 0.3,
        swayAmplitude: 30 + Math.random() * 60,
        swaySpeed: 0.004 + Math.random() * 0.01,
        swayOffset: Math.random() * Math.PI * 2,
        opacity: 0.35 + Math.random() * 0.45,
        color:
          PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
      };
    }

    function init() {
      resize();
      petals = Array.from({ length: count }, () => createPetal(false));
    }

    init();

    const onResize = () => {
      resize();
      petals = Array.from({ length: count }, () => createPetal(false));
    };
    window.addEventListener("resize", onResize);

    let time = 0;

    function drawPetal(p: Petal) {
      ctx!.save();
      ctx!.translate(p.x, p.y);
      ctx!.rotate(p.rotation);
      ctx!.globalAlpha = p.opacity;

      // Draw petal shape (two bezier curves forming a petal)
      const s = p.size;
      ctx!.beginPath();
      ctx!.moveTo(0, 0);
      ctx!.bezierCurveTo(s * 0.4, -s * 0.35, s * 0.8, -s * 0.2, s, 0);
      ctx!.bezierCurveTo(s * 0.8, s * 0.2, s * 0.4, s * 0.35, 0, 0);
      ctx!.fillStyle = p.color.replace("ALPHA", String(p.opacity));
      ctx!.fill();

      // Subtle center vein
      ctx!.beginPath();
      ctx!.moveTo(s * 0.1, 0);
      ctx!.lineTo(s * 0.8, 0);
      ctx!.strokeStyle = p.color.replace("ALPHA", String(p.opacity * 0.25));
      ctx!.lineWidth = 0.6;
      ctx!.stroke();

      ctx!.restore();
    }

    function animate() {
      time++;
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];

        // Update position
        p.y += p.speedY;
        p.x +=
          p.speedX +
          Math.sin(time * p.swaySpeed + p.swayOffset) * p.swayAmplitude * 0.012;
        p.rotation += p.rotationSpeed;

        // Reset petal when it goes off screen
        if (p.y > canvas!.height + p.size * 2) {
          petals[i] = createPetal(true);
          petals[i].y = -petals[i].size * 2;
        }

        // Wrap horizontally
        if (p.x > canvas!.width + p.size * 2) {
          p.x = -p.size * 2;
        } else if (p.x < -p.size * 2) {
          p.x = canvas!.width + p.size * 2;
        }

        drawPetal(p);
      }

      raf = requestAnimationFrame(animate);
    }

    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50"
    />
  );
}
