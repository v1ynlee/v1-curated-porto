"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { themes, DEFAULT_THEME_ID, type ThemeDefinition } from "@/config/theme";

// Derive the ColorTheme union from the config so adding a theme never requires
// touching this file.
export type ColorTheme = ThemeDefinition["id"];

type ColorThemeContextValue = {
  colorTheme: ColorTheme;
  setColorTheme: (theme: ColorTheme) => void;
};

const ColorThemeContext = createContext<ColorThemeContextValue>({
  colorTheme: DEFAULT_THEME_ID,
  setColorTheme: () => undefined,
});

export function ColorThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [colorTheme, setColorThemeState] =
    useState<ColorTheme>(DEFAULT_THEME_ID);

  useEffect(() => {
    const saved = localStorage.getItem("color-theme") as ColorTheme | null;
    if (saved && themes.some((t) => t.id === saved)) {
      setColorThemeState(saved);
      applyColorTheme(saved);
    }
  }, []);

  const setColorTheme = (theme: ColorTheme) => {
    setColorThemeState(theme);
    localStorage.setItem("color-theme", theme);
    applyColorTheme(theme);
  };

  return (
    <ColorThemeContext.Provider value={{ colorTheme, setColorTheme }}>
      {children}
    </ColorThemeContext.Provider>
  );
}

function applyColorTheme(theme: ColorTheme) {
  if (theme === DEFAULT_THEME_ID) {
    document.documentElement.removeAttribute("data-color-theme");
  } else {
    document.documentElement.setAttribute("data-color-theme", theme);
  }
}

export function useColorTheme() {
  return useContext(ColorThemeContext);
}

// Re-export so consumers can render the theme list without importing config directly.
export { themes };
