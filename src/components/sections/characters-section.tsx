"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ArrowLeftRight,
  ExternalLink,
} from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import { BlurFade } from "@/components/ui/blur-fade";
import Text3DFlip from "@/components/ui/text-3d-flip";
import type { Character } from "@/types/character";
import charactersData from "@/../public/data/characters.json";
import {
  COVER_ROTATION_MIN_MS,
  COVER_ROTATION_MAX_MS,
  CHARACTERS_DISPLAY_COUNT,
} from "@/constants/covers";
import { characterUrl as resolveCharacterUrl } from "@/lib/asset-url";

const allCharacters: Character[] = charactersData as Character[];

// Badge palette by type
const typeBadge: Record<Character["type"], string> = {
  Manhwa: "text-sky-400 bg-sky-400/10 border-sky-400/30",
  Manga: "text-rose-400 bg-rose-400/10 border-rose-400/30",
  Manhua: "text-amber-400 bg-amber-400/10 border-amber-400/30",
};

/** Resolve a cover template path to a CDN-aware URL. */
function coverUrl(char: Character, n: number): string {
  return resolveCharacterUrl(char.cover, n);
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

// ─── Cover rotation hook ──────────────────────────────────────────────────────
function useCoverRotation(coverTotal: number) {
  const [idx, setIdx] = useState(() => randInt(1, Math.max(1, coverTotal)));
  const [dir, setDir] = useState<"left" | "right">("right");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (coverTotal <= 1) return;

    const schedule = () => {
      const delay = randInt(COVER_ROTATION_MIN_MS, COVER_ROTATION_MAX_MS);
      timerRef.current = setTimeout(() => {
        setDir((prev) => (prev === "right" ? "left" : "right"));
        setIdx((prev) => (prev % coverTotal) + 1);
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

// ─── Rotating cover for character ─────────────────────────────────────────────
function RotatingCharacterCover({ char }: { char: Character }) {
  const { idx, dir } = useCoverRotation(char.coverTotal);
  const [visible, setVisible] = useState(true);
  const [displayIdx, setDisplayIdx] = useState(idx);
  const [imgErrored, setImgErrored] = useState(false);

  useEffect(() => {
    if (char.coverTotal <= 1) return;
    setVisible(false);
    const t = setTimeout(() => {
      setDisplayIdx(idx);
      setImgErrored(false); // reset error state when switching to new image
      setVisible(true);
    }, 280);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

  const translateOut = dir === "right" ? "-10px" : "10px";

  if (imgErrored) {
    return (
      <div
        className="absolute inset-0 flex items-center justify-center text-5xl font-black"
        style={{
          background: "linear-gradient(135deg, var(--p), var(--s))",
          color: "rgba(255,255,255,0.2)",
        }}
        aria-hidden="true"
      >
        {char.name.at(0)}
      </div>
    );
  }

  return (
    <Image
      src={coverUrl(char, displayIdx)}
      alt={`${char.name} from ${char.from}`}
      fill
      className="object-cover transition-transform duration-500 group-hover:scale-105"
      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
      loading="lazy"
      onError={() => setImgErrored(true)}
      unoptimized
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : `translateX(${translateOut})`,
        transition: "opacity 280ms ease, transform 280ms ease",
      }}
    />
  );
}

// ─── Character inline link (next to name) ───────────────────────────────────
function CharacterLink({ url, name }: { url: string; name: string }) {
  const [tip, setTip] = useState(false);

  return (
    <div className="relative inline-flex items-center">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Read this series — ${name}`}
        className="flex items-center gap-1.5 group/namelink
                   transition-all duration-200
                   text-[var(--foreground)] hover:text-[var(--p)]"
        onMouseEnter={() => setTip(true)}
        onFocus={() => setTip(true)}
        onMouseLeave={() => setTip(false)}
        onBlur={() => setTip(false)}
      >
        <span className="text-sm font-bold leading-snug">{name}</span>
        <ExternalLink
          size={10}
          aria-hidden="true"
          className="opacity-0 group-hover/namelink:opacity-100 transition-opacity duration-200
                     flex-shrink-0 mt-px"
        />
      </a>

      {tip && (
        <span
          role="tooltip"
          className="absolute bottom-full left-0 mb-2
                     px-2 py-1 rounded-md text-[10px] font-medium whitespace-nowrap
                     pointer-events-none z-30
                     bg-[var(--surface)] border border-[var(--border)]
                     text-[var(--foreground)] shadow-lg
                     animate-in fade-in-0 zoom-in-95 duration-150"
        >
          Read This Series
        </span>
      )}
    </div>
  );
}

// ─── Individual card ──────────────────────────────────────────────────────────
function CharacterCard({ char }: { char: Character }) {
  return (
    <article
      className="group relative h-full rounded-2xl overflow-hidden border border-[var(--border)]
                 transition-all duration-300 hover:-translate-y-1 select-none"
      style={{ background: "var(--surface)" }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 0 0 1px var(--p), 0 0 28px var(--p-glow), 0 8px 32px var(--p-glow-soft)";
        (e.currentTarget as HTMLElement).style.borderColor = "var(--p)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "";
        (e.currentTarget as HTMLElement).style.borderColor = "";
      }}
    >
      {/* Cover — portrait 2:3 */}
      <div
        className="relative w-full overflow-hidden bg-[var(--accent)]"
        style={{ aspectRatio: "2/3" }}
      >
        <RotatingCharacterCover char={char} />

        {/* Type badge */}
        <span
          className={`absolute top-2 left-2 text-[9px] font-bold uppercase tracking-widest
                      px-2 py-0.5 rounded-full border backdrop-blur-sm ${typeBadge[char.type]}`}
        >
          {char.type}
        </span>

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 inset-x-0 h-10 pointer-events-none"
          style={{
            background: "linear-gradient(to top, var(--surface), transparent)",
          }}
          aria-hidden="true"
        />
      </div>

      {/* Card body */}
      <div className="px-4 pb-4 pt-3 flex flex-col gap-1.5">
        {/* Name row — name is the clickable link */}
        <CharacterLink url={char.url} name={char.name} />
        <p className="text-[10px] font-semibold" style={{ color: "var(--p)" }}>
          From {char.from}
        </p>
        <p className="text-[9px] text-[var(--muted-foreground)] italic leading-snug">
          {char.personality}
        </p>
        <p className="text-[10px] leading-relaxed text-[var(--muted-foreground)] line-clamp-3">
          {char.description}
        </p>
      </div>

      {/* Top accent stripe */}
      <div
        className="absolute top-0 inset-x-0 h-[2px] opacity-0 group-hover:opacity-100
                   transition-opacity duration-300"
        style={{ background: "linear-gradient(to right, var(--p), var(--s))" }}
        aria-hidden="true"
      />
    </article>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export function CharactersSection() {
  // Randomize 12 characters per page load — computed once on mount.
  const [displayed, setDisplayed] = useState<Character[]>([]);

  useEffect(() => {
    const selected = shuffle(allCharacters).slice(0, CHARACTERS_DISPLAY_COUNT);
    setDisplayed(selected);
  }, []);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      dragFree: true,
      align: "start",
      slidesToScroll: 1,
    },
    [WheelGesturesPlugin({ forceWheelAxis: "y" })],
  );

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <section
      id="characters"
      aria-label="My favorite characters"
      className="relative py-16 sm:py-20 section-bg-characters overflow-hidden"
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 right-0 w-[500px] h-[300px] blur-[120px]
                   pointer-events-none opacity-10"
        style={{
          background: "radial-gradient(ellipse, var(--s), transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto px-5">
        {/* ── Header ───────────────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <BlurFade delay={0.05} inView>
              <div
                className="text-xs font-medium tracking-widest uppercase mb-3"
                style={{ color: "var(--p)" }}
              >
                — unforgettable
              </div>
            </BlurFade>
            <BlurFade delay={0.1} inView>
              <Text3DFlip
                as="h2"
                className="text-4xl sm:text-5xl font-black text-[var(--foreground)] justify-start"
                textClassName="text-[var(--foreground)]"
                flipTextClassName="gradient-text"
                staggerDuration={0.06}
              >
                Characters
              </Text3DFlip>
            </BlurFade>
            <BlurFade delay={0.15} inView>
              <p className="text-[var(--muted-foreground)] mt-3 max-w-md text-sm">
                Characters that stuck with me long after the last page —
                protagonists, villains, and everyone in between.
              </p>
            </BlurFade>
          </div>

          {/* Arrow buttons */}
          <BlurFade delay={0.2} inView>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                type="button"
                aria-label="Previous character"
                onClick={scrollPrev}
                className="w-9 h-9 rounded-full flex items-center justify-center
                           border border-[var(--border)] text-[var(--muted-foreground)]
                           hover:border-[var(--p)] hover:text-[var(--p)] transition-colors"
                style={{ background: "var(--surface)" }}
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                aria-label="Next character"
                onClick={scrollNext}
                className="w-9 h-9 rounded-full flex items-center justify-center
                           border border-[var(--border)] text-[var(--muted-foreground)]
                           hover:border-[var(--p)] hover:text-[var(--p)] transition-colors"
                style={{ background: "var(--surface)" }}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </BlurFade>
        </div>

        {/* ── Carousel ─────────────────────────────────────────────────────── */}
        <BlurFade delay={0.2} inView>
          <div className="relative">
            {/* Edge fades */}
            <div
              className="absolute left-0 top-0 bottom-0 w-12 z-10 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to right, var(--section-bg), transparent)",
              }}
              aria-hidden="true"
            />
            <div
              className="absolute right-0 top-0 bottom-0 w-12 z-10 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to left, var(--section-bg), transparent)",
              }}
              aria-hidden="true"
            />

            <div
              ref={emblaRef}
              className="overflow-hidden cursor-grab active:cursor-grabbing"
            >
              <div
                className="flex gap-4"
                role="list"
                aria-label="Character cards"
              >
                {displayed.map((char) => (
                  <div
                    key={char.id}
                    role="listitem"
                    className="flex-shrink-0 basis-1/2 sm:basis-1/3 lg:basis-1/5"
                  >
                    <CharacterCard char={char} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </BlurFade>

        {/* ── Scroll hint ──────────────────────────────────────────────────── */}
        <BlurFade delay={0.35} inView>
          <div className="flex items-center justify-center gap-2 mt-6">
            <ArrowLeftRight
              size={13}
              style={{ color: "var(--muted-foreground)" }}
              aria-hidden="true"
            />
            <span className="text-xs tracking-widest text-[var(--muted-foreground)]">
              Drag, swipe, or scroll to explore
            </span>
            <ArrowLeftRight
              size={13}
              style={{ color: "var(--muted-foreground)" }}
              aria-hidden="true"
            />
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
