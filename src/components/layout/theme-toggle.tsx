"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun, Monitor } from "lucide-react";

const themes = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
] as const;

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 animate-pulse" />
    );
  }

  const current = themes.find((t) => t.value === theme) ?? themes[1];
  const CurrentIcon = current.icon;

  return (
    <div className="relative">
      <button
        type="button"
        id="theme-toggle-btn"
        aria-label="Toggle theme"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === "Escape") setOpen(false);
        }}
        className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/40 transition-all duration-200 text-sm text-foreground"
      >
        <CurrentIcon size={14} />
        <span className="hidden sm:inline text-xs">{current.label}</span>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full mt-2 w-36 rounded-xl bg-zinc-900/95 backdrop-blur-sm border border-white/10 shadow-xl shadow-black/40 py-1 z-50"
        >
          {themes.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              type="button"
              role="menuitem"
              onClick={() => {
                setTheme(value);
                setOpen(false);
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm transition-colors ${
                theme === value
                  ? "text-purple-400 bg-purple-500/10"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5"
              }`}
            >
              <Icon size={13} />
              {label}
              {theme === value && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-400" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
