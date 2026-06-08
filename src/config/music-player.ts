/**
 * Music player runtime configuration.
 *
 * Edit this file to change player defaults without touching component or hook
 * logic.  All values are typed as `const` so TypeScript narrows them to their
 * literal types — this prevents accidental mutation and enables exhaustive
 * checks in consumers.
 */
export const musicPlayerConfig = {
  /**
   * Initial volume on first visit (0–1 scale, matching the HTMLAudioElement API).
   * Falls back to this value when no persisted preference is found.
   * Corresponds to 70 on the 0–100 display scale.
   */
  defaultVolume: 0.7,

  /**
   * When true, the playlist loops back to track 0 after the last track ends.
   * When false, playback stops at the end of the last track.
   */
  loop: true,

  /**
   * Show the playlist panel toggle button.
   */
  showPlaylist: true,

  /**
   * Show the volume bar in the expanded player view.
   */
  showVolumeBar: true,

  /**
   * Show the track cover artwork in the track-info row.
   */
  showTrackCover: true,

  /**
   * Persist volume to localStorage so it survives page refreshes and track
   * changes.  Disable only for privacy-sensitive deployments.
   */
  persistVolume: true,
} as const;
