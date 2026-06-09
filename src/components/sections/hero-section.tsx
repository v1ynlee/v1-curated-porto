"use client";

import { Particles } from "@/components/ui/particles";
import { BlurFade } from "@/components/ui/blur-fade";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { MorphingText } from "@/components/ui/morphing-text";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { Meteors } from "@/components/ui/meteors";
import { useColorTheme } from "@/components/providers/color-theme-provider";

const heroMorphTexts = [
  "manhwa reader",
  "manga enthusiast",
  "manhua fan",
  "panel collector",
  "just a hobbyist",
];

export function HeroSection() {
  const { colorTheme } = useColorTheme();

  const scrollToSection = (href: string) => {
    const el = document.querySelector(href);
    if (!el) return;
    const w = window as typeof window & {
      lenis?: { scrollTo: (t: Element, o?: object) => void };
    };
    if (w.lenis) w.lenis.scrollTo(el, { offset: -80 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  // Derive particle color from CSS variable (approximate for each theme)
  const particleColors: Record<string, string> = {
    teal: "#14b8a6",
    "cyber-blue": "#3b82f6",
    emerald: "#10b981",
    purple: "#8b5cf6",
    orange: "#f97316",
    red: "#ef4444",
  };
  const particleColor = particleColors[colorTheme] ?? "#14b8a6";

  return (
    <section
      id="hero"
      aria-label="Hero section"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden section-bg"
    >
      {/* Particle background */}
      <Particles
        className="absolute inset-0 z-0"
        quantity={90}
        ease={80}
        color={particleColor}
        refresh={false}
        size={0.4}
        staticity={40}
      />

      {/* Ambient gradient orbs */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px] pointer-events-none opacity-20"
        style={{ background: `radial-gradient(circle, var(--p), transparent)` }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-[100px] pointer-events-none opacity-15"
        style={{ background: `radial-gradient(circle, var(--s), transparent)` }}
      />

      {/* Meteor shower */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <Meteors number={8} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-5 max-w-3xl">
        {/* Badge */}
        <BlurFade delay={0.1} duration={0.8}>
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-8"
            style={{
              borderColor: "var(--p-glow)",
              background: "var(--p-glow-soft)",
            }}
          >
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: "var(--p-light)" }}
              aria-hidden="true"
            />
            <AnimatedShinyText
              className="text-xs font-medium tracking-widest uppercase"
              style={{ color: "var(--p-light)" }}
            >
              just a hobbyist
            </AnimatedShinyText>
          </div>
        </BlurFade>

        {/* Name */}
        <BlurFade delay={0.2} duration={0.9}>
          <h1 className="text-7xl sm:text-8xl md:text-9xl font-black tracking-tight mb-4 leading-none gradient-text">
            v1ynlee
          </h1>
        </BlurFade>

        {/* Typing animation subtitle */}
        <BlurFade delay={0.35} duration={0.8}>
          <div
            className="text-xl sm:text-2xl font-light mb-3 h-8"
            style={{ color: "var(--p)" }}
          >
            <TypingAnimation
              words={[
                "Manhwa Reader",
                "Manga Lover",
                "Manhua Fan",
                "Just Vibing",
              ]}
              loop
              duration={80}
              pauseDelay={2000}
              deleteSpeed={40}
              showCursor
              cursorStyle="line"
              className="font-medium"
              as="span"
            />
          </div>
        </BlurFade>

        {/* Morphing text */}
        <BlurFade delay={0.45} duration={0.8}>
          <div className="mb-10">
            <MorphingText
              texts={heroMorphTexts}
              className="text-base sm:text-lg text-[var(--muted-foreground)] font-light max-w-sm mx-auto h-8"
            />
          </div>
        </BlurFade>

        {/* CTA buttons */}
        <BlurFade delay={0.6} duration={0.8}>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <ShimmerButton
              shimmerColor="var(--p-light)"
              background="linear-gradient(135deg, var(--p), var(--s))"
              borderRadius="9999px"
              className="px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105"
              onClick={() => scrollToSection("#about")}
            >
              Explore my world →
            </ShimmerButton>
            <button
              type="button"
              onClick={() => scrollToSection("#favorites")}
              className="px-8 py-3.5 rounded-full border border-[var(--border)] text-[var(--muted-foreground)] font-semibold text-sm hover:border-[var(--p)] hover:text-[var(--foreground)] transition-all duration-300"
            >
              My favorites
            </button>
          </div>
        </BlurFade>

        {/* Scroll indicator */}
        <BlurFade delay={1.0} duration={0.8}>
          <div
            className="mt-20 flex flex-col items-center gap-2 text-xs tracking-widest uppercase"
            style={{ color: "var(--muted-foreground)" }}
            aria-hidden="true"
          >
            <span>scroll</span>
            <div
              className="w-px h-12 animate-pulse"
              style={{
                background: `linear-gradient(to bottom, var(--p), transparent)`,
              }}
            />
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
