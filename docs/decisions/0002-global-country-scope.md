# ADR 0002 — Global country scope (top-50 by population + post-Soviet)

Date: 2026-09-25 · Status: partially superseded by ADR 0003 (non-Latin scope dropped)

## Context
The target list is the 50 most populous countries plus all post-Soviet states and Georgia: **62 countries**. The original design assumed Latin `[A-Z0-9]` plates. Many target countries don't use Latin plates:

| Script on plate | Countries |
|---|---|
| Latin | most of Europe, the Americas, Africa, India*, Indonesia, Philippines, Malaysia, Pakistan*, Turkey, Georgia, Baltics, Central Asia |
| Cyrillic (Latin look-alike subset) | Russia, Ukraine, Belarus, Kazakhstan (old), Kyrgyzstan, Tajikistan |
| Chinese characters | China (province character + Latin + digits) |
| Kanji + kana | Japan (region name + class number + kana + serial) |
| Hangul | South Korea (`12가 3456`) |
| Thai | Thailand (+ province name) |
| Arabic / Persian letters and digits | Egypt, Saudi Arabia (dual Arabic + Latin), Iraq, Iran, Afghanistan, Yemen, Sudan, Morocco |
| Bengali | Bangladesh |
| Burmese | Myanmar |
| Ge'ez / Amharic | Ethiopia |

\* Also has regional or state variants.

The US, Canada, Mexico, India, Pakistan, Brazil (old vs. Mercosur) and others have **several formats per country or per region**.

## Decisions

1. **Token alphabets are Unicode sets, not `[A-Z]`.** `A`, `#` and `*` stay as Latin defaults. Presets define script-specific tokens (e.g. `K: 'АВЕКМНОРСТУХ'` for Russia, a list of Hangul syllables for Korea).
2. **Dictionary tokens.** A token can be an enumerated list of multi-character strings (Japanese region names, Chinese province characters, Thai provinces). They match by prefix while typing.
3. **Digits are script-aware.** The `#` slot accepts ASCII, Arabic-Indic `٠-٩`, Persian `۰-۹` and Bengali `০-৯` digits. The preset's `output` option (`native` | `latin`) sets which digits are stored.
4. **Normalization is script-aware.** Uppercasing and diacritic stripping apply only to Latin characters. Cyrillic↔Latin look-alike mapping is per preset: typing `A` on a Latin keyboard into a Russian slot gives `А` (Cyrillic), or the reverse if the preset sets `output: 'latin'`.
5. **IME is a first-class path.** Hangul, Chinese, Japanese and Thai input goes through composition. The controller must never reformat during `compositionstart…compositionend`. Every CJK/Thai preset needs an e2e test.
6. **Region-bearing countries get sub-presets.** `US-CA`, `CA-ON`, `MX-CMX`, `IN` (national shape with a state-code dictionary), `PK-PB`, and so on. Each `country/index.js` re-exports its regions.
7. **Tiered delivery** (see ROADMAP Phase 3). Research is the bottleneck, not code. Each tier ships on its own.
8. **The core budget doesn't change.** Scripts and dictionaries live in presets. A preset with a large dictionary (JP, TH) gets its own size budget line and is documented as heavy.

## Consequences
- The core grows by roughly 200–300 B for Unicode sets, dictionary tokens and digit mapping. Still aiming for ≤ 2 KB. If the core goes over budget, dictionary-token support moves to an opt-in `plate-mask/ext/dictionary` entry point.
- RTL (Arabic and Persian): the input value stays in logical order; `dir="auto"` is set on bind. RTL caret needs its own Playwright cases.
- Some countries have weak official sources (e.g. DRC, Sudan, Yemen, Afghanistan). Those presets may stay `draft` longer and are listed as "help wanted".
