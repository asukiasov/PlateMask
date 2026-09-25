# PlateMask — guide for Claude

Zero-dependency Vanilla JS input mask engine for international license plates. Open source (MIT), npm name `plate-mask`.

## Read first
- `docs/ARCHITECTURE.md` — layers, mask language, caret algorithm, API. **Source of truth for design.**
- `docs/ROADMAP.md` — current phase and checklist. Tick boxes as work lands.
- `docs/decisions/` — ADRs. Add a new numbered ADR for any design change; don't silently diverge from ARCHITECTURE.md.
- `docs/PRESETS.md` — plate format research; status per country.

## Commands
```bash
npm test            # vitest run (core + dom, happy-dom)
npm run test:watch
npm run test:e2e    # playwright, real browsers (caret behavior)
npm run build       # rollup → dist/ + .d.ts from JSDoc
npm run size        # size-limit budget check
npm run lint
```

## Hard rules
1. **Zero runtime dependencies.** Never add to `dependencies`. devDependencies are fine.
2. **Size budget:** core + dom ≤ 2 KB min+gz. Run `npm run size` after any src change. If you blow the budget, find the cut before adding code.
3. **Layering:** `src/core` is pure, has no DOM globals, and must run in Node. Only `src/dom` touches `document`/`window`/elements. `src/presets` is data only.
4. **Plain JS + JSDoc types.** No TypeScript source files. Every exported function has JSDoc `@param`/`@returns`.
5. **TDD:** write the failing test first. Core tests are table-driven (`it.each`). Caret behavior must also have a Playwright test, because jsdom/happy-dom selection is not trustworthy.
6. **Presets need a source.** No preset without a source link in `docs/PRESETS.md` and valid/invalid fixtures in `tests/presets/`. Don't invent plate formats from memory; flag them `draft`.
7. **No `keydown` keyCode logic** for editing intent. Use `beforeinput.inputType`, which is reliable on Android.
8. Target: evergreen browsers (ES2020). No polyfills in the bundle.
   **No fonts, CSS or visual plate rendering**, in core or as a companion package. Styling is the user's job.
9. **Latin-script plates only** (47 countries, ADR 0003). RU/UA/BY Cyrillic look-alikes are typed as Latin and mapped per preset. Alphabets come from presets; don't hardcode `[A-Z]` outside the default `A` token. Never reformat during IME composition.
10. Build presets **tier by tier** (ROADMAP Phase 3a → 3b). Treat the shape hints in `docs/PRESETS.md` as unverified until the table has a source link.

## Code style
- ES modules, named exports only (no default exports).
- Small pure functions; avoid classes in core. The only class is `PlateMask` in `src/dom`.
- Prefer short, minifier-friendly code (the budget is tight), but never at the cost of readability in public API names.
- Private/internal helpers are not re-exported from `src/index.js`.

## Layout
```
src/core/      normalize.js, mask.js (compile), format.js
src/dom/       plate-mask.js (controller), caret.js
src/presets/   one file per country, e.g. fr.js → export const FR
src/index.js   public entry (re-exports core + PlateMask)
tests/core|dom|presets   vitest
tests/e2e      playwright specs + fixtures page
examples/      demo page (no build step, imports from src/)
```
