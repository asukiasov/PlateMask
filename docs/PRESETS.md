# Preset tracker

Scope: the 50 most populous countries + all post-Soviet states + Georgia, **Latin-script plates only** = **47 countries** (ADR 0002, 0003).

Rules:
- Every preset needs a **source link** (official registry or government page preferred) and **fixtures** (valid + invalid) in `tests/presets/`.
- Status: `todo` → `draft` (shape known, unverified) → `verified` (source checked) → `shipped`.
- Only **current** issuing formats for v1. Legacy, vanity and diplomatic plates are added to `masks` later.
- The "Shape" column is a **hint from memory** until a source is linked. Don't implement from it without verifying.

Complexity: **S** = one national Latin format · **M** = several formats or restricted alphabets · **R** = per-region sub-presets.

## Tier 1 — single national format, Latin or Cyrillic look-alike (proves the core)
| # | Country | Code | Shape hint | Script | Cx | Status | Source |
|---|---|---|---|---|---|---|---|
| 23 | France | FR | `AB-123-CD` | Latin | M | draft | |
| 25 | Italy | IT | `AB 123 CD` | Latin | M | draft | |
| 34 | Spain | ES | `1234 BCD` | Latin | M | draft | |
| 19 | Germany | DE | `B-MW 1234` (variable) | Latin | M | draft | |
| 22 | United Kingdom | GB | `AB12 CDE` | Latin | M | draft | |
| 42 | Poland | PL | `WX 12345` (variable) | Latin | M | todo | |
| 18 | Turkey | TR | `34 ABC 123` (variable) | Latin | M | todo | |
| 7 | Brazil | BR | `ABC1D23` (Mercosur) | Latin | M | todo | |
| 35 | Argentina | AR | `AB 123 CD` (Mercosur) | Latin | S | todo | |
| 28 | Colombia | CO | `ABC 123` | Latin | S | todo | |
| 48 | Peru | PE | `ABC-123` | Latin | S | todo | |
| — | Georgia | GE | `AB-123-CD` | Latin | S | draft | |
| 9 | Russia | RU | `А123ВС 77` + region | Cyrillic subset | M | todo | |
| 40 | Ukraine | UA | `АА 1234 ВВ` | Cyrillic subset | M | todo | |
| — | Belarus | BY | `1234 AB-7` | Latin/Cyr | M | todo | |
| — | Moldova | MD | verify | Latin | S | todo | |
| — | Armenia | AM | verify | Latin | S | todo | |
| — | Azerbaijan | AZ | `10-AB-123` | Latin | S | todo | |
| — | Kazakhstan | KZ | `123 ABC 01` | Latin | S | todo | |
| 43 | Uzbekistan | UZ | `01 A 123 BC` (multi) | Latin | M | todo | |
| — | Kyrgyzstan | KG | verify | Latin | S | todo | |
| — | Tajikistan | TJ | verify | Latin | S | todo | |
| — | Turkmenistan | TM | verify | Latin | S | todo | |
| — | Estonia | EE | `123 ABC` | Latin | S | todo | |
| — | Latvia | LV | `AB-1234` | Latin | S | todo | |
| — | Lithuania | LT | `ABC 123` | Latin | S | todo | |

## Tier 2 — Latin script, several formats or regional variants
| # | Country | Code | Notes | Cx | Status |
|---|---|---|---|---|---|
| 3 | United States | US-xx | 50 states + DC; each its own sub-preset. Start with CA, TX, FL, NY | R | todo |
| 38 | Canada | CA-xx | per province | R | todo |
| 11 | Mexico | MX-xx | per state | R | todo |
| 1 | India | IN | `MH 12 AB 1234`: state-code dictionary + BH series | M | todo |
| 4 | Indonesia | ID | `B 1234 ABC`: region prefix 1–2 letters, variable | M | todo |
| 14 | Philippines | PH | `ABC 1234` + motorcycle formats | M | todo |
| 45 | Malaysia | MY | state prefix, variable | M | todo |
| 5 | Pakistan | PK-xx | per province/territory | R | todo |
| 6 | Nigeria | NG | `ABC-123DE` | S | todo |
| 24 | South Africa | ZA-xx | per province | R | todo |
| 26 | Kenya | KE | `KAB 123C` | S | todo |
| 30 | Uganda | UG | `UAB 123C` | S | todo |
| 20 | Tanzania | TZ | `T 123 ABC` | S | todo |
| 46 | Ghana | GH | `GR 1234-23` | M | todo |
| 16 | Vietnam | VN | `30A-123.45` (province number) | M | todo |
| 15 | DR Congo | CD | weak sources, help wanted | S | todo |
| 50 | Côte d'Ivoire | CI | verify | S | todo |
| 49 | Madagascar | MG | verify | S | todo |
| 44 | Mozambique | MZ | Latin, SADC style | S | todo |
| 39 | Angola | AO | `LD-12-34-AB` | S | todo |
| 32 | Algeria | DZ | digits only, wilaya suffix | S | todo |

## Out of scope — non-Latin plates (ADR 0003)
CN, JP, KR, TH, IR, EG, SA, IQ, AF, YE, SD, MA, BD, MM, ET (15 countries).
Possible later exception: SA, IQ and SD plates also carry a Latin line, which could be supported without non-Latin input.
