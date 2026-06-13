/**
 * Random utility helpers.
 *
 * Single canonical implementation used across the entire codebase.
 * Import from here — do not re-implement in section files or hooks.
 */

// ─── Primitives ───────────────────────────────────────────────────────────────

/**
 * Random integer in the inclusive range [min, max].
 *
 * @param min - Lower bound (inclusive).
 * @param max - Upper bound (inclusive).
 */
export function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Fisher-Yates in-place shuffle.
 * Mutates and returns the same array — clone before calling if needed.
 */
function fisherYates<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Returns a new shuffled copy of the array (non-mutating).
 *
 * @param arr - Source array.
 */
export function shuffle<T>(arr: readonly T[]): T[] {
  return fisherYates([...arr]);
}

// ─── Composite ────────────────────────────────────────────────────────────────

/**
 * Returns `n` items chosen at random (without replacement) from `arr`.
 *
 * - When `arr.length <= n` the entire array is returned in shuffled order.
 * - Duplicates in the source array are preserved as-is (positional uniqueness).
 *
 * @param arr - Source array.
 * @param n   - Maximum number of items to return.
 */
export function pickRandom<T>(arr: readonly T[], n: number): T[] {
  if (n <= 0) return [];
  if (arr.length <= n) return fisherYates([...arr]);
  return fisherYates([...arr]).slice(0, n);
}
