/**
 * @typedef {object} Preset
 * @property {string} code
 * @property {string} name
 * @property {string[]} masks
 * @property {Record<string, string>} [tokens]
 * @property {string} [example]
 */

/**
 * @typedef {object} PlateMaskOptions
 * @property {string} [mask]
 * @property {Preset} [preset]
 * @property {boolean} [confusables] position-aware O↔0, I↔1 correction
 */

export class PlateMask {
  /**
   * @param {string | HTMLInputElement} target CSS selector or input element
   * @param {PlateMaskOptions} options
   */
  constructor(target, options) {
    void target, options;
    throw new Error('PlateMask: not implemented (Phase 2)');
  }
}
