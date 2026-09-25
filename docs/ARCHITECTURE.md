# PlateMask — Architecture

> Status: **draft v2** (revised from the original pitch; see `docs/decisions/` for why each change was made).

## 1. Goals

A zero-dependency Vanilla JS library that formats and structurally validates **license plate input** as the user types.

| Goal | Measure |
|---|---|
| Tiny | core + DOM controller ≤ **2 KB** min+gz (enforced in CI by `size-limit`); each preset ≤ 200 B |
| Zero deps | `dependencies` in package.json stays empty, forever |
| Correct caret | no cursor jumps on insert, delete, paste, mid-string edit, selection replace — verified in real browsers (Playwright), not only jsdom |
| Mobile-safe | works with Android Gboard / iOS keyboards and IME composition |
| Framework-agnostic | plain DOM binding; the pure `format()` works in Node for server-side validation too |

### Non-goals (v1)

- Legal validity (issued ranges, banned combinations, region codes lists). We check *structure*, and presets may add an optional `validate` hook.
- OCR / image recognition.
- Non-Latin plates (CN, JP, KR, TH, Arabic/Persian, …), see ADR 0003.
- Fonts, CSS or plate visuals. Not shipped in core or as a companion package (ADR 0003).
- Reliable automatic country detection (formats collide — FR `AB-123-CD` vs GE `AB-123-CD` vs IT `AB 123 CD`). We ship `match(raw, presets)` returning *candidates*, never auto-switching.
- Framework wrappers in core. Thin adapters may come later as separate packages.

## 2. Layers

```
┌─────────────────────────────────────────────────────────────┐
│ src/dom/        DOM controller (the only code touching DOM) │
│   beforeinput / input / paste / composition listeners        │
│   caret save → core.format → write value → caret restore     │
│   CustomEvent dispatch                                       │
├─────────────────────────────────────────────────────────────┤
│ src/core/       Pure functions, no DOM, runs in Node         │
│   normalize.js  uppercase, diacritics, confusables, strip    │
│   mask.js       compile mask string → token program          │
│   format.js     raw chars × program → { value, raw, ... }    │
├─────────────────────────────────────────────────────────────┤
│ src/presets/    Data only. One file per country. Tree-shaken │
└─────────────────────────────────────────────────────────────┘
```

**Rule:** `core` never imports from `dom`. `presets` import nothing except types.

## 3. Mask language

| Syntax | Meaning |
|---|---|
| `A` | letter `[A-Z]` |
| `#` | digit `[0-9]` |
| `*` | alphanumeric `[A-Z0-9]` |
| `-` ` ` `.` | literal separator |
| `X{m,n}` | token repeated m..n times (variable-length group) |
| `\X` | escaped literal (e.g. fixed prefix) |
| custom | `tokens: { L: 'ABCDEFGHJKLMNPRSTVWXYZ' }` — restricted alphabets per preset |
| dictionary | `tokens: { S: ['MH', 'DL', 'KA', …] }` — enumerated multi-char values, prefix-matched while typing (IN state codes, ID region prefixes) |

**Latin-script plates only** (ADR 0003). RU/UA/BY Cyrillic look-alike letters are typed as Latin; the preset's `output: 'latin' | 'cyrillic'` decides which characters are stored.

### Separator insertion rules (key design point)

1. **Fixed groups** (`AA`, `###`): when a group fills, the following literal is inserted **automatically**.
2. **Variable groups** (`A{1,3}`): the group closes when
   - it reaches its maximum, **or**
   - the next char cannot belong to it but fits the next group (letter→digit switch), **or**
   - the user types the separator (or any separator char — `-`, space, `.` are treated as "close group" intent).
   Separators are never auto-inserted *before* a variable group closes, because `BMW` is ambiguous (`B-MW` vs `BM-W`).
3. On **backspace**, deleting across a literal removes the literal *and* the preceding character in one step (literals are not editable characters).

## 4. Core API (pure)

```js
import { compile, format, normalize } from 'plate-mask/core';

const program = compile('AA-###-AA', { tokens });
format('ab123', program);
// → { value: 'AB-123', raw: 'AB123', complete: false, rejected: [], map: [...] }
```

`map` relates each raw-char index to its position in `value`; the DOM layer uses it for caret restoration.

### Normalization pipeline (order matters)

1. Unicode NFD + strip combining marks (`é → E`)
2. Uppercase
3. Optional **transliteration map** (e.g. Cyrillic look-alikes `А В Е К М Н О Р С Т Х → A B E K M H O P C T X`)
4. **Position-aware confusable correction** (opt-in, `confusables: true`): in a `#` slot, `O→0`, `I→1`, `S→5`, `B→8`; in an `A` slot, the reverse. A feature specific to plates that generic mask libraries don't offer.
5. Drop everything not in `[A-Z0-9]` and not a separator.

## 5. DOM controller

```js
import { PlateMask } from 'plate-mask';
import { FR } from 'plate-mask/presets/fr';

const pm = new PlateMask('#plate', { preset: FR });   // or { mask: 'AA-###-AA' }
pm.value;        // 'AB-123-CD'
pm.raw;          // 'AB123CD'
pm.complete;     // true
pm.setMask(DE);  // swap on country change, re-formats current raw
pm.destroy();    // removes listeners, restores attributes
```

Events (bubbling `CustomEvent`s on the input):

| Event | `detail` |
|---|---|
| `platemask:change` | `{ value, raw, complete }` |
| `platemask:complete` | `{ value, raw }` |
| `platemask:reject` | `{ char, position }` |

### Caret algorithm

Do **not** do position arithmetic on the formatted string. Instead:

1. Before formatting: count **accepted raw chars left of the caret** (`k`).
2. Format.
3. Place the caret right after the `k`-th raw char in the new value (via `map`); if the next char is an auto-inserted literal and the user was typing forward, jump past it.

This one rule handles insert, delete, paste and mid-string edits the same way.

### Input handling

- `beforeinput` → learn intent (`insertText`, `deleteContentBackward`, `deleteContentForward`, `insertFromPaste`, …). No `keydown` keyCode logic (Android sends 229).
- `input` → format + restore caret.
- `compositionstart/end` → do not reformat mid-composition; format on `compositionend`.
- On bind, set (if not present): `autocapitalize="characters"`, `autocomplete="off"`, `autocorrect="off"`, `spellcheck="false"`, `maxlength` derived from mask. Restore on `destroy()`.

### Framework note

React controlled inputs ignore a plain `el.value = x`. The controller writes the value through the native `HTMLInputElement.prototype` value setter and then dispatches `input`, so React/Vue see the change. Covered by an e2e test.

## 6. Presets

A preset is data:

```js
export const FR = {
  code: 'FR',
  name: 'France (SIV)',
  masks: ['LL-###-LL'],
  tokens: { L: 'ABCDEFGHJKLMNPQRSTVWXYZ' }, // no I, O, U
  example: 'AB-123-CD',
};
```

`masks` is an array: some countries have several current formats. The engine picks the first mask that accepts the input so far.

See `docs/PRESETS.md` for sourced format notes. **No preset ships without a source link and test fixtures.**

## 7. Build & distribution

- Source: modern ES2020 JavaScript with **JSDoc types**; `.d.ts` generated via `tsc --emitDeclarationOnly`. No TS compile step for source.
- Rollup outputs:
  - `dist/plate-mask.mjs` (ESM, primary)
  - `dist/plate-mask.umd.min.js` (for `<script>` / CDN, global `PlateMask`)
  - `dist/presets/*.mjs` (one per country, tree-shakable)
- CJS intentionally dropped: Node ≥ 20.19/22.12 can `require()` ESM. Revisit if users ask.
- `package.json#exports` map with `types` conditions; `sideEffects: false`.

## 8. Testing

| Layer | Tool | What |
|---|---|---|
| core | Vitest (node) | table-driven: input → value/raw/complete; normalization; every preset's fixtures |
| dom | Vitest + happy-dom | listeners, events, attribute handling, destroy |
| e2e | Playwright (Chromium, WebKit, Firefox + mobile emulation) | real caret behavior: rapid typing, paste, backspace across literals, selection replace, IME |
| size | size-limit | fails CI above budget |
