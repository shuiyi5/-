"use client";

import { useEffect, useState, useCallback } from "react";
import { X, Copy, Check } from "lucide-react";
import type { GalleryItem } from "@/lib/data/types";

interface LightboxProps {
  item: GalleryItem;
  onClose: () => void;
}

export function Lightbox({ item, onClose }: LightboxProps) {
  const [copied, setCopied] = useState(false);
  const [imgError, setImgError] = useState(false);

  const close = useCallback(() => onClose(), [onClose]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [close]);

  const fullSrc = item.mediaUrl || item.cover || "";

  function copyText() {
    navigator.clipboard.writeText(item.description);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div
      className="fixed inset-0 z-[200] bg-black/90"
      onClick={close}
      style={{ isolation: "isolate" }}
    >
      {/* Close — absolute top-right of viewport */}
      <button
        onClick={close}
        className="absolute top-5 right-5 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        aria-label="Close"
      >
        <X size={20} />
      </button>

      {/* Two-column layout */}
      <div
        className="absolute inset-0 flex flex-col lg:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ====== LEFT: Image area (black, flex-1) ====== */}
        <div className="flex-1 flex items-center justify-center bg-black p-6 lg:p-10 min-h-0">
          {fullSrc && !imgError ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={fullSrc}
              alt={item.name}
              className="max-w-full max-h-full object-contain select-none"
              draggable={false}
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="text-white/20 text-sm">
              {item.language === "zh" ? "图片加载失败" : "Image failed to load"}
            </div>
          )}
        </div>

        {/* ====== RIGHT: Info panel (white/dark, fixed 420px) ====== */}
        <div className="w-full lg:w-[420px] shrink-0 bg-white dark:bg-[#111113] overflow-y-auto border-t lg:border-t-0 lg:border-l border-gray-200 dark:border-white/[0.06] max-h-[45vh] lg:max-h-none">
          <div className="p-6 lg:p-8 space-y-5">
            {/* Title */}
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight">
              {item.name}
            </h2>

            {/* Tags */}
            {item.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
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

            {/* Reference thumbnail */}
            {item.cover && (
              <div>
                <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                  {item.language === "zh" ? "参考图" : "Reference"}
                </h3>
                <div className="flex gap-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.cover}
                    alt="Ref"
                    className="w-16 h-16 rounded-lg object-cover border border-gray-200 dark:border-white/[0.08]"
                  />
                </div>
              </div>
            )}

            {/* PROMPT / Description */}
            {item.description && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    PROMPT
                  </h3>
                  <button
                    onClick={copyText}
                    className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-accent transition-colors"
                  >
                    {copied ? <Check size={13} /> : <Copy size={13} />}
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>
                <div className="p-4 rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap break-words">
                  {item.description}
                </div>
              </div>
            )}

            {/* Meta */}
            <div className="pt-3 border-t border-gray-100 dark:border-white/[0.06] flex items-center gap-2">
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
