"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Music2,
  X,
  ChevronUp,
  ChevronDown,
  ListMusic,
  Loader2,
  Repeat,
} from "lucide-react";

import { useMusicPlayer, formatTime } from "@/hooks/use-music-player";
import { musicPlayerConfig } from "@/config/music-player";

// ─── Marquee title (active player + playlist rows) ───────────────────────────
/**
 * Renders a title that scrolls horizontally when it overflows the container.
 * Short titles receive no animation — the CSS animation is a no-op when the
 * content width ≤ the container width because scaleX transform starts at 0.
 *
 * The trick: we duplicate the text with aria-hidden so the loop is seamless.
 */
function MarqueeTitle({
  title,
  className,
  speed = 12,
}: {
  title: string;
  className?: string;
  /** Animation duration in seconds.  Longer = slower scroll. */
  speed?: number;
}) {
  return (
    <div
      className={`overflow-hidden whitespace-nowrap ${className ?? ""}`}
      aria-label={title}
    >
      <span
        className="inline-block"
        style={{
          animation: `marquee-title ${speed}s linear infinite`,
          paddingRight: "2rem",
        }}
        title={title}
      >
        {title}
        <span aria-hidden="true" className="ml-8">
          {title}
        </span>
      </span>
    </div>
  );
}

// ─── Cover image with graceful fallback ──────────────────────────────────────
function CoverImage({
  src,
  alt,
  size = 40,
  className = "",
}: {
  src: string;
  alt: string;
  size?: number;
  className?: string;
}) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div
        className={`flex items-center justify-center rounded-lg flex-shrink-0 ${className}`}
        style={{
          width: size,
          height: size,
          background: "linear-gradient(135deg, var(--p), var(--s))",
        }}
        aria-hidden="true"
      >
        <Music2 size={Math.round(size * 0.4)} className="text-white" />
      </div>
    );
  }

  return (
    <div
      className={`relative rounded-lg overflow-hidden flex-shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={`${size}px`}
        className="object-cover"
        onError={() => setErrored(true)}
        unoptimized
      />
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export function MusicPlayer() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  // Initialise playlist visibility from config default
  const [showPlaylist, setShowPlaylist] = useState<boolean>(
    musicPlayerConfig.showPlaylist,
  );

  /** Playlist scroll container — we stop Lenis from hijacking it. */
  const playlistRef = useRef<HTMLDivElement>(null);

  const {
    playlist,
    current,
    currentIndex,
    isPlaying,
    isLoading,
    muted,
    loop,
    volume,
    progress,
    duration,
    progressPct,
    audioRef,
    togglePlay,
    skipTo,
    skipNext,
    skipPrev,
    seek,
    setVolumeValue,
    toggleMute,
    toggleLoop,
  } = useMusicPlayer();

  if (!current) return null;

  return (
    <>
      {/*
       * Keyed by currentIndex → React re-mounts on track change, setting a
       * fresh src and firing all audio events from scratch.
       * preload="none" → no bytes until play() is called.
       */}
      <audio
        key={currentIndex}
        ref={audioRef}
        src={current.audio}
        preload="none"
        aria-label={`Now playing: ${current.title}`}
      />

      {/* ── FAB toggle ──────────────────────────────────────────────────────── */}
      <button
        type="button"
        id="music-player-toggle"
        aria-label={visible ? "Hide music player" : "Show music player"}
        onClick={() => setVisible((v) => !v)}
        style={{
          background: visible ? "var(--p)" : "var(--surface)",
          border: `1px solid ${visible ? "var(--p)" : "var(--border)"}`,
          boxShadow:
            isPlaying && !visible ? `0 0 0 2px var(--p-glow)` : undefined,
        }}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setVisible((v) => !v);
          }
        }}
      >
        {visible ? (
          <X size={18} className="text-white" />
        ) : (
          <Music2
            size={18}
            style={{
              color: isPlaying ? "var(--p)" : "var(--muted-foreground)",
            }}
            className={isPlaying ? "animate-pulse" : ""}
          />
        )}
      </button>

      {/* ── Player panel ────────────────────────────────────────────────────── */}
      <div
        className={`fixed bottom-20 right-6 z-50 w-80 rounded-2xl backdrop-blur-xl shadow-2xl transition-all duration-300 ${
          visible
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        style={{
          background: "color-mix(in srgb, var(--surface) 95%, transparent)",
          border: "1px solid var(--border)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px var(--border)",
        }}
        role="region"
        aria-label="Music player"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)]">
          <div className="flex items-center gap-2">
            <Music2 size={14} style={{ color: "var(--p)" }} />
            <span
              className="text-xs font-semibold tracking-wide"
              style={{ color: "var(--foreground)" }}
            >
              Mood Player
            </span>
          </div>
          <div className="flex items-center gap-1">
            {/* Loop toggle */}
            <button
              type="button"
              aria-label={loop ? "Disable loop" : "Enable loop"}
              aria-pressed={loop}
              onClick={toggleLoop}
              className="p-1.5 rounded-lg hover:bg-[var(--accent)] transition-colors"
              style={{ color: loop ? "var(--p)" : "var(--muted-foreground)" }}
            >
              <Repeat size={13} />
            </button>

            {/* Playlist toggle — conditionally rendered per config */}
            {musicPlayerConfig.showPlaylist && (
              <button
                type="button"
                aria-label="Toggle playlist"
                onClick={() => setShowPlaylist((v) => !v)}
                className="p-1.5 rounded-lg hover:bg-[var(--accent)] transition-colors"
                style={{
                  color: showPlaylist ? "var(--p)" : "var(--muted-foreground)",
                }}
              >
                <ListMusic size={13} />
              </button>
            )}

            {/* Expand / collapse */}
            <button
              type="button"
              aria-label={expanded ? "Collapse player" : "Expand player"}
              onClick={() => setExpanded((v) => !v)}
              className="p-1.5 rounded-lg hover:bg-[var(--accent)] transition-colors"
              style={{ color: "var(--muted-foreground)" }}
            >
              {expanded ? <ChevronDown size={13} /> : <ChevronUp size={13} />}
            </button>
          </div>
        </div>

        {/* Track info */}
        <div className="px-4 pt-4 pb-2">
          <div className="flex items-center gap-3">
            {/* Cover art — conditional per config */}
            {musicPlayerConfig.showTrackCover && (
              <CoverImage
                src={current.cover}
                alt={`Cover for ${current.title}`}
                size={44}
                className="ring-1 ring-[var(--border)]"
              />
            )}

            {/* Scrolling title */}
            <div className="flex-1 min-w-0 overflow-hidden">
              <MarqueeTitle
                title={current.title}
                className="text-sm font-semibold"
              />
            </div>

            {/* Loading spinner */}
            {isLoading && (
              <Loader2
                size={14}
                className="animate-spin flex-shrink-0"
                style={{ color: "var(--p)" }}
                aria-label="Loading"
              />
            )}
          </div>
        </div>

        {/* Progress bar */}
        <div className="px-4 pb-2">
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={progress}
            onChange={(e) => seek(Number(e.target.value))}
            aria-label="Seek position"
            className="w-full h-1 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, var(--p) ${progressPct}%, var(--border) ${progressPct}%)`,
            }}
          />
          <div
            className="flex justify-between text-xs mt-1"
            style={{ color: "var(--muted-foreground)" }}
          >
            <span>{formatTime(progress)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 px-4 pb-4">
          <button
            type="button"
            aria-label="Previous track"
            onClick={skipPrev}
            className="p-2 rounded-full hover:bg-[var(--accent)] transition-colors"
            style={{ color: "var(--muted-foreground)" }}
          >
            <SkipBack size={16} />
          </button>

          <button
            type="button"
            aria-label={isPlaying ? "Pause" : "Play"}
            onClick={togglePlay}
            className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform"
            style={{
              background: "linear-gradient(135deg, var(--p), var(--s))",
              boxShadow: `0 4px 16px var(--p-glow)`,
            }}
          >
            {isPlaying ? (
              <Pause size={16} />
            ) : (
              <Play size={16} className="ml-0.5" />
            )}
          </button>

          <button
            type="button"
            aria-label="Next track"
            onClick={skipNext}
            className="p-2 rounded-full hover:bg-[var(--accent)] transition-colors"
            style={{ color: "var(--muted-foreground)" }}
          >
            <SkipForward size={16} />
          </button>
        </div>

        {/* Volume row — always visible when showVolumeBar is true in config */}
        {musicPlayerConfig.showVolumeBar && (
          <div className="flex items-center gap-2 px-4 pb-4">
            <button
              type="button"
              aria-label={muted ? "Unmute" : "Mute"}
              onClick={toggleMute}
              className="hover:text-[var(--foreground)] transition-colors"
              style={{ color: "var(--muted-foreground)" }}
            >
              {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={muted ? 0 : volume}
              onChange={(e) => setVolumeValue(Number(e.target.value))}
              aria-label="Volume control"
              className="flex-1 h-1 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, var(--p) ${
                  (muted ? 0 : volume) * 100
                }%, var(--border) ${(muted ? 0 : volume) * 100}%)`,
              }}
            />
          </div>
        )}

        {/* Playlist */}
        {musicPlayerConfig.showPlaylist && showPlaylist && (
          /*
           * data-lenis-prevent stops Lenis from hijacking wheel events so
           * native overflow-y-scroll works correctly inside the panel.
           */
          <div
            ref={playlistRef}
            data-lenis-prevent
            className="border-t border-[var(--border)] overflow-y-scroll"
            style={{ maxHeight: "12rem" }}
          >
            {playlist.map((track, idx) => (
              <button
                key={track.slug}
                type="button"
                onClick={() => skipTo(idx)}
                className="w-full flex items-center gap-3 px-3 py-2 text-left transition-colors hover:bg-[var(--accent)]"
                style={{
                  background:
                    idx === currentIndex ? "var(--p-glow-soft)" : undefined,
                }}
              >
                {/* Row cover */}
                <CoverImage src={track.cover} alt={track.title} size={28} />

                {/* Row index / playing indicator */}
                <span
                  className="text-xs w-4 text-center flex-shrink-0 tabular-nums"
                  style={{
                    color:
                      idx === currentIndex
                        ? "var(--p)"
                        : "var(--muted-foreground)",
                  }}
                >
                  {idx === currentIndex && isPlaying ? "▶" : idx + 1}
                </span>

                {/* Row title — marquee for long names, static for short ones */}
                <div
                  className="flex-1 min-w-0 overflow-hidden"
                  style={{
                    color:
                      idx === currentIndex ? "var(--p)" : "var(--foreground)",
                  }}
                >
                  <MarqueeTitle
                    title={track.title}
                    className="text-xs font-medium"
                    // Slower speed for playlist rows so they don't feel frantic
                    speed={idx === currentIndex ? 10 : 14}
                  />
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
