"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { isTrack, type Track } from "@/types/music";
import { musicPlayerConfig } from "@/config/music-player";
import { VOLUME_STORAGE_KEY } from "@/constants/music";
import { audioUrl, musicCoverUrl } from "@/lib/asset-url";
import playlistData from "@/../public/music/playlist.json";

/**
 * Validate & sanitize raw JSON import so malformed entries are silently dropped.
 * Also rewrite audio/cover paths through the CDN resolver so production
 * automatically serves from Cloudflare R2.
 */
const playlist: Track[] = (Array.isArray(playlistData) ? playlistData : [])
  .filter(isTrack)
  .map((t) => ({
    ...t,
    audio: audioUrl(t.audio),
    cover: musicCoverUrl(t.cover),
  }));

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Read a persisted volume from localStorage.  Returns null when unavailable. */
function readStoredVolume(): number | null {
  if (!musicPlayerConfig.persistVolume) return null;
  try {
    const raw = localStorage.getItem(VOLUME_STORAGE_KEY);
    if (raw === null) return null;
    const parsed = Number(raw);
    return Number.isFinite(parsed) && parsed >= 0 && parsed <= 1
      ? parsed
      : null;
  } catch {
    return null;
  }
}

/** Persist volume to localStorage when the feature is enabled. */
function storeVolume(value: number): void {
  if (!musicPlayerConfig.persistVolume) return;
  try {
    localStorage.setItem(VOLUME_STORAGE_KEY, String(value));
  } catch {
    // localStorage unavailable (e.g. private browsing quota) — silently skip
  }
}

// ─── Formatting helper (re-exported for the component) ───────────────────────
export function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

// ─── Hook ────────────────────────────────────────────────────────────────────
export function useMusicPlayer() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [loop, setLoopState] = useState<boolean>(musicPlayerConfig.loop);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Volume state — default value is used during SSR and as a fallback.
  // A mount effect (below) overwrites this from localStorage on the client.
  const [volume, setVolume] = useState<number>(musicPlayerConfig.defaultVolume);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // ── Hydrate volume from localStorage after client mount ─────────────────────
  // The lazy useState initializer runs on the SERVER during SSR (where
  // localStorage is unavailable), then React reuses that server state on
  // hydration WITHOUT re-running the initializer.  A useEffect is the only
  // reliable way to read browser APIs after hydration.
  useEffect(() => {
    const saved = readStoredVolume();
    if (saved !== null) {
      setVolume(saved);
      // Also update audio immediately — the volume-sync effect below will fire
      // on the next render, but setting it directly here avoids one frame of
      // the wrong volume level on the audio element.
      if (audioRef.current) {
        audioRef.current.volume = saved;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep a stable ref to currentIndex so the `ended` handler never stales.
  const currentIndexRef = useRef(currentIndex);
  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  // Keep a stable ref to loop state for the same reason.
  const loopRef = useRef(loop);
  useEffect(() => {
    loopRef.current = loop;
  }, [loop]);

  const current = playlist[currentIndex] as Track | undefined;

  // ── Sync audio volume whenever volume / muted state changes ──────────────────
  // This effect runs on volume, muted — NOT on track change — which is the key
  // fix: the audio element itself is re-mounted via `key={currentIndex}` in the
  // component. After re-mount React runs all effects, and this one sets the
  // correct volume immediately, before play() is called.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = muted ? 0 : volume;
  }, [volume, muted]);

  // ── Wire up audio events ──────────────────────────────────────────────────────
  // Using a single effect with the audioRef keeps the listener list tidy and
  // avoids duplicate registrations across re-renders.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Restore correct volume on every fresh <audio> mount.
    audio.volume = muted ? 0 : volume;

    const onTimeUpdate = () => setProgress(audio.currentTime);
    const onLoaded = () => {
      setDuration(audio.duration);
      setIsLoading(false);
    };
    const onWaiting = () => setIsLoading(true);
    const onCanPlay = () => setIsLoading(false);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    // `onEnded` reads from refs so it is never stale even though it is defined
    // once per audio element mount.
    const onEnded = () => {
      const idx = currentIndexRef.current;
      const last = playlist.length - 1;

      if (loopRef.current) {
        // Loop: advance to next, wrapping around from last to first.
        const next = (idx + 1) % playlist.length;
        setCurrentIndex(next);
        setProgress(0);
        setDuration(0);
        setIsLoading(true);
        setTimeout(() => void audioRef.current?.play(), 0);
      } else if (idx < last) {
        // No loop, but more tracks remain — advance normally.
        const next = idx + 1;
        setCurrentIndex(next);
        setProgress(0);
        setDuration(0);
        setIsLoading(true);
        setTimeout(() => void audioRef.current?.play(), 0);
      }
      // else: last track finished, loop is off → stop silently.
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("waiting", onWaiting);
    audio.addEventListener("canplay", onCanPlay);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("waiting", onWaiting);
      audio.removeEventListener("canplay", onCanPlay);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
    // currentIndex as a dep re-registers listeners on every track mount
    // (the component keys the <audio> element by currentIndex).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  // ── Playback controls ─────────────────────────────────────────────────────────
  const play = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      await audio.play();
    } catch {
      // Autoplay blocked — state syncs via the "pause" event listener.
    }
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
  }, []);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      void play();
    }
  }, [isPlaying, play, pause]);

  const skipTo = useCallback(
    (index: number) => {
      if (index < 0 || index >= playlist.length) return;
      const audio = audioRef.current;
      if (!audio) return;

      const wasPlaying = isPlaying;
      setCurrentIndex(index);
      setProgress(0);
      setDuration(0);
      setIsLoading(true);

      // Volume is restored by the effect above; here we only trigger play().
      if (wasPlaying) {
        setTimeout(() => void audioRef.current?.play(), 0);
      }
    },
    [isPlaying],
  );

  const skipNext = useCallback(
    () => skipTo((currentIndex + 1) % playlist.length),
    [currentIndex, skipTo],
  );

  const skipPrev = useCallback(
    () => skipTo((currentIndex - 1 + playlist.length) % playlist.length),
    [currentIndex, skipTo],
  );

  const seek = useCallback((value: number) => {
    const audio = audioRef.current;
    if (!audio || !Number.isFinite(value)) return;
    audio.currentTime = value;
    setProgress(value);
  }, []);

  /** Sets volume (0–1), clears mute, and persists the preference. */
  const setVolumeValue = useCallback((value: number) => {
    const clamped = Math.max(0, Math.min(1, value));
    setVolume(clamped);
    setMuted(false);
    storeVolume(clamped);
  }, []);

  const toggleMute = useCallback(() => setMuted((v) => !v), []);

  const toggleLoop = useCallback(() => setLoopState((v) => !v), []);

  const progressPct = duration > 0 ? (progress / duration) * 100 : 0;

  return {
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
    play,
    pause,
    togglePlay,
    skipTo,
    skipNext,
    skipPrev,
    seek,
    setVolumeValue,
    toggleMute,
    toggleLoop,
  };
}
