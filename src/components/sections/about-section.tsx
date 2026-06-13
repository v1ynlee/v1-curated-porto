"use client";

import Image from "next/image";
import { BlurFade } from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";
import { Highlighter } from "@/components/ui/highlighter";
import { BookOpen, Palette, Globe, Star } from "lucide-react";
import aboutData from "@/../public/data/about.json";
import statsData from "@/../public/data/stats.json";
import type { AboutData } from "@/types/about";
import type { StatItem } from "@/types/stats";
import { splitAroundPhrase } from "@/lib/string";

// ─── Typed data ───────────────────────────────────────────────────────────────
const about = aboutData as AboutData;
const stats = statsData.stats as StatItem[];

// ─── Icon registry ────────────────────────────────────────────────────────────
const iconMap: Record<
  string,
  React.ComponentType<{
    size?: number;
    className?: string;
    style?: React.CSSProperties;
  }>
> = { BookOpen, Globe, Palette, Star };

// ─── Derived data ─────────────────────────────────────────────────────────────
const badges = about.badges.map((b) => ({
  icon: iconMap[b.icon] ?? BookOpen,
  label: b.label,
  size: b.size,
  position: b.position,
}));

const hobbyTags = about.hobbyTags.map((t) => ({
  icon: iconMap[t.icon] ?? BookOpen,
  text: t.text,
}));

// ─── Section ──────────────────────────────────────────────────────────────────
export function AboutSection() {
  return (
    <section
      id="about"
      aria-label="About me"
      className="relative py-16 sm:py-20 section-bg"
    >
      {/* Subtle gradient tint */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, color-mix(in srgb, var(--p) 4%, transparent) 50%, transparent 100%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-5">
        {/* Section eyebrow */}
        <BlurFade delay={0.05} inView>
          <div
            className="text-xs font-medium tracking-widest uppercase mb-3"
            style={{ color: "var(--p)" }}
          >
            {about.sectionLabel}
          </div>
        </BlurFade>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* ── Avatar ────────────────────────────────────────────────────── */}
          <BlurFade delay={0.1} inView>
            <div className="flex justify-center lg:justify-start">
              <div className="relative animate-float">
                {/* Glow ring */}
                <div
                  className="absolute inset-0 rounded-2xl blur-2xl opacity-40 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle, var(--p), transparent)",
                  }}
                  aria-hidden="true"
                />
                <div className="relative w-72 h-96 sm:w-80 sm:h-[28rem] rounded-2xl overflow-hidden animate-glow-pulse">
                  <Image
                    src={about.avatar.src}
                    width={about.avatar.width}
                    height={about.avatar.height}
                    alt={about.avatar.alt}
                    className="object-contain"
                    priority
                    sizes="(max-width: 640px) 256px, 288px"
                  />
                  <BorderBeam
                    size={240}
                    duration={12}
                    colorFrom="var(--p)"
                    colorTo="var(--s)"
                  />
                </div>

                {/* Floating badges — position driven by data */}
                {badges.map(({ icon: Icon, label, size, position }) => (
                  <div
                    key={label}
                    className="absolute bg-[var(--surface)] border border-[var(--border)]
                               rounded-xl px-3 py-1.5 text-xs font-medium
                               text-[var(--foreground)] shadow-lg flex items-center gap-1.5"
                    style={
                      position === "top-right"
                        ? { top: "-1rem", right: "-1rem" }
                        : { bottom: "-1rem", left: "-1rem" }
                    }
                    aria-hidden="true"
                  >
                    <Icon size={size} style={{ color: "var(--p)" }} />
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </BlurFade>

          {/* ── Bio ───────────────────────────────────────────────────────── */}
          <div className="space-y-6">
            {/* Heading */}
            <BlurFade delay={0.15} inView>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--foreground)] leading-tight">
                {about.headingPrefix}{" "}
                <span className="gradient-text">{about.name}</span>
              </h2>
            </BlurFade>

            {/* Bio paragraphs — 0 and 1 contain highlighted phrases */}
            {[0, 1, 2].map((i) => {
              const text = about.bio[i];
              const highlight = about.highlightedPhrases[i];
              const parts = highlight
                ? splitAroundPhrase(text, highlight.text)
                : null;
              // const parts  = phrase ? splitAroundPhrase(text, phrase) : null;
              const delay = 0.2 + i * 0.05;
              const muted = i > 0;

              return (
                <BlurFade key={i} delay={delay} inView>
                  <p
                    className={`leading-relaxed ${muted ? "text-[var(--muted-foreground)]" : "text-lg text-[var(--foreground)]"}`}
                  >
                    {parts ? (
                      <>
                        {parts.before}
                        <Highlighter
                          color="var(--p-glow-soft)"
                          action={highlight.action}
                          isView
                        >
                          {parts.match}
                        </Highlighter>
                        {parts.after}
                      </>
                    ) : (
                      text
                    )}
                  </p>
                </BlurFade>
              );
            })}

            {/* Stats */}
            <BlurFade delay={0.35} inView>
              <div className="flex flex-wrap gap-6 pt-4">
                {stats.map(({ label, value }) => (
                  <div key={label} className="flex flex-col gap-1">
                    <span className="text-2xl font-bold gradient-text">
                      {value}
                    </span>
                    <span
                      className="text-xs tracking-wide uppercase"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </BlurFade>

            {/* Hobby tags */}
            <BlurFade delay={0.4} inView>
              <div className="flex flex-wrap gap-2 pt-2">
                {hobbyTags.map(({ icon: Icon, text }) => (
                  <div
                    key={text}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full
                               border border-[var(--border)] bg-[var(--accent)]
                               text-xs text-[var(--muted-foreground)]"
                  >
                    <Icon size={12} style={{ color: "var(--p)" }} />
                    {text}
                  </div>
                ))}
              </div>
            </BlurFade>
          </div>
        </div>
      </div>
    </section>
  );
}
