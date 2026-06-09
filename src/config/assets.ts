/**
 * Asset source configuration — single source of truth for URLs.
 *
 * Values are injected at build time via next.config.ts `env:` block,
 * which is evaluated fresh on every Vercel build regardless of cache.
 *
 *   NEXT_PUBLIC_SITE_URL  — canonical site origin
 *   NEXT_PUBLIC_CDN_URL   — Cloudflare R2 CDN base URL (empty = local dev)
 */

/** Canonical site origin. Used in OG tags, canonical links. */
export const SITE_URL =
  (process.env.NEXT_PUBLIC_SITE_URL ?? "https://curated-comics.cyou").trim();

/**
 * CDN base URL for R2-hosted assets.
 * Empty string in local dev → assets served from /public.
 * Set to https://cdn.curated-comics.cyou in production.
 */
export const CDN_URL =
  (process.env.NEXT_PUBLIC_CDN_URL ?? "").trim();

/**
 * R2 asset path prefixes. Only paths under these directories
 * are rewritten to CDN URLs.
 */
export const CDN_ASSET_PATHS = [
  "/covers/",
  "/characters/",
  "/music/audio/",
  "/music/covers/",
] as const;

export type CdnAssetPath = (typeof CDN_ASSET_PATHS)[number];
