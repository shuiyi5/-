"use client";

import { useEffect, useState } from "react";
import { X, ImageIcon, Copy, Check } from "lucide-react";
import Image from "next/image";
import type { GalleryItem } from "@/lib/data/types";

interface LightboxProps {
  item: GalleryItem;
  onClose: () => void;
}

export function Lightbox({ item, onClose }: LightboxProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const fullSrc = item.mediaUrl || item.cover || "";

  function copyText() {
    navigator.clipboard.writeText(item.description);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-0 md:p-6 lg:p-10"
      onClick={onClose}
    >
      {/* Close button — fixed top-right */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-black/50 text-white/70 hover:text-white hover:bg-black/70 transition-colors backdrop-blur-sm"
        aria-label="Close"
      >
        <X size={18} />
      </button>

      {/* Container: flex-1 image left + fixed 420px info right */}
      <div
        className="flex flex-col lg:flex-row w-full h-full lg:h-auto lg:max-h-[88vh] max-w-7xl rounded-none md:rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Left: Illustration area (black bg, centered) ── */}
        <div className="flex-1 relative bg-black flex items-center justify-center min-h-[40vh] lg:min-h-[500px]">
          {fullSrc ? (
            <Image
              src={fullSrc}
              alt={item.name}
              width={1400}
              height={900}
              className="max-w-full max-h-full object-contain p-4"
              priority
            />
          ) : (
            <ImageIcon size={56} className="text-white/10" />
          )}
        </div>

        {/* ── Right: Info card area (white/dark bg, fixed 420px) ── */}
        <div className="w-full lg:w-[420px] shrink-0 bg-white dark:bg-[#111113] overflow-y-auto border-t lg:border-t-0 lg:border-l border-gray-200 dark:border-white/[0.06]">
          <div className="p-6 lg:p-8">
            {/* Title — large, clear hierarchy */}
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight">
              {item.name}
            </h2>

            {/* Tags — rounded pill style */}
            {item.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 rounded-full bg-gray-100 dark:bg-white/[0.06] text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-white/[0.08]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Reference thumbnails — if cover and mediaUrl differ */}
            {item.cover && item.mediaUrl && item.cover !== item.mediaUrl && (
              <div className="mt-6">
                <h3 className="text-xs font-medium text-gray-500 dark:text-gray-500 uppercase tracking-wider mb-3">
                  {item.language === "zh" ? "参考图" : "Reference"}
                </h3>
                <div className="flex gap-3">
                  <div className="relative w-[72px] h-[72px] rounded-xl overflow-hidden border border-gray-200 dark:border-white/[0.08] group/thumb">
                    <Image
                      src={item.cover}
                      alt="Thumbnail"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-black/50 text-center py-0.5">
                      <span className="text-[10px] text-white/80">
                        {item.language === "zh" ? "效果图" : "Result"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* PROMPT / Description — light gray box with copy */}
            {item.description && (
              <div className="mt-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-medium text-gray-500 dark:text-gray-500 uppercase tracking-wider">
                    PROMPT
                  </h3>
                  <button
                    onClick={copyText}
                    className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500 hover:text-accent transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check size={13} />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy size={13} />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="p-4 rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {item.description}
                </div>
              </div>
            )}

            {/* Type + meta */}
            <div className="mt-6 pt-4 border-t border-gray-100 dark:border-white/[0.06] flex items-center gap-2">
              <span className="text-xs px-2.5 py-1 rounded-full bg-gray-100 dark:bg-white/[0.06] text-gray-500 dark:text-gray-400">
                {item.type}
              </span>
              <span className="text-xs text-gray-400 dark:text-gray-600">
                {item.language === "zh" ? "中文" : "English"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
