# Roadmap

Each phase ends with green CI (tests + size budget). Check boxes as work lands.

## Phase 0 — Foundations ✅ scaffolded
- [x] Folder structure, CLAUDE.md, architecture + decision records
- [x] package.json, Rollup, Vitest, size-limit, CI workflow
- [ ] `npm install` and first green CI run
- [ ] Confirm license (MIT assumed) and npm package name availability (`plate-mask`)

## Phase 1 — Pure core (`src/core`)
- [ ] `normalize()` — NFD strip, uppercase, transliteration map, separator unification
- [ ] `compile()` — mask string → token program (`A # *`, literals, `{m,n}`, `\` escape, custom tokens)
- [ ] `format()` — fixed groups with auto-literal insertion
- [ ] `format()` — variable groups (close on max / class switch / typed separator)
- [ ] `format()` returns `map` (raw index ↔ value index) and `rejected`
- [ ] Confusable correction (opt-in, position-aware)
- [ ] Multi-mask selection (`masks: [...]`)
- [ ] 100% branch coverage on core

## Phase 2 — DOM controller (`src/dom`)
- [ ] `PlateMask` class: selector | element binding, options, `destroy()`
- [ ] `beforeinput` intent capture + `input` formatting
- [ ] Caret save/restore via raw-count algorithm
- [ ] Backspace/Delete across literals
- [ ] Paste (full and partial, with junk chars)
- [ ] IME composition guard
- [ ] Native value setter write (React/Vue compatibility)
- [ ] CustomEvents: `change`, `complete`, `reject`
- [ ] Attribute management (`autocapitalize`, `maxlength`, …) + restore
- [ ] Playwright e2e suite (desktop + mobile emulation)

## Phase 3 — Presets (`src/presets`), 47 Latin-script countries in tiers
Scope and per-country status live in `docs/PRESETS.md` (ADR 0002, 0003). Research first; every preset needs a source link and fixtures.

### 3a — Tier 1: Latin + Cyrillic look-alike, single format (26 countries)
EU core (FR, IT, ES, DE, GB, PL), TR, Mercosur (BR, AR), CO, PE, **Georgia**, and **all post-Soviet states** (RU, UA, BY, MD, AM, AZ, KZ, UZ, KG, TJ, TM, EE, LV, LT).
- [ ] Cyrillic look-alike mapping per preset (RU/UA/BY), with `output: 'latin' | 'cyrillic'`
- [ ] `match(raw, presets)` → candidate list
- [ ] Placeholder generation from the mask

### 3b — Tier 2: Latin, multi-format / regional (21 countries)
US (50 states + DC), CA, MX, IN, ID, PH, MY, PK, NG, ZA, KE, UG, TZ, GH, VN, CD, CI, MG, MZ, AO, DZ.
- [ ] Sub-preset convention (`US-CA`, `CA-ON`, …) and per-country index re-exports
- [ ] Dictionary tokens (needed for IN state codes and ID region prefixes)

## Phase 4 — Release
- [ ] Rollup: ESM + UMD min + per-preset ESM, `.d.ts` from JSDoc
- [ ] `exports` map verified with `publint` + `are-the-types-wrong`
- [ ] Demo page (`examples/`) deployed to GitHub Pages
- [ ] README: quickstart, API, mask syntax, preset table, browser support
- [ ] Changesets + npm publish via GitHub Actions (provenance)
- [ ] v1.0.0

## Later / ideas
- Framework adapters as separate packages (`@plate-mask/react`, `/vue`)
- More presets via community contributions (template in CONTRIBUTING.md)
