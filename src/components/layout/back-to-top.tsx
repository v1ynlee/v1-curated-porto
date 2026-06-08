"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    const w = window as typeof window & {
      lenis?: { scrollTo: (target: number, opts?: object) => void };
    };
    if (w.lenis) {
      w.lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <button
      type="button"
      id="back-to-top"
      aria-label="Back to top"
      onClick={scrollToTop}
      className={`fixed right-6 z-50 w-12 h-12 rounded-full
        flex items-center justify-center
        border transition-all duration-300 shadow-lg
        ${
          visible
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      /*
       * Positioned directly above the music player FAB.
       * Music player: bottom-6 (24px) + h-12 (48px) = 72px from bottom.
       * Add 8px gap → bottom: 80px = bottom-20.
       */
      style={{
        bottom: "80px",
        background: "var(--surface)",
        borderColor: "var(--border)",
        color: "var(--p)",
        boxShadow: visible ? "0 0 16px var(--p-glow-soft)" : undefined,
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLButtonElement;
        el.style.background  = "var(--p)";
        el.style.color       = "#fff";
        el.style.borderColor = "var(--p)";
        el.style.boxShadow   = "0 0 24px var(--p-glow)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLButtonElement;
        el.style.background  = "var(--surface)";
        el.style.color       = "var(--p)";
        el.style.borderColor = "var(--border)";
        el.style.boxShadow   = "0 0 16px var(--p-glow-soft)";
      }}
    >
      <ArrowUp size={16} aria-hidden="true" />
    </button>
  );
}
