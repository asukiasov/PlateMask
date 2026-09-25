/**
 * @typedef {{ type: 'slot', chars: string, min: number, max: number }
 *         | { type: 'literal', char: string }} Token
 */

/**
 * Compile a mask string (e.g. `AA-###-AA`, `A{1,3}-A{1,2} #{1,4}`) into a token program.
 * @param {string} mask
 * @param {{ tokens?: Record<string, string> }} [options] custom token alphabets
 * @returns {Token[]}
 */
export function compile(mask, options) {
  void mask, options;
  throw new Error('compile: not implemented (Phase 1)');
}
