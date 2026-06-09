"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { Highlighter } from "@/components/ui/highlighter";
import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "@/components/ui/scroll-based-velocity";
import Text3DFlip from "@/components/ui/text-3d-flip";
import {
  Sword,
  Sparkles,
  Heart,
  Cloud,
  Brain,
  Zap,
  Ghost,
  Shield,
  Compass,
  Flame,
  Music,
  Clock,
} from "lucide-react";

type Genre = {
  label: string;
  icon: React.ComponentType<{
    size?: number;
    className?: string;
    style?: React.CSSProperties;
  }>;
  desc: string;
  primary?: boolean;
};

const genres: Genre[] = [
  {
    label: "Action",
    icon: Sword,
    desc: "Adrenaline-pumping sequences",
    primary: true,
  },
  {
    label: "Fantasy",
    icon: Sparkles,
    desc: "Boundless magical worlds",
    primary: true,
  },
  { label: "Psychological", icon: Brain, desc: "Mind-bending narratives" },
  { label: "Romance", icon: Heart, desc: "Complex relationships" },
  {
    label: "Slice of Life",
    icon: Cloud,
    desc: "Everyday moments, deeply felt",
  },
  { label: "Sci-fi", icon: Zap, desc: "Future worlds and tech" },
  { label: "Horror", icon: Ghost, desc: "Unsettling dread" },
  { label: "Historical", icon: Shield, desc: "Epic eras reimagined" },
  {
    label: "Adventure",
    icon: Compass,
    desc: "Journeys without limit",
    primary: true,
  },
  { label: "Thriller", icon: Flame, desc: "Heart-racing tension" },
  { label: "Music", icon: Music, desc: "Rhythm-driven stories" },
  { label: "Time Travel", icon: Clock, desc: "Paradoxes and second chances" },
];

const moodBannerRow1 = [
  "Solo Leveling",
  "Tower of God",
  "Vinland Saga",
  "Vagabond",
  "Omniscient Reader",
  "Return of the Blossoming Blade",
  "Eleceed",
  "Noblesse",
  "A Returner's Magic",
  "Blue Lock",
];
const moodBannerRow2 = [
  "Chainsaw Man",
  "Jujutsu Kaisen",
  "Berserk",
  "Claymore",
  "Bleach",
  "Fullmetal Alchemist",
  "Attack on Titan",
  "One Piece",
  "Hunter x Hunter",
  "Slam Dunk",
];

export function VibesSection() {
  return (
    <section
      id="vibes"
      aria-label="My reading vibes"
      className="relative py-28 sm:py-36 section-bg overflow-hidden"
    >
      {/* Flickering grid background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <FlickeringGrid
          className="absolute inset-0 opacity-20 dark:opacity-30"
          squareSize={4}
          gridGap={6}
          color="var(--p)"
          maxOpacity={0.5}
          flickerChance={0.08}
        />
      </div>

      {/* Top velocity banner */}
      <div className="mb-16" aria-label="Manga titles ticker">
        <ScrollVelocityContainer>
          <ScrollVelocityRow
            baseVelocity={4}
            direction={1}
            className="py-2 border-y border-[var(--border)]"
          >
            {moodBannerRow1.map((title) => (
              <span
                key={title}
                className="mx-10 text-sm font-medium text-[var(--muted-foreground)] opacity-60 whitespace-nowrap"
              >
                {title}
              </span>
            ))}
          </ScrollVelocityRow>
          <ScrollVelocityRow
            baseVelocity={3.5}
            direction={-1}
            className="py-2 border-b border-[var(--border)]"
          >
            {moodBannerRow2.map((title) => (
              <span
                key={title}
                className="mx-10 text-sm font-medium text-[var(--muted-foreground)] opacity-60 whitespace-nowrap"
              >
                {title}
              </span>
            ))}
          </ScrollVelocityRow>
        </ScrollVelocityContainer>
      </div>

      <div className="max-w-5xl mx-auto px-5 relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <BlurFade delay={0.05} inView>
            <div
              className="text-xs font-medium tracking-widest uppercase mb-3"
              style={{ color: "var(--p)" }}
            >
              — genre map
            </div>
          </BlurFade>
          <BlurFade delay={0.1} inView>
            <Text3DFlip
              as="h2"
              className="text-4xl sm:text-5xl font-black text-[var(--foreground)] mb-4 justify-center"
              textClassName="text-[var(--foreground)]"
              flipTextClassName="gradient-text"
              staggerDuration={0.05}
            >
              My Reading Vibes
            </Text3DFlip>
          </BlurFade>
          <BlurFade delay={0.15} inView>
            <p className="text-[var(--muted-foreground)] max-w-md mx-auto">
              I'll read almost anything — but these genres speak to my soul the
              most.
            </p>
          </BlurFade>
        </div>

        {/* Genre grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-16">
          {genres.map((genre, i) => {
            const Icon = genre.icon;
            return (
              <BlurFade key={genre.label} delay={0.05 * i} inView>
                <div
                  className={`group relative p-4 rounded-xl border transition-all duration-300 cursor-default
                    ${
                      genre.primary
                        ? "border-[var(--p-glow)] bg-[var(--p-glow-soft)] hover:bg-[var(--p-glow)]"
                        : "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--p-glow)] hover:bg-[var(--p-glow-soft)]"
                    }`}
                >
                  <Icon
                    size={20}
                    className="mb-2 transition-transform duration-300 group-hover:scale-110"
                    style={{ color: "var(--p)" }}
                  />
                  <p className="text-sm font-semibold text-[var(--foreground)]">
                    {genre.label}
                  </p>
                  <p className="text-xs text-[var(--muted-foreground)] mt-0.5 leading-snug">
                    {genre.desc}
                  </p>
                </div>
              </BlurFade>
            );
          })}
        </div>

        {/* Quote */}
        <BlurFade delay={0.3} inView>
          <div className="text-center max-w-2xl mx-auto">
            <blockquote
              className="text-xl sm:text-2xl font-light italic leading-relaxed"
              style={{ color: "var(--muted-foreground)" }}
            >
              "Each panel is not just art — it's a{" "}
              <Highlighter color="var(--p-glow-soft)" action="underline" isView>
                doorway to a world
              </Highlighter>{" "}
              that someone poured their heart into."
            </blockquote>
            <p className="mt-4 text-sm" style={{ color: "var(--p)" }}>
              — v1ynlee
            </p>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
