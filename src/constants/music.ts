/**
 * Music player numeric constants.
 * These represent fixed boundaries and do NOT belong in user-editable config.
 */

/** The maximum volume value (0–100 scale used for display/slider). */
export const MAX_VOLUME = 100;

/** The minimum volume value. */
export const MIN_VOLUME = 0;

/** Step increment for keyboard-driven volume adjustment. */
export const VOLUME_STEP = 5;

/** localStorage key used to persist user volume preference. */
export const VOLUME_STORAGE_KEY = "music-player-volume";
