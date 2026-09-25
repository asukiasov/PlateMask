# ADR 0003 — Latin-only scope, no fonts

Date: 2026-09-25 · Status: proposed · Supersedes parts of ADR 0002

## 1. Non-Latin plates are out of scope
**Decision:** We drop Tier 3 (CN, JP, KR, TH, IR, EG, SA, IQ, AF, YE, SD, MA, BD, MM, ET). Scope is **47 countries** with Latin-script plates.

**What stays from ADR 0002:**
- Custom per-preset alphabets (FR, IT, ES, GB letter restrictions).
- Sub-presets per region (US-xx, CA-xx, MX-xx, PK-xx, ZA-xx).
- Dictionary tokens, now only for Latin codes (IN state codes like `MH`, ID region prefixes).
- **Cyrillic look-alike plates (RU, UA, BY) stay.** Their letters are a subset that looks identical to Latin (`А В Е К М Н О Р С Т У Х`), so users type them on a Latin keyboard. The preset option `output: 'latin' | 'cyrillic'` decides which code points are stored. Default: `latin`.

**What goes:**
- Script-aware digits (Arabic-Indic, Persian, Bengali).
- IME-specific e2e for CJK, Hangul and Thai. We still keep a composition guard, which is cheap and protects any keyboard.
- RTL handling.

**Consequence:** The core is roughly 150–200 B smaller than planned under ADR 0002. The `A` token is still defined per preset, not hardcoded.

## 2. No fonts
We looked into bundling plate typefaces (a Russian GOST font, FE-Schrift, Dealerplate) and **rejected it**. A single subset font (≈4 KB) is twice the whole library budget, and it has nothing to do with input formatting. Most candidate fonts also had licenses that forbid redistribution. PlateMask ships no fonts, CSS or plate visuals, not even as a companion package. Users style their inputs themselves.
