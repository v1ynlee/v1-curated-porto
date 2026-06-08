/**
 * Cover / character image rotation constants.
 *
 * Both the Favorites section and the Characters section share these values.
 * Edit here to adjust the rotation timing globally.
 */

/** Minimum delay (ms) before rotating to the next cover image. */
export const COVER_ROTATION_MIN_MS = 10_000;

/** Maximum delay (ms) before rotating to the next cover image. */
export const COVER_ROTATION_MAX_MS = 15_000;

/** Number of favorite items to display per render cycle. */
export const FAVORITES_DISPLAY_COUNT = 8;

/** Number of character items to display per render cycle. */
export const CHARACTERS_DISPLAY_COUNT = 12;
