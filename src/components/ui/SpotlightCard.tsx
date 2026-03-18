"use client";

import { useRef, useState, type ReactNode, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "article";
}

export function SpotlightCard({
  children,
  className,
  as: Tag = "div",
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  function handleMouseMove(e: MouseEvent) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ref.current.style.setProperty("--spot-x", `${x}px`);
    ref.current.style.setProperty("--spot-y", `${y}px`);
  }

  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement>}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={cn("spotlight-card relative overflow-hidden", className)}
    >
      {/* Border glow overlay */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-10 rounded-[inherit] transition-opacity duration-300",
          isHovering ? "opacity-100" : "opacity-0"
        )}
        style={{
          background:
            "radial-gradient(400px circle at var(--spot-x) var(--spot-y), rgba(99,102,241,0.12), transparent 60%)",
        }}
      />
      {/* Inner surface glow */}
      <div
        className={cn(
          "pointer-events-none absolute inset-px z-10 rounded-[inherit] transition-opacity duration-300",
          isHovering ? "opacity-100" : "opacity-0"
        )}
        style={{
          background:
            "radial-gradient(300px circle at var(--spot-x) var(--spot-y), rgba(99,102,241,0.06), transparent 50%)",
        }}
      />
      {children}
    </Tag>
  );
}
