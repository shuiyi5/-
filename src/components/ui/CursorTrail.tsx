"use client";

import { useEffect, useRef } from "react";

interface Point {
  x: number;
  y: number;
  age: number;
}

interface Sparkle {
  x: number;
  y: number;
  size: number;
  age: number;
  maxAge: number;
  rotation: number;
}

export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const points: Point[] = [];
    const sparkles: Sparkle[] = [];
    const maxPoints = 50;
    const maxAge = 40;
    let raf = 0;
    let mouseX = -100;
    let mouseY = -100;
    let isOnPage = false;
    let frameCount = 0;

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

      if (frameCount % 3 === 0) {
        sparkles.push({
          x: mouseX + (Math.random() - 0.5) * 20,
          y: mouseY + (Math.random() - 0.5) * 20,
          size: 2 + Math.random() * 4,
          age: 0,
          maxAge: 20 + Math.random() * 15,
          rotation: Math.random() * Math.PI * 2,
        });
      }
    }

    function onMouseLeave() {
      isOnPage = false;
    }

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);

    function drawStar(cx: number, cy: number, size: number, rotation: number, alpha: number) {
      ctx!.save();
      ctx!.translate(cx, cy);
      ctx!.rotate(rotation);
      ctx!.globalAlpha = alpha;

      ctx!.beginPath();
      for (let i = 0; i < 4; i++) {
        const angle = (i * Math.PI) / 2;
        const outerX = Math.cos(angle) * size;
        const outerY = Math.sin(angle) * size;
        const innerAngle = angle + Math.PI / 4;
        const innerX = Math.cos(innerAngle) * size * 0.3;
        const innerY = Math.sin(innerAngle) * size * 0.3;

        if (i === 0) {
          ctx!.moveTo(outerX, outerY);
        } else {
          ctx!.lineTo(outerX, outerY);
        }
        ctx!.lineTo(innerX, innerY);
      }
      ctx!.closePath();
      ctx!.fillStyle = `rgba(255, 183, 197, ${alpha})`;
      ctx!.fill();
      ctx!.restore();
    }

    function draw() {
      frameCount++;
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      for (let i = points.length - 1; i >= 0; i--) {
        points[i].age++;
        if (points[i].age > maxAge) {
          points.splice(i, 1);
        }
      }

      for (let i = sparkles.length - 1; i >= 0; i--) {
        sparkles[i].age++;
        if (sparkles[i].age > sparkles[i].maxAge) {
          sparkles.splice(i, 1);
        }
      }

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
          ctx!.strokeStyle = `rgba(244, 114, 182, ${alpha})`;
          ctx!.lineWidth = lineWidth;
          ctx!.lineCap = "round";
          ctx!.stroke();
        }
      }

      for (const p of points) {
        const progress = 1 - p.age / maxAge;
        const alpha = progress * 0.5;
        const radius = progress * 2.5;

        if (alpha <= 0 || radius <= 0) continue;

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(244, 114, 182, ${alpha})`;
        ctx!.fill();
      }

      for (const s of sparkles) {
        const progress = 1 - s.age / s.maxAge;
        const alpha = progress * 0.7;
        const scale = progress;
        drawStar(s.x, s.y, s.size * scale, s.rotation + s.age * 0.05, alpha);
      }

      if (isOnPage && points.length > 0) {
        const last = points[points.length - 1];
        ctx!.beginPath();
        ctx!.arc(last.x, last.y, 3, 0, Math.PI * 2);
        ctx!.fillStyle = "rgba(244, 114, 182, 0.6)";
        ctx!.fill();

        ctx!.beginPath();
        ctx!.arc(last.x, last.y, 8, 0, Math.PI * 2);
        ctx!.fillStyle = "rgba(244, 114, 182, 0.08)";
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
