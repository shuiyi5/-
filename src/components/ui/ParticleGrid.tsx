"use client";

import { useEffect, useRef } from "react";

interface ParticleGridProps {
  className?: string;
}

export function ParticleGrid({ className }: ParticleGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const spacing = 32;
    const baseRadius = 1;
    const maxRadius = 3;
    const influenceRadius = 150;
    let raf = 0;
    let mouseX = -1000;
    let mouseY = -1000;

    // Dots data
    let dots: { x: number; y: number; baseX: number; baseY: number }[] = [];

    function buildGrid() {
      const rect = canvas!.getBoundingClientRect();
      canvas!.width = rect.width;
      canvas!.height = rect.height;

      dots = [];
      const cols = Math.ceil(rect.width / spacing) + 1;
      const rows = Math.ceil(rect.height / spacing) + 1;
      const offsetX = (rect.width - (cols - 1) * spacing) / 2;
      const offsetY = (rect.height - (rows - 1) * spacing) / 2;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = offsetX + c * spacing;
          const y = offsetY + r * spacing;
          dots.push({ x, y, baseX: x, baseY: y });
        }
      }
    }

    buildGrid();
    window.addEventListener("resize", buildGrid);

    function onMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    }

    function onMouseLeave() {
      mouseX = -1000;
      mouseY = -1000;
    }

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);
    // Also listen globally so the grid reacts even when pointer-events are on a parent
    window.addEventListener("mousemove", (e: MouseEvent) => {
      const rect = canvas!.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    });

    function draw() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      for (const dot of dots) {
        const dx = mouseX - dot.baseX;
        const dy = mouseY - dot.baseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let radius = baseRadius;
        let alpha = 0.15;
        let offsetX = 0;
        let offsetY = 0;

        if (dist < influenceRadius) {
          const factor = 1 - dist / influenceRadius;
          const easedFactor = factor * factor; // ease-out quadratic

          radius = baseRadius + (maxRadius - baseRadius) * easedFactor;
          alpha = 0.15 + 0.55 * easedFactor;

          // Push dots slightly away from cursor
          const pushStrength = 6 * easedFactor;
          const angle = Math.atan2(dy, dx);
          offsetX = -Math.cos(angle) * pushStrength;
          offsetY = -Math.sin(angle) * pushStrength;
        }

        // Lerp dot position toward target for smooth movement
        dot.x += (dot.baseX + offsetX - dot.x) * 0.15;
        dot.y += (dot.baseY + offsetY - dot.y) * 0.15;

        ctx!.beginPath();
        ctx!.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(99, 102, 241, ${alpha})`;
        ctx!.fill();
      }

      // Draw connecting lines between nearby influenced dots
      for (let i = 0; i < dots.length; i++) {
        const a = dots[i];
        const dxA = mouseX - a.baseX;
        const dyA = mouseY - a.baseY;
        const distA = Math.sqrt(dxA * dxA + dyA * dyA);
        if (distA >= influenceRadius) continue;

        for (let j = i + 1; j < dots.length; j++) {
          const b = dots[j];
          const dxB = mouseX - b.baseX;
          const dyB = mouseY - b.baseY;
          const distB = Math.sqrt(dxB * dxB + dyB * dyB);
          if (distB >= influenceRadius) continue;

          const dotDist = Math.sqrt(
            (a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y)
          );
          if (dotDist > spacing * 1.5) continue;

          const factorA = 1 - distA / influenceRadius;
          const factorB = 1 - distB / influenceRadius;
          const lineAlpha = factorA * factorB * 0.2;

          ctx!.beginPath();
          ctx!.moveTo(a.x, a.y);
          ctx!.lineTo(b.x, b.y);
          ctx!.strokeStyle = `rgba(99, 102, 241, ${lineAlpha})`;
          ctx!.lineWidth = 0.5;
          ctx!.stroke();
        }
      }

      raf = requestAnimationFrame(draw);
    }

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", buildGrid);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className ?? "absolute inset-0 w-full h-full"}
    />
  );
}
