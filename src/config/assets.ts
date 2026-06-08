/**
 * Asset source configuration.
 *
 * Controls where images and audio are served from depending on
 * the runtime environment:
 *
 *   Development  →  local public/ directory  (empty base = relative paths)
 *   Production   →  Cloudflare R2 CDN
 *
 * To override locally, set NEXT_PUBLIC_CDN_URL in .env.local.
 */

/** Public site origin. Used for canonical URLs, OG tags, sitemap, etc. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://curated-comics.cyou";

/**
 * CDN base URL for R2-hosted assets.
 *
 * - Empty string in development → assets are served from /public directly.
 * - Set to https://cdn.curated-comics.cyou in production (via .env.production
 *   or the Vercel environment dashboard).
 */
export const CDN_URL = process.env.NEXT_PUBLIC_CDN_URL ?? "";

/**
 * R2 asset path prefixes that are served via CDN in production.
 * Paths matching these prefixes will be rewritten when CDN_URL is set.
 */
export const CDN_ASSET_PATHS = [
  "/covers/",
  "/characters/",
  "/music/audio/",
  "/music/covers/",
] as const;

export type CdnAssetPath = (typeof CDN_ASSET_PATHS)[number];
