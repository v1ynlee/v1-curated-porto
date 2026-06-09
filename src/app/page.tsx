"use client";

import { Navbar } from "@/components/layout/navbar";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { FavoritesSection } from "@/components/sections/favorites-section";
import { CharactersSection } from "@/components/sections/characters-section";
import { VibesSection } from "@/components/sections/vibes-section";
import { ConnectSection } from "@/components/sections/connect-section";
import { MusicPlayer } from "@/components/music/music-player";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import { BackToTop } from "@/components/layout/back-to-top";

export default function Home() {
  return (
    <main>
      <SmoothCursor
        springConfig={{
          damping: 45,
          stiffness: 400,
          mass: 1,
          restDelta: 0.001,
        }}
      />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <FavoritesSection />
      <CharactersSection />
      <VibesSection />
      <ConnectSection />
      <MusicPlayer />
      <BackToTop />

      {/* Footer */}
      <footer
        className="relative py-8 sm:py-10 border-t border-[var(--border)]"
        style={{ background: "var(--section-bg)" }}
        aria-label="Site footer"
      >
        <div className="max-w-6xl mx-auto px-5">
          {/* Mobile: copyright only */}
          <p
            className="sm:hidden text-xs text-center"
            style={{ color: "var(--muted-foreground)" }}
          >
            &copy; 2026 v1ynlee. Made with love and too many late-night reads.
          </p>

          {/* Desktop: full three-column layout */}
          <div className="hidden sm:flex flex-row items-center justify-between gap-4">
            <div>
              <p className="font-bold text-lg gradient-text">v1ynlee</p>
              <p
                className="text-xs mt-0.5"
                style={{ color: "var(--muted-foreground)" }}
              >
                just a hobbyist
              </p>
            </div>
            <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
              &copy; 2026 v1ynlee. Made with love and too many late-night reads.
            </p>
            <div className="flex items-center gap-1.5">
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: "var(--p)" }}
                aria-hidden="true"
              />
              <span
                className="text-xs"
                style={{ color: "var(--muted-foreground)" }}
              >
                Always reading
              </span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
