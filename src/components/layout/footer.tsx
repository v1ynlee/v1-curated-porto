"use client";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative py-8 sm:py-12 border-t border-[var(--border)]"
      style={{ background: "var(--background)" }}
      aria-label="Site footer"
    >
      <div className="max-w-6xl mx-auto px-5">
        {/* ── Mobile: copyright only ─────────────────────────────────────── */}
        <p
          className="sm:hidden text-xs text-center"
          style={{ color: "var(--muted-foreground)" }}
        >
          © {year} v1ynlee. Made with love and too many late-night reads.
        </p>

        {/* ── Desktop: full three-column layout ─────────────────────────── */}
        <div className="hidden sm:flex flex-row items-center justify-between gap-4">
          <div className="text-left">
            <p className="font-bold text-lg gradient-text">v1ynlee</p>
            <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>
              just a hobbyist
            </p>
          </div>

          <p className="text-xs text-center" style={{ color: "var(--muted-foreground)" }}>
            © {year} v1ynlee. Made with love and too many late-night reads.
          </p>

          <div className="flex items-center gap-1.5">
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: "var(--p)" }}
              aria-hidden="true"
            />
            <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>
              Always reading
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
