"use client";

/* eslint-disable @next/next/no-img-element */
export function HeroBg() {
  return (
    <img
      src="/hero-bg.jpg"
      alt=""
      aria-hidden
      className="absolute inset-0 w-full h-full object-cover object-center z-[1]"
      onError={(e) => {
        // Hide broken image gracefully when no hero-bg.jpg exists
        (e.currentTarget as HTMLImageElement).style.display = "none";
      }}
    />
  );
}
