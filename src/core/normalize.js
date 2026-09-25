/**
 * Normalize raw user input into plate-safe characters.
 * Pipeline: NFD strip → uppercase → transliteration → filter. See docs/ARCHITECTURE.md §4.
 * @param {string} input
 * @param {{ translit?: Record<string, string> }} [options]
 * @returns {string}
 */
export function normalize(input, options) {
  void input, options;
  throw new Error('normalize: not implemented (Phase 1)');
}
