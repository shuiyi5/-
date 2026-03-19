"use client";

import { useState } from "react";
import { ImageIcon, Music, Video, Palette } from "lucide-react";
import type { GalleryItem } from "@/lib/data/types";
import { Lightbox } from "./Lightbox";
import { AudioPlayer } from "./AudioPlayer";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

const typeIcons = {
  Image: ImageIcon,
  Music: Music,
  Video: Video,
  Design: Palette,
};

export function GalleryCard({ item }: { item: GalleryItem }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const Icon = typeIcons[item.type];

  return (
    <>
      <SpotlightCard className="glass-card gradient-border rounded-2xl overflow-hidden group">
        {/* Cover / Preview */}
        {item.cover ? (
          <div
            className={
              item.type === "Image"
                ? "cursor-pointer"
                : ""
            }
            onClick={() => {
              if (item.type === "Image" && (item.mediaUrl || item.cover)) {
                setLightboxOpen(true);
              }
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.cover}
              alt={item.name}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        ) : (
          <div className="h-48 bg-gradient-to-br from-accent/15 via-purple-500/10 to-pink-500/5 flex items-center justify-center">
            <Icon size={32} className="text-accent/30" />
          </div>
        )}

        <div className="p-4">
          {/* Type badge + name */}
          <div className="flex items-center gap-2 mb-1">
            <Icon size={14} className="text-accent/60" />
            <span className="text-xs text-accent/60">{item.type}</span>
          </div>
          <h3 className="font-semibold text-sm group-hover:text-accent transition-colors">
            {item.name}
          </h3>
          <p className="mt-1 text-xs text-[var(--text-secondary)] line-clamp-2">
            {item.description}
          </p>

          {/* Tags */}
          {item.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] px-1.5 py-0.5 rounded-full bg-accent/5 text-[var(--text-secondary)] border border-accent/10"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Music: embed or audio player */}
          {item.type === "Music" && item.embedUrl && (
            <div className="mt-3">
              <iframe
                src={item.embedUrl}
                className="w-full h-[66px] rounded-lg"
                frameBorder="0"
                allow="autoplay"
                title={item.name}
              />
            </div>
          )}
          {item.type === "Music" && !item.embedUrl && item.mediaUrl && (
            <div className="mt-3">
              <AudioPlayer src={item.mediaUrl} title={item.name} />
            </div>
          )}

          {/* Video: embed */}
          {item.type === "Video" && item.embedUrl && (
            <div className="mt-3 aspect-video rounded-lg overflow-hidden">
              <iframe
                src={item.embedUrl}
                className="w-full h-full"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; encrypted-media"
                title={item.name}
              />
            </div>
          )}

          {/* Image: click hint */}
          {item.type === "Image" && (item.mediaUrl || item.cover) && (
            <button
              onClick={() => setLightboxOpen(true)}
              className="mt-3 text-xs text-accent/60 hover:text-accent transition-colors"
            >
              {item.language === "zh" ? "点击查看大图" : "Click to view full size"}
            </button>
          )}
        </div>
      </SpotlightCard>

      {/* Lightbox for images */}
      {lightboxOpen && (
        <Lightbox
          src={item.mediaUrl || item.cover || ""}
          alt={item.name}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  );
}
