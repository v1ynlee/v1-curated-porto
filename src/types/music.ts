/** A single track entry as it appears in public/music/playlist.json */
export interface Track {
  /** Display title */
  title: string;
  /** URL-safe slug used to derive audio and cover paths */
  slug: string;
  /** Absolute-path to the .opus audio file served from /public */
  audio: string;
  /** Absolute-path to the .webp cover image served from /public */
  cover: string;
}

/** Runtime-safe validation: returns true when the value looks like a Track */
export function isTrack(value: unknown): value is Track {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.title === "string" &&
    typeof v.slug === "string" &&
    typeof v.audio === "string" &&
    typeof v.cover === "string"
  );
}
