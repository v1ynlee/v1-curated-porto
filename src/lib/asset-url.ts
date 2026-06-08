/**
 * Asset URL helpers.
 *
 * All components that render images or audio from the CDN-backed directories
 * must call these helpers instead of using raw path strings.
 *
 * Usage:
 *   import { assetUrl, coverUrl, characterUrl, audioUrl, musicCoverUrl } from "@/lib/asset-url";
 *
 * In development (NEXT_PUBLIC_CDN_URL is unset) every helper returns the
 * local path unchanged so the dev server serves from /public as usual.
 *
 * In production (NEXT_PUBLIC_CDN_URL=https://cdn.curated-comics.cyou) the
 * helpers prepend the CDN base, pointing requests at Cloudflare R2.
 */

import { CDN_URL, CDN_ASSET_PATHS } from "@/config/assets";

/**
 * Resolve an asset path to either a local path or a full CDN URL.
 *
 * @param path - Absolute path starting with "/" e.g. "/covers/foo.webp"
 * @returns The path unchanged (dev) or prefixed with CDN_URL (prod)
 */
export function assetUrl(path: string): string {
  if (!CDN_URL) return path; // dev — serve from public/

  // Only rewrite paths that belong to a CDN-backed directory.
  const isManaged = CDN_ASSET_PATHS.some((prefix) => path.startsWith(prefix));
  return isManaged ? `${CDN_URL}${path}` : path;
}

// ─── Typed convenience wrappers ───────────────────────────────────────────────

/**
 * Resolve a comic cover path.
 * Handles the `<range>` template pattern used in favorites.json.
 *
 * @param template - Path like "/covers/slug-<range>.webp"
 * @param n        - Numeric index to substitute (1-based, zero-padded to 2 digits)
 */
export function coverUrl(template: string, n: number): string {
  const resolved = template.replace("<range>", String(n).padStart(2, "0"));
  return assetUrl(resolved);
}

/**
 * Resolve a character cover path.
 * Handles the `<range>` template pattern used in characters.json.
 */
export function characterUrl(template: string, n: number): string {
  const resolved = template.replace("<range>", String(n).padStart(2, "0"));
  return assetUrl(resolved);
}

/** Resolve a music audio file path. */
export function audioUrl(path: string): string {
  return assetUrl(path);
}

/** Resolve a music cover art path. */
export function musicCoverUrl(path: string): string {
  return assetUrl(path);
}
