import type { NextConfig } from "next";

const CDN_HOSTNAME = "cdn.curated-comics.cyou";

const nextConfig: NextConfig = {
  // ── Explicit env injection ────────────────────────────────────────────────
  // Injecting here guarantees the values are embedded by next.config evaluation,
  // not relying solely on process.env replacement in source files (which can be
  // served from Vercel's build cache when source files haven't changed).
  env: {
    NEXT_PUBLIC_CDN_URL:
      process.env.NEXT_PUBLIC_CDN_URL ?? "https://cdn.curated-comics.cyou",
    NEXT_PUBLIC_SITE_URL:
      process.env.NEXT_PUBLIC_SITE_URL ?? "https://curated-comics.cyou",
  },
  // ── Image optimization ────────────────────────────────────────────────────
  images: {
    // Allow Next/Image to load and optimise images from Cloudflare R2.
    // Split into separate entries — Next.js remotePatterns does not support
    // shell-style brace expansion {a,b,c} in pathname.
    remotePatterns: [
      {
        protocol: "https",
        hostname: CDN_HOSTNAME,
        port: "",
        pathname: "/covers/**",
      },
      {
        protocol: "https",
        hostname: CDN_HOSTNAME,
        port: "",
        pathname: "/characters/**",
      },
      {
        protocol: "https",
        hostname: CDN_HOSTNAME,
        port: "",
        pathname: "/music/covers/**",
      },
      {
        protocol: "https",
        hostname: CDN_HOSTNAME,
        port: "",
        pathname: "/music/audio/**",
      },
    ],
    // Preserve webp output format for R2-hosted assets.
    formats: ["image/webp", "image/avif"],
    // Slightly relax the cache TTL for CDN images (10 minutes minimum).
    minimumCacheTTL: 600,
  },

  // ── Production hardening ──────────────────────────────────────────────────
  // Remove X-Powered-By header to reduce fingerprinting surface.
  poweredByHeader: false,

  // Compress responses (default true; explicit for clarity).
  compress: true,
};

export default nextConfig;
