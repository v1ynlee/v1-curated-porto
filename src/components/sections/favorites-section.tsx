"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { BlurFade } from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";
import { ScrollVelocityContainer, ScrollVelocityRow } from "@/components/ui/scroll-based-velocity";
import Text3DFlip from "@/components/ui/text-3d-flip";
import {
  Star,
  CheckCircle,
  RefreshCw,
  Clock,
  Layers,
  BookMarked,
  Flame,
  Zap,
  Brain,
  Heart,
  Swords,
  Shield,
  Trophy,
  XCircle,
  ExternalLink,
} from "lucide-react";
import favoritesData from "@/../public/data/favorites.json";
import type { StatusType, ComicCard } from "@/types/favorites";
import {
  COVER_ROTATION_MIN_MS,
  COVER_ROTATION_MAX_MS,
  FAVORITES_DISPLAY_COUNT,
} from "@/constants/covers";
import { coverUrl as resolveCoverUrl } from "@/lib/asset-url";

// ─── Static maps ──────────────────────────────────────────────────────────────
const StatusIcon: Record<StatusType, React.ComponentType<{ size?: number; className?: string }>> = {
  Completed: CheckCircle,
  Ongoing:   RefreshCw,
  Hiatus:    Clock,
  Axed:      XCircle,
};

const genreIconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  Action:        Swords,
  Fantasy:       Zap,
  Apocalypse:    Flame,
  Historical:    Shield,
  Mystery:       Brain,
  Philosophical: Brain,
  "Sci-fi":      Layers,
  "Dark Fantasy": Flame,
  Romance:       Heart,
  Sports:        Trophy,
  Psychological: Brain,
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Generate a CDN-aware cover URL from the template pattern, replacing `<range>`. */
function coverUrl(item: ComicCard, n: number): string {
  return resolveCoverUrl(item.cover, n);
}

/** Random integer in [min, max]. */
function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** Fisher-Yates shuffle — returns a new array. */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const allFavorites: ComicCard[] = favoritesData.favorites as ComicCard[];
const marqueeItems: string[] = favoritesData.marqueeItems;

// ─── Cover rotation hook ──────────────────────────────────────────────────────
/**
 * Returns the current cover index (1-based) for an item.
 * Rotates automatically on a random interval when coverTotal > 1.
 * Direction alternates: +1 / -1 to produce a left/right feel in the UI.
 */
function useCoverRotation(coverTotal: number) {
  const [idx, setIdx] = useState(() => randInt(1, coverTotal));
  const [dir, setDir] = useState<"left" | "right">("right");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (coverTotal <= 1) return; // nothing to rotate

    const schedule = () => {
      const delay = randInt(COVER_ROTATION_MIN_MS, COVER_ROTATION_MAX_MS);
      timerRef.current = setTimeout(() => {
        setDir((prev) => (prev === "right" ? "left" : "right"));
        setIdx((prev) => (prev % coverTotal) + 1); // 1-based wrap
        schedule();
      }, delay);
    };

    schedule();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [coverTotal]);

  return { idx, dir };
}

// ─── Rotating cover image ─────────────────────────────────────────────────────
function RotatingCover({
  item,
  priority,
}: {
  item: ComicCard;
  priority: boolean;
}) {
  const { idx, dir } = useCoverRotation(item.coverTotal);
  const [visible, setVisible] = useState(true);
  const [displayIdx, setDisplayIdx] = useState(idx);
  const [displayDir, setDisplayDir] = useState(dir);

  // When idx changes: fade-out → swap src → fade-in with slide direction
  useEffect(() => {
    if (item.coverTotal <= 1) return;
    setVisible(false);
    setDisplayDir(dir);
    const t = setTimeout(() => {
      setDisplayIdx(idx);
      setVisible(true);
    }, 300); // half of CSS transition duration
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

  const translateOut = displayDir === "right" ? "-12px" : "12px";

  return (
    <Image
      src={coverUrl(item, displayIdx)}
      alt={`Cover of ${item.title}`}
      fill
      className="object-cover transition-transform duration-500 group-hover:scale-105"
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
      priority={priority}
      loading={priority ? "eager" : "lazy"}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : `translateX(${translateOut})`,
        transition: "opacity 300ms ease, transform 300ms ease",
      }}
      unoptimized
    />
  );
}

// ─── Link icon with tooltip ───────────────────────────────────────────────────
function ReadLink({ url, label }: { url: string; label: string }) {
  const [tip, setTip] = useState(false);

  return (
    <div className="relative flex items-center">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="group/link flex items-center justify-center w-6 h-6 rounded-full
                   transition-all duration-200
                   text-[var(--muted-foreground)] hover:text-[var(--p)]
                   hover:bg-[var(--p-glow-soft)]"
        onMouseEnter={() => setTip(true)}
        onFocus={() => setTip(true)}
        onMouseLeave={() => setTip(false)}
        onBlur={() => setTip(false)}
        style={{
          boxShadow: tip ? "0 0 8px var(--p-glow)" : undefined,
        }}
      >
        <ExternalLink size={11} aria-hidden="true" />
      </a>

      {/* Tooltip */}
      {tip && (
        <span
          role="tooltip"
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2
                     px-2 py-1 rounded-md text-[10px] font-medium whitespace-nowrap
                     pointer-events-none z-20
                     bg-[var(--surface)] border border-[var(--border)]
                     text-[var(--foreground)] shadow-lg
                     animate-in fade-in-0 zoom-in-95 duration-150"
        >
          {label}
        </span>
      )}
    </div>
  );
}

// ─── Card component ───────────────────────────────────────────────────────────
function FavoriteCard({ item, index }: { item: ComicCard; index: number }) {
  const StatusIconComp = StatusIcon[item.status] ?? BookMarked;

  return (
    <BlurFade delay={0.05 * index} inView>
      <article
        className="group relative flex flex-col rounded-xl border border-[var(--border)]
                   overflow-hidden h-full transition-all duration-300
                   hover:border-[var(--p)]"
        style={{ background: "var(--surface)" }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow =
            "0 0 0 1px var(--p), 0 0 28px var(--p-glow), 0 8px 32px var(--p-glow-soft)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow = "none";
        }}
      >
        {/* Cover — full portrait ratio, no height cap */}
        <div className="relative w-full overflow-hidden bg-[var(--accent)]" style={{ aspectRatio: "2/3" }}>
          <RotatingCover item={item} priority={index < 4} />

          {/* Status badge */}
          <div
            className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5
                       rounded-full text-[10px] font-semibold border backdrop-blur-sm"
            style={{
              borderColor: `${item.neonFrom}55`,
              background:  `${item.neonFrom}22`,
              color:        item.neonFrom,
            }}
          >
            <StatusIconComp size={9} />
            {item.status}
          </div>

          <BorderBeam size={80} duration={10} colorFrom={item.neonFrom} colorTo={item.neonTo} />
        </div>

        {/* Body */}
        <div className="flex flex-col flex-1 p-4 gap-2">
          {/* Origin */}
          <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: item.neonFrom }}>
            {item.origin}
          </span>

          {/* Title */}
          <h3 className="text-base font-bold text-[var(--foreground)] leading-snug">{item.title}</h3>

          {/* Genres */}
          <div className="flex flex-wrap gap-1">
            {item.genres.map((g) => {
              const Icon = genreIconMap[g] ?? BookMarked;
              return (
                <span
                  key={g}
                  className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px]
                             border border-[var(--border)] text-[var(--muted-foreground)] bg-[var(--accent)]"
                >
                  <Icon size={9} />
                  {g}
                </span>
              );
            })}
          </div>

          {/* Description */}
          <p className="text-xs leading-relaxed text-[var(--muted-foreground)] line-clamp-3 flex-1">
            {item.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {item.tags.slice(0, 3).map((tag, i) => (
              <span
                key={`${tag}-${i}`}
                className="px-1.5 py-0.5 rounded text-[9px] border border-[var(--border)] text-[var(--muted-foreground)]"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-1 mt-auto border-t border-[var(--border)]">
            <span className="text-[10px] text-[var(--muted-foreground)]">{item.chapters}</span>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star size={11} style={{ color: item.neonFrom }} fill={item.neonFrom} />
                <span className="text-xs font-bold" style={{ color: item.neonFrom }}>
                  {item.rating}
                </span>
              </div>
              {/* Subtle read-link icon */}
              <ReadLink url={item.url} label="Read this series" />
            </div>
          </div>
        </div>
      </article>
    </BlurFade>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export function FavoritesSection() {
  // Randomize selection on every page load — computed once per mount.
  const [displayed, setDisplayed] = useState<ComicCard[]>([]);

  useEffect(() => {
    const selected = shuffle(allFavorites).slice(0, FAVORITES_DISPLAY_COUNT);
    setDisplayed(selected);
  }, []);

  return (
    <section
      id="favorites"
      aria-label="My favorite comics"
      className="relative py-28 sm:py-36 section-bg-favorites overflow-hidden"
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                   w-[800px] h-[400px] blur-[120px] pointer-events-none opacity-10"
        style={{ background: "radial-gradient(ellipse, var(--p), transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-5">
        {/* Header */}
        <div className="text-center mb-16">
          <BlurFade delay={0.05} inView>
            <div className="text-xs font-medium tracking-widest uppercase mb-3" style={{ color: "var(--p)" }}>
              — top picks
            </div>
          </BlurFade>
          <BlurFade delay={0.1} inView>
            <Text3DFlip
              as="h2"
              className="text-5xl sm:text-6xl font-black text-[var(--foreground)] mb-4 justify-center"
              textClassName="text-[var(--foreground)]"
              flipTextClassName="gradient-text"
              staggerDuration={0.06}
            >
              My Favorites
            </Text3DFlip>
          </BlurFade>
          <BlurFade delay={0.15} inView>
            <p className="text-[var(--muted-foreground)] max-w-lg mx-auto">
              Eight titles that left a permanent mark — across manhwa, manhua, and manga. Each one a masterpiece.
            </p>
          </BlurFade>
        </div>

        {/* 2-row × 4-col grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {displayed.map((item, i) => (
            <FavoriteCard key={item.id} item={item} index={i} />
          ))}
        </div>

        {/* Scroll velocity ticker */}
        <BlurFade delay={0.3} inView>
          <div className="mt-14 py-4 border-y border-[var(--border)]">
            <ScrollVelocityContainer>
              <ScrollVelocityRow baseVelocity={3} direction={1} className="py-2">
                {marqueeItems.map((title) => (
                  <div
                    key={title}
                    className="mx-8 flex items-center gap-3 text-sm font-medium
                               text-[var(--muted-foreground)] whitespace-nowrap"
                  >
                    <Star size={10} style={{ color: "var(--p)" }} fill="var(--p)" aria-hidden="true" />
                    {title}
                  </div>
                ))}
              </ScrollVelocityRow>
            </ScrollVelocityContainer>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
