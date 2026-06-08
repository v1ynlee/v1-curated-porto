"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { useColorTheme, themes, type ColorTheme } from "@/components/providers/color-theme-provider";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#favorites", label: "Favorites" },
  { href: "#vibes", label: "Vibes" },
  { href: "#connect", label: "Connect" },
] as const;



function ThemePanel({ onClose }: { onClose: () => void }) {
  const { colorTheme, setColorTheme } = useColorTheme();

  return (
    <div
      role="dialog"
      aria-label="Theme settings"
      className="absolute right-0 top-full mt-2 w-52 rounded-xl bg-[var(--surface)] backdrop-blur-md border border-[var(--border)] shadow-xl shadow-black/30 py-3 z-50"
    >
      {/* Appearance */}
      <div className="px-3 pb-2">
        <p className="text-[10px] font-semibold text-[var(--muted-foreground)] uppercase tracking-widest mb-2">
          Appearance
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-[var(--foreground)]">Light / Dark</span>
          <AnimatedThemeToggler
            variant="circle"
            duration={400}
            className="p-1.5 rounded-lg text-[var(--foreground)] hover:bg-[var(--accent)] transition-colors"
            aria-label="Toggle appearance mode"
          />
        </div>
      </div>

      {/* Divider */}
      <div className="my-2 border-t border-[var(--border)]" aria-hidden="true" />

      {/* Color palette */}
      <div className="px-3">
        <p className="text-[10px] font-semibold text-[var(--muted-foreground)] uppercase tracking-widest mb-2">
          Color Palette
        </p>
        <div className="flex flex-col gap-1">
          {themes.map(({ id, name, color }) => (
            <button
              key={id}
              type="button"
              onClick={() => setColorTheme(id as ColorTheme)}
              className={`w-full flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-xs transition-colors ${
                colorTheme === id
                  ? "bg-[var(--p-glow-soft)] text-[var(--foreground)] font-medium"
                  : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--accent)]"
              }`}
            >
              <span
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ background: color }}
                aria-hidden="true"
              />
              {name}
              {colorTheme === id && (
                <span
                  className="ml-auto w-1.5 h-1.5 rounded-full"
                  style={{ background: color }}
                  aria-hidden="true"
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const { colorTheme } = useColorTheme();
  /** Wraps the theme-trigger button + the floating panel. */
  const themePanelRef = useRef<HTMLDivElement>(null);

  const currentPalette = themes.find((t) => t.id === colorTheme) ?? themes[0];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setThemeOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Close theme dropdown when clicking outside its container
  useEffect(() => {
    if (!themeOpen) return;

    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (
        themePanelRef.current &&
        !themePanelRef.current.contains(e.target as Node)
      ) {
        setThemeOpen(false);
      }
    };

    // Use capture phase so the event fires before any child stopPropagation
    document.addEventListener("mousedown", handleOutsideClick, true);
    document.addEventListener("touchstart", handleOutsideClick, true);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick, true);
      document.removeEventListener("touchstart", handleOutsideClick, true);
    };
  }, [themeOpen]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      const w = window as typeof window & { lenis?: { scrollTo: (target: Element, opts?: object) => void } };
      if (w.lenis) {
        w.lenis.scrollTo(el, { offset: -80 });
      } else {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[color-mix(in_srgb,var(--background)_85%,transparent)] backdrop-blur-md border-b border-[var(--border)] shadow-lg shadow-black/10"
          : "bg-transparent"
      }`}
    >
      <nav
        aria-label="Main navigation"
        className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between"
      >
        {/* Logo */}
        <button
          type="button"
          onClick={() => handleNavClick("#hero")}
          aria-label="Back to top"
          className="font-bold text-xl tracking-tight group"
        >
          <span className="gradient-text group-hover:opacity-80 transition-opacity">
            v1ynlee
          </span>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(({ href, label }) => (
            <button
              key={href}
              type="button"
              onClick={() => handleNavClick(href)}
              className="px-4 py-2 text-sm accent-link rounded-lg hover:bg-[var(--accent)] transition-all duration-200"
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {/* Theme panel trigger — ref wraps both the button and the panel */}
          <div className="relative" ref={themePanelRef}>
            <button
              type="button"
              id="theme-panel-btn"
              aria-label="Open theme settings"
              aria-expanded={themeOpen}
              onClick={() => setThemeOpen((v) => !v)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-[var(--accent)] hover:bg-[var(--surface-raised)] border border-[var(--border)] transition-all duration-200 text-sm text-[var(--foreground)]"
            >
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ background: currentPalette?.color }}
                aria-hidden="true"
              />
              <span className="hidden sm:inline text-xs text-[var(--muted-foreground)]">
                Theme
              </span>
            </button>
            {themeOpen && <ThemePanel onClose={() => setThemeOpen(false)} />}
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            id="mobile-menu-btn"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden p-2 rounded-lg text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--accent)] transition-colors"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[color-mix(in_srgb,var(--background)_95%,transparent)] backdrop-blur-md border-b border-[var(--border)]">
          <div className="px-5 py-3 flex flex-col gap-1">
            {navLinks.map(({ href, label }) => (
              <button
                key={href}
                type="button"
                onClick={() => handleNavClick(href)}
                className="py-3 text-left text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors border-b border-[var(--border)] last:border-0"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Scroll progress — pinned to the bottom edge of the header */}
      <ScrollProgress />
    </header>
  );
}
