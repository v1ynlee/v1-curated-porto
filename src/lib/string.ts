/**
 * String processing utilities.
 *
 * Pure, side-effect-free helpers safe to use in both server and client contexts.
 */

/**
 * Splits a paragraph around a highlighted phrase so the phrase can be
 * wrapped independently (e.g. in a `<Highlighter>` component) without
 * surrounding hardcoded markup.
 *
 * Returns `null` when the phrase is not found — callers should fall back
 * to rendering the plain text unchanged.
 *
 * @param text   - Full paragraph text.
 * @param phrase - Exact substring to locate and extract.
 *
 * @example
 * const parts = splitAroundPhrase("I love reading manga", "reading manga");
 * // { before: "I love ", match: "reading manga", after: "" }
 */
export function splitAroundPhrase(
  text: string,
  phrase: string,
): { before: string; match: string; after: string } | null {
  const idx = text.indexOf(phrase);
  if (idx === -1) return null;
  return {
    before: text.slice(0, idx),
    match: text.slice(idx, idx + phrase.length),
    after: text.slice(idx + phrase.length),
  };
}
