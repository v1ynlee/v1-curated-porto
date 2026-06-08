import type { NextConfig } from "next";

const CDN_HOSTNAME = "cdn.curated-comics.cyou";

const nextConfig: NextConfig = {
  // ── Image optimization ────────────────────────────────────────────────────
  images: {
    // Allow Next/Image to load and optimise images from Cloudflare R2.
    remotePatterns: [
      {
        protocol: "https",
        hostname: CDN_HOSTNAME,
        port: "",
        // Scope to the exact CDN-backed paths to avoid open-redirect risk.
        pathname: "/{covers,characters,music/covers}/**",
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
