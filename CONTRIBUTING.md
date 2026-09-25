# Contributing

Thanks for helping. PlateMask has three hard rules: **zero dependencies**, **≤ 2 KB gzipped core**, and **tests first**.

## Setup
```bash
npm install
npx playwright install   # only for e2e
npm test
```

## Adding a country preset
1. Add a row to `docs/PRESETS.md` with a **source link** (official registry preferred).
2. Create `src/presets/<code>.js` that exports a `Preset` object (see `src/presets/fr.js`).
3. Add `tests/presets/<code>.test.js` with valid and invalid fixtures.
4. Only current issuing formats. Legacy or vanity plates go in a follow-up PR as extra `masks`.

## Design changes
Open an ADR in `docs/decisions/NNNN-title.md` before changing behavior described in `docs/ARCHITECTURE.md`.
