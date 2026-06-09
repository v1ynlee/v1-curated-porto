/**
 * Centralized color-theme configuration.
 *
 * This is the single source of truth for every theme offered by the site.
 * To add a new theme:
 *   1. Append an entry to the `themes` array below.
 *   2. Add the corresponding CSS custom-property block to globals.css under
 *      [data-color-theme="<id>"].
 *
 * No other file needs to change.
 */

export interface ThemeDefinition {
  /** Machine identifier.  Must match the CSS `data-color-theme` value
   *  (or be "teal" for the default/unstyled state). */
  id: string;
  /** Human-readable label shown in the theme selector panel. */
  name: string;
  /**
   * Representative swatch color for the UI dot and active-state highlight.
   * Should match the `--p` CSS custom property value for this theme.
   */
  color: string;
}

export const themes: ThemeDefinition[] = [
  { id: "teal", name: "Teal + Cyan", color: "#14b8a6" },
  { id: "cyber-blue", name: "Cyber Blue", color: "#3b82f6" },
  { id: "emerald", name: "Emerald", color: "#10b981" },
  { id: "purple", name: "Purple", color: "#8b5cf6" },
  { id: "orange", name: "Orange", color: "#f97316" },
  { id: "red", name: "Red", color: "#ef4444" },
];

/** The theme id used when no persisted preference exists. */
export const DEFAULT_THEME_ID = "teal";
