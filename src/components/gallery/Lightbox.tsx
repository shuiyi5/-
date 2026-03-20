"use client";

import { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { X, Copy, Check } from "lucide-react";
import Image from "next/image";
import type { GalleryItem } from "@/lib/data/types";

interface LightboxProps {
  item: GalleryItem;
  onClose: () => void;
}

function LightboxContent({ item, onClose }: LightboxProps) {
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
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 99999,
        background: "rgba(0,0,0,0.92)",
        display: "flex",
        flexDirection: "column",
      }}
      onClick={close}
    >
      {/* Close button */}
      <button
        onClick={close}
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          zIndex: 10,
          width: 40,
          height: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.1)",
          border: "none",
          cursor: "pointer",
          color: "rgba(255,255,255,0.7)",
        }}
        aria-label="Close"
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(255,255,255,0.2)";
          e.currentTarget.style.color = "#fff";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(255,255,255,0.1)";
          e.currentTarget.style.color = "rgba(255,255,255,0.7)";
        }}
      >
        <X size={20} />
      </button>

      {/* Main layout */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "100%",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* LEFT: Image (black bg, centered) */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#000",
            padding: 32,
            minWidth: 0,
          }}
        >
          {fullSrc && !imgError ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={fullSrc}
              alt={item.name}
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
                userSelect: "none",
              }}
              draggable={false}
              onError={() => setImgError(true)}
            />
          ) : (
            <div style={{ color: "rgba(255,255,255,0.2)", fontSize: 14 }}>
              {item.language === "zh" ? "图片加载失败" : "Image failed to load"}
            </div>
          )}
        </div>

        {/* RIGHT: Info panel (420px, white/dark) */}
        <div
          className="lightbox-info"
          style={{
            width: 420,
            flexShrink: 0,
            overflowY: "auto",
            borderLeft: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div style={{ padding: "32px" }}>
            {/* Title */}
            <h2 className="text-2xl font-bold text-white leading-tight">
              {item.name}
            </h2>

            {/* Tags */}
            {item.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 rounded-full bg-white/[0.06] text-gray-400 border border-white/[0.08]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Reference thumbnail — uses next/image, hits Vercel cache from card */}
            {item.cover && (
              <div className="mt-6">
                <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                  {item.language === "zh" ? "参考图" : "Reference"}
                </h3>
                <div className="flex gap-2">
                  <Image
                    src={item.cover}
                    alt="Ref"
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-lg object-cover border border-white/[0.08]"
                  />
                </div>
              </div>
            )}

            {/* PROMPT */}
            {item.description && (
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    PROMPT
                  </h3>
                  <button
                    onClick={copyText}
                    className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-white transition-colors"
                  >
                    {copied ? <Check size={13} /> : <Copy size={13} />}
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-gray-300 leading-relaxed whitespace-pre-wrap break-words">
                  {item.description}
                </div>
              </div>
            )}

            {/* Meta */}
            <div className="mt-6 pt-3 border-t border-white/[0.06] flex items-center gap-2">
              <span className="text-xs px-2.5 py-1 rounded-full bg-white/[0.06] text-gray-400">
                {item.type}
              </span>
              <span className="text-xs text-gray-600">
                {item.language === "zh" ? "中文" : "English"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Renders Lightbox via React Portal to document.body — escapes all parent CSS */
export function Lightbox(props: LightboxProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <LightboxContent {...props} />,
    document.body
  );
}
