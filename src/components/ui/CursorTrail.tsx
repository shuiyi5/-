"use client";

import { useEffect, useRef } from "react";

interface Point {
  x: number;
  y: number;
  age: number;
}

export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const points: Point[] = [];
    const maxPoints = 50;
    const maxAge = 40; // frames before a point fully fades
    let raf = 0;
    let mouseX = -100;
    let mouseY = -100;
    let isOnPage = false;

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    function onMouseMove(e: MouseEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isOnPage = true;
      points.push({ x: mouseX, y: mouseY, age: 0 });
      if (points.length > maxPoints) points.shift();
    }

    function onMouseLeave() {
      isOnPage = false;
    }

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);

    function draw() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      // Age all points
      for (let i = points.length - 1; i >= 0; i--) {
        points[i].age++;
        if (points[i].age > maxAge) {
          points.splice(i, 1);
        }
      }

      // Draw trail line
      if (points.length > 1) {
        for (let i = 1; i < points.length; i++) {
          const p = points[i];
          const progress = 1 - p.age / maxAge;
          const alpha = progress * 0.35;
          const lineWidth = progress * 1.5;

          if (alpha <= 0) continue;

          const prev = points[i - 1];
          ctx!.beginPath();
          ctx!.moveTo(prev.x, prev.y);
          ctx!.lineTo(p.x, p.y);
          ctx!.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
          ctx!.lineWidth = lineWidth;
          ctx!.lineCap = "round";
          ctx!.stroke();
        }
      }

      // Draw dots at each trail point
      for (const p of points) {
        const progress = 1 - p.age / maxAge;
        const alpha = progress * 0.5;
        const radius = progress * 2.5;

        if (alpha <= 0 || radius <= 0) continue;

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(99, 102, 241, ${alpha})`;
        ctx!.fill();
      }

      // Draw cursor glow dot
      if (isOnPage && points.length > 0) {
        const last = points[points.length - 1];
        ctx!.beginPath();
        ctx!.arc(last.x, last.y, 3, 0, Math.PI * 2);
        ctx!.fillStyle = "rgba(99, 102, 241, 0.6)";
        ctx!.fill();

        // Outer glow
        ctx!.beginPath();
        ctx!.arc(last.x, last.y, 8, 0, Math.PI * 2);
        ctx!.fillStyle = "rgba(99, 102, 241, 0.08)";
        ctx!.fill();
      }

      raf = requestAnimationFrame(draw);
    }

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999]"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
