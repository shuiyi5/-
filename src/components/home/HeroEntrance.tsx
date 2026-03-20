"use client";

import { useEffect, useState, type ReactNode } from "react";

interface HeroEntranceProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function HeroEntrance({
  children,
  delay = 0,
  className = "",
}: HeroEntranceProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(24px) scale(0.97)",
        transition: `opacity 900ms cubic-bezier(0.22, 1, 0.36, 1), transform 900ms cubic-bezier(0.22, 1, 0.36, 1)`,
      }}
    >
      {children}
    </div>
  );
}
