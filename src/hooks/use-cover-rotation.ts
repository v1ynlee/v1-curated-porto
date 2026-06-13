"use client";

import { useEffect, useRef, useState } from "react";
import { randInt } from "@/lib/pick-random";
import { COVER_ROTATION_MIN_MS, COVER_ROTATION_MAX_MS } from "@/constants/covers";

export type CoverRotationResult = {
  /** Current 1-based cover index. */
  idx: number;
  /** Slide direction produced by the most recent rotation. */
  dir: "left" | "right";
};

/**
 * Drives automatic cover image rotation for cards and carousels.
 *
 * - Picks a random starting index within [1, coverTotal].
 * - When `coverTotal > 1`, schedules rotations at random intervals in the
 *   range [COVER_ROTATION_MIN_MS, COVER_ROTATION_MAX_MS].
 * - Alternates slide direction (left ↔ right) on each rotation.
 * - Cleans up the pending timeout on unmount.
 *
 * @param coverTotal  Total number of available cover images (1-based).
 *
 * @example
 * const { idx, dir } = useCoverRotation(item.coverTotal);
 */
export function useCoverRotation(coverTotal: number): CoverRotationResult {
  const safeTotal = Math.max(1, coverTotal);

  const [idx, setIdx] = useState<number>(() => randInt(1, safeTotal));
  const [dir, setDir] = useState<"left" | "right">("right");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (safeTotal <= 1) return;

    const schedule = () => {
      const delay = randInt(COVER_ROTATION_MIN_MS, COVER_ROTATION_MAX_MS);
      timerRef.current = setTimeout(() => {
        setDir((prev) => (prev === "right" ? "left" : "right"));
        setIdx((prev) => (prev % safeTotal) + 1); // 1-based wrap
        schedule();
      }, delay);
    };

    schedule();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [safeTotal]);

  return { idx, dir };
}
