"use client";

import { useState, useRef } from "react";
import { Play, Pause } from "lucide-react";

interface AudioPlayerProps {
  src: string;
  title: string;
}

export function AudioPlayer({ src, title }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  function togglePlay() {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  }

  function onTimeUpdate() {
    if (!audioRef.current) return;
    const pct =
      (audioRef.current.currentTime / audioRef.current.duration) * 100;
    setProgress(pct || 0);
  }

  function onSeek(e: React.MouseEvent<HTMLDivElement>) {
    if (!audioRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = pct * audioRef.current.duration;
  }

  return (
    <div className="flex items-center gap-3 p-3 rounded-lg glass-card">
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={onTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />
      <button
        onClick={togglePlay}
        className="shrink-0 w-9 h-9 rounded-full bg-accent flex items-center justify-center text-white hover:bg-accent-dark transition-colors"
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
      </button>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-[var(--text-primary)] truncate">{title}</p>
        <div
          className="mt-1 h-1 rounded-full bg-[var(--border)] cursor-pointer"
          onClick={onSeek}
        >
          <div
            className="h-full rounded-full bg-accent transition-[width] duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
