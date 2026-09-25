# ADR 0001 — Revisions to the original pitch

Date: 2026-09-25 · Status: proposed

The original plan was reviewed before any code was written. These are the changes and the reasons for them.

## 1. Fixed masks → variable groups + custom tokens
**Problem:** `AA-AA ####` for Germany is incorrect. German plates are `1–3 letters · 1–2 letters · 1–4 digits`. Italy, France, the UK and Spain also restrict *which* letters may appear.
**Decision:** The mask language gets `{m,n}` quantifiers and per-preset custom tokens.
**Consequence:** The parser is slightly larger, but without this the library can't model real plates, which is its whole purpose.

## 2. No auto-insert of separators before variable groups close
**Problem:** In `A{1,3}-A{1,2}`, the input `BMW` could be `B-MW`, `BM-W` or `BMW-`.
**Decision:** Separators after variable groups are inserted only when the group reaches its max, when the character class changes, or when the user types a separator.

## 3. "Country detection" → `match()` returning candidates
**Problem:** FR, GE and IT share the `2 letters · 3 digits · 2 letters` shape. Prefix detection would silently pick the wrong country.
**Decision:** `match(raw, presets)` returns every preset that accepts the input. The app decides what to do with it.

## 4. "US Standard" removed
**Problem:** Each US state sets its own format.
**Decision:** Per-state presets (`US-CA`, `US-NY`, …).

## 5. `beforeinput` instead of `keydown` for intent
**Problem:** Android virtual keyboards send `keyCode 229` for every key, and `keydown` doesn't show paste or autocorrect edits.
**Decision:** Use `beforeinput.inputType` to learn the intent and `input` to format. Also handle IME composition events.

## 6. Diacritic stripping → normalization pipeline with transliteration and confusables
**Problem:** Stripping accents alone doesn't help much. Real-world failures come from Cyrillic look-alikes (mobile keyboards on RU/UA/GE devices) and from O/0 and I/1 confusion.
**Decision:** The pipeline is NFD strip → uppercase → optional transliteration → optional position-aware confusable fix → filter.
**Consequence:** This is the plate-specific feature that sets PlateMask apart from generic maskers (IMask, Maska).

## 7. Pure core separated from DOM
**Decision:** `format()` is a pure function that runs in Node. Consequences: easy table-driven tests, the same rules can validate on the server, and framework adapters stay thin.

## 8. Distribution: ESM + UMD, drop CJS; JS + JSDoc, no TypeScript source
**Reason:** Modern Node can `require()` ESM. JSDoc gives types at zero build cost, and contributors can edit plain JS.

## 9. Size budget enforced in CI
**Decision:** `size-limit` caps core + DOM at 2 KB gz. Presets are separate entry points so users only pay for the countries they import.
