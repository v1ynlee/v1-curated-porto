/**
 * Asset source configuration.
 *
 * Controls where images and audio are served from depending on
 * the runtime environment:
 *
 *   Development  →  local public/ directory  (empty base = relative paths)
 *   Production   →  Cloudflare R2 CDN
 *
 * Values are read from environment variables embedded at build time:
 *   NEXT_PUBLIC_SITE_URL  — canonical site origin (default: https://curated-comics.cyou)
 *   NEXT_PUBLIC_CDN_URL   — R2 CDN base URL    (default: https://cdn.curated-comics.cyou in prod)
 *
 * To override locally, set NEXT_PUBLIC_CDN_URL in .env.local.
 */

/** Public site origin. Used for canonical URLs, OG tags, sitemap, etc. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://curated-comics.cyou";

/**
 * CDN base URL for R2-hosted assets.
 *
 * Resolves in priority order:
 *   1. NEXT_PUBLIC_CDN_URL env var (set in .env.production or Vercel dashboard)
 *   2. Empty string in development (assets served from local /public)
 *
 * Never falls back to SITE_URL — that would silently route CDN assets to
 * the main domain instead of R2, which is what caused the production bug.
 */
export const CDN_URL: string = (() => {
  const val = process.env.NEXT_PUBLIC_CDN_URL;
  // Return the env var as-is (could be the CDN URL or empty for local dev)
  return val ?? "";
})();

/**
 * Returns true when running in a production-like environment where
 * CDN assets should be served from Cloudflare R2.
 */
export const IS_PRODUCTION = CDN_URL.length > 0;

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
