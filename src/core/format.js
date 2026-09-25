/**
 * @typedef {object} FormatResult
 * @property {string} value     formatted string, e.g. `AB-123`
 * @property {string} raw       accepted chars only, e.g. `AB123`
 * @property {boolean} complete every required slot is filled
 * @property {{ char: string, position: number }[]} rejected
 * @property {number[]} map     map[i] = index in `value` of raw char i
 */

/**
 * Apply a compiled mask program to normalized input.
 * @param {string} input
 * @param {import('./mask.js').Token[]} program
 * @returns {FormatResult}
 */
export function format(input, program) {
  void input, program;
  throw new Error('format: not implemented (Phase 1)');
}
