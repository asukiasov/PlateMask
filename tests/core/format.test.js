import { describe, it } from 'vitest';

describe('format — fixed groups', () => {
  it.todo('AA-###-AA: "ab123cd" → "AB-123-CD", complete');
  it.todo('auto-inserts literal when a group fills ("AB" → "AB-")');
  it.todo('rejects digit in letter slot and reports it in `rejected`');
  it.todo('ignores user-typed separators that match the next literal');
  it.todo('custom token alphabet rejects I, O, U for FR');
});

describe('format — variable groups', () => {
  it.todo('DE: "B" then "-" closes 1-letter district → "B-"');
  it.todo('DE: "BMW" stays "BMW" (ambiguous, no auto-literal)');
  it.todo('DE: letter→digit switch closes letter group ("BMW1" → "BM-W 1"? decide + ADR)');
  it.todo('group closes at max length');
});

describe('format — map', () => {
  it.todo('map points each raw index to its position in value');
});
